"use client";

import { useEffect, useRef, useState } from "react";
import {
	Add,
	ArrowBack,
	Keyboard,
	Refresh,
	Save,
	Send,
	SendRounded,
} from "@mui/icons-material";
import Button1 from "./Button1";
import Button2 from "./Button2";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

import { removeFirstTwoWords } from "../utils";
import ComboBox from "./ComboBox";
import TextInput from "./TextInput";
import Line from "./Line";
import { useRouter } from "next/router";
import { Breadcrumbs } from "@mui/material";
import BreadCrum from "./BreadCrum";

const fieldsetStyle = "flex flex-col text-lg";
const inputStyle = "border-b-2 border-secondary p-2 bg-gray-200 text-secondary";

const getEmailInfo = () => {
	const storedEmailInfo = sessionStorage.getItem("emailInfo");
	const parsedEmailInfo = JSON.parse(storedEmailInfo);
	if (Array.isArray(parsedEmailInfo)) {
		return parsedEmailInfo;
	} else {
		return [];
	}
};

const Recipient = ({
	transcript,
	setTranscript,
	setShowSubject,
	setShowBody,
	setShowRecipient,
	setEmailInfo,
}) => {
	const inputRef = useRef();
	const addRecipient = (event) => {
		// Get existing emailInfo from sessionStorage
		const existingEmailInfo = getEmailInfo();

		const trimmedStr = transcript.split(" ").join("");

		// Add recipient to the contactInfo array
		const updatedEmailInfo = [
			...existingEmailInfo,
			{ recipient: trimmedStr + "@gmail.com" },
		];

		// Update the state with the new emailInfo array
		setEmailInfo(updatedEmailInfo);

		// Store the updated contactInfo in sessionStorage
		sessionStorage.setItem("emailInfo", JSON.stringify(updatedEmailInfo));
		setTranscript("");
		// Show success message
		toast.success(`recipient added successfully`);
	};

	const handleNext = async () => {
		await addRecipient();
		setShowSubject(true);
		setShowBody(false);
		setShowRecipient(false);
	};

	useEffect(() => {
		inputRef.current.focus();
	}, []);
	return (
		<div>
			<fieldset className={fieldsetStyle}>
				<label
					className='font-semibold text-lg capitalize'
					htmlFor='recipient'
				>
					Recipient:{" "}
					<i className='text-base font-light'>(Required)</i>
				</label>

				<input
					ref={inputRef}
					id={"recipient"}
					type={"email"}
					className='p-2 border-b-2 border-primary bg-gray-200 text-lg w-full text-primary'
					placeholder='johnsmith123'
					value={transcript}
					aria-label='enter the recipient email address without the suffix: @gmail.com, as it will be added for you'
					onChange={(e) => setTranscript(e.target.value)}
					required
				/>
			</fieldset>
			<Button2
				title={"Add Recipient"}
				icon={<Add />}
				customFunc={handleNext}
				aria={"click to add recipient"}
			/>
		</div>
	);
};

const Subject = ({
	transcript,
	setTranscript,
	setShowSubject,
	setShowBody,
	setShowRecipient,
	setEmailInfo,
}) => {
	const addSubject = () => {
		// event.preventDefault();

		// Get existing contactInfo from sessionStorage
		const existingEmailInfo = getEmailInfo();

		// Find the last object in the existingContactInfo array
		const lastDraft = existingEmailInfo[existingEmailInfo.length - 1];

		// Add lastName to the lastContact object
		lastDraft.subject = transcript;

		// Update the state with the modified contactInfo array
		setEmailInfo(existingEmailInfo);

		// Store the updated contactInfo in sessionStorage
		sessionStorage.setItem("emailInfo", JSON.stringify(existingEmailInfo));

		// Show success message
		toast.success(`subject added successfully`);
	};

	const handleAddSubject = async () => {
		await addSubject();
		setShowSubject(false);
		setShowBody(true);
		setShowRecipient(false);
		setTranscript("");
	};

	const handlePrev = (e) => {
		e.preventDefault();
		setShowBody(false);
		setShowRecipient(true);
		setShowSubject(false);
	};
	return (
		<div>
			<fieldset className={fieldsetStyle}>
				<label
					className='font-semibold text-lg capitalize'
					htmlFor='subject'
				>
					Subject: <i className='text-base font-light'>(Required)</i>
				</label>

				<TextInput
					id={"subject"}
					type={"text"}
					placeholder={"Subject Of The E-mail"}
					value={transcript}
					customFunc={(e) => setTranscript(e.target.value)}
					aria={"input the subject of the email"}
				/>
			</fieldset>
			<div className='flex flex-row flex-wrap gap-5'>
				<Button2
					title={"add subject"}
					customFunc={handleAddSubject}
					icon={<Add />}
					aria={"click to add the subject"}
				/>
				<Button2
					title={"change Recipient"}
					icon={<ArrowBack />}
					customFunc={handlePrev}
					aria={"click to go back and change recipient"}
				/>
			</div>
		</div>
	);
};

const Body = ({
	transcript,
	setTranscript,
	setShowSubject,
	setShowBody,
	setShowRecipient,
	setEmailInfo,
	setPreview,
	setEmailInfoValues,
}) => {
	const addBody = () => {
		// event.preventDefault();

		// Get existing contactInfo from sessionStorage
		const existingEmailInfo = getEmailInfo();

		// Find the last object in the existingContactInfo array
		const lastDraft = existingEmailInfo[existingEmailInfo.length - 1];

		// Add lastName to the lastContact object
		lastDraft.body = transcript;

		// Update the state with the modified contactInfo array
		setEmailInfo(existingEmailInfo);

		// Store the updated contactInfo in sessionStorage
		sessionStorage.setItem("emailInfo", JSON.stringify(existingEmailInfo));

		// Show success message
		toast.success(`body added successfully`);
	};

	const handleNext = async (event) => {
		event.preventDefault();
		await addBody();
		setShowBody(false);
		setShowRecipient(false);
		setShowSubject(false);
		setPreview(true);
		setEmailInfoValues();
	};

	const handlePrev = (event) => {
		event.preventDefault();
		setShowBody(false);
		setShowRecipient(false);
		setShowSubject(true);
	};
	return (
		<div>
			<fieldset className={fieldsetStyle}>
				<label
					className='font-semibold text-lg capitalize'
					htmlFor='body'
				>
					Body: <i className='text-base font-light'>(Required)</i>
				</label>
				<textarea
					id='body'
					value={transcript}
					required
					onChange={(e) => setTranscript(e.target.value)}
					placeholder='Body of Email'
					className='p-2 w-100 h-80 bg-gray-200  border-b-2 border-secondary'
					aria-label='input the body of the email'
				></textarea>
			</fieldset>
			<div className='flex flex-row gap-5'>
				<Button2
					title={"add body"}
					icon={<Add />}
					customFunc={handleNext}
					aria={"click to add the body"}
				/>
				<Button2
					title={"change subject"}
					icon={<ArrowBack />}
					customFunc={handlePrev}
					aria={"click to go back and change the subject"}
				/>
			</div>
		</div>
	);
};

const Preview = ({
	recipient,
	subject,
	body,
	handleRefresh,
	handleSend,
	editWithKeyboard,
}) => {
	const previewRef = useRef();

	useEffect(() => {
		previewRef.current.focus();
	}, []);
	return (
		<div className='flex flex-col p-1 gap-5' tabIndex={0} ref={previewRef}>
			<h2 className='font-bold text-2xl underline text-primary capitalize'>
				transcript preview:
			</h2>
			<p className='text-primary font-semibold text-lg'>
				Recipient: <span className='text-transcript'>{recipient}</span>.
			</p>
			<p className='text-primary font-semibold text-lg'>
				Subject: <span className='text-transcript'>{subject}</span>.
			</p>
			<p className='text-primary font-semibold text-lg'>
				Body: <span className='text-transcript'>{body}</span>.
			</p>
			<div className='flex flex-row gap-5'>
				<Button2
					title={"Refresh"}
					icon={<Refresh />}
					type={"button"}
					customFunc={handleRefresh}
					aria={"wrong inputs, click to refresh the form"}
				/>
				<Button2
					title={"Edit with Keyboard"}
					icon={<Keyboard />}
					type={"button"}
					aria={"click to edit inputs with keyboard"}
					customFunc={editWithKeyboard}
				/>
				<Button1
					title={"submit"}
					aria={"click to send e-mail, voice command: SUBMIT FORM"}
					type={"button"}
					customFunc={handleSend}
					icon={<Send />}
				/>
			</div>
		</div>
	);
};

const Editable = ({
	recipient,
	setRecipient,
	subject,
	setSubject,
	body,
	setBody,
	handleRefresh,
	handleSend,
	createDraftEmail,
}) => {
	const keysRef = useRef();

	useEffect(() => {
		keysRef.current.focus();
	}, []);
	return (
		<div
			className='flex flex-col gap-2 md:gap-5 w-1/2 border-2 border-gray-500 p-2 md:p-5 rounded-xl text-primary '
			tabIndex={0}
			ref={keysRef}
		>
			<h2 className='font-bold text-xl capitalize border-b-4'>
				Edit with keyboard
			</h2>

			<div className='flex flex-col gap-4'>
				<fieldset>
					<label
						className='font-semibold text-lg'
						htmlFor='recipientPrev'
					>
						Recipient:{" "}
						<i className='text-base font-light'>(Required)</i>
					</label>
					<TextInput
						id={"recipientPrev"}
						type={"text"}
						value={recipient}
						customFunc={(e) => setRecipient(e.target.value)}
					/>{" "}
				</fieldset>
				<fieldset>
					<label
						className='font-semibold text-lg'
						htmlFor='subjectPrev'
					>
						Subject:{" "}
						<i className='text-base font-light'>(Required)</i>
					</label>
					<TextInput
						id={"subjectPrev"}
						type={"text"}
						value={subject}
						customFunc={(e) => setSubject(e.target.value)}
					/>{" "}
				</fieldset>
				<fieldset className='flex flex-col'>
					<label
						className='font-semibold text-lg capitalize'
						htmlFor='bodyPrev'
					>
						Body: <i className='text-base font-light'>(Required)</i>
					</label>
					<textarea
						id='bodyPrev'
						value={body}
						required
						onChange={(e) => setBody(e.target.value)}
						className='p-2 w-100 h-72 bg-gray-200  border-b-2 border-secondary'
					></textarea>
				</fieldset>
			</div>
			<div className='flex flex-row gap-1 md:gap-5'>
				<Button2
					type={"button"}
					title={"Refresh"}
					icon={<Refresh />}
					customFunc={handleRefresh}
					aria={"click to refresh the form"}
				/>
				<Button1
					type={"button"}
					title={"Save Draft"}
					icon={<Save />}
					customFunc={createDraftEmail}
					aria={"click to save as draft"}
				/>
				<Button1
					type={"submit"}
					title={"Send Email"}
					icon={<SendRounded />}
					aria={"click to send email, voice command: SUBMIT FORM"}
					customFunc={handleSend}
				/>
			</div>
		</div>
	);
};

const WriteEmail = ({
	sender,
	transcript,
	setTranscript,
	command,
	setCommand,
}) => {
	const { data: session } = useSession();
	const router = useRouter();
	const [recipient, setRecipient] = useState("");
	const [subject, setSubject] = useState("");
	const [body, setBody] = useState("");
	const [emailInfo, setEmailInfo] = useState([]);

	const [showRecipent, setShowRecipient] = useState(true);
	const [showSubject, setShowSubject] = useState(false);
	const [showBody, setShowBody] = useState(false);
	const [preview, setPreview] = useState(false);
	const [editEmailWithKeyboard, setEditEmailWithKeyboard] = useState(false);

	//functions
	const handleRefresh = () => {
		setRecipient("");
		setBody("");
		setSubject("");
		setPreview(false);
		setShowRecipient(true);
	};

	const handleTranscript = (str) => {
		if (str) {
			const text = removeFirstTwoWords(str);
			return text;
		}
	};

	const handleSend = async () => {
		try {
			const response = await axios.post(
				"https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
				{
					raw: createEmailMessage(sender, recipient, subject, body),
				},
				{
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			toast.success("Email Sent Successfully");
			handleRefresh();
		} catch (error) {
			console.error(error);
		}
	};

	const createDraftEmail = async () => {
		try {
			const response = await axios.post(
				"https://gmail.googleapis.com/gmail/v1/users/me/drafts",
				{
					message: {
						raw: createEmailMessage(
							sender,
							recipient,
							subject,
							body
						),
					},
				},
				{
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				}
			);
			// console.log(response.data);
			handleRefresh();
			setEditEmailWithKeyboard(false);
			toast.success("Email Saved in draft");
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

	const setEmailInfoValues = async () => {
		const emailInfo = await getEmailInfo();
		// Check if contactInfo is a valid array and has at least one element
		if (Array.isArray(emailInfo) && emailInfo.length > 0) {
			// Get the last element of the contactInfo array (assuming it contains the latest values)
			const latestDraft = emailInfo[emailInfo.length - 1];

			// Destructure the latestContact object to get the firstName, lastName, and email fields
			const { recipient, subject, body } = latestDraft;

			// Set the values using the provided set functions
			setRecipient(recipient);
			setSubject(subject);
			setBody(body);
		}
	};

	const editWithKeyboard = () => {
		setEditEmailWithKeyboard(true);
	};
	const handleCommands = () => {};
	return (
		<div
			className='mx-auto bg-slate-100 p-5 rounded-lg shadow-lg w-full '
			aria-label='email form'
			role='form'
			tabIndex={0}
		>
			<BreadCrum />
			<h1 className='font-bold text-xl uppercase text-center text-primary pb-4 '>
				Email sending Form
			</h1>

			<div className='flex flex-col md:flex-row gap-2 md:gap-10 w-100 items-center justify-evenly'>
				<form
					onSubmit={handleSend}
					className='flex flex-col gap-2 md:gap-5 border-2 border-gray-500 p-2 md:p-5 rounded-xl w-1/2'
				>
					<div className='flex flex-col md:flex-row gap-2 md:gap-5'>
						{/* Sender */}
						<fieldset className={fieldsetStyle}>
							<label className='font-semibold text-lg capitalize'>
								From:{" "}
								<i className='text-base font-light'>
									(Auto-filled)
								</i>
							</label>
							{/* <input
								type='text'
								value={sender}
								required
								className='border-b-2 border-secondary p-2 bg-gray-200 text-gray-700 w-100 md:w-96'
							/> */}
							<p className='border-b-2 border-secondary p-2 bg-gray-200 text-gray-700 w-100 md:w-96'>
								{sender}
							</p>
						</fieldset>
					</div>
					<Line />
					{showRecipent && (
						<Recipient
							setShowRecipient={setShowRecipient}
							setShowBody={setShowBody}
							setShowSubject={setShowSubject}
							setTranscript={setTranscript}
							transcript={transcript}
							setEmailInfo={setEmailInfo}
						/>
					)}
					{showSubject && (
						<Subject
							transcript={transcript}
							setTranscript={setTranscript}
							setShowSubject={setShowSubject}
							setShowBody={setShowBody}
							setShowRecipient={setShowRecipient}
							setEmailInfo={setEmailInfo}
						/>
					)}

					{showBody && (
						<Body
							setShowBody={setShowBody}
							setShowSubject={setShowSubject}
							setTranscript={setTranscript}
							transcript={transcript}
							setShowRecipient={setShowRecipient}
							setEmailInfo={setEmailInfo}
							setPreview={setPreview}
							setEmailInfoValues={setEmailInfoValues}
						/>
					)}
					{preview && (
						<Preview
							body={body}
							editWithKeyboard={editWithKeyboard}
							handleRefresh={handleRefresh}
							handleSend={handleSend}
							recipient={recipient}
							subject={subject}
						/>
					)}
				</form>
				{editEmailWithKeyboard && (
					<Editable
						body={body}
						createDraftEmail={createDraftEmail}
						handleRefresh={handleRefresh}
						handleSend={handleSend}
						recipient={recipient}
						setBody={setBody}
						setRecipient={setRecipient}
						setSubject={setSubject}
						subject={subject}
					/>
				)}
			</div>
		</div>
	);
};

export default WriteEmail;
