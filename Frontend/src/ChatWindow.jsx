import { useContext, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import Chat from "./Chat";
import "./ChatWindow.css";
import { MyContext } from "./MyContext";

const api = import.meta.env.VITE_API_URL;

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
    sidebarOpen,
    setSidebarOpen,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setNewChat(false);

    try {
      const response = await fetch(`${api}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: prompt,
          threadId: currThreadId,
        }),
      });

      const res = await response.json();
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
    }

    setPrompt("");
  }, [reply]);

  return (
    <div className="chatWindow">
      <div className="navbar">
        <div className="navLeft">
          <i
            className="fa-solid fa-bars menuIcon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          ></i>

          <span>SigmaGPT</span>
        </div>

        <div className="userIconDiv">
          <div className="userIcon" onClick={() => setIsOpen(!isOpen)}>
            <i className="fa-solid fa-user"></i>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i>
            Settings
          </div>

          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i>
            Upgrade Plan
          </div>

          <div className="dropDownItem">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Logout
          </div>
        </div>
      )}

      <div className="chatContent">
        <Chat />

        {loading && (
          <div className="loader">
            <ScaleLoader color="#10A37F" />
          </div>
        )}
      </div>

      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getReply()}
          />

          <button id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>

        <p className="info">
          SigmaGPT can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
