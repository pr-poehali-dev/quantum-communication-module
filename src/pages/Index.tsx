import { useState } from "react";
import ChatNavbar from "@/components/ChatNavbar";
import ChatSidebar from "@/components/ChatSidebar";
import ChatArea from "@/components/ChatArea";
import AuthModal from "@/components/AuthModal";

interface Message {
  id: number;
  username: string;
  avatar: string;
  text: string;
  time: string;
  color: string;
}

interface User {
  username: string;
  id: string;
}

const COLORS = [
  "#5865f2", "#3ba55c", "#faa61a", "#ed4245", "#eb459e",
  "#7c3aed", "#0891b2", "#16a34a", "#d97706", "#dc2626",
];

const DEMO_MESSAGES: Message[] = [
  { id: 1, username: "ЧатБот", avatar: "Ч", text: "Добро пожаловать в открытый чат! Здесь можно общаться с людьми со всего мира. Зарегистрируйтесь, чтобы начать писать.", time: "12:00", color: "#5865f2" },
  { id: 2, username: "Алексей", avatar: "А", text: "Привет всем! Отличный чат, рад тут быть 👋", time: "12:05", color: "#3ba55c" },
  { id: 3, username: "Марина", avatar: "М", text: "Привет! Как у всех дела сегодня?", time: "12:07", color: "#eb459e" },
  { id: 4, username: "Дмитрий", avatar: "Д", text: "Всем хорошего дня! Погода сегодня замечательная ☀️", time: "12:10", color: "#faa61a" },
  { id: 5, username: "Ольга", avatar: "О", text: "Присоединилась к чату. Тут уютно 🌸", time: "12:15", color: "#7c3aed" },
];

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileUsersOpen, setMobileUsersOpen] = useState(false);
  const [modal, setModal] = useState<"none" | "login" | "register">("none");
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getColor = (username: string) => {
    let hash = 0;
    for (let i = 0; i < username.length; i++) hash = username.charCodeAt(i) + ((hash << 5) - hash);
    return COLORS[Math.abs(hash) % COLORS.length];
  };

  const formatTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  };

  const handleSend = () => {
    if (!inputText.trim() || !user) return;
    const newMsg: Message = {
      id: Date.now(),
      username: user.username,
      avatar: user.username[0].toUpperCase(),
      text: inputText.trim(),
      time: formatTime(),
      color: getColor(user.username),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  const handleAuth = async (type: "login" | "register") => {
    setError("");
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Заполните все поля");
      return;
    }
    if (formData.username.length < 3) {
      setError("Имя должно быть не короче 3 символов");
      return;
    }
    if (formData.password.length < 6) {
      setError("Пароль должен быть не короче 6 символов");
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      const newUser: User = { username: formData.username, id: Date.now().toString() };
      setUser(newUser);
      setModal("none");
      setFormData({ username: "", password: "" });
      if (type === "register") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            username: "Система",
            avatar: "С",
            text: `${formData.username} присоединился(-ась) к чату! 🎉`,
            time: formatTime(),
            color: "#5865f2",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-[#36393f] text-white overflow-x-hidden">
      <ChatNavbar
        user={user}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onLogin={() => setModal("login")}
        onRegister={() => setModal("register")}
        onLogout={handleLogout}
        getColor={getColor}
      />

      <div className="flex" style={{ height: "calc(100vh - 73px)" }}>
        <ChatSidebar
          user={user}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          onLoginClick={() => setModal("login")}
          getColor={getColor}
        />

        <ChatArea
          user={user}
          messages={messages}
          inputText={inputText}
          setInputText={setInputText}
          mobileUsersOpen={mobileUsersOpen}
          setMobileUsersOpen={setMobileUsersOpen}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
          onSend={handleSend}
          onOpenLogin={() => setModal("login")}
          onOpenRegister={() => setModal("register")}
          getColor={getColor}
        />
      </div>

      {modal !== "none" && (
        <AuthModal
          modal={modal}
          formData={formData}
          setFormData={setFormData}
          error={error}
          loading={loading}
          onAuth={handleAuth}
          onClose={() => setModal("none")}
          onSwitch={(type) => { setModal(type); setError(""); }}
        />
      )}
    </div>
  );
};

export default Index;
