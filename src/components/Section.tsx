import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Section({ 
  children, 
  className = '', 
  padding = 'md' 
}: SectionProps) {
  const paddingClasses = {
    sm: 'py-12',
    md: 'py-18', // 72px
    lg: 'py-20'  // 80px
  };

  return (
    <section className={`${paddingClasses[padding]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
