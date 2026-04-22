import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  modal: "login" | "register";
  formData: { username: string; password: string };
  setFormData: (f: { username: string; password: string }) => void;
  error: string;
  loading: boolean;
  onAuth: (type: "login" | "register") => void;
  onClose: () => void;
  onSwitch: (type: "login" | "register") => void;
}

const AuthModal = ({
  modal,
  formData,
  setFormData,
  error,
  loading,
  onAuth,
  onClose,
  onSwitch,
}: AuthModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
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
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Введите пароль..."
              onKeyDown={(e) => e.key === "Enter" && onAuth(modal)}
              className="w-full bg-[#202225] text-white px-3 py-2.5 rounded-md outline-none border border-transparent focus:border-[#5865f2] text-sm placeholder-[#72767d]"
            />
          </div>

          {error && <p className="text-[#ed4245] text-sm">{error}</p>}

          <Button
            onClick={() => onAuth(modal)}
            disabled={loading}
            className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white py-2.5 rounded-md font-medium text-sm"
          >
            {loading ? "Загрузка..." : modal === "register" ? "Зарегистрироваться" : "Войти"}
          </Button>

          <p className="text-center text-[#8e9297] text-sm">
            {modal === "register" ? (
              <>Уже есть аккаунт?{" "}
                <button onClick={() => onSwitch("login")} className="text-[#5865f2] hover:underline">Войти</button>
              </>
            ) : (
              <>Нет аккаунта?{" "}
                <button onClick={() => onSwitch("register")} className="text-[#5865f2] hover:underline">Зарегистрироваться</button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
