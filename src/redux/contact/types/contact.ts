export interface ContactPayload {
    name: string;
    email: string;
    phone: string;
    messages: string;
}

export interface ContactState {
    loading: boolean;
    error: string | null;
    success: boolean;
}