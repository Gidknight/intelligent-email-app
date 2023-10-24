const TextInput = ({
	value,
	customFunc,
	placeholder,
	id,
	type,
	aria,
	role,
}) => {
	return (
		<input
			role={role}
			aria-label={aria}
			id={id}
			type={type}
			className='p-2 border-b-2 border-primary bg-gray-200 text-lg w-full text-primary'
			placeholder={placeholder}
			value={value}
			onChange={customFunc}
			required
		/>
	);
};

export default TextInput;
