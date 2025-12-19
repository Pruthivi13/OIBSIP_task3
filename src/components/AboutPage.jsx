import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

function AboutPage({ onClose }) {
  const { isDark } = useTheme();

  const features = [
    {
      icon: '✅',
      title: 'Task Management',
      description: 'Create, edit, and delete tasks with ease. Mark tasks as complete with a single click.'
    },
    {
      icon: '🏷️',
      title: 'Categories',
      description: 'Organize tasks by Personal, Work, or Urgent categories for better productivity.'
    },
    {
      icon: '🔍',
      title: 'Search & Filter',
      description: 'Quickly find tasks with real-time search and filter by category.'
    },
    {
      icon: '📊',
      title: 'Smart Sorting',
      description: 'Sort tasks by newest, oldest, or alphabetically to stay organized.'
    },
    {
      icon: '🔔',
      title: 'Reminders',
      description: 'Get browser notifications every 2 hours for pending tasks.'
    },
    {
      icon: '🌙',
      title: 'Dark Mode',
      description: 'Easy on the eyes with beautiful dark and light themes.'
    }
  ];

  const useCases = [
    {
      title: 'Daily Planning',
      description: 'Start your day by adding tasks and prioritizing with categories.',
      icon: '📅'
    },
    {
      title: 'Work Projects',
      description: 'Track work tasks separately and never miss a deadline.',
      icon: '💼'
    },
    {
      title: 'Personal Goals',
      description: 'Keep personal to-dos organized and celebrate when complete.',
      icon: '🎯'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div 
        className="about-modal w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8"
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, #1e1e2e 0%, #2a2a3e 100%)' 
            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          scrollbarWidth: 'thin',
          scrollbarColor: isDark ? '#444 transparent' : '#ccc transparent'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 
            className="text-2xl md:text-3xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4, #10b981)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}
          >
            About TaskMaster
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: isDark ? '#3a3a4e' : '#e5e7eb'
            }}
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Intro */}
        <p 
          className="text-base md:text-lg mb-8"
          style={{ color: isDark ? '#a0a0a0' : '#666' }}
        >
          TaskMaster is a beautiful, modern to-do app designed to help you stay organized and productive. 
          Built with React and love. ✨
        </p>

        {/* Features Section */}
        <h3 
          className="text-xl font-bold mb-4"
          style={{ color: isDark ? '#e0e0e0' : '#333' }}
        >
          🚀 Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-4 rounded-xl transition-all hover:scale-[1.02]"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h4 
                    className="font-semibold mb-1"
                    style={{ color: isDark ? '#e0e0e0' : '#333' }}
                  >
                    {feature.title}
                  </h4>
                  <p 
                    className="text-sm"
                    style={{ color: isDark ? '#888' : '#666' }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Use Cases Section */}
        <h3 
          className="text-xl font-bold mb-4"
          style={{ color: isDark ? '#e0e0e0' : '#333' }}
        >
          💡 Use Cases
        </h3>
        <div className="space-y-3 mb-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{
                background: isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.05)',
                border: `1px solid ${isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'}`
              }}
            >
              <span className="text-3xl">{useCase.icon}</span>
              <div>
                <h4 
                  className="font-semibold"
                  style={{ color: isDark ? '#c4b5fd' : '#7c3aed' }}
                >
                  {useCase.title}
                </h4>
                <p 
                  className="text-sm"
                  style={{ color: isDark ? '#888' : '#666' }}
                >
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div 
          className="text-center pt-4 border-t"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
        >
          <p 
            className="text-sm"
            style={{ color: isDark ? '#666' : '#999' }}
          >
            Made with ❤️ by Pruthiviraj Sahu
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
