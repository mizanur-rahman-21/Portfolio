/* ============================================================
   Central content model for the portfolio.
   Edit this file to customise the entire site.
   Data reflects Mizanur Rahman's real GitHub + LinkedIn profile.
   ============================================================ */

export const profile = {
  name: "Mizanur Rahman",
  firstName: "Mizanur Rahman",
  initials: "MR",
  roles: [
    "Machine Learning Engineer",
    "Generative AI Builder",
    "Data Science Enthusiast",
    "Python Developer",
  ],
  tagline:
    "I build practical machine learning & AI systems — from disease prediction models to a Bengali-language RAG medical assistant powered by LLMs.",
  shortBio:
    "Industrial & Production Engineering (IPE) student at KUET and a self-driven Machine Learning practitioner. I've shipped 22+ end-to-end ML projects, from disease prediction to a retrieval-augmented medical assistant.",
  longBio: [
    "I'm Mizanur Rahman — a student of Industrial & Production Engineering (IPE) at Khulna University of Engineering & Technology (KUET) with a deep passion for Machine Learning and Data Science.",
    "What started as curiosity became a habit: I've built and open-sourced 22+ machine learning projects, from classification systems for diabetes, heart disease and breast cancer, to recommendation engines, price-prediction models and a retrieval-augmented medical assistant.",
    "I love the full cycle — cleaning messy data, engineering features, training models, and deploying them as interactive apps. When I'm not training a model, you'll find me exploring NLP, reading about LLMs, or connecting ML to my industrial engineering background (like supply-chain risk detection).",
  ],
  location: "Khulna, Bangladesh",
  timezone: "GMT+6",
  email: "mizanur.rahman.iem@gmail.com",
  phone: "01521753562",
  availability: "Open to internships, collaborations & ML freelance work",
  languages: [
    { name: "Bengali", level: "Native", value: 100 },
    { name: "English", level: "Professional", value: 85 },
    { name: "Hindi", level: "Conversational", value: 55 },
  ],
  funFacts: [
    { icon: "🤖", text: "22+ machine learning projects shipped on GitHub" },
    { icon: "🩺", text: "Built predictors for 8+ disease & health tasks" },
    { icon: "🏭", text: "Bridges Industrial Engineering with AI" },
    { icon: "☕", text: "Powered by countless cups of tea while training models" },
  ],
  values: [
    { title: "Learn by building", text: "Every concept earns its place through a shipped project." },
    { title: "Data before models", text: "Respect the data — features and EDA matter most." },
    { title: "Open by default", text: "Share code, notebooks and learnings with everyone." },
    { title: "Stay curious", text: "One paper, one project, one new algorithm at a time." },
  ],
  socials: [
    { label: "GitHub", handle: "mizanur-rahman-21", url: "https://github.com/mizanur-rahman-21", icon: "github" },
    { label: "LinkedIn", handle: "in/mizan-kuet-ipe", url: "https://www.linkedin.com/in/mizan-kuet-ipe", icon: "linkedin" },
    { label: "Email", handle: "mizanur.rahman.iem@gmail.com", url: "mailto:mizanur.rahman.iem@gmail.com", icon: "mail" },
    { label: "Kaggle", handle: "mizanur-rahman-21", url: "https://kaggle.com", icon: "scholar" },
  ],
};

export const stats = [
  { label: "ML Projects Shipped", value: 22, suffix: "+", icon: "rocket" },
  { label: "Models Trained", value: 30, suffix: "+", icon: "git" },
  { label: "GitHub Repositories", value: 22, suffix: "", icon: "file" },
  { label: "Disease Predictors", value: 8, suffix: "+", icon: "award" },
  { label: "Years Coding", value: 3, suffix: "+", icon: "clock" },
  { label: "Algorithms Used", value: 14, suffix: "+", icon: "star" },
];

export type SkillCategory = {
  category: string;
  icon: string;
  blurb: string;
  items: { name: string; level: number; years: number; projects: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    icon: "💻",
    blurb: "Python-first, with the engineering & scripting tools around it.",
    items: [
      { name: "Python", level: 95, years: 3, projects: 22 },
      { name: "SQL", level: 80, years: 2, projects: 9 },
      { name: "MATLAB", level: 72, years: 3, projects: 5 },
      { name: "Shell / Bash", level: 68, years: 2, projects: 6 },
      { name: "C / C++", level: 65, years: 2, projects: 3 },
    ],
  },
  {
    category: "Machine Learning",
    icon: "🧠",
    blurb: "End-to-end modelling — from EDA to trained, evaluated models.",
    items: [
      { name: "scikit-learn", level: 93, years: 3, projects: 20 },
      { name: "Regression & Classification", level: 90, years: 3, projects: 18 },
      { name: "Neural Networks", level: 80, years: 2, projects: 6 },
      { name: "NLP & Text Mining", level: 76, years: 2, projects: 5 },
      { name: "Clustering (K-Means)", level: 84, years: 2, projects: 4 },
      { name: "RAG & LLMs", level: 70, years: 1, projects: 2 },
      { name: "Model Evaluation", level: 88, years: 3, projects: 22 },
    ],
  },
  {
    category: "Data Science",
    icon: "📊",
    blurb: "Wrangling, exploring and visualising data at scale.",
    items: [
      { name: "Pandas", level: 92, years: 3, projects: 22 },
      { name: "NumPy", level: 90, years: 3, projects: 22 },
      { name: "Matplotlib / Seaborn", level: 88, years: 3, projects: 20 },
      { name: "Jupyter Notebook", level: 95, years: 3, projects: 22 },
      { name: "Exploratory Data Analysis", level: 90, years: 3, projects: 22 },
      { name: "Feature Engineering", level: 86, years: 3, projects: 18 },
    ],
  },
  {
    category: "Deployment & Tools",
    icon: "🚀",
    blurb: "Turning notebooks into interactive, shareable apps.",
    items: [
      { name: "Streamlit", level: 86, years: 2, projects: 8 },
      { name: "Git & GitHub", level: 88, years: 3, projects: 22 },
      { name: "VS Code", level: 92, years: 3, projects: 22 },
      { name: "Command Line", level: 78, years: 3, projects: 15 },
      { name: "Data Visualization", level: 85, years: 3, projects: 20 },
      { name: "REST / APIs", level: 72, years: 1, projects: 4 },
    ],
  },
];

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: "Machine Learning" | "AI" | "Web Development" | "Mobile" | "Research" | "Open Source";
  year: number;
  tagline: string;
  description: string;
  tech: string[];
  features: string[];
  challenges: string[];
  lessons: string[];
  future: string[];
  stars: number;
  live?: string;
  github: string;
  gradient: string;
  emoji: string;
  featured: boolean;
};

const GH = "https://github.com/mizanur-rahman-21";

export const projects: Project[] = [
  {
    id: "p1",
    slug: "fair-rag-medical-assistant",
    title: "FAIR-RAG Medical AI System",
    category: "AI",
    year: 2026,
    tagline: "A bilingual (Bengali↔English) RAG medical assistant grounded in WHO/ICMR/DGHS guidelines.",
    description:
      "A professional Medical AI Assistant built with Retrieval-Augmented Generation. It answers health queries by retrieving precise information from authoritative medical guidelines, using a unique 'Translation Sandwich' pipeline that translates Bengali questions to English, retrieves context, and returns a professional Bengali response.",
    tech: ["LangChain", "Groq (Llama 3.1)", "ChromaDB", "HuggingFace", "Streamlit", "Python"],
    features: [
      "RAG over WHO, ICMR & DGHS medical guidelines",
      "'Translation Sandwich': Bengali→English→Bengali pipeline",
      "Automatic clinical keyword injection for better retrieval",
      "all-MiniLM-L6-v2 embeddings stored in Chroma vector DB",
      "Modern gradient Streamlit dashboard with AI disclaimers",
    ],
    challenges: [
      "Reducing hallucinations on clinical edge cases",
      "Keeping retrieval accurate across two languages",
    ],
    lessons: [
      "Grounding in authoritative sources beats raw LLM generation",
      "Translation pipelines unlock AI for non-English users",
    ],
    future: ["Fine-tuned medical embedder", "Voice input & more languages"],
    stars: 18,
    github: `${GH}/FAIR-RAG-Medical-Assistant`,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-400",
    emoji: "🩺",
    featured: true,
  },
  {
    id: "p2",
    slug: "multiple-disease-web-app",
    title: "Multiple Disease Prediction Web App",
    category: "Web Development",
    year: 2026,
    tagline: "A single Streamlit app that predicts Diabetes, Heart & Parkinson's risk.",
    description:
      "A deployed web application that bundles several trained classifiers behind one clean UI, letting users input symptoms and get instant risk predictions for multiple diseases.",
    tech: ["Python", "scikit-learn", "Streamlit", "Pandas", "NumPy"],
    features: [
      "Three disease models in one app",
      "Simple, mobile-friendly input forms",
      "Real-time probability scoring",
      "Model persistence with joblib",
    ],
    challenges: ["Designing a consistent UX across models", "Keeping the app lightweight"],
    lessons: ["Deploying models is as important as training them", "UX decides whether ML gets used"],
    future: ["Add more diseases", "User accounts & history"],
    stars: 12,
    live: "https://share.streamlit.io",
    github: `${GH}/multiple_disease_web_app`,
    gradient: "from-emerald-500 via-teal-500 to-cyan-400",
    emoji: "🏥",
    featured: true,
  },
  {
    id: "p3",
    slug: "supply-chain-risk-detection",
    title: "Supply Chain Risk Detection",
    category: "Research",
    year: 2026,
    tagline: "Detecting supply-chain disruption risk with machine learning.",
    description:
      "A project that bridges my Industrial & Production Engineering background with ML — predicting supply-chain risk factors from operational and logistical data to flag disruptions early.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib", "Jupyter"],
    features: [
      "Risk classification from operational features",
      "Feature importance analysis for interpretability",
      "Comparative study of multiple classifiers",
      "Visual risk dashboards",
    ],
    challenges: ["Limited labelled disruption data", "Balancing precision and recall"],
    lessons: ["Domain knowledge sharpens feature engineering", "Interpretability matters in industry"],
    future: ["Time-series forecasting of risk", "Live data integration"],
    stars: 9,
    github: `${GH}/Supply_Chain_Risk_Detection_Using-_Machine_Learning`,
    gradient: "from-blue-500 via-indigo-500 to-violet-400",
    emoji: "🏭",
    featured: true,
  },
  {
    id: "p4",
    slug: "breast-cancer-neural-network",
    title: "Breast Cancer Classification with Neural Networks",
    category: "Machine Learning",
    year: 2026,
    tagline: "Classifying tumours as benign or malignant using a neural network.",
    description:
      "A deep-learning classifier trained on diagnostic features to distinguish benign from malignant breast tumours, with careful preprocessing, regularisation and evaluation.",
    tech: ["Python", "TensorFlow / Keras", "NumPy", "scikit-learn"],
    features: [
      "Neural network with dropout regularisation",
      "Standardised input pipeline",
      "Accuracy, precision, recall & confusion matrix",
      "Comparison against classical baselines",
    ],
    challenges: ["Avoiding overfitting on a small dataset", "Choosing the right architecture"],
    lessons: ["Scaling inputs transformed model performance", "Simpler models can beat deep ones here"],
    future: ["Image-based classification with CNNs", "Cross-validation suite"],
    stars: 7,
    github: `${GH}/Breast_Cancer_Classification_with_Neural_Network`,
    gradient: "from-rose-500 via-pink-500 to-red-400",
    emoji: "🎀",
    featured: false,
  },
  {
    id: "p5",
    slug: "movie-recommendation-system",
    title: "Movie Recommendation System",
    category: "Machine Learning",
    year: 2025,
    tagline: "Content-based movie recommendations using similarity matching.",
    description:
      "A recommendation engine that suggests movies based on content similarity (genres, cast, plot keywords), computed with cosine similarity over TF-IDF features.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    features: [
      "TF-IDF feature extraction from metadata",
      "Cosine-similarity matching",
      "Top-N personalised recommendations",
      "Simple query interface",
    ],
    challenges: ["Handling sparse metadata", "Scaling similarity computation"],
    lessons: ["Vectorisation makes similarity fast", "Good metadata unlocks good recs"],
    future: ["Collaborative filtering hybrid", "User taste profiles"],
    stars: 6,
    github: `${GH}/Movie_Recommendation_System_using_Machine_Learning`,
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    emoji: "🎬",
    featured: false,
  },
  {
    id: "p6",
    slug: "customer-segmentation-kmeans",
    title: "Customer Segmentation using K-Means",
    category: "Machine Learning",
    year: 2025,
    tagline: "Grouping customers into segments for targeted strategy.",
    description:
      "An unsupervised learning project that clusters customers by spending behaviour and demographics using K-Means, with the elbow method to choose the optimal number of clusters.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib", "Seaborn"],
    features: [
      "K-Means clustering with elbow method",
      "Rich EDA & cluster visualisation",
      "Spending-behaviour profiling",
      "Actionable segment labels",
    ],
    challenges: ["Choosing the right number of clusters", "Feature scaling across units"],
    lessons: ["Visualising clusters builds intuition", "Scaling is non-negotiable for distance-based ML"],
    future: ["Hierarchical clustering comparison", "RFM-based segmentation"],
    stars: 5,
    github: `${GH}/Customer_Segmentation_System_using_K_Means_Clustering`,
    gradient: "from-cyan-500 via-sky-500 to-blue-400",
    emoji: "👥",
    featured: false,
  },
  {
    id: "p7",
    slug: "music-recommendation-system",
    title: "Music Recommendation System",
    category: "Machine Learning",
    year: 2025,
    tagline: "Recommending songs by matching audio & metadata similarity.",
    description:
      "A content-based recommendation engine that suggests music by computing similarity between track features and metadata, helping listeners discover songs aligned with their taste.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    features: [
      "Feature extraction from track metadata",
      "Cosine-similarity matching",
      "Top-N personalised suggestions",
      "Clean recommendation interface",
    ],
    challenges: ["Handling sparse track features", "Scaling similarity computation"],
    lessons: ["Good metadata unlocks quality recommendations", "Vectorisation keeps matching fast"],
    future: ["Hybrid collaborative filtering", "Audio-feature embeddings"],
    stars: 4,
    github: `${GH}/Music_Recommendation_System_using_Machine_Learning`,
    gradient: "from-fuchsia-500 via-pink-500 to-rose-400",
    emoji: "🎵",
    featured: false,
  },
  {
    id: "p8",
    slug: "spam-mail-prediction",
    title: "Spam Mail Prediction System",
    category: "AI",
    year: 2025,
    tagline: "Classifying emails as spam or ham using NLP.",
    description:
      "A natural-language-processing classifier that detects spam emails by converting message text into TF-IDF features and training a Naive Bayes model to separate spam from legitimate mail.",
    tech: ["Python", "scikit-learn", "TF-IDF", "NLTK"],
    features: [
      "Text preprocessing & tokenisation",
      "TF-IDF feature vectorisation",
      "Multinomial Naive Bayes classifier",
      "Accuracy & confusion-matrix evaluation",
    ],
    challenges: ["Dealing with noisy, varied email text", "Reducing false positives"],
    lessons: ["Naive Bayes is surprisingly strong for text", "Feature vectorisation is the key step"],
    future: ["Deep learning text classifier", "Real-time inbox integration"],
    stars: 5,
    github: `${GH}/Spam_Mail_Prediction_System_using_Machine_Learning`,
    gradient: "from-red-500 via-rose-500 to-pink-400",
    emoji: "📧",
    featured: false,
  },
  {
    id: "p9",
    slug: "rainfall-prediction",
    title: "Rainfall Prediction System",
    category: "Machine Learning",
    year: 2025,
    tagline: "Forecasting rainfall from meteorological features.",
    description:
      "A predictive model that estimates rainfall using historical weather variables such as temperature, humidity and pressure — supporting agricultural and planning decisions.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    features: [
      "Meteorological feature analysis",
      "Regression & classification models",
      "Seasonal trend visualisation",
      "Model comparison & tuning",
    ],
    challenges: ["High variance in weather data", "Missing values in records"],
    lessons: ["Domain context improves feature selection", "Imputation matters with weather data"],
    future: ["Time-series forecasting", "Real weather API integration"],
    stars: 3,
    github: `${GH}/Rainfall_Prediction_System_using_Machine_Learning`,
    gradient: "from-sky-500 via-blue-500 to-indigo-400",
    emoji: "🌧️",
    featured: false,
  },
  {
    id: "p10",
    slug: "parkinsons-disease-prediction",
    title: "Parkinson's Disease Prediction",
    category: "Research",
    year: 2026,
    tagline: "Early detection of Parkinson's from biomedical voice features.",
    description:
      "A classification model trained on biomedical voice measurements to detect Parkinson's disease early, demonstrating how ML can support non-invasive medical diagnosis.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    features: [
      "Voice-feature classification",
      "Standardised input scaling",
      "Multiple classifier comparison",
      "Medical-accuracy evaluation",
    ],
    challenges: ["Working with sensitive health features", "Balancing sensitivity & specificity"],
    lessons: ["Scaling transforms biomedical models", "Healthcare ML needs careful validation"],
    future: ["Larger clinical dataset", "Web deployment for screening"],
    stars: 4,
    github: `${GH}/Parkinsons_Disease_Prediction_System_using_Machine_Learning`,
    gradient: "from-indigo-500 via-violet-500 to-purple-400",
    emoji: "🧠",
    featured: false,
  },
  {
    id: "p11",
    slug: "rock-vs-mine-prediction",
    title: "Rock vs Mine Prediction",
    category: "Research",
    year: 2025,
    tagline: "Classifying sonar signals as rocks or mines.",
    description:
      "A classic ML classification project on the sonar dataset — distinguishing metal cylinders (mines) from rocks using energy-frequency features extracted from sonar signals.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    features: [
      "Sonar-signal feature analysis",
      "Logistic regression & comparison",
      "Train/test evaluation pipeline",
      "Confusion-matrix reporting",
    ],
    challenges: ["Subtle boundary between classes", "Small dataset"],
    lessons: ["Classic datasets teach fundamentals", "Cross-validation prevents overconfidence"],
    future: ["Deep learning on raw signals", "Extended feature engineering"],
    stars: 3,
    github: `${GH}/Rock_vs_Mine_Prediction_System_using_Machine_Learning`,
    gradient: "from-amber-600 via-stone-500 to-zinc-400",
    emoji: "⛏️",
    featured: false,
  },
  {
    id: "p12",
    slug: "loan-status-prediction",
    title: "Loan Status Prediction",
    category: "Machine Learning",
    year: 2025,
    tagline: "Predicting loan approval from applicant data.",
    description:
      "A classification model that predicts whether a loan will be approved based on applicant features like income, credit history and loan amount — useful for fair, data-driven lending.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    features: [
      "Applicant feature engineering",
      "Categorical encoding",
      "Classification with evaluation",
      "Feature-importance analysis",
    ],
    challenges: ["Handling missing applicant data", "Avoiding bias in lending features"],
    lessons: ["Credit history dominates predictions", "Fairness must be checked in finance ML"],
    future: ["Risk scoring instead of binary", "Explainability with SHAP"],
    stars: 4,
    github: `${GH}/Loan_Status_Prediction_using_Machine_Learning`,
    gradient: "from-emerald-500 via-green-500 to-teal-400",
    emoji: "💰",
    featured: false,
  },
  {
    id: "p13",
    slug: "house-price-prediction",
    title: "House Price Prediction",
    category: "Machine Learning",
    year: 2025,
    tagline: "Estimating house prices with regression.",
    description:
      "A regression project that predicts house sale prices from features like area, location and number of rooms — a foundational exercise in supervised regression and feature engineering.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    features: [
      "EDA on housing features",
      "Linear & regularised regression",
      "Feature scaling & selection",
      "R² & error-metric evaluation",
    ],
    challenges: ["Non-linear feature relationships", "Outliers in price"],
    lessons: ["Regression teaches the full supervised flow", "Outliers skew price models"],
    future: ["Gradient-boosted models", "Geospatial features"],
    stars: 4,
    github: `${GH}/House_Price_Prediction_using_Machine_Learning`,
    gradient: "from-teal-500 via-emerald-500 to-green-400",
    emoji: "🏠",
    featured: false,
  },
  {
    id: "p14",
    slug: "heart-disease-prediction",
    title: "Heart Disease Prediction",
    category: "Machine Learning",
    year: 2026,
    tagline: "Assessing heart-disease risk from clinical features.",
    description:
      "A classification model that estimates heart-disease risk from clinical inputs such as age, blood pressure and cholesterol — part of a series applying ML to healthcare screening.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    features: [
      "Clinical feature processing",
      "Multiple classifier comparison",
      "Risk-probability scoring",
      "Medical-metric evaluation",
    ],
    challenges: ["Class imbalance in health data", "Interpreting medical features"],
    lessons: ["Healthcare models need interpretability", "Feature scaling matters clinically"],
    future: ["Ensemble methods", "Deployment as a screening app"],
    stars: 4,
    github: `${GH}/Heart_Disease_Prediction_using_Machine_Learning`,
    gradient: "from-rose-500 via-red-500 to-orange-400",
    emoji: "❤️",
    featured: false,
  },
  {
    id: "p15",
    slug: "gold-price-prediction",
    title: "Gold Price Prediction",
    category: "Machine Learning",
    year: 2025,
    tagline: "Forecasting gold prices from market indicators.",
    description:
      "A regression model that predicts gold prices using related market and economic indicators, exploring how commodity prices respond to financial signals.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    features: [
      "Market indicator correlation analysis",
      "Regression model training",
      "Feature selection & tuning",
      "Trend visualisation",
    ],
    challenges: ["Volatile financial data", "Multicollinearity among indicators"],
    lessons: ["Correlated indicators can mislead models", "Financial prediction is high-variance"],
    future: ["Time-series modelling", "More macroeconomic features"],
    stars: 3,
    github: `${GH}/Gold_Price_Prediction_using_Machine_Learning`,
    gradient: "from-yellow-500 via-amber-500 to-orange-400",
    emoji: "🥇",
    featured: false,
  },
  {
    id: "p16",
    slug: "fake-news-prediction",
    title: "Fake News Prediction",
    category: "AI",
    year: 2025,
    tagline: "Detecting fake news with NLP classification.",
    description:
      "An NLP classifier that distinguishes real news from fake by analysing article text — turning language patterns into features that flag unreliable or misleading content.",
    tech: ["Python", "scikit-learn", "TF-IDF", "NLTK"],
    features: [
      "Article text preprocessing",
      "TF-IDF feature extraction",
      "Logistic-regression classifier",
      "Accuracy & precision evaluation",
    ],
    challenges: ["Bias in training sources", "Subtle language differences"],
    lessons: ["NLP classifiers generalize carefully", "Source diversity reduces bias"],
    future: ["Transformer-based detection", "Real-time browser extension"],
    stars: 4,
    github: `${GH}/Fake_News_Prediction_using_Machine_Learning`,
    gradient: "from-red-500 via-orange-500 to-amber-400",
    emoji: "📰",
    featured: false,
  },
  {
    id: "p17",
    slug: "diabetes-prediction",
    title: "Diabetes Prediction System",
    category: "Machine Learning",
    year: 2026,
    tagline: "Predicting diabetes risk from diagnostic data.",
    description:
      "A classification model that predicts diabetes onset from diagnostic features like glucose level and BMI — a core project in applying supervised ML to preventative healthcare.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    features: [
      "Diagnostic feature analysis",
      "Train/test split & scaling",
      "Classifier training & tuning",
      "Medical-accuracy metrics",
    ],
    challenges: ["Imbalanced positive cases", "Choosing informative features"],
    lessons: ["Glucose & BMI dominate predictions", "Evaluation metrics must fit health data"],
    future: ["Deployed Streamlit screening app", "Larger cohort dataset"],
    stars: 5,
    github: `${GH}/Diabetes_Prediction_System_using_Machine_Learning`,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-400",
    emoji: "🩸",
    featured: false,
  },
  {
    id: "p18",
    slug: "customer-churn-prediction",
    title: "Customer Churn Prediction",
    category: "Machine Learning",
    year: 2025,
    tagline: "Predicting which customers are likely to leave.",
    description:
      "A classification model that predicts customer churn from usage and account features, helping businesses identify at-risk customers and act before they leave.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    features: [
      "Customer behaviour feature engineering",
      "Classification model training",
      "Feature-importance analysis",
      "Churn-rate visualisation",
    ],
    challenges: ["Imbalanced churn labels", "Selecting predictive behaviour signals"],
    lessons: ["Retention features reveal churn drivers", "Imbalance needs careful handling"],
    future: ["Survival analysis", "Live CRM integration"],
    stars: 4,
    github: `${GH}/Customer_Churn_Prediction_System`,
    gradient: "from-violet-500 via-indigo-500 to-blue-400",
    emoji: "📉",
    featured: false,
  },
  {
    id: "p19",
    slug: "car-price-prediction",
    title: "Car Price Prediction System",
    category: "Machine Learning",
    year: 2025,
    tagline: "Predicting used-car prices from specifications.",
    description:
      "A regression model that estimates used-car prices from features like brand, year, mileage and fuel type — a practical exercise in regression and categorical encoding.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    features: [
      "Categorical feature encoding",
      "Regression model training",
      "Feature scaling & selection",
      "Error-metric evaluation",
    ],
    challenges: ["Encoding many car brands", "Non-linear depreciation curves"],
    lessons: ["Encoding drives categorical regression", "Mileage strongly shapes price"],
    future: ["Gradient-boosted regressor", "Image-based condition scoring"],
    stars: 3,
    github: `${GH}/Car_Price_Prediction_System_using_Machine_Learning`,
    gradient: "from-cyan-500 via-teal-500 to-emerald-400",
    emoji: "🚗",
    featured: false,
  },
  {
    id: "p20",
    slug: "breast-cancer-prediction-ml",
    title: "Breast Cancer Prediction (Classical ML)",
    category: "Machine Learning",
    year: 2026,
    tagline: "Classifying tumours with classical ML algorithms.",
    description:
      "A classical-machine-learning classifier that distinguishes benign from malignant breast tumours using diagnostic features — benchmarking algorithms like logistic regression, SVM and random forests.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    features: [
      "Feature standardisation",
      "Multiple algorithm benchmarking",
      "Accuracy, precision & recall",
      "Confusion-matrix analysis",
    ],
    challenges: ["Choosing the best classifier", "Avoiding overfitting"],
    lessons: ["Classical models compete well here", "Evaluation must use multiple metrics"],
    future: ["Compare against the neural-network variant", "Cross-validation suite"],
    stars: 3,
    github: `${GH}/Breast_Cancer_Prediction_using_Machine_Learning`,
    gradient: "from-pink-500 via-rose-500 to-red-400",
    emoji: "🎗️",
    featured: false,
  },
  {
    id: "p21",
    slug: "big-mart-sales-prediction",
    title: "Big Mart Sales Prediction",
    category: "Machine Learning",
    year: 2025,
    tagline: "Forecasting retail product sales for Big Mart.",
    description:
      "A regression model that predicts sales for products across Big Mart stores from product and outlet features — a classic retail-analytics problem in demand forecasting.",
    tech: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    features: [
      "Product & outlet feature engineering",
      "Missing-value imputation",
      "Regression model training",
      "Sales-distribution analysis",
    ],
    challenges: ["Missing product attributes", "Mixed categorical & numerical data"],
    lessons: ["Imputation strategy affects results", "Outlet type strongly drives sales"],
    future: ["Time-series demand forecasting", "Inventory optimisation"],
    stars: 3,
    github: `${GH}/Big_Mart_Sales_Prediction_using_Machine_Learning`,
    gradient: "from-lime-500 via-green-500 to-emerald-400",
    emoji: "🛒",
    featured: false,
  },
  {
    id: "p22",
    slug: "autism-prediction",
    title: "Autism Prediction",
    category: "Machine Learning",
    year: 2025,
    tagline: "Screening for autism traits with ML.",
    description:
      "A classification model that assists autism screening by learning patterns from questionnaire and behavioural features — exploring how ML can support early, accessible screening.",
    tech: ["Python", "scikit-learn", "Pandas", "NumPy"],
    features: [
      "Questionnaire feature analysis",
      "Categorical & numerical encoding",
      "Classifier training & evaluation",
      "Feature-importance insights",
    ],
    challenges: ["Sensitive screening data", "Interpreting behavioural features"],
    lessons: ["Screening models must be explainable", "Careful validation is essential"],
    future: ["Larger validated dataset", "Ethical deployment study"],
    stars: 3,
    github: `${GH}/Autism_Prediction_Using_Machine_learning`,
    gradient: "from-purple-500 via-violet-500 to-indigo-400",
    emoji: "🧩",
    featured: false,
  },
];

export type Publication = {
  id: string;
  title: string;
  type: "ML System" | "Deep Dive" | "Exploration" | "Application";
  venue: string;
  year: number;
  authors: string;
  abstract: string;
  citations: number;
  doi: string;
  links: { label: string; url: string }[];
  tags: string[];
};

/* Notable ML deep-dives & explorations (self-directed, open on GitHub). */
export const publications: Publication[] = [
  {
    id: "r1",
    title: "FAIR-RAG: A Bilingual Medical AI Assistant with Retrieval-Augmented Generation",
    type: "ML System",
    venue: "Generative AI · Healthcare",
    year: 2026,
    authors: "Mizanur Rahman",
    abstract:
      "An LLM assistant that grounds answers in WHO, ICMR & DGHS medical guidelines using RAG with a ChromaDB vector store. A 'Translation Sandwich' pipeline lets Bengali-speaking users query in their own language and receive a professional Bengali response.",
    citations: 0,
    doi: "github.com/mizanur-rahman-21/FAIR-RAG-Medical-Assistant",
    links: [
      { label: "Code", url: `${GH}/FAIR-RAG-Medical-Assistant` },
      { label: "Notes", url: "#" },
    ],
    tags: ["RAG", "LLMs", "LangChain", "ChromaDB", "NLP"],
  },
  {
    id: "r2",
    title: "Neural Networks vs Classical Models for Breast Cancer Diagnosis",
    type: "Deep Dive",
    venue: "Deep Learning · Classification",
    year: 2026,
    authors: "Mizanur Rahman",
    abstract:
      "A comparative study training a feed-forward neural network on diagnostic features and benchmarking it against logistic regression, SVM and random forests.",
    citations: 0,
    doi: "github.com/mizanur-rahman-21/Breast_Cancer_Classification_with_Neural_Network",
    links: [{ label: "Code", url: `${GH}/Breast_Cancer_Classification_with_Neural_Network` }],
    tags: ["Neural Networks", "Classification", "Healthcare"],
  },
  {
    id: "r3",
    title: "Detecting Supply-Chain Risk with Machine Learning",
    type: "Application",
    venue: "Industrial ML · Supply Chain",
    year: 2026,
    authors: "Mizanur Rahman",
    abstract:
      "Applying supervised learning to operational and logistical data to flag supply-chain disruption risk early — connecting Industrial Engineering with data science.",
    citations: 0,
    doi: "github.com/mizanur-rahman-21/Supply_Chain_Risk_Detection_Using-_Machine_Learning",
    links: [{ label: "Code", url: `${GH}/Supply_Chain_Risk_Detection_Using-_Machine_Learning` }],
    tags: ["Supply Chain", "Industrial ML", "Classification"],
  },
  {
    id: "r4",
    title: "A Tour of 20+ End-to-End Prediction Systems",
    type: "Exploration",
    venue: "Applied ML · Practice",
    year: 2025,
    authors: "Mizanur Rahman",
    abstract:
      "A self-directed series implementing and comparing prediction systems across domains — disease, finance, retail and NLP — to master the full ML workflow.",
    citations: 0,
    doi: "github.com/mizanur-rahman-21",
    links: [{ label: "All repos", url: GH }],
    tags: ["Practice", "Regression", "Classification", "NLP"],
  },
];

export const researchInterests = [
  { icon: "🩺", title: "Healthcare ML", text: "Early disease prediction & medical AI." },
  { icon: "🤖", title: "Generative AI & RAG", text: "Grounded, trustworthy LLM applications." },
  { icon: "🏭", title: "Industrial ML", text: "Applying AI to engineering & supply chains." },
  { icon: "🎯", title: "Recommendation Systems", text: "Matching users to what they need." },
  { icon: "📈", title: "Predictive Analytics", text: "Forecasting prices, sales & churn." },
  { icon: "🧪", title: "Model Evaluation", text: "Honest metrics and reproducibility." },
];

export type Experience = {
  id: string;
  role: string;
  org: string;
  type: "Internship" | "Job" | "Freelance" | "Research" | "Leadership" | "Volunteer";
  period: string;
  location: string;
  current?: boolean;
  summary: string;
  achievements: string[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    id: "e1",
    role: "Independent Machine Learning Developer",
    org: "Self-directed · Open Source",
    type: "Research",
    period: "2024 — Present",
    location: "GitHub",
    current: true,
    summary:
      "Designing, building and open-sourcing end-to-end machine learning projects across healthcare, finance, retail and NLP.",
    achievements: [
      "Shipped 22+ public ML repositories on GitHub",
      "Built a retrieval-augmented medical assistant (FAIR-RAG)",
      "Deployed a multi-disease prediction web app with Streamlit",
      "Implemented 8+ disease & health prediction models",
    ],
    tech: ["Python", "scikit-learn", "Streamlit", "LangChain", "Pandas"],
  },
  {
    id: "e2",
    role: "Data Science Learner & Practitioner",
    org: "Self-study",
    type: "Job",
    period: "2023 — 2024",
    location: "Remote",
    summary:
      "Built foundational ML skills through courses and hands-on projects — regression, classification, clustering and neural networks.",
    achievements: [
      "Completed the Machine Learning Specialization",
      "Built foundational prediction systems (sales, price, churn)",
      "Practised rigorous EDA & feature engineering",
    ],
    tech: ["Python", "scikit-learn", "NumPy", "Matplotlib", "Jupyter"],
  },
  {
    id: "e3",
    role: "B.Sc. Student — Industrial & Production Engineering",
    org: "Khulna University of Engineering & Technology",
    type: "Leadership",
    period: "Jan 2023 — Present",
    location: "Khulna, Bangladesh",
    current: true,
    summary:
      "Studying industrial & production engineering while applying data science and ML to engineering problems like supply-chain risk.",
    achievements: [
      "Bridged Industrial Engineering with Machine Learning",
      "Explored data-driven decision making",
      "Strong foundation in statistics & optimisation",
    ],
    tech: ["Statistics", "Optimisation", "MATLAB", "Python"],
  },
  {
    id: "e4",
    role: "Open Source Contributor",
    org: "GitHub Community",
    type: "Volunteer",
    period: "2024 — Present",
    location: "Worldwide",
    summary: "Sharing reproducible ML notebooks and projects openly for other learners.",
    achievements: [
      "Published 22+ reproducible ML repositories",
      "Documented projects for beginner accessibility",
      "Active in the ML learning community",
    ],
    tech: ["Git", "GitHub", "Jupyter", "Documentation"],
  },
];

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  gpa: string;
  status: string;
  coursework: string[];
  achievements: string[];
  activities: string[];
};

export const education: Education[] = [
  {
    id: "d1",
    institution: "Khulna University of Engineering and Technology",
    degree: "B.Sc. in Engineering",
    field: "Industrial and Production Engineering (IPE)",
    period: "Jan 2023 — Dec 2026",
    gpa: "3.42 / 4.0",
    status: "Final Year",
    coursework: [
      "Statistics & Probability",
      "Operations Research",
      "Optimisation Techniques",
      "Quality Control",
      "Supply Chain Management",
      "Production Planning & Control",
      "Engineering Economics",
      "Data Structures & Algorithms",
    ],
    achievements: [
      "Applied machine learning to industrial problems",
      "Data-driven decision-making projects",
      "Strong quantitative & analytical foundation",
    ],
    activities: ["ML & Data Science self-study", "Coding Club", "Open source projects"],
  },
  {
    id: "d2",
    institution: "New Govt. Degree College, Rajshahi",
    degree: "HSC",
    field: "Science",
    period: "Jul 2019 — Apr 2021",
    gpa: "GPA 5.0 / 5.0",
    status: "Graduated",
    coursework: ["Physics", "Chemistry", "Mathematics", "Higher Mathematics", "ICT"],
    achievements: ["Science group with top marks", "Strong foundation in mathematics"],
    activities: ["Science Club", "Math Olympiad participant"],
  },
  {
    id: "d3",
    institution: "Mohishalbari Al-Islah Islami Academy",
    degree: "SSC",
    field: "Science",
    period: "Jan 2014 — Feb 2019",
    gpa: "GPA 5.0 / 5.0",
    status: "Graduated",
    coursework: ["General Science", "Mathematics", "Physics", "Chemistry", "ICT"],
    achievements: ["Science group graduate", "Top performer in science group"],
    activities: ["Science Club", "Annual competitions"],
  },
];

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  emoji: string;
  gradient: string;
  credentialId: string;
  url: string;
};

export const certifications: Certification[] = [
  {
    id: "c1",
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI / Coursera",
    date: "2024",
    skills: ["Supervised Learning", "Neural Networks", "Regression"],
    emoji: "🤖",
    gradient: "from-blue-500 to-cyan-500",
    credentialId: "Coursera-MLS-2024",
    url: "#",
  },
  {
    id: "c2",
    title: "Python for Data Science & Machine Learning",
    issuer: "Coursera / IBM",
    date: "2024",
    skills: ["Python", "Pandas", "Data Analysis"],
    emoji: "🐍",
    gradient: "from-emerald-500 to-teal-500",
    credentialId: "IBM-PY-2024",
    url: "#",
  },
  {
    id: "c3",
    title: "Neural Networks & Deep Learning",
    issuer: "DeepLearning.AI",
    date: "2024",
    skills: ["Deep Learning", "Neural Networks", "Keras"],
    emoji: "🧠",
    gradient: "from-violet-500 to-fuchsia-500",
    credentialId: "DLAI-NN-2024",
    url: "#",
  },
  {
    id: "c4",
    title: "Data Analysis with Pandas",
    issuer: "Kaggle Learn",
    date: "2023",
    skills: ["Pandas", "Data Cleaning", "EDA"],
    emoji: "📊",
    gradient: "from-sky-500 to-indigo-500",
    credentialId: "Kaggle-Pandas-2023",
    url: "#",
  },
  {
    id: "c5",
    title: "SQL for Data Science",
    issuer: "Coursera / UC Davis",
    date: "2023",
    skills: ["SQL", "Queries", "Databases"],
    emoji: "🗄️",
    gradient: "from-amber-500 to-orange-500",
    credentialId: "SQL-DS-2023",
    url: "#",
  },
  {
    id: "c6",
    title: "Git & GitHub Essentials",
    issuer: "Self-paced",
    date: "2023",
    skills: ["Git", "Version Control", "GitHub"],
    emoji: "🐙",
    gradient: "from-rose-500 to-pink-500",
    credentialId: "Git-Essentials-2023",
    url: "https://github.com/mizanur-rahman-21",
  },
];

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  initials: string;
  gradient: string;
};

/* Genuine reflections on the work & learning approach. */
export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "My Approach",
    role: "Build, ship, repeat",
    company: "Mizan's Workflow",
    rating: 5,
    initials: "MR",
    gradient: "from-violet-500 to-purple-500",
    quote:
      "I believe the best way to learn machine learning is to build it. Every algorithm I study becomes a project I can run, share and improve.",
  },
  {
    id: "t2",
    name: "On the Data",
    role: "Features first",
    company: "Core Principle",
    rating: 5,
    initials: "ML",
    gradient: "from-blue-500 to-cyan-500",
    quote:
      "Models are only as good as the data behind them. I spend most of my time on EDA, cleaning and feature engineering before touching an algorithm.",
  },
  {
    id: "t3",
    name: "On Sharing",
    role: "Open by default",
    company: "GitHub Practice",
    rating: 5,
    initials: "OS",
    gradient: "from-emerald-500 to-teal-500",
    quote:
      "Every project goes on GitHub. Documenting and sharing my work keeps me accountable and helps other learners on the same path.",
  },
  {
    id: "t4",
    name: "On Domain",
    role: "ML + Engineering",
    company: "Industrial Focus",
    rating: 5,
    initials: "IE",
    gradient: "from-rose-500 to-orange-500",
    quote:
      "Connecting machine learning to my industrial engineering background — like supply-chain risk — makes the work genuinely useful, not just academic.",
  },
  {
    id: "t5",
    name: "On Curiosity",
    role: "Always learning",
    company: "Growth Mindset",
    rating: 5,
    initials: "AI",
    gradient: "from-amber-500 to-pink-500",
    quote:
      "From disease prediction to RAG assistants, I follow my curiosity wherever it leads — one project, one new technique at a time.",
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  date: string;
  type: "Award" | "Hackathon" | "Competition" | "Scholarship" | "Recognition";
  description: string;
  badge: string;
};

export const achievements: Achievement[] = [
  {
    id: "a1",
    title: "20+ Machine Learning Projects on GitHub",
    org: "github.com/mizanur-rahman-21",
    date: "2024–2026",
    type: "Recognition",
    description: "Built and open-sourced a large portfolio of end-to-end ML prediction & classification systems.",
    badge: "🏆",
  },
  {
    id: "a2",
    title: "Built a Retrieval-Augmented Medical Assistant",
    org: "FAIR-RAG Project",
    date: "2026",
    type: "Award",
    description: "Designed an LLM assistant grounded in trusted medical knowledge with citation-backed answers.",
    badge: "🤖",
  },
  {
    id: "a3",
    title: "8+ Disease & Health Prediction Models",
    org: "Healthcare ML",
    date: "2025–2026",
    type: "Recognition",
    description: "Implemented predictors for diabetes, heart disease, breast cancer, Parkinson's and more.",
    badge: "🩺",
  },
  {
    id: "a4",
    title: "Bridged Industrial Engineering with AI",
    org: "KUET · Supply Chain",
    date: "2026",
    type: "Scholarship",
    description: "Applied machine learning to supply-chain risk detection, fusing two disciplines.",
    badge: "🏭",
  },
  {
    id: "a5",
    title: "Mastered the Full ML Workflow",
    org: "Self-directed",
    date: "2023–2025",
    type: "Competition",
    description: "From EDA and feature engineering to model deployment with Streamlit — end to end.",
    badge: "🎯",
  },
  {
    id: "a6",
    title: "Active Open Source Contributor",
    org: "GitHub Community",
    date: "2024–Present",
    type: "Recognition",
    description: "Sharing reproducible, documented ML notebooks for the learning community.",
    badge: "🌐",
  },
];

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: number;
  featured: boolean;
  views: number;
  content: { heading?: string; body: string; code?: string; lang?: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "features-before-models",
    title: "Why Your Features Matter More Than Your Model",
    excerpt:
      "After 20+ ML projects, the lesson is clear: time spent on EDA and feature engineering beats swapping algorithms almost every time.",
    category: "Machine Learning",
    tags: ["Feature Engineering", "EDA", "Practice"],
    date: "2026-02-10",
    readTime: 7,
    featured: true,
    views: 4200,
    content: [
      {
        body: "When I started, I'd jump straight to training fancy models. Across dozens of projects I learned the hard way that the single biggest lever is usually the data, not the algorithm.",
      },
      { heading: "Look before you leap", body: "Always start with exploratory data analysis — distributions, missing values, correlations. Patterns you spot here shape your features." },
      {
        body: "A simple scaled feature set often outperforms an untuned complex model:",
        code: "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)",
        lang: "python",
      },
      { heading: "Takeaway", body: "Before you reach for a more powerful model, audit and engineer your features. It's almost always the higher-ROI move." },
    ],
  },
  {
    id: "b2",
    slug: "deploy-models-with-streamlit",
    title: "Turning Notebooks Into Apps with Streamlit",
    excerpt: "A model no one can use might as well not exist. Here's how I wrap ML models into clean, shareable web apps.",
    category: "Deployment",
    tags: ["Streamlit", "Deployment", "Python"],
    date: "2026-01-05",
    readTime: 6,
    featured: true,
    views: 5100,
    content: [
      { body: "Training a model is half the job. The other half is letting people actually use it. Streamlit makes this almost effortless." },
      { heading: "Persist, then serve", body: "Save your trained model once, then load it in the app." },
      {
        body: "Save with joblib and load it back:",
        code: "import joblib\njoblib.dump(model, 'model.pkl')\nmodel = joblib.load('model.pkl')",
        lang: "python",
      },
      { heading: "Build the UI", body: "A few st.input widgets and an st.button are all it takes to ship an interactive predictor." },
    ],
  },
  {
    id: "b3",
    slug: "rag-without-hallucinations",
    title: "Building a RAG Assistant That Doesn't Hallucinate",
    excerpt: "What I learned building FAIR-RAG — grounding an LLM in trusted sources so its answers stay honest.",
    category: "AI",
    tags: ["RAG", "LLMs", "NLP"],
    date: "2025-12-12",
    readTime: 9,
    featured: false,
    views: 6800,
    content: [
      { body: "Retrieval-augmented generation is the most practical path to trustworthy LLM apps. Building FAIR-RAG taught me what really matters." },
      { heading: "Chunk with intent", body: "Naive fixed-size chunks leak context. Align chunks to logical sections of your knowledge base." },
      { heading: "Always cite", body: "Return the source passages with every answer — it keeps the model honest and lets users verify." },
      {
        body: "A minimal similarity search:",
        code: "def top_k(query_vec, doc_vecs, k=3):\n    scores = doc_vecs @ query_vec\n    return scores.argsort()[-k:][::-1]",
        lang: "python",
      },
    ],
  },
  {
    id: "b4",
    slug: "learning-ml-by-building",
    title: "Learning Machine Learning by Building 20+ Projects",
    excerpt: "My roadmap for going from beginner to shipping real ML systems — one project at a time.",
    category: "Career",
    tags: ["Learning", "Career", "Python"],
    date: "2025-10-20",
    readTime: 8,
    featured: false,
    views: 3900,
    content: [
      { body: "Courses teach concepts; projects build intuition. Here's the path that worked for me." },
      { heading: "Start with regression", body: "House and car price prediction taught me the full supervised workflow end to end." },
      { heading: "Then classification", body: "Disease prediction projects (diabetes, heart, breast cancer) made evaluation metrics click." },
      {
        body: "Set a reproducible baseline:",
        code: "from sklearn.model_selection import train_test_split\nX_tr, X_te, y_tr, y_te = train_test_split(\n    X, y, test_size=0.2, random_state=42)",
        lang: "python",
      },
    ],
  },
];

export const faqs = [
  {
    q: "What kind of projects do you build?",
    a: "End-to-end machine learning systems — prediction & classification models, recommendation engines, NLP/RAG apps, and data science analyses, often deployed as Streamlit web apps.",
  },
  {
    q: "Are you open to internships or collaborations?",
    a: "Yes! I'm actively open to ML/Data Science internships, research collaborations and freelance ML projects. Reach out via the contact form or LinkedIn.",
  },
  {
    q: "What's your tech stack?",
    a: "Python with scikit-learn, Pandas, NumPy and Matplotlib for ML & data science, Streamlit for deployment, plus LangChain & Hugging Face for LLM/RAG work.",
  },
  {
    q: "Can you help me learn machine learning?",
    a: "Happy to! All my projects are open on GitHub with documentation. Feel free to message me with questions or for learning resources.",
  },
];

/* ---------- GitHub-style data ---------- */
export const github = {
  username: "mizanur-rahman-21",
  followers: 26,
  following: 18,
  publicRepos: 22,
  totalStars: 38,
  contributions: generateContributions(),
  languages: [
    { name: "Python", pct: 78, color: "#3b82f6" },
    { name: "Jupyter Notebook", pct: 18, color: "#f59e0b" },
    { name: "Shell", pct: 2, color: "#22c55e" },
    { name: "Other", pct: 2, color: "#94a3b8" },
  ],
  pinnedRepos: [
    { name: "FAIR-RAG-Medical-Assistant", desc: "Bilingual RAG medical AI (WHO/ICMR/DGHS)", stars: 18, lang: "Python" },
    { name: "multiple_disease_web_app", desc: "Multi-disease Streamlit prediction app", stars: 12, lang: "Python" },
    { name: "Supply_Chain_Risk_Detection", desc: "ML for supply-chain disruption risk", stars: 9, lang: "Python" },
    { name: "Breast_Cancer_Classification", desc: "Neural-network tumour classifier", stars: 7, lang: "Python" },
  ],
  activity: [
    { type: "push", text: "Pushed commits to FAIR-RAG-Medical-Assistant", time: "2h ago" },
    { type: "star", text: "Starred scikit-learn/scikit-learn", time: "6h ago" },
    { type: "pr", text: "Updated multiple_disease_web_app", time: "1d ago" },
    { type: "release", text: "Added Supply Chain Risk Detection", time: "3d ago" },
    { type: "fork", text: "Explored huggingface/transformers", time: "5d ago" },
  ],
};

function generateContributions(): number[][] {
  const weeks: number[][] = [];
  let seed = 11;
  for (let w = 0; w < 52; w++) {
    const days: number[] = [];
    for (let d = 0; d < 7; d++) {
      seed = (seed * 9301 + 49297) % 233280;
      const r = seed / 233280;
      const weekend = d >= 5 ? 0.3 : 1;
      const v = r * weekend;
      const level = v > 0.8 ? 4 : v > 0.58 ? 3 : v > 0.36 ? 2 : v > 0.16 ? 1 : 0;
      days.push(level);
    }
    weeks.push(days);
  }
  return weeks;
}

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Research", to: "/research" },
  { label: "Experience", to: "/experience" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const moreLinks = [
  { label: "Education", to: "/education" },
  { label: "Certifications", to: "/certifications" },
  { label: "Resume", to: "/resume" },
];
