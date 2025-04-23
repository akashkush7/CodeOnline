"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useLanguage } from "../store/LangContext";

const Canvas = () => {
  const [code, setCode] = useState();
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("editor");
  const [isLoading, setIsLoading] = useState(false);
  const { isDark, languages, selectedLanguage, setSelectedLanguage } =
    useLanguage();

  const handleClick = () => {
    setIsLoading(true);
    setActiveTab("output");
    executeCode();
  };

  const executeCode = async () => {
    try {
      // Using fetch API to send the POST request to Piston API
      const response = await fetch("https://emkc.org/api/v1/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: selectedLanguage, // e.g., 'python3'
          source: code,
        }),
      });

      const data = await response.json();

      // Handle the response from the API
      if (data.error) {
        setOutput(`Error: ${data.error}`);
      } else {
        setOutput(data.output);
      }
      setIsLoading(false);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSelectedLanguage(e.target.value);
    setCode(languages[e.target.options.selectedIndex].comment);
  };

  return (
    <>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Language Selector and Label */}
            <div className="flex items-center gap-2">
              <h6 className="m-0 text-white">Language:</h6>
              <select
                name="language"
                value={selectedLanguage}
                onChange={handleChange}
                className="text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm"
              >
                {languages.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Execute Button */}
            <button
              type="button"
              className="flex items-center p-1 bg-blue-600 text-white rounded-sm hover:bg-blue-700 focus:outline-none disabled:opacity-50"
              onClick={handleClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
              ) : (
                <>
                  <h6 className="px-1 hidden sm:block">Run</h6>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="block sm:hidden"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="w-full h-[600px] flex flex-col sm:flex-row shadow p-2">
        {/* Tab System for Small Screens */}
        <div className="sm:hidden flex justify-between mb-4">
          <button
            className={`p-1 rounded-sm ${
              activeTab === "editor" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("editor")}
          >
            Editor
          </button>
          <button
            className={`p-1 rounded-sm ${
              activeTab === "output" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("output")}
          >
            Output
          </button>
        </div>

        {/* Editor Column */}
        <div
          className={`flex-1 ${
            activeTab === "editor" ? "block" : "hidden"
          } sm:block`}
        >
          <Editor
            height="100%"
            defaultLanguage="python"
            language={selectedLanguage}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme={isDark ? "vs-dark" : "vs-light"}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
              automaticLayout: true,
              scrollBeyondLastLine: false,
              formatOnType: true,
              formatOnPaste: true,
              snippetSuggestions: "inline",
            }}
          />
        </div>

        {/* Output Column */}
        <div
          className={`flex-1 p-2 ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } ${activeTab === "output" ? "block" : "hidden"} sm:block`}
        >
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold mb-2">Output</h3>
            <button
              type="button"
              className="flex items-center py-1 px-2 text-white bg-gray-800 border border-white focus:outline-none disabled:opacity-50"
              onClick={() => setOutput("")}
            >
              Clear
            </button>
          </div>
          {output}
          <pre>{/* Output will be displayed here */}</pre>
        </div>
      </div>
    </>
  );
};

export default Canvas;
