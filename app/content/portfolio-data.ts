export const portfolioData = {
    personal: {
        name: "Marwan ElZaher",
        title: "Frontend Developer & AI Engineer",
        tagline: "Building the future with AI, Automation, and Creative Web Solutions.",
        description: "I am a researcher and developer specializing in creating innovative solutions. Currently working at Penta-B, I bridge the gap between complex AI systems and intuitive user interfaces. From GIS plugins to autonomous agents, I build software that matters. I've successfully delivered healthcare systems like Heal-Hub to clients including Dr. Nabil Abdelmaksoud's addiction therapy hospital.",
        email: "marawanmzaher@gmail.com",
        location: "Cairo, Egypt",
        socials: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
        },
        valueProps: [
            "Innovative & Fast-Paced",
            "Quality-Driven Engineering",
            "Responsive & Adaptive",
            "R&D Focused"
        ]
    },
    skills: [
        { category: "Frontend", items: ["TypeScript", "Next.js", "React", "GIS Plugins", "Formbuilders"] },
        { category: "AI & ML", items: ["LangChain", "RAGFlow", "MCP Servers", "AI Agents", "TTS & STT"] },
        { category: "Automation", items: ["n8n", "CI/CD", "Webhooks", "GitLab Automation", "Workflow Optimization"] },
        { category: "Backend & Ops", items: ["Node.js", "Thermal Printer Integrations", "Inventory Systems", "Repo Validation"] }
    ],
    projects: [
        {
            id: "heal-hub",
            title: "Heal-Hub",
            slug: "heal-hub",
            category: "Healthcare",
            description: "A comprehensive application for addiction therapy management. Designed to streamline operations for multi-disciplinary teams including nurses, receptionists, doctors, psychiatrists, and pharmacists.",
            content: "Heal-Hub is a full-featured healthcare management system built for Dr. Nabil Abdelmaksoud's addiction therapy hospital. The application manages the entire patient journey from admission to discharge, with specialized modules for each role: nurses track vitals and medications, receptionists handle appointments and billing, doctors manage treatment plans, psychiatrists conduct assessments, and pharmacists oversee prescriptions. The system was successfully deployed and sold to Dr. Abdelmaksoud's hospital, where it continues to improve operational efficiency and patient care quality.",
            technologies: ["React", "Node.js", "Database Management", "Role-Based Access Control"],
            features: ["Multi-role dashboard", "Patient management", "Prescription tracking", "Appointment scheduling"],
            link: "#",
            github: "#",
            client: "Dr. Nabil Abdelmaksoud - Addiction Therapy Hospital"
        },
        {
            id: "pos-system",
            title: "F&B POS System",
            slug: "pos-system",
            category: "Fintech",
            description: "Integrated Point of Sale system with thermal printing, inventory management, and sales reporting.",
            content: "This Point of Sale (POS) system is engineered for the Food & Beverage industry. It integrates seamlessly with thermal printers for receipt generation and kitchen orders. The system handles real-time inventory tracking, detailed sales reporting, and automated end-of-day closing procedures, ensuring operational efficiency.",
            technologies: ["React", "Electron", "Node.js", "MongoDB", "Socket.io"],
            link: "#",
            github: "#"
        },
        {
            id: 3,
            title: "AI GIS Plugin",
            slug: "ai-gis-plugin",
            category: "AI & GIS",
            description: "LangChain-based assistant for map queries, highlighting, and drawing with voice commands.",
            content: "An innovative AI-powered plugin for GIS applications. Leveraging LangChain, it allows users to interact with maps using natural language. Features include voice-controlled map navigation (TTS/STT), intelligent querying of geospatial data, and automated highlighting and drawing on map layers.",
            technologies: ["Python", "LangChain", "OpenAI", "GIS API", "React"],
            link: "#",
            github: "#"
        },
        {
            id: 4,
            title: "GitLab Automation Suite",
            slug: "gitlab-automation",
            category: "DevOps",
            description: "Automated code review, issue tracking, and deployment pipelines using n8n and GitLab API.",
            content: "A comprehensive automation suite for GitLab repositories. It utilizes n8n workflows to trigger AI-powered code reviews on every push, validate repository structure, and update issue dashboards automatically. It also manages CI/CD pipelines via webhooks, significantly reducing manual DevOps overhead.",
            technologies: ["n8n", "GitLab API", "Docker", "Node.js", "Webhooks"],
            link: "#",
            github: "#"
        },
        {
            id: 5,
            title: "RAGFlow & MCP Servers",
            slug: "ragflow-mcp",
            category: "AI Infrastructure",
            description: "Integration of RAGFlow for document retrieval and MCP servers for agentic workflows.",
            content: "This project focuses on building advanced AI infrastructure. It integrates RAGFlow for efficient Retrieval-Augmented Generation, allowing agents to access and process vast documentation. Additionally, it implements Model Context Protocol (MCP) servers to standardize how AI agents interact with external APIs and data sources.",
            technologies: ["RAGFlow", "Python", "FastAPI", "Vector DB", "LLMs"],
            link: "#",
            github: "#"
        }
    ]
};
