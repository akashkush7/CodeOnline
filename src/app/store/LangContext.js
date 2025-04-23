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
});

// Provider component
export const LanguageProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const languages = [
    {
      name: "Python",
      id: "python",
      comment: '# Enter your "Python" code here',
    },
    {
      name: "JavaScript",
      id: "javascript",
      comment: '// Enter your "JavaScript" code here',
    },
    { name: "Java", id: "java", comment: '// Enter your "Java" code here' },
    { name: "C++", id: "cpp", comment: '// Enter your "C++" code here' },
    { name: "C", id: "c", comment: '// Enter your "C" code here' },
    { name: "C#", id: "csharp", comment: '// Enter your "C#" code here' },
    { name: "Go", id: "go", comment: '// Enter your "Go" code here' },
    { name: "Ruby", id: "ruby", comment: '# Enter your "Ruby" code here' },
    { name: "PHP", id: "php", comment: '// Enter your "PHP" code here' },
    { name: "Rust", id: "rust", comment: '// Enter your "Rust" code here' },
  ];

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        languages,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the context
export const useLanguage = () => useContext(LanguageContext);
