'use client';
import Link from 'next/link';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';

export const Featured = () => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef
	});
	const x = useTransform(scrollYProgress, [0, 1], ['1%', '-95%']);
	const products = [
		{
			id: 1,
			name: 'One Day Cleanse',
			price: 10,
			image: '/images/p1.png'
		},
		{
			id: 2,
			name: 'Two Day Cleanse',
			price: 10,
			image: '/images/p2.png'
		},
		{
			id: 3,
			name: 'Three Day Cleanse',
			price: 10,
			image: '/images/p1.png'
		}
	];
	return (
		<div ref={targetRef}>
			<h1 className='mt-6 p-4 font-babeSans text-3xl font-semibold'>
				Always Fresh
			</h1>
			<div>
				<div className='p-6'>
					<img src={products[0].image} className='rounded-2xl object-contain' />
					<p className='font-babeSans text-2xl mt-4 text-center'>
						{products[0].name}
					</p>
					<p className='text-center'>from ${products[0].price.toFixed(2)}</p>
				</div>
			</div>
			{/* CTA BTN */}
			<div className='flex justify-center mt-4'>
				<button className='font-babeSans px-8 py-4 border rounded-full text-center text-3xl'>
					<Link href='/products'>where to buy</Link>
				</button>
			</div>
		</div>
	);
};

const Card = ({ card }) => {
	return (
		<div
			key={card.id}
			className='group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200'
		>
			<div
				style={{
					backgroundImage: `url(${card.image})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
				className='absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110'
			></div>
			<div className='absolute inset-0 z-10 grid place-content-center'>
				<p className='bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg'>
					{card.name}
				</p>
			</div>
		</div>
	);
};
