import { useState, useEffect, useRef } from "react";
import {
  Hash,
  Users,
  Mic,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Send,
  LogIn,
  UserPlus,
  MessageCircle,
  Globe,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

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

const ONLINE_USERS = ["Алексей", "Марина", "Дмитрий", "Ольга", "Серёжа", "Наташа", "Антон"];

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
      // Имитация авторизации — в следующем шаге подключим backend
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
      {/* Навигация */}
      <nav className="bg-[#2f3136] border-b border-[#202225] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">ОткрытыйЧат</h1>
              <p className="text-xs text-[#b9bbbe] hidden sm:block">Общайся свободно • Без ограничений</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#40444b] px-3 py-1.5 rounded-full">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: getColor(user.username) }}>
                    {user.username[0].toUpperCase()}
                  </div>
                  <span className="text-white text-sm font-medium">{user.username}</span>
                  <div className="w-2 h-2 bg-[#3ba55c] rounded-full"></div>
                </div>
                <Button variant="ghost" onClick={handleLogout} className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b] text-sm">
                  <LogOut className="w-4 h-4 mr-1" />
                  Выйти
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setModal("login")} className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b]">
                  <LogIn className="w-4 h-4 mr-2" />
                  Войти
                </Button>
                <Button onClick={() => setModal("register")} className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-5 py-2 rounded text-sm font-medium">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Регистрация
                </Button>
              </>
            )}
          </div>
          <Button variant="ghost" className="sm:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-[#202225] flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-2 py-1">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: getColor(user.username) }}>
                    {user.username[0].toUpperCase()}
                  </div>
                  <span className="text-white text-sm">{user.username}</span>
                </div>
                <Button variant="ghost" onClick={handleLogout} className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b] justify-start">
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => { setModal("login"); setMobileMenuOpen(false); }} className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b] justify-start">
                  <LogIn className="w-4 h-4 mr-2" />
                  Войти
                </Button>
                <Button onClick={() => { setModal("register"); setMobileMenuOpen(false); }} className="bg-[#5865f2] hover:bg-[#4752c4] text-white justify-start">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Регистрация
                </Button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Основной макет */}
      <div className="flex" style={{ height: "calc(100vh - 73px)" }}>
        {/* Боковая панель серверов */}
        <div className="hidden lg:flex w-[72px] bg-[#202225] flex-col items-center py-3 gap-2">
          <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-[2px] bg-[#36393f] rounded-full"></div>
          {["💬", "🌍", "🎮", "🎵"].map((emoji, i) => (
            <div key={i} className="w-12 h-12 bg-[#36393f] rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:bg-[#5865f2] text-xl">
              {emoji}
            </div>
          ))}
        </div>

        {/* Каналы */}
        <div className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 bg-[#2f3136] flex flex-col flex-shrink-0`}>
          <div className="p-4 border-b border-[#202225] flex items-center justify-between">
            <h2 className="text-white font-semibold">ОткрытыйЧат</h2>
            <Button variant="ghost" className="lg:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-1" onClick={() => setMobileSidebarOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 p-2 overflow-y-auto">
            <div className="mb-4">
              <div className="flex items-center gap-1 px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
                <ArrowRight className="w-3 h-3" />
                <span>Текстовые каналы</span>
              </div>
              <div className="mt-1 space-y-0.5">
                {[
                  { name: "общий", active: true },
                  { name: "знакомства", active: false },
                  { name: "юмор", active: false },
                  { name: "вопросы", active: false },
                ].map((ch) => (
                  <div key={ch.name} className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer ${ch.active ? "bg-[#393c43] text-white" : "text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43]"}`}>
                    <Hash className="w-4 h-4" />
                    <span className="text-sm">{ch.name}</span>
                    {ch.active && <div className="ml-auto w-2 h-2 bg-[#ed4245] rounded-full"></div>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
                <ArrowRight className="w-3 h-3" />
                <span>Голосовые</span>
              </div>
              <div className="mt-1 space-y-0.5">
                {["Лаундж", "Игровая"].map((ch) => (
                  <div key={ch} className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer">
                    <Mic className="w-4 h-4" />
                    <span className="text-sm">{ch}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Пользователь */}
          <div className="p-2 bg-[#292b2f] flex items-center gap-2">
            {user ? (
              <>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ backgroundColor: getColor(user.username) }}>
                  {user.username[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{user.username}</div>
                  <div className="text-[#3ba55c] text-xs">В сети</div>
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 bg-[#40444b] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#8e9297] text-sm">?</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#8e9297] text-sm">Гость</div>
                  <button onClick={() => setModal("login")} className="text-[#5865f2] text-xs hover:underline">Войти</button>
                </div>
              </>
            )}
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]">
                <Mic className="w-4 h-4 text-[#b9bbbe]" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]">
                <Settings className="w-4 h-4 text-[#b9bbbe]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Чат */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Заголовок чата */}
          <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2 flex-shrink-0">
            <Button variant="ghost" className="lg:hidden text-[#8e9297] hover:text-[#dcddde] hover:bg-[#40444b] p-1" onClick={() => setMobileSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <Hash className="w-5 h-5 text-[#8e9297]" />
            <span className="text-white font-semibold">общий</span>
            <div className="w-px h-6 bg-[#40444b] mx-2 hidden sm:block"></div>
            <span className="text-[#8e9297] text-sm hidden sm:block">Добро пожаловать! Общайся свободно 💬</span>
            <div className="ml-auto flex items-center gap-2 sm:gap-4">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
              <button onClick={() => setMobileUsersOpen(!mobileUsersOpen)} className="lg:hidden">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
              </button>
              <Users className="hidden lg:block w-5 h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
            </div>
          </div>

          <div className="flex flex-1 min-h-0">
            {/* Сообщения */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto">
                {/* Начало канала */}
                <div className="flex flex-col items-center py-6 border-b border-[#40444b] mb-4">
                  <div className="w-16 h-16 bg-[#5865f2] rounded-full flex items-center justify-center mb-3">
                    <Hash className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-1">Добро пожаловать в #общий!</h3>
                  <p className="text-[#8e9297] text-sm text-center">Это начало канала #общий. Здесь общаются все.</p>
                </div>

                {messages.map((msg, i) => {
                  const isPrev = i > 0 && messages[i - 1].username === msg.username;
                  return (
                    <div key={msg.id} className={`flex gap-3 group hover:bg-[#32353b] px-2 py-0.5 rounded ${isPrev ? "" : "mt-4"}`}>
                      {!isPrev ? (
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: msg.color }}>
                          {msg.avatar}
                        </div>
                      ) : (
                        <div className="w-10 flex-shrink-0"></div>
                      )}
                      <div className="flex-1 min-w-0">
                        {!isPrev && (
                          <div className="flex items-baseline gap-2 mb-0.5">
                            <span className="font-medium text-sm" style={{ color: msg.color }}>{msg.username}</span>
                            <span className="text-[#72767d] text-xs">Сегодня в {msg.time}</span>
                          </div>
                        )}
                        <p className="text-[#dcddde] text-sm leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Поле ввода */}
              <div className="p-3 sm:p-4 flex-shrink-0">
                {user ? (
                  <div className="bg-[#40444b] rounded-lg flex items-center gap-2 px-3 py-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={`Написать в #общий`}
                      className="flex-1 bg-transparent text-[#dcddde] placeholder-[#72767d] outline-none text-sm"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputText.trim()}
                      className="text-[#b9bbbe] hover:text-[#dcddde] disabled:opacity-40 transition-opacity"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#40444b] rounded-lg flex items-center justify-between px-4 py-3">
                    <span className="text-[#72767d] text-sm">Войдите или зарегистрируйтесь, чтобы написать...</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" onClick={() => setModal("login")} className="text-[#5865f2] hover:bg-[#5865f220] text-xs px-3">
                        Войти
                      </Button>
                      <Button size="sm" onClick={() => setModal("register")} className="bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs px-3">
                        Регистрация
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Онлайн пользователи */}
            <div className={`${mobileUsersOpen ? "block absolute right-0 top-12 z-20 h-full shadow-xl" : "hidden"} lg:block w-60 bg-[#2f3136] border-l border-[#202225] flex-shrink-0 overflow-y-auto`}>
              <div className="p-4">
                <div className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2 flex items-center justify-between">
                  <span>В сети — {ONLINE_USERS.length + (user ? 1 : 0)}</span>
                  <button onClick={() => setMobileUsersOpen(false)} className="lg:hidden text-[#b9bbbe] hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-1">
                  {user && (
                    <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#393c43] cursor-pointer">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: getColor(user.username) }}>
                          {user.username[0].toUpperCase()}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#2f3136] rounded-full"></div>
                      </div>
                      <span className="text-[#dcddde] text-sm">{user.username}</span>
                      <span className="ml-auto text-xs text-[#5865f2]">вы</span>
                    </div>
                  )}
                  {ONLINE_USERS.map((name) => (
                    <div key={name} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#393c43] cursor-pointer">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: getColor(name) }}>
                          {name[0]}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#2f3136] rounded-full"></div>
                      </div>
                      <span className="text-[#dcddde] text-sm">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      {modal !== "none" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setModal("none")}>
          <div className="bg-[#36393f] rounded-xl p-6 sm:p-8 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-3">
                {modal === "register" ? <UserPlus className="w-7 h-7 text-white" /> : <LogIn className="w-7 h-7 text-white" />}
              </div>
              <h2 className="text-white text-2xl font-bold">
                {modal === "register" ? "Создать аккаунт" : "С возвращением!"}
              </h2>
              <p className="text-[#b9bbbe] text-sm mt-1">
                {modal === "register" ? "Присоединись к чату прямо сейчас" : "Рады видеть тебя снова"}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide mb-1.5">
                  Имя пользователя
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData((f) => ({ ...f, username: e.target.value }))}
                  placeholder="Введите имя..."
                  className="w-full bg-[#202225] text-white px-3 py-2.5 rounded-md outline-none border border-transparent focus:border-[#5865f2] text-sm placeholder-[#72767d]"
                />
              </div>
              <div>
                <label className="block text-[#b9bbbe] text-xs font-semibold uppercase tracking-wide mb-1.5">
                  Пароль
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Введите пароль..."
                  onKeyDown={(e) => e.key === "Enter" && handleAuth(modal)}
                  className="w-full bg-[#202225] text-white px-3 py-2.5 rounded-md outline-none border border-transparent focus:border-[#5865f2] text-sm placeholder-[#72767d]"
                />
              </div>

              {error && <p className="text-[#ed4245] text-sm">{error}</p>}

              <Button
                onClick={() => handleAuth(modal)}
                disabled={loading}
                className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white py-2.5 rounded-md font-medium text-sm"
              >
                {loading ? "Загрузка..." : modal === "register" ? "Зарегистрироваться" : "Войти"}
              </Button>

              <p className="text-center text-[#8e9297] text-sm">
                {modal === "register" ? (
                  <>Уже есть аккаунт?{" "}
                    <button onClick={() => { setModal("login"); setError(""); }} className="text-[#5865f2] hover:underline">Войти</button>
                  </>
                ) : (
                  <>Нет аккаунта?{" "}
                    <button onClick={() => { setModal("register"); setError(""); }} className="text-[#5865f2] hover:underline">Зарегистрироваться</button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
