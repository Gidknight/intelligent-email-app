"use client";

import React, { useEffect, useRef, useState } from "react";
import TextInput from "./TextInput";
import Button1 from "./Button1";
import Button2 from "./Button2";
import { Add, Email, Keyboard, Refresh, Upload } from "@mui/icons-material";
import { createContact } from "../utils/people-api";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Line from "./Line";
import Dot from "./Dot";
import { Button3 } from ".";
import { useRouter } from "next/router";

const labelStyle = `text-primary font-semibold text-lg`;
const FirstName = ({
	setShowFirstName,
	setShowLastName,
	setShowEmail,
	transcript,
	setTranscript,
	setContactInfo,
}) => {
	const [firstName, setFirstName] = useState(transcript);
	const firstNameRef = useRef();
	const getContactInfo = () => {
		const storedContactInfo = sessionStorage.getItem("contactInfo");
		const parsedContactInfo = JSON.parse(storedContactInfo);
		if (Array.isArray(parsedContactInfo)) {
			return parsedContactInfo;
		} else {
			return [];
		}
	};

	const popToast = () => {
		toast.success("speak to add first name");
	};
	popToast();
	// Function to add firstName to contactInfo array
	const addFirstName = (event) => {
		// event.preventDefault();

		// Get existing contactInfo from sessionStorage
		const existingContactInfo = getContactInfo();

		// Add firstName to the contactInfo array
		const updatedContactInfo = [
			...existingContactInfo,
			{ firstName: transcript },
		];

		// Update the state with the new contactInfo array
		setContactInfo(updatedContactInfo);

		// Store the updated contactInfo in sessionStorage
		sessionStorage.setItem(
			"contactInfo",
			JSON.stringify(updatedContactInfo)
		);
		setTranscript("");
		// Show success message
		toast.success(
			`First name added successfully, speak again to add last name`
		);
	};

	const handleNext = () => {
		addFirstName();
		setShowFirstName(false);
		setShowLastName(true);
		setShowEmail(false);
	};
	useEffect(() => {
		firstNameRef.current.focus();
	}, []);
	return (
		<div>
			<fieldset className='flex flex-col gap-1 disabled:text-gray1'>
				<label htmlFor='firstName' className={labelStyle}>
					First Name:
				</label>

				<input
					ref={firstNameRef}
					id={"firstName"}
					type='text'
					className='p-2 border-b-2 border-primary bg-gray-200 text-lg w-full text-primary'
					placeholder='firstname'
					value={transcript}
					onChange={(e) => setTranscript(e.target.value)}
					required
				/>
			</fieldset>
			<Button2
				title={"add first name"}
				customFunc={handleNext}
				aria={"click to submit the first name"}
				icon={<Add />}
				type={"button"}
			/>
		</div>
	);
};

const LastName = ({
	setShowFirstName,
	setShowLastName,
	setShowEmail,
	transcript,
	setTranscript,
	setContactInfo,
}) => {
	const lastNameRef = useRef();
	const [lastName, setLastName] = useState("");

	const getContactInfo = () => {
		const storedContactInfo = sessionStorage.getItem("contactInfo");
		const parsedContactInfo = JSON.parse(storedContactInfo);
		if (Array.isArray(parsedContactInfo)) {
			return parsedContactInfo;
		} else {
			return [];
		}
	};
	// Function to add lastName to contactInfo array
	const addLastName = (event) => {
		// event.preventDefault();

		// Get existing contactInfo from sessionStorage
		const existingContactInfo = getContactInfo();

		// Find the last object in the existingContactInfo array
		const lastContact = existingContactInfo[existingContactInfo.length - 1];

		// Add lastName to the lastContact object
		lastContact.lastName = transcript;

		// Update the state with the modified contactInfo array
		setContactInfo(existingContactInfo);

		// Store the updated contactInfo in sessionStorage
		sessionStorage.setItem(
			"contactInfo",
			JSON.stringify(existingContactInfo)
		);

		// Show success message
		toast.success(
			`Last name added successfully, speak again to add email address`
		);
	};

	const handleNext = () => {
		addLastName();
		setShowFirstName(false);
		setShowLastName(false);
		setShowEmail(true);
	};
	useEffect(() => {
		lastNameRef.current.focus();
	}, []);
	return (
		<div ref={lastNameRef}>
			<fieldset className='flex flex-col gap-1'>
				<label htmlFor='lastName' className={labelStyle}>
					Last Name:
				</label>
				<TextInput
					id={"lastName"}
					type={"text"}
					value={transcript}
					placeholder={"last name"}
					customFunc={(e) => setTranscript(e.target.value)}
				/>
			</fieldset>
			<Button2
				title={"add last name"}
				customFunc={handleNext}
				aria={"click to submit the last name"}
				icon={<Add />}
				type={"button"}
			/>
		</div>
	);
};

const EmailAddress = ({
	setShowFirstName,
	setShowLastName,
	setShowEmail,
	setShowPreview,
	transcript,
	setTranscript,
	setContactInfo,
	setContactInfoValues,
}) => {
	const [email, setEmail] = useState("");

	const getContactInfo = () => {
		const storedContactInfo = sessionStorage.getItem("contactInfo");
		const parsedContactInfo = JSON.parse(storedContactInfo);
		if (Array.isArray(parsedContactInfo)) {
			return parsedContactInfo;
		} else {
			return [];
		}
	};

	// Function to add email to contactInfo array
	const addEmail = (event) => {
		// event.preventDefault();

		// Get existing contactInfo from sessionStorage
		const existingContactInfo = getContactInfo();

		// Find the last object in the existingContactInfo array
		const lastContact = existingContactInfo[existingContactInfo.length - 1];

		// remove space
		const trimmedStr = transcript.split(" ").join("");

		// Add lastName to the lastContact object
		lastContact.email = trimmedStr + "@gmail.com";

		// Update the state with the modified contactInfo array
		setContactInfo(existingContactInfo);

		// Store the updated contactInfo in sessionStorage
		sessionStorage.setItem(
			"contactInfo",
			JSON.stringify(existingContactInfo)
		);

		// Show success message
		toast.success(`Email added successfully, preview page`);
	};

	const handleNext = () => {
		addEmail();
		setShowFirstName(false);
		setShowLastName(false);
		setShowEmail(false);
		setShowPreview(true);
		setContactInfoValues();
	};
	return (
		<div>
			<fieldset className='flex flex-col gap-1'>
				<label htmlFor='email' className={labelStyle}>
					Email Address
				</label>
				<TextInput
					id={"email"}
					type={"email"}
					value={transcript}
					placeholder={"Johnsmith123"}
					customFunc={(e) => setTranscript(e.target.value)}
					aria={
						"enter the email address without the suffix: @gmail.com, as it will be added for you"
					}
				/>
			</fieldset>
			<Button2
				title={"add email"}
				customFunc={handleNext}
				aria={"click to submit the email address"}
				icon={<Add />}
				type={"button"}
			/>
		</div>
	);
};

const Preview = ({
	handleRefresh,
	handleSubmit,
	editWithKeyboard,
	firstName,
	lastName,
	email,
}) => {
	const previewRef = useRef();
	useEffect(() => {
		previewRef.current.focus();
	}, []);
	return (
		<div ref={previewRef} className='flex flex-col gap-5' tabIndex={0}>
			<h2 className='text-primary font-bold text-xl underline'>
				Preview Transcript
				<Dot color={"white"} />
			</h2>
			<p className='font-semibold text-primary text-lg'>
				FirstName:{" "}
				<span className='text-transcript capitalize'>{firstName}</span>
				<Dot />
			</p>
			<p className='font-semibold text-primary text-lg'>
				LastName:{" "}
				<span className='text-transcript capitalize'>{lastName}</span>
				<Dot />
			</p>
			<p className='font-semibold text-primary text-lg'>
				Email Address: <span className='text-transcript'>{email}</span>
				<Dot />
			</p>
			<div className='flex flex-row gap-5 p-2'>
				<Button2
					icon={<Refresh />}
					type={"button"}
					title={"refresh"}
					customFunc={handleRefresh}
					aria={"not satisfied?, click to refresh the form"}
				/>
				<Button2
					type={"button"}
					icon={<Keyboard />}
					title={"Edit with Keyboard"}
					customFunc={editWithKeyboard}
					aria={"click to edit with keyboard"}
				/>
				<Button1
					title={"submit"}
					icon={<Upload />}
					type={"button"}
					customFunc={handleSubmit}
					aria={"click to submit the contact form"}
				/>
			</div>
		</div>
	);
};

const EditWithKeys = ({
	firstName,
	setFirstName,
	lastName,
	setLastName,
	email,
	setEmail,
	handleSubmit,
	handleRefresh,
}) => {
	const editRef = useRef();

	useEffect(() => {
		editRef.current.focus();
	}, []);
	return (
		<div
			ref={editRef}
			className='border-4 w-1/2 p-5 rounded-lg shadow-2xl'
			tabIndex={0}
		>
			<h2 className='font-bold text-xl text-primary capitalize underline pb-2'>
				Edit Input using the keyboard
				<Dot color={"white"} />
			</h2>

			<div className='flex flex-col gap-4 w-2/3'>
				<fieldset className=''>
					<label
						htmlFor='firstnamePreview'
						className='text-primary font-semibold'
					>
						First Name:{" "}
					</label>
					<TextInput
						type={"text"}
						id={"firstnamePreview"}
						value={firstName}
						customFunc={(e) => setFirstName(e.target.value)}
					/>
				</fieldset>
				<fieldset className=''>
					<label
						htmlFor='lastnamePreview'
						className='text-primary font-semibold'
					>
						Last Name:{" "}
					</label>
					<TextInput
						type={"text"}
						id={"lastnamePreview"}
						value={lastName}
						customFunc={(e) => setLastName(e.target.value)}
					/>
				</fieldset>
				<fieldset className=''>
					<label
						htmlFor='emailPreview'
						className='text-primary font-semibold'
					>
						Email Address:{" "}
					</label>
					<TextInput
						type={"email"}
						id={"emailPreview"}
						value={email}
						customFunc={(e) => setEmail(e.target.value)}
					/>
				</fieldset>
				<div className='flex flex-row gap-5'>
					<Button3
						title={"submit"}
						icon={<Upload />}
						type={"button"}
						customFunc={handleSubmit}
						aria={"click to submit the contact form"}
					/>
					<Button2
						type={"button"}
						icon={<Refresh />}
						title={"refresh"}
						customFunc={handleRefresh}
						aria={"click to refresh the form"}
					/>
				</div>
			</div>
		</div>
	);
};

const AddContact = ({
	transcript,
	setTranscript,
	command,
	setCommand,
	handleAllContactsPress,
	fetchConnections,
}) => {
	const { data: session } = useSession();
	const router = useRouter();
	const userRef = useRef();

	const [contactInfo, setContactInfo] = useState([]);

	const [showFirstName, setShowFirstName] = useState(true);
	const [showLastName, setShowLastName] = useState(false);
	const [showEmail, setShowEmail] = useState(false);
	const [showPreview, setShowPreview] = useState(false);
	const [showCorrection, setShowCorrection] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [type, setType] = useState("");

	const [contact, setContact] = useState([]);

	const handleRefresh = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setType("");
		setShowPreview(false);
		setShowFirstName(true);
		setShowCorrection(false);
	};

	const clearSessionStorage = () => {
		sessionStorage.clear();
	};

	const getContactInfo = () => {
		const storedContactInfo = sessionStorage.getItem("contactInfo");
		const parsedContactInfo = JSON.parse(storedContactInfo);
		if (Array.isArray(parsedContactInfo)) {
			return parsedContactInfo;
		} else {
			return [];
		}
	};

	const handleSubmit = async () => {
		await createContact(session?.accessToken, firstName, lastName, email);
		handleRefresh();
		// toast.success("contact added successfully");
		handleAllContactsPress();
	};

	const setContactInfoValues = () => {
		const contactInfo = getContactInfo();
		// Check if contactInfo is a valid array and has at least one element
		if (Array.isArray(contactInfo) && contactInfo.length > 0) {
			// Get the last element of the contactInfo array (assuming it contains the latest values)
			const latestContact = contactInfo[contactInfo.length - 1];

			// Destructure the latestContact object to get the firstName, lastName, and email fields
			const { firstName, lastName, email } = latestContact;

			// Set the values using the provided set functions
			setFirstName(firstName);
			setLastName(lastName);
			setEmail(email);
		}
	};

	const editWithKeyboard = () => {
		setShowCorrection(true);
	};
	const handleCommands = () => {
		if (command === "submit") {
			handleSubmit();
		} else {
			setCommand("");
		}
	};

	useEffect(() => {
		handleCommands();
	}, [command]);

	return (
		<div className='flex flex-col md:flex-row items-center justify-evenly gap-5'>
			<div className='border-4 w-1/2 p-5 rounded-lg shadow-2xl bg-gray-100'>
				<h2 className='pb-2 font-bold text-xl text-primary'>
					ADD CONTACT FORM
				</h2>
				<Line />

				<div>
					{showFirstName && (
						<FirstName
							setShowFirstName={setShowFirstName}
							setShowLastName={setShowLastName}
							setShowEmail={setShowEmail}
							transcript={transcript}
							setTranscript={setTranscript}
							setContactInfo={setContactInfo}
						/>
					)}
					{showLastName && (
						<LastName
							setShowEmail={setShowEmail}
							setShowFirstName={setShowFirstName}
							setShowLastName={setShowLastName}
							transcript={transcript}
							setTranscript={setTranscript}
							setContactInfo={setContactInfo}
						/>
					)}
					{showEmail && (
						<EmailAddress
							setShowEmail={setShowEmail}
							setShowFirstName={setShowFirstName}
							setShowLastName={setShowLastName}
							setShowPreview={setShowPreview}
							transcript={transcript}
							setTranscript={setTranscript}
							setContactInfo={setContactInfo}
							setContactInfoValues={setContactInfoValues}
						/>
					)}
					{showPreview && (
						<Preview
							editWithKeyboard={editWithKeyboard}
							handleRefresh={handleRefresh}
							handleSubmit={handleSubmit}
							email={email}
							firstName={firstName}
							lastName={lastName}
						/>
					)}
				</div>
			</div>
			{showCorrection && (
				<EditWithKeys
					email={email}
					firstName={firstName}
					handleRefresh={handleRefresh}
					handleSubmit={handleSubmit}
					lastName={lastName}
					setEmail={setEmail}
					setFirstName={setFirstName}
					setLastName={setLastName}
				/>
			)}
		</div>
	);
};

export default AddContact;
