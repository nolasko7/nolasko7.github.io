import React from 'react';

const SectionHeader = ({ number, title }) => {
  return (
    <div className="flex items-center gap-6 mb-16 reveal">
      <span className="text-sm font-mono text-stone-500 dark:text-stone-400">
        {number}
      </span>
      <div className="h-[1px] bg-stone-200 dark:bg-stone-800 flex-grow max-w-[40px]"></div>
      <h2 className="text-3xl font-serif text-[#141410] dark:text-[#f7f5f0] transition-colors">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
