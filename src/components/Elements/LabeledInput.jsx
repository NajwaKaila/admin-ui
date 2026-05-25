import React from 'react';
import Input from "./Input";

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
            <input id={id} {...rest} />
        </>
    );
}

export default LabeledInput;