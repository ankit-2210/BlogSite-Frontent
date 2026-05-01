import type { Comment as CommentType } from "../../../redux/comment/types/comment";

type Props = {
    comment: CommentType;
    currentUser?: string;
    onDelete: (id: string) => void;
};

const Comment = ({ comment, currentUser, onDelete }: Props) => {
    return (
        <div className="flex justify-between items-start border-b border-gray-100 pb-4">

            <div>
                <p className="text-sm font-medium text-gray-900">
                    {comment.username}
                </p>

                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {comment.text}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                    {comment.createdAt
                        ? new Date(comment.createdAt).toDateString()
                        : ""}
                </p>
            </div>

            {currentUser === comment.username && (
                <button
                    onClick={() => onDelete(comment._id)}
                    className="text-xs text-red-500 hover:underline"
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export default Comment;