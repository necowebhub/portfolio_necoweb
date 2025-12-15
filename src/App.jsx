import React, { useState, useEffect } from 'react';
import { Camera, Code, Palette, Github, Linkedin, Mail, ExternalLink, X } from 'lucide-react';

// Симуляция Firebase данных (замените на реальные Firebase запросы)
const mockFirebaseData = {
    code: [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "Full-stack приложение с React и Node.js",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",
            tags: ["React", "Node.js", "MongoDB"],
            link: "https://github.com",
            demo: "https://example.com"
        },
        {
            id: 2,
            title: "AI Chat Application",
            description: "Чат-бот с использованием машинного обучения",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
            tags: ["Python", "TensorFlow", "FastAPI"],
            link: "https://github.com",
            demo: "https://example.com"
        },
        {
            id: 3,
            title: "Mobile Fitness Tracker",
            description: "React Native приложение для трекинга тренировок",
            image: "https://images.unsplash.com/photo-1461773518188-b3e86f98242f?w=800&h=600&fit=crop",
            tags: ["React Native", "Firebase", "Redux"],
            link: "https://github.com",
            demo: "https://example.com"
        }
    ],
    art: [
        {
            id: 4,
            title: "Cyberpunk City",
            description: "Цифровая иллюстрация в стиле киберпанк",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
            tags: ["Digital Art", "Procreate", "Concept Art"],
            link: null,
            demo: null
        },
        {
            id: 5,
            title: "Abstract Geometry",
            description: "Геометрические композиции и паттерны",
            image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=600&fit=crop",
            tags: ["3D", "Blender", "Abstract"],
            link: null,
            demo: null
        },
        {
            id: 6,
            title: "Character Design",
            description: "Концепт-арт персонажей для игр",
            image: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?w=800&h=600&fit=crop",
            tags: ["Character Design", "Illustration", "Game Art"],
            link: null,
            demo: null
        }
    ]
};

const ProjectCard = ({ project, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(project)}
        >
            <div className="aspect-video relative">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`} />
                
                <div className={`absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-2'}`}>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Modal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                    <img src={project.image} alt={project.title} className="w-full h-96 object-cover rounded-t-3xl" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-all"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-8">
                    <h2 className="text-4xl font-bold text-white mb-4">{project.title}</h2>
                    <p className="text-xl text-gray-300 mb-6">{project.description}</p>
                
                    <div className="flex flex-wrap gap-3 mb-6">
                        {project.tags.map((tag, i) => (
                        <span key={i} className="px-4 py-2 bg-purple-600/30 backdrop-blur-sm rounded-full text-white border border-purple-500/50">
                            {tag}
                        </span>
                        ))}
                    </div>
                
                    {(project.link || project.demo) && (
                        <div className="flex gap-4">
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition-all"
                                >
                                    <Github size={20} />
                                    View Code
                                </a>
                            )}
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-all"
                                >
                                    <ExternalLink size={20} />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function Portfolio() {
    const [activeTab, setActiveTab] = useState('code');
    const [projects, setProjects] = useState({ code: [], art: [] });
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Симуляция загрузки из Firebase
        // Замените это на реальный код Firebase:
        // const fetchProjects = async () => {
        //   const db = getFirestore();
        //   const codeSnapshot = await getDocs(collection(db, 'code'));
        //   const artSnapshot = await getDocs(collection(db, 'art'));
        //   setProjects({
        //     code: codeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        //     art: artSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        //   });
        // };
        
        setTimeout(() => {
            setProjects(mockFirebaseData);
            setLoading(false);
        }, 1000);
    }, []);

    const currentProjects = projects[activeTab] || [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white">
            {/* Hero Section */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 animate-pulse" />
                    <div className="container mx-auto px-6 py-20 relative z-10">
                        <div className="text-center">
                            <div className="inline-block p-4 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-6 animate-bounce">
                                <Camera size={48} />
                            </div>
                            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                Ваше Имя
                            </h1>
                            <p className="text-2xl text-gray-300 mb-8">Developer & Digital Artist</p>
                            <div className="flex justify-center gap-6">
                                <a href="https://github.com" className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110">
                                    <Github size={24} />
                                </a>
                                <a href="https://linkedin.com" className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110">
                                    <Linkedin size={24} />
                                </a>
                                <a href="mailto:email@example.com" className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all hover:scale-110">
                                    <Mail size={24} />
                                </a>
                            </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="sticky top-0 z-40 bg-black/50 backdrop-blur-xl border-b border-white/10">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center gap-4 py-6">
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 ${
                                activeTab === 'code'
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50'
                                : 'bg-white/10 hover:bg-white/20'
                            }`}
                        >
                            <Code size={24} />
                            Code Projects
                        </button>
                        <button
                            onClick={() => setActiveTab('art')}
                            className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 ${
                                activeTab === 'art'
                                ? 'bg-gradient-to-r from-pink-600 to-purple-600 shadow-lg shadow-pink-500/50'
                                : 'bg-white/10 hover:bg-white/20'
                            }`}
                        >
                            <Palette size={24} />
                            Art Gallery
                        </button>
                    </div>
                </div>
            </nav>

            {/* Projects Grid */}
            <main className="container mx-auto px-6 py-16">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={setSelectedProject}
                            />
                        ))}
                    </div>
                )}
                
                {!loading && currentProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-400">Проекты скоро появятся...</p>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-white/10 py-8 mt-20">
                <div className="container mx-auto px-6 text-center text-gray-400">
                    <p>© 2024 Portfolio. Создано с использованием React и Firebase.</p>
                </div>
            </footer>

            {/* Modal */}
            <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
}