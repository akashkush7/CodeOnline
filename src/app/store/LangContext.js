// context/LanguageContext.js
"use client";

import { createContext, useState, useContext } from "react";

// Create the context with matching default shape
const LanguageContext = createContext({
  selectedLanguage: "python",
  isDark: false,
  setSelectedLanguage: () => {},
  setIsDark: () => {},
  languages: [],
  fileName: "Main.py",
  setFileName: () => {},
});

// Provider component
export const LanguageProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [fileName, setFileName] = useState("Main.py");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const languages = [
    {
      name: "Python",
      id: "python",
      lang: "PYTHON3_8",
      comment: '# Enter your "Python" code here',
      ext: ".py",
    },
    {
      name: "JavaScript",
      id: "javascript",
      lang: "JAVASCRIPT_NODE",
      comment: '// Enter your "JavaScript" code here',
      ext: ".js",
    },
    {
      name: "Java",
      id: "java",
      lang: "JAVA14",
      comment: '// Enter your "Java" code here',
      ext: ".java",
    },
    {
      name: "C++",
      id: "cpp",
      lang: "CPP17",
      comment: '// Enter your "C++" code here',
      ext: ".cpp",
    },
    {
      name: "C",
      id: "c",
      lang: "C",
      comment: '// Enter your "C" code here',
      ext: ".c",
    },
    {
      name: "C#",
      id: "csharp",
      lang: "CSHARP",
      comment: '// Enter your "C#" code here',
      ext: ".cs",
    },
    {
      name: "Go",
      id: "go",
      lang: "GO",
      comment: '// Enter your "Go" code here',
      ext: ".go",
    },
    {
      name: "Ruby",
      id: "ruby",
      lang: "RUBY",
      comment: '# Enter your "Ruby" code here',
      ext: ".rb",
    },
    {
      name: "PHP",
      id: "php",
      lang: "PHP",
      comment: '// Enter your "PHP" code here',
      ext: ".php",
    },
    {
      name: "Rust",
      id: "rust",
      lang: "RUST",
      comment: '// Enter your "Rust" code here',
      ext: ".rs",
    },
  ];

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        languages,
        isDark,
        setIsDark,
        fileName,
        setFileName,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the context
export const useLanguage = () => useContext(LanguageContext);
