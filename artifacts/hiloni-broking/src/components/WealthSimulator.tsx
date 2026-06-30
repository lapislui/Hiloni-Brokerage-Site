import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';

export function WealthSimulator() {
  const [lumpsum, setLumpsum] = useState(1000000);
  const [sip, setSip] = useState(5000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(15);

  const [projectedValue, setProjectedValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);

  useEffect(() => {
    // Formula: FV = PV*(1+r)^n + SIP*((1+r)^n - 1)/r
    const r = (rate / 100) / 12; // monthly rate
    const n = years * 12; // total months
    
    let fvLumpsum = 0;
    if (lumpsum > 0) {
      fvLumpsum = lumpsum * Math.pow(1 + r, n);
    }
    
    let fvSip = 0;
    if (sip > 0 && r > 0) {
      fvSip = sip * ((Math.pow(1 + r, n) - 1) / r) * (1 + r); // standard SIP formula usually assumes payment at beginning of month
    }

    const totalFv = fvLumpsum + fvSip;
    const invested = lumpsum + (sip * n);

    setProjectedValue(totalFv);
    setTotalInvested(invested);
  }, [lumpsum, sip, years, rate]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatCr = (val) => {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  };

  const chartData = [
    { name: 'Equity', value: 60, color: '#E21E51' },
    { name: 'Debt', value: 25, color: '#032075' },
    { name: 'Alternative', value: 15, color: '#040037' },
  ];

  return (
    <section id="simulator" className="py-24 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Simulator Left */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-card border border-border p-8 rounded-3xl shadow-sm"
          >
            <div className="mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Ecosystem Wealth Simulator</h2>
              <p className="text-muted-foreground text-lg">Discover the compound returns. Make informed capital decisions, simulate growth scenarios.</p>
            </div>

            <div className="space-y-8">
              {/* Lumpsum */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-label font-semibold text-sm text-foreground uppercase tracking-wide">Band 1 (Lumpsum)</label>
                  <span className="text-xl font-bold font-mono text-primary">{formatCurrency(lumpsum)}</span>
                </div>
                <input 
                  type="range" 
                  min="100000" 
                  max="5000000" 
                  step="50000"
                  value={lumpsum} 
                  onChange={(e) => setLumpsum(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* SIP */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-label font-semibold text-sm text-foreground uppercase tracking-wide">Band 2 (SIP / mo)</label>
                  <span className="text-xl font-bold font-mono text-primary">{formatCurrency(sip)}</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="100000" 
                  step="500"
                  value={sip} 
                  onChange={(e) => setSip(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Years */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-label font-semibold text-sm text-foreground uppercase tracking-wide">Investment Period</label>
                  <span className="text-xl font-bold font-mono text-foreground">{years} Years</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  step="1"
                  value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Rate */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="font-label font-semibold text-sm text-foreground uppercase tracking-wide">Expected Return</label>
                  <span className="text-xl font-bold font-mono text-foreground">{rate}%</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="30" 
                  step="1"
                  value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-border">
              <div>
                <div className="text-sm font-label font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total Invested</div>
                <div className="text-2xl font-bold font-mono text-foreground">{formatCurrency(totalInvested)}</div>
              </div>
              <div>
                <div className="text-sm font-label font-semibold text-muted-foreground uppercase tracking-wider mb-2">Projected Profit</div>
                <div className="text-2xl font-bold font-mono text-green-600">{formatCurrency(projectedValue - totalInvested)}</div>
              </div>
            </div>
          </motion.div>

          {/* Chart Right */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-foreground p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            
            <h3 className="text-xs font-label font-bold text-muted uppercase tracking-widest mb-10 w-full text-left">Portfolio Projection</h3>
            
            <div className="relative w-full h-[300px] mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={120}
                    stroke="none"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#040037', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-sm font-label text-muted-foreground/80 uppercase tracking-widest mb-1">Projected</span>
                <span className="text-4xl font-bold text-background font-mono">{formatCr(projectedValue)}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 w-full mt-auto pt-8 border-t border-white/10">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-label text-background/90">{item.name} {item.value}%</span>
                </div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
