"use client";

import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScreenReaderToggle from "./ScreenReaderToggle";
import OfflineDetector from "./OfflineDetector";

const Layout = ({ children }) => {
	return (
		<main className='bg-lightWhite w-screen overflow-auto h-full'>
			<div className='flex relative '>
				<Toaster />
				<div className='flex-1'>
					<ScreenReaderToggle />
					<Navbar />
					{children}
					<Footer />
					{/* <OfflineDetector /> */}
				</div>
			</div>
		</main>
	);
};

export default Layout;
