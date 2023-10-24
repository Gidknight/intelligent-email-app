const TaskCard = ({ data }) => {
	<div className='flex flex-row items-center justify-between rounded-xl bg-white border-2 border-gray2 shadow-md p-2 md:p-4 w-80 max-w-full hover:scale-105 focus:scale-105 hover:shadow-xl focus:shadow-xl hover:border-tertiary focus:border-tertiary transition-all'>
		<h3>{data.task}</h3>
		<form
			className='flex flex-row items-between justify-z'
			onSubmit={() => {}}
		>
			<fieldset className='flex items-center justify-center gap-2'>
				<label id='done' htmlFor='done'></label>
				<input
					type='checkbox'
					id='done'
					className='w-5 h-5 cursor-pointer'
					onChange={() => handleClick(event.target.value)}
				/>
			</fieldset>
		</form>
	</div>;
};

export default TaskCard;
