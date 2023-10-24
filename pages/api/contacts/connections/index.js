import { getSession } from "next-auth/react";
import axios from "axios";

export default async (req, res) => {
	const session = await getSession({ req });

	if (!session) {
		return res.status(401).json({ error: "You need to be authenticated" });
	}

	const getConnections = async (pageToken, pageSize) => {
		const queryParams = {
			personFields: "names,photos",
			pageToken: pageToken || undefined,
			pageSize: pageSize || undefined,
		};
		try {
			const response = await axios.get(
				"https://people.googleapis.com/v1/people/me/connections",
				{
					headers: {
						Authorization: "Bearer " + session?.accessToken,
					},
					params: queryParams,
				}
			);

			if (response.status === 200) {
				return response.data.connections;
			} else {
				throw new Error("Failed to fetch connections");
			}
		} catch (error) {
			throw new Error("Something went wrong with the server");
		}
	};

	const getEmailAddressesFromResource = async (resourceName) => {
		const queryParams = {
			personFields: "emailAddresses",
		};
		try {
			const response = await axios.get(
				`https://people.googleapis.com/v1/${resourceName}`,
				{
					headers: {
						Authorization: "Bearer " + session?.accessToken,
					},
					params: queryParams,
				}
			);

			if (response.status === 200) {
				const emailAddresses = response.data.emailAddresses.map(
					(address) => address.value
				);
				return emailAddresses;
			} else {
				throw new Error("Failed to fetch email addresses");
			}
		} catch (error) {
			throw new Error("Something went wrong with the server");
		}
	};

	try {
		const pageToken = req.query.pageToken || undefined;
		const pageSize = req.query.pageSize || 10;
		const connections = await getConnections(pageToken, pageSize);
		const nextPageToken = connections.nextPageToken;
		// Fetch email addresses for each contact and assign them to the contacts
		// const emails = await getEmailAddressesFromResource("people/me");
		const contactsWithEmails = await Promise.all(
			connections.map(async (contact) => {
				const emailAddresses = await getEmailAddressesFromResource(
					contact.resourceName
				);
				return {
					...contact,
					emailAddresses,
				};
			})
		);

		res.status(200).json({
			connections: contactsWithEmails,
			nextPageToken: nextPageToken || null,
		});
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
};
