import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { sendContact, resetContact } from "../../redux/contact/contactSlice";
import toast from "react-hot-toast";

type ContactForm = {
    name: string;
    email: string;
    phone: string;
    messages: string;
};

const ContactView = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { isAuthenticated, user } = useAppSelector((state) => state.auth);
    const { loading, error, success } = useAppSelector((state) => state.contact);

    const [form, setForm] = useState<ContactForm>({
        name: "",
        email: "",
        phone: "",
        messages: "",
    });

    useEffect(() => {
        if (user) {
            setForm((prev) => {
                if (prev.name === user.name && prev.email === user.username) return prev;
                return {
                    ...prev,
                    name: user.name || "",
                    email: user.email || "",
                };
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        dispatch(sendContact(form));
    };

    useEffect(() => {
        if (success) {
            toast.success("Message sent successfully ✨");
            setForm({
                name: "",
                email: "",
                phone: "",
                messages: "",
            });

            dispatch(resetContact());
            navigate("/");
        }

        if (error) {
            toast.error(error);
            dispatch(resetContact());
        }
    }, [success, error, dispatch, navigate]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-6 pt-24 text-center">
                <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
                    Get in Touch
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Have something to say? I’d love to hear from you.
                </p>
            </div>
            <div className="max-w-3xl mx-auto px-6 mt-12 mb-20">
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                                required
                            />
                        </div>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone (optional)"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                        />
                        <textarea
                            name="messages"
                            placeholder="Write your message..."
                            value={form.messages}
                            onChange={handleChange}
                            rows={5}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black resize-none"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                    </form>
                </div>
            </div>
            <div className="text-center text-gray-500 pb-10 text-sm">
                <p>📍 India • 📧 ankit.agarwal@gmail.com</p>
            </div>
        </div>
    );
};

export default ContactView;