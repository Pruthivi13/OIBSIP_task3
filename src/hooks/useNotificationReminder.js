import { useState, useEffect, useCallback } from 'react';

const NOTIFICATION_STORAGE_KEY = 'taskmaster-notifications-enabled';
const REMINDER_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

/**
 * Custom hook to handle browser notification reminders for incomplete tasks
 * @param {Array} tasks - Array of task objects with 'completed' property
 * @returns {Object} - { isEnabled, isSupported, permission, toggleNotifications }
 */
export function useNotificationReminder(tasks) {
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
    return saved === 'true';
  });
  
  const [permission, setPermission] = useState(() => {
    if (!('Notification' in window)) return 'denied';
    return Notification.permission;
  });

  const isSupported = 'Notification' in window;

  // Get incomplete tasks
  const getIncompleteTasks = useCallback(() => {
    return tasks.filter(task => !task.completed);
  }, [tasks]);

  // Show notification
  const showNotification = useCallback(() => {
    const incompleteTasks = getIncompleteTasks();
    
    if (incompleteTasks.length === 0) return;

    const count = incompleteTasks.length;
    const taskTitles = incompleteTasks
      .slice(0, 3) // Show first 3 tasks
      .map(t => `• ${t.title}`)
      .join('\n');
    
    const moreText = count > 3 ? `\n...and ${count - 3} more` : '';

    new Notification('TaskMaster Reminder 📝', {
      body: `You have ${count} pending task${count > 1 ? 's' : ''}!\n\n${taskTitles}${moreText}`,
      icon: '/taskmaster_logo.png',
      tag: 'taskmaster-reminder', // Prevents duplicate notifications
      requireInteraction: false
    });
  }, [getIncompleteTasks]);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) return 'denied';

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return 'denied';
    }
  }, [isSupported]);

  // Toggle notifications on/off
  const toggleNotifications = useCallback(async () => {
    if (!isSupported) {
      alert('Your browser does not support notifications.');
      return;
    }

    if (!isEnabled) {
      // Trying to enable notifications
      let currentPermission = permission;
      
      if (currentPermission === 'default') {
        currentPermission = await requestPermission();
      }

      if (currentPermission === 'granted') {
        setIsEnabled(true);
        localStorage.setItem(NOTIFICATION_STORAGE_KEY, 'true');
        
        // Show a test notification immediately
        const incompleteTasks = getIncompleteTasks();
        if (incompleteTasks.length > 0) {
          new Notification('Notifications Enabled! 🔔', {
            body: `You'll be reminded about your ${incompleteTasks.length} pending task${incompleteTasks.length > 1 ? 's' : ''} every 2 hours.`,
            icon: '/taskmaster_logo.png',
            tag: 'taskmaster-enabled'
          });
        }
      } else if (currentPermission === 'denied') {
        alert('Notification permission was denied. Please enable it in your browser settings.');
      }
    } else {
      // Disable notifications
      setIsEnabled(false);
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, 'false');
    }
  }, [isSupported, isEnabled, permission, requestPermission, getIncompleteTasks]);

  // Set up the 2-hour interval reminder
  useEffect(() => {
    if (!isEnabled || permission !== 'granted') return;

    // Show initial reminder after a short delay (for users who just enabled)
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 5000); // 5 seconds initial check

    // Set up the 2-hour interval
    const intervalId = setInterval(() => {
      showNotification();
    }, REMINDER_INTERVAL);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [isEnabled, permission, showNotification]);

  // Sync permission state with actual browser state
  useEffect(() => {
    if (isSupported) {
      setPermission(Notification.permission);
    }
  }, [isSupported]);

  return {
    isEnabled,
    isSupported,
    permission,
    toggleNotifications
  };
}

export default useNotificationReminder;
