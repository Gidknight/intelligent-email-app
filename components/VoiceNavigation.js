"use client";

import { Mic } from "@mui/icons-material";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

const VoiceNavigation = ({
	setCommand,
	command,
	setRecipient,
	setTranscript,
}) => {
	const commands = [
		{
			command: "Go to emails",
			callback: () => setCommand("emails"),
		},
		{
			command: "Go to contacts",
			callback: () => setCommand("contacts"),
		},
		{
			command: "Go to calendar",
			callback: () => setCommand("calender"),
		},
		{
			command: "Go to documentation",
			callback: () => setCommand("documentation"),
			// isFuzzyMatch: true,
			// fuzzyMatchingThreshold: 0.2,
			// bestMatchOnly: true,
		},
		{
			command: "Go home",
			callback: () => setCommand("home"),
		},

		{
			command: "login",
			callback: () => setCommand("login"),
		},
		{
			command: "log out",
			callback: () => setCommand("log out"),
		},
		{
			command: "log in",
			callback: () => setCommand("log in"),
		},
		{
			command: "clear",
			callback: ({ resetTranscript }) => resetTranscript(),
		},
	];

	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition({ commands });

	const onMic = () => {
		try {
			SpeechRecognition.startListening();
			toast.success("listening");
		} catch (error) {
			// Ignore the error
		}
	};

	useEffect(() => {
		const handleKeyPress = (event) => {
			// Use a specific key combination to trigger the mic
			if (event.ctrlKey && event.altKey && event.code === "Space") {
				onMic();
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	useEffect(() => {
		setTranscript(transcript);
	}, [transcript]);

	// if (!browserSupportsSpeechRecognition) {
	// 	return (
	// 		<div>
	// 			<span>Browser doesn't support speech recognition.</span>
	// 		</div>
	// 	);
	// }
	// else {
	return (
		<div className='flex flex-row gap-2 items-center justify-center'>
			<button
				className='flex flex-row gap-2 text-tertiary border-2 border-tertiary p-1 rounded-full hover:shadow-lg focus:text-tertiary active:text-tertiary'
				onClick={onMic}
				suppressHydrationWarning
				suppressContentEditableWarning
				aria-label='microphone, click before speaking navigation commands'
			>
				<Mic />
			</button>
		</div>
	);
	// }
};

export default VoiceNavigation;
