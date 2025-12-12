import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-20 w-14 h-7 rounded-full transition-all duration-300 flex items-center p-1 cursor-pointer border-none shadow-lg"
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, #374151, #1f2937)' 
          : 'linear-gradient(135deg, #60a5fa, #3b82f6)',
      }}
      aria-label="Toggle theme"
    >
      <div
        className={`w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center text-xs ${
          isDark ? 'translate-x-0 bg-gray-700' : 'translate-x-7 bg-yellow-300'
        }`}
      >
        {isDark ? '🌙' : '☀️'}
      </div>
    </button>
  );
}

export default ThemeToggle;
