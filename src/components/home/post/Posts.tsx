import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchPosts } from "../../../redux/post/postSlice";
import Post from "./Post";

const Posts = () => {
    const dispatch = useAppDispatch();
    const { search } = useLocation();

    const { posts, loading } = useAppSelector((state) => state.post);
    // console.log(posts);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchPosts(search));
        }, 100);
        return () => clearTimeout(timer);
    }, [dispatch, search]);

    if (loading) {
        return <p className="text-center py-10 text-gray-500">Loading posts...</p>;
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
};

export default Posts;