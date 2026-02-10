import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import './ThemeToggle.scss';
import SunIcon from '../../../assets/SVG/sun.svg';
import MoonIcon from '../../../assets/SVG/moon.svg';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
            <img
                src={theme === 'light' ? MoonIcon : SunIcon}
                alt={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            />
        </button>
    );
};

export default ThemeToggle;
