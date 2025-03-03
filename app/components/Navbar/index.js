'use client';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { useMotionValueEvent, motion, useScroll } from 'framer-motion';
import { FiMenu } from 'react-icons/fi';
import { GiShoppingCart } from 'react-icons/gi';
import { ShoppingCart } from '../ShoppingCart';
import { CartContext } from '@/app/context';

// import useMeasure from 'react-use-measure';

export const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const { scrollY } = useScroll();
	const [mobileNavOpen, setMobileNavOpen] = useState(false);
	const { showCart, setShowCart, cart, cartCount } = useContext(CartContext);

	const count = 0;

	useMotionValueEvent(scrollY, 'change', (latest) => {
		setScrolled(latest > 50 ? true : false);
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05
				// delay: 9
			}
		}
	};

	const childrenVariants = {
		hidden: { opacity: 0, y: '50%' },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.2,
				ease: 'easeOut' // Add ease-out easing function
			}
		}
	};

	const links = [
		{
			title: 'shop all',
			href: '/products'
		},
		{
			title: 'events',
			href: '/events'
		},
		{
			title: 'about',
			href: '/about'
		},
		{
			title: 'get in touch',
			href: '/contact'
		}
	];

	return (
		<motion.div
			initial='hidden'
			animate='visible'
			variants={containerVariants}
			className={`fixed left-0 right-0 top-0 w-full p-4 transition-all duration-200 ease-out lg:px-12
      ${
				scrolled
					? 'backdrop-blur-xl bg-white shadow-xl  z-50'
					: ' py-6 shadow-none bg-white z-50 '
			}`}
		>
			<div className='flex justify-between items-center'>
				<div className=' flex items-center'>
					<motion.button
						variants={childrenVariants}
						onClick={() => setMobileNavOpen((pv) => !pv)}
						className={`ml-2 block scale-100 text-3xl  transition-all hover:scale-105 active:scale-95 lg:hidden`}
					>
						<FiMenu />
					</motion.button>
					<Link
						href='/'
						className='w-32 ml-4 lg:ml-0'
						onClick={() => {
							setTimeout(() => {
								setMobileNavOpen(false);
							}, 300);
						}}
					>
						<h1 className='font-babeSans text-charcoal tracking-tighter text-3xl'>
							store
						</h1>
					</Link>
				</div>

				<div className='relative inline-block'>
					<GiShoppingCart
						className='text-4xl'
						onClick={() => {
							setShowCart(true);
						}}
					/>
					<span className='absolute bg-black -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold'>
						{cartCount}
					</span>
				</div>
			</div>
			<MobileLinks
				links={links}
				setMobileNavOpen={setMobileNavOpen}
				open={mobileNavOpen}
				scrolled={scrolled}
			/>
			<ShoppingCart open={showCart} onClose={() => setShowCart(false)} />
		</motion.div>
	);
};

const MobileLinks = ({ links, open, scrolled, setMobileNavOpen }) => {
	// const [ref, { height }] = useMeasure();
	const handleClick = (link) => {
		setTimeout(() => {
			setMobileNavOpen(false);
		}, 300);
	};
	return (
		<motion.div
			initial={{ height: '0px' }}
			animate={{
				height: open ? '300px' : '0px'
			}}
			exit={{
				height: '0px' // Animate back to 0px when closing
			}}
			transition={{
				duration: 1 // Apply the duration to both opening and closing
			}}
			className='block overflow-hidden border-red-800 z-30'
			// className='grid grid-cols-2 gap-6 py-6 md:hidden'
		>
			<div className='py-8 flex flex-col gap-4'>
				{links.map((l) => {
					return (
						<Link
							href={l.href}
							key={l.title}
							onClick={() => handleClick(l)}
							className='space-y-1.5'
						>
							<span
								className={`text-md block font-babeSans font-semibold  text-2xl hover:text-[#00BF63]`}
							>
								{l.title}
							</span>
						</Link>
					);
				})}
			</div>
		</motion.div>
	);
};
