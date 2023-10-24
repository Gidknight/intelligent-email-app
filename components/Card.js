"use client";

const Card = ({ title }) => {
	return (
		<div className='rounded-xl bg-primary hover:bg-tertiary hover:scale-105 transition-all p-6 shadow-sm w-64 h-48 flex items-center justify-center hover:shadow-2xl'>
			<h2 className='text-3xl font-bold text-white'>{title}</h2>
		</div>
	);
};

export default Card;
