
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LogOut, UserRound } from "lucide-react";

const ProfilePage = () => {
    const router = useRouter();

    const { data: session, isPending, refetch } = authClient.useSession();
    const user = session?.user;

    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Set name from logged-in user
    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user?.name]);

    // Redirect if not logged in
    useEffect(() => {
        if (!isPending && !user) {
            router.replace("/signin");
        }
    }, [isPending, user, router]);

    // Update user name
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedName = name.trim();

        if (!updatedName) {
            setError("নাম লিখুন");
            setMessage("");
            return;
        }

        setIsUpdating(true);
        setMessage("");
        setError("");

        try {
            const { error: updateError } = await authClient.updateUser({
                name: updatedName,
            });

            if (updateError) {
                throw new Error(
                    updateError.message || "Update failed"
                );
            }

            await refetch();
            router.refresh();

            setMessage("নাম সফলভাবে আপডেট হয়েছে!");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "নাম আপডেট করা যায়নি"
            );
        } finally {
            setIsUpdating(false);
        }
    };

    // Sign out
    const handleSignOut = async () => {
        setIsSigningOut(true);
        setError("");

        try {
            const { error: signOutError } = await authClient.signOut();

            if (signOutError) {
                throw new Error(
                    signOutError.message || "Sign out failed"
                );
            }

            router.push("/signin");
            router.refresh();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "সাইন আউট করা যায়নি"
            );
        } finally {
            setIsSigningOut(false);
        }
    };

    // Loading
    if (isPending) {
        return (
            <div className="min-h-screen bg-[#F1F6F2] px-5 py-8">
                <div className="mx-auto max-w-[820px] animate-pulse space-y-6">
                    <div className="h-12 w-48 rounded-lg bg-gray-200" />
                    <div className="h-[132px] rounded-2xl bg-gray-200" />
                    <div className="h-[280px] rounded-2xl bg-gray-200" />
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <section className="min-h-screen bg-[#F1F6F2] py-5">
            <div className="container mx-auto px-4">

                <div className="max-w-[820px] mx-auto">

                    {/* Page Heading */}
                    <div className="mb-7">
                        <h1 className="text-[26px] font-extrabold text-[#202B22]">
                            আমার প্রোফাইল
                        </h1>

                        <p className="mt-1 text-[14px] text-[#68736B]">
                            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                        </p>
                    </div>

                    {/* Profile Information Card */}
                    <div className="flex flex-col gap-5 rounded-[18px] border border-[#DFE8DF] bg-white/75 p-6 sm:flex-row sm:items-center sm:justify-between">

                        {/* User Information */}
                        <div className="flex items-center gap-5">

                            {/* Profile Image */}
                            <div className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#F1F3F1]">

                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name || "Profile"}
                                        fill
                                        sizes="88px"
                                        className="object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <UserRound
                                        size={40}
                                        className="text-[#68736B]"
                                    />
                                )}
                            </div>

                            {/* Name and Email */}
                            <div className="min-w-0">
                                <h2 className="break-words text-[21px] font-bold text-[#202B22]">
                                    {user.name}
                                </h2>

                                <p className="mt-1 break-all text-[15px] text-[#68736B]">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        {/* Sign Out Button */}
                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="flex shrink-0 cursor-pointer items-center justify-center gap-2 self-start rounded-xl border border-red-500 bg-white px-5 py-3 text-[14px] font-semibold text-red-500 transition-all duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
                        >
                            <LogOut size={18} />

                            {isSigningOut
                                ? "সাইন আউট হচ্ছে..."
                                : "সাইন আউট"}
                        </button>
                    </div>

                    {/* Edit Information Card */}
                    <div className="mt-7 rounded-[18px] border border-[#DFE8DF] bg-white/75 p-6 sm:p-8">

                        <h2 className="mb-10 text-[18px] font-bold text-[#202B22]">
                            তথ্য
                        </h2>

                        <form onSubmit={handleUpdate}>

                            {/* Name Field */}
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-[14px] font-medium text-[#202B22]"
                                >
                                    নাম
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setError("");
                                        setMessage("");
                                    }}
                                    placeholder="আপনার নাম লিখুন"
                                    required
                                    className="h-[46px] w-full rounded-xl border border-[#DFE8DF] bg-transparent px-4 text-[15px] text-[#202B22] outline-none transition-colors focus:border-[#05893E] focus:ring-1 focus:ring-[#05893E]"
                                />
                            </div>

                            {/* Success Message */}
                            {message && (
                                <p
                                    role="status"
                                    className="mb-4 text-[14px] text-green-600"
                                >
                                    {message}
                                </p>
                            )}

                            {/* Error Message */}
                            {error && (
                                <p
                                    role="alert"
                                    className="mb-4 text-[14px] text-red-500"
                                >
                                    {error}
                                </p>
                            )}

                            {/* Update Button */}
                            <button
                                type="submit"
                                disabled={isUpdating || !name.trim()}
                                className="flex h-[46px] w-full cursor-pointer items-center justify-center rounded-xl bg-[#008C3C] text-[15px] font-semibold text-white shadow-[0_4px_0_#006B2E] transition-all duration-200 hover:bg-[#007B34] active:translate-y-[2px] active:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isUpdating
                                    ? "আপডেট হচ্ছে..."
                                    : "আপডেট"}
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
