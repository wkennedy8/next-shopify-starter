import { getProducts } from '@/app/lib/shopify';
import Link from 'next/link';

const Page = async () => {
	const products = await getProducts();

	return (
		<div className='mt-24 p-6'>
			<h1 className='text-5xl font-babeSans font-normal leading-[120%] text-pretty tracking-[-1.12px]'>
				Shop all products
			</h1>
			<div className='grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-3'>
				{products.map((product) => {
					return (
						<Link key={product.id} href={`/products/${product.id}`}>
							<div className='py-6'>
								<img
									src={product.image}
									className='rounded-2xl object-contain'
								/>
								<p className='font-babeSans text-2xl mt-4 text-center'>
									{product.title}
								</p>
								<p className='text-center'>from ${product.price.toFixed(2)}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default Page;
