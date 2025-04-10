export default function Home() {
	return (
		<section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-40">
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
				<h2 className="text-5xl font-extrabold leading-tight sm:text-6xl mb-6">
					Effortlessly Manage and Organize Your Events
				</h2>
				<p className="text-lg sm:text-xl mb-8">
					Transform your event planning with tools that simplify every aspect of
					managing an event, from registration to execution.
				</p>
				<span className="bg-white text-blue-700 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all hover:bg-gray-100">
					Start By Signing In
				</span>
			</div>
		</section>
	);
}
