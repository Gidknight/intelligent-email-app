import axios from "axios";

export const getLanguage = async () => {};

export const devistyTranslate = async (body, from, to) => {
	const encodedParams = new URLSearchParams();
	encodedParams.set("source_language", from);
	encodedParams.set("target_language", to);
	encodedParams.set("text", body);

	const options = {
		method: "POST",
		url: "https://text-translator2.p.rapidapi.com/translate",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"X-RapidAPI-Key": process.env.NEXT_PUBLIC_XRAPID_API_KEY,
			"X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
		},
		data: encodedParams,
	};

	try {
		const response = await axios.request(options);
		// console.log(response.data?.data?.translatedText);
		return response.data?.data?.translatedText;
	} catch (error) {
		console.error(error);
	}
};
