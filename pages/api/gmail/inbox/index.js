import { getSession } from "next-auth/react";
import axios from "axios";

export default async (req, res) => {
	const session = await getSession({ req });

	if (!session) {
		return res.status(401).json({ error: "You need to be authenticated" });
	}

	const fetchPersonalEmails = async () => {
		try {
			const maxResultsPerPage = 50; // Number of emails to fetch per page
			const response = await axios.get(
				`https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResultsPerPage}`,
				{
					headers: {
						Authorization: "Bearer " + session?.accessToken,
					},
				}
			);

			if (response.status === 200) {
				const emails = response.data;
				return emails;
			} else {
				throw new Error(response.data);
			}
		} catch (error) {
			console.error("Error fetching emails:", error);
			throw new Error("Something went wrong with the server");
		}
	};

	const fetchEmailDetails = async (emailId) => {
		try {
			const response = await axios.get(
				`https://gmail.googleapis.com/gmail/v1/users/me/messages/${emailId}`,
				{
					headers: {
						Authorization: "Bearer " + session?.accessToken,
					},
				}
			);

			if (response.status === 200) {
				return response.data;
			} else {
				// Handle error if the response status is not 200
				console.error("Failed to fetch email:", response.data);
				return null;
			}
		} catch (error) {
			// Handle general error
			console.error("Error fetching email details:", error);
			return null;
		}
	};

	try {
		const emails = await fetchPersonalEmails();
		const emailIds = Object.values(emails?.messages || {}).map(
			(message) => message.id
		);

		const emailDetailsPromises = emailIds.map(fetchEmailDetails);

		// Fetch email details concurrently using Promise.all
		const emailDetails = await Promise.all(emailDetailsPromises);

		// Filter and process the emails as needed
		const personalEmails = emailDetails.filter((emailDetail) => {
			const fromHeader = emailDetail?.payload?.headers?.find(
				(header) => header.name === "From"
			);
			const senderEmail = fromHeader?.value || "";

			return senderEmail.endsWith("@gmail.com");
		});

		res.status(200).json({
			totalEmails: personalEmails.length,
			personalEmails: personalEmails.slice(0, 10), // Send the first 10 emails for initial display
		});
	} catch (error) {
		console.error("Error in API route:", error);
		res.status(500).json({ error: "Something went wrong" });
	}
};
