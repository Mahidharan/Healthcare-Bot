import React, { useState, useEffect } from "react";
import {
  History,
  MessageSquare,
  Trash2,
  Clock,
  ChevronDown,
  ChevronUp,
  Loader2,
  Brain,
  User,
  Inbox,
} from "lucide-react";
import { getChatHistory, deleteConversation } from "../api";

function ConversationCard({ conversation, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const firstUserMsg = conversation.messages?.find((m) => m.role === "user");
  const firstAiMsg = conversation.messages?.find((m) => m.role === "assistant");
  const messageCount = conversation.messages?.length || 0;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/15 transition-all overflow-hidden">
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            {formatDate(conversation.createdAt)} at{" "}
            {formatTime(conversation.createdAt)}
          </div>
          <div className="flex items-center gap-1">
            <span className="bg-primary-50 text-primary-600 text-xs font-medium px-2 py-0.5 rounded-md">
              {messageCount} messages
            </span>
          </div>
        </div>

        {/* User question */}
        {firstUserMsg && (
          <div className="flex items-start gap-3 mb-3">
            <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">You</p>
              <p className="text-sm text-gray-800 line-clamp-2">
                {firstUserMsg.content}
              </p>
            </div>
          </div>
        )}

        {/* AI response preview */}
        {firstAiMsg && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Brain className="w-3.5 h-3.5 text-primary-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">
                AI Assistant
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {firstAiMsg.content}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Expanded messages */}
      {expanded && conversation.messages?.length > 2 && (
        <div className="px-5 pb-4 space-y-3 border-t border-gray-100 pt-4">
          {conversation.messages.slice(2).map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "" : ""
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  msg.role === "user" ? "bg-primary-600" : "bg-primary-100"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-3 h-3 text-white" />
                ) : (
                  <Brain className="w-3 h-3 text-primary-600" />
                )}
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">
                  {msg.role === "user" ? "You" : "AI Assistant"}
                </p>
                <p className="text-sm text-gray-300">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="px-5 py-3 border-t border-white/10 bg-white/5 flex items-center justify-between">
        {conversation.messages?.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Show all messages
              </>
            )}
          </button>
        )}
        <button
          onClick={() => onDelete(conversation._id)}
          className="text-xs text-red-400 hover:text-red-600 font-medium flex items-center gap-1 ml-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default function ChatHistory() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const { data } = await getChatHistory();
      setConversations(data);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteConversation(id);
      setConversations((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
            <History className="w-5 h-5 text-primary-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Chat History</h1>
        </div>
        <p className="text-gray-400 text-sm">
          Review your previous conversations with the AI Healthcare Assistant.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : conversations.length === 0 ? (
        <div className="bg-white/5 rounded-2xl border border-white/10 p-12 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            No Conversations Yet
          </h3>
          <p className="text-gray-400 text-sm">
            Start a chat with the AI assistant to see your conversation history
            here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {conversations.map((conv) => (
            <ConversationCard
              key={conv._id}
              conversation={conv}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
