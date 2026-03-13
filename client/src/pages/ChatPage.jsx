import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Brain,
  User,
  Sparkles,
  AlertCircle,
  Info,
  Zap,
} from "lucide-react";
import { sendMessage } from "../api";

const quickSuggestions = [
  {
    label: "Check symptoms",
    prompt: "I would like to check some symptoms I have been experiencing.",
  },
  {
    label: "Healthy lifestyle tips",
    prompt:
      "What are some evidence-based tips for maintaining a healthy lifestyle?",
  },
  {
    label: "Common illnesses",
    prompt: "What are the most common illnesses and how can I prevent them?",
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
        <Brain className="w-4 h-4 text-primary-600" />
      </div>
      <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-gray-500 rounded-full typing-dot" />
          <span className="w-2 h-2 bg-gray-500 rounded-full typing-dot" />
          <span className="w-2 h-2 bg-gray-500 rounded-full typing-dot" />
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`flex items-start gap-3 animate-fade-in ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-primary-600" : "bg-primary-100"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Brain className="w-4 h-4 text-primary-600" />
        )}
      </div>
      <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-primary-600 text-white rounded-tr-sm"
              : "bg-white/10 text-gray-200 rounded-tl-sm"
          }`}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
        <span className="text-xs text-gray-500 mt-1 block px-1">{time}</span>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    setInput("");
    setError(null);

    const userMessage = {
      role: "user",
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data } = await sendMessage(conversationId, messageText);
      setConversationId(data.conversationId);

      const assistantMessage = {
        role: "assistant",
        content: data.response,
        timestamp: data.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        "Failed to get a response. Please try again.";
      setError(errorMessage);
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">AI Health Chat</h2>
          <p className="text-xs text-amber-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full inline-block" />
            Chat limit active — Expanding costs may apply
          </p>
        </div>
      </div>

      {/* Usage Info Banner */}
      <div className="px-4 sm:px-6 py-3 bg-amber-900/20 border-b border-amber-500/30">
        <div className="max-w-3xl mx-auto flex items-start gap-3">
          <Zap className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-amber-200 font-medium">
              Usage Limit Notice
            </p>
            <p className="text-xs text-amber-300/80 mt-1">
              You have a limited chat allowance. Expanding your usage may incur
              additional costs. Please use this service responsibly.
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
        {!hasMessages ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Start a Health Conversation
            </h3>
            <p className="text-gray-400 text-sm max-w-md mb-8">
              Ask about symptoms, health advice, or medical information. Your AI
              healthcare assistant is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {quickSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion.prompt)}
                  className="bg-white/10 border border-white/20 text-gray-300 px-4 py-2.5 rounded-xl text-sm hover:bg-primary-500/20 hover:border-primary-400/30 hover:text-white transition-all"
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="px-6 pb-2">
          <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-sm text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        </div>
      )}

      {/* Quick suggestions when there are messages */}
      {hasMessages && !isLoading && (
        <div className="px-6 pb-2">
          <div className="max-w-3xl mx-auto flex gap-2 overflow-x-auto pb-1">
            {quickSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(suggestion.prompt)}
                className="flex-shrink-0 bg-white/10 border border-white/20 text-gray-400 px-3 py-1.5 rounded-lg text-xs hover:bg-primary-500/20 hover:border-primary-400/30 hover:text-white transition-all"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 sm:px-6 py-4 bg-white/5 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-white/10 rounded-2xl border border-white/20 px-4 py-3 focus-within:border-primary-400/50 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about symptoms, health advice, or medical information..."
              className="flex-1 bg-transparent border-none outline-none resize-none text-sm text-gray-200 placeholder-gray-500 max-h-32"
              style={{ minHeight: "24px" }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-xl transition-all flex-shrink-0 ${
                input.trim() && !isLoading
                  ? "bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            AI responses are for informational purposes only. Always consult a
            healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}
