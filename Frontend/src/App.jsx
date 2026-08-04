import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import "./App.css";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";
import { MyContext } from "./MyContext";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);

  const [currThreadId, setCurrThreadId] = useState(uuidv1());

  const [prevChats, setPrevChats] = useState([]);

  const [newChat, setNewChat] = useState(true);

  const [allThreads, setAllThreads] = useState([]);

  // Mobile Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const providerValues = {
    prompt,
    setPrompt,

    reply,
    setReply,

    currThreadId,
    setCurrThreadId,

    prevChats,
    setPrevChats,

    newChat,
    setNewChat,

    allThreads,
    setAllThreads,

    sidebarOpen,
    setSidebarOpen,
  };

  return (
    <MyContext.Provider value={providerValues}>
      <div className="app">
        {/* Overlay */}

        {sidebarOpen && (
          <div className="overlay" onClick={() => setSidebarOpen(false)}></div>
        )}

        <Sidebar />

        <ChatWindow />
      </div>
    </MyContext.Provider>
  );
}

export default App;
