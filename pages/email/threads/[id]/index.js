"use client";

import { useState } from "react";
import {
	AudioBtn,
	BackButton,
	Button1,
	Header,
	MessageContent,
	ReplyComponent,
} from "../../../../components";
import { useSession } from "next-auth/react";
import { Delete, Language, ReplyOutlined } from "@mui/icons-material";

import { useRouter } from "next/router";
import { onMic } from "../../../../utils";
import axios from "axios";
import { toast } from "react-hot-toast";

const Page = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const { data } = router.query;
	// States
	// const [email, setEmail] = useState(decodedBody || 0);
	const [translateOpt, setTranslateOpt] = useState(true);
	const [lang, setLang] = useState("en");
	const [langOptions, setLangOptions] = useState(false);
	const [readerOptions, setReaderOptions] = useState(false);
	const [reply, setReply] = useState(false);
	const controlBtn = `border-2 gap-1 flex flex-row rounded-full border-secondary hover:border-tertiary focus:border-tertiary bg-lightWhite hover:bg-tertiary focus:bg-tertiary focus:font-bold focus:text-white hover:text-white px-2 py-1 text-gray1 transition-all hover:shadow-lg focus:shadow-2xl hover:scale-110 focus:scale-110`;

	const decodedThread = JSON.parse(decodeURIComponent(data));
	const { from, to, subject, messages, date, id } = decodedThread;
	const messageArray = messages?.payload;
	console.log(messageArray);

	const extractProperties = (data) => {
		const extractedData = [];

		for (let i = 0; i < data.length; i++) {
			const { threadId, payload } = data[i];
			const { body, headers } = payload;
			const extractedItem =
				i === 0
					? { threadId, body }
					: { id: headers.id, body: body.data };

			// Loop through headers array
			if (headers && headers.length > 0) {
				for (let j = 0; j < headers.length; j++) {
					const { name, value } = headers[j];
					if (name === "From") {
						extractedItem.from = value;
					} else if (name === "To") {
						extractedItem.to = value;
					} else if (name === "Subject") {
						extractedItem.subject = value;
					} else if (name === "Date") {
						extractedItem.date = value;
					}
				}
			}

			extractedData.push(extractedItem);
		}

		return extractedData;
	};

	const threads = extractProperties(messages);

	// states
	const [topic, setTopic] = useState(subject || "");
	const [reciever, setReciever] = useState(to || "");

	const fieldsetStyle = "flex flex-col text-lg";
	const inputStyle =
		"border-b-2 border-secondary p-2 bg-gray-200 text-secondary";

	//functions
	const handleRefresh = () => {
		setReciever("");
		setTopic("");
		setMessage("");
	};

	const handleTrash = async (event) => {
		try {
			const response = await axios.post(
				`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/trash`,
				null, // Request body is set to null since no data is being sent
				{
					headers: {
						Authorization: `Bearer ${session?.accessToken}`,
					},
				}
			);
			toast.success("Trashed successfully");
			router.push("/email");
		} catch (error) {
			console.error(error);
		}
	};

	const sendEmail = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post(
				"https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
				{
					raw: createEmailMessage(from, reciever, subject, message),
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
		} catch (error) {
			console.error(error);
		}
	};

	// Helper function to create the email message
	const createEmailMessage = (from, reciever, topic, message) => {
		const email = [
			`From: ${from}`,
			`To: ${reciever}`,
			`Subject: ${topic}`,
			"",
			message,
		].join("\n");

		const encodedEmail = Buffer.from(email).toString("base64");
		return encodedEmail;
	};

	return (
		<section
			className={`flex flex-col items-center justify-center mt-2  pt-20 md:pt-10 md:px-10 w-full bg-white scroll-smooth overscroll-none `}
		>
			<Header title={"Thread page"} subtext={from} />
			<div className='flex flex-col w-100'>
				<div className='mx-auto bg-slate-100 p-5 rounded-lg shadow-lg w-full '>
					<div className='p-2 flex flex-col w-100 items-center gap-2'>
						<div className='flex flex-row gap-5'>
							<button
								className={controlBtn}
								onClick={() => {
									setLangOptions((prev) => !prev);
									setReaderOptions(false);
									// let focus = () => subRef.current.focus();
									// focus();
								}}
							>
								<Language />
								Change Language
							</button>
						</div>
						<div className='py-5 px-3 bg-white rounded-xl'>
							{/* language settings */}
							{langOptions && (
								<div className='flex flex-row gap-5'>
									<button
										className={controlBtn}
										ref={subRef}
										onClick={() => changeLanguage("fr")}
										value={"french"}
									>
										To French
									</button>
									<button
										className={controlBtn}
										onClick={() => changeLanguage("de")}
										value={"german"}
									>
										To German
									</button>
									<button
										className={controlBtn}
										onClick={() => changeLanguage("it")}
										value={"italian"}
									>
										To Italian
									</button>
									<button
										className={controlBtn}
										onClick={() => changeLanguage("es")}
										value={"spanish"}
									>
										To Spanish
									</button>
									<button
										className={controlBtn}
										onClick={() => changeLanguage("en")}
										value={"english"}
									>
										To English
									</button>
								</div>
							)}
						</div>
					</div>

					{/* email box */}
					<div className='mx-auto bg-lightWhite relative w-100 h-100 rounded-xl shadow-xl border-2 border-gray2 focus:border-primary'>
						<div className='flex flex-row justify-between p-2 m-2'>
							<h3 className='text-primary text-lg font-semibold'>
								From: {from}
							</h3>
							<h3 className='text-primary text-lg font-semibold'>
								Time: {date}
							</h3>
						</div>
						<hr className=' h-1 bg-gray1 ' />

						<div className='flex flex-col items-center w-full h-full'>
							<div
								className='mx-auto p-2 gap-2 w-100 h-full relative'
								aria-label='Email Body'
							>
								<h3 className='uppercase font-bold text-center text-xl text-primary'>
									{subject}
								</h3>

								<div
									className='text-xl/8 text-secondary font-normal w-100 overflow-auto h-100 relative p-2 m-2 border-gray1 border-t-2'
									style={{
										maxHeight: "500px",
										maxWidth: "1000px",
									}}
								>
									{/* <MessageContent content={email} /> */}
								</div>
							</div>
							<hr className=' h-1 bg-gray1 ' />
							<div className='p-2 justify-between'>
								{/* <DeleteOutline /> */}
							</div>
							<button
								className='font-semibold border-2 p-2 rounded-full bg-gray2 hover:bg-secondary hover:shadow-lg hover:text-white transition-all'
								onClick={() => setReply(!reply)}
							>
								<ReplyOutlined /> Reply
							</button>
							<Button1
								icon={<Delete />}
								title={"trash"}
								type={"button"}
								aria={"trash"}
								customFunc={handleTrash}
							/>
						</div>
						{reply && (
							<ReplyComponent sender={from} recipient={to} />
						)}
					</div>
				</div>
			</div>
			<div className='mx-auto pb-10'>
				<BackButton />
			</div>
		</section>
	);
};

export default Page;
