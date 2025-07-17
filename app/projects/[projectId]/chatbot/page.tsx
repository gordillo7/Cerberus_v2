"use client"
import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Send, Bot, User, Trash2, Download } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ProjectChatbot() {
  const { projectId } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Hello! I'm Orthrus, your AI security assistant. I can help you analyze scan results, explain vulnerabilities, and provide security recommendations for this project. How can I assist you today?",
        timestamp: new Date(),
      },
    ])
  }, [projectId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `I understand you're asking about "${input}". Based on the current project data, I can provide insights about security vulnerabilities, scan results, and recommendations. Here's what I found:\n\n• **Security Analysis**: The target shows several potential areas of concern\n• **Recommendations**: Consider implementing additional security measures\n• **Next Steps**: Run a comprehensive scan for detailed analysis\n\nWould you like me to elaborate on any specific aspect?`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: "Chat cleared. How can I help you with your security analysis?",
        timestamp: new Date(),
      },
    ])
  }

  const exportChat = () => {
    const chatData = messages
      .map((msg) => `[${msg.timestamp.toLocaleString()}] ${msg.role.toUpperCase()}: ${msg.content}`)
      .join("\n\n")

    const blob = new Blob([chatData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chat-export-${projectId}-${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Chat Header */}
      <div className="glass-effect rounded-t-xl p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600/20 rounded-lg">
              <Bot className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Orthrus AI Assistant</h2>
              <p className="text-gray-400 text-sm">Security analysis and recommendations</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={exportChat}
              className="flex items-center space-x-1 px-3 py-1 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"
            >
              <Download className="w-3 h-3" />
              <span className="text-sm">Export</span>
            </button>
            <button
              onClick={clearChat}
              className="flex items-center space-x-1 px-3 py-1 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span className="text-sm">Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 glass-effect rounded-none p-6 overflow-auto">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-4 ${
                message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div className={`p-2 rounded-lg ${message.role === "user" ? "bg-indigo-600/20" : "bg-gray-800/50"}`}>
                {message.role === "user" ? (
                  <User className="w-5 h-5 text-indigo-400" />
                ) : (
                  <Bot className="w-5 h-5 text-green-400" />
                )}
              </div>
              <div className={`flex-1 ${message.role === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block max-w-3xl p-4 rounded-lg ${
                    message.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-800/50 text-gray-100"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{message.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-800/50 rounded-lg">
                <Bot className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <div className="inline-block p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="glass-effect rounded-b-xl p-6 border-t border-gray-800">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ask about vulnerabilities, security recommendations, or scan results..."
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  )
}
