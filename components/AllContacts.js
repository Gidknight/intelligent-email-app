"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Button1 from "./Button1";
import LoadingSpinner from "./LoadingSpinner";
import { Delete, HourglassEmpty, SendRounded } from "@mui/icons-material";
import Line from "./Line";
import { checkPayLoad, createArray } from "../utils";
import { deleteContact } from "../utils/people-api";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { Button3 } from ".";

const ContactCard = ({ name, imgUrl, emailAddress, resourceName }) => {
	const { data: session } = useSession();
	const router = useRouter();
	const handleMessage = () => {
		createArray("emailInfo");
		router.push({
			pathname: `/contacts/sendEmail`,
			query: { data: emailAddress },
		});
	};
	const handleDelete = async () => {
		await deleteContact(session?.accessToken, resourceName);
		toast.success("contact deleted successfully, navigating to home");

		router.push("/");
	};
	return (
		<div
			className='flex flex-col p-2 w-96 h-52 bg-gray-100 rounded-lg hover:shadow-lg hover:scale-105 focus:scale-105 transition-all duration-300'
			tabIndex={0}
		>
			<div className='flex flex-row p-2 h-100 items-center'>
				<div>
					<Image
						src={imgUrl}
						alt={name}
						width={50}
						height={50}
						className='rounded-full object-cover border-2 border-secondary shadow-lg'
					/>
				</div>
				<div
					className='w-100 px-2 justify-center items-center'
					tabIndex={0}
				>
					<h2 className='text-lg font-semibold capitalize text-primary'>
						Name: {name}
					</h2>
					<div>
						<h4 className='text-lg font-semibold text-secondary'>
							Email:
						</h4>
						<h4 className='text-lg font-normal italic text-secondary'>
							{emailAddress}
						</h4>
					</div>
				</div>
			</div>
			<div className='flex flex-row w-100 justify-evenly border-t-4'>
				<Button1
					title={"Message"}
					icon={<SendRounded />}
					type={"button"}
					customFunc={handleMessage}
				/>
				<Button3
					title={"Delete"}
					icon={<Delete />}
					type={"button"}
					customFunc={handleDelete}
				/>
			</div>
		</div>
	);
};

const AllContacts = ({ contacts, setContacts, handleAllContactsPress }) => {
	const { data: session } = useSession();
	const containerRef = useRef();

	const [isLoading, setIsLoading] = useState(false);

	// functions

	useEffect(() => {
		containerRef.current.focus();
		checkPayLoad(contacts, setIsLoading);
	}, [contacts]);
	// console.log(contacts);
	return (
		<div className='w-full' ref={containerRef} tabIndex={0}>
			<div className='p-2 border-y-2 shadow-md'>
				<h2 className='font-bold text-xl text-primary text-center uppercase border-b-2 py-2'>
					my contacts
				</h2>
				<div className='flex flex-row gap-4 p-2 md:p-4 overflow-hidden w-full'>
					<div className='flex flex-row flex-wrap gap-5 mx-auto items-centerjustify-center'>
						{isLoading && <LoadingSpinner load={"contacts"} />}
						{/* Rendered ContactCard components */}
						{contacts?.map((contact, index) => (
							<ContactCard
								key={index}
								imgUrl={contact?.photos[0]?.url}
								name={contact?.names[0]?.displayName}
								emailAddress={contact?.emailAddresses[0]}
								resourceName={contact?.resourceName}
							/>
						))}
						{!contacts && (
							<div className=' bg-gray-100 text-gray1 text-center font-bold text-lg capitalize'>
								<p className='p-5 text-center'>
									no contact in database
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<Line />
		</div>
	);
};

export default AllContacts;
