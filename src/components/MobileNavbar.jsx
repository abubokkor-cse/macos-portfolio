import { useState, useEffect } from 'react'

const MobileNavbar = () => {
    const [currentTime, setCurrentTime] = useState(new Date())
    const [batteryLevel, setBatteryLevel] = useState(100)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        // Get battery status if available
        if ('getBattery' in navigator) {
            navigator.getBattery().then((battery) => {
                setBatteryLevel(Math.round(battery.level * 100))
                battery.addEventListener('levelchange', () => {
                    setBatteryLevel(Math.round(battery.level * 100))
                })
            })
        }

        return () => clearInterval(timer)
    }, [])

    const formatTime = () => {
        return currentTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    }

    return (
        <section id="mobile-navbar">
            <time>{formatTime()}</time>
            <div className="mobile-notch"></div>
            <ul>
                <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h.01" />
                        <path d="M2 8.82a15 15 0 0 1 20 0" />
                        <path d="M5 12.859a10 10 0 0 1 14 0" />
                        <path d="M8.5 16.429a5 5 0 0 1 7 0" />
                    </svg>
                </li>
                <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="18" height="10" rx="2" ry="2" />
                        <path d="M22 11v2" />
                    </svg>
                </li>
            </ul>
        </section>
    )
}

export default MobileNavbar
