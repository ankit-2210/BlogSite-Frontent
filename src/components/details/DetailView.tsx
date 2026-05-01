import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPost, deletePost } from "../../redux/post/postSlice";
import Swal from "sweetalert2";
import Comments from "./comments/Comments";

const DetailView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { currentPost: post, loading } = useAppSelector((state) => state.post);
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!id) return;
        dispatch(fetchPost(id));
    }, [id, dispatch]);

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Delete post?",
            text: "This cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
        });

        if (!result.isConfirmed)
            return;
        const res = await dispatch(deletePost(id!));
        if (deletePost.fulfilled.match(res)) {
            Swal.fire("Deleted", "Post removed", "success");
            navigate("/");
        }
        else {
            Swal.fire("Error", "Failed to delete", "error");
        }
    };

    if (loading || !post) {
        return <div className="text-center mt-20">Loading...</div>;
    }

    const image = post.picture || "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b";
    return (
        <div className="min-h-screen bg-gray-50 pt-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="relative group">
                    <img
                        src={image}
                        alt="post"
                        className="w-full h-[350px] object-cover rounded-2xl shadow-md"
                    />
                </div>
                {user?.username === post.username && (
                    <div className="flex justify-end gap-3 mt-4">
                        <Link to={`/update/${post._id}`}>
                            <button className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm">
                                Edit
                            </button>
                        </Link>
                        <button onClick={handleDelete}
                            className="px-5 py-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 text-sm">
                            Delete
                        </button>
                    </div>
                )}
                <div className="mt-6">
                    <span className="text-sm text-gray-500">
                        {post.category}
                    </span>
                </div>
                <h1 className="mt-2 text-4xl font-bold text-gray-900">
                    {post.title}
                </h1>
                <div className="flex justify-between mt-3 text-sm text-gray-500">
                    <Link to={`/?username=${post.username}`}>
                        <span className="font-medium text-gray-700">
                            {post.username}
                        </span>
                    </Link>
                    <span>
                        {post.createdAt
                            ? new Date(post.createdAt).toDateString()
                            : ""}
                    </span>
                </div>
                <div className="mt-8 text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    {post.description}
                </div>
            </div>

            <Comments postId={post._id} />
        </div>
    );
};

export default DetailView;