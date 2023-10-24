"use client";

import React, { useEffect, useRef, useState } from "react";
import ThreadCard from "./ThreadCard";
import LoadingSpinner from "./LoadingSpinner";
import { checkPayLoad } from "../utils";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Thread = ({ threads, page, pageSize, setPage }) => {
	//states
	const threadRef = useRef();
	const [isLoading, setIsLoading] = useState(false);

	const handlePreviousPage = () => {
		if (page > 0) {
			setPage((prevPage) => prevPage - 1);
		}
	};

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const payload = [];
	if (threads) {
		threads.forEach((thread) => {
			const individualPayload = {
				date: null,
				subject: null,
				from: null,
				to: null,
				snippet: null,
				id: null,
				received: null,
			};

			thread?.messages[0]?.payload?.headers.forEach((header) => {
				if (header.name === "Date") {
					individualPayload.date = header.value;
				} else if (header.name === "Subject") {
					individualPayload.subject = header.value;
				} else if (header.name === "From") {
					individualPayload.from = header.value;
				} else if (header.name === "To") {
					individualPayload.to = header.value;
				} else if (header.name === "Received") {
					individualPayload.received = header.value;
				}
			});

			// individualPayload.body = email?.payload?.parts[0]?.body;
			individualPayload.messages = thread?.messages;
			individualPayload.snippet = thread?.messages[0]?.snippet;
			individualPayload.id = thread?.id;
			payload.push(individualPayload);
		});
	}

	useEffect(() => {
		threadRef.current.focus();
		checkPayLoad(threads, setIsLoading);
	}, []);
	return (
		<section
			className='mx-auto bg-slate-100 p-5 rounded-lg shadow-lg w-full'
			aria-label='my threads'
			tabIndex={0}
			ref={threadRef}
		>
			<h1 className='font-bold text-xl uppercase text-center text-primary pb-4 '>
				My Threads
			</h1>

			{/* draft card */}
			{!threads && (
				<div className='bg-red-100 p-5 rounded-lg' tabIndex={0}>
					<h3 className='font-semibold text-red-500'>
						Error fetching Threads, Try logging in again
					</h3>
				</div>
			)}
			<div className='flex flex-col gap-1 md:gap-5' tabIndex={0}>
				{isLoading && <LoadingSpinner load={"threads"} />}
				{payload.map((individualPayload, index) => (
					<ThreadCard
						from={individualPayload?.from}
						to={individualPayload?.to}
						snippet={individualPayload?.snippet}
						subject={individualPayload?.subject}
						key={individualPayload?.id}
						id={individualPayload?.id}
						messages={individualPayload?.messages}
						date={individualPayload?.date}
					/>
				))}
			</div>
			{threads && (
				<div className='flex flex-row items-center justify-center gap-4 pt-4'>
					<button
						className='text-tertiary hover:text-primary hover:shadow-sm'
						onClick={handlePreviousPage}
						disabled={page === 0}
					>
						<ArrowBack /> Previous Page
					</button>
					<span className='font-bold text-primary'>
						Page {page + 1}
					</span>
					<button
						className='text-tertiary hover:text-primary hover:shadow-sm'
						onClick={handleNextPage}
						disabled={threads.length < pageSize}
					>
						Next Page <ArrowForward />
					</button>
				</div>
			)}
		</section>
	);
};

export default Thread;
