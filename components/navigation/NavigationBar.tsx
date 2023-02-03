import React, { useCallback, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import NavigationItem from "./NavigationItem";
import Link from "next/link";

interface Props { }

const navItems = [
    { label: 'home', href: '/'},
    { label: 'about', href: '/about'},
    { label: 'services', href: '/services'},
    { label: 'work', href: '/work'},
];

const NavigationBar: React.FC<Props> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const mobileItemsRef = useRef(null);

    const onItemClick = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <nav>
            <div className="flex items-center justify-between h-16">

                {/* croced logo */}
                <Link href="/" className="flex-shrink-0">
                    croced█
                </Link>

                {/* (desktop) menu items */}
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">    
                    <div className="items-center hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => {
                                return <NavigationItem key={item.href} href={item.href} label={item.label} onClick={onItemClick} />;
                            })}
                        </div>
                    </div>
                </div>
        
                {/* mobile hamburger icon */}
                <div className="-mr-2 flex md:hidden">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        type="button" 
                        className="bg-intu-secondary inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-white hover:bg-intu-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-intu-secondary focus:ring-white" 
                        aria-controls="mobile-menu" 
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="white"
                                    aria-hidden="true"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="white"
                                    aria-hidden="true"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                    </button>
                </div>
            </div>

            {/* (mobile) menu items */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="md:hidden bg-stone-900" id="mobile-menu">
                        <div ref={mobileItemsRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => {
                                return <NavigationItem key={item.href} href={item.href} label={item.label} onClick={onItemClick} mobile />;
                            })}
                        </div>
                    </div>
            </Transition>
        </nav>
    );

}

export default NavigationBar;