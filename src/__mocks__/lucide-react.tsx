import React from 'react';

// Create a generic functional component to mock any icon from lucide-react
const IconMock: React.FC<{
  className?: string;
  size?: number | string;
  [key: string]: any;
}> = ({ className = '', size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`lucide lucide-icon ${className}`}
    {...props}
    data-testid="lucide-icon"
  >
    <rect x="2" y="2" width="20" height="20" rx="2" ry="2" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </svg>
);

// Export all lucide-react icons as the same mock component
export const Check = IconMock;
export const X = IconMock;
export const Menu = IconMock;
export const ChevronDown = IconMock;
export const ChevronUp = IconMock;
export const ChevronRight = IconMock;
export const ChevronLeft = IconMock;
export const Search = IconMock;
export const ArrowRight = IconMock;
export const MapPin = IconMock;
export const Phone = IconMock;
export const Mail = IconMock;
export const Globe = IconMock;

// Default export
const LucideReactMock = {
  Check: IconMock,
  X: IconMock,
  Menu: IconMock,
  ChevronDown: IconMock,
  ChevronUp: IconMock,
  ChevronRight: IconMock,
  ChevronLeft: IconMock,
  Search: IconMock,
  ArrowRight: IconMock,
  MapPin: IconMock,
  Phone: IconMock,
  Mail: IconMock,
  Globe: IconMock,
};

export default LucideReactMock;