export interface Post {
    _id: string;
    title: string;
    description: string;
    category: string;
    username: string;
    userId?: string;
    picture?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PostState {
    posts: Post[];
    total: number;
    page: number;
    pages: number;
    currentPost: Post | null;
    loading: boolean;
    error: string | null;
}