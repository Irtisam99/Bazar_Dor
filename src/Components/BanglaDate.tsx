
"use client";

import { useState } from "react";

const BanglaData = () => {
    const [date] = useState(() => {
        return new Intl.DateTimeFormat("bn-BD", {
            timeZone: "Asia/Dhaka",
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(new Date());
    });

    return <span>{date}</span>;
};

export default BanglaData;
