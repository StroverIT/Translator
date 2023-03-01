import Image from "next/image";
import React from "react";

const Input = ({
  name,
  labelName,
  placeHolder,
  value,
  handler,
  image,
  width,
}) => {
  return (
    <div className={`${width && width}`}>
      <label
        htmlFor={name}
        className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex"
      >
        <div className="relative h-5 w-5 ">
          <Image src={`/icons/${image}.png`} fill alt="bulgarian flag" />
        </div>
        <div className="pl-1">{labelName}</div>
      </label>
      <textarea
        className="block p-2.5 resize h-24 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeHolder}
        onChange={handler}
        id={name}
        name={name}
        value={value}
      ></textarea>
    </div>
  );
};

export default Input;
