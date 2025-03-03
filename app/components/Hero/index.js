import Link from 'next/link';
export const Hero = () => {
	return (
		<div className="mt-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[65vh] lg:h-screen bg-[url('/images/hero.jpeg')] bg-cover relative">
			{/* Overlay */}
			<div className='absolute inset-0 bg-black bg-opacity-40'></div>

			{/* Button */}
			<button className='absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black text-xl font-babeSans px-6 py-4 rounded-full shadow-lg hover:bg-gray-800 hover:text-white transition duration-300'>
				<Link href='/products'>Shop Now</Link>
			</button>
		</div>
	);
};
