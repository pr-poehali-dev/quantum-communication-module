import { MessageCircle, LogIn, UserPlus, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface User {
  username: string;
  id: string;
}

interface ChatNavbarProps {
  user: User | null;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  getColor: (username: string) => string;
}

const ChatNavbar = ({
  user,
  mobileMenuOpen,
  setMobileMenuOpen,
  onLogin,
  onRegister,
  onLogout,
  getColor,
}: ChatNavbarProps) => {
  return (
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
              <Button variant="ghost" onClick={onLogout} className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b] text-sm">
                <LogOut className="w-4 h-4 mr-1" />
                Выйти
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" onClick={onLogin} className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b]">
                <LogIn className="w-4 h-4 mr-2" />
                Войти
              </Button>
              <Button onClick={onRegister} className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-5 py-2 rounded text-sm font-medium">
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
              <Button variant="ghost" onClick={onLogout} className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b] justify-start">
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => { onLogin(); setMobileMenuOpen(false); }} className="text-[#b9bbbe] hover:text-white hover:bg-[#40444b] justify-start">
                <LogIn className="w-4 h-4 mr-2" />
                Войти
              </Button>
              <Button onClick={() => { onRegister(); setMobileMenuOpen(false); }} className="bg-[#5865f2] hover:bg-[#4752c4] text-white justify-start">
                <UserPlus className="w-4 h-4 mr-2" />
                Регистрация
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default ChatNavbar;
