import { useState, useRef, useEffect } from 'react'
import ResizableWindow from '../ResizableWindow'
import WindowControls from '../WindowControls'
import { techStack } from '../../data/constants'

const TerminalWindow = ({ onClose, zIndex, bringToFront, openWindow }) => {
    const [history, setHistory] = useState([])
    const [currentInput, setCurrentInput] = useState('')
    const inputRef = useRef(null)
    const terminalRef = useRef(null)

    const welcomeMessage = `
┌─────────────────────────────────────────────────────────┐
│  Welcome to Abu Bokkor's Portfolio Terminal v1.0        │
│  Type 'help' to see available commands                  │
└─────────────────────────────────────────────────────────┘
`

    const helpText = `
Available Commands:
──────────────────────────────────────────
  help        - Show this help message
  about       - Learn about me
  skills      - View my tech stack
  projects    - Open projects folder
  resume      - View my resume
  contact     - Open contact information
  gallery     - Open photo gallery
  articles    - View blog articles
  social      - Show social media links
  clear       - Clear terminal
  exit        - Close terminal
──────────────────────────────────────────
`

    const aboutText = `
┌─────────────────────────────────────────┐
│  Abu Bokkor - Full Stack Developer      │
└─────────────────────────────────────────┘

Hey! I'm Abu Bokkor 👋
A passionate web developer who loves building 
sleek, interactive websites and applications.

I specialize in:
  • JavaScript, React, Next.js
  • Node.js, Python
  • Modern CSS & Tailwind
  • Mobile Development with React Native

Type 'skills' to see my full tech stack!
`

    const socialText = `
Social Media Links:
──────────────────────────────────────────
  🐙 GitHub    → github.com/abubokkor-cse
  💼 LinkedIn  → linkedin.com
  📺 YouTube   → youtube.com/@AICodeHelper
  📘 Facebook  → facebook.com/aicodehelper
──────────────────────────────────────────
Type 'contact' to open the contact app.
`

    const getSkillsText = () => {
        let text = `
Tech Stack & Skills:
──────────────────────────────────────────
`
        techStack.forEach(category => {
            text += `  ✓ ${category.category.padEnd(12)} │ ${category.items.join(', ')}\n`
        })
        text += `──────────────────────────────────────────
`
        return text
    }

    const processCommand = (cmd) => {
        const command = cmd.toLowerCase().trim()

        switch (command) {
            case 'help':
            case 'h':
            case '?':
                return { output: helpText, action: null }

            case 'about':
            case 'whoami':
                return { output: aboutText, action: null }

            case 'skills':
            case 'tech':
            case 'stack':
                return { output: getSkillsText(), action: null }

            case 'projects':
            case 'work':
            case 'finder':
                return {
                    output: '📂 Opening Projects folder...',
                    action: () => openWindow('finder')
                }

            case 'resume':
            case 'cv':
                return {
                    output: '📄 Opening Resume...',
                    action: () => openWindow('resume')
                }

            case 'contact':
            case 'email':
                return {
                    output: '📧 Opening Contact...',
                    action: () => openWindow('contact')
                }

            case 'gallery':
            case 'photos':
                return {
                    output: '🖼️  Opening Photo Gallery...',
                    action: () => openWindow('photos')
                }

            case 'articles':
            case 'blog':
            case 'safari':
                return {
                    output: '📚 Opening Articles...',
                    action: () => openWindow('safari')
                }

            case 'social':
            case 'socials':
            case 'links':
                return { output: socialText, action: null }

            case 'clear':
            case 'cls':
                setHistory([])
                return { output: null, action: null }

            case 'exit':
            case 'quit':
            case 'close':
                return {
                    output: 'Goodbye! 👋',
                    action: () => setTimeout(onClose, 500)
                }

            case '':
                return { output: null, action: null }

            default:
                return {
                    output: `Command not found: ${cmd}\nType 'help' for available commands.`,
                    action: null
                }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const result = processCommand(currentInput)

            const newEntry = {
                command: currentInput,
                output: result.output
            }

            if (currentInput.toLowerCase().trim() !== 'clear') {
                setHistory(prev => [...prev, newEntry])
            }

            if (result.action) {
                result.action()
            }

            setCurrentInput('')
        }
    }

    const focusInput = () => {
        inputRef.current?.focus()
    }

    useEffect(() => {
        focusInput()
    }, [])

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [history])

    return (
        <ResizableWindow
            id="terminal"
            zIndex={zIndex}
            bringToFront={bringToFront}
            defaultWidth={700}
            defaultHeight={450}
            defaultLeft={180}
            defaultTop={90}
        >
            {({ toggleFullscreen }) => (
                <div onClick={focusInput} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="window-header" id="window-header" onDoubleClick={toggleFullscreen}>
                        <WindowControls onClose={onClose} onFullscreen={toggleFullscreen} />
                        <h2>Terminal — bash</h2>
                        <div className="w-16" />
                    </div>

                    <div className="terminal-body" ref={terminalRef} style={{ flex: 1, overflow: 'auto' }}>
                        {/* Welcome Message */}
                        <pre className="welcome-text">{welcomeMessage}</pre>

                        {/* Command History */}
                        {history.map((entry, index) => (
                            <div key={index} className="command-entry">
                                <div className="prompt-line">
                                    <span className="prompt-user">abu-bokkor</span>
                                    <span className="prompt-at">@</span>
                                    <span className="prompt-host">portfolio</span>
                                    <span className="prompt-colon">:</span>
                                    <span className="prompt-path">~</span>
                                    <span className="prompt-symbol">$</span>
                                    <span className="prompt-command">{entry.command}</span>
                                </div>
                                {entry.output && (
                                    <pre className="command-output">{entry.output}</pre>
                                )}
                            </div>
                        ))}

                        {/* Current Input Line */}
                        <div className="prompt-line current">
                            <span className="prompt-user">abu-bokkor</span>
                            <span className="prompt-at">@</span>
                            <span className="prompt-host">portfolio</span>
                            <span className="prompt-colon">:</span>
                            <span className="prompt-path">~</span>
                            <span className="prompt-symbol">$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="terminal-input"
                                spellCheck={false}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </div>
            )}
        </ResizableWindow>
    )
}

export default TerminalWindow
