import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  to: string;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/', label: 'My Prompts' },
  { to: '/gallery', label: 'Gallery' },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 h-screen w-60 flex-col items-center justify-between bg-white p-6 shadow-lg hidden md:flex">
      <div className="flex w-full grow flex-col items-center gap-6">
        <Link to="/" className="mb-8 text-xl font-semibold text-black">
          Imagine
        </Link>
        <div className="flex flex-col text-center w-full space-y-4">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} label={item.label} active={location.pathname === item.to} />
          ))}
        </div>
      </div>
      <footer className="text-sm text-gray-500"></footer>
    </nav>
  );
};

interface NavLinkProps extends NavItem {
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, active }) => (
  <Link
    to={to}
    className={cn(
      'w-full px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
      active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'
    )}
  >
    {label}
  </Link>
);

export default Navbar;
