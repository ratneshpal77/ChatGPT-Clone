import { useContext, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import { MyContext } from "./MyContext";
import "./Sidebar.css";
import logo from "./assets/blacklogo.png";

const api = import.meta.env.VITE_API_URL;

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
    sidebarOpen,
    setSidebarOpen,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch(`${api}/api/thread`);
      const res = await response.json();

      const filtered = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));

      setAllThreads(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
    setSidebarOpen(false);
  };

  const changeThread = async (threadId) => {
    setCurrThreadId(threadId);

    try {
      const response = await fetch(`${api}/api/thread/${threadId}`);
      const res = await response.json();

      setPrevChats(res);
      setReply(null);
      setNewChat(false);
      setSidebarOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      await fetch(`${api}/api/thread/${threadId}`, {
        method: "DELETE",
      });

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId),
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="sidebarTop">
        <button onClick={createNewChat}>
          <img src={logo} className="logo" alt="logo" />
          <span>
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
        </button>
      </div>

      <ul className="history">
        {allThreads?.map((thread) => (
          <li
            key={thread.threadId}
            onClick={() => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : ""}
          >
            <span className="threadTitle">{thread.title}</span>

            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>Made By Ratnesh Pal ❤️</p>
      </div>
    </aside>
  );
}

export default Sidebar;
