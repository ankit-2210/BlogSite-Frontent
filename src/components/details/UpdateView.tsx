import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { uploadImage, resetImage } from '../../redux/file/imageSlice';
import { fetchPost } from '../../redux/post/postSlice';
import Swal from "sweetalert2";
import { updatePost } from '../../redux/post/postSlice';

const UpdateView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { currentPost: postData, loading } = useAppSelector((state) => state.post);
    const { imageUrl, loading: imageLoading } = useAppSelector((state) => state.image);

    const [post, setPost] = useState({
        title: "",
        description: "",
        picture: "",
        category: "",
    });

    const defaultImg = "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b";
    useEffect(() => {
        if (!id)
            return;
        dispatch(fetchPost(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (postData) {
            setPost({
                title: postData.title || "",
                description: postData.description || "",
                picture: postData.picture || "",
                category: postData.category || "",
            });
        }
    }, [postData]);

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
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            Swal.fire("Invalid File", "Only images allowed", "error");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        dispatch(uploadImage(formData));
    };

    const handleSubmit = async () => {
        if (!post.title || !post.description || !post.category) {
            Swal.fire("Missing Fields", "Fill all required fields", "warning");
            return;
        }

        if (imageLoading) {
            Swal.fire("Wait", "Image uploading...", "info");
            return;
        }

        const result = await Swal.fire({
            title: "Update Post?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#000",
        });

        if (!result.isConfirmed)
            return;

        const res = await dispatch(updatePost({
            id: id!,
            data: post,
        }));

        if (updatePost.fulfilled.match(res)) {
            await Swal.fire({
                title: "Updated 🎉",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });

            dispatch(resetImage());
            navigate(`/details/${id}`);
        }
        else {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    const imagePreview = post.picture || defaultImg;

    if (loading) {
        return <div className="text-center mt-20">Loading...</div>;
    }

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
                        <span className="text-white text-lg">
                            Change Cover
                        </span>
                        <input
                            type="file"
                            hidden
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <select
                    name="category"
                    value={post.category}
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
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Edit title..."
                    className="mt-6 w-full text-4xl font-bold bg-transparent outline-none"
                />
                <textarea
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                    rows={10}
                    placeholder="Edit your story..."
                    className="mt-6 w-full text-lg bg-transparent outline-none resize-none"
                />
                {imageLoading && (
                    <p className="text-sm text-gray-500 mt-2">
                        Uploading image...
                    </p>
                )}
                <div className="flex justify-end mt-8">
                    <button
                        onClick={handleSubmit}
                        className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateView;