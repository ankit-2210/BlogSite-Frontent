import { Link, useLocation } from "react-router-dom";
import { categories } from "../../constants/data";

const Categories = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    // console.log(query);
    const activeCategory = query.get("category");
    // console.log(activeCategory);

    return (
        <div className="mt-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Categories
            </h3>
            <div className="flex flex-col gap-1">
                <Link to="/"
                    className={`group flex items-center px-3 py-2 rounded-md transition relative
                    ${!activeCategory
                            ? "text-black font-medium"
                            : "text-gray-600 hover:text-black"
                        }`}>
                    <span className={`absolute left-0 top-0 h-full w-1 rounded-r transition-all
                        ${!activeCategory
                            ? "bg-black"
                            : "bg-transparent group-hover:bg-gray-300"
                        }`}
                    />
                    <span className="ml-2">All</span>
                </Link>
                {categories.map((cat) => (
                    <Link key={cat.slug} to={`/?category=${cat.slug}`}
                        className={`group flex items-center px-3 py-2 rounded-md transition relative
                        ${activeCategory === cat.slug
                                ? "text-black font-medium"
                                : "text-gray-600 hover:text-black"
                            }`}>
                        <span
                            className={`absolute left-0 top-0 h-full w-1 rounded-r transition-all
                            ${activeCategory === cat.slug
                                    ? "bg-black"
                                    : "bg-transparent group-hover:bg-gray-300"
                                }`} />
                        {cat.icon && (
                            <span className="mr-2 opacity-80">{cat.icon}</span>
                        )}
                        <span className="ml-2">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;