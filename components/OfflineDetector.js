// components/OfflineDetector.js

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// import { ToastContainer, toast } from "react-toastify";

const OfflineDetector = () => {
	const [isOnline, setIsOnline] = useState(true);

	useEffect(() => {
		const handleOfflineStatus = () => {
			setIsOnline(navigator.onLine);
		};

		if (typeof window !== "undefined") {
			setIsOnline(navigator.onLine);

			window.addEventListener("online", handleOfflineStatus);
			window.addEventListener("offline", handleOfflineStatus);

			return () => {
				window.removeEventListener("online", handleOfflineStatus);
				window.removeEventListener("offline", handleOfflineStatus);
			};
		}
	}, []);

	return <>{isOnline ? null : toast.error("Your internet is offline!")}</>;
};

export default OfflineDetector;
