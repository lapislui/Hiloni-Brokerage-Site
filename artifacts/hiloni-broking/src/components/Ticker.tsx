import React from 'react';

const mockData = [
  { symbol: 'NIFTY 50', value: '22,450.40', change: '+1.2%', isPositive: true },
  { symbol: 'SENSEX', value: '74,119.55', change: '+0.8%', isPositive: true },
  { symbol: 'BANKNIFTY', value: '48,320.15', change: '-0.3%', isPositive: false },
  { symbol: 'RELIANCE', value: '2,890.50', change: '+2.1%', isPositive: true },
  { symbol: 'TCS', value: '3,750.80', change: '+0.5%', isPositive: true },
  { symbol: 'HDFC Bank', value: '1,540.20', change: '-0.4%', isPositive: false },
  { symbol: 'INFY', value: '1,456.90', change: '+1.8%', isPositive: true },
  { symbol: 'WIPRO', value: '485.25', change: '+0.9%', isPositive: true },
  { symbol: 'ICICI Bank', value: '1,123.40', change: '+1.5%', isPositive: true },
  { symbol: 'L&T', value: '3,245.70', change: '+0.7%', isPositive: true },
];

export function Ticker() {
  const repeatedData = [...mockData, ...mockData, ...mockData]; // Repeat to fill screen and smooth loop

  return (
    <div className="w-full bg-foreground text-background py-2 overflow-hidden flex whitespace-nowrap border-b border-border/10">
      <div className="flex animate-ticker-scroll hover:[animation-play-state:paused]">
        {repeatedData.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 px-6 border-r border-border/20 last:border-0">
            <span className="font-label font-semibold text-sm tracking-wide">{item.symbol}</span>
            <span className="font-mono text-sm opacity-90">{item.value}</span>
            <span className={`font-mono text-sm font-semibold ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
