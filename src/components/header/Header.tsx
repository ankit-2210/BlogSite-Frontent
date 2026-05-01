import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logoutUser } from "../../redux/auth/authSlice";
import Swal from "sweetalert2";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { user, isAuthenticated } = useAppSelector((state) => state.auth);

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout",
        });

        if (result.isConfirmed) {
            await dispatch(logoutUser());

            Swal.fire({
                title: "Logged out!",
                text: "You have been successfully logged out.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            navigate("/login");
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold tracking-tight">
                    Blog<span className="text-gray-400">.</span>
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
                    <Link to="/" className="hover:text-black transition">
                        Home
                    </Link>
                    <Link to="/about" className="hover:text-black transition">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-black transition">
                        Contact
                    </Link>
                    {isAuthenticated ? (
                        <>
                            {/* USER NAME */}
                            <span className="text-gray-500">
                                {user?.name || user?.username}
                            </span>

                            {/* LOGOUT */}
                            <button
                                onClick={handleLogout}
                                className="px-4 py-1 border border-gray-300 rounded-full hover:bg-black hover:text-white transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-black transition">
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="px-4 py-1 bg-black text-white rounded-full hover:bg-gray-800 transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;