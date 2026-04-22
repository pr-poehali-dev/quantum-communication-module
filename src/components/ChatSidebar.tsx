import { Hash, Mic, Settings, ArrowRight, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  username: string;
  id: string;
}

interface ChatSidebarProps {
  user: User | null;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (v: boolean) => void;
  onLoginClick: () => void;
  getColor: (username: string) => string;
}

const ChatSidebar = ({
  user,
  mobileSidebarOpen,
  setMobileSidebarOpen,
  onLoginClick,
  getColor,
}: ChatSidebarProps) => {
  return (
    <>
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
                <button onClick={onLoginClick} className="text-[#5865f2] text-xs hover:underline">Войти</button>
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
    </>
  );
};

export default ChatSidebar;
