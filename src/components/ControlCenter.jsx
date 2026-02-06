import { useState } from 'react'

const ControlCenter = ({ isOpen, onClose, isDarkMode, onToggleDarkMode }) => {
    const [brightness, setBrightness] = useState(80)
    const [volume, setVolume] = useState(50)
    const [isWifiOn, setIsWifiOn] = useState(true)
    const [isBluetoothOn, setIsBluetoothOn] = useState(true)
    const [isAirdropOn, setIsAirdropOn] = useState(false)
    const [isFocusOn, setIsFocusOn] = useState(false)

    if (!isOpen) return null

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    return (
        <div
            className="fixed inset-0 z-[9998]"
            onClick={handleBackdropClick}
        >
            {/* SVG Filter for Lens Effect - MUST be in DOM */}
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
                    <feComponentTransfer in="SourceAlpha" result="alpha">
                        <feFuncA type="identity" />
                    </feComponentTransfer>
                    <feGaussianBlur in="alpha" stdDeviation="50" result="blur" />
                    <feDisplacementMap in="SourceGraphic" in2="blur" scale="50" xChannelSelector="A" yChannelSelector="A" />
                </filter>
            </svg>

            {/* Control Center Glass Container */}
            <div className="glass-container glass-container--cc">
                <div className="glass-filter"></div>
                <div className="glass-overlay"></div>
                <div className="glass-specular"></div>
                <div className="glass-content">
                    
                    {/* Top Row - Connectivity */}
                    <div className="cc-row">
                        {/* WiFi Card */}
                        <div className="glass-container glass-container--card">
                            <div className="glass-filter"></div>
                            <div className="glass-overlay"></div>
                            <div className="glass-specular"></div>
                            <div className="glass-content glass-content--card">
                                <button
                                    className={`cc-icon-btn ${isWifiOn ? 'active' : ''}`}
                                    onClick={() => setIsWifiOn(!isWifiOn)}
                                >
                                    <svg viewBox="0 0 640 512" width="18">
                                        <path fill="currentColor" d="M634.91 154.88C457.74-8.99 182.19-8.93 5.09 154.88c-6.66 6.16-6.79 16.59-.35 22.98l34.24 33.97c6.14 6.1 16.02 6.23 22.4.38 145.92-133.68 371.3-133.71 517.25 0 6.38 5.85 16.26 5.71 22.4-.38l34.24-33.97c6.43-6.39 6.3-16.82-.36-22.98zM320 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm202.67-83.59c-115.26-101.93-290.21-101.82-405.34 0-6.9 6.1-7.12 16.69-.57 23.15l34.44 33.99c6 5.92 15.66 6.32 22.05.8 83.95-72.57 209.74-72.41 293.49 0 6.39 5.52 16.05 5.13 22.05-.8l34.44-33.99c6.56-6.46 6.33-17.06-.56-23.15z" />
                                    </svg>
                                </button>
                                <div className="cc-label">
                                    <span className="cc-title">Wi-Fi</span>
                                    <span className="cc-subtitle">{isWifiOn ? 'Home' : 'Off'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bluetooth */}
                        <button
                            className={`cc-mini-btn ${isBluetoothOn ? 'active' : ''}`}
                            onClick={() => setIsBluetoothOn(!isBluetoothOn)}
                        >
                            <svg viewBox="0 0 448 512" width="14">
                                <path fill="currentColor" d="M292.6 171.1L249.7 214l42.9 42.9a10 10 0 0 1 0 14.1l-42.9 42.9 42.9 42.9a10 10 0 0 1-3 16.4l-79.4 32a10 10 0 0 1-13.3-9.4V142.6a10 10 0 0 1 13.3-9.4l79.4 32a10 10 0 0 1 3 16.4zM448 256c0 141.4-114.6 256-256 256S-64 397.4-64 256 50.6 0 192 0s256 114.6 256 256z" />
                            </svg>
                        </button>

                        {/* AirDrop */}
                        <button
                            className={`cc-mini-btn ${isAirdropOn ? 'active' : ''}`}
                            onClick={() => setIsAirdropOn(!isAirdropOn)}
                        >
                            <svg viewBox="0 0 512 512" width="14">
                                <path fill="currentColor" d="M505.1 19.1C519.2 31.8 520 53.8 507.3 67.9L379.4 210c1.8 6.3 2.6 13.1 2.6 20 0 44.2-35.8 80-80 80-6.9 0-13.7-.9-20-2.6l-35.4 40.9c1.8 6.3 2.6 13.1 2.6 20 0 44.2-35.8 80-80 80-44.2 0-80-35.8-80-80 0-27.5 14-51.8 35.1-66.2L4.7 67.9C-8 53.8-7.2 31.8 6.9 19.1 20.9 6.5 43 7.3 55.6 21.2L355.3 346c3.4-1 7-1.5 10.7-1.5 26.5 0 48 21.5 48 48 0 3.7-.5 7.3-1.5 10.7l123.4-142c13.5-15.6 12.7-39.1-.9-52.6z" />
                            </svg>
                        </button>
                    </div>

                    {/* Focus Mode */}
                    <div className="cc-row">
                        <button
                            className={`glass-container glass-container--card cc-focus-btn ${isFocusOn ? 'active' : ''}`}
                            onClick={() => setIsFocusOn(!isFocusOn)}
                        >
                            <div className="glass-filter"></div>
                            <div className="glass-overlay"></div>
                            <div className="glass-specular"></div>
                            <div className="glass-content glass-content--focus">
                                <svg viewBox="0 0 512 512" width="18">
                                    <path fill="currentColor" d="M283.2 14.5c-3.1-8.4-11.2-14-20.2-14s-17.1 5.6-20.2 14l-41.4 114.1L87.5 156c-8.4 3.1-14 11.2-14 20.2s5.6 17.1 14 20.2l114.1 41.4L243 351.7c3.1 8.4 11.2 14 20.2 14s17.1-5.6 20.2-14l41.4-114.1 114.1-41.4c8.4-3.1 14-11.2 14-20.2s-5.6-17.1-14-20.2L324.8 114.5 283.2 14.5z" />
                                </svg>
                                <span>Focus</span>
                            </div>
                        </button>
                    </div>

                    {/* Display Slider */}
                    <div className="glass-container glass-container--slider">
                        <div className="glass-filter"></div>
                        <div className="glass-overlay"></div>
                        <div className="glass-specular"></div>
                        <div className="glass-content glass-content--slider">
                            <span className="cc-slider-label">Display</span>
                            <div className="cc-slider-track">
                                <svg viewBox="0 0 512 512" width="12">
                                    <path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1z" />
                                </svg>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={brightness}
                                    onChange={(e) => setBrightness(e.target.value)}
                                />
                                <svg viewBox="0 0 512 512" width="16">
                                    <path fill="currentColor" d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Sound Slider */}
                    <div className="glass-container glass-container--slider">
                        <div className="glass-filter"></div>
                        <div className="glass-overlay"></div>
                        <div className="glass-specular"></div>
                        <div className="glass-content glass-content--slider">
                            <span className="cc-slider-label">Sound</span>
                            <div className="cc-slider-track">
                                <svg viewBox="0 0 576 512" width="12">
                                    <path fill="currentColor" d="M215 71l-89 89H24a24 24 0 0 0-24 24v144a24 24 0 0 0 24 24h102.1l89 89c15 15 41 4.5 41-17V88c0-21.5-26-32-41-17z" />
                                </svg>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={(e) => setVolume(e.target.value)}
                                />
                                <svg viewBox="0 0 576 512" width="16">
                                    <path fill="currentColor" d="M215 71l-89 89H24a24 24 0 0 0-24 24v144a24 24 0 0 0 24 24h102.1l89 89c15 15 41 4.5 41-17V88c0-21.5-26-32-41-17zm233.6-19.6a24 24 0 1 0-33.9 33.9C461.1 131.7 488 189.6 488 256s-26.9 124.3-73.3 170.6a24 24 0 0 0 33.9 33.9C506.3 402.8 536 332.6 536 256s-29.7-146.8-87.4-204.6z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Now Playing */}
                    <div className="glass-container glass-container--media">
                        <div className="glass-filter"></div>
                        <div className="glass-overlay"></div>
                        <div className="glass-specular"></div>
                        <div className="glass-content glass-content--media">
                            <div className="cc-media-info">
                                <div className="cc-media-thumb">
                                    <svg viewBox="0 0 512 512" width="22">
                                        <path fill="currentColor" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z" />
                                    </svg>
                                </div>
                                <div className="cc-media-text">
                                    <span className="cc-media-title">Not Playing</span>
                                    <span className="cc-media-artist">Music</span>
                                </div>
                            </div>
                            <div className="cc-media-controls">
                                <button>
                                    <svg viewBox="0 0 448 512" width="12">
                                        <path fill="currentColor" d="M64 468V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12v176.4l195.9-160C357.5 41.5 384 60.1 384 87.6v336.8c0 27.5-26.5 46.1-52.1 27.2L136 291.6V468c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12z" />
                                    </svg>
                                </button>
                                <button className="cc-play-btn">
                                    <svg viewBox="0 0 448 512" width="14">
                                        <path fill="currentColor" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" />
                                    </svg>
                                </button>
                                <button>
                                    <svg viewBox="0 0 448 512" width="12">
                                        <path fill="currentColor" d="M384 44v424c0 6.6-5.4 12-12 12h-48c-6.6 0-12-5.4-12-12V291.6l-195.9 160C90.5 470.5 64 451.9 64 424.4V87.6c0-27.5 26.5-46.1 52.1-27.2L312 220.4V44c0-6.6 5.4-12 12-12h48c6.6 0 12 5.4 12 12z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="cc-footer-row">
                        <button
                            className={`cc-mini-btn ${isDarkMode ? 'active' : ''}`}
                            onClick={onToggleDarkMode}
                        >
                            {isDarkMode ? '☀️' : '🌙'}
                        </button>
                        <span className="cc-edit-label">Edit Controls</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlCenter
