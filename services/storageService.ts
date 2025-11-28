import { HistoryItem } from "../types";

const STORAGE_KEY = "resumatch_history";

export const getHistory = (): HistoryItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
};

export const saveToHistory = (item: HistoryItem): void => {
  try {
    const current = getHistory();
    // Prepend new item
    const updated = [item, ...current];
    // Limit to last 20 items to save space
    const limited = updated.slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  } catch (e) {
    console.error("Failed to save history", e);
  }
};

export const clearHistory = (): void => {
    localStorage.removeItem(STORAGE_KEY);
};