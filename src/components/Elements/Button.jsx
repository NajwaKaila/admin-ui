import React from 'react';

function Button(props) {
    const { children, type = "submit", variant = "primary" } = props;

    const baseClasses =
        "w-full h-[42px] rounded-md text-sm w-full cursor-pointer hover:scale-105";

    const variantClasses = {
        primary: "bg-[#25B4A4] text-white",
        secondary: "bg-[#ececec] text-gray-600",
    };

    const finalClasses = `${baseClasses} ${
        variantClasses[variant]
    }`;

    return (
        <button className={finalClasses} type={type}>
            {children}
        </button>
    );
}

export default Button;