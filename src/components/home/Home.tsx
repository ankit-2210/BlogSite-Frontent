import Banner from "./Banner";
import Categories from "./Categories";
import Posts from "./post/Posts";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <Banner />
            {/* Main Layout */}
            <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-2xl shadow p-4 sticky top-24">
                        <Categories />
                    </div>
                </div>
                {/* Posts Section */}
                <div className="md:col-span-3">
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Latest Posts
                        </h2>
                        {/* RIGHT BUTTON */}
                        <Link to="/create">
                            <button className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-800 transition shadow-md">
                                + Create Post
                            </button>
                        </Link>
                    </div>

                    {/* POSTS */}
                    <div className="bg-white rounded-2xl shadow p-6">
                        <Posts />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;