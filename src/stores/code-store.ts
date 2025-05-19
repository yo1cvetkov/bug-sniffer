import { Language } from '@/lib/languages';
import { create } from 'zustand';

interface CodeStore {
  code: string | null;
  setCode: (code: string | null) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

const useCodeStore = create<CodeStore>((set) => ({
  code: null,
  setCode: (code) => set({ code }),
  language: Language.TYPESCRIPT,
  setLanguage: (language) => set({ language }),
}));

export default useCodeStore;
