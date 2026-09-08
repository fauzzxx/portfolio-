import { useState, useCallback, useRef } from 'react';
import type { AppId, WindowState } from '../types/os';
import { SYSTEM_APPS } from '../data/apps';

export function useWindowManager() {
  const [windows, setWindows] = useState<Record<string, WindowState>>({});
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
  const topZIndexRef = useRef<number>(100);

  const openWindow = useCallback(
    (appId: AppId) => {
      const appMeta = SYSTEM_APPS.find((app) => app.id === appId);
      if (!appMeta) return;

      topZIndexRef.current += 1;
      const nextZ = topZIndexRef.current;

      setWindows((prevWindows) => {
        const existing = prevWindows[appId];

        if (existing) {
          return {
            ...prevWindows,
            [appId]: {
              ...existing,
              isOpen: true,
              isMinimized: false,
              zIndex: nextZ,
            },
          };
        }

        // Compute cascaded initial position for desktop
        const openWindowsList = Object.values(prevWindows).filter((w) => w.isOpen);
        const offsetIndex = openWindowsList.length % 7;

        // Responsive default sizing
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const defaultW = isMobile
          ? window.innerWidth
          : Math.min(appMeta.defaultWidth || 840, window.innerWidth - 60);
        const defaultH = isMobile
          ? window.innerHeight - 56
          : Math.min(appMeta.defaultHeight || 600, window.innerHeight - 120);

        const initialX = isMobile ? 0 : Math.max(40, 80 + offsetIndex * 32);
        const initialY = isMobile ? 0 : Math.max(30, 50 + offsetIndex * 26);

        return {
          ...prevWindows,
          [appId]: {
            id: appId,
            appId,
            title: appMeta.title,
            icon: appMeta.icon,
            isOpen: true,
            isMinimized: false,
            isMaximized: isMobile, // Start maximized on mobile
            zIndex: nextZ,
            position: { x: initialX, y: initialY },
            size: { width: defaultW, height: defaultH },
          },
        };
      });

      setActiveWindowId(appId);
    },
    []
  );

  const closeWindow = useCallback(
    (appId: AppId) => {
      setWindows((prev) => {
        const target = prev[appId];
        if (!target) return prev;
        const updated = { ...prev };
        delete updated[appId];
        return updated;
      });

      setActiveWindowId((current) => {
        if (current === appId) {
          // Focus the next highest z-index open window
          const remaining = Object.values(windows).filter(
            (w) => w.appId !== appId && w.isOpen && !w.isMinimized
          );
          if (remaining.length > 0) {
            remaining.sort((a, b) => b.zIndex - a.zIndex);
            return remaining[0].appId;
          }
          return null;
        }
        return current;
      });
    },
    [windows]
  );

  const minimizeWindow = useCallback(
    (appId: AppId) => {
      setWindows((prev) => {
        const target = prev[appId];
        if (!target) return prev;
        return {
          ...prev,
          [appId]: {
            ...target,
            isMinimized: true,
          },
        };
      });

      setActiveWindowId((current) => {
        if (current === appId) {
          const remaining = Object.values(windows).filter(
            (w) => w.appId !== appId && w.isOpen && !w.isMinimized
          );
          if (remaining.length > 0) {
            remaining.sort((a, b) => b.zIndex - a.zIndex);
            return remaining[0].appId;
          }
          return null;
        }
        return current;
      });
    },
    [windows]
  );

  const toggleMaximize = useCallback((appId: AppId) => {
    setWindows((prev) => {
      const target = prev[appId];
      if (!target) return prev;
      return {
        ...prev,
        [appId]: {
          ...target,
          isMaximized: !target.isMaximized,
        },
      };
    });
  }, []);

  const focusWindow = useCallback((appId: AppId) => {
    topZIndexRef.current += 1;
    const nextZ = topZIndexRef.current;

    setWindows((prev) => {
      const target = prev[appId];
      if (!target) return prev;
      return {
        ...prev,
        [appId]: {
          ...target,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ,
        },
      };
    });
    setActiveWindowId(appId);
  }, []);

  const updatePosition = useCallback((appId: AppId, pos: { x: number; y: number }) => {
    setWindows((prev) => {
      const target = prev[appId];
      if (!target) return prev;
      return {
        ...prev,
        [appId]: {
          ...target,
          position: pos,
        },
      };
    });
  }, []);

  const updateSize = useCallback((appId: AppId, size: { width: number; height: number }) => {
    setWindows((prev) => {
      const target = prev[appId];
      if (!target) return prev;
      return {
        ...prev,
        [appId]: {
          ...target,
          size,
        },
      };
    });
  }, []);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    updatePosition,
    updateSize,
  };
}
