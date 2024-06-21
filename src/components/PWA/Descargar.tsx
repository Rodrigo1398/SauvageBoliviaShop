'use client'

import { useEffect, useState } from 'react';

const BotonInstalarPWA: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    const mostrarInstalacion = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', mostrarInstalacion);

    return () => {
      window.removeEventListener('beforeinstallprompt', mostrarInstalacion);
    };
  }, []);

  const handleInstalarClick = () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt(); // Se utiliza 'any' para evitar errores de TypeScript
      (deferredPrompt as any).userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó instalar la PWA');
        } else {
          console.log('Usuario canceló la instalación de la PWA');
        }
      });
    }
  };

  return (
    <div>
      <button onClick={handleInstalarClick} style={{ display: deferredPrompt ? 'block' : 'none' }}>
        Instalar PWA
      </button>
    </div>
  );
};

export default BotonInstalarPWA;
