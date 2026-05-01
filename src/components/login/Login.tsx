import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/auth/authSlice";
import toast from "react-hot-toast";

type LoginForm = {
    username: string;
    password: string;
};

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { loading, error } = useAppSelector((state) => state.auth);
    const [form, setForm] = useState<LoginForm>({
        username: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(login(form));
        if (login.fulfilled.match(result)) {
            toast.success("Login successful 🎉");
            navigate("/");
        }
        else {
            toast.error(result.payload as string || "Login failed ❌");
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden md:flex w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                    alt="login"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-12 text-white">
                    <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
                    <p className="text-lg opacity-90">
                        Continue your journey. Share stories that matter.
                    </p>
                </div>
            </div>
            <div className="flex w-full md:w-1/2 items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">
                        Login
                    </h2>
                    {error && (
                        <p className="text-red-500 mb-4 text-sm">{error}</p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={form.username}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 py-2 bg-black text-white hover:bg-gray-800 transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-6">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-black font-semibold cursor-pointer hover:underline"
                        >
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;