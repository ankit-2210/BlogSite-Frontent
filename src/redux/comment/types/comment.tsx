export interface Comment {
    _id: string;
    postId: string;
    username: string;
    text: string;
    createdAt?: string;
}

export interface CommentState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
}