// pages/api/google-connections.js
import { getSession } from "next-auth/react";
import axios from "axios";

export default async (req, res) => {
	const session = await getSession({ req });

	if (!session) {
		return res.status(401).json({ error: "You need to be authenticated" });
	}

	const getConnections = async (
		names,
		coverPhotos,
		emailAddresses,
		pageSize = 5,
		pageToken = null
	) => {
		const queryParams = {
			personFields: "names,photos,emailAddresses",
			pageSize,
			pageToken,
			// Add any other query parameters you need here
		};
		try {
			const response = await axios.get(
				"https://people.googleapis.com/v1/people/me",
				{
					headers: {
						Authorization: "Bearer " + session?.accessToken,
					},
					params: queryParams,
				}
			);

			if (response.status === 200) {
				const connections = response.data.connections;
				return {
					connections,
					nextPageToken: response.data.nextPageToken,
				};
			} else {
				throw new Error("Failed to fetch connections");
			}
		} catch (error) {
			throw new Error("Something went wrong with the server");
		}
	};

	const getConnection = async (
		names,
		coverPhotos,
		emailAddresses,
		pageSize = 5,
		pageToken = null
	) => {
		const resourceName = "people/me";
		const queryParams = {
			personFields: "names,photos,emailAddresses",
			pageSize,
			pageToken,
			// Add any other query parameters you need here
		};

		try {
			const response = await axios.get(
				`https://people.googleapis.com/v1/${resourceName}/connections`,
				{
					headers: {
						Authorization: "Bearer " + session?.accessToken,
					},
					params: queryParams,
				}
			);

			if (response.status === 200) {
				const connections = response.data.connections;
				return {
					connections,
					nextPageToken: response.data.nextPageToken,
				};
			} else {
				throw new Error("Failed to fetch connections");
			}
		} catch (error) {
			throw new Error("Something went wrong with the server");
		}
	};

	try {
		const { names, coverPhotos, emailAddresses, pageSize, pageToken } =
			req.query;
		const connections = await getConnections(
			names,
			coverPhotos,
			emailAddresses,
			pageSize,
			pageToken
		);
		res.status(200).json(connections);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
};
