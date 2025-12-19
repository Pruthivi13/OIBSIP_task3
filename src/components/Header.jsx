import { useTheme } from '../context/ThemeContext';

function Header({ isNotificationEnabled, onToggleNotifications, notificationSupported, onOpenAbout }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header-bg fixed top-0 left-0 right-0 py-2 px-3 md:py-3 md:px-6 z-10 transition-colors duration-300">
      {/* Mobile: Compact layout, Desktop: Spacious layout */}
      <div className="flex items-center justify-between">
        {/* Left - Logo Icon & App Name */}
        <div className="flex items-center gap-1.5 md:gap-3">
          {/* Logo Icon */}
          <div 
            className="w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0"
            style={{
              boxShadow: isDark 
                ? '0 0 15px rgba(139, 92, 246, 0.3), 0 2px 10px rgba(0, 0, 0, 0.2)' 
                : '0 2px 10px rgba(0, 0, 0, 0.12)'
            }}
          >
            <img 
              src="/taskmaster_icon.png" 
              alt="TaskMaster"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* App Name - Styled Text */}
          <h1 className="header-app-title text-base md:text-xl font-bold tracking-wide lowercase">
            task master
          </h1>
        </div>

        {/* Right - Nav items */}
        <div className="flex items-center gap-1.5 md:gap-3">
          {/* About Button */}
          <button
            onClick={onOpenAbout}
            className="nav-link text-xs font-semibold transition-all hover:scale-105 bg-transparent border-none cursor-pointer px-1"
          >
            About
          </button>

          {/* Notification Toggle Button */}
          {notificationSupported && (
            <button
              onClick={onToggleNotifications}
              className="notification-btn w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: isNotificationEnabled
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : isDark
                    ? 'linear-gradient(135deg, #374151, #1f2937)'
                    : 'linear-gradient(135deg, #e5e7eb, #d1d5db)',
                boxShadow: isNotificationEnabled
                  ? '0 0 12px rgba(16, 185, 129, 0.4)'
                  : '0 2px 6px rgba(0, 0, 0, 0.12)'
              }}
              aria-label={isNotificationEnabled ? 'Disable notifications' : 'Enable notifications'}
              title={isNotificationEnabled ? 'Notifications ON - Click to disable' : 'Notifications OFF - Click to enable'}
            >
              <span className="text-sm md:text-lg">
                {isNotificationEnabled ? '🔔' : '🔕'}
              </span>
            </button>
          )}

          {/* Modern Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            className="relative w-11 h-6 md:w-14 md:h-7 rounded-full transition-all duration-300 flex items-center p-0.5 md:p-1 cursor-pointer border-none shadow-md flex-shrink-0"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, #1e293b, #0f172a)' 
                : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            }}
            aria-label="Toggle theme"
          >
            <div
              className={`absolute w-5 h-5 md:w-5 md:h-5 rounded-full transition-all duration-300 flex items-center justify-center shadow-md ${
                isDark ? 'left-0.5 bg-slate-700' : 'right-0.5 bg-white'
              }`}
            >
              <span className="text-xs md:text-sm">
                {isDark ? '🌙' : '☀️'}
              </span>
            </div>
          </button>

          {/* Contact Button */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mail.to.pruthivi@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-xs font-bold transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;


