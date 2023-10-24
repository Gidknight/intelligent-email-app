import axios from "axios";

export const sendTextToSpeech = async (text) => {
	const options = {
		method: "GET",
		url: "https://text-to-speech27.p.rapidapi.com/speech",
		params: {
			text: text,
			lang: "en-us",
		},
		headers: {
			"X-RapidAPI-Key":
				"0c74b2092cmsh644837df202d28ap147097jsn74b2f7060295",
			"X-RapidAPI-Host": "text-to-speech27.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
