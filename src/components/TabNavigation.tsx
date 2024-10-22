import { NavLink } from 'react-router-dom';

const tabs = [
    { name: 'Gallery', path: '/gallery' },
    { name: 'My Images', path: '/' },
];

function TabNavigation() {
    return (
        <nav className="flex space-x-3 justify-end self-start">
            {tabs.map((tab) => (
                <NavLink
                    key={tab.name}
                    to={tab.path}
                    className={({ isActive }) =>
                        `inline-flex text-sm h-9 items-center justify-center rounded-sm 
                        p-2 my-3 transition-colors duration-200 
                        ${isActive ? 'bg-[#5251f6] text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'}`
                    }
                    aria-label={tab.name}
                >
                    {tab.name}
                </NavLink>
            ))}
        </nav>
    );
}

export default TabNavigation;
