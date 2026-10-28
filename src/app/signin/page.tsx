'use client';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-500 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20";

const SignIn = () => {

    const handleSubmitHandler = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");


        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                console.error("Sign-In error:", error);
                alert(error.message || "Sign-In failed. Please try again.");
                return;
            }

            console.log("Sign-In successful:", data);
        } catch (error) {
            console.error("Unexpected sign-in error:", error);
            alert("Something went wrong. Please try again.");
        }

    };
    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }
    const handleGithubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
    }
    return (
        <div className="min-h-screen bg-[#f1f5f0] px-4 py-5">
            <div className="mx-auto w-full max-w-[450px] mt-4">
                {/* Heading */}
                <div className="mb-4 text-center">
                    <h1 className="text-2xl font-extrabold text-gray-900">
                        সাইন ইন
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                {/* Card */}
                <div className="rounded-2xl border border-gray-200 bg-[#fafbf9] p-5 shadow-sm">
                    <form className="space-y-3" onSubmit={handleSubmitHandler}>
                        <div>
                            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-900">
                                ইমেইল
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="you@example.com"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-900">
                                পাসওয়ার্ড
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                minLength={8}
                                placeholder="কমপক্ষে ৮ অক্ষর"
                                className={inputClass}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
                        >
                            সাইন ইন
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-4 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs text-gray-800">অথবা</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Social buttons */}
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <button
                            onClick={handleGoogleSignIn}
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                        >
                            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                            </svg>
                            Google দিয়ে চালিয়ে যান
                        </button>

                        <button
                            onClick={handleGithubSignIn}
                            type="button"
                            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.69 1.26 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                            </svg>
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-900">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link href="/signup" className="text-green-700 hover:underline">
                            সাইন আপ করুন
                        </Link>
                    </p>
                </div>

                <div className="mt-5 text-center text-sm">
                    <Link href="/" className="text-gray-500 hover:text-gray-700">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;