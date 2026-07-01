import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  TrendingUp, TrendingDown, LogOut, BarChart2, Briefcase, List,
  Star, ShoppingCart, RefreshCw, Bell, ChevronDown, Eye, EyeOff,
  ArrowUpRight, ArrowDownRight, Search, X, Activity, Wallet, User,
  Info, CreditCard, ShieldCheck, CheckCircle2, UserCheck
} from 'lucide-react';
import hiloniLogo from '@assets/hiloni_logo.jpg';
import { Link } from 'wouter';

const BRAND = { primary: '#E21E51', navy: '#040037', blue: '#032075', bg: '#EFEFF5' };

const HOLDINGS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', qty: 50, avg: 2620.4, ltp: 2890.5, sector: 'Energy' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', qty: 30, avg: 3450.0, ltp: 3750.8, sector: 'IT' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', qty: 80, avg: 1480.25, ltp: 1540.2, sector: 'Finance' },
  { symbol: 'INFY', name: 'Infosys', qty: 60, avg: 1380.0, ltp: 1456.9, sector: 'IT' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', qty: 100, avg: 1060.0, ltp: 1123.4, sector: 'Finance' },
  { symbol: 'WIPRO', name: 'Wipro', qty: 120, avg: 460.0, ltp: 485.25, sector: 'IT' },
  { symbol: 'LT', name: 'Larsen & Toubro', qty: 25, avg: 3100.0, ltp: 3245.7, sector: 'Infra' },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', qty: 15, avg: 7200.0, ltp: 7540.3, sector: 'Finance' },
];

const ORDERS = [
  { id: 'ORD001', symbol: 'RELIANCE', type: 'BUY', qty: 10, price: 2885.0, status: 'Executed', time: '09:32 AM', exchange: 'NSE' },
  { id: 'ORD002', symbol: 'TCS', type: 'SELL', qty: 5, price: 3760.0, status: 'Executed', time: '10:15 AM', exchange: 'NSE' },
  { id: 'ORD003', symbol: 'HDFCBANK', type: 'BUY', qty: 20, price: 1535.5, status: 'Pending', time: '11:02 AM', exchange: 'BSE' },
  { id: 'ORD004', symbol: 'INFY', type: 'BUY', qty: 15, price: 1450.0, status: 'Executed', time: '11:48 AM', exchange: 'NSE' },
  { id: 'ORD005', symbol: 'WIPRO', type: 'SELL', qty: 30, price: 488.0, status: 'Cancelled', time: '01:20 PM', exchange: 'NSE' },
];

const WATCHLIST = [
  { symbol: 'NIFTY 50', price: 22450.40, change: 265.3, pct: 1.20 },
  { symbol: 'SENSEX', price: 74119.55, change: 584.1, pct: 0.80 },
  { symbol: 'HDFC Life', price: 642.85, change: -8.3, pct: -1.27 },
  { symbol: 'SBI', price: 812.40, change: 12.6, pct: 1.58 },
  { symbol: 'MARUTI', price: 11240.0, change: 340.5, pct: 3.12 },
  { symbol: 'SUNPHARMA', price: 1580.25, change: -22.4, pct: -1.40 },
  { symbol: 'TATAMOTORS', price: 972.60, change: 18.9, pct: 1.98 },
  { symbol: 'AXISBANK', price: 1145.80, change: 9.3, pct: 0.82 },
];

const POSITIONS = [
  { symbol: 'NIFTY 24JUL 22500 CE', product: 'NRML', qty: 100, avg: 145.2, ltp: 168.5, type: 'BUY', status: 'Active' },
  { symbol: 'BANKNIFTY 24JUL 48000 PE', product: 'MIS', qty: -75, avg: 310.0, ltp: 285.4, type: 'SELL', status: 'Active' },
  { symbol: 'TATASTEEL', product: 'MIS', qty: 500, avg: 148.5, ltp: 151.2, type: 'BUY', status: 'Closed' },
];

const PROFILE = {
  name: 'Keval Hiloni',
  email: 'keval@hilonibroking.com',
  phone: '+91 98765 43210',
  pan: 'ABCDE1234F',
  demat: '1208160001234567',
  rmName: 'Rohan Sharma',
  rmEmail: 'rohan.sharma@hilonibroking.com',
  rmPhone: '+91 99999 88888',
};

const pnlHistory = [
  { date: 'Jan', value: 1820000 }, { date: 'Feb', value: 1910000 }, { date: 'Mar', value: 1740000 },
  { date: 'Apr', value: 2050000 }, { date: 'May', value: 2180000 }, { date: 'Jun', value: 2340000 },
];

const allocationData = [
  { name: 'IT', value: 38 }, { name: 'Finance', value: 34 }, { name: 'Energy', value: 16 }, { name: 'Infra', value: 8 }, { name: 'Other', value: 4 },
];
const ALLOC_COLORS = ['#E21E51', '#032075', '#040037', '#6366f1', '#94a3b8'];

function fmt(n: number) { return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function fmtCr(n: number) { return '₹' + (n / 1e7).toFixed(2) + ' Cr'; }

function useTickerPrices(base: typeof HOLDINGS) {
  const [prices, setPrices] = useState<Record<string, number>>({});
  useEffect(() => {
    const init: Record<string, number> = {};
    base.forEach(h => { init[h.symbol] = h.ltp; });
    setPrices(init);
    const interval = setInterval(() => {
      setPrices(prev => {
        const updated = { ...prev };
        const keys = Object.keys(updated);
        const pick = keys[Math.floor(Math.random() * keys.length)];
        const delta = (Math.random() - 0.48) * 5;
        updated[pick] = parseFloat((updated[pick] + delta).toFixed(2));
        return updated;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);
  return prices;
}

function LoginScreen({ onLogin }: { onLogin: (id: string, sessionCookies: string) => void }) {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  
  const [captchaText, setCaptchaText] = useState('');
  const [captchaImg, setCaptchaImg] = useState('');
  const [token, setToken] = useState('');
  const [cookies, setCookies] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingCaptcha, setLoadingCaptcha] = useState(false);

  // Initialize CAPTCHA and verification token from Express proxy
  const initBackoffice = async () => {
    setLoadingCaptcha(true);
    setError('');
    try {
      const res = await fetch("/api/backoffice/init");
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setCookies(data.cookies);
        setToken(data.token);
        setCaptchaImg(data.captcha);
      }
    } catch (err) {
      setError("Failed to fetch credentials verification context from ACML Backoffice.");
    } finally {
      setLoadingCaptcha(false);
    }
  };

  useEffect(() => {
    initBackoffice();
  }, []);

  const handleRefreshCaptcha = async () => {
    if (!cookies) {
      initBackoffice();
      return;
    }
    setLoadingCaptcha(true);
    try {
      const res = await fetch("/api/backoffice/refresh-captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cookies })
      });
      const data = await res.json();
      if (data.captcha) {
        setCaptchaImg(data.captcha);
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to refresh CAPTCHA.");
    } finally {
      setLoadingCaptcha(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !password || !captchaText) {
      setError('Please fill all fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch("/api/backoffice/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: clientId,
          password,
          captchaText,
          token,
          cookies
        })
      });
      const data = await res.json();
      if (data.success) {
        onLogin(clientId.toUpperCase(), data.cookies);
      } else {
        setError(data.error || 'Authentication failed. Please check your credentials.');
        handleRefreshCaptcha();
        setCaptchaText('');
      }
    } catch (err) {
      setError('An error occurred during authentication. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition-all";

  return (
    <div className="min-h-screen flex" style={{ background: BRAND.navy }}>
      {/* Brand Side Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #040037 0%, #032075 100%)' }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E21E51_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <Link href="/">
          <img src={hiloniLogo} alt="Hiloni" className="h-12 w-auto object-contain brightness-0 invert cursor-pointer z-10" />
        </Link>
        <div className="z-10">
          <div className="grid grid-cols-2 gap-4 mb-12">
            {[{ label: 'System Access', val: 'Direct SEBI-Regulated' }, { label: 'Integration', val: 'ACML Backoffice Live' }, { label: 'Security', val: 'SSL Encrypted' }, { label: 'Clearing Member', val: 'NSE, BSE, MCX' }].map(item => (
              <div key={item.label} className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                <p className="text-white/50 text-xs font-label font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-white text-lg font-bold">{item.val}</p>
              </div>
            ))}
          </div>
          <h2 className="text-4xl font-bold text-white mb-3 leading-tight">Secure Backoffice.<br />Real-time Ledger & Holdings.</h2>
          <p className="text-white/50 text-base max-w-md">Access your demat account status, ledger statements, transactional reports, and clearing status directly via ACML clearing integration.</p>
        </div>
        <p className="text-white/30 text-xs z-10">SEBI Reg. INZ000205632 | NSE & BSE Member | NSDL DP</p>
      </div>

      {/* Login Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/">
              <img src={hiloniLogo} alt="Hiloni" className="h-10 w-auto object-contain brightness-0 invert cursor-pointer" />
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Backoffice Terminal</h1>
          <p className="text-white/50 text-sm mb-10">Access your accounts via ACML Backoffice System</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-label font-semibold text-white/50 uppercase tracking-wider mb-1.5">User Name / Client Code</label>
              <input className={inputCls} placeholder="e.g. HL00291" value={clientId} onChange={e => setClientId(e.target.value.toUpperCase())} required />
            </div>
            
            <div>
              <label className="block text-xs font-label font-semibold text-white/50 uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} className={inputCls} placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Captcha Input */}
            <div>
              <label className="block text-xs font-label font-semibold text-white/50 uppercase tracking-wider mb-1.5">CAPTCHA Verification</label>
              <div className="flex gap-3 items-center">
                <div className="bg-white rounded-xl p-2 h-12 flex items-center justify-center border border-white/10 relative overflow-hidden flex-1 select-none">
                  {loadingCaptcha ? (
                    <span className="text-xs text-navy font-semibold animate-pulse">Loading...</span>
                  ) : captchaImg ? (
                    <img src={captchaImg} alt="CAPTCHA" className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-xs text-red-500">Failed to load</span>
                  )}
                </div>
                <button type="button" onClick={handleRefreshCaptcha} disabled={loadingCaptcha} className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all cursor-pointer" title="Refresh CAPTCHA">
                  <RefreshCw className={`w-4 h-4 ${loadingCaptcha ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <input className={inputCls + " mt-3"} placeholder="Enter captcha characters" value={captchaText} onChange={e => setCaptchaText(e.target.value)} required />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={loading || loadingCaptcha} className="w-full py-3.5 rounded-xl font-label font-semibold text-white text-sm transition-all shadow-lg hover:opacity-90 active:scale-95 disabled:opacity-50 cursor-pointer" style={{ background: BRAND.primary }}>
              {loading ? 'Authenticating with ACML...' : 'Enter Terminal →'}
            </button>
            
            <p className="text-center text-xs text-white/30">
              Your credentials are secure and submitted directly to the ACML backoffice clearing server.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

type Tab = 'overview' | 'watchlist' | 'holdings' | 'orders' | 'positions' | 'funds' | 'profile' | 'trade';

function Dashboard({ clientId, sessionCookies, onLogout }: { clientId: string; sessionCookies: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [tradeSymbol, setTradeSymbol] = useState('RELIANCE');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [tradeQty, setTradeQty] = useState('10');
  const [tradePrice, setTradePrice] = useState('2890.50');
  const [tradeOrder, setTradeOrder] = useState<'MARKET' | 'LIMIT'>('LIMIT');
  const [tradeSuccess, setTradeSuccess] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const livePrices = useTickerPrices(HOLDINGS);

  // Funds component states
  const [funds, setFunds] = useState({ available: 124500.00, used: 45500.00 });
  const [addFundsOpen, setAddFundsOpen] = useState(false);
  const [fundAmount, setFundAmount] = useState('10000');
  const [fundStatus, setFundStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const totalInvested = HOLDINGS.reduce((s, h) => s + h.qty * h.avg, 0);
  const totalCurrent = HOLDINGS.reduce((s, h) => s + h.qty * (livePrices[h.symbol] || h.ltp), 0);
  const totalPnl = totalCurrent - totalInvested;
  const pnlPct = (totalPnl / totalInvested) * 100;

  const handleTrade = (e: React.FormEvent) => {
    e.preventDefault();
    setTradeSuccess(true);
    setTimeout(() => setTradeSuccess(false), 4000);
  };

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    setFundStatus('loading');
    setTimeout(() => {
      setFundStatus('success');
      const added = parseFloat(fundAmount);
      setFunds(f => ({ ...f, available: f.available + added }));
      setTimeout(() => {
        setAddFundsOpen(false);
        setFundStatus('idle');
        setFundAmount('10000');
      }, 1500);
    }, 1200);
  };

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4.5 h-4.5" /> },
    { id: 'watchlist', label: 'Watchlist', icon: <Star className="w-4.5 h-4.5" /> },
    { id: 'holdings', label: 'Holdings', icon: <Briefcase className="w-4.5 h-4.5" /> },
    { id: 'orders', label: 'Orders', icon: <List className="w-4.5 h-4.5" /> },
    { id: 'positions', label: 'Positions', icon: <Activity className="w-4.5 h-4.5" /> },
    { id: 'funds', label: 'Funds', icon: <Wallet className="w-4.5 h-4.5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4.5 h-4.5" /> },
    { id: 'trade', label: 'Quick Trade', icon: <ShoppingCart className="w-4.5 h-4.5" /> },
  ];

  const filteredHoldings = HOLDINGS.filter(h =>
    h.symbol.toLowerCase().includes(searchQ.toLowerCase()) ||
    h.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div className="min-h-screen flex" style={{ background: BRAND.bg }}>
      
      {/* Left Sidebar Navigation (Sidepanel) */}
      <aside className="w-64 bg-[#040037] text-white fixed h-screen left-0 top-0 flex flex-col justify-between py-6 px-4 z-40">
        <div className="space-y-8">
          {/* Logo Header */}
          <div className="flex items-center gap-3 px-3">
            <Link href="/">
              <img src={hiloniLogo} alt="Hiloni" className="h-8 w-auto object-contain brightness-0 invert cursor-pointer" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-label font-semibold transition-all text-left cursor-pointer ${active ? 'text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  style={active ? { background: BRAND.primary } : {}}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile section at bottom of sidebar */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ background: BRAND.primary }}>
              {clientId.substring(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate max-w-[120px]">{PROFILE.name}</p>
              <p className="text-[10px] text-white/50 truncate font-mono">{clientId}</p>
            </div>
          </div>
          <button onClick={onLogout} className="text-white/40 hover:text-red-400 p-2 rounded-lg hover:bg-white/5 transition-all cursor-pointer" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-border/50 shadow-sm px-8 py-4 flex items-center justify-between gap-6">
          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              className="w-full pl-10 pr-4 py-2 rounded-full border border-border text-sm bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60" 
              placeholder="Search stocks, indices, F&O..." 
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
            />
          </div>

          {/* Indices Live Ticker */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 bg-muted/20 px-4 py-1.5 rounded-full border border-border/50 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground">NIFTY 50</span>
                <span className="text-foreground">22,450.40</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" /> +1.20%</span>
              </div>
              <span className="h-3 w-px bg-border" />
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground">SENSEX</span>
                <span className="text-foreground">74,119.55</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" /> +0.80%</span>
              </div>
            </div>

            <button className="text-muted-foreground hover:text-foreground transition-colors relative p-1">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E21E51]" />
            </button>
          </div>
        </header>

        {/* Content Pane */}
        <main className="flex-grow p-8">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

              {/* OVERVIEW */}
              {tab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm relative overflow-hidden group">
                      <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 group-hover:scale-110 transition-transform"><Wallet className="w-32 h-32 text-navy" /></div>
                      <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-2">Available Margin</p>
                      <p className="text-2xl font-bold text-foreground">{fmt(funds.available)}</p>
                      <button 
                        onClick={() => { setTab('funds'); setAddFundsOpen(true); }}
                        className="mt-3 text-xs bg-[#E21E51] text-white px-3 py-1.5 rounded-lg font-semibold hover:opacity-90 transition-all cursor-pointer inline-flex items-center gap-1 shadow-sm"
                      >
                        Add Funds
                      </button>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm relative overflow-hidden group">
                      <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 group-hover:scale-110 transition-transform"><Briefcase className="w-32 h-32 text-navy" /></div>
                      <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-2">Portfolio Value</p>
                      <p className="text-2xl font-bold text-foreground">{fmtCr(totalCurrent)}</p>
                      <p className="text-xs font-semibold text-muted-foreground mt-2">Invested: {fmtCr(totalInvested)}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm relative overflow-hidden group">
                      <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 group-hover:scale-110 transition-transform"><TrendingUp className="w-32 h-32 text-navy" /></div>
                      <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-2">Total Returns</p>
                      <p className="text-2xl font-bold text-foreground">{totalPnl >= 0 ? '+' : ''}{fmt(totalPnl)}</p>
                      <p className={`text-xs font-semibold mt-2 flex items-center gap-1 ${totalPnl >= 0 ? 'text-emerald-600' : 'text-[#E21E51]'}`}>
                        {totalPnl >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm relative overflow-hidden group">
                      <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 group-hover:scale-110 transition-transform"><Activity className="w-32 h-32 text-navy" /></div>
                      <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-2">Today's P&L</p>
                      <p className="text-2xl font-bold text-foreground">+₹4,280.50</p>
                      <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        +0.62%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide flex items-center gap-2">
                          <Activity className="w-4 h-4 text-primary" /> Portfolio Performance (6M)
                        </h3>
                        <span className="text-xs font-label text-muted-foreground flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin-slow" /> Live</span>
                      </div>
                      <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={pnlHistory}>
                          <defs>
                            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={BRAND.primary} stopOpacity={0.2} />
                              <stop offset="95%" stopColor={BRAND.primary} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                          <YAxis tickFormatter={v => `₹${(v / 1e5).toFixed(0)}L`} tick={{ fontSize: 11 }} />
                          <Tooltip formatter={(v: number) => fmt(v)} />
                          <Area type="monotone" dataKey="value" stroke={BRAND.primary} strokeWidth={2.5} fill="url(#grad)" dot={{ fill: BRAND.primary, r: 3 }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                      <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide mb-6">Sector Allocation</h3>
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie data={allocationData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="value">
                            {allocationData.map((_, i) => <Cell key={i} fill={ALLOC_COLORS[i % ALLOC_COLORS.length]} />)}
                          </Pie>
                          <Tooltip formatter={(v: number) => `${v}%`} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {allocationData.map((d, i) => (
                          <div key={d.name} className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ALLOC_COLORS[i] }} />
                            <span className="text-[11px] text-muted-foreground truncate">{d.name}: <strong className="text-foreground">{d.value}%</strong></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Top holdings list */}
                  <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide">Top Holdings</h3>
                      <button onClick={() => setTab('holdings')} className="text-xs text-primary hover:underline font-semibold cursor-pointer">View All Holdings →</button>
                    </div>
                    <div className="space-y-3">
                      {HOLDINGS.slice(0, 5).map(h => {
                        const ltp = livePrices[h.symbol] || h.ltp;
                        const pnl = (ltp - h.avg) * h.qty;
                        const pct = ((ltp - h.avg) / h.avg) * 100;
                        return (
                          <div key={h.symbol} className="flex items-center justify-between py-2.5 border-b border-border/30 last:border-0 hover:bg-muted/10 px-2 rounded-xl transition-all">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ background: BRAND.navy }}>{h.symbol.substring(0, 2)}</div>
                              <div>
                                <p className="text-sm font-bold text-foreground">{h.symbol}</p>
                                <p className="text-xs text-muted-foreground">{h.qty} shares • Avg {fmt(h.avg)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold text-foreground">{fmt(ltp)}</p>
                              <p className={`text-xs font-semibold ${pnl >= 0 ? 'text-emerald-600' : 'text-[#E21E51]'}`}>{pnl >= 0 ? '+' : ''}{fmt(pnl)} ({pct.toFixed(2)}%)</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* WATCHLIST */}
              {tab === 'watchlist' && (
                <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border/50 flex items-center justify-between">
                    <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide">Market Watchlist</h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" /> Live prices</span>
                  </div>
                  <div className="divide-y divide-border/30">
                    {WATCHLIST.map(w => (
                      <div key={w.symbol} className="flex items-center justify-between px-5 py-4 hover:bg-muted/20 transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white" style={{ background: BRAND.navy }}>{w.symbol.substring(0, 2)}</div>
                          <div>
                            <p className="font-bold text-foreground text-sm">{w.symbol}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">Equity • NSE</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-bold text-foreground">{w.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                            <p className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${w.change >= 0 ? 'text-emerald-600' : 'text-primary'}`}>
                              {w.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {w.change >= 0 ? '+' : ''}{w.change.toFixed(2)} ({w.pct >= 0 ? '+' : ''}{w.pct.toFixed(2)}%)
                            </p>
                          </div>
                          <button 
                            onClick={() => { setTradeSymbol(w.symbol); setTradePrice(w.price.toString()); setTab('trade'); }}
                            className="bg-muted hover:bg-primary hover:text-white p-2 rounded-lg transition-all text-muted-foreground cursor-pointer"
                            title="Place Order"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HOLDINGS */}
              {tab === 'holdings' && (
                <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border/50 flex items-center justify-between gap-4">
                    <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide">Your Holdings</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <input className="pl-8 pr-4 py-2 rounded-xl border border-border text-sm bg-muted/30 w-48 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Search holdings..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50 bg-muted/20">
                          {['Symbol', 'Qty', 'Avg Cost', 'LTP', 'Invested', 'Current Value', 'P&L', 'P&L %'].map(h => (
                            <th key={h} className="px-5 py-4 text-left text-xs font-label font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredHoldings.map(h => {
                          const ltp = livePrices[h.symbol] || h.ltp;
                          const invested = h.qty * h.avg;
                          const current = h.qty * ltp;
                          const pnl = current - invested;
                          const pct = (pnl / invested) * 100;
                          return (
                            <tr key={h.symbol} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ background: BRAND.navy }}>{h.symbol.substring(0, 2)}</div>
                                  <div>
                                    <p className="font-bold text-foreground">{h.symbol}</p>
                                    <p className="text-xs text-muted-foreground">{h.sector}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-4 font-semibold text-foreground">{h.qty}</td>
                              <td className="px-5 py-4 text-muted-foreground">{fmt(h.avg)}</td>
                              <td className="px-5 py-4 font-bold text-foreground">{fmt(ltp)}</td>
                              <td className="px-5 py-4 text-muted-foreground">{fmt(invested)}</td>
                              <td className="px-5 py-4 font-semibold text-foreground">{fmt(current)}</td>
                              <td className={`px-5 py-4 font-bold ${pnl >= 0 ? 'text-emerald-600' : 'text-[#E21E51]'}`}>{pnl >= 0 ? '+' : ''}{fmt(pnl)}</td>
                              <td className="px-5 py-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${pct >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                                  {pct >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                  {pct >= 0 ? '+' : ''}{pct.toFixed(2)}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-5 bg-muted/10 border-t border-border/30 flex flex-wrap gap-6 text-sm">
                    <span className="text-muted-foreground">Invested: <strong className="text-foreground">{fmt(totalInvested)}</strong></span>
                    <span className="text-muted-foreground">Current: <strong className="text-foreground">{fmt(totalCurrent)}</strong></span>
                    <span className={`font-bold ${totalPnl >= 0 ? 'text-emerald-600' : 'text-[#E21E51]'}`}>Total P&L: {totalPnl >= 0 ? '+' : ''}{fmt(totalPnl)} ({pnlPct.toFixed(2)}%)</span>
                  </div>
                </div>
              )}

              {/* ORDERS */}
              {tab === 'orders' && (
                <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border/50 flex items-center justify-between">
                    <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide">Order Book — Today</h3>
                    <button className="flex items-center gap-1.5 text-xs font-label font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      <RefreshCw className="w-3.5 h-3.5" /> Refresh
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50 bg-muted/20">
                          {['Order ID', 'Symbol', 'Type', 'Qty', 'Price', 'Exchange', 'Time', 'Status'].map(h => (
                            <th key={h} className="px-5 py-4 text-left text-xs font-label font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ORDERS.map(o => (
                          <tr key={o.id} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                            <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{o.id}</td>
                            <td className="px-5 py-4 font-bold text-foreground">{o.symbol}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${o.type === 'BUY' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{o.type}</span>
                            </td>
                            <td className="px-5 py-4 font-semibold text-foreground">{o.qty}</td>
                            <td className="px-5 py-4 text-foreground">{fmt(o.price)}</td>
                            <td className="px-5 py-4 text-muted-foreground text-xs font-label font-semibold">{o.exchange}</td>
                            <td className="px-5 py-4 text-muted-foreground text-xs">{o.time}</td>
                            <td className="px-5 py-4">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${o.status === 'Executed' ? 'bg-emerald-50 text-emerald-700' : o.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-muted text-muted-foreground'}`}>{o.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* POSITIONS */}
              {tab === 'positions' && (
                <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-border/50 flex items-center justify-between">
                    <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide">Open Positions</h3>
                    <span className="text-xs text-muted-foreground">Active Derivatives & Intraday Trades</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50 bg-muted/20">
                          {['Symbol', 'Product', 'Net Qty', 'Avg Price', 'LTP', 'P&L', 'P&L %', 'Action'].map(h => (
                            <th key={h} className="px-5 py-4 text-left text-xs font-label font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {POSITIONS.map((p, idx) => {
                          const netVal = p.qty * p.avg;
                          const ltp = livePrices[p.symbol] || p.ltp;
                          const currentVal = p.qty * ltp;
                          const pnl = currentVal - netVal;
                          const pct = (pnl / Math.abs(netVal)) * 100;
                          
                          return (
                            <tr key={idx} className="border-b border-border/30 hover:bg-muted/10 transition-colors">
                              <td className="px-5 py-4 font-bold text-foreground">{p.symbol}</td>
                              <td className="px-5 py-4"><span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded font-semibold">{p.product}</span></td>
                              <td className="px-5 py-4 font-semibold text-foreground">{p.qty}</td>
                              <td className="px-5 py-4 text-muted-foreground">{fmt(p.avg)}</td>
                              <td className="px-5 py-4 font-bold text-foreground">{fmt(ltp)}</td>
                              <td className={`px-5 py-4 font-bold ${pnl >= 0 ? 'text-emerald-600' : 'text-[#E21E51]'}`}>{pnl >= 0 ? '+' : ''}{fmt(pnl)}</td>
                              <td className="px-5 py-4">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${pct >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                                  {pct >= 0 ? '+' : ''}{pct.toFixed(2)}%
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                {p.status === 'Active' ? (
                                  <button className="text-xs bg-[#E21E51] text-white px-2.5 py-1 rounded font-bold hover:opacity-90 transition-all cursor-pointer shadow-sm">Square Off</button>
                                ) : (
                                  <span className="text-xs text-muted-foreground italic">Closed</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* FUNDS */}
              {tab === 'funds' && (
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                      <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-2">Available Margin</p>
                      <p className="text-3xl font-bold text-foreground">{fmt(funds.available)}</p>
                      <p className="text-xs text-muted-foreground mt-2">Ready to trade equity/F&O</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                      <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-2">Used Margin</p>
                      <p className="text-3xl font-bold text-[#E21E51]">{fmt(funds.used)}</p>
                      <p className="text-xs text-muted-foreground mt-2">Utilized in active positions</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                      <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-2">Collateral Value</p>
                      <p className="text-3xl font-bold text-foreground">₹0.00</p>
                      <p className="text-xs text-muted-foreground mt-2">Margin from pledged holdings</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                      <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-2">Total Margin Available</p>
                      <p className="text-3xl font-bold text-foreground">{fmt(funds.available + funds.used)}</p>
                      <p className="text-xs text-muted-foreground mt-2">Net leverage power</p>
                    </div>
                  </div>

                  {/* Add Funds Panel */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                      <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" /> Fund Transaction History
                      </h3>
                      <div className="divide-y divide-border/30">
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm font-bold text-foreground">UPI Pay-in • Success</p>
                            <p className="text-xs text-muted-foreground">Txn ID: UPI982348234 • 28 Jun 2026</p>
                          </div>
                          <p className="font-bold text-emerald-600">+₹25,000.00</p>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm font-bold text-foreground">Netbanking Pay-in • Success</p>
                            <p className="text-xs text-muted-foreground">Txn ID: NB4820392348 • 15 Jun 2026</p>
                          </div>
                          <p className="font-bold text-emerald-600">+₹50,000.00</p>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm font-bold text-foreground">Withdrawal Request • Executed</p>
                            <p className="text-xs text-muted-foreground">Txn ID: OUT472394823 • 10 Jun 2026</p>
                          </div>
                          <p className="font-bold text-[#E21E51]">-₹15,000.00</p>
                        </div>
                      </div>
                    </div>

                    {/* Add Funds Form Widget */}
                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                      <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide mb-4">Add Trading Margin</h3>
                      
                      {fundStatus === 'success' ? (
                        <div className="py-8 text-center space-y-3">
                          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                          <p className="text-sm font-bold text-foreground">Margin Updated Successfully!</p>
                          <p className="text-xs text-muted-foreground">Your balance has been adjusted.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleAddFunds} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Amount (INR)</label>
                            <input 
                              type="number" 
                              className="w-full px-4 py-2.5 rounded-xl border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" 
                              value={fundAmount} 
                              onChange={e => setFundAmount(e.target.value)} 
                              required 
                              min="100"
                            />
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2">
                            {['5000', '10000', '25000'].map(val => (
                              <button 
                                type="button" 
                                key={val} 
                                onClick={() => setFundAmount(val)} 
                                className="py-2 text-xs font-semibold border border-border rounded-lg hover:border-primary hover:text-primary transition-all cursor-pointer"
                              >
                                +₹{parseInt(val).toLocaleString()}
                              </button>
                            ))}
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Transfer Mode</label>
                            <select className="w-full px-4 py-2.5 rounded-xl border border-border text-sm text-foreground bg-white focus:outline-none">
                              <option>UPI (Instant & Free)</option>
                              <option>Netbanking (Atom Gateway)</option>
                              <option>IMPS / NEFT Transfer</option>
                            </select>
                          </div>

                          <button 
                            type="submit" 
                            disabled={fundStatus === 'loading'}
                            className="w-full py-3 bg-[#E21E51] text-white rounded-xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50"
                          >
                            {fundStatus === 'loading' ? 'Processing Transaction...' : 'Transfer Funds'}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* PROFILE */}
              {tab === 'profile' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User profile details */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border/50 shadow-sm space-y-6">
                      <div className="flex items-center gap-4 pb-6 border-b border-border/30">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-md" style={{ background: BRAND.primary }}>
                          {clientId.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground">{PROFILE.name}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 font-mono uppercase"><UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Client ID: {clientId} • Active</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</p>
                          <p className="text-sm font-semibold text-foreground mt-1">{PROFILE.email}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Mobile Number</p>
                          <p className="text-sm font-semibold text-foreground mt-1">{PROFILE.phone}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">PAN Card</p>
                          <p className="text-sm font-semibold text-foreground mt-1 font-mono">{PROFILE.pan}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">NSDL Demat Acc ID</p>
                          <p className="text-sm font-semibold text-foreground mt-1 font-mono">{PROFILE.demat}</p>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/20 border border-border/50 rounded-xl space-y-2">
                        <p className="text-xs font-bold text-foreground flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Account Status Details</p>
                        <p className="text-xs text-muted-foreground">Your trading accounts are fully activated across NSE Equity, BSE Equity, and NSE Futures & Options (F&O) segments. Clearing operations are managed by ACML backoffice integration.</p>
                      </div>
                    </div>

                    {/* Dedicated Relationship Manager */}
                    <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm relative overflow-hidden group">
                      <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 group-hover:scale-110 transition-transform"><User className="w-32 h-32 text-navy" /></div>
                      <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide mb-6">Relationship Manager</h3>
                      
                      <div className="space-y-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground font-bold text-sm">RM</div>
                          <div>
                            <p className="text-sm font-bold text-foreground">{PROFILE.rmName}</p>
                            <p className="text-xs text-muted-foreground">Dedicated Account Manager</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3 pt-4 border-t border-border/30">
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Direct Hotline</p>
                            <p className="text-sm font-semibold text-foreground mt-0.5">{PROFILE.rmPhone}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email Address</p>
                            <a href={`mailto:${PROFILE.rmEmail}`} className="text-sm font-semibold text-primary hover:underline mt-0.5 block">{PROFILE.rmEmail}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* QUICK TRADE */}
              {tab === 'trade' && (
                <div className="max-w-lg">
                  <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-border/50">
                      <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide">Place Order</h3>
                    </div>
                    <div className="p-6">
                      <AnimatePresence>
                        {tradeSuccess && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-bold text-emerald-800">Order Placed Successfully</p>
                              <p className="text-xs text-emerald-600 mt-0.5">{tradeType} {tradeQty} × {tradeSymbol} @ {tradeOrder === 'MARKET' ? 'Market Price' : `₹${tradePrice}`}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <form onSubmit={handleTrade} className="space-y-5">
                        <div className="flex gap-2">
                          {(['BUY', 'SELL'] as const).map(t => (
                            <button key={t} type="button" onClick={() => setTradeType(t)} className={`flex-1 py-2.5 rounded-xl text-sm font-label font-bold transition-all cursor-pointer ${tradeType === t ? t === 'BUY' ? 'bg-emerald-600 text-white' : 'text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70'}`} style={tradeType === t && t === 'SELL' ? { background: BRAND.primary } : {}}>
                              {t}
                            </button>
                          ))}
                        </div>

                        <div>
                          <label className="block text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Symbol</label>
                          <select className="w-full px-4 py-3 rounded-xl border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white" value={tradeSymbol} onChange={e => setTradeSymbol(e.target.value)}>
                            {HOLDINGS.map(h => <option key={h.symbol}>{h.symbol}</option>)}
                            <option>NIFTY 50</option>
                            <option>BANKNIFTY</option>
                          </select>
                        </div>

                        <div className="flex gap-2">
                          {(['MARKET', 'LIMIT'] as const).map(o => (
                            <button key={o} type="button" onClick={() => setTradeOrder(o)} className={`flex-1 py-2 rounded-xl text-xs font-label font-bold border transition-all cursor-pointer ${tradeOrder === o ? 'border-primary text-primary bg-primary/5' : 'border-border text-muted-foreground hover:border-muted-foreground/40'}`}>
                              {o}
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Quantity</label>
                            <input type="number" className="w-full px-4 py-3 rounded-xl border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" value={tradeQty} onChange={e => setTradeQty(e.target.value)} min="1" />
                          </div>
                          {tradeOrder === 'LIMIT' && (
                            <div>
                              <label className="block text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Price (₹)</label>
                              <input type="number" className="w-full px-4 py-3 rounded-xl border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" value={tradePrice} onChange={e => setTradePrice(e.target.value)} step="0.05" />
                            </div>
                          )}
                        </div>

                        {tradeOrder === 'LIMIT' && tradeQty && tradePrice && (
                          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                            <p className="text-xs text-muted-foreground">Estimated Order Value</p>
                            <p className="text-lg font-bold text-foreground mt-0.5">{fmt(parseFloat(tradeQty) * parseFloat(tradePrice))}</p>
                          </div>
                        )}

                        <button type="submit" className={`w-full py-3.5 rounded-xl text-sm font-label font-bold text-white transition-all shadow-md cursor-pointer ${tradeType === 'BUY' ? 'hover:opacity-90' : 'hover:opacity-90'}`} style={{ background: tradeType === 'BUY' ? '#059669' : BRAND.primary }}>
                          {tradeType === 'BUY' ? 'Place Buy Order' : 'Place Sell Order'}
                        </button>
                      </form>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mt-4 text-center">This is a demo trading terminal interface linked to your backoffice ledger.</p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default function ClientTerminal() {
  const [session, setSession] = useState<{ clientId: string; cookies: string } | null>(null);

  if (!session) {
    return <LoginScreen onLogin={(clientId, cookies) => setSession({ clientId, cookies })} />;
  }

  return (
    <Dashboard 
      clientId={session.clientId} 
      sessionCookies={session.cookies} 
      onLogout={() => setSession(null)} 
    />
  );
}
