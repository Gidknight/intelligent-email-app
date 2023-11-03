"use client";

const PageButton = ({ icon, text, ariaLabel, isActive, customFunction }) => {
    const menuClass = `text-lg font-bold p-3 text-primary hover:text-white focus:text-white hover:bg-primary focus:bg-secondary rounded-full border-gray2 transition-all border-2 bg-lightWhite flex items-center gap-2`;
    const activeClass = `text-xl font-bold p-3 text-white focus:text-white bg-primary focus:bg-secondary rounded-full border-primary transition-all border-2 flex items-center gap-2`;

    return (
        <button
            className={isActive ? activeClass : menuClass}
            onClick={customFunction}
            aria-pressed={isActive}
            aria-label={ariaLabel}
            disabled={isActive}
        >
            {icon}
            {text}
        </button>
    );
};

export default PageButton;
