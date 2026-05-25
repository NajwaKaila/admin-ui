import React from 'react';

function LabeledInput(props) {
    const { label, id, ...rest } = props;

    return (
        <>
            <label
                htmlFor={id}
                className="block text-[12px] font-medium mb-2 text-gray-700"
            >
                {label}
            </label>

            <input
                id={id}
                className="w-full h-[42px] px-4 text-sm rounded-md border border-gray-300 bg-transparent focus:outline-none focus:border-[#25B4A4]"
                {...rest}
            />
        </>
    );
}

export default LabeledInput;