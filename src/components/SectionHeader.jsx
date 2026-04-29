import React from 'react';

const SectionHeader = ({ number, title }) => {
  return (
    <div className="flex items-center gap-6 mb-16 reveal">
      <span className="text-sm font-mono text-stone-400 dark:text-stone-500">
        {number}
      </span>
      <div className="h-[1px] bg-stone-200 dark:bg-stone-800 flex-grow max-w-[40px]"></div>
      <h2 className="text-3xl font-serif text-dark dark:text-[#f7f5f0]">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
