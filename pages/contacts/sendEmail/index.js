import { useEffect, useState } from "react";
import { Header, Line, BackButton, ContactSend } from "../../../components";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import VoiceNavigation from "../../../components/VoiceNavigation";

const SendEmail = () => {
	const [command, setCommand] = useState("");
	const [transcript, setTranscript] = useState("");
	const { data: session } = useSession();

	const router = useRouter();
	const { data } = router.query;

	const menuClass = `text-lg font-bold p-1 md:p-3 text-gray1 hover:text-white focus:text-white hover:bg-secondary focus:bg-secondary rounded-full border-gray2 transition-all duration-300 border-2 bg-lightWhite flex items-center gap-2`;
	const activeClass = `text-xl font-bold p-1 md:p-3 text-white bg-primary hover:text-white focus:text-white hover:bg-secondary focus:bg-secondary rounded-full border-secondary transition-all duration-500 border-2 flex items-center gap-2`;

	//functions
	const handleCommands = () => {};
	// useEffect(() => {
	// 	handleCommands();
	// }, [command]);
	return (
		<>
			<Head>
				<title>Email Reader App/Contacts/SendEmail</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<section className='flex flex-col justify-center items-center w-full'>
				<div
					className={`mx-auto md:m-auto mt-2 p-2 pt-20 md:pt-14 md:p-10 w-full bg-white scroll-smooth overscroll-none`}
				>
					<Header
						title={"Emails page"}
						subtext={data}
						aria={`you are in the image page of ${data}`}
					/>
					<Line />

					<Line />
					<div>
						<VoiceNavigation
							setCommand={setCommand}
							command={command}
							setTranscript={setTranscript}
						/>
						{transcript && (
							<p className='text-center text-transcript'>
								Transcript: {transcript}
							</p>
						)}
					</div>
					<Line />
					<ContactSend
						sender={session?.user?.email}
						recipient={data}
						setTranscript={setTranscript}
						transcript={transcript}
						command={command}
						setCommand={setCommand}
					/>
				</div>
				<div className='mx-auto pb-10'>
					<BackButton />
				</div>
			</section>
		</>
	);
};

export default SendEmail;
