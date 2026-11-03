import React, { useState } from 'react';
import { Lock, ArrowRight, ArrowLeft, Eye, EyeOff, ShieldAlert } from 'lucide-react';
import { KalonLogo } from '../KalonLogo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToStore: () => void;
  expectedPasswordHash?: string;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToStore,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const savedPassword = localStorage.getItem('kalon_admin_pass') || 'kalon2025';

    setTimeout(() => {
      if (password.trim() === savedPassword) {
        localStorage.setItem('kalon_admin_session', 'authenticated');
        onLoginSuccess();
      } else {
        setError('Contraseña administrativa incorrecta.');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between p-6 sm:p-12 font-sans selection:bg-white selection:text-black">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
        <button
          onClick={onBackToStore}
          className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a la Tienda</span>
        </button>

        <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
          PORTAL RESTRINGIDO // 403
        </span>
      </div>

      {/* Center Auth Card (Sharp 90-degree geometry, ultra-minimalist) */}
      <div className="mx-auto w-full max-w-md my-auto py-12">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center border border-neutral-800 bg-neutral-900 p-2.5 mb-6">
            <KalonLogo className="h-full w-full text-white" />
          </div>

          <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-400">
            SISTEMA INTERNO KALON
          </span>
          <h1 className="mt-1 font-editorial text-3xl font-black tracking-widest text-white uppercase">
            PANEL DE CONTROL
          </h1>
          <p className="mt-2 text-xs uppercase tracking-wider text-neutral-400">
            Ingreso exclusivo para administración de catálogo, precios y campañas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label className="block text-[11px] font-mono tracking-widest uppercase text-neutral-300">
              Contraseña Maestra
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa clave de acceso..."
                className="w-full border border-neutral-700 bg-neutral-900 py-3.5 pr-10 pl-4 text-xs font-mono tracking-wider text-white placeholder:text-neutral-500 focus:border-white focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-white"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="mt-2 text-[10px] text-neutral-500 font-mono">
              Clave inicial por defecto: <span className="text-neutral-300 font-bold">kalon2025</span> (puedes cambiarla en el panel).
            </p>
          </div>

          {error && (
            <div className="border border-rose-900 bg-rose-950/40 p-3 flex items-center gap-2 text-xs text-rose-300">
              <ShieldAlert className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 bg-white py-4 text-xs font-bold tracking-widest text-neutral-950 uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isLoading ? (
              <span>AUTENTICANDO...</span>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>ACCEDER AL PANEL</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-[11px] text-neutral-600 font-mono uppercase tracking-widest">
        KALON ATELIER & DTF STUDIO · ACCESO SEGURO
      </div>
    </div>
  );
};
