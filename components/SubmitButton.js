"use client";

import React, { useState } from "react";
import ButtonLoading from "./ButtonLoading";

const SubmitButton = ({ title, customFunc, icon, aria }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleClick = (event) => {
        setIsLoading(true);
        customFunc();
    };
    return (
        <button
            className="capitalize w-100 flex flex-row my-5 items-center gap-2 justify-center bg-secondary p-2 rounded-lg text-black text-lg hover:bg-primary hover:text-white focus:bg-primary focus:text-white hover:scale-105 focus:scale-110 transition-all hover:font-bold focus:font-bold duration-300"
            onClick={handleClick}
            type="submit"
            aria-label={aria}
        >
            {icon}
            {title}
            {isLoading && <ButtonLoading />}
        </button>
    );
};

export default SubmitButton;
