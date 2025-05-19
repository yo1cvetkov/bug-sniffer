import { Action } from '@/lib/actions';
import { Language } from '@/lib/languages';
import { Priority } from '@/lib/priorities';
import { create } from 'zustand';

interface CodeStore {
  code: string | null;
  setCode: (code: string | null) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  action: Action;
  setAction: (action: Action) => void;
  priority: Priority;
  setPriority: (priority: Priority) => void;
}

const useCodeStore = create<CodeStore>((set) => ({
  code: null,
  setCode: (code) => set({ code }),
  language: Language.TYPESCRIPT,
  setLanguage: (language) => set({ language }),
  action: Action.EXPLAIN,
  setAction: (action) => set({ action }),
  priority: Priority.PERFORMANCE,
  setPriority: (priority) => set({ priority }),
}));

export default useCodeStore;
