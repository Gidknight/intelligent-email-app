"use client";

import { useEffect } from "react";

const toggleScreenReader = () => {
	const rootElement = document.documentElement;
	const ariaHidden = rootElement.getAttribute("aria-hidden");

	if (ariaHidden === "true") {
		rootElement.removeAttribute("aria-hidden");
	} else {
		rootElement.setAttribute("aria-hidden", "true");
	}
};

const turnOnVoiceNavigation = () => {
	const voiceNavigate = async () => {
		if (command.includes("home")) {
			homePress();
		} else if (command.includes("timeline")) {
			timelinePress();
		} else if (command.includes("email")) {
			emailPress();
		} else if (command.includes("calender")) {
			calenderPress();
		} else {
			setCommand("page not recognized, please specify the page");
		}
	};
};
const ScreenReaderToggle = () => {
	useEffect(() => {
		const handleKeyPress = (event) => {
			// Use a specific key combination to trigger the screen reader toggle
			if (event.ctrlKey && event.altKey && event.key === "s") {
				toggleScreenReader();
			} else if (event.ctrlKey && event.spaceBar) {
				turnOnVoiceNavigation();
			}
		};

		document.addEventListener("keydown", handleKeyPress);

		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	}, []);

	return null;
};

export default ScreenReaderToggle;
