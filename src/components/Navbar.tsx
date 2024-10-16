import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/', label: 'My Prompts' },
  { to: '/gallery', label: 'Gallery' },
];

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 flex h-screen w-[214px] shrink-0 flex-col items-center justify-between gap-4 overflow-visible bg-light-mode p-5 pb-[calc(20px+env(safe-area-inset-bottom))] pl-[22px] pr-[32px] text-gray-900">
      <div className="flex w-full grow flex-col select-none items-start gap-3 whitespace-nowrap">
        <Link to="/" className="mb-4">
          <span className="text-xl font-bold">Imagine</span>
        </Link>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} label={item.label} />
        ))}
      </div>
    </nav>
  );
};

const NavLink: React.FC<NavItem> = ({ to, label }) => (
  <Link to={to} className="hover:text-gray-600 transition-colors duration-200">
    <span>{label}</span>
  </Link>
);

export default Navbar;