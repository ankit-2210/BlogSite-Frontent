import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const AboutView = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* HERO */}
            <div
                className="h-[50vh] flex items-center justify-center text-white relative"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                        About Me
                    </h1>
                    <p className="mt-4 text-lg text-gray-200 max-w-xl mx-auto">
                        Passionate Developer • Problem Solver • MERN Enthusiast
                    </p>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="bg-white shadow-xl rounded-3xl p-8 md:p-12 transition hover:shadow-2xl">

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Ankit Agarwal
                    </h2>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        I am an aspiring Software Engineer based in India. I enjoy
                        building scalable web applications using the MERN stack and
                        continuously learning new technologies.
                    </p>

                    <p className="text-gray-600 leading-relaxed mt-4 text-lg">
                        I love solving coding challenges daily and improving my
                        problem-solving skills.
                    </p>

                    {/* LINKS */}
                    <div className="mt-10 flex flex-wrap gap-6 items-center">

                        <a
                            href="https://leetcode.com/ankit_2210/"
                            target="_blank"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            LeetCode →
                        </a>

                        <a
                            href="https://www.linkedin.com/in/ankit-2210"
                            target="_blank"
                            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                        >
                            <FaLinkedin size={20} /> LinkedIn
                        </a>

                        <a
                            href="mailto:ankit.agarwal@gmail.com"
                            className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition"
                        >
                            <FaEnvelope size={20} /> Email
                        </a>

                        <a
                            href="#"
                            className="flex items-center gap-2 text-gray-700 hover:text-black transition"
                        >
                            <FaGithub size={20} /> GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutView;