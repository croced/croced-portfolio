import Link from "next/link";
import React from "react";
import { useRouter } from 'next/router'

interface Props {
    href: string;
    label: string;
    mobile?: boolean;
    onClick?: () => void;
}

const underlineStyling: string = " relative z-2 underline-offset-4 decoration-2 decoration-intu-primary " as const;
const desktopStyling: string = "px-3 py-2 rounded-md text-sm font-medium" as const;
const mobileStyling: string = "block px-3 py-2 rounded-md text-base font-medium" as const;

const NavigationItem: React.FC<Props> = ({href, label, mobile, onClick}) => {
    
    const router = useRouter();
    const isActive = router.pathname === href;

    return (
        <Link 
            href={href}
            onClick={onClick}
            className={
                (isActive ? "underline" : "hover:underline text-text-primary") + underlineStyling + (mobile ? mobileStyling : desktopStyling)
            }
        >
           {label}
        </Link>
    )
}

export default NavigationItem;