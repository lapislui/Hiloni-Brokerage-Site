import { Router, type Request, type Response } from "express";

const router = Router();

// Helper to fetch the CAPTCHA image using session cookies
async function getCaptcha(cookieHeader: string): Promise<string> {
  const res = await fetch("https://backoffice.acml.in/Home/GenerateCaptcha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cookie": cookieHeader,
      "Referer": "https://backoffice.acml.in/Account/Login",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch CAPTCHA from ACML backoffice");
  }
  const base64Img = await res.json() as string;
  return base64Img;
}

// 1. GET /api/backoffice/init
router.get("/backoffice/init", async (req: Request, res: Response) => {
  try {
    const getRes = await fetch("https://backoffice.acml.in/Account/Login", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    if (!getRes.ok) {
      res.status(502).json({ error: "Failed to load ACML Backoffice login page" });
      return;
    }

    const html = await getRes.text();
    const tokenMatch = html.match(/name="__RequestVerificationToken"\s+type="hidden"\s+value="([^"]+)"/) ||
                       html.match(/value="([^"]+)"\s+name="__RequestVerificationToken"/);
    const token = tokenMatch ? tokenMatch[1] : "";

    const setCookies = getRes.headers.getSetCookie ? getRes.headers.getSetCookie() : [];
    // Deduplicate and format cookie header
    const cookieMap = new Map<string, string>();
    setCookies.forEach(c => {
      const parts = c.split(';')[0].split('=');
      if (parts.length >= 2) {
        cookieMap.set(parts[0].trim(), parts[1].trim());
      }
    });
    
    const cookieHeader = Array.from(cookieMap.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');

    // Fetch captcha immediately
    let captcha = "";
    if (cookieHeader) {
      try {
        captcha = await getCaptcha(cookieHeader);
      } catch (err) {
        console.error("Error generating captcha during init:", err);
      }
    }

    res.json({
      token,
      cookies: cookieHeader,
      captcha
    });
  } catch (err: any) {
    console.error("Backoffice init error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// 2. POST /api/backoffice/refresh-captcha
router.post("/backoffice/refresh-captcha", async (req: Request, res: Response) => {
  try {
    const { cookies } = req.body;
    if (!cookies) {
      res.status(400).json({ error: "Missing cookies in request body" });
      return;
    }
    const captcha = await getCaptcha(cookies);
    res.json({ captcha });
  } catch (err: any) {
    console.error("Backoffice refresh-captcha error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

// 3. POST /api/backoffice/login
router.post("/backoffice/login", async (req: Request, res: Response) => {
  try {
    const { userName, password, captchaText, token, cookies } = req.body;
    if (!userName || !password || !captchaText || !token || !cookies) {
      res.status(400).json({ error: "Missing required login parameters" });
      return;
    }

    const bodyParams = new URLSearchParams();
    bodyParams.append("__RequestVerificationToken", token);
    bodyParams.append("UserName", userName);
    bodyParams.append("Password", password);
    bodyParams.append("CaptchaText", captchaText);
    bodyParams.append("MobileNo", "");
    bodyParams.append("TradingCode", "");
    bodyParams.append("txtLoginType", "");

    const postRes = await fetch("https://backoffice.acml.in/Account/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookies,
        "Referer": "https://backoffice.acml.in/Account/Login",
        "Origin": "https://backoffice.acml.in",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
      },
      body: bodyParams.toString(),
      redirect: "manual"
    });

    const setCookies = postRes.headers.getSetCookie ? postRes.headers.getSetCookie() : [];
    
    // Merge new cookies with previous cookies
    const cookieMap = new Map<string, string>();
    // Seed with incoming cookies
    cookies.split(';').forEach((c: string) => {
      const parts = c.split('=');
      if (parts.length >= 2) {
        cookieMap.set(parts[0].trim(), parts[1].trim());
      }
    });
    // Add set cookies from response
    setCookies.forEach(c => {
      const parts = c.split(';')[0].split('=');
      if (parts.length >= 2) {
        cookieMap.set(parts[0].trim(), parts[1].trim());
      }
    });

    const mergedCookies = Array.from(cookieMap.entries())
      .map(([k, v]) => `${k}=${v}`)
      .join('; ');

    const isAuthorized = Array.from(cookieMap.keys()).some(k => k === ".ASPXAUTH");

    if (isAuthorized || postRes.status === 302) {
      res.json({
        success: true,
        cookies: mergedCookies
      });
      return;
    }

    // Read response text to find error
    const respHtml = await postRes.text();
    // Check if the response returned page not found/error
    if (respHtml.includes("Page Not Found 404") || respHtml.includes("SOMETHING WENT WRONG")) {
      res.json({
        success: false,
        error: "Incorrect Username, Password, or CAPTCHA code."
      });
      return;
    }

    // Try parsing out error message from standard validation-summary or text-danger spans
    const errorMatch = respHtml.match(/class="text-danger"[^>]*>([\s\S]*?)<\/span>/) ||
                       respHtml.match(/class="validation-summary-errors"[^>]*>([\s\S]*?)<\/div>/) ||
                       respHtml.match(/<span[^>]*class="field-validation-error"[^>]*>([\s\S]*?)<\/span>/);
                       
    const errorMsg = errorMatch ? errorMatch[1].replace(/<[^>]+>/g, '').trim() : "Invalid credentials or CAPTCHA code.";
    res.json({
      success: false,
      error: errorMsg
    });
  } catch (err: any) {
    console.error("Backoffice login error:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;
