import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Comment from "./Comment";
import Swal from "sweetalert2";
import { fetchComments, addComment, deleteComment } from "../../../redux/comment/commentSlice";
import type { Comment as CommentType } from "../../../redux/comment/types/comment";

type Props = {
    postId: string
};

const Comments = ({ postId }: Props) => {
    const dispatch = useAppDispatch();

    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { comments } = useAppSelector((state) => state.comment);

    const [text, setText] = useState("");

    useEffect(() => {
        if (postId) {
            dispatch(fetchComments(postId));
        }
    }, [postId, dispatch]);

    const handleSubmit = () => {
        if (!text.trim()) {
            Swal.fire("Empty", "Write something first", "warning");
            return;
        }

        dispatch(addComment({
            postId,
            text,
            username: user?.username || "guest"
        }));

        setText("");
    };

    const handleDelete = async (id: string) => {
        // console.log(id);
        const result = await Swal.fire({
            title: "Delete comment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
        });

        if (!result.isConfirmed)
            return;
        dispatch(deleteComment({
            id,
            username: user?.username || "guest"
        }));
    };

    return (
        <div className="mt-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Comments
            </h3>
            {isAuthenticated ? (
                <div className="flex gap-3 mb-8">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a comment..."
                        className="flex-1 border-b border-gray-300 py-2 focus:outline-none focus:border-black text-sm"
                    />
                    <button onClick={handleSubmit}
                        className="px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-800 transition">
                        Post
                    </button>
                </div>
            ) : (
                <p className="text-sm text-gray-500 mb-6">
                    Login to comment
                </p>
            )}

            <div className="space-y-5">
                {comments?.length === 0 && (
                    <p className="text-sm text-gray-400">
                        No comments yet
                    </p>
                )}

                {comments?.map((c: CommentType) => (
                    <Comment
                        key={c._id}
                        comment={c}
                        currentUser={user?.username}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default Comments;