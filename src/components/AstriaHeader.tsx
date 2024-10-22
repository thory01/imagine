import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"


const Navbar = () => {
    const navigation = [
        { name: 'Tunes', path: '/tunes' },
        { name: 'Packs', path: '/gallery/packs' },
        { name: 'Themes', path: '/themes' },
        { name: 'Generate', path: '/prompts' },
        { name: 'Imagine', path: '/' },
        { name: 'Docs', path: '/docs' },
        {name: 'Showcase', path: '/showcase'},
    ];

    return (
        <nav className="bg-gradient-to-b from-[#fafbfc] text-black sticky top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo and brand */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src="https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png"
                                alt="Logo"
                                className="h-10 w-10"
                            />
                            <span className="ml-2 text-xl font-semibold">Astria</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    {/* User Menu - Desktop */}
                    <div className="hidden md:flex items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="text-sm">
                                    user@example.com ($3.50)
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    </div>


                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-[#fafbfc] w-64 text-black">
                                <div className="flex flex-col space-y-4 mt-8">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className="px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <div className="pt-4 border-t border-gray-800">
                                        <p className="px-3 py-2 text-sm">user@example.com ($3.50)</p>
                                        <Link to="/profile" className="px-3 py-2 block text-sm hover:bg-gray-800">Profile</Link>
                                        <Link to="/settings" className="px-3 py-2 block text-sm hover:bg-gray-800">Settings</Link>
                                        <button className="px-3 py-2 w-full text-left text-sm hover:bg-gray-800">Logout</button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;