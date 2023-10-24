import axios from "axios";
import { toast } from "react-hot-toast";

//create group
export const createContactGroup = async (groupName, accessToken) => {
	try {
		const response = await axios.post(
			"https://people.googleapis.com/v1/contactGroups",
			{
				contactGroup: {
					name: groupName, // Replace with the name of the new group
				},
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const newContactGroup = response.data;
		console.log("New contact group created:", newContactGroup);
		return newContactGroup;
	} catch (error) {
		console.error("Error creating contact group:", error.response.data);
		throw new Error("Unable to create contact group");
	}
};

//list groups
export const fetchContactGroups = async (accessToken) => {
	try {
		const response = await axios.get(
			"https://people.googleapis.com/v1/contactGroups",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const contactGroups = response.data.contactGroups;
		console.log("Contact Groups:", contactGroups);
		return contactGroups;
	} catch (error) {
		console.error("Error fetching contact groups:", error.response.data);
		throw new Error("Unable to fetch contact groups");
	}
};

// delete groups
export const deleteContactGroup = async (
	accessToken,
	contactGroupResourceId
) => {
	try {
		const response = await axios.delete(
			`https://people.googleapis.com/v1/contactGroups/${contactGroupResourceId}`,
			{
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			}
		);

		if (response.status === 204) {
			// Contact group deleted successfully
			return true;
		} else {
			throw new Error("Failed to delete contact group");
		}
	} catch (error) {
		throw new Error("Something went wrong with the server");
	}
};

// get contact group
const getContactGroup = async (accessToken, contactGroupResourceId) => {
	try {
		const response = await axios.get(
			`https://people.googleapis.com/v1/contactGroups/${contactGroupResourceId}`,
			{
				headers: {
					Authorization: "Bearer " + accessToken,
				},
			}
		);

		if (response.status === 200) {
			const contactGroup = response.data;
			return contactGroup;
		} else {
			throw new Error("Failed to fetch contact group");
		}
	} catch (error) {
		throw new Error("Something went wrong with the server");
	}
};

//
export const listConnectionNames = async () => {
	let response;
	try {
		// Fetch first 10 files
		response = await gapi.client.people.people.connections.list({
			resourceName: "people/me",
			pageSize: 10,
			personFields: "names,emailAddresses",
		});
	} catch (err) {
		document.getElementById("content").innerText = err.message;
		return;
	}
	const connections = response.result.connections;
	if (!connections || connections.length == 0) {
		document.getElementById("content").innerText = "No connections found.";
		return;
	}
	// Flatten to string to display
	const output = connections.reduce((str, person) => {
		if (!person.names || person.names.length === 0) {
			return `${str}Missing display name\n`;
		}
		return `${str}${person.names[0].displayName}\n`;
	}, "Connections:\n");
	// document.getElementById('content').innerText = output;
};

//create contact
export const createContact = async (
	accessToken,
	firstName,
	lastName,
	email,
	type
) => {
	try {
		const contactData = {
			names: [
				{
					givenName: firstName,
					familyName: lastName,
				},
			],
			emailAddresses: [
				{
					value: email,
					type: type || "home",
				},
			],
		};

		const response = await axios.post(
			"https://people.googleapis.com/v1/people:createContact",
			contactData,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const newContact = response.data;
		toast.success(`New Contact added successfully`);
		// console.log("New Contact:", newContact);
		return newContact;
	} catch (error) {
		console.error("Error creating contact:", error.response?.data);
		// throw new Error("Unable to create contact");
		toast.error(`contact not added`);
		return error;
	}
};

// batchget
const batchRetrievePeople = async (resourceNames) => {
	try {
		const request = {
			resourceNames: resourceNames,
		};

		const response = await axios.get(
			"https://people.googleapis.com/v1/people:batchGet",
			{
				params: request,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const peopleData = response.data;
		console.log("Batch Retrieved People:", peopleData);
		return peopleData;
	} catch (error) {
		console.error("Error batch retrieving people:", error.response.data);
		throw new Error("Unable to retrieve people");
	}
};

// Example usage
const resourceNames = [
	"people/c1234567890", // Replace with actual resource names or person identifiers
	"people/d0987654321",
	// Add more resource names or person identifiers as needed
];

// deltee

// Replace with your OAuth 2.0 access token

// Function to delete a contact
export const deleteContact = async (accessToken, resourceName) => {
	try {
		const response = await axios.delete(
			`https://people.googleapis.com/v1/${resourceName}:deleteContact`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		);
		toast.success("contact deleted successfully");
		// console.log("Contact deleted successfully");
		return response.data;
	} catch (error) {
		toast.error("couldn't delete contact");
		console.error("Error deleting contact:", error.response.data);
		throw new Error("Unable to delete contact");
	}
};

// Example usage
const resourceName = "people/c1234567890"; // Replace with the actual resource name of the contact you want to delete

// deleteContact(resourceName);

// {
//   "resourceName": "people/c5632920557500411050",
//   "etag": "%EigBAgMEBQYHCAkKCwwNDg8QERITFBUWFxkfISIjJCUmJy40NTc9Pj9AGgQBAgUHIgxCYjlyMDI3MGVQWT0=",
//   "metadata": {
//     "sources": [
//       {
//         "type": "CONTACT",
//         "id": "4e2c27670dceacaa",
//         "etag": "#Bb9r0270ePY=",
//         "updateTime": "2023-07-24T11:31:43.988103Z"
//       },
//       {
//         "type": "PROFILE",
//         "id": "115778418272082200136",
//         "etag": "#zq4C+WTWPmo=",
//         "profileMetadata": {
//           "objectType": "PERSON",
//           "userTypes": [
//             "GOOGLE_USER"
//           ]
//         },
//         "updateTime": "2023-03-17T07:04:59.415126Z"
//       }
//     ],
//     "objectType": "PERSON"
//   },
//   "names": [
//     {
//       "metadata": {
//         "primary": true,
//         "source": {
//           "type": "CONTACT",
//           "id": "4e2c27670dceacaa"
//         }
//       },
//       "displayName": "knight knight",
//       "givenName": "knight",
//       "middleName": "knight",
//       "displayNameLastFirst": "knight knight",
//       "unstructuredName": "knight knight"
//     }
//   ],
//   "coverPhotos": [
//     {
//       "metadata": {
//         "primary": true,
//         "source": {
//           "type": "PROFILE",
//           "id": "115778418272082200136"
//         }
//       },
//       "url": "https://lh3.googleusercontent.com/c5dqxl-2uHZ82ah9p7yxrVF1ZssrJNSV_15Nu0TUZwzCWqmtoLxCUJgEzLGtxsrJ6-v6R6rKU_-FYm881TTiMCJ_=s1600",
//       "default": true
//     }
//   ],
//   "photos": [
//     {
//       "metadata": {
//         "primary": true,
//         "source": {
//           "type": "PROFILE",
//           "id": "115778418272082200136"
//         }
//       },
//       "url": "https://lh3.googleusercontent.com/a-/AD_cMMQkDWyCXMnaMCV_u3aQS0vh2XEylq0RPDUfcdqasSjBOQ=s100"
//     },
//     {
//       "metadata": {
//         "source": {
//           "type": "CONTACT",
//           "id": "4e2c27670dceacaa"
//         }
//       },
//       "url": "https://lh3.googleusercontent.com/cm/AJSPFBzyzNsO-aVAfWmGtmcC0rVXu2zjXYyse6cO87vED1V7DdLv3JQTDJuilN7QrHKy=s100",
//       "default": true
//     }
//   ],
//   "emailAddresses": [
//     {
//       "metadata": {
//         "primary": true,
//         "source": {
//           "type": "CONTACT",
//           "id": "4e2c27670dceacaa"
//         }
//       },
//       "value": "contact.gideonknight@gmail.com",
//       "type": "work",
//       "formattedType": "Work"
//     }
//   ],
//   "memberships": [
//     {
//       "metadata": {
//         "source": {
//           "type": "CONTACT",
//           "id": "4e2c27670dceacaa"
//         }
//       },
//       "contactGroupMembership": {
//         "contactGroupId": "myContacts",
//         "contactGroupResourceName": "contactGroups/myContacts"
//       }
//     }
//   ]
// }
