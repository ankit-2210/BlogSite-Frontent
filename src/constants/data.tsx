type Category = {
    name: string;
    slug: string;
    icon?: string;
};

export const categories: Category[] = [
    { name: "Music", slug: "music", icon: "🎵" },
    { name: "Movies", slug: "movies", icon: "🎬" },
    { name: "Sports", slug: "sports", icon: "🏆" },
    { name: "Tech", slug: "tech", icon: "💻" },
    { name: "Fashion", slug: "fashion", icon: "👗" },
];