import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  TrendingUp, TrendingDown, LogOut, BarChart2, Briefcase, List,
  Star, ShoppingCart, RefreshCw, Bell, ChevronDown, Eye, EyeOff,
  ArrowUpRight, ArrowDownRight, Search, X,
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

function LoginScreen({ onLogin }: { onLogin: (id: string) => void }) {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState<'creds' | 'otp'>('creds');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreds = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !password) { setError('Please fill all fields.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('otp'); }, 1000);
  };

  const handleOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) { setError('Enter the 6-digit OTP.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(clientId || 'HL00291'); }, 800);
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition-all";

  return (
    <div className="min-h-screen flex" style={{ background: BRAND.navy }}>
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-16" style={{ background: 'linear-gradient(135deg, #040037 0%, #032075 100%)' }}>
        <Link href="/">
          <img src={hiloniLogo} alt="Hiloni" className="h-12 w-auto object-contain brightness-0 invert cursor-pointer" />
        </Link>
        <div>
          <div className="grid grid-cols-2 gap-4 mb-12">
            {[{ label: 'Portfolio Value', val: '₹23.4 Lakhs' }, { label: 'Today\'s P&L', val: '+₹4,280' }, { label: 'Total Returns', val: '+18.6%' }, { label: 'Active Orders', val: '3' }].map(item => (
              <div key={item.label} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <p className="text-white/50 text-xs font-label font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-white text-xl font-bold">{item.val}</p>
              </div>
            ))}
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">Your Portfolio.<br />Your Power.</h2>
          <p className="text-white/50 text-base">SEBI-regulated trading with institutional-grade tools and dedicated relationship management.</p>
        </div>
        <p className="text-white/30 text-xs">SEBI Reg. INZ000205632 | NSE & BSE Member | NSDL DP</p>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link href="/">
              <img src={hiloniLogo} alt="Hiloni" className="h-10 w-auto object-contain brightness-0 invert cursor-pointer" />
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Client Terminal</h1>
          <p className="text-white/50 text-sm mb-10">Sign in to your Hiloni trading account</p>

          <AnimatePresence mode="wait">
            {step === 'creds' ? (
              <motion.form key="creds" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} onSubmit={handleCreds} className="space-y-4">
                <div>
                  <label className="block text-xs font-label font-semibold text-white/50 uppercase tracking-wider mb-1.5">Client ID</label>
                  <input className={inputCls} placeholder="e.g. HL00291" value={clientId} onChange={e => setClientId(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-white/50 uppercase tracking-wider mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showPass ? 'text' : 'password'} className={inputCls} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-primary text-xs">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-label font-semibold text-white text-sm transition-all" style={{ background: BRAND.primary }}>
                  {loading ? 'Verifying...' : 'Continue →'}
                </button>
                <p className="text-center text-xs text-white/30">
                  Don't have an account?{' '}
                  <Link href="/open-account" className="text-primary hover:underline font-semibold">Open Demat Account</Link>
                </p>
              </motion.form>
            ) : (
              <motion.form key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} onSubmit={handleOtp} className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white/70 mb-2">
                  OTP sent to your registered mobile and email. <span className="text-white font-semibold">(Use any 6 digits to demo)</span>
                </div>
                <div>
                  <label className="block text-xs font-label font-semibold text-white/50 uppercase tracking-wider mb-1.5">6-Digit OTP</label>
                  <input className={inputCls + ' text-xl tracking-[1rem] text-center'} placeholder="------" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/, ''))} />
                </div>
                {error && <p className="text-primary text-xs">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-label font-semibold text-white text-sm transition-all" style={{ background: BRAND.primary }}>
                  {loading ? 'Signing in...' : 'Enter Terminal'}
                </button>
                <button type="button" onClick={() => { setStep('creds'); setOtp(''); setError(''); }} className="w-full py-2 text-sm text-white/40 hover:text-white/70 transition-colors">
                  ← Back
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

type Tab = 'overview' | 'holdings' | 'orders' | 'watchlist' | 'trade';

function Dashboard({ clientId, onLogout }: { clientId: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('overview');
  const [tradeSymbol, setTradeSymbol] = useState('RELIANCE');
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [tradeQty, setTradeQty] = useState('10');
  const [tradePrice, setTradePrice] = useState('2890.50');
  const [tradeOrder, setTradeOrder] = useState<'MARKET' | 'LIMIT'>('LIMIT');
  const [tradeSuccess, setTradeSuccess] = useState(false);
  const [searchQ, setSearchQ] = useState('');
  const livePrices = useTickerPrices(HOLDINGS);

  const totalInvested = HOLDINGS.reduce((s, h) => s + h.qty * h.avg, 0);
  const totalCurrent = HOLDINGS.reduce((s, h) => s + h.qty * (livePrices[h.symbol] || h.ltp), 0);
  const totalPnl = totalCurrent - totalInvested;
  const pnlPct = (totalPnl / totalInvested) * 100;

  const handleTrade = (e: React.FormEvent) => {
    e.preventDefault();
    setTradeSuccess(true);
    setTimeout(() => setTradeSuccess(false), 4000);
  };

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'holdings', label: 'Holdings', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <List className="w-4 h-4" /> },
    { id: 'watchlist', label: 'Watchlist', icon: <Star className="w-4 h-4" /> },
    { id: 'trade', label: 'Trade', icon: <ShoppingCart className="w-4 h-4" /> },
  ];

  const filteredHoldings = HOLDINGS.filter(h =>
    h.symbol.toLowerCase().includes(searchQ.toLowerCase()) ||
    h.name.toLowerCase().includes(searchQ.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BRAND.bg }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 shadow-sm" style={{ background: BRAND.navy }}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/">
              <img src={hiloniLogo} alt="Hiloni" className="h-8 w-auto object-contain brightness-0 invert cursor-pointer" />
            </Link>
            <span className="hidden sm:block h-5 w-px bg-white/20" />
            <span className="hidden sm:block text-white/60 text-xs font-label font-semibold uppercase tracking-widest">Client Terminal</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/50 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-2 text-white text-sm font-label font-semibold">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: BRAND.primary }}>
                {clientId.substring(0, 2).toUpperCase()}
              </div>
              <span className="hidden sm:block">{clientId}</span>
              <ChevronDown className="w-3 h-3 text-white/40" />
            </div>
            <button onClick={onLogout} className="text-white/50 hover:text-white transition-colors" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 py-6 flex-1">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-white rounded-2xl p-1 border border-border/50 shadow-sm w-full sm:w-auto sm:inline-flex">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-label font-semibold transition-all whitespace-nowrap ${tab === item.id ? 'text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              style={tab === item.id ? { background: BRAND.navy } : {}}
            >
              {item.icon} <span className="hidden sm:block">{item.label}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* OVERVIEW */}
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Portfolio Value', val: fmtCr(totalCurrent), sub: `Invested: ${fmtCr(totalInvested)}`, up: true },
                    { label: 'Total P&L', val: `${totalPnl >= 0 ? '+' : ''}${fmt(totalPnl)}`, sub: `${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%`, up: totalPnl >= 0 },
                    { label: "Today's P&L", val: '+₹4,280.50', sub: '+0.62%', up: true },
                    { label: 'Available Margin', val: '₹1,24,500', sub: 'Equity: ₹80,000', up: true },
                  ].map(card => (
                    <div key={card.label} className="bg-white rounded-2xl p-5 border border-border/50 shadow-sm">
                      <p className="text-xs font-label font-bold text-muted-foreground uppercase tracking-wider mb-2">{card.label}</p>
                      <p className="text-xl font-bold text-foreground">{card.val}</p>
                      <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${card.up ? 'text-emerald-600' : 'text-primary'}`}>
                        {card.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {card.sub}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide">Portfolio Performance (6M)</h3>
                      <span className="text-xs font-label text-muted-foreground flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Live</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
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
                        <Pie data={allocationData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                          {allocationData.map((_, i) => <Cell key={i} fill={ALLOC_COLORS[i % ALLOC_COLORS.length]} />)}
                        </Pie>
                        <Tooltip formatter={(v: number) => `${v}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {allocationData.map((d, i) => (
                        <div key={d.name} className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: ALLOC_COLORS[i] }} />
                          <span className="text-xs text-muted-foreground">{d.name}: <strong className="text-foreground">{d.value}%</strong></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top movers */}
                <div className="bg-white rounded-2xl p-6 border border-border/50 shadow-sm">
                  <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide mb-4">Top Holdings</h3>
                  <div className="space-y-3">
                    {HOLDINGS.slice(0, 5).map(h => {
                      const ltp = livePrices[h.symbol] || h.ltp;
                      const pnl = (ltp - h.avg) * h.qty;
                      const pct = ((ltp - h.avg) / h.avg) * 100;
                      return (
                        <div key={h.symbol} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white" style={{ background: BRAND.navy }}>{h.symbol.substring(0, 2)}</div>
                            <div>
                              <p className="text-sm font-bold text-foreground">{h.symbol}</p>
                              <p className="text-xs text-muted-foreground">{h.qty} shares</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-foreground">{fmt(ltp)}</p>
                            <p className={`text-xs font-semibold ${pnl >= 0 ? 'text-emerald-600' : 'text-primary'}`}>{pnl >= 0 ? '+' : ''}{fmt(pnl)} ({pct.toFixed(2)}%)</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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
                    <input className="pl-8 pr-4 py-2 rounded-xl border border-border text-sm bg-muted/30 w-48 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Search symbol..." value={searchQ} onChange={e => setSearchQ(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50 bg-muted/20">
                        {['Symbol', 'Qty', 'Avg Cost', 'LTP', 'Invested', 'Current', 'P&L', 'P&L %'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-label font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
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
                          <tr key={h.symbol} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-bold text-foreground">{h.symbol}</p>
                                <p className="text-xs text-muted-foreground">{h.sector}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 font-semibold text-foreground">{h.qty}</td>
                            <td className="px-4 py-3 text-muted-foreground">{fmt(h.avg)}</td>
                            <td className="px-4 py-3 font-bold text-foreground">{fmt(ltp)}</td>
                            <td className="px-4 py-3 text-muted-foreground">{fmt(invested)}</td>
                            <td className="px-4 py-3 font-semibold text-foreground">{fmt(current)}</td>
                            <td className={`px-4 py-3 font-bold ${pnl >= 0 ? 'text-emerald-600' : 'text-primary'}`}>{pnl >= 0 ? '+' : ''}{fmt(pnl)}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${pct >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
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
                <div className="p-4 bg-muted/20 border-t border-border/30 flex flex-wrap gap-6 text-sm">
                  <span className="text-muted-foreground">Invested: <strong className="text-foreground">{fmt(totalInvested)}</strong></span>
                  <span className="text-muted-foreground">Current: <strong className="text-foreground">{fmt(totalCurrent)}</strong></span>
                  <span className={`font-bold ${totalPnl >= 0 ? 'text-emerald-600' : 'text-primary'}`}>Total P&L: {totalPnl >= 0 ? '+' : ''}{fmt(totalPnl)} ({pnlPct.toFixed(2)}%)</span>
                </div>
              </div>
            )}

            {/* ORDERS */}
            {tab === 'orders' && (
              <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-border/50 flex items-center justify-between">
                  <h3 className="text-sm font-label font-bold text-foreground uppercase tracking-wide">Order Book — Today</h3>
                  <button className="flex items-center gap-1.5 text-xs font-label font-semibold text-muted-foreground hover:text-foreground transition-colors">
                    <RefreshCw className="w-3.5 h-3.5" /> Refresh
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50 bg-muted/20">
                        {['Order ID', 'Symbol', 'Type', 'Qty', 'Price', 'Exchange', 'Time', 'Status'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-label font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ORDERS.map(o => (
                        <tr key={o.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{o.id}</td>
                          <td className="px-4 py-3 font-bold text-foreground">{o.symbol}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${o.type === 'BUY' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>{o.type}</span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-foreground">{o.qty}</td>
                          <td className="px-4 py-3 text-foreground">{fmt(o.price)}</td>
                          <td className="px-4 py-3 text-muted-foreground text-xs font-label font-semibold">{o.exchange}</td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">{o.time}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold ${o.status === 'Executed' ? 'bg-emerald-50 text-emerald-700' : o.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-muted text-muted-foreground'}`}>{o.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                        <p className="font-bold text-foreground text-sm">{w.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{w.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                        <p className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${w.change >= 0 ? 'text-emerald-600' : 'text-primary'}`}>
                          {w.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {w.change >= 0 ? '+' : ''}{w.change.toFixed(2)} ({w.pct >= 0 ? '+' : ''}{w.pct.toFixed(2)}%)
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TRADE */}
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
                          <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
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
                          <button key={t} type="button" onClick={() => setTradeType(t)} className={`flex-1 py-2.5 rounded-xl text-sm font-label font-bold transition-all ${tradeType === t ? t === 'BUY' ? 'bg-emerald-600 text-white' : 'text-white' : 'bg-muted text-muted-foreground hover:bg-muted/70'}`} style={tradeType === t && t === 'SELL' ? { background: BRAND.primary } : {}}>
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
                          <button key={o} type="button" onClick={() => setTradeOrder(o)} className={`flex-1 py-2 rounded-xl text-xs font-label font-bold border transition-all ${tradeOrder === o ? 'border-primary text-primary bg-primary/5' : 'border-border text-muted-foreground hover:border-muted-foreground/40'}`}>
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

                      <button type="submit" className={`w-full py-3.5 rounded-xl text-sm font-label font-bold text-white transition-all shadow-md ${tradeType === 'BUY' ? 'hover:opacity-90' : 'hover:opacity-90'}`} style={{ background: tradeType === 'BUY' ? '#059669' : BRAND.primary }}>
                        {tradeType === 'BUY' ? 'Place Buy Order' : 'Place Sell Order'}
                      </button>
                    </form>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center">This is a demo terminal. No real trades are executed.</p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ClientTerminal() {
  const [clientId, setClientId] = useState<string | null>(null);

  if (!clientId) return <LoginScreen onLogin={setClientId} />;
  return <Dashboard clientId={clientId} onLogout={() => setClientId(null)} />;
}
