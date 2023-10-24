import { getSession } from "next-auth/react";
import axios from "axios";

export default async (req, res) => {
	const session = await getSession({ req });

	if (!session) {
		return res.status(401).json({ error: "You need to be authenticated" });
	}

	const fetchGroupList = async () => {
		try {
			const response = await axios.get(
				`https://people.googleapis.com/v1/contactGroups`,
				{
					headers: {
						Authorization: "Bearer " + session?.accessToken,
					},
				}
			);

			if (response.status === 200) {
				const list = response.data.contactGroups; // Corrected property name
				return list;
			} else {
				throw new Error(response.data);
			}
		} catch (error) {
			throw new Error("Something went wrong with the server");
		}
	};

	try {
		const response = await fetchGroupList();
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong" });
	}
};
