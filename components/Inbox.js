"use client";

import React, { useEffect, useState, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";
import EmailCard from "./EmailCard";
import { checkPayLoad, fetchPersonalEmails } from "../utils";

const Inbox = ({ emails, setPage, page, totalPages }) => {
	const inboxRef = useRef();
	//states
	const [isLoading, setIsLoading] = useState(false);

	//functions

	const handleLoadMore = () => {
		if (page + 1 < totalPages) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	const payload = [];
	if (emails) {
		emails.forEach((email) => {
			const individualPayload = {
				date: null,
				subject: null,
				from: null,
				to: null,
				snippet: null,
				id: null,
				body: null,
			};

			email.payload.headers.forEach((header) => {
				if (header.name === "Date") {
					individualPayload.date = header.value;
				} else if (header.name === "Subject") {
					individualPayload.subject = header.value;
				} else if (header.name === "From") {
					individualPayload.from = header.value;
				} else if (header.name === "To") {
					individualPayload.to = header.value;
				}
			});

			if (individualPayload.from.endsWith("@gmail.com")) {
				individualPayload.body = email?.payload?.body;
			} else {
				individualPayload.body = email?.payload?.parts;
				// individualPayload.body = null;
			}

			individualPayload.snippet = email?.snippet;
			individualPayload.id = email?.id;
			payload.push(individualPayload);
		});
	}

	useEffect(() => {
		inboxRef.current.focus();
		checkPayLoad(emails, setIsLoading);
	}, [emails]);

	return (
		<section
			className='mx-auto bg-slate-100 p-5 rounded-lg shadow-lg w-full'
			aria-label='my inbox'
			tabIndex={0}
			ref={inboxRef}
		>
			<h2 className='font-bold text-xl uppercase text-center text-primary pb-4 '>
				My Inbox
			</h2>

			<div className='flex flex-col gap-1 md:gap-4 w-full' tabIndex={0}>
				{isLoading && <LoadingSpinner load={"personal emails"} />}
				{!emails && (
					<div tabIndex={0} className='bg-red-100 p-5 rounded-lg'>
						<h3 className='font-semibold text-red-500'>
							Error loading Inbox, Try logging in again
						</h3>
					</div>
				)}
				{payload.map((individualPayload, index) => (
					<EmailCard
						key={index}
						date={individualPayload.date}
						subject={individualPayload.subject}
						from={individualPayload.from}
						to={individualPayload.to}
						snippet={individualPayload.snippet}
						body={individualPayload.body}
						id={individualPayload.id}
					/>
				))}
			</div>
			{emails > 5 && (
				<div className='flex flex-row items-center justify-center gap-4 pt-4'>
					{page + 1 < totalPages && (
						<button
							className='text-tertiary p-2 bg-transparent rounded-lg hover:shadow-sm hover:font-bold hover:text-white hover:bg-primary'
							onClick={handleLoadMore}
						>
							Load More
						</button>
					)}
				</div>
			)}
		</section>
	);
};

export default Inbox;
