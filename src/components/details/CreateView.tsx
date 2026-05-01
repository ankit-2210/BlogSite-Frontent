import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createPost } from "../../redux/post/postSlice";
import { uploadImage, resetImage } from "../../redux/file/imageSlice";
import Swal from "sweetalert2";

const CreateView = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { user, isAuthenticated } = useAppSelector((state) => state.auth);
    const { loading: postLoading } = useAppSelector((state) => state.post);
    const { imageUrl, loading: imageLoading } = useAppSelector(
        (state) => state.image
    );

    const [post, setPost] = useState({
        title: "",
        description: "",
        picture: "",
        category: "",
    });

    const defaultImg = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b";

    const imagePreview = post.picture || defaultImg;
    useEffect(() => {
        if (imageUrl) {
            setPost((prev) => ({
                ...prev,
                picture: imageUrl,
            }));
        }
    }, [imageUrl]);

    const handleChange = (e: React.ChangeEvent<any>) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        if (!file.type.startsWith("image/")) {
            Swal.fire("Invalid File", "Only images allowed", "error");
            return;
        }
        console.log(file);

        const formData = new FormData();
        formData.append("file", file);
        dispatch(uploadImage(formData));
    };

    const handleSubmit = async () => {
        if (!post.title || !post.description || !post.category) {
            Swal.fire("Missing Fields", "Please fill all required fields", "warning");
            return;
        }
        if (!isAuthenticated) {
            Swal.fire({
                title: "Login Required",
                text: "Please login to publish a post",
                icon: "warning",
            });
            navigate("/login");
            return;
        }
        if (imageLoading) {
            Swal.fire("Wait", "Image is still uploading...", "info");
            return;
        }
        const result = await Swal.fire({
            title: "Publish Blog?",
            text: "Are you sure you want to publish this post?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#000",
            cancelButtonColor: "#aaa",
            confirmButtonText: "Yes, publish it!",
        });
        if (!result.isConfirmed)
            return;
        try {
            const res = await dispatch(createPost({ ...post, username: user?.username, }));
            if (createPost.fulfilled.match(res)) {
                await Swal.fire({
                    title: "Published 🎉",
                    text: "Your blog is live now!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                });
                dispatch(resetImage());
                navigate("/");
            }
            else {
                Swal.fire(
                    "Error",
                    res.payload || "Failed to publish post",
                    "error"
                );
            }
        }
        catch {
            Swal.fire("Error", "Something went wrong", "error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="relative group">
                    <img
                        src={imagePreview}
                        alt="preview"
                        className="w-full h-[350px] object-cover rounded-2xl shadow-md"
                    />

                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition cursor-pointer rounded-2xl">
                        <span className="text-white text-lg font-medium">
                            Change Cover
                        </span>
                        <input type="file" hidden onChange={handleFileChange} />
                    </label>
                </div>
                <select
                    name="category"
                    onChange={handleChange}
                    className="mt-6 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                >
                    <option value="">Choose category...</option>
                    <option value="Music">Music</option>
                    <option value="Movies">Movies</option>
                    <option value="Sports">Sports</option>
                    <option value="Tech">Tech</option>
                    <option value="Fashion">Fashion</option>
                </select>
                <input
                    type="text"
                    name="title"
                    placeholder="Write your title..."
                    onChange={handleChange}
                    className="mt-6 w-full text-4xl font-bold bg-transparent outline-none placeholder-gray-400"
                />
                <textarea
                    name="description"
                    placeholder="Tell your story..."
                    onChange={handleChange}
                    rows={10}
                    className="mt-6 w-full text-lg bg-transparent outline-none placeholder-gray-400 resize-none"
                />
                {imageLoading && (
                    <p className="text-sm text-gray-500 mt-2">
                        Uploading image...
                    </p>
                )}
                <div className="flex justify-end mt-8">
                    <button
                        onClick={handleSubmit}
                        disabled={postLoading}
                        className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
                    >
                        {postLoading ? "Publishing..." : "Publish"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateView;