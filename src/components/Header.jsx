import { useTheme } from '../context/ThemeContext';

function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header-bg fixed top-0 left-0 right-0 py-3 px-4 md:px-6 z-10 transition-colors duration-300">
      {/* Mobile: Stack layout, Desktop: Row layout */}
      <div className="flex items-center justify-between">
        {/* Left - Logo & App Name */}
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg p-1.5 md:p-2">
            <img 
              src="/OnlineWebFonts_COM_Icons_11cb5d4455d28356663fa525a32aa316/To_Do_List.svg" 
              alt="TaskMaster Logo"
              className="w-full h-full invert"
            />
          </div>
          <h1 className="header-title text-lg md:text-xl font-bold tracking-wide">
            TaskMaster
          </h1>
        </div>

        {/* Right - Nav items */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* About Link - Hidden on very small screens */}
          <a
            href="https://github.com/Pruthivi13"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link text-xs md:text-sm font-semibold transition-all hover:scale-105 hidden sm:block"
          >
            About
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-5 md:w-12 md:h-6 rounded-full transition-all duration-300 flex items-center p-0.5 md:p-1 cursor-pointer border-none shadow-md flex-shrink-0"
            style={{
              background: isDark 
                ? 'linear-gradient(135deg, #374151, #1f2937)' 
                : 'linear-gradient(135deg, #60a5fa, #3b82f6)',
            }}
            aria-label="Toggle theme"
          >
            <div
              className={`w-4 h-4 md:w-4 md:h-4 rounded-full transition-all duration-300 flex items-center justify-center text-[8px] md:text-[10px] ${
                isDark ? 'translate-x-0 bg-gray-700' : 'translate-x-5 md:translate-x-6 bg-yellow-300'
              }`}
            >
              {isDark ? '🌙' : '☀️'}
            </div>
          </button>

          {/* Contact Button */}
          {/* Contact Button */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mail.to.pruthivi@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn px-2 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all hover:scale-105 hover:shadow-lg whitespace-nowrap"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
