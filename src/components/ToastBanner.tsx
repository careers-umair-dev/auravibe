import { CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export function ToastBanner() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl border border-[#EAEAF0] bg-[#171923] px-4 py-3 text-sm font-medium text-white shadow-xl"
    >
      <CheckCircle2 className="h-4 w-4 text-[#A78BFA] shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
}
