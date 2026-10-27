
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryType {
    id: number;
    icon: string;
    nameBn: string;
}

const CategoryLinkItem = ({ data }: { data: CategoryType }) => {
    const pathname = usePathname();

    const isActive = pathname === `/category/${data.id}`;

    return (
        <Link
            href={`/category/${data.id}`}
            className={`
                flex items-center gap-2
                rounded-[14px] px-5 py-2
                transition-all duration-200
                ${
                    isActive
                        ? "bg-[#008236] text-white"
                        : "text-[#202B22] hover:bg-[#E6F2E9]"
                }
            `}
        >
            <span className="text-[16px]">
                {data.icon}
            </span>

            <span className="text-[16px] font-semibold">
                {data.nameBn}
            </span>
        </Link>
    );
};

export default CategoryLinkItem;
