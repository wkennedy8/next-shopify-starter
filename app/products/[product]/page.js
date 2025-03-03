import { ImageCarousel } from '@/app/components/ImageCarousel';
import { AddToCartButton } from '@/app/components/AddToCartButton';
import { getProduct } from '@/app/lib/shopify';

const Page = async ({ params }) => {
	const id = await params;
	const product = await getProduct(id.product);

	return (
		<div className='mt-24 p-6'>
			<ImageCarousel />
			<div className='mt-4'>
				<p className='font-babeSans text-5xl px-4'>{product.title}</p>
				<p className='text-xl px-4 leading-none'>
					from ${product.price.toFixed(2)}
				</p>
			</div>
			<AddToCartButton variantId={product.variantId} />
		</div>
	);
};

export default Page;
