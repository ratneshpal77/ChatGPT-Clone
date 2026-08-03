import "highlight.js/styles/github-dark.css";
import { useContext, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "./Chat.css";
import { MyContext } from "./MyContext";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);

  const [latestReply, setLatestReply] = useState(null);

  const bottomRef = useRef(null);

  // Typing Effect
  useEffect(() => {
    if (reply === null) {
      setLatestReply(null);
      return;
    }

    if (!prevChats.length) return;

    const words = reply.split(" ");

    let index = 0;

    const interval = setInterval(() => {
      setLatestReply(words.slice(0, index + 1).join(" "));

      index++;

      if (index >= words.length) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [reply, prevChats]);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [prevChats, latestReply]);

  return (
    <div className="chats">
      {newChat && prevChats.length === 0 && (
        <div className="welcome">
          <h1>How can I help you today?</h1>
          <p>
            Ask anything about React, Node.js, Express, MongoDB, JavaScript, DSA
            or AI.
          </p>
        </div>
      )}

      {prevChats.slice(0, -1).map((chat, index) => (
        <div
          key={index}
          className={chat.role === "user" ? "userDiv" : "gptDiv"}
        >
          {chat.role === "user" ? (
            <div className="userMessage">{chat.content}</div>
          ) : (
            <div className="markdownBody">
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}

      {prevChats.length > 0 && (
        <div className="gptDiv">
          <div className="markdownBody">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {latestReply ?? prevChats[prevChats.length - 1].content}
            </ReactMarkdown>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

export default Chat;
