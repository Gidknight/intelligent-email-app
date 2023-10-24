import { useEffect, useRef, useState } from "react";
import {
	BackButton,
	Button1,
	Button2,
	Header,
	Line,
	TextInput,
	VoiceControl,
} from "../../../components";
import { useSession } from "next-auth/react";
import {
	Add,
	ArrowBack,
	Cancel,
	ChangeCircle,
	Delete,
	Keyboard,
	Mic,
	Refresh,
	Send,
	SendRounded,
	Update,
	UpdateOutlined,
} from "@mui/icons-material";

import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-hot-toast";

const fieldsetStyle = "flex flex-col text-lg";
const getEmailInfo = () => {
	const storedEmailInfo = sessionStorage.getItem("emailInfo");
	const parsedEmailInfo = JSON.parse(storedEmailInfo);
	if (Array.isArray(parsedEmailInfo)) {
		return parsedEmailInfo;
	} else {
		return [];
	}
};

const DraftedMessage = ({ from, to, subject, decodedBody }) => (
	<div
		className='shadow-xl border-2 border-gray1 rounded-lg p-4'
		tabIndex={0}
	>
		<div className='w-100'>
			<p className='text-primary text-lg font-semibold'>From: </p>
			<p className='text-primary font-medium ml-4 p-2 border-b-2 bg-gray-100 border-primary rounded-sm'>
				{from}
			</p>
		</div>
		<div>
			<p className='text-primary text-lg font-semibold'>To: </p>
			<p className='text-primary font-medium ml-4 p-2 border-b-2 bg-gray-100 border-primary rounded-sm'>
				{to}
			</p>
		</div>
		<div>
			<p className='text-primary text-lg font-semibold'>Subject: </p>
			<p className='text-primary font-medium ml-4 p-2 border-b-2 bg-gray-100 border-primary rounded-sm'>
				{subject}
			</p>
		</div>
		<div className='w-100 whitespace-normal'>
			<p className='text-primary text-lg font-semibold'>Body: </p>
			<div className=' text-primary font-medium ml-4 p-2 border-b-2 bg-gray-100 border-primary rounded-sm whitespace-normal'>
				{decodedBody}
			</div>
		</div>
	</div>
);

const Recipient = ({
	transcript,
	setTranscript,
	setShowSubject,
	setShowBody,
	setShowRecipient,
	setEmailInfo,
	to,
	setEditDraft,
}) => {
	const reciRef = useRef();
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
	const handleCancel = () => {
		setShowRecipient(false);
		setEditDraft(false);
	};
	useEffect(() => {
		reciRef.current.focus();
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
					ref={reciRef}
					id={"recipient"}
					type='email'
					className='p-2 border-b-2 border-primary bg-gray-200 text-lg w-full text-primary'
					placeholder={to}
					value={transcript}
					onChange={(e) => setTranscript(e.target.value)}
					required
				/>
			</fieldset>
			<div className='flex flex-row gap-4'>
				<Button2
					title={"Add Recipient"}
					icon={<Add />}
					type={"button"}
					customFunc={handleNext}
					aria={"click to add recipient"}
				/>
				<Button2
					title={"Cancel Edit"}
					icon={<Cancel />}
					type={"button"}
					customFunc={handleCancel}
					aria={"click to cancel edit"}
				/>
			</div>
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
				/>
			</fieldset>
			<div className='flex flex-row flex-wrap gap-5'>
				<Button2
					title={"add subject"}
					customFunc={handleAddSubject}
					icon={<Add />}
					aria={"click to add subject"}
					type={"button"}
				/>
				<Button2
					title={"change Recipient"}
					icon={<ArrowBack />}
					customFunc={handlePrev}
					type={"button"}
					aria={"click to change recipient"}
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
				></textarea>
			</fieldset>
			<div className='flex flex-row gap-5'>
				<Button2
					title={"add body"}
					icon={<Add />}
					customFunc={handleNext}
					aria={"click to add body"}
					type={"button"}
				/>
				<Button2
					title={"change subject"}
					icon={<ArrowBack />}
					customFunc={handlePrev}
					aria={"click to change subject"}
					type={"button"}
				/>
			</div>
		</div>
	);
};

const NewDraft = ({
	recipient,
	topic,
	message,
	handleUpdate,
	sendEmail,
	editWithKeyboard,
}) => {
	const newRef = useRef();

	useEffect(() => {
		newRef.current.focus();
	}, []);
	return (
		<div className='w-1/2 shadow-md p-5' tabIndex={0} ref={newRef}>
			<h3 className='text-primary font-bold text-lg text-center'>
				New Draft
			</h3>
			<p className='text-primary font-semibold text-lg'>
				Recipient: <span className='text-transcript'>{recipient}</span>.
			</p>
			<p className='text-primary font-semibold text-lg'>
				Subject: <span className='text-transcript'>{topic}</span>.
			</p>
			<p className='text-primary font-semibold text-lg'>
				Body: <span className='text-transcript'>{message}</span>.
			</p>
			<div className='flex flex-row gap-5'>
				<Button1
					title={"update"}
					icon={<UpdateOutlined />}
					type={"button"}
					customFunc={handleUpdate}
					aria={"click to update draft"}
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
					aria={"click to send email"}
					type={"button"}
					customFunc={sendEmail}
					icon={<Send />}
				/>
			</div>
		</div>
	);
};

const KeysEdit = ({
	recipient,
	setRecipient,
	topic,
	setTopic,
	message,
	setMessage,
	handleUpdate,
	sendEmail,
}) => {
	const editRef = useRef();

	useEffect(() => {
		editRef.current.focus();
	}, []);
	return (
		<div className='w-1/2 shadow-md p-5' tabIndex={0} ref={editRef}>
			<h3 className='text-primary font-bold text-lg text-center'>
				Edit Draft with Keyboard
			</h3>

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
						value={topic}
						customFunc={(e) => setTopic(e.target.value)}
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
						value={message}
						required
						onChange={(e) => setMessage(e.target.value)}
						className='p-2 w-100 h-72 bg-gray-200  border-b-2 border-secondary'
					></textarea>
				</fieldset>
			</div>

			<div className='flex flex-row gap-1 md:gap-5'>
				<Button1
					title={"update"}
					icon={<UpdateOutlined />}
					type={"button"}
					customFunc={handleUpdate}
					aria={"click to update draft"}
				/>

				<Button1
					title={"send"}
					aria={"click to send email"}
					type={"button"}
					customFunc={sendEmail}
					icon={<Send />}
				/>
			</div>
		</div>
	);
};
const Page = () => {
	const userRef = useRef();
	const { data: session } = useSession();
	const [transcript, setTranscript] = useState("");

	const [command, setCommand] = useState("");

	const [emailInfo, setEmailInfo] = useState([]);
	const route = useRouter();
	const { data } = route.query;

	const decodedDraft = JSON.parse(decodeURIComponent(data));
	const { from, to, subject, body, date, id } = decodedDraft;
	let decodedBody = atob(body);

	// states
	const [topic, setTopic] = useState("");
	const [recipient, setRecipient] = useState("");
	const [message, setMessage] = useState("");

	const [showRecipent, setShowRecipient] = useState(true);
	const [showSubject, setShowSubject] = useState(false);
	const [showBody, setShowBody] = useState(false);

	const [preview, setPreview] = useState(false);
	const [editDraft, setEditDraft] = useState(false);
	const [editEmailWithKeyboard, setEditEmailWithKeyboard] = useState(false);

	const fieldsetStyle = "flex flex-col text-lg";
	const inputStyle =
		"border-b-2 border-secondary p-2 bg-gray-200 text-secondary";

	//functions
	const handleRefresh = () => {
		setRecipient("");
		setTopic("");
		setMessage("");
	};
	const sendEmail = async () => {
		try {
			const response = await axios.post(
				"https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
				{
					raw: createEmailMessage(from, recipient, topic, message),
				},
				{
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);

			handleRefresh();
			toast.success("Email Sent");
			route.push("/emails");
		} catch (error) {
			console.error(error);
		}
	};

	// Helper function to create the email message
	const createEmailMessage = (from, recipient, topic, message) => {
		const email = [
			`From: ${from}`,
			`To: ${recipient}`,
			`Subject: ${topic}`,
			"",
			message,
		].join("\n");

		const encodedEmail = Buffer.from(email).toString("base64");
		return encodedEmail;
	};

	const handleUpdate = async () => {
		try {
			const response = await axios.put(
				`https://gmail.googleapis.com/gmail/v1/users/me/drafts/${id}`,
				{
					message: {
						raw: createEmailMessage(
							from,
							recipient,
							topic,
							message
						),
					},
				},
				{
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				}
			);

			toast.success("Draft Updated Successfully");
			route.push("/email");
		} catch (error) {
			console.error(error);
		}
	};

	const handleDelete = async (event) => {
		try {
			const response = await axios.delete(
				`https://gmail.googleapis.com/gmail/v1/users/me/drafts/${id}`,
				{
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				}
			);

			toast.success("Draft Deleted");
			route.push("/email");
		} catch (error) {
			console.error(error);
		}
	};

	const editWithKeyboard = () => {
		setEditEmailWithKeyboard(true);
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
			setTopic(subject);
			setMessage(body);
		}
	};

	const handlecommands = () => {
		if (command === "delete") {
			handleDelete();
		} else if (command === "send" || command === "submit") {
			sendEmail();
		} else if (command === "update") {
			handleUpdate();
		} else {
			setCommand("");
		}
	};
	useEffect(() => {
		userRef.current.focus();
		handlecommands();
	}, []);

	return (
		<section
			className={`flex flex-col items-center justify-center mt-2  pt-20 md:pt-10 md:px-10 w-full bg-white scroll-smooth overscroll-none `}
		>
			<Header
				title={"Edit Draft"}
				subtext={null}
				aria={"you are in the edit draft page"}
			/>
			<div className='flex flex-col w-full'>
				<Line />
				<div className=' flex flex-col items-center justify-center w-100'>
					<VoiceControl
						setTranscript={setTranscript}
						setCommand={setCommand}
					/>
				</div>
				<Line />
				<div
					className='flex border-2 p-5 rounded-lg shadow-lg w-full '
					ref={userRef}
					tabIndex={0}
				>
					{!editDraft && (
						<div className='flex flex-col items-center justify-center mx-auto  w-full '>
							<h3 className='text-center text-lg font-bold text-primary uppercase'>
								Drafted Message
							</h3>
							<DraftedMessage
								decodedBody={decodedBody}
								from={from}
								subject={subject}
								to={to}
							/>

							<Line />
							<div className='flex flex-row flex-wrap gap-4'>
								<Button2
									icon={<Send />}
									title={"Send"}
									customFunc={sendEmail}
									aria={"click to send draft to recipient"}
								/>
								<Button2
									icon={<ChangeCircle />}
									title={"Edit"}
									customFunc={() => setEditDraft(true)}
									aria={"click to edit draft"}
								/>
								<Button1
									customFunc={handleDelete}
									icon={<Delete />}
									title={"Delete"}
									aria={"click to delete draft"}
								/>
							</div>
						</div>
					)}

					{editDraft && (
						<form
							onSubmit={sendEmail}
							className='flex flex-col mx-auto gap-2 md:gap-5 border-2 border-gray-500 p-2 md:p-5 rounded-xl w-full'
						>
							<h1 className='font-bold text-xl uppercase text-center text-primary pb-4 '>
								Email sending Form
							</h1>
							<div className='flex flex-col gap-2 md:gap-5'>
								{/* Sender */}
								<fieldset className={fieldsetStyle}>
									<label className='font-semibold text-lg capitalize'>
										From:{" "}
										<i className='text-base font-light'>
											(Auto-filled)
										</i>
									</label>
									<input
										type='text'
										value={from}
										required
										className='border-b-2 border-secondary p-2 bg-gray-200 text-gray-700 w-100 md:w-96'
									/>
								</fieldset>
								<Line />
								{/* Reciever */}
								{showRecipent && (
									<Recipient
										setShowRecipient={setShowRecipient}
										setShowBody={setShowBody}
										setShowSubject={setShowSubject}
										setTranscript={setTranscript}
										transcript={transcript}
										setEmailInfo={setEmailInfo}
										to={to}
										setEditDraft={setEditDraft}
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
							</div>
							{preview && (
								<div className='flex flex-row flex-wrap w-full items-center justify-evenly'>
									<div className='w-1/2'>
										<h3 className='text-primary font-bold text-lg text-center'>
											Old Draft
										</h3>
										<DraftedMessage
											decodedBody={decodedBody}
											from={from}
											subject={subject}
											to={to}
										/>
									</div>
									{!editEmailWithKeyboard ? (
										<NewDraft
											editWithKeyboard={editWithKeyboard}
											handleUpdate={handleUpdate}
											message={message}
											recipient={recipient}
											sendEmail={sendEmail}
											topic={topic}
										/>
									) : (
										<KeysEdit
											handleUpdate={handleUpdate}
											message={message}
											recipient={recipient}
											sendEmail={sendEmail}
											setMessage={setMessage}
											setRecipient={setRecipient}
											setTopic={setTopic}
											topic={topic}
										/>
									)}
								</div>
							)}
						</form>
					)}
				</div>
				<div className='mx-auto pb-10'>
					<BackButton />
				</div>
			</div>
		</section>
	);
};

export default Page;
