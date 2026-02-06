import { useState, useEffect } from 'react'
import { navLinks } from '../data/constants'
import ControlCenter from './ControlCenter'

const Navbar = ({ openWindow }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [showControlCenter, setShowControlCenter] = useState(false)
    const [batteryLevel, setBatteryLevel] = useState(100)
    const [isCharging, setIsCharging] = useState(false)

    useEffect(() => {
        // Check system preference on mount
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDarkMode(prefersDark)
        if (prefersDark) {
            document.documentElement.classList.add('dark')
        }

        // Update time every second for accurate display
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        // Get battery status if available
        if ('getBattery' in navigator) {
            navigator.getBattery().then((battery) => {
                setBatteryLevel(Math.round(battery.level * 100))
                setIsCharging(battery.charging)

                battery.addEventListener('levelchange', () => {
                    setBatteryLevel(Math.round(battery.level * 100))
                })
                battery.addEventListener('chargingchange', () => {
                    setIsCharging(battery.charging)
                })
            })
        }

        return () => clearInterval(timer)
    }, [])

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle('dark')
    }

    const formatDate = () => {
        return currentTime.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        })
    }

    const formatTime = () => {
        return currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    const handleNavClick = (type) => {
        openWindow(type)
    }

    return (
        <>
            <nav>
                <div className="nav-left">
                    <img src="/icons/apple.svg" alt="Apple" className="apple-icon" />
                    <p className="font-bold text-sm">Finder</p>
                    <ul className="nav-menu">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <p onClick={() => handleNavClick(link.type)}>{link.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="nav-right">
                    {/* Battery Indicator */}
                    <div className="battery-indicator" title={`${batteryLevel}%${isCharging ? ' - Charging' : ''}`}>
                        <div className="battery-icon">
                            <div className="battery-body">
                                <div
                                    className="battery-level"
                                    style={{ width: `${batteryLevel}%` }}
                                />
                            </div>
                            <div className="battery-tip" />
                            {isCharging && (
                                <svg className="charging-icon" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.25 5.25l-5.5 8h4.75l-.75 5.5 5.5-8h-4.75l.75-5.5z" />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* WiFi Icon */}
                    <div className="nav-icon-btn" title="Wi-Fi">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="nav-icon">
                            <path fillRule="evenodd" d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.033 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Spotlight Search */}
                    <div className="nav-icon-btn" title="Spotlight">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="nav-icon">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Control Center Toggle */}
                    <div
                        className="nav-icon-btn control-center-btn"
                        onClick={() => setShowControlCenter(!showControlCenter)}
                        title="Control Center"
                    >
                        <img src="/icons/mode.svg" alt="Control Center" className="nav-icon" />
                    </div>

                    {/* Siri */}
                    <div className="nav-icon-btn siri-btn" title="Siri">
                        <img src="/icons/Logo_Apple_Siri_iOS_2024.svg" alt="Siri" className="siri-icon" />
                    </div>

                    {/* Date & Time */}
                    <time className="nav-time">{formatDate()}  {formatTime()}</time>
                </div>
            </nav>

            <ControlCenter
                isOpen={showControlCenter}
                onClose={() => setShowControlCenter(false)}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode}
            />
        </>
    )
}

export default Navbar
