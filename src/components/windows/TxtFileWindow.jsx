import { useState, useRef, useEffect } from 'react'
import ResizableWindow from '../ResizableWindow'
import WindowControls from '../WindowControls'

const TxtFileWindow = ({ onClose, zIndex, bringToFront, data }) => {
    const [content, setContent] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const textareaRef = useRef(null)

    useEffect(() => {
        if (data?.description) {
            // Convert description array to text
            const text = Array.isArray(data.description)
                ? data.description.join('\n\n')
                : data.description
            setContent(text)
        }
    }, [data])

    if (!data) return null

    const handleContentChange = (e) => {
        setContent(e.target.value)
        setHasChanges(true)
    }

    const handleSave = () => {
        setHasChanges(false)
        // In a real app, this would save to backend
        // For portfolio demo, changes are temporary until refresh
    }

    const handleClose = () => {
        if (hasChanges) {
            if (window.confirm('You have unsaved changes. Close anyway?')) {
                onClose()
            }
        } else {
            onClose()
        }
    }

    return (
        <ResizableWindow
            id="txtfile"
            zIndex={zIndex}
            bringToFront={bringToFront}
            defaultWidth={600}
            defaultHeight={500}
            defaultLeft={250}
            defaultTop={80}
        >
            {({ toggleFullscreen }) => (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="window-header" id="window-header" onDoubleClick={toggleFullscreen}>
                        <WindowControls onClose={handleClose} onFullscreen={toggleFullscreen} />
                        <h2>
                            {data.name}
                            {hasChanges && <span className="text-gray-400 ml-1">— Edited</span>}
                        </h2>
                        <div className="header-actions">
                            {hasChanges && (
                                <button onClick={handleSave} className="save-btn">
                                    Save
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="notepad-container">
                        {/* Toolbar */}
                        <div className="notepad-toolbar">
                            <div className="toolbar-group">
                                <button title="Bold" onClick={() => { }}>
                                    <strong>B</strong>
                                </button>
                                <button title="Italic" onClick={() => { }}>
                                    <em>I</em>
                                </button>
                                <button title="Underline" onClick={() => { }}>
                                    <u>U</u>
                                </button>
                            </div>
                            <div className="toolbar-divider" />
                            <div className="toolbar-group">
                                <select className="font-select">
                                    <option>SF Mono</option>
                                    <option>Monaco</option>
                                    <option>Menlo</option>
                                    <option>Courier</option>
                                </select>
                                <select className="size-select">
                                    <option>12</option>
                                    <option>14</option>
                                    <option>16</option>
                                    <option>18</option>
                                </select>
                            </div>
                        </div>

                        {/* Text Editor Area */}
                        <div className="notepad-editor">
                            <div className="line-numbers">
                                {content.split('\n').map((_, i) => (
                                    <span key={i}>{i + 1}</span>
                                ))}
                            </div>
                            <textarea
                                ref={textareaRef}
                                value={content}
                                onChange={handleContentChange}
                                className="editor-textarea"
                                placeholder="Start typing..."
                                spellCheck={false}
                            />
                        </div>

                        {/* Status Bar */}
                        <div className="notepad-statusbar">
                            <span>Lines: {content.split('\n').length}</span>
                            <span>Characters: {content.length}</span>
                            <span>UTF-8</span>
                        </div>
                    </div>
                </div>
            )}
        </ResizableWindow>
    )
}

export default TxtFileWindow
