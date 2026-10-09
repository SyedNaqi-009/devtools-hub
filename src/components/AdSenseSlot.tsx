import React from 'react';

interface AdSenseSlotProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotId = '0000000000',
  format = 'auto',
  className = '',
}) => {
  return (
    <div
      className={`my-8 p-4 rounded-lg bg-[#0d1015] border border-dashed border-[#262d3a] flex flex-col items-center justify-center text-center font-mono text-xs ${className}`}
      data-ad-slot={slotId}
      data-ad-format={format}
    >
      <div className="text-[10px] tracking-wider text-carbon-500 uppercase mb-1">
        Sponsored Developer Resources
      </div>
      <div className="text-carbon-400 text-[11px] max-w-md">
        Cloud infrastructure, database monitoring, and developer tooling announcements.
      </div>
    </div>
  );
};
