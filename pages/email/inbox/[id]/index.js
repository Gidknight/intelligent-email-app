"use client";

import React, { useEffect, useRef, useState } from "react";
import {
	Delete,
	Language,
	Pause,
	PlayArrow,
	ReplyOutlined,
	Stop,
	VoiceChat,
} from "@mui/icons-material";
import Head from "next/head";
import {
	BackButton,
	Button1,
	Button2,
	Header,
	Line,
	MessageContent,
	Navbar,
	ReplyComponent,
	ReplyEmail,
	VoiceControl,
} from "../../../../components";
import { useRouter } from "next/router";

import { devistyTranslate } from "../../../../utils/devisty-text-translator";
import { sendTextToSpeech } from "../../../../utils/kelvin-text-to-speech";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const Page = () => {
	// hooks
	const userRef = useRef();
	const subRef = useRef();
	const router = useRouter();

	const { data: session } = useSession();
	const { data } = router.query;

	const decode = () => {
		try {
			const decodedData = JSON.parse(decodeURIComponent(data));
			return decodedData;
		} catch (error) {
			console.error(error);
		}
	};

	let decodedData = decode();
	const { from, to, subject, body, date, id } = decodedData;

	const decodedBody = atob(body?.data?.replace(/-/g, "+").replace(/_/g, "/"));
	// const decodedBody = atob(body?.data);
	// const decodedBody = Buffer.from(body?.data, "base64").toString();

	// States
	const [email, setEmail] = useState(decodedBody || 0);
	const [translateOpt, setTranslateOpt] = useState(true);
	const [lang, setLang] = useState("en");
	const [langOptions, setLangOptions] = useState(false);
	const [readerOptions, setReaderOptions] = useState(false);
	const [reply, setReply] = useState(false);

	const [transcript, setTranscript] = useState("");
	const [command, setCommand] = useState("");

	// classes
	const controlBtn = `border-2 gap-1 flex flex-row rounded-full border-secondary hover:border-tertiary focus:border-tertiary bg-lightWhite hover:bg-tertiary focus:bg-tertiary focus:font-bold focus:text-white hover:text-white px-2 py-1 text-gray1 transition-all hover:shadow-lg focus:shadow-2xl hover:scale-110 focus:scale-110`;

	// Functions
	const changeLanguage = async (value) => {
		setLangOptions(false);
		//run this first
		// const emailLang = await detectLanguage(email);
		// run this second
		// const newEmail = await translate(email, emailLang, value);
		setLang(value);
		const newEmail = await devistyTranslate(email, lang, value);
		setEmail(newEmail);
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

	const handleCommands = () => {
		if (command === "french") {
			changeLanguage("fr");
			toast.success("translating to french");
		} else if (command === "german") {
			changeLanguage("de");
			toast.success("translating to german");
		} else if (command === "italian") {
			changeLanguage("it");
			toast.success("translating to italian");
		} else if (command === "spanish") {
			changeLanguage("es");
			toast.success("translating to spanish");
		} else if (command === "english") {
			changeLanguage("en");
			toast.success("translating to english");
		} else if (command === "trash") {
			handleTrash();
		} else if (command === "reply") {
			setReply(true);
		} else {
			setCommand("language not supported");
		}
	};

	useEffect(() => {
		userRef.current.focus();
		handleCommands();
	}, [command]);

	return (
		<div>
			<Head>
				<title>Email Reader App</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<section className='flex flex-col justify-center items-center w-full'>
				<div
					className={`mx-auto md:m-auto mt-2 p-2 pt-20 md:pt-14 md:p-10 w-full bg-white scroll-smooth overscroll-none `}
				>
					<Header
						title={"Email page"}
						subtext={from}
						aria={`you are viewing mesaage from ${from}`}
					/>
					<Line />
					<div className='flex flex-col items-center justify-center'>
						<VoiceControl
							setTranscript={setTranscript}
							setCommand={setCommand}
						/>
						{transcript && (
							<p className='text-transcript text-center'>
								Transcript: {transcript}
							</p>
						)}
					</div>
					<Line />
					{/* controls 1 */}
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
						<div className='py-2 px-3 bg-white rounded-xl'>
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
					<div
						tabIndex={0}
						className='mx-auto bg-lightWhite relative w-100 h-100 rounded-xl shadow-xl border-2 border-gray2 focus:border-primary'
					>
						<div className='flex flex-row justify-between p-2 m-2'>
							<h3 className='text-primary text-lg font-semibold'>
								From: {from}
							</h3>
							<h3 className='text-primary text-lg font-semibold'>
								Time: {date}
							</h3>
						</div>
						<hr className=' h-1 bg-gray1 ' />

						<div
							className='flex flex-col items-center w-full h-full'
							ref={userRef}
							tabIndex={0}
						>
							<div className='mx-auto p-2 gap-2 w-100 h-full relative'>
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
									<MessageContent content={email} />
								</div>
							</div>
							<hr className=' h-1 bg-gray1 ' />
							<div className=' flex flex-row gap-5 p-2 justify-between '>
								<Button1
									icon={<Delete />}
									title={"trash"}
									type={"button"}
									aria={"trash"}
									customFunc={handleTrash}
								/>
								<Button2
									icon={<ReplyOutlined />}
									title={"reply"}
									type={"button"}
									aria={"reply"}
									customFunc={() => setReply(!reply)}
								/>
							</div>
						</div>
						{reply && (
							<ReplyComponent
								transcript={transcript}
								setTranscript={setTranscript}
								sender={from}
								recipient={to}
								subject={subject}
								setReply={setReply}
							/>
						)}
					</div>
				</div>
				<div className='mx-auto'>
					<BackButton />
				</div>
			</section>
		</div>
	);
};

export default Page;
