import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-mono text-carbon-400 mb-6 overflow-x-auto whitespace-nowrap">
      <Link
        href="/"
        className="flex items-center gap-1 text-carbon-300 hover:text-terminal-emerald transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>hub</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-carbon-500 shrink-0" />
            {isLast || !item.href ? (
              <span className="text-terminal-emerald font-semibold truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-carbon-300 hover:text-terminal-emerald transition-colors truncate max-w-[200px] sm:max-w-none"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
