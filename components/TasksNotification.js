import { NotificationImportant } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

const TasksNotification = ({ numberOfTasks, setNumberOfTasks }) => {
	if (!numberOfTasks) {
		return null;
	} else
		return (
			<p className='w-100 h-100 relative'>
				<NotificationImportant className='text-2xl' />
				<span className='bg-red-500 text-white text-sm rounded-full absolute top-1.5 right-1.5 transform translate-x-1/2 -translate-y-1/2'>
					{numberOfTasks}
				</span>
			</p>
		);
};

export default TasksNotification;
