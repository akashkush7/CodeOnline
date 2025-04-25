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
      comment: '# Enter your "Python" code here',
      ext: ".py",
    },
    {
      name: "JavaScript",
      id: "javascript",
      comment: '// Enter your "JavaScript" code here',
      ext: ".js",
    },
    {
      name: "Java",
      id: "java",
      comment: '// Enter your "Java" code here',
      ext: ".java",
    },
    {
      name: "C++",
      id: "cpp",
      comment: '// Enter your "C++" code here',
      ext: ".cpp",
    },
    {
      name: "C",
      id: "c",
      comment: '// Enter your "C" code here',
      ext: ".c",
    },
    {
      name: "C#",
      id: "csharp",
      comment: '// Enter your "C#" code here',
      ext: ".cs",
    },
    {
      name: "Go",
      id: "go",
      comment: '// Enter your "Go" code here',
      ext: ".go",
    },
    {
      name: "Ruby",
      id: "ruby",
      comment: '# Enter your "Ruby" code here',
      ext: ".rb",
    },
    {
      name: "PHP",
      id: "php",
      comment: '// Enter your "PHP" code here',
      ext: ".php",
    },
    {
      name: "Rust",
      id: "rust",
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
