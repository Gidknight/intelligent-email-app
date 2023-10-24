import React, { useState } from "react";
import Button1 from "./Button1";
import { ArrowBackIosNewOutlined, SendOutlined } from "@mui/icons-material";

const ReplyEmail = ({ email, setReply }) => {
	const [message, setMessage] = useState("");

	const fieldStyle = `flex flex-col text-lg`;
	const handleSubmit = () => {
		// reply function

		//other function
		setReply(false);
	};
	return (
		<div className='bg-white w-100 h-88 m-auto z-10 top-1/2 left-1/2 rounded-lg shadow-xl p-5'>
			<h2 className='text-xl font-bold'>Reply Email</h2>
			<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
				<fieldset className={fieldStyle}>
					<label>Receiver: </label>
					<input type='text' value={email} />
				</fieldset>
				<fieldset className={fieldStyle}>
					<label>Message: </label>
					<input
						type='text'
						className='border-2 w-96 h-96 flex flex-col justify-start items-start text-start'
					/>
				</fieldset>

				<Button1
					type={"button"}
					title={"Back"}
					icon={<ArrowBackIosNewOutlined />}
					customFunc={() => setReply(false)}
				/>
				<Button1
					type={"submit"}
					title={"Send"}
					icon={<SendOutlined />}
				/>
			</form>
		</div>
	);
};

export default ReplyEmail;
