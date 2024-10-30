import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PhotoIcon, HomeIcon } from '@heroicons/react/24/outline';

interface NavItem {
  to: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const navItems: NavItem[] = [
  { to: '/', label: 'My Prompts', Icon: HomeIcon },
  { to: '/gallery', label: 'Gallery', Icon: PhotoIcon },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  const computeActive = (path: string) => {
    if (location.state?.type === "user") {
      return '/' === path
    } else if (location.state?.type === "gallery") {
      return '/gallery' === path
    }
    return location.pathname === path;
  }

  return (
    <nav className="sticky top-0 h-screen w-20 lg:w-60 flex-col items-center justify-between p-4 bg-none hidden md:flex">
      <div className="flex w-full grow flex-col items-center gap-6">
        {/* Logo and brand */}
        <div className="flex-shrink-0 my-3">
          <Link to="/" className="flex items-center justify-center md:justify-start">
            <img
              src="https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png"
              alt="Logo"
              className="h-7 w-7"
            />
            <span className="ml-2 text-black text-md font-semibold hidden lg:inline">Astria Imagine</span>
          </Link>
        </div>
        <div className="flex flex-col text-center w-full space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              label={item.label}
              Icon={item.Icon}
              active={computeActive(item.to)}
            />
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

const NavLink: React.FC<NavLinkProps> = ({ to, label, Icon, active }) => (
  <Link
    to={to}
    className={cn(
      'w-full flex items-center justify-center md:justify-start px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
      active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-black'
    )}
  >
    <Icon className="h-6 w-6" />
    <span className="ml-2 hidden custom-lg:inline">{label}</span>
  </Link>
);

export default Navbar;
