"use client";

const LoadingSpinner = ({ label, load }) => {
	return (
		<div className='flex items-center justify-center h-10'>
			<div
				tabIndex={0}
				role='status'
				aria-label={`loading ${load}`}
				aria-live='please be patient, we are fetching your request' // Announce changes to screen readers
				aria-busy='true' // Indicate the spinner is active
			>
				{label && <div className='sr-only'>{label}</div>}{" "}
				{/* Hidden label for screen readers */}
				<div className='relative w-10 h-10'>
					<div className='absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary animate-spin'></div>
					<div className='absolute top-0 left-0 w-full h-full rounded-full border-4 border-tertiary opacity-75 animate-pulse'></div>
					<div className='absolute top-0 left-0 w-full h-full rounded-full border-4 border-secondary opacity-50 animate-pulse'></div>
					<div className='absolute top-0 left-0 w-full h-full rounded-full border-4 border-white opacity-25 animate-pulse'></div>
				</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
