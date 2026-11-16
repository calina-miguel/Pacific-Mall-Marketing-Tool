'use client';
import { useState, useEffect } from 'react';

export default function CyberFooter() {
  const [status, setStatus] = useState("SYNCING");

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => prev === "SYNCING" ? "ONLINE" : "SYNCING");
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 border-t border-pm-accent/20 p-2 flex justify-between px-6 text-[10px] font-mono text-pm-accent uppercase tracking-widest z-50">
      <div className="flex gap-4">
        <span>System Status: <span className="text-white">{status}</span></span>
        <span>Data Stream: Active</span>
      </div>
      <div>Pacific Mall Mandaue Core V1.0</div>
    </div>
  );
}
