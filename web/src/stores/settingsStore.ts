import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  openaiApiKey: string;
  selectedModel: string;
  userName: string;
  targetRole: string;
  defaultQuizCount: number;
  setApiKey: (key: string) => void;
  setSelectedModel: (model: string) => void;
  setUserName: (name: string) => void;
  setTargetRole: (role: string) => void;
  setDefaultQuizCount: (count: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      openaiApiKey: '',
      selectedModel: 'anthropic/claude-3-haiku',
      userName: '',
      targetRole: '',
      defaultQuizCount: 10,

      setApiKey: key => set({ openaiApiKey: key }),
      setSelectedModel: model => set({ selectedModel: model }),
      setUserName: name => set({ userName: name }),
      setTargetRole: role => set({ targetRole: role }),
      setDefaultQuizCount: count => set({ defaultQuizCount: count }),
    }),
    {
      name: 'myrevisor-settings',
    }
  )
);
