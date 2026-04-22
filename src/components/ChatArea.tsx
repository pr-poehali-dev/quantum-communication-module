import { useRef, useEffect } from "react";
import { Hash, Users, Bell, Search, Menu, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const ONLINE_USERS = ["Алексей", "Марина", "Дмитрий", "Ольга", "Серёжа", "Наташа", "Антон"];

interface ChatAreaProps {
  user: User | null;
  messages: Message[];
  inputText: string;
  setInputText: (v: string) => void;
  mobileUsersOpen: boolean;
  setMobileUsersOpen: (v: boolean) => void;
  onOpenSidebar: () => void;
  onSend: () => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  getColor: (username: string) => string;
}

const ChatArea = ({
  user,
  messages,
  inputText,
  setInputText,
  mobileUsersOpen,
  setMobileUsersOpen,
  onOpenSidebar,
  onSend,
  onOpenLogin,
  onOpenRegister,
  getColor,
}: ChatAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Заголовок чата */}
      <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2 flex-shrink-0">
        <Button variant="ghost" className="lg:hidden text-[#8e9297] hover:text-[#dcddde] hover:bg-[#40444b] p-1" onClick={onOpenSidebar}>
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
                  placeholder="Написать в #общий"
                  className="flex-1 bg-transparent text-[#dcddde] placeholder-[#72767d] outline-none text-sm"
                />
                <button
                  onClick={onSend}
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
                  <Button size="sm" variant="ghost" onClick={onOpenLogin} className="text-[#5865f2] hover:bg-[#5865f220] text-xs px-3">
                    Войти
                  </Button>
                  <Button size="sm" onClick={onOpenRegister} className="bg-[#5865f2] hover:bg-[#4752c4] text-white text-xs px-3">
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
  );
};

export default ChatArea;
