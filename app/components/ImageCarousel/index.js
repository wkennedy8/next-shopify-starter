'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ImageCarousel = () => {
	const [width, setWidth] = useState(0);
	const images = [1, 2, 3];
	const ref = useRef();

	useEffect(() => {
		setWidth(ref.current.scrollWidth - ref.current.offsetWidth);
	}, []);
	return (
		<div ref={ref} className='cursor-grab overflow-hidden'>
			<motion.div
				drag='x'
				dragConstraints={{ right: 0, left: -width }}
				whileTap={{ cursor: 'grabbing' }}
				className='flex'
			>
				{images.map((image) => {
					return (
						<motion.div className='min-w-[20rem] min-h-[30rem] p-4' key={image}>
							<img
								className='h-full w-full object-cover'
								src='/images/p1.png'
								alt={image}
							/>
						</motion.div>
					);
				})}
			</motion.div>
		</div>
	);
};
