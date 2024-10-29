import { NavLink } from 'react-router-dom';
import { PhotoIcon, HomeIcon } from '@heroicons/react/24/outline';

const tabs = [
    { name: 'My Images', path: '/', icon: HomeIcon },
    { name: 'Gallery', path: '/gallery', icon: PhotoIcon },
];

function MobileTabNav() {
    return (
        <nav className="md:hidden z-20 fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 shadow-lg border-gray-200 dark:border-zinc-700">
            <ul className="flex justify-around">
                {tabs.map((tab) => (
                    <NavLink
                        key={tab.name}
                        to={tab.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center p-2 text-xs transition-colors duration-200 
                            ${isActive ? 'text-[#5251f6]' : 'text-zinc-500 dark:text-zinc-400 hover:text-[#5251f6]'}`
                        }
                        aria-label={tab.name}
                    >
                        <tab.icon className="w-6 h-6 mb-1" aria-hidden="true" />
                        <span>{tab.name}</span>
                    </NavLink>
                ))}
            </ul>
        </nav>
    );
}

export default MobileTabNav;
