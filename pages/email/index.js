"use client";

import { useEffect, useState } from "react";
import {
	Header,
	Line,
	BackButton,
	WriteEmail,
	Drafts,
	Thread,
	Inbox,
	VoiceControl,
} from "../../components";

import Head from "next/head";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
	DraftsOutlined,
	EmailOutlined,
	Outbox,
	Send,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { createArray } from "../../utils";

const Email = () => {
	const [command, setCommand] = useState("");
	const [transcript, setTranscript] = useState("");
	const { data: session } = useSession();

	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [inbox, setInbox] = useState(false);
	const [compose, setCompose] = useState(true);
	const [showDrafts, setShowDrafts] = useState(false);
	const [thread, setThread] = useState(false);

	//arrays
	const [personalEmails, setPersonalEmails] = useState([]);
	const [threads, setThreads] = useState([]);
	const [drafts, setDrafts] = useState([]);

	// pagination states
	const [draftPage, setDraftPage] = useState(0);
	const [draftPageSize, setDraftPageSize] = useState(10);

	const [threadPage, setThreadPage] = useState(0);
	const [threadPageSize, setThreadPageSize] = useState(10);

	const [inboxPage, setInboxPage] = useState(0);
	const [inboxPageSize, setInboxPageSize] = useState(10);

	const menuClass = `text-lg font-bold p-1 md:p-3 text-gray1 hover:text-white focus:text-white hover:bg-secondary focus:bg-secondary rounded-full border-gray2 transition-all duration-300 border-2 bg-lightWhite flex items-center gap-2`;
	const activeClass = `text-xl font-bold p-1 md:p-3 text-white bg-primary hover:text-white focus:text-white hover:bg-secondary focus:bg-secondary rounded-full border-secondary transition-all duration-500 border-2 flex items-center gap-2`;

	// functions

	const fetchPersonalEmails = async () => {
		try {
			const response = await axios.get(
				`/api/gmail/inbox?page=${inboxPage}`
			);
			const { totalEmails, personalEmails: newPersonalEmails } =
				response.data;
			setPersonalEmails((prevPersonalEmails) => [
				...prevPersonalEmails,
				...newPersonalEmails,
			]);
			setInboxPageSize(Math.ceil(totalEmails / 10)); // Calculate total pages based on totalEmails and 10 emails per page
		} catch (error) {
			console.error("Error fetching personal emails:", error);
		}
	};

	const getAllThread = async () => {
		try {
			const response = await axios.get(
				`/api/gmail/threads?page=${threadPage}&pageSize=${threadPageSize}`,
				{
					withCredentials: true,
				}
			);
			setThreads(response.data);
		} catch (error) {
			console.error("Error fetching Threads:", error);
		}
	};

	const getAllThreads = async () => {
		try {
			const response = await axios.get(
				`/api/gmail/threads?page=${threadPage}&pageSize=${threadPageSize}`,
				{
					withCredentials: true,
				}
			);

			setThreads(response.data);
		} catch (error) {
			console.error("Error fetching Threads:", error);
		}
	};

	const getAllDrafts = async () => {
		try {
			const response = await axios.get(
				`/api/gmail/drafts?page=${draftPage}&pageSize=${draftPageSize}`,
				{
					withCredentials: true,
				}
			);

			setDrafts(response.data);
		} catch (error) {
			console.error("Error fetching Drafts:", error);
		}
	};

	const handleInboxPress = () => {
		setInbox(true);
		setCompose(false);
		setShowDrafts(false);
		setThread(false);
	};
	const handleDraftPress = () => {
		setInbox(false);
		setCompose(false);
		setShowDrafts(true);
		setThread(false);
	};

	const handleComposePress = () => {
		createArray("emailInfo");
		setInbox(false);
		setCompose(true);
		setShowDrafts(false);
		setThread(false);
	};

	const handleThreadsPress = () => {
		setInbox(false);
		setCompose(false);
		setShowDrafts(false);
		setThread(true);
	};

	const handleCommands = () => {
		if (command === "inbox") {
			handleInboxPress();
		} else if (command === "compose") {
			handleComposePress();
		} else if (command === "drafts") {
			handleDraftPress();
		} else if (command === "threads") {
			handleThreadsPress();
		} else {
			setCommand("please speack a valid command");
		}
	};

	useEffect(() => {
		fetchPersonalEmails();
	}, [inboxPage, inboxPageSize]);

	useEffect(() => {
		getAllDrafts();
	}, [draftPage, draftPageSize]);

	useEffect(() => {
		getAllThreads();
	}, [threadPage, threadPageSize]);

	useEffect(() => {
		handleCommands();
	}, [command]);

	return (
		<>
			<Head>
				<title>Email Reader App/Emails</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<section className='flex flex-col justify-center items-center w-full'>
				<div
					className={`mx-auto md:m-auto mt-2 p-2 pt-20 md:pt-14 md:p-10 w-full bg-white scroll-smooth overscroll-none`}
				>
					<Header
						title={"Emails page"}
						subtext={null}
						aria={"you are in the emails page"}
					/>
					<Line />

					<div className='flex flex-row items-center justify-center gap-1 md:gap-5'>
						<button
							className={compose ? activeClass : menuClass}
							onClick={handleComposePress}
							aria-pressed={compose}
							aria-label='click to compose new email, voice command: COMPOSE EMAIL'
						>
							<Send />
							Compose Email
						</button>
						<button
							className={showDrafts ? activeClass : menuClass}
							onClick={handleDraftPress}
							aria-pressed={showDrafts}
							aria-label='click to show all drafts, voice command: MY DRAFTS'
						>
							<DraftsOutlined />
							Drafts
						</button>
						<button
							className={thread ? activeClass : menuClass}
							onClick={handleThreadsPress}
							aria-pressed={thread}
							aria-label='click to show all threads, voice command: MY THREADS'
						>
							<Outbox />
							Thread
						</button>
						<button
							className={inbox ? activeClass : menuClass}
							onClick={handleInboxPress}
							aria-pressed={inbox}
							aria-label='click to show all personal emails, voice command: MY INBOX'
						>
							<EmailOutlined />
							My Inbox
						</button>
					</div>
					<Line />
					<div className='flex flex-col items-center'>
						<VoiceControl
							setCommand={setCommand}
							setTranscript={setTranscript}
						/>
						{transcript && (
							<p className='text-center text-transcript'>
								Transcript: {transcript}
							</p>
						)}
					</div>
					<Line />
					{compose && (
						<WriteEmail
							sender={session?.user.email}
							setTranscript={setTranscript}
							transcript={transcript}
							setCommand={setCommand}
							command={command}
						/>
					)}
					{showDrafts && (
						<Drafts
							drafts={drafts}
							setPage={setDraftPage}
							page={draftPage}
							pageSize={draftPageSize}
						/>
					)}
					{thread && (
						<Thread
							threads={threads}
							page={threadPage}
							pageSize={threadPageSize}
							setPage={setThreadPage}
						/>
					)}
					{inbox && (
						<Inbox
							emails={personalEmails}
							page={inboxPage}
							setPage={setInboxPage}
							totalPages={inboxPageSize}
						/>
					)}
				</div>
				<div className='mx-auto pb-10'>
					<BackButton />
				</div>
			</section>
		</>
	);
};

export default Email;
