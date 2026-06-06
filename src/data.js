export const featured = [
  {
    id: "snipernet",
    title: "SniperNet Vision AI",
    tags: ["AI & Vision", "Python"],
    stack: "Python, OpenCV, CNNs",
    desc: "An AI-driven automation script built for a Roblox fishing minigame, utilizing object detection and a storage-optimized Int8 quantized CNN.",
    link: "https://github.com/37xWy/SniperNet-Vision-AI",
    hasCaseStudy: true,
    isTransparent: true,
    imagePath: "/images/snipernet.webp", 
    from: "#e0e7ff", to: "#dbeafe",
    caseStudyData: {
      overview: "SniperNet is a practical application of computer vision designed to fully automate a fishing minigame in Roblox. The goal was to build a system that could 'see' the screen, recognize specific in-game visual cues, and execute the correct timing and key presses autonomously.",
      challenge: "The primary technical challenge was managing model size and inference speed. Standard object detection models were too heavy and took up too much storage for a lightweight script running alongside a game.",
      solution: "I integrated an Int8 quantized Convolutional Neural Network (CNN). By quantizing the model, I drastically compressed its storage footprint while maintaining enough accuracy to successfully identify the fishing bobber and trigger the automated UI interactions via Python.",
      mediaType: "video",
      mediaUrl: "/images/snipernet-demo.mp4" 
    }
  },
  {
    id: "valorant-notifier",
    title: "Valorant Match Notifier",
    tags: ["Automation", "API"],
    stack: "Python, Webhooks",
    desc: "A lightweight utility that monitors the local Riot Client API to detect queue states and dispatches real-time Discord webhook notifications.",
    link: "https://github.com/37xWy/Valorant-Match-Notifier", 
    hasCaseStudy: false,
    isTransparent: true,
    imagePath: "/images/valorant.webp",
    from: "#fce7f3", to: "#fbcfe8"
  },
  {
    id: "gacha-hub",
    title: "Gacha Pity Hub",
    tags: ["Utilities", "Web"],
    stack: "HTML, CSS, JS",
    desc: "A centralized hub and toolset designed for tracking pity systems and managing statistics across multiple gacha games.",
    link: "https://github.com/37xWy/gacha-hub",
    liveLink: "https://37xWy.github.io/gacha-hub",
    hasCaseStudy: false,
    isTransparent: true,
    imagePath: "/images/gacha.webp",
    from: "#e0f2fe", to: "#bae6fd"
  },
  {
    id: "fitness-system",
    title: "Fitness Management System",
    tags: ["Full-Stack", "Capstone"],
    stack: "PHP",
    desc: "A comprehensive capstone project featuring personalized diet plans, user tracking functionalities, and database management.",
    link: "https://github.com/37xWy/Capstone-Project",
    hasCaseStudy: false,
    isTransparent: true,
    imagePath: "/images/capstone.webp",
    from: "#fef3c7", to: "#fde68a"
  },
  {
    id: "airport-sim",
    title: "Concurrent Airport Sim",
    tags: ["Systems", "Java"],
    stack: "Java Concurrency",
    desc: "A multi-threaded airport simulation managing aircraft traffic, gate allocations, and emergency landings. Focuses heavily on thread safety.",
    link: "https://github.com/37xWy/Concurrent-Airport-Simulation", 
    hasCaseStudy: false,
    isTransparent: true,
    imagePath: "/images/ccp.webp",
    from: "#fce7f3", to: "#fbcfe8"
  },
  {
    id: "cafe-pos",
    title: "Cafe POS",
    tags: ["Systems", "Assembly"],
    stack: "Assembly Language",
    desc: "A low-level text-based transaction handler that processes sales, receipts, and admin controls, applying low-level logic to memory management.",
    link: "https://github.com/37xWy/cafe-pos-assembly", 
    hasCaseStudy: false,
    isTransparent: true,
    imagePath: "/images/pos.webp",
    from: "#e0f2fe", to: "#bae6fd"
  }
];