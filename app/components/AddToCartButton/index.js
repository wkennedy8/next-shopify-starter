'use client';
import { useContext } from 'react';
import { CartContext } from '@/app/context';
// import { addToCart, getOrCreateCart } from '@/lib/shopify';

export const AddToCartButton = ({ text, variantId }) => {
	const { handleAddToCart, loading } = useContext(CartContext);

	return (
		<button
			className='font-babeSans mt-8 px-8 py-4 border rounded-full text-center text-3xl'
			onClick={() => handleAddToCart(variantId)}
		>
			{loading ? 'adding....' : 'add to cart'}
		</button>
	);
};
