import React, { useState } from "react";
import ButtonLoading from "./ButtonLoading";

const Button1 = ({ title, customFunc, icon, aria, type }) => {
	const [isLoading, setIsLoading] = useState(false);
	const handleClick = (event) => {
		event.preventDefault();
		setIsLoading(true);
		customFunc();
	};
	return (
		<button
			className='capitalize w-100 flex flex-row my-5 items-center gap-2 justify-center bg-gray2 p-2 rounded-lg text-black text-lg hover:bg-primary hover:text-white focus:bg-primary focus:text-white hover:scale-105 focus:scale-110 transition-all hover:font-bold focus:font-bold duration-300'
			onClick={handleClick}
			type={type}
			aria-label={aria}
		>
			{icon}
			{title}
			{isLoading && <ButtonLoading />}
		</button>
	);
};

export default Button1;
