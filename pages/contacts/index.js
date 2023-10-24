import { useEffect, useState } from "react";
import {
	Header,
	Line,
	BackButton,
	AllContacts,
	AddContact,
	VoiceControl,
} from "../../components";

import Head from "next/head";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Add, ListAlt } from "@mui/icons-material";
import { useRouter } from "next/router";
import { createArray, fetchPersonalEmails } from "../../utils";
import { toast } from "react-hot-toast";

const Contacts = () => {
	const [command, setCommand] = useState("");

	const router = useRouter();

	const [transcript, setTranscript] = useState("");
	const [showContacts, setShowContacts] = useState(true);
	const [showAddContact, setShowAddContact] = useState(false);

	const [nextPageToken, setNextPageToken] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [contacts, setContacts] = useState([]);

	const menuClass = `text-lg font-bold p-1 md:p-3 text-gray1 hover:text-white focus:text-white hover:bg-secondary focus:bg-secondary rounded-full border-gray2 transition-all duration-300 border-2 bg-lightWhite flex items-center gap-2`;
	const activeClass = `text-xl font-bold p-1 md:p-3 text-white bg-primary hover:text-white focus:text-white hover:bg-secondary focus:bg-secondary rounded-full border-secondary transition-all duration-500 border-2 flex items-center gap-2`;

	//functions

	const fetchConnections = async (pageToken) => {
		try {
			const response = await axios.get(`/api/contacts/connections`, {
				params: { pageToken, pageSize },
			});

			if (response.status === 200) {
				const { connections, nextPageToken } = response.data;
				setContacts(connections);
				setNextPageToken(nextPageToken);
			} else {
				throw new Error("Failed to fetch contacts");
			}
		} catch (error) {
			console.error("Error fetching contacts:", error);
		}
	};

	const handleLoadMore = () => {
		if (nextPageToken) {
			fetchConnections(nextPageToken);
		}
	};

	const handleAllContactsPress = () => {
		setShowContacts(true);
		setShowAddContact(false);
	};

	const handleAddContactPress = () => {
		createArray("contactInfo");
		setShowContacts(false);
		setShowAddContact(true);
	};

	const handleCommands = () => {
		if (command === "list") {
			handleAllContactsPress();
		} else if (command === "genesis") {
			handleAddContactPress();
		} else {
			setCommand("please give a valid command");
		}
	};

	useEffect(() => {
		fetchConnections();
	}, []);

	useEffect(() => {
		handleCommands();
	}, [command]);

	return (
		<>
			<Head>
				<title>Email Reader App/Contacts</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<section className='flex flex-col justify-center items-center w-full'>
				<div
					className={`mx-auto md:m-auto mt-2 p-2 pt-20 md:pt-14 md:p-10 w-full bg-white scroll-smooth overscroll-none`}
				>
					<Header
						title={"Contacts page"}
						subtext={null}
						aria={"you are in the contacts page"}
					/>
					<Line />

					<div className='flex flex-row w-100 items-center justify-center gap-1 md:gap-5'>
						<button
							className={showContacts ? activeClass : menuClass}
							onClick={handleAllContactsPress}
							aria-pressed={showContacts}
							aria-label='click to show all contacts'
						>
							<ListAlt />
							All Contacts
						</button>

						<button
							className={showAddContact ? activeClass : menuClass}
							onClick={handleAddContactPress}
							aria-pressed={showAddContact}
							aria-label='click to add a new contact'
						>
							<Add />
							Add Contact
						</button>
					</div>
					<Line />
					<div className='flex flex-col items-center gap-2'>
						<div className=''>
							<VoiceControl
								setTranscript={setTranscript}
								setCommand={setCommand}
							/>
						</div>
						{transcript && (
							<p className='text-transcript text-center'>
								Transcript: {transcript}
							</p>
						)}
					</div>
					<Line />
					{showContacts && (
						<div>
							<AllContacts
								contacts={contacts}
								setContacts={setContacts}
								handleAllContactsPress={handleAllContactsPress}
							/>
							{nextPageToken && (
								<button
									className='p-2 text-tertiary'
									onClick={handleLoadMore}
								>
									Load More
								</button>
							)}
						</div>
					)}

					{showAddContact && (
						<AddContact
							fetchConnections={fetchConnections}
							setTranscript={setTranscript}
							transcript={transcript}
							command={command}
							setCommand={setCommand}
							handleAllContactsPress={handleAllContactsPress}
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

export default Contacts;
