// Navigation Links
export const navLinks = [
    {
        id: 1,
        name: "Projects",
        type: "finder",
    },
    {
        id: 2,
        name: "Contact",
        type: "contact",
    },
    {
        id: 3,
        name: "Resume",
        type: "resume",
    },
]

// Navigation Icons
export const navIcons = [
    {
        id: 1,
        img: "/icons/wifi.svg",
    },
    {
        id: 2,
        img: "/icons/search.svg",
    },
    {
        id: 3,
        img: "/icons/user.svg",
    },
    {
        id: 4,
        img: "/icons/mode.svg",
    },
]

// Dock Applications
export const dockApps = [
    {
        id: "finder",
        name: "Projects",
        icon: "finder.png",
        canOpen: true,
    },
    {
        id: "safari",
        name: "Articles",
        icon: "safari.png",
        canOpen: true,
    },
    {
        id: "photos",
        name: "Gallery",
        icon: "photos.png",
        canOpen: true,
    },
    {
        id: "contact",
        name: "Contact",
        icon: "contact.png",
        canOpen: true,
    },
    {
        id: "terminal",
        name: "Skills",
        icon: "terminal.png",
        canOpen: true,
    },
    {
        id: "trash",
        name: "Trash",
        icon: "trash.png",
        canOpen: true,
    },
]

// Blog Posts / Articles
export const blogPosts = [
    {
        id: 1,
        date: "Jan 2, 2026",
        title: "Building Modern Web Applications with React and Next.js",
        image: "/images/blog1.png",
        link: "#",
    },
    {
        id: 2,
        date: "Dec 15, 2025",
        title: "Mastering TypeScript: A Complete Guide for Developers",
        image: "/images/blog2.png",
        link: "#",
    },
    {
        id: 3,
        date: "Nov 28, 2025",
        title: "CSS Tips and Tricks for Better UI Design",
        image: "/images/blog3.png",
        link: "#",
    },
]

// Tech Stack / Skills
export const techStack = [
    {
        category: "Frontend",
        items: ["React.js", "Next.js", "TypeScript", "Vue.js"],
    },
    {
        category: "Mobile",
        items: ["React Native", "Expo", "Flutter"],
    },
    {
        category: "Styling",
        items: ["Tailwind CSS", "Sass", "CSS3", "Styled Components"],
    },
    {
        category: "Backend",
        items: ["Node.js", "Express", "Python", "Django"],
    },
    {
        category: "Database",
        items: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
    },
    {
        category: "Dev Tools",
        items: ["Git", "GitHub", "Docker", "VS Code"],
    },
]

// Social Links
export const socials = [
    {
        id: 1,
        text: "Github",
        icon: "/icons/github.svg",
        bg: "#333",
        link: "https://github.com/abubokkor-cse",
    },
    {
        id: 2,
        text: "LinkedIn",
        icon: "/icons/linkedin.svg",
        bg: "#0077B5",
        link: "https://www.linkedin.com/",
    },
    {
        id: 3,
        text: "YouTube",
        icon: "/icons/youtube.svg",
        bg: "#FF0000",
        link: "https://www.youtube.com/@AICodeHelper",
    },
    {
        id: 4,
        text: "Facebook",
        icon: "/icons/facebook.svg",
        bg: "#1877F2",
        link: "https://www.facebook.com/aicodehelper",
    },
]

// Photos Sidebar Links
export const photosLinks = [
    {
        id: 1,
        icon: "/icons/gicon1.svg",
        title: "Library",
    },
    {
        id: 2,
        icon: "/icons/gicon2.svg",
        title: "Memories",
    },
    {
        id: 3,
        icon: "/icons/file.svg",
        title: "Places",
    },
    {
        id: 4,
        icon: "/icons/gicon4.svg",
        title: "People",
    },
    {
        id: 5,
        icon: "/icons/gicon5.svg",
        title: "Favorites",
    },
]

// Gallery Images
export const gallery = [
    {
        id: 1,
        img: "/images/20251228_124406.png",
    },
    {
        id: 2,
        img: "/images/IMG_1305.JPG",
    },
    {
        id: 3,
        img: "/images/IMG-20251024-WA0160.jpg",
    },
    {
        id: 4,
        img: "/images/IMG-20251024-WA0219.jpg",
    },
]

// Finder Locations
const WORK_LOCATION = {
    id: 1,
    type: "work",
    name: "Work",
    icon: "/icons/work.svg",
    kind: "folder",
    children: [
        // Project 1
        {
            id: 1,
            name: "E-Commerce Website",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-10 left-5",
            windowPosition: "top-[5vh] left-5",
            children: [
                {
                    id: 1,
                    name: "Project Details.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "A modern e-commerce platform built with Next.js and Tailwind CSS.",
                        "Features include product catalog, shopping cart, user authentication, and payment integration.",
                        "Responsive design with smooth animations and fast performance.",
                        "Built with best practices for SEO and accessibility.",
                    ],
                },
                {
                    id: 2,
                    name: "demo.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://github.com/yourusername",
                    position: "top-10 right-20",
                },
                {
                    id: 3,
                    name: "screenshot.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-1.png",
                },
            ],
        },

        // Project 2
        {
            id: 2,
            name: "AI Dashboard App",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-52 left-5",
            windowPosition: "top-[20vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Project Details.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 right-10",
                    description: [
                        "An AI-powered analytics dashboard for data visualization.",
                        "Integrates with machine learning APIs for intelligent insights.",
                        "Real-time data updates and interactive charts.",
                        "Built with React, D3.js, and Python backend.",
                    ],
                },
                {
                    id: 2,
                    name: "live-demo.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://github.com/yourusername",
                    position: "top-20 left-20",
                },
                {
                    id: 3,
                    name: "preview.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 left-80",
                    imageUrl: "/images/project-2.png",
                },
            ],
        },

        // Project 3
        {
            id: 3,
            name: "Mobile App",
            icon: "/images/folder.png",
            kind: "folder",
            position: "top-[22rem] left-5",
            windowPosition: "top-[33vh] left-7",
            children: [
                {
                    id: 1,
                    name: "Project Details.txt",
                    icon: "/images/txt.png",
                    kind: "file",
                    fileType: "txt",
                    position: "top-5 left-10",
                    description: [
                        "A cross-platform mobile application built with React Native.",
                        "Available on both iOS and Android platforms.",
                        "Features smooth animations and native feel.",
                        "Integrated with cloud services for real-time sync.",
                    ],
                },
                {
                    id: 2,
                    name: "app-store.com",
                    icon: "/images/safari.png",
                    kind: "file",
                    fileType: "url",
                    href: "https://github.com/yourusername",
                    position: "top-10 right-20",
                },
                {
                    id: 3,
                    name: "app-preview.png",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    position: "top-52 right-80",
                    imageUrl: "/images/project-3.png",
                },
            ],
        },
    ],
}

const ABOUT_LOCATION = {
    id: 2,
    type: "about",
    name: "About me",
    icon: "/icons/info.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "profile.png",
            icon: "/images/image.png",
            kind: "file",
            fileType: "img",
            position: "top-10 left-5",
            imageUrl: "/images/profile.jpg",
        },
        {
            id: 2,
            name: "about-me.txt",
            icon: "/images/txt.png",
            kind: "file",
            fileType: "txt",
            position: "top-60 left-5",
            subtitle: "Meet the Developer",
            image: "/images/profile.jpg",
            description: [
                "Hey! I'm Abu Bokkor 👋, a passionate web developer who loves building sleek, interactive websites.",
                "I specialize in JavaScript, React, and Next.js—creating fast and delightful user experiences.",
                "I'm big on clean UI, good UX, and writing maintainable code.",
                "When I'm not coding, you'll find me exploring new technologies, learning, and building side projects.",
            ],
        },
    ],
}

const RESUME_LOCATION = {
    id: 3,
    type: "resume",
    name: "Resume",
    icon: "/icons/file.svg",
    kind: "folder",
    children: [
        {
            id: 1,
            name: "Resume.pdf",
            icon: "/images/pdf.png",
            kind: "file",
            fileType: "pdf",
        },
    ],
}

const TRASH_LOCATION = {
    id: 4,
    type: "trash",
    name: "Trash",
    icon: "/icons/trash.svg",
    kind: "folder",
    children: [],
}

export const locations = {
    work: WORK_LOCATION,
    about: ABOUT_LOCATION,
    resume: RESUME_LOCATION,
    trash: TRASH_LOCATION,
}

// Window Configuration
export const INITIAL_Z_INDEX = 1000

export const WINDOW_CONFIG = {
    finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    trash: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
    infowindow: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
}
