"use client";

import { useRouter } from "next/router";
import { handleEnter } from "../utils";
import { toast } from "react-hot-toast";

const DraftCard = ({ subject, to, from, snippet, body, id, date }) => {
	const route = useRouter();
	// const decodedBody = atob(body.data?.replace(/-/g, "+").replace(/_/g, "/"));

	// console.log(decodedBody);
	const data = {
		from: from,
		date: date,
		subject: subject,
		id: id,
		body: body,
		to: to,
	};

	const handleClick = () => {
		const encodedDraft = encodeURIComponent(JSON.stringify(data));
		route.push({
			pathname: `/email/drafts/`,
			query: { data: encodedDraft },
		});
		toast.success("navigating to selected draft");
	};

	const handleEnter = (event) => {
		if (event.key === "Enter" || event.key === "Space") {
			handleClick();
		}
	};

	return (
		<button
			type='button'
			className='w-full px-2 md:px-10'
			onClick={handleClick}
			key={id}
			onKeyDown={handleEnter(handleClick)}
		>
			<div className=' bg-gray1 hover:bg-tertiary focus:bg-tertiary w-100 px-1 md:px-5 h-100 rounded-2xl flex hover:shadow-xl cursor-pointer hover:scale-105 transition-all duration-300 gap-5'>
				<div className='m-auto flex flex-col w-full h-full bg-slate-200 p-1 md:p-5 justify-start '>
					<div className='flex flex-row justify-between w-100 items-start md:items-center '>
						<h3 className='text-lg font-light w-1/2 text-left'>
							Reciever: {from}
						</h3>
						<h4 className='text-lg font-light w-1/2 text-right'>
							Date: {date}
						</h4>
					</div>
					<div className='pt-2 flex flex-col justify-center items-start w-100'>
						<h2 className='font-semibold'>
							<span className='font-bold text-xl text-primary'>
								Subject: {subject}
							</span>{" "}
						</h2>
						<p className='py-2 text-secondary'>
							{snippet}
							{/* <span className='text-primary'>Read More</span> */}
						</p>
					</div>
				</div>
			</div>
		</button>
	);
};

export default DraftCard;
