import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function Header({ isNotificationEnabled, onToggleNotifications, notificationSupported, onOpenAbout }) {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="header-bg fixed top-0 left-0 right-0 py-2 px-3 md:py-3 md:px-6 z-20 transition-colors duration-300">
        <div className="flex items-center justify-between">
          {/* Left - Logo Icon & App Name */}
          <div className="flex items-center gap-1.5 md:gap-3">
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
            <h1 className="header-app-title text-base md:text-xl font-bold tracking-wide lowercase">
              task master
            </h1>
          </div>

          {/* Right - Desktop Nav items (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenAbout}
              className="nav-link text-xs font-semibold transition-all hover:scale-105 bg-transparent border-none cursor-pointer px-1"
            >
              About
            </button>

            {notificationSupported && (
              <button
                onClick={onToggleNotifications}
                className="notification-btn w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
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
                title={isNotificationEnabled ? 'Notifications ON' : 'Notifications OFF'}
              >
                <span className="text-lg">{isNotificationEnabled ? '🔔' : '🔕'}</span>
              </button>
            )}

            <button
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full transition-all duration-300 flex items-center p-1 cursor-pointer border-none shadow-md flex-shrink-0"
              style={{
                background: isDark 
                  ? 'linear-gradient(135deg, #1e293b, #0f172a)' 
                  : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              }}
              aria-label="Toggle theme"
            >
              <div
                className={`absolute w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center shadow-md ${
                  isDark ? 'left-1 bg-slate-700' : 'right-1 bg-white'
                }`}
              >
                <span className="text-sm">{isDark ? '🌙' : '☀️'}</span>
              </div>
            </button>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mail.to.pruthivi@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
            >
              Contact
            </a>
          </div>

          {/* Mobile - Theme Toggle + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-11 h-6 rounded-full transition-all duration-300 flex items-center cursor-pointer border-none shadow-md flex-shrink-0"
              style={{
                background: isDark 
                  ? 'linear-gradient(135deg, #1e293b, #0f172a)' 
                  : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              }}
              aria-label="Toggle theme"
            >
              <div
                className="absolute w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center shadow-md"
                style={{
                  left: isDark ? '2px' : 'auto',
                  right: isDark ? 'auto' : '2px',
                  background: isDark ? '#334155' : '#fff'
                }}
              >
                <span className="text-xs leading-none">{isDark ? '🌙' : '☀️'}</span>
              </div>
            </button>

            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="mobile-menu-btn w-10 h-10 flex items-center justify-center rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-drawer-backdrop md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <div className={`mobile-drawer md:hidden ${isMenuOpen ? 'open' : ''}`}>
        {/* Drawer Header */}
        <div className="mobile-drawer-header">
          <h2 className="text-lg font-bold" style={{ color: isDark ? '#e0e0e0' : '#333' }}>Menu</h2>
          <button
            onClick={closeMenu}
            className="mobile-drawer-close"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Drawer Nav Items */}
        <nav className="mobile-drawer-nav">
          <button
            onClick={() => { onOpenAbout(); closeMenu(); }}
            className="mobile-drawer-item"
          >
            <span className="mobile-drawer-icon">ℹ️</span>
            <span>About</span>
          </button>

          {notificationSupported && (
            <button
              onClick={() => { onToggleNotifications(); }}
              className="mobile-drawer-item"
            >
              <span className="mobile-drawer-icon">{isNotificationEnabled ? '🔔' : '🔕'}</span>
              <span>Notifications {isNotificationEnabled ? 'ON' : 'OFF'}</span>
            </button>
          )}

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mail.to.pruthivi@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-drawer-item contact-highlight"
            onClick={closeMenu}
          >
            <span className="mobile-drawer-icon">✉️</span>
            <span>Contact</span>
          </a>
        </nav>

        {/* Footer inside Drawer */}
        <div className="mobile-drawer-footer">
          <div className="flex justify-center gap-6 mb-3">
            <a href="https://www.instagram.com/heyiheardyouweredead/" target="_blank" rel="noopener noreferrer" className="social-icon instagram-icon" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://x.com/pjsucksatlife" target="_blank" rel="noopener noreferrer" className="social-icon x-icon" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://github.com/Pruthivi13" target="_blank" rel="noopener noreferrer" className="social-icon github-icon" aria-label="GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
          <p className="footer-text text-sm font-semibold m-0">
            © Pruthiviraj Sahu 2024. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;


