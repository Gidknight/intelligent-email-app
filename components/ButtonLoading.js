const ButtonLoading = () => (
	<div className='flex items-center justify-center h-5'>
		<div className='relative w-5 h-5'>
			<div className='absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray2 animate-spin'></div>
			<div className='absolute top-0 left-0 w-full h-full rounded-full border-4 border-white animate-ping'></div>
		</div>
	</div>
);

export default ButtonLoading;
