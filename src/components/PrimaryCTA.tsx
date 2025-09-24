import Link from 'next/link';

interface PrimaryCTAProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function PrimaryCTA({ 
  href, 
  children, 
  className = '', 
  onClick 
}: PrimaryCTAProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        gradient-cta text-white px-8 py-4 rounded-full font-medium
        hover:shadow-lg hover:scale-105 transition-all duration-200 
        inline-flex items-center justify-center
        focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0
        active:scale-95
        ${className}
      `}
    >
      {children}
    </Link>
  );
}
