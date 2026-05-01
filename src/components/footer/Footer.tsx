import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            BlogSpace
                        </h2>
                        <p className="text-sm text-gray-500 mt-2 max-w-xs">
                            Share your thoughts, stories, and ideas with the world.
                        </p>
                    </div>
                    <div className="flex gap-12">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                Navigation
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><Link to="/" className="hover:text-black">Home</Link></li>
                                <li><Link to="/create" className="hover:text-black">Create</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                Categories
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>Music</li>
                                <li>Tech</li>
                                <li>Sports</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                Connect
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li>
                                    <a href="#" className="hover:text-black">GitHub</a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-black">LinkedIn</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} BlogSpace. All rights reserved.</p>
                    <div className="flex gap-6 mt-3 md:mt-0">
                        <span className="hover:text-black cursor-pointer">Privacy</span>
                        <span className="hover:text-black cursor-pointer">Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;