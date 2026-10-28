
import React from "react";

const Footer = () => {
    return (
        <footer className="w-full border-t border-[#E2E8E2] bg-[#F9FBF9] py-5">
            <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 text-center md:flex-row md:text-left">

                {/* Left Side */}
                <p className="text-[12px] text-[#364039]">
                    বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
                </p>

                {/* Right Side */}
                <p className="text-[12px] text-[#364039]">
                    সকল দাম সহায়ক; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
                </p>

            </div>
        </footer>
    );
};

export default Footer;
