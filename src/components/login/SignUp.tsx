import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { signup } from "../../redux/auth/authSlice";
import { store } from "../../redux/store";
import toast from "react-hot-toast";


type SignupForm = {
    name: string;
    email: string;
    username: string;
    password: string;
    cpassword: string;
};

const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { loading, error } = useAppSelector((state) => state.auth);
    const authState = useAppSelector((state) => state.auth);
    console.log(authState);
    console.log(store.getState());

    const [form, setForm] = useState<SignupForm>({
        name: "",
        email: "",
        username: "",
        password: "",
        cpassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.cpassword) {
            alert("Passwords do not match");
            return;
        }
        const result = await dispatch(signup(form));
        if (signup.fulfilled.match(result)) {
            toast.success("Account created successfully 🚀");
            navigate("/login");
        }
        else {
            toast.error(result.payload as string || "Signup failed ❌");
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden md:flex w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                    alt="signup"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-12 text-white">
                    <h1 className="text-4xl font-bold mb-4">Join Our Blog ✨</h1>
                    <p className="text-lg opacity-90">
                        Share your thoughts, inspire others, and grow your voice.
                    </p>
                </div>
            </div>
            <div className="flex w-full md:w-1/2 items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                        Create Account
                    </h2>
                    {error && (
                        <p className="text-red-500 mb-4 text-sm">{error}</p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <input
                            type="password"
                            name="cpassword"
                            placeholder="Confirm Password"
                            value={form.cpassword}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-blue-500"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 py-2 bg-black text-white hover:bg-gray-800 transition"
                        >
                            {loading ? "Creating..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-black font-semibold cursor-pointer hover:underline">
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;