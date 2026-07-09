import React from "react";

function LabeledInput(props) {
  const { label, id, error, ...rest } = props;

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
        {...rest}
        className={`w-full h-[42px] rounded-md border px-3 text-sm outline-none transition-all ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-[#25B4A4]"
        }`}
      />
    </>
  );
}

export default LabeledInput;