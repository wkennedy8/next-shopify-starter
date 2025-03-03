'use client';
import {
	getOrCreateCart,
	getCart,
	addToCart,
	removeFromCart
} from '@/app/lib/shopify';
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [showCart, setShowCart] = useState(false);
	const [cart, setCart] = useState(null);
	const [cartCount, setCartCount] = useState(0);

	// Fetch or create the cart and persist its data
	const fetchCart = async () => {
		const cartId = await getOrCreateCart();
		const cartData = await getCart(cartId);
		setCart(cartData);
		setCartCount(cartData.totalQuantity);
	};

	useEffect(() => {
		fetchCart();
	}, []);

	// Function to add items to the cart and update state
	const handleAddToCart = async (variantId, quantity = 1) => {
		if (!cart) return;
		try {
			setLoading(true);
			const updatedCart = await addToCart(cart.id, variantId, quantity);
			fetchCart();
		} catch (error) {
			console.log(`Error adding to cart: ${error}`);
		} finally {
			setLoading(false);
		}
	};

	// Function to remove items from the cart and update state
	const handleRemoveFromCart = async (lineId, currentQuantity) => {
		if (!cart) return;
		try {
			const updatedCart = await removeFromCart(
				cart.id,
				lineId,
				currentQuantity
			);
			fetchCart();
		} catch (error) {
			console.log(`Error removing item from cart: ${error}`);
		}
	};

	return (
		<CartContext.Provider
			value={{
				showCart,
				setShowCart,
				cart,
				setCart,
				loading,
				setLoading,
				handleAddToCart,
				handleRemoveFromCart,
				cartCount
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
