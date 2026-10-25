"use client";

import { useEffect, useState } from "react";

const BanglaData = () => {
    const [date, setDate] = useState("");

    useEffect(() => {
        const formattedDate = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
        });

        setDate(formattedDate);
    }, []);

    return <span>{date || "\u00A0"}</span>;
};

export default BanglaData;
