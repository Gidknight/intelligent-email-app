import axios from "axios";

export const onMic = () => {
	alert("mic is on");
};
export const toggleScreenReader = () => {
	const rootElement = document.documentElement;
	const ariaHidden = rootElement.getAttribute("aria-hidden");

	if (ariaHidden === "true") {
		rootElement.removeAttribute("aria-hidden");
	} else {
		rootElement.setAttribute("aria-hidden", "true");
	}
};

export const convertToSpeech = async (text, lang) => {
	const options = {
		method: "GET",
		url: "https://text-to-speech27.p.rapidapi.com/speech",
		params: {
			text: text,
			lang: `en-${lang}`,
		},
		headers: {
			"X-RapidAPI-Key": process.env.NEXT_PUBLIC_XRAPID_API_KEY,
			"X-RapidAPI-Host": "text-to-speech27.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};
// export const handleEnter = (event, cusFunc) => {
// 	event.preventDefault();
// 	if (event.key === "Enter") {
// 		cusFunc();
// 	}
// };

let selectedItem = 0;
const setSelectedItem = (selectedItem) => {
	let newSelectedItem = selectedItem + 1;
	return newSelectedItem;
};
// const [selectedItem, setSelectedItem] = useState(0);
export const handleKeyDown = (event, cusFunc, setArray) => {
	if (event.key === "Enter") {
		event.preventDefault();
		cusFunc();
	} else if (event.key === "ArrowDown") {
		event.preventDefault();
		setArray((prevSelectedItem) =>
			prevSelectedItem < items.length - 1 ? prevSelectedItem + 1 : 0
		);
	} else if (event.key === "ArrowUp") {
		event.preventDefault();
		setArray((prevSelectedItem) =>
			prevSelectedItem > 0 ? prevSelectedItem - 1 : items.length - 1
		);
	}
};

const handleEnter = (event, cusFunc) => {
	if (event.key === "Enter" || event.key === "Space") {
		event.preventDefault();
		cusFunc();
	}
};

// utils/fetchPersonalEmails.js

export const fetchPersonalEmails = async (page) => {
	try {
		const response = await axios.get(`/api/gmail/inbox?page=${page}`);
		return response.data.personalEmails;
	} catch (error) {
		console.error("Error fetching personal emails:", error);
		return [];
	}
};

export const checkPayLoad = async (arr, func) => {
	if (arr?.length === 0) {
		func(true);
	} else {
		func(false);
	}
};

export const removeFirstTwoWords = (str) => {
	const words = str.split(" ");
	const remainingWords = words.slice(2).join(" ");
	return remainingWords;
};

export const createArray = (title) => {
	sessionStorage.setItem(title, JSON.stringify([]));
};
