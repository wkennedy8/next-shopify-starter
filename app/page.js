import { Featured } from './components/Featured';
import { Hero } from './components/Hero';
import ScrollingTestimonials from './components/Testimonials';

export default function Home() {
	return (
		<div className=''>
			<Hero />
			<Featured />
			<ScrollingTestimonials />
		</div>
	);
}
