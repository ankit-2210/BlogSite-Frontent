
const Banner = () => {
    return (
        <div
            className="relative h-[60vh] w-full flex items-center justify-center text-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1498050108023-c5249f4df085)",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                    Welcome to Your Blog
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-200">
                    Share your thoughts, ideas, and stories with the world. A modern space
                    for creators.
                </p>
                <div className="mt-6">
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-full text-white shadow-lg">
                        Start Reading
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;