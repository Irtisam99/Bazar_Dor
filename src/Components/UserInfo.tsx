
"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogOut, UserRound, ChevronDown } from "lucide-react";

const UserInfo = () => {
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Sign Out
    const handleSignOut = async () => {
        try {
            setIsSigningOut(true);

            const { error } = await authClient.signOut();

            if (error) {
                throw new Error(error.message || "Sign out failed");
            }

            setIsOpen(false);
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Sign out error:", error);
        } finally {
            setIsSigningOut(false);
        }
    };

    // Prevent sign-in buttons flashing while loading session
    if (isPending) {
        return (
            <div className="h-[52px] w-[160px] animate-pulse rounded-xl bg-gray-200" />
        );
    }

    // User not signed in
    if (!user) {
        return (
            <div className="flex items-center gap-4">
                <Link
                    href="/signin"
                    className="rounded-xl px-4 py-3 font-bold text-neutral-700 transition-colors hover:text-[#05893E]"
                >
                    সাইন ইন
                </Link>

                <Link
                    href="/signup"
                    className="rounded-xl bg-[#05893E] px-5 py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#057636]"
                >
                    সাইন আপ
                </Link>
            </div>
        );
    }

    // User signed in
    return (
        <div ref={dropdownRef} className="relative">

            {/* Profile Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors hover:bg-[#F1F5F1]"
            >
                {/* Profile Image */}
                <div className="relative flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F1F3F1]">

                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || "Profile"}
                            fill
                            sizes="52px"
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <UserRound
                            size={27}
                            className="text-[#68736B]"
                        />
                    )}
                </div>

                {/* User First Name */}
                <span className="text-[20px] font-semibold text-[#202B22]">
                    {user.name?.split(" ")[0] || "User"}
                </span>

                <ChevronDown
                    size={17}
                    className={`text-[#68736B] transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    role="menu"
                    className="absolute right-0 top-[calc(100%+12px)] z-50 w-[min(340px,calc(100vw-32px))] rounded-[22px] border border-[#DFE8DF] bg-white p-6 shadow-[0_12px_30px_rgba(0,0,0,0.15)]"
                >
                    {/* User Information */}
                    <div className="">
                        <h3 className="break-words text-[22px] font-bold text-[#202B22]">
                            {user.name}
                        </h3>

                        <p className="mt-1 break-all text-[15px] text-[#68736B]">
                            {user.email}
                        </p>
                    </div>

                    {/* Dropdown Links */}
                    <div className="flex flex-col">

                        {/* My Profile */}
                        <Link
                            href="/profile"
                            role="menuitem"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-xl px-1 py-3 text-[18px] font-medium text-[#202B22] transition-colors hover:bg-[#F1F5F1]"
                        >
                            <UserRound
                                size={24}
                                className="text-[#647B91]"
                            />

                            <span>আমার প্রোফাইল</span>
                        </Link>

                        {/* Sign Out */}
                        <button
                            type="button"
                            role="menuitem"
                            disabled={isSigningOut}
                            onClick={handleSignOut}
                            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-1 py-1 text-left text-[18px] font-medium text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <LogOut size={24} />

                            <span>
                                {isSigningOut
                                    ? "সাইন আউট হচ্ছে..."
                                    : "সাইন আউট"}
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
