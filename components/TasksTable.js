"use client";

import { Add, Done } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import Dot from "./Dot";
import { useState } from "react";

const TasksTable = ({
	tasks,
	setTasks,
	menuClass,
	setShowAddTask,
	setShowTasks,
}) => {
	const [numberOfTasks, setNumberOfTasks] = useState(0);
	const tableRef = useRef();

	const fecthTasks = () => {
		const tasks = JSON.parse(localStorage.getItem("tasks" || "[]"));
		setNumberOfTasks(tasks?.length);
	};

	const deleteTask = (task) => {
		const updatedTasks = tasks.filter((item) => item.task !== task);
		setTasks(updatedTasks);

		localStorage.setItem("tasks", JSON.stringify(updatedTasks));

		toast.success(`${task} task deleted successfully`);
		fecthTasks();
		return updatedTasks;
	};

	useEffect(() => {
		fecthTasks();
		tableRef.current.focus();
	}, []);
	return (
		<div
			className='w-full h-full border-2 border-gray1 p-2 md:p-4 rounded-xl'
			role='table'
			tabIndex={0}
			ref={tableRef}
		>
			<h2 className='font-bold text-xl text-primary uppercase pb-2'>
				Tasks Table
				<Dot color={"white"} />
				{numberOfTasks <= 1 ? (
					<i className='text-gray-1 capitalize text-sm font-normal'>
						you have {numberOfTasks} undone task.
					</i>
				) : (
					<i className='text-gray-1 capitalize text-sm font-normal'>
						you have {numberOfTasks} undone tasks.
					</i>
				)}
			</h2>
			<hr className='h-1 bg-primary mb-5' />

			{tasks.length > 0 ? (
				<div className='flex flex-col gap-4 h-full w-full items-center justify-center m-2'>
					{tasks.map((item, index) => (
						<div
							className='flex flex-row items-center justify-between rounded-xl bg-white border-2 border-gray2 shadow-md gap-1 p-2 md:p-4 w-full max-w-full hover:scale-105 focus:scale-105 hover:shadow-xl focus:shadow-xl hover:border-tertiary focus:border-tertiary transition-all duration-300'
							key={index}
							role='row'
							aria-label={`Task ${index + 1}, ${item?.task}`}
						>
							<div
								className='flex flex-row items-center justify-start gap-2'
								role='cell'
							>
								<h2 className='text-primary font-bold'>
									({index + 1})
								</h2>
								<h3 className='text-primary text-lg'>
									{item.task}
								</h3>
							</div>

							<div className='flex items-end justify-end gap-2'>
								<button
									type='button'
									className='flex flex-row gap-1 text-white bg-gray1 font-semibold p-2 rounded-lg hover:bg-green-600 focus:bg-green-600 hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer'
									onClick={() => deleteTask(item.task)}
									aria-label='Mark as done'
								>
									<Done />
									done
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='flex flex-col items-center gap-3 font-semibold text-lg text-gray1'>
					<p className='capitalize'>No task in the database.</p>

					<button
						className={menuClass}
						onClick={() => {
							setShowAddTask(true);
							setShowTasks(false);
						}}
						aria-label='click to create a task'
					>
						<Add />
						Add a task
					</button>
				</div>
			)}
		</div>
	);
};

export default TasksTable;
