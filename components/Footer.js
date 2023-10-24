import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Footer = () => {
	const { data: session } = useSession();

	const router = useRouter();

	const goToDocs = () => {
		router.push("/documentation");
	};
	// if (session) {
	return (
		<footer
			className='mt-24 bg-white h-10 max-h-20 flex fixed w-screen bottom-0 shadow-lg z-30'
			tabIndex={0}
		>
			<p className='text-primary text-center m-auto'>
				© 2023 All rights reserved by Ayodele Gideon.{" "}
				<button
					aria-label='click to visit the app documentation page'
					onClick={goToDocs}
					className='cursor-pointer rounded-xl font-semibold p-1 hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-all duration-300 shadow-lg'
				>
					Visit Docs
				</button>
			</p>
		</footer>
	);
	// }
};

export default Footer;
