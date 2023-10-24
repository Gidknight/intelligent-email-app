import { getSession } from "next-auth/react";
import axios from "axios";

// export default async (req, res) => {
// 	const session = await getSession({ req });

// 	if (!session) {
// 		return res.status(401).json({ error: "You need to be authenticated" });
// 	}

// 	const fetchDrafts = async (maxResults) => {
// 		try {
// 			const response = await axios.get(
// 				`https://gmail.googleapis.com/gmail/v1/users/me/drafts?maxResults=${maxResults}`,
// 				{
// 					headers: {
// 						Authorization: "Bearer " + session?.accessToken,
// 					},
// 				}
// 			);

// 			if (response.status === 200) {
// 				const drafts = response.data.drafts;
// 				return drafts;
// 			} else {
// 				throw new Error(response.data);
// 			}
// 		} catch (error) {
// 			throw new Error("Something went wrong with the server");
// 		}
// 	};

// 	const batchRequest = async (maxResults) => {
// 		try {
// 			// Get the array of drafts
// 			let drafts = await fetchDrafts(maxResults);
// 			let emails = [];

// 			// Iterate over each draft
// 			for (const draft of drafts) {
// 				const response = await axios.get(
// 					`https://gmail.googleapis.com/gmail/v1/users/me/drafts/${draft.id}`,
// 					{
// 						headers: {
// 							Authorization: "Bearer " + session?.accessToken,
// 						},
// 					}
// 				);

// 				if (response.status === 200) {
// 					let email = response.data;
// 					emails.push(email);
// 				} else {
// 					// Handle error if the response status is not 200
// 					console.error("Failed to fetch draft:", response.data);
// 				}
// 			}

// 			// Do something with the emails array
// 			return emails;
// 		} catch (error) {
// 			// Handle general error
// 			console.error("Something went wrong:", error);
// 			return null;
// 		}
// 	};

// 	try {
// 		const maxResults = req.query.maxResults || 10;
// 		const emails = await batchRequest(maxResults);
// 		res.status(200).json(emails);
// 	} catch (error) {
// 		res.status(500).json({ error: "Something went wrong" });
// 	}
// };

export default async (req, res) => {
	const session = await getSession({ req });

	if (!session) {
		return res.status(401).json({ error: "You need to be authenticated" });
	}

	const fetchDrafts = async (maxResults) => {
		try {
			const response = await axios.get(
				`https://gmail.googleapis.com/gmail/v1/users/me/drafts?maxResults=${maxResults}`,
				{
					headers: {
						Authorization: "Bearer " + session?.accessToken,
					},
				}
			);

			if (response.status === 200) {
				const drafts = response.data.drafts;
				return drafts;
			} else {
				throw new Error(response.data);
			}
		} catch (error) {
			throw new Error("Something went wrong with the server");
		}
	};

	const batchRequest = async (maxResults) => {
		try {
			// Get the array of drafts
			let drafts = await fetchDrafts(maxResults);
			let emails = [];

			// Iterate over each draft
			for (const draft of drafts) {
				const response = await axios.get(
					`https://gmail.googleapis.com/gmail/v1/users/me/drafts/${draft.id}`,
					{
						headers: {
							Authorization: "Bearer " + session?.accessToken,
						},
					}
				);

				if (response.status === 200) {
					let email = response.data;
					emails.push(email);
				} else {
					// Handle error if the response status is not 200
					console.error("Failed to fetch draft:", response.data);
				}
			}

			// Do something with the emails array
			return emails;
		} catch (error) {
			// Handle general error
			console.error("Something went wrong:", error);
			return null;
		}
	};

	try {
		const maxResults = req.query.maxResults || 10;
		const emails = await batchRequest(maxResults);
		res.status(200).json(emails);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
};
