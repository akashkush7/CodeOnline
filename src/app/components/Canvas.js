"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useLanguage } from "../store/LangContext";

const Canvas = () => {
  const {
    fileName,
    setFileName,
    isDark,
    languages,
    selectedLanguage,
    setSelectedLanguage,
  } = useLanguage();
  const [code, setCode] = useState(
    `# ${fileName}\n# Enter your "Python" code here.`
  );
  const [inputValue, setInputValue] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("editor");
  const [isLoading, setIsLoading] = useState(false);
  const [ext, setExt] = useState("py");

  const handleClick = () => {
    setIsLoading(true);
    setActiveTab("output");
    executeCode();
  };

  const executeCode = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: selectedLanguage,
          version: "*",
          files: [
            {
              name: fileName,
              content: code,
            },
          ],
          stdin: inputValue,
        }),
      });

      const data = await response.json();

      if (data.run) {
        const { stdout, stderr } = data.run;
        const combinedOutput = [stdout, stderr].filter(Boolean).join("\n");
        setOutput(combinedOutput || "Executed successfully, but no output.");
      } else if (data.error) {
        setOutput(`Error: ${data.error}`);
      } else {
        setOutput("Unknown response structure.");
      }

      setIsLoading(false);
    } catch (error) {
      setOutput(`Exception: ${error.message}`);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSelectedLanguage(e.target.value);
    const item = languages[e.target.options.selectedIndex];
    setExt(item.ext);
    const newFileName = "Main" + item.ext;
    setFileName(newFileName);
    const comm = item.comment.split(" ")[0];
    setCode(`${comm} ${newFileName}\n` + item.comment);
  };

  const handleSave = () => {
    const blob = new Blob([code], { type: ext });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
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
            <div className="flex">
              {/* Save Button */}
              <button
                type="button"
                className="flex items-center p-1 mx-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                onClick={handleSave}
              >
                <h6 className="px-1 hidden sm:block">Save</h6>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 block sm:hidden"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7l-4-4zM16 21v-6H8v6M8 3v4h8V3"
                  />
                </svg>
              </button>
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
          className={`flex-1 overflow-y-auto p-2 ${
            isDark ? "bg-gray-800 text-white" : "bg-white text-gray-800"
          } ${activeTab === "output" ? "block" : "hidden"} sm:block`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold mb-2">Input</h3>
              <button
                type="button"
                className="flex items-center py-1 px-2 text-white bg-gray-800 border border-white focus:outline-none disabled:opacity-50"
                onClick={() => setInputValue("")}
              >
                Clear
              </button>
            </div>

            <textarea
              className={`w-full min-h-20 p-4 ${
                isDark ? "bg-black text-green-400" : "bg-white text-gray-800"
              } rounded overflow-auto font-mono whitespace-pre-wrap resize-none border border-gray-700`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              spellCheck={false}
              placeholder="Type your program's input here, just like you'd enter it in a terminal"
            />

            <div className="flex justify-between mt-4">
              <h3 className="text-xl font-semibold mb-2">Output</h3>
              <button
                type="button"
                className="flex items-center py-1 px-2 text-white bg-gray-800 border border-white focus:outline-none disabled:opacity-50"
                onClick={() => setOutput("")}
              >
                Clear
              </button>
            </div>

            <pre
              className={`w-full flex-grow p-4 ${
                isDark ? "bg-black text-green-400" : "bg-white text-gray-800"
              } rounded overflow-auto font-mono whitespace-pre-wrap resize-none border border-gray-700`}
            >
              {output}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
