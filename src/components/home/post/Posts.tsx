import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchPosts } from "../../../redux/post/postSlice";
import Post from "./Post";

const Posts = () => {
    const dispatch = useAppDispatch();
    const { search } = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(search);

    const category = params.get("category");
    const page = Number(params.get("page")) || 1;

    const { posts, loading, pages } = useAppSelector((state) => state.posts);
    console.log(posts);

    useEffect(() => {
        dispatch(fetchPosts({
            category: category || undefined,
            page
        }));
    }, [dispatch, category, page]);


    if (loading) {
        return <p className="text-center py-10 text-gray-500">Loading posts...</p>;
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                    No posts available
                </h2>
                <p className="text-gray-500 mt-2 text-sm">
                    Be the first to create a post in this category.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
                    Latest Posts
                </h2>
                <span className="text-sm text-gray-400">
                    Page {page} of {pages}
                </span>
            </div>

            {/* POSTS GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>


            <div className="flex items-center justify-center gap-2 flex-wrap pt-6">
                <button
                    disabled={page === 1}
                    onClick={() => {
                        const query = new URLSearchParams();
                        if (category)
                            query.set("category", category);
                        query.set("page", String(page - 1));
                        navigate(`/?${query.toString()}`);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition
                    ${page === 1
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-white border border-gray-200 hover:bg-gray-100"
                        }`}
                >
                    ← Prev
                </button>

                {Array.from({ length: pages }, (_, i) => i + 1)
                    .slice(Math.max(0, page - 3), page + 2)
                    .map((p) => (
                        <button
                            key={p}
                            onClick={() => {
                                const query = new URLSearchParams();
                                if (category)
                                    query.set("category", category);
                                query.set("page", String(p));
                                navigate(`/?${query.toString()}`);
                            }}
                            className={`w-10 h-10 rounded-full text-sm font-medium transition
                            ${p === page
                                    ? "bg-black text-white shadow-md"
                                    : "bg-white border border-gray-200 hover:bg-gray-100"
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                <button
                    disabled={page === pages}
                    onClick={() => {
                        const query = new URLSearchParams();
                        if (category) query.set("category", category);
                        query.set("page", String(page + 1));
                        navigate(`/?${query.toString()}`);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition
                    ${page === pages
                            ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                            : "bg-white border border-gray-200 hover:bg-gray-100"
                        }`}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default Posts;