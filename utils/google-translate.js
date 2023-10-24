import axios from "axios";

export const detectLanguage = async (body) => {
	const encodedParams = new URLSearchParams();
	encodedParams.set("q", body);

	const options = {
		method: "POST",
		url: "https://google-translate1.p.rapidapi.com/language/translate/v2/detect",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"Accept-Encoding": "application/gzip",
			"X-RapidAPI-Key": process.env.NEXT_PUBLIC_XRAPID_API_KEY,
			"X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
		},
		data: encodedParams,
	};

	try {
		const response = await axios.request(options);

		console.log(response.data?.data?.detections[0][0].language);
		return response.data?.data?.detections[0][0].language;
	} catch (error) {
		console.error(error);
	}
};

// {
//   "data": {
//     "detections": [
//       [
//         {
//           "isReliable": false,
//           "confidence": 1,
//           "language": "en"
//         }
//       ]
//     ]
//   }
// }

export const translate = async (body, from, to) => {
	const encodedParams = new URLSearchParams();
	encodedParams.set("q", body);
	encodedParams.set("target", to);
	encodedParams.set("source", "en");

	const options = {
		method: "POST",
		url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			"Accept-Encoding": "application/gzip",
			"X-RapidAPI-Key": process.env.NEXT_PUBLIC_XRAPID_API_KEY,
			"X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
		},
		data: encodedParams,
	};

	try {
		const response = await axios.request(options);
		// console.log(response.data?.data?.translations[0]?.translatedText);
		return response.data?.data?.translations[0]?.translatedText;
	} catch (error) {
		console.error(error);
	}
};

// google translate
// {
//   "data": {
//     "languages": [
//       {
//         "language": "af"
//       },
//       {
//         "language": "ak"
//       },
//       {
//         "language": "am"
//       },
//       {
//         "language": "ar"
//       },
//       {
//         "language": "as"
//       },
//       {
//         "language": "ay"
//       },
//       {
//         "language": "az"
//       },
//       {
//         "language": "be"
//       },
//       {
//         "language": "bg"
//       },
//       {
//         "language": "bho"
//       },
//       {
//         "language": "bm"
//       },
//       {
//         "language": "bn"
//       },
//       {
//         "language": "bs"
//       },
//       {
//         "language": "ca"
//       },
//       {
//         "language": "ceb"
//       },
//       {
//         "language": "ckb"
//       },
//       {
//         "language": "co"
//       },
//       {
//         "language": "cs"
//       },
//       {
//         "language": "cy"
//       },
//       {
//         "language": "da"
//       },
//       {
//         "language": "de"
//       },
//       {
//         "language": "doi"
//       },
//       {
//         "language": "dv"
//       },
//       {
//         "language": "ee"
//       },
//       {
//         "language": "el"
//       },
//       {
//         "language": "en"
//       },
//       {
//         "language": "eo"
//       },
//       {
//         "language": "es"
//       },
//       {
//         "language": "et"
//       },
//       {
//         "language": "eu"
//       },
//       {
//         "language": "fa"
//       },
//       {
//         "language": "fi"
//       },
//       {
//         "language": "fr"
//       },
//       {
//         "language": "fy"
//       },
//       {
//         "language": "ga"
//       },
//       {
//         "language": "gd"
//       },
//       {
//         "language": "gl"
//       },
//       {
//         "language": "gn"
//       },
//       {
//         "language": "gom"
//       },
//       {
//         "language": "gu"
//       },
//       {
//         "language": "ha"
//       },
//       {
//         "language": "haw"
//       },
//       {
//         "language": "he"
//       },
//       {
//         "language": "hi"
//       },
//       {
//         "language": "hmn"
//       },
//       {
//         "language": "hr"
//       },
//       {
//         "language": "ht"
//       },
//       {
//         "language": "hu"
//       },
//       {
//         "language": "hy"
//       },
//       {
//         "language": "id"
//       },
//       {
//         "language": "ig"
//       },
//       {
//         "language": "ilo"
//       },
//       {
//         "language": "is"
//       },
//       {
//         "language": "it"
//       },
//       {
//         "language": "iw"
//       },
//       {
//         "language": "ja"
//       },
//       {
//         "language": "jv"
//       },
//       {
//         "language": "jw"
//       },
//       {
//         "language": "ka"
//       },
//       {
//         "language": "kk"
//       },
//       {
//         "language": "km"
//       },
//       {
//         "language": "kn"
//       },
//       {
//         "language": "ko"
//       },
//       {
//         "language": "kri"
//       },
//       {
//         "language": "ku"
//       },
//       {
//         "language": "ky"
//       },
//       {
//         "language": "la"
//       },
//       {
//         "language": "lb"
//       },
//       {
//         "language": "lg"
//       },
//       {
//         "language": "ln"
//       },
//       {
//         "language": "lo"
//       },
//       {
//         "language": "lt"
//       },
//       {
//         "language": "lus"
//       },
//       {
//         "language": "lv"
//       },
//       {
//         "language": "mai"
//       },
//       {
//         "language": "mg"
//       },
//       {
//         "language": "mi"
//       },
//       {
//         "language": "mk"
//       },
//       {
//         "language": "ml"
//       },
//       {
//         "language": "mn"
//       },
//       {
//         "language": "mni-Mtei"
//       },
//       {
//         "language": "mr"
//       },
//       {
//         "language": "ms"
//       },
//       {
//         "language": "mt"
//       },
//       {
//         "language": "my"
//       },
//       {
//         "language": "ne"
//       },
//       {
//         "language": "nl"
//       },
//       {
//         "language": "no"
//       },
//       {
//         "language": "nso"
//       },
//       {
//         "language": "ny"
//       },
//       {
//         "language": "om"
//       },
//       {
//         "language": "or"
//       },
//       {
//         "language": "pa"
//       },
//       {
//         "language": "pl"
//       },
//       {
//         "language": "ps"
//       },
//       {
//         "language": "pt"
//       },
//       {
//         "language": "qu"
//       },
//       {
//         "language": "ro"
//       },
//       {
//         "language": "ru"
//       },
//       {
//         "language": "rw"
//       },
//       {
//         "language": "sa"
//       },
//       {
//         "language": "sd"
//       },
//       {
//         "language": "si"
//       },
//       {
//         "language": "sk"
//       },
//       {
//         "language": "sl"
//       },
//       {
//         "language": "sm"
//       },
//       {
//         "language": "sn"
//       },
//       {
//         "language": "so"
//       },
//       {
//         "language": "sq"
//       },
//       {
//         "language": "sr"
//       },
//       {
//         "language": "st"
//       },
//       {
//         "language": "su"
//       },
//       {
//         "language": "sv"
//       },
//       {
//         "language": "sw"
//       },
//       {
//         "language": "ta"
//       },
//       {
//         "language": "te"
//       },
//       {
//         "language": "tg"
//       },
//       {
//         "language": "th"
//       },
//       {
//         "language": "ti"
//       },
//       {
//         "language": "tk"
//       },
//       {
//         "language": "tl"
//       },
//       {
//         "language": "tr"
//       },
//       {
//         "language": "ts"
//       },
//       {
//         "language": "tt"
//       },
//       {
//         "language": "ug"
//       },
//       {
//         "language": "uk"
//       },
//       {
//         "language": "ur"
//       },
//       {
//         "language": "uz"
//       },
//       {
//         "language": "vi"
//       },
//       {
//         "language": "xh"
//       },
//       {
//         "language": "yi"
//       },
//       {
//         "language": "yo"
//       },
//       {
//         "language": "zh"
//       },
//       {
//         "language": "zh-CN"
//       },
//       {
//         "language": "zh-TW"
//       },
//       {
//         "language": "zu"
//       }
//     ]
//   }
// }
