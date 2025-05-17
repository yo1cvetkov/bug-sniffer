import { create } from 'zustand';

interface CodeStore {
  code: string | null;
  setCode: (code: string) => void;
}

const useCodeStore = create<CodeStore>((set) => ({
  code: null,
  setCode: (code) => set({ code }),
}));

export default useCodeStore;
