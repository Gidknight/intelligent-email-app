"use client";

import React, { useEffect, useRef, useState } from "react";
import DraftCard from "./DraftCard";
import LoadingSpinner from "./LoadingSpinner";
import { checkPayLoad } from "../utils";
import axios from "axios";
import {
	ArrowBack,
	ArrowBackIos,
	ArrowForward,
	Forward,
} from "@mui/icons-material";

const Drafts = ({ drafts, page, setPage, pageSize }) => {
	//states
	// const [drafts, setDrafts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const draftRef = useRef();
	// const [page, setPage] = useState(0);
	// const [pageSize, setPageSize] = useState(10);

	//functions

	const handlePreviousPageDrafts = () => {
		if (page > 0) {
			setPage((prevPage) => prevPage - 1);
		}
	};

	const handleNextPageDrafts = () => {
		setPage((prevPage) => prevPage + 1);
	};

	const payload = [];
	if (drafts) {
		drafts?.forEach((draft) => {
			const individualPayload = {
				date: null,
				subject: null,
				from: null,
				to: null,
				snippet: null,
				id: null,
				received: null,
			};

			draft?.message?.payload?.headers.forEach((header) => {
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
			individualPayload.body = draft?.message?.payload?.body?.data;
			individualPayload.snippet = draft?.message?.snippet;
			individualPayload.id = draft?.id;
			payload.push(individualPayload);
		});
	}

	useEffect(() => {
		draftRef.current.focus();
		checkPayLoad(drafts, setIsLoading);
	}, [drafts]);

	return (
		<section
			className='mx-auto bg-slate-100 p-5 rounded-lg shadow-lg w-full'
			aria-label='my drafts'
			tabIndex={0}
			ref={draftRef}
		>
			<h1 className='font-bold text-xl uppercase text-center text-primary pb-4 '>
				My Drafts
			</h1>

			{/* draft card */}
			{!drafts && (
				<div
					ref={draftRef}
					className='bg-red-100 p-5 rounded-lg'
					tabIndex={0}
				>
					<h3 className='font-semibold text-red-500 text-center'>
						No Draft found
					</h3>
				</div>
			)}
			<div className='flex flex-col gap-1 md:gap-5' tabIndex={0}>
				{isLoading && <LoadingSpinner load={"drafts"} />}
				{payload.map((individualPayload, index) => (
					<DraftCard
						from={individualPayload?.from}
						to={individualPayload?.to}
						snippet={individualPayload?.snippet}
						subject={individualPayload?.subject}
						key={individualPayload?.id}
						id={individualPayload?.id}
						body={individualPayload?.body}
						date={individualPayload?.date}
					/>
				))}
			</div>
			{drafts && (
				<div className='flex flex-row items-center justify-center gap-4 pt-4'>
					<button
						className='text-tertiary hover:text-primary hover:shadow-sm'
						onClick={handlePreviousPageDrafts}
						disabled={page === 0}
					>
						<ArrowBack /> Previous Page
					</button>
					<span className='font-bold text-primary'>
						Page {page + 1}
					</span>
					<button
						className='text-tertiary hover:text-primary hover:shadow-sm'
						onClick={handleNextPageDrafts}
						disabled={drafts.length < pageSize}
					>
						Next Page <ArrowForward />
					</button>
				</div>
			)}
		</section>
	);
};

export default Drafts;
