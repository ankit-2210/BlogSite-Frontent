import { Link } from "react-router-dom";
import type { Post as PostType } from "../../../redux/post/types/post";

type Props = {
    post: PostType;
}

const Post = ({ post }: Props) => {
    const image = post.picture || "https://images.unsplash.com/photo-1498050108023-c5249f4df085";

    const ellipsis = (str = "", limit = 120) =>
        str.length > limit ? str.slice(0, limit) + "..." : str;

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
            <div className="relative overflow-hidden">
                <img src={image} alt="post"
                    className="h-44 w-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-medium bg-black/70 text-white rounded-full backdrop-blur">
                        {post.category}
                    </span>
                </div>
            </div>
            <div className="p-5 flex flex-col gap-2">
                <h2 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-black transition">
                    {ellipsis(post.title, 60)}
                </h2>
                <p className="text-sm text-gray-500">
                    By <span className="font-medium text-gray-700">{post.username}</span>
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {ellipsis(post.description, 140)}
                </p>
                <div className="flex items-center justify-between mt-4">
                    <Link to={`/details/${post._id}`} className="text-sm font-medium text-black hover:underline">
                        Read more →
                    </Link>
                    <span className="text-xs text-gray-400">
                        {post.createdAt
                            ? new Date(post.createdAt).toDateString()
                            : ""}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Post;