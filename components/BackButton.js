"use client";

import { ArrowBackIosNew } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const BackButton = () => {
	const route = useRouter();
	return (
		<button
			aria-label='click to go back to previous page'
			type='button'
			onClick={() => route.back()}
			className='w-100 flex flex-row my-5 items-center gap-2 justify-center bg-gray2 p-2 rounded-lg text-lg hover:bg-primary hover:text-white focus:bg-primary focus:text-white hover:scale-105 focus:scale-110 transition-all hover:font-bold focus:font-bold duration-300'
		>
			<ArrowBackIosNew />
			Go Back
		</button>
	);
};

export default BackButton;
