export interface User {
    _id: string;
    username: string;
    email: string;
    name: string;
}

export interface AuthResponse {
    message: string;
    user: User;
    token: string;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}