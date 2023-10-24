"use client";

import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

import { Mic, MicOff, Refresh } from "@mui/icons-material";
import { toast } from "react-hot-toast";

const Dictaphone = ({ setTranscript, title }) => {
	const {
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	const onMic = () => {
		SpeechRecognition.startListening();
	};

	const offMic = () => {
		SpeechRecognition.stopListening();
		if (!listening) {
			toast.success("Stopped listening");
		} else {
			toast.error("Not working");
		}
	};
	const refresh = () => {
		resetTranscript();
		toast.success("Refreshed");
	};

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	setTranscript(transcript);

	return (
		<button
			className='flex flex-row gap-2 text-tertiary border-2 border-tertiary p-1 rounded-full hover:shadow-lg focus:text-tertiary active:text-tertiary'
			onClick={onMic}
			aria-label='microphone'
			suppressHydrationWarning
			suppressContentEditableWarning
		>
			<Mic />
		</button>
	);
};

export default Dictaphone;
