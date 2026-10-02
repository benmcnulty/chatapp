import { useState } from "react";

import Message from "./components/Message";
import Input from "./components/Input";
import History from "./components/History";
import Clear from "./components/Clear";

import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);

  const handleSubmit = () => {
    const question = input.trim();
    if (!question) return;
    // This tutorial demonstrates UI state only. No provider request or browser key.
    const answer = `Local demo reply to: ${question}`;
    setMessages((previous) => [
      ...previous,
      { role: "user", content: question },
      { role: "assistant", content: answer },
    ]);
    setHistory((previous) => [...previous, { question, answer }]);
    setInput("");
  };

  const clear = () => {
    setMessages([]);
    setHistory([]);
  };

  return (
    <main className="App" aria-label="Local chat UI demo">
      <div className="Column">
        <h3 className="Title">Chat Messages</h3>
        <p>Local UI demo: replies are deterministic examples, not AI output. Messages are not sent to a provider.</p>
        <div className="Content" aria-live="polite">
          {messages.map((el, i) => <Message key={i} role={el.role} content={el.content} />)}
        </div>
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onClick={input.trim() ? handleSubmit : undefined}
        />
      </div>
      <div className="Column">
        <h3 className="Title">History</h3>
        <div className="Content">
          {history.map((entry, i) => (
            <History
              key={i}
              question={entry.question}
              onClick={() => setMessages([
                { role: "user", content: entry.question },
                { role: "assistant", content: entry.answer },
              ])}
            />
          ))}
        </div>
        <Clear onClick={clear} />
      </div>
    </main>
  );
}
