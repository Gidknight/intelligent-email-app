import React, { useEffect, useRef } from "react";
import { BackButton, Header, Line } from "./../../components";
import Head from "next/head";
const Documentation = () => {
	const docRef = useRef();

	const tableData = [
		{ id: 1, column1: "Go home", column2: "Navigates to the home page" },
		{
			id: 2,
			column1: "Go to documentation",
			column2: "Navigates to the documentation page",
		},
		{
			id: 3,
			column1: "Go to Emails",
			column2: "Navigates to the emails page",
		},
		{
			id: 4,
			column1: "Go to calender",
			column2: "Navigates to the calender page",
		},
		{
			id: 5,
			column1: "Go to contacts",
			column2: "Navigates to the contacts page",
		},
		{
			id: 6,
			column1: "Go to documentation",
			column2: "Navigates to the documentation page",
		},
		{
			id: 7,
			column1: "Log out",
			column2: "To log out from the app ",
		},
		{
			id: 8,
			column1: "Log in",
			column2: "To log in to the app",
		},
	];

	const emailPageCommands = [
		{
			id: 1,
			column1: "Compose Email",
			column2: "Toggle compose email form",
		},
		{
			id: 2,
			column1: "My Inbox",
			column2: "Fetch the user's latest Inbox",
		},
		{
			id: 3,
			column1: "My Drafts",
			column2: "Fetch the user's Drafts",
		},
		{
			id: 4,
			column1: "My Threads",
			column2: "Fetch the user's latest Threads",
		},
	];

	const howToSendEmail = [
		{
			id: 1,
			process: "STEP ONE: Speak the Recipient Email Address",
		},
		{
			id: 2,
			process:
				"STEP TWO: With the 'TAP KEY' navigate to the ADD RECIPIENT to submit the recipient and move to the next input",
		},
		{
			id: 3,
			process: "STEP THREE: Speak the Subject of the E-mail",
		},
		{
			id: 4,
			process:
				"STEP FOUR: With the 'TAP KEY' navigate to the ADD SUBJECT to submit the subject and move to the next input",
		},
		{
			id: 5,
			process: "STEP FIVE: Speak the Body of the Email",
		},
		{
			id: 6,
			process:
				"STEP SIX: With the 'TAP KEY' navigate to the ADD BODY to submit the body and move to the preview page",
		},
		{
			id: 7,
			process:
				"STEP SEVEN: With the 'TAP KEY' navigate to the submit button to submit your email after you have confirmed your entry",
		},
		{
			id: 8,
			process:
				"OPTIONAL: In the preview page you can choose to edit the inputs fields by clicking on the EDIT WITH KEYBOARD button",
		},
	];

	const howToReadEmail = [
		{
			id: 1,
			process: "STEP ONE: Navigate to the Inbox page",
		},
		{
			id: 2,
			process:
				"STEP TWO: With the 'TAP KEY' navigate to the inbox List containing inbox card which shows the sender, time, subject and message snippet",
		},
		{
			id: 3,
			process:
				"STEP THREE: Click on the email you want to read to open the email",
		},
		{
			id: 4,
			process:
				"OPTIONAL: Speak 'TRANSLATE TO --LANGUAGE OPTION--' to translate the body to the available language option",
		},
		{
			id: 5,
			process:
				"AVAILBALE LANGUAGE OPTIONS: 'french', 'italian', 'spanish', 'german', and 'english' which is the default language option",
		},
		{
			id: 6,
			process:
				"OPTIONAL: Speak 'TRASH EMAIL' or 'DELETE EMAIL' to trash Email",
		},
	];

	const contactPageCommands = [
		{
			id: 1,
			column1: "Add New contact",
			column2: "Toggle The Add Contact Form",
		},
		{
			id: 2,
			column1: "List all contacts",
			column2: "Fetches all contacts and display them on the screen",
		},
	];

	const howToSendEmailFromContact = [
		{
			id: 1,
			process: "STEP ONE: Navigate to the contacts list",
		},
		{
			id: 2,
			process:
				"STEP TWO: With the 'TAP KEY' navigate all the contact list which contains individual contact cards that holds the persons name, email address, and the option to message or delete the contact from your list",
		},
		{
			id: 3,
			process:
				"STEP THREE: If the contact is located, click on the message button to navigate to the send email form,the recipient is filled automatically for you",
		},
		{
			id: 4,
			process: "STEP FOUR: Speak the Subject of the Email",
		},
		{
			id: 5,
			process:
				"STEP FIVE: With the 'TAP KEY' navigate to the ADD SUBJECT to submit the subject and move to the next input",
		},
		{
			id: 6,
			process: "STEP SIX: Speak the Body of the Email",
		},
		{
			id: 7,
			process:
				"STEP SEVEN: With the 'TAP KEY' navigate to the ADD BODY to submit the body and move to the preview page",
		},
		{
			id: 8,
			process:
				"STEP EIGHT: With the 'TAP KEY' navigate to the submit button to submit your email after you have confirmed your entry",
		},
		{
			id: 9,
			process:
				"OPTIONAL: In the preview page you can choose to edit the inputs fields by clicking on the EDIT WITH KEYBOARD button",
		},
	];

	const howToAddANewContact = [
		{
			id: 1,
			process: "STEP ONE: Toggle the ADD CONTACT FORM ",
		},
		{
			id: 2,
			process: "STEP TWO: Speak the first name of the person",
		},
		{
			id: 3,
			process:
				"STEP THREE: With the TAP KEY navigate to ADD FIRST NAME BUTTON and click to add the first name",
		},
		{
			id: 4,
			process: "STEP FOUR: Speak the last name of the person",
		},
		{
			id: 5,
			process:
				"STEP FIVE: With the TAP KEY navigate to ADD LAST NAME BUTTON and click to add the last name",
		},
		{
			id: 6,
			process:
				"STEP SIX: Speak the email address of the person leaving out the suffix i.e '@gmail.com' as this is automatically filled for you",
		},
		{
			id: 7,
			process:
				"STEP SEVEN: With the TAP KEY navigate to ADD EMAIL BUTTON and click to add the email address",
		},
		{
			id: 8,
			process: "STEP EIGHT: Preview your entry",
		},
		{
			id: 9,
			process:
				"STEP NINE:  With the TAP KEY navigate to SUBMIT BUTTON and click to submit the form",
		},
		{
			id: 10,
			process:
				"OPTIONAL: In the preview page click on the EDIT WITH KEYBOARD BUTTON to toggle the keyboard option to make corrections",
		},
		{
			id: 11,
			process:
				"OPTIONAL: In the preview page click on the REFRESH BUTTON refresh the form",
		},
	];

	const calenderPageCommands = [
		{
			id: 1,
			command: "list tasks",
			function: "fetches and dislays all stored tasks",
		},
		{
			id: 2,
			command: "add to list",
			function: "toggles the add task form",
		},
	];

	const howToAddNewTask = [
		{ id: 1, process: "STEP ONE: Toggle the Add Task Form" },
		{ id: 2, process: "STEP TWO: Speak the task" },
		{
			id: 3,
			process:
				"STEP THREE: With the TAP KEY Navigate to the SUBMIT BUTTON and click to Add Task to the List",
		},
	];

	const howToDeleteATask = [
		{ id: 1, process: "STEP ONE: Fetch all Tasks" },
		{
			id: 2,
			process: "STEP TWO: With the TAP KEY Navigate the Tasks List",
		},
		{
			id: 3,
			process:
				"STEP THREE: Click on the MARK AS DONE BUTTON on each task to delete task",
		},
	];

	const draftPageCommands = [
		{ id: 1, command: "SEND DRAFT: To send the draft" },
		{ id: 2, command: "UPDATE DRAFT: To send the update" },
		{ id: 3, command: "DELETE DRAFT: To send the delete" },
	];
	const formCommands = [
		{ id: 1, command: "SUBMIT FORM: To send or submit the form" },
	];
	const navLink = `text-primary hover:bg-primary focus:bg-primary focus:text-white  hover:text-white border-x-2 p-2 translate-all duration-300 capitalize`;

	useEffect(() => {
		docRef.current.focus();
	}, []);

	return (
		<>
			<Head>
				<title>Email Reader App/Documentation</title>
			</Head>
			<section className='flex flex-col justify-center items-center'>
				<div
					className={`m-2 md:m-5 mt-2 p-2 pt-20 md:pt-10 md:p-10 w-full bg-white scroll-smooth overscroll-none`}
				>
					<Header
						title={"Documentation"}
						subtext={null}
						aria={"you are in the documentation page"}
					/>
					<Line />

					<nav
						tabIndex={0}
						className='flex flex-row flex-wrap bg-gray-100 justify-evenly font-semibold shadow-sm my-2'
						aria-label='documentation page navigation bar'
						ref={docRef}
					>
						<a
							href='#keyboard-controls'
							className={navLink}
							aria-label='keyboard controls'
						>
							Keyboard
						</a>
						<a href='#navigation-command' className={navLink}>
							Navigation Commands
						</a>
						<a href='#email-page-command' className={navLink}>
							Email Page Commands
						</a>
						<a
							href='#send-email'
							className={navLink}
							aria-label='how to send email from email page'
						>
							Send Email
						</a>
						<a href='#contact-page-command' className={navLink}>
							Contact page commands
						</a>
						<a
							href='#save-contact'
							className={navLink}
							aria-label='how to save a contact'
						>
							save contact
						</a>
						<a
							href='#email-from-contact'
							className={navLink}
							aria-label='how to send email from contact page'
						>
							email from contact
						</a>
						<a
							href='#calender-page-command'
							className={navLink}
							aria-label='calender page commands'
						>
							calender page commands
						</a>
						<a
							href='#add-task'
							className={navLink}
							aria-label='how to add a new task'
						>
							add task
						</a>
					</nav>
					<Line />
					<div
						className='w-full flex flex-col gap-4 p-4 text-primary bg-gray-100'
						tabIndex={0}
						id='keyboard-controls'
						aria-label='keyboard controls'
					>
						<h3 className='font-bold text-lg uppercase'>
							Keyboard Controls
						</h3>
						<p className='font-semibold text-tertiary'>
							Ctrl + Alt + SpaceBar : To turn on the Microphone
						</p>
						<p className='font-semibold text-tertiary'>
							Shift + SpaceBar : To turn off the Microphone
						</p>
						<p className='font-semibold text-tertiary'>
							Tap : Go to next
						</p>
						<p className='font-semibold text-tertiary'>
							Shift + Tap : Go to previous
						</p>
					</div>
					<div className='w-full h-full'>
						<div
							className='max-w-7xl mx-auto p-4'
							id='navigation-command'
							tabIndex={0}
						>
							<h1 className='text-3xl font-bold mb-4 text-primary'>
								Navigation Commands
							</h1>
							<div className='overflow-x-auto'>
								<table className='w-full table-auto border border-collapse border-gray-200'>
									<caption className='sr-only'>
										Navigation Commands Documentation
									</caption>
									<thead>
										<tr className='bg-gray-100'>
											<th
												className='border border-gray-200 px-4 py-2 text-primary'
												scope='col'
											>
												Voice Commands
											</th>
											<th
												className='border border-gray-200 px-4 py-2 text-primary'
												scope='col'
											>
												Function
											</th>
										</tr>
									</thead>
									<tbody>
										{tableData.map((row) => (
											<tr
												key={row.id}
												className='border-t border-gray-200'
											>
												<td className='border border-gray-200 px-4 py-2 text-primary uppercase'>
													{row.column1}
												</td>
												<td className='border border-gray-200 px-4 py-2 text-secondary bg-gray-100 capitalize'>
													{row.column2}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<Line />
						{/* email page */}
						<div
							className='max-w-5xl mx-auto p-4 bg-slate-50 shadow-md'
							id='email-page-command'
							tabIndex={0}
						>
							<h1 className='text-xl font-bold mb-4 text-primary capitalize'>
								Emails Page Commands
							</h1>
							<div className='overflow-x-auto'>
								<table className='w-full table-auto border border-collapse border-gray-200'>
									<caption className='sr-only'>
										Emails Page Commands
									</caption>
									<thead>
										<tr className='bg-gray-100'>
											<th
												className='border border-gray-400 px-4 py-2 text-primary'
												scope='col'
											>
												Voice Commands
											</th>
											<th
												className='border border-gray-400 px-4 py-2 text-primary'
												scope='col'
											>
												Function
											</th>
										</tr>
									</thead>
									<tbody>
										{emailPageCommands.map((row) => (
											<tr
												key={row.id}
												className='border-t border-gray-200'
											>
												<td className='border border-gray-200 px-4 py-2 text-primary uppercase'>
													{row.column1}
												</td>
												<td className='border border-gray-200 px-4 py-2 text-secondary bg-gray-100 capitalize'>
													{row.column2}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div className='w-100 p-5' id='send-email' tabIndex={0}>
							<h3 className='text-primary text-lg font-semibold underline capitalize'>
								How to send an Email from the Emails page
							</h3>
							<div className='flex flex-col gap-1'>
								{howToSendEmail.map((step) => (
									<div key={step.id}>
										<p className='text-primary font-normal'>
											{step.process}.
										</p>
									</div>
								))}
							</div>
						</div>

						<div className='w-100 p-5' id='read-email' tabIndex={0}>
							<h3 className='text-primary text-lg font-semibold underline capitalize'>
								How to read email
							</h3>
							<div className='flex flex-col gap-1'>
								{howToReadEmail.map((step) => (
									<div key={step.id}>
										<p className='text-primary font-normal'>
											{step.process}.
										</p>
									</div>
								))}
							</div>
						</div>

						<Line />
						{/* contact page */}
						<div
							className='max-w-5xl mx-auto p-4 bg-slate-50 shadow-md'
							id='contact-page-command'
							tabIndex={0}
						>
							<h1 className='text-xl font-bold mb-4 text-primary'>
								Contact Page Commands
							</h1>
							<div className='overflow-x-auto'>
								<table className='w-full table-auto border border-collapse border-gray-200'>
									<caption className='sr-only'>
										Contact Page Commands
									</caption>
									<thead>
										<tr className='bg-gray-100'>
											<th
												className='border border-gray-400 px-4 py-2 text-primary'
												scope='col'
											>
												Voice Commands
											</th>
											<th
												className='border border-gray-400 px-4 py-2 text-primary'
												scope='col'
											>
												Function
											</th>
										</tr>
									</thead>
									<tbody>
										{contactPageCommands.map((row) => (
											<tr
												key={row.id}
												className='border-t border-gray-200'
											>
												<td className='border border-gray-200 px-4 py-2 text-primary uppercase'>
													{row.column1}
												</td>
												<td className='border border-gray-200 px-4 py-2 text-secondary bg-gray-100 capitalize'>
													{row.column2}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div
							className='w-100 p-5'
							id='email-from-contact'
							tabIndex={0}
						>
							<h3 className='text-primary text-lg font-semibold capitalize underline'>
								How to send an Email to a contact from the
								contacts page
							</h3>
							<div className='flex flex-col gap-1'>
								{howToSendEmailFromContact.map((step) => (
									<div key={step.id}>
										<p className='text-primary font-normal'>
											{step.process}.
										</p>
									</div>
								))}
							</div>
						</div>

						<div
							className='w-100 p-5'
							id='save-contact'
							tabIndex={0}
						>
							<h3 className='text-primary text-lg font-semibold capitalize underline'>
								How to add a new Contact
							</h3>
							<div className='flex flex-col gap-1'>
								{howToAddANewContact.map((step) => (
									<div key={step.id}>
										<p className='text-primary font-normal'>
											{step.process}.
										</p>
									</div>
								))}
							</div>
						</div>

						<Line />
						{/* calender page */}
						<div
							className='max-w-5xl mx-auto p-4 bg-slate-50 shadow-md'
							id='calender-page-command'
							tabIndex={0}
						>
							<h1 className='text-xl font-bold mb-4 text-primary'>
								Calender Page Commands
							</h1>
							<div className='overflow-x-auto'>
								<table className='w-full table-auto border border-collapse border-gray-200'>
									<caption className='sr-only'>
										Calender Page Commands
									</caption>
									<thead>
										<tr className='bg-gray-100'>
											<th
												className='border border-gray-400 px-4 py-2 text-primary'
												scope='col'
											>
												Voice Commands
											</th>
											<th
												className='border border-gray-400 px-4 py-2 text-primary'
												scope='col'
											>
												Function
											</th>
										</tr>
									</thead>
									<tbody>
										{calenderPageCommands.map((row) => (
											<tr
												key={row.id}
												className='border-t border-gray-200'
											>
												<td className='border border-gray-200 px-4 py-2 text-primary uppercase'>
													{row.command}
												</td>
												<td className='border border-gray-200 px-4 py-2 text-secondary bg-gray-100 capitalize'>
													{row.function}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div className='w-100 p-5' id='add-task' tabIndex={0}>
							<h3 className='text-primary text-lg font-semibold capitalize underline'>
								How to add a new task
							</h3>
							<div className='flex flex-col gap-1'>
								{howToAddNewTask.map((step) => (
									<div key={step.id}>
										<p className='text-primary font-normal'>
											{step.process}.
										</p>
									</div>
								))}
							</div>
						</div>

						<div className='w-100 p-5' tabIndex={0}>
							<h3 className='text-primary text-lg font-semibold capitalize underline'>
								How to delete a task
							</h3>
							<div className='flex flex-col gap-1'>
								{howToDeleteATask.map((step) => (
									<div key={step.id}>
										<p className='text-primary font-normal'>
											{step.process}.
										</p>
									</div>
								))}
							</div>
						</div>

						<div className='w-100 p-5' tabIndex={0}>
							<h1 className='text-primary text-lg font-semibold uppercase'>
								Other commands
							</h1>
							<div className='flex flex-col gap-4 p-2  bg-gray-200'>
								<div className='flex flex-col gap-1'>
									<h3 className='font-semibold text-lg text-primary capitalize underline'>
										Draft page commands
									</h3>
									{draftPageCommands.map((step) => (
										<div key={step.id}>
											<p className='text-primary font-normal'>
												{step.command}.
											</p>
										</div>
									))}
								</div>
							</div>
							<div className='flex flex-col gap-4 p-2  bg-gray-200'>
								<div className='flex flex-col gap-1'>
									<h3 className='font-semibold text-lg text-primary capitalize underline'>
										Form commands
									</h3>
									{formCommands.map((step) => (
										<div key={step.id}>
											<p className='text-primary font-normal'>
												{step.command}.
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
						<Line />
					</div>
				</div>
				<BackButton />
			</section>
		</>
	);
};

export default Documentation;
