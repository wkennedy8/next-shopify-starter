import { CartContext } from '@/app/context';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useContext } from 'react';

export const ShoppingCart = ({ open, onClose }) => {
	const { cart, handleRemoveFromCart, cartCount, handleAddToCart } =
		useContext(CartContext);
	const sideDrawerVariants = {
		hidden: {
			x: '100vw' // Start off-screen to the right
		},
		visible: {
			x: 0, // Move to its default position
			transition: {
				type: 'tween',
				duration: 0.3 // Specify duration
			}
		},
		exit: {
			x: '100vw', // Exit off-screen to the right
			transition: {
				type: 'tween',
				duration: 0.3,
				delay: 0.3
			}
		}
	};
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className='fixed inset-0 bg-white z-60'
					variants={sideDrawerVariants}
					initial='hidden'
					animate='visible'
					exit='exit'
				>
					<div className='px-4 py-5 flex justify-between items-center border-b '>
						<h1 className='mt-2 text-4xl font-babeSans'>
							My Bag {`(${cartCount})`}
						</h1>
						<button
							onClick={onClose}
							className='flex flex-col items-center z-50'
						>
							<span
								className={`bg-black block transition-all duration-300 ease-out 
            h-0.5 w-6 rounded-sm ${
							open ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
						}`}
							></span>
							<span
								className={`bg-black block transition-all duration-300 ease-out 
            h-0.5 w-6 rounded-sm my-0.5 ${open ? 'opacity-0' : 'opacity-100'}`}
							></span>
							<span
								className={`bg-black block transition-all duration-300 ease-out 
            h-0.5 w-6 rounded-sm ${
							open ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
						}`}
							></span>
						</button>
					</div>
					<div className='flex flex-1 flex-col justify-between overflow-y-scroll'>
						{!cart.lines.edges.length && (
							<div className='mt-4 p-6'>
								<p>Your bag is currently empty.</p>
							</div>
						)}
						{cart.lines.edges.map((product, i) => {
							const imageUrl =
								product?.node?.merchandise?.product?.images?.edges[0]?.node.url;
							const title = product?.node?.merchandise?.product?.title;
							const description =
								product?.node?.merchandise?.product?.description;
							const quantity = product?.node?.quantity;
							const price = product?.node?.merchandise?.price?.amount;
							const lineId = product?.node?.id;
							const variantId =
								product?.node?.merchandise?.product?.variants?.edges[0]?.node
									?.id;
							// console.log(product?.node?.merchandise);
							// console.log(lineId);
							return (
								<div key={i} className='flex flex-col gap-4 p-4'>
									<div className='flex items-start justify-between gap-2 space-x-4'>
										<img src={imageUrl} className='h-1/4 w-1/4' />
										<div className='flex w-full flex-col items-start justify-start gap-4'>
											<div className='flex w-full justify-between gap-3'>
												<div>
													<p className='font-babeSans text-3xl leading-[130%]'>
														{title}
													</p>
													<p>{description}</p>
												</div>
												<p className='font-babeSans text-3xl leading-[130%]'>
													{'$' + (price * quantity).toFixed(2)}
												</p>
											</div>
											<div className='flex w-full items-center justify-between gap-4'>
												<div className='flex h-10 w-32 items-center justify-center gap-1 overflow-hidden rounded-lg border border-accent'>
													<button
														onClick={() =>
															handleRemoveFromCart(lineId, quantity)
														}
														className='group flex h-full w-full flex-1 items-center justify-center hover:bg-secondary active:bg-accent disabled:cursor-not-allowed disabled:opacity-50'
													>
														<span className=' w-2 bg-accent transition-all duration-300 group-active:bg-background'>
															-
														</span>
													</button>
													<div className='font-sans font-medium leading-[150%] text-body-base  flex-1 text-center'>
														{quantity}
													</div>
													<button
														onClick={() => handleAddToCart(variantId)}
														className='group flex h-full w-full flex-1 items-center justify-center hover:bg-secondary active:bg-accent disabled:cursor-not-allowed disabled:opacity-50'
													>
														<span className='w-2 bg-accent transition-all duration-300 group-active:bg-background'>
															+
														</span>
														{/* <span className='absolute left-1/2 top-1/2 h-2 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-accent transition-all duration-300 group-active:bg-background'></span> */}
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{cart.lines.edges.length ? (
						<div>
							<div className='absolute bottom-10 w-full border-t-2'>
								<div className='flex justify-between items-center p-4'>
									<p className='font-babeSans font-bold text-2xl'>subtotal</p>
									<p className='text-2xl font-babeSans font-bold'>
										{'$' + (cart?.cost.subtotalAmount.amount * 1).toFixed(2)}
									</p>
								</div>
								<div className='flex justify-center'>
									<button className='font-babeSans mt-8 px-8 py-4 border rounded-full text-center text-3xl'>
										{/* <Link href={cart?.checkoutUrl}>proceed to checkout</Link> */}
										proceed to checkout
									</button>
								</div>
							</div>
						</div>
					) : null}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
