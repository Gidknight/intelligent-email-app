"use client";

import { Mic } from "@mui/icons-material";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

const VoiceControl = ({ setCommand, command, setTranscript }) => {
	const commands = [
		// form command
		{ command: "submit form", callback: () => setCommand("submit") },
		// calender page commands
		{
			command: "list tasks",
			callback: () => setCommand("all tasks"),
			isFuzzyMatch: true,
			fuzzyMatchingThreshold: 0.2,
			bestMatchOnly: true,
		},
		{
			command: "add to list",
			callback: () => setCommand("add task"),
			isFuzzyMatch: true,
			fuzzyMatchingThreshold: 0.2,
			bestMatchOnly: true,
		},

		// emails page commands
		{
			command: "my inbox",
			callback: () => setCommand("inbox"),
			isFuzzyMatch: true,
			fuzzyMatchingThreshold: 0.2,
			bestMatchOnly: true,
		},
		{
			command: "my drafts",
			callback: () => setCommand("drafts"),
			isFuzzyMatch: true,
			fuzzyMatchingThreshold: 0.2,
			bestMatchOnly: true,
		},
		{
			command: "my threads",
			callback: () => setCommand("threads"),
			isFuzzyMatch: true,
			fuzzyMatchingThreshold: 0.2,
			bestMatchOnly: true,
		},
		{
			command: "compose email",
			callback: () => setCommand("compose"),
			isFuzzyMatch: true,
			fuzzyMatchingThreshold: 0.2,
			bestMatchOnly: true,
		},

		// contacts page commands
		{
			command: "add new contact",
			callback: () => setCommand("genesis"),
			// isFuzzyMatch: true,
			// fuzzyMatchingThreshold: 0.2,
			// bestMatchOnly: true,
		},
		{
			command: "list all contacts",
			callback: () => setCommand("list"),
			// isFuzzyMatch: true,
			// fuzzyMatchingThreshold: 0.2,
			// bestMatchOnly: true,
		},

		// inbox commands
		{
			command: "translate to french",
			callback: () => setCommand("french"),
		},
		{
			command: "translate to italian",
			callback: () => setCommand("italian"),
		},
		{
			command: "translate to spanish",
			callback: () => setCommand("spanish"),
		},
		{
			command: "translate to german",
			callback: () => setCommand("german"),
		},
		{
			command: "translate to english",
			callback: () => setCommand("english"),
		},

		{
			command: "delete email",
			callback: () => setCommand("trash"),
		},
		{
			command: "trash email",
			callback: () => setCommand("trash"),
		},

		{
			command: "send reply",
			callback: () => setCommand("reply"),
		},
		// drafts commands
		{ command: "delete draft", callback: () => setCommand("delete") },
		{ command: "update draft", callback: () => setCommand("update") },
		{ command: "send draft", callback: () => setCommand("send") },
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
			SpeechRecognition.startListening({ continuous });
			// toast.success("listening");
		} catch (error) {
			// Ignore the error
		}
	};
	const offMic = () => {
		try {
			SpeechRecognition.startListening();
			toast.success("stopped listening");
		} catch (error) {
			// Ignore the error
		}
	};

	useEffect(() => {
		const handleKeyPress = (event) => {
			// Use a specific key combination to trigger the mic
			if (event.ctrlKey && event.altKey && event.code === "Space") {
				onMic();
			} else if (event.shiftKey && event.code === "Space") {
				offMic();
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	setTranscript(transcript);

	return (
		<button
			className='flex flex-row gap-2 text-tertiary border-2 border-tertiary p-1 rounded-full hover:shadow-lg focus:text-tertiary active:text-tertiary'
			onClick={onMic}
			aria-label='microphone, click before speaking page commands'
			suppressHydrationWarning
			suppressContentEditableWarning
		>
			<Mic />
		</button>
	);
};

export default VoiceControl;
