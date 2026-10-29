import { useEffect, useRef, useState } from "react"
import io from 'socket.io-client'

function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    socketRef.current.emit("message", {
      content: input
    })
    setMessages((prev) => [...prev, { content: input, outgoing: true }])
    setInput("")
  }

  useEffect(() => {
    const socket = io();

    socketRef.current = socket;

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    })

    return () => {
      socket.disconnect();
    }
  },[])

  return (
    <>
      <main className="chat-page">
        <div className="conversation-area">
          <div className="messages">
            {
              messages.map((msg, index) => (
                <div key={index} className={`message ${msg.outgoing ? "outgoing" : "incoming"}`}>{ msg.content}</div>
              ))
            }
            
          </div>
          <div className="input-area">
            <input type="text" value={input} placeholder="Enter your message..." onChange={(e) => setInput(e.target.value)}/>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
