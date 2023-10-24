"use client";

import Head from "next/head";
import {
	AddTask,
	Header,
	TasksTable,
	Line,
	BackButton,
	VoiceControl,
} from "../../components";
import { Add, ListAltOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Calender = () => {
	const router = useRouter();

	const [showTasks, setShowTasks] = useState(true);
	const [showAddTask, setShowAddTask] = useState(false);
	const [showRemoveTask, setShowRemoveTask] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [command, setCommand] = useState("");
	const [transcript, setTranscript] = useState("");

	const menuClass = `text-lg font-bold p-3 text-gray1 hover:text-white focus:text-white hover:bg-secondary focus:bg-secondary rounded-full border-gray2 transition-all border-2 bg-lightWhite flex items-center gap-2`;
	const activeClass = `text-xl font-bold p-3 text-primary bg-whiteLight hover:text-white focus:text-white hover:bg-secondary focus:bg-secondary rounded-full border-secondary transition-all border-2 flex items-center gap-2`;

	const allTasksPress = () => {
		setShowTasks(true);
		setShowAddTask(false);
		setShowRemoveTask(false);
	};
	const addTaskPress = () => {
		setShowAddTask(true);
		setShowTasks(false);
		setShowRemoveTask(false);
	};

	const handleCommands = () => {
		if (command === "all tasks") {
			allTasksPress();
		} else if (command === "add task") {
			addTaskPress();
		}
	};

	useEffect(() => {
		// Get all tasks from localStorage
		const allTasks = localStorage.getItem("tasks");
		if (allTasks) {
			setTasks(JSON.parse(allTasks));
		}
	}, []);
	useEffect(() => {
		handleCommands();
	}, [command]);

	return (
		<>
			<Head>
				<title>Email Reader App/Calendar</title>
				{/* <link rel="icon" href="/favicon.ico" /> */}
			</Head>

			<section className='flex flex-col justify-center items-center'>
				<div
					className={`m-2 md:m-5 mt-2 p-2 pt-20 md:pt-14 md:p-10 w-full bg-white scroll-smooth overscroll-none`}
				>
					<Header
						title={"Calendar page"}
						subtext={null}
						aria={"you are in the calender page"}
					/>

					<Line />
					<div className='flex flex-row gap-5 px-5 '>
						<button
							className={showTasks ? activeClass : menuClass}
							onClick={allTasksPress}
							aria-pressed={showTasks}
							aria-label='click to list all tasks'
						>
							<ListAltOutlined />
							List Tasks
						</button>
						<button
							className={menuClass}
							onClick={addTaskPress}
							aria-pressed={showAddTask}
							aria-label='click to add a new task'
						>
							<Add />
							Add a task
						</button>
					</div>
					<Line />
					<div className='flex flex-col gap-2 justify-center items-center'>
						<VoiceControl
							setTranscript={setTranscript}
							setCommand={setCommand}
						/>
						{transcript && (
							<p
								className='text-center text-transcript'
								tabIndex={0}
							>
								Transcript: {transcript}
							</p>
						)}
					</div>
					<Line />
					<div className='w-full h-100 py-5 flex flex-col md:flex-row gap-5 justify-evenly items-center md:items-center'>
						<div className='w-100 items-center'>
							{showTasks && (
								<TasksTable
									tasks={tasks}
									setTasks={setTasks}
									menuClass={menuClass}
									setShowAddTask={setShowAddTask}
									setShowTasks={setShowTasks}
								/>
							)}
							{showAddTask && (
								<AddTask
									setShowTasks={setShowTasks}
									setShowAddTask={setShowAddTask}
									setTasks={setTasks}
									tasks={tasks}
								/>
							)}
						</div>
					</div>
				</div>
				<div className='mx-auto pb-10'>
					<BackButton />
				</div>
			</section>
		</>
	);
};

export default Calender;
