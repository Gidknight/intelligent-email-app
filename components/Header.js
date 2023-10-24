"use client";

const Header = ({ title, subtext, aria }) => (
	<div
		className='py-10 md:mt-10 w-full px-2 rounded-xl md:pl-10 bg-primary shadow-lg mb-5 flex flex-col items-start justify-between'
		tabIndex={0}
		aria-label={aria}
	>
		<h1 className='font-bold text-3xl uppercase text-white'>
			{title}
			<span className='text-transparent'>.</span>
		</h1>
		{subtext && (
			<h2 className='font-medium text-lg uppercase text-white'>
				From: <span>{subtext}</span>
			</h2>
		)}
	</div>
);

export default Header;
