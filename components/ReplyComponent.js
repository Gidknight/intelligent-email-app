"use client";

import { useEffect, useRef, useState } from "react";

import {
	Keyboard,
	KeyboardAlt,
	Refresh,
	Save,
	SendRounded,
} from "@mui/icons-material";

import Button1 from "./Button1";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";
import VoiceNavigation from "./VoiceNavigation";

const ReplyComponent = ({
	sender,
	recipient,
	subject,
	setReply,
	setTranscript,
	transcript,
}) => {
	const router = useRouter();
	const { data: session } = useSession();
	const replyRef = useRef(null);
	const [command, setCommand] = useState("");
	const [body, setBody] = useState(transcript);
	const [editWithKeys, setEditWithKeys] = useState(false);

	const fieldsetStyle = "flex flex-col text-lg";
	const inputStyle =
		"border-b-2 border-secondary p-2 bg-gray-200 text-secondary";

	//functions
	const handleRefresh = () => {
		setTranscript("");
		setBody("");
		setReply(false);
	};

	const handleReply = async () => {
		try {
			const response = await axios.post(
				"https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
				{
					raw: createEmailMessage(
						sender,
						recipient,
						subject,
						transcript
					),
				},
				{
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			toast.success("Reply Sent Successfully");
			// handleRefresh();
			router.push("/email");
		} catch (error) {
			console.error(error);
		}
	};

	// Helper function to create the email message
	const createEmailMessage = (sender, recipient, subject, body) => {
		const email = [
			`From: ${sender}`,
			`To: ${recipient}`,
			`Subject: ${subject}`,
			"",
			body,
		].join("\n");

		const encodedEmail = Buffer.from(email).toString("base64");
		return encodedEmail;
	};
	const handleKeyPress = () => {
		setEditWithKeys(!editWithKeys);
	};

	useEffect(() => {
		replyRef.current.focus();
	}, []);

	return (
		<div
			className='mx-auto bg-slate-50 p-5 rounded-lg shadow-lg w-full '
			aria-label='reply'
			role='form'
			tabIndex={0}
		>
			{!editWithKeys && (
				<form
					onSubmit={handleReply}
					className='flex flex-col gap-2 md:gap-5 border-2 border-gray-500 p-2 md:p-5 rounded-xl'
				>
					<fieldset className={fieldsetStyle}>
						<label
							className='font-semibold text-lg capitalize'
							htmlFor='body'
						>
							Body:{" "}
							<i className='text-base font-light'>(Required)</i>
						</label>
						<textarea
							id='body'
							value={transcript}
							ref={replyRef}
							onChange={(e) => setTranscript(e.target.value)}
							placeholder='Body of Reply'
							className='p-2 w-100 h-72 bg-gray-200  border-b-2 border-secondary'
						></textarea>
					</fieldset>

					<div className='w-80 flex flex-row gap-4'>
						<Button1
							type={"submit"}
							title={"Send Reply"}
							icon={<SendRounded />}
							aria={"click to send reply"}
							customFunc={handleReply}
						/>
						<Button1
							type={"button"}
							title={"Keyboard"}
							icon={<Keyboard />}
							aria={"click to edit with keyboard"}
							customFunc={handleKeyPress}
						/>
					</div>
				</form>
			)}

			{editWithKeys && (
				<form
					onSubmit={handleReply}
					className='flex flex-col gap-2 md:gap-5 border-2 border-gray-500 p-2 md:p-5 rounded-xl'
				>
					<fieldset className={fieldsetStyle}>
						<label
							className='font-semibold text-lg capitalize'
							htmlFor='body'
						>
							Body:{" "}
							<i className='text-base font-light'>
								{" "}
								keyboard edit (Required)
							</i>
						</label>
						<textarea
							id='body'
							value={body}
							ref={replyRef}
							onChange={(e) => setBody(e.target.value)}
							placeholder='Body of Reply'
							className='p-2 w-100 h-72 bg-gray-200  border-b-2 border-secondary'
						></textarea>
					</fieldset>

					<div className='w-80 flex flex-row gap-4'>
						<Button1
							type={"submit"}
							title={"Send Reply"}
							icon={<SendRounded />}
							aria={"click to send reply"}
							customFunc={handleReply}
						/>
						<Button1
							type={"button"}
							title={"Keyboard"}
							icon={<KeyboardAlt />}
							aria={"click to disable keyboard"}
							customFunc={handleKeyPress}
						/>
					</div>
				</form>
			)}
		</div>
	);
};

export default ReplyComponent;
