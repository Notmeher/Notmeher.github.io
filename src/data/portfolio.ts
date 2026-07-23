export type WorkAchievement = {
  lead: string;
  detail: string;
};

export type WorkLink = {
  label: string;
  href: string;
};

export type RoleProject = {
  number: string;
  title: string;
  achievements: WorkAchievement[];
  technologies: string[];
  links?: WorkLink[];
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  companyHref: string;
  logo: string;
  logoAlt: string;
  logoTone: "dark" | "light";
  location?: string;
  summary: string;
  projects: RoleProject[];
};

export type PublicationCategory =
  | "Preprint"
  | "Journal"
  | "Conference"
  | "Dataset";
export type PublicationFilter = "All" | PublicationCategory;

export type Publication = {
  category: PublicationCategory;
  year: string;
  title: string;
  venue: string;
  status: string;
  publishedDate?: string;
  authors?: string[];
  href?: string;
};

export const experience: Experience[] = [
  {
    period: "Dec 2025 - Present",
    role: "Application Developer",
    company: "DEXIAN (Bangladesh) Limited",
    companyHref: "https://www.linkedin.com/company/dexiansolutions/",
    logo: "/images/dexian-logo.png",
    logoAlt: "DEXIAN logo",
    logoTone: "dark",
    summary:
      "Building agentic AI products, multi-agent development systems, and cost-aware model infrastructure for production business workflows.",
    projects: [
      {
        number: "01",
        title:
          "RFPGen: AI-Powered Government RFP Aggregation & Proposal Generation Platform",
        achievements: [
          {
            lead: "Developed a SAM.gov scraper and multi-portal aggregation pipeline",
            detail:
              "to automatically discover ServiceNow and ITSM opportunities across US federal and SLED procurement portals, with keyword-based relevance scoring and structured Excel output.",
          },
          {
            lead: "Integrated Azure Document Intelligence and GPT-4.1",
            detail:
              "to analyze RFP documents, extract structured requirements, and enable natural-language Q&A over indexed document sections stored in Azure SQL.",
          },
          {
            lead: "Developed Claude Agent SDK-powered agents",
            detail:
              "for automated company profiling and end-to-end DOCX and PPTX proposal generation tailored to specific RFP requirements.",
          },
          {
            lead: "Built a unified activity logging and cost analysis dashboard",
            detail:
              "tracking user interactions, agent invocations, document operations, and real-time API spend across Anthropic Claude and Azure OpenAI, with full audit trails in Azure SQL.",
          },
        ],
        technologies: [
          "Python 3.12",
          "FastAPI",
          "React 18",
          "TypeScript",
          "LangGraph",
          "LangChain",
          "Claude Opus/Sonnet",
          "Azure OpenAI GPT-4.1",
          "Azure Document Intelligence",
          "Azure SQL",
          "Azure Blob Storage",
          "Selenium",
          "Patchright",
          "Firecrawl",
        ],
      },
      {
        number: "02",
        title: "BM Product Accelerator: AI-Powered Full-Stack Application Generator",
        achievements: [
          {
            lead: "Developed a multi-agent orchestration system",
            detail:
              "using Claude Agent SDK to analyze PRD documents and generate implementation plans by discovering reusable components in Azure Blob Storage.",
          },
          {
            lead: "Engineered an automated code-generation pipeline",
            detail:
              "with BackendBuilderAgent creating validated FastAPI applications and FrontendBuilderAgent scaffolding React and Vite projects with npm management.",
          },
          {
            lead: "Implemented a skill-generation system",
            detail:
              "that extracts reusable patterns from GitHub repositories or code archives, generates documentation, and updates the component library.",
          },
          {
            lead: "Built an interactive natural-language CLI",
            detail:
              "for conversational project modification and debugging with automatic port management and session persistence.",
          },
          {
            lead: "Architected an asynchronous FastAPI backend",
            detail:
              "with Azure Blob Storage, multi-format document parsing for PDF, DOCX, and Markdown, and Pydantic validation.",
          },
        ],
        technologies: [
          "Claude Agent SDK",
          "FastAPI",
          "React",
          "Vite",
          "Azure Blob Storage",
          "Pydantic",
          "Multi-Agent Systems",
          "Natural Language Processing",
        ],
      },
    ],
  },
  {
    period: "May 2025 - Nov 2025",
    role: "Junior Application Developer",
    company: "DEXIAN (Bangladesh) Limited",
    companyHref: "https://www.linkedin.com/company/dexiansolutions/",
    logo: "/images/dexian-logo.png",
    logoAlt: "DEXIAN logo",
    logoTone: "dark",
    summary:
      "Shipped Salesforce automation, document-intelligence workflows, computer-vision fraud detection, and geospatial compliance products.",
    projects: [
      {
        number: "03",
        title: "SFAGent: AI-Powered Salesforce Agentic Compliance System",
        achievements: [
          {
            lead: "Created Salesforce Apex classes",
            detail:
              "to handle POST and GET operations and enable natural-language interaction with Salesforce data.",
          },
          {
            lead: "Developed custom authentication functions",
            detail:
              "to securely connect Apex classes and manage efficient API communication.",
          },
          {
            lead: "Integrated an Azure AI Foundry Agent",
            detail:
              "to automate Salesforce workflows from natural-language instructions.",
          },
          {
            lead: "Developed text and speech-to-text FastAPI services",
            detail:
              "using Azure OpenAI Whisper for accurate audio transcription.",
          },
          {
            lead: "Built an intuitive multimodal frontend",
            detail:
              "for text and audio operations with an automatic agentic flow.",
          },
        ],
        technologies: [
          "Salesforce Sandbox",
          "Apex Class",
          "Azure AI Foundry",
          "GPT-4.1",
          "Whisper",
          "FastAPI",
        ],
        links: [
          {
            label: "Salesforce AI Agent",
            href: "https://salesforcebotbm.azurewebsites.net/",
          },
        ],
      },
      {
        number: "04",
        title: "AI-Powered Automated Check Fraud Detection",
        achievements: [
          {
            lead: "Developed an AI-based check fraud detection system",
            detail:
              "using advanced machine-learning techniques to identify fraudulent checks.",
          },
          {
            lead: "Leveraged Azure Document Intelligence",
            detail:
              "and the prebuilt US Bank Check model to validate critical check components.",
          },
          {
            lead: "Trained a Siamese neural network",
            detail:
              "for matching signatures against reference and blacklist samples.",
          },
          {
            lead: "Designed a three-level review classification",
            detail: "categorizing check images as Safe, Suspicious, or Fraud.",
          },
        ],
        technologies: [
          "Python",
          "Azure Document Intelligence",
          "Siamese Neural Network",
          "React",
          "Django",
          "TensorFlow",
        ],
        links: [
          {
            label: "Interactive Demo",
            href: "https://bytemethodai.navattic.com/4n1302c9?g=cmev4cpgq000004ld64as0s91&s=0",
          },
          {
            label: "Live Application",
            href: "https://bmsg.azurewebsites.net/",
          },
        ],
      },
      {
        number: "05",
        title: "GeoViz: Modern Flight-Based Compliance System",
        achievements: [
          {
            lead: "Developed a responsive geographic analysis application",
            detail:
              "using Next.js, React, and shadcn/ui for coordinate and compliance workflows.",
          },
          {
            lead: "Integrated real-time geographic tracking",
            detail: "with Leaflet.js maps for dynamic coordinate visualization.",
          },
          {
            lead: "Implemented coverage-analysis tools",
            detail: "using the Haversine formula for accurate distance calculation.",
          },
          {
            lead: "Designed a responsive UI system",
            detail: "optimized for desktop, tablet, and mobile devices.",
          },
        ],
        technologies: [
          "Python",
          "Next.js",
          "React",
          "Leaflet.js",
          "shadcn/ui",
          "Tailwind CSS",
          "Lucide React",
          "GeoJSON",
          "Haversine Formula",
          "Axios",
          "Django",
        ],
        links: [
          {
            label: "Explore GeoViz",
            href: "https://geoviz-test.azurewebsites.net/",
          },
        ],
      },
    ],
  },
  {
    period: "Dec 2024 - May 2025",
    role: "AI & Machine Learning Researcher",
    company: "TIME Research and Innovation Ltd",
    companyHref: "https://timerni.com/",
    logo: "/images/time-research-logo.png",
    logoAlt: "TIME Research and Innovation logo",
    logoTone: "light",
    location: "Portsmouth, United Kingdom",
    summary:
      "Developed RAG agents, competitive-intelligence workflows, and document-processing applications while evaluating retrieval quality.",
    projects: [
      {
        number: "06",
        title: "GenBot: Advanced RAG-Based Web Chatbot with CrewAI",
        achievements: [
          {
            lead: "Developed a vectorization and storage pipeline",
            detail:
              "for unstructured JSON data using OpenAI embeddings and ChromaDB for fast retrieval.",
          },
          {
            lead: "Implemented RAG-based agents",
            detail:
              "combining vector retrieval and external web search for dynamic chatbot responses.",
          },
          {
            lead: "Designed multi-source knowledge refinement",
            detail: "to improve response relevance and accuracy in real time.",
          },
          {
            lead: "Evaluated embedding models with RAGAS",
            detail: "to select the most effective model for the target workload.",
          },
        ],
        technologies: [
          "Python",
          "OpenAI",
          "ChromaDB",
          "LangChain",
          "React",
          "Google Custom Search API",
          "WebCrawler",
          "Playwright",
        ],
        links: [
          {
            label: "GenBot Platform",
            href: "https://genzmarketing.xyz/",
          },
        ],
      },
      {
        number: "07",
        title: "Company Competitor Service Analysis and SWOT AI Agent",
        achievements: [
          {
            lead: "Developed an AI-powered competitive-analysis system",
            detail:
              "for extracting company services and identifying competitors through web scraping and OpenAI models.",
          },
          {
            lead: "Built a comprehensive SWOT workflow",
            detail:
              "using dynamic AI responses grounded in company and competitor web content.",
          },
          {
            lead: "Integrated extraction, analysis, and report generation",
            detail:
              "to deliver structured insights into market positioning and the competitive landscape.",
          },
        ],
        technologies: [
          "Python",
          "OpenAI",
          "Streamlit",
          "BeautifulSoup",
          "Pandas",
          "GPT-4",
          "CrewAI",
        ],
        links: [
          {
            label: "SWOT Analysis Agent",
            href: "https://app.readytensor.ai/publications/ai-powered-company-competitor-swot-analysis-saas-agent-UJf5ZsgXYWwp",
          },
        ],
      },
      {
        number: "08",
        title: "LLM Powered Legal Contract Generator",
        achievements: [
          {
            lead: "Developed a Flask-based contract-generation application",
            detail:
              "using AI and OCR to extract, refine, and generate legal document text.",
          },
          {
            lead: "Integrated Groq and LLaMA Vision",
            detail: "for accurate processing of complex legal text and images.",
          },
          {
            lead: "Incorporated OCR document processing",
            detail: "for digitizing scanned and image-based legal contracts.",
          },
        ],
        technologies: [
          "Python",
          "Flask",
          "Groq API",
          "LLaMA Vision",
          "PyMuPDF",
          "OpenCV",
        ],
        links: [
          {
            label: "PropoSign Contract Generator",
            href: "http://proposign.com/",
          },
        ],
      },
    ],
  },
];

export const researchInterests = [
  "Large language models",
  "LLM agents",
  "Multi-agent systems",
  "Human-LLM interaction",
  "Trustworthy AI",
  "Medical AI",
  "Computer vision",
  "Natural language processing",
];

export const publications: Publication[] = [
  {
    category: "Preprint",
    year: "2026",
    title: "ChannelGuard: Safe Models Do Not Compose into Safe Multi-Agent Systems",
    venue: "arXiv:2607.19430",
    status: "Preprint",
    publishedDate: "20 Jul 2026",
    authors: [
      "Elias Hossain",
      "Md Mehedi Hasan Nipu",
      "Fatema Tuj Johora Faria",
      "Tasfia Nuzhat Ornee",
      "Maleeha Sheikh",
    ],
    href: "https://arxiv.org/abs/2607.19430",
  },
  {
    category: "Preprint",
    year: "2026",
    title: "NEXUS: Structured Runtime Safety for Tool-Using LLM Agents",
    venue: "arXiv:2607.19356v1",
    status: "Preprint",
    publishedDate: "25 May 2026",
    authors: [
      "Elias Hossain",
      "Md Mehedi Hasan Nipu",
      "Tasfia Nuzhat Ornee",
      "Rajib Rana",
      "Niloofar Yousefi",
    ],
    href: "https://arxiv.org/abs/2607.19356v1",
  },
  {
    category: "Journal",
    year: "2026",
    title:
      "Safe and Scalable Collaboration in Multiagent LLM Systems: A Comprehensive Review",
    venue: "IEEE Transactions on Systems, Man, and Cybernetics: Systems",
    status: "Published",
    href: "https://ieeexplore.ieee.org/abstract/document/11598769",
  },
  {
    category: "Journal",
    year: "2024",
    title:
      "From Pixels to Pathology: The Power of CNNs in Detecting Tuberculosis",
    venue: "EAI Endorsed Transactions on Pervasive Health and Technology",
    status: "Published",
    href: "https://publications.eai.eu/index.php/phat/article/view/5543",
  },
  {
    category: "Journal",
    year: "2025",
    title:
      "MedBayes-Lite: Bayesian Uncertainty Quantification for Safe Clinical Decision Support",
    venue: "arXiv preprint 2511.16625",
    status: "Under review",
    href: "https://arxiv.org/abs/2511.16625",
  },
  {
    category: "Conference",
    year: "2026",
    title:
      "A Federated and Explainable Machine Learning Framework for Robust Intrusion Detection in IIoT Environments",
    venue:
      "5th International Conference on Electrical, Computer & Telecommunication Engineering",
    status: "Published",
    href: "https://ieeexplore.ieee.org/document/11429379",
  },
  {
    category: "Conference",
    year: "2025",
    title:
      "Enhancing Lung Cancer Detection with Attention Mechanisms and Unified Ensemble Learning",
    venue:
      "35th International Conference on Computer Theory and Applications",
    status: "Published",
    href: "https://ieeexplore.ieee.org/abstract/document/11519951",
  },
  {
    category: "Conference",
    year: "2024",
    title:
      "Deep Learning-Based Classification of Rice Varieties for Agricultural Applications",
    venue: "IEEE ARIIA 2024",
    status: "Published",
    href: "https://ieeexplore.ieee.org/document/11051570",
  },
  {
    category: "Dataset",
    year: "2026",
    title:
      "EchoCardio-FMC-718: An Annotated Echocardiogram Report Dataset",
    venue: "Mendeley Data",
    status: "Version 1",
    href: "https://data.mendeley.com/datasets/nvx2kchfyh/1",
  },
  {
    category: "Dataset",
    year: "2026",
    title: "Ben-Misandry-5000: An Annotated Bengali Misandry Dataset",
    venue: "Mendeley Data",
    status: "Version 2",
    href: "https://data.mendeley.com/datasets/shf5f7b64w/2",
  },
];

export const activities = [
  {
    date: "July 2026",
    label: "Field note",
    text: "Published Top-K Starvation: A Retrieval-First Fix, a practical account of restoring RAG quality by fixing recall before changing the model.",
    href: "https://www.linkedin.com/pulse/top-k-starvation-retrieval-first-fix-what-i-learned-debugging-nipu-w4g9c/",
  },
  {
    date: "May 2026",
    label: "Field note",
    text: "Published IPC Overflow: A Data-First Fix, documenting a production lesson from high-volume agentic application pipelines.",
    href: "https://www.linkedin.com/pulse/ipc-overflow-data-first-fix-what-i-learned-building-agentic-nipu-sawxc/",
  },
];

export const capabilities = [
  {
    number: "A",
    title: "Agentic AI engineering",
    text: "Production-grade agent orchestration, RAG systems, evaluation, tracing, and model-cost observability.",
  },
  {
    number: "B",
    title: "Applied machine learning",
    text: "Computer vision, clinical AI, document intelligence, fraud detection, and trustworthy model design.",
  },
  {
    number: "C",
    title: "Full-stack AI products",
    text: "FastAPI and React applications that turn complex model capabilities into clear, reliable user workflows.",
  },
];

export const technicalSkills = [
  {
    category: "Programming Languages",
    items: ["Python", "C"],
  },
  {
    category: "Web Development",
    items: [
      "HTML5",
      "CSS3",
      "FastAPI",
      "Flask",
      "React JS",
      "Next.js",
      "Streamlit",
    ],
  },
  {
    category: "Database",
    items: ["MySQL", "Azure SQL"],
  },
  {
    category: "Deep Learning Frameworks",
    items: ["TensorFlow", "Keras", "PyTorch"],
  },
  {
    category: "LLM Application Frameworks",
    items: [
      "LangChain",
      "LangGraph",
      "LangSmith",
      "Ragas",
      "DeepEval",
      "CrewAI",
      "OpenAI",
      "Claude Agent SDK",
    ],
  },
  {
    category: "Cloud Services",
    items: [
      "Azure OpenAI",
      "Azure AI Foundry",
      "Azure App Service",
      "Azure Blob Storage",
      "Docker",
      "Azure Boards",
    ],
  },
  {
    category: "Tools & Practices",
    items: [
      "Vector Database",
      "OpenCV",
      "GitLab",
      "GitHub",
      "GitHub Copilot",
      "Linux",
      "LLM Fine-tuning",
      "Architecture & Data Flow Diagrams",
      "Data Scraping",
      "Data Annotation",
      "Data Analysis",
      "Feature Engineering",
    ],
  },
];

export const awardsAndCertifications = [
  {
    type: "Certification",
    title: "Prompt Engineering for ChatGPT",
    issuer: "Vanderbilt University",
    issued: "Nov 2023",
    credentialId: "KK2ATMU8KVPA",
    description:
      "Coursera credential covering practical prompt design and effective interaction patterns for ChatGPT.",
    href: "https://www.coursera.org/account/accomplishments/verify/KK2ATMU8KVPA",
    linkLabel: "Verify credential",
  },
  {
    type: "Certification",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    issued: "Oct 2023",
    credentialId: "JZ5LMNS8Y4J2",
    description:
      "Coursera credential in Python foundations for data science, artificial intelligence, and application development.",
    href: "https://www.coursera.org/account/accomplishments/verify/JZ5LMNS8Y4J2",
    linkLabel: "Verify credential",
  },
  {
    type: "Award",
    title: "Rising Star Award",
    issuer: "Dexian Bangladesh",
    issued: "Feb 2026",
    associatedWith: "Dexian",
    description:
      "Recipient of the Rising Star Award for excellence in Agile delivery, results-driven execution, and high performance under pressure.",
    href: "https://drive.google.com/file/d/1T3zgGxttGDb9tDYG_t6B5XB1zvVfGzsd/view?usp=sharing",
    linkLabel: "View recognition",
  },
  {
    type: "Professional Service",
    title:
      "Peer Reviewer: EAI Endorsed Transactions on Pervasive Health and Technology (Vol. 11)",
    issuer: "European Alliance for Innovation (EAI)",
    issued: "Jun 2026",
    description:
      "Served as an independent peer reviewer for an accepted manuscript in Volume 11 (ISSN 2411-7145), evaluating research quality and methodological integrity and providing constructive feedback to the editorial team.",
    href: "https://drive.google.com/file/d/1SZ61yJVWmU61W9YdX7gc0-guBZt8_3if/view?usp=sharing",
    linkLabel: "View certificate",
  },
  {
    type: "Training",
    title: "Annual Cyber Defense Training - 2026",
    issuer: "Dexian",
    issued: "Jun 2026",
    associatedWith: "Dexian",
    description:
      "Completed Dexian's annual cyber-defense and security-awareness training program for 2026.",
    href: "https://drive.google.com/file/d/1aGo-_Z5Pr9KRtPmosFEE2416HVQZGd_p/view?usp=sharing",
    linkLabel: "View certificate",
  },
];