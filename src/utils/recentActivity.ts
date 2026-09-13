import type { AppId } from '../types/os';

export interface RecentActivityItem {
  id: string;
  type: 'open_app' | 'view_project' | 'watch_demo' | 'view_doc';
  label: string;
  detail?: string;
  timestamp: number;
  appId?: AppId;
  projectId?: string;
}

const STORAGE_KEY = 'fauzaan_os_recent_activity';
const MAX_ACTIVITIES = 15;

export const getRecentActivities = (): RecentActivityItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const logActivity = (
  type: RecentActivityItem['type'],
  label: string,
  options?: { detail?: string; appId?: AppId; projectId?: string }
): void => {
  try {
    const current = getRecentActivities();
    // Don't add consecutive identical activities
    if (current.length > 0 && current[0].label === label && current[0].type === type) {
      return;
    }

    const newItem: RecentActivityItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type,
      label,
      detail: options?.detail,
      timestamp: Date.now(),
      appId: options?.appId,
      projectId: options?.projectId,
    };

    const updated = [newItem, ...current.filter((item) => item.label !== label)].slice(
      0,
      MAX_ACTIVITIES
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch a custom event so UI components can update reactively
    window.dispatchEvent(new CustomEvent('fauzaan_activity_logged', { detail: newItem }));
  } catch (e) {
    console.warn('Unable to log recent activity', e);
  }
};

export const clearRecentActivities = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('fauzaan_activity_cleared'));
  } catch (e) {
    console.warn('Unable to clear recent activity', e);
  }
};
