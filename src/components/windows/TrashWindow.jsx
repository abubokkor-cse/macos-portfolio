import { useState } from 'react'
import ResizableWindow from '../ResizableWindow'
import WindowControls from '../WindowControls'

const TrashWindow = ({ onClose, zIndex, bringToFront, trashItems, onRestore, onEmptyTrash }) => {
    const [selectedItem, setSelectedItem] = useState(null)
    const [showContextMenu, setShowContextMenu] = useState(false)
    const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 })

    const handleRightClick = (e, item) => {
        e.preventDefault()
        setSelectedItem(item)
        setShowContextMenu(true)
        setContextMenuPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
    }

    const handleRestore = () => {
        if (selectedItem) {
            onRestore(selectedItem)
            setShowContextMenu(false)
            setSelectedItem(null)
        }
    }

    const handleClickOutside = () => {
        setShowContextMenu(false)
        setSelectedItem(null)
    }

    return (
        <ResizableWindow
            id="trash-window"
            zIndex={zIndex}
            bringToFront={bringToFront}
            defaultWidth={500}
            defaultHeight={400}
            defaultLeft={200}
            defaultTop={100}
        >
            {({ toggleFullscreen }) => (
                <div onClick={handleClickOutside} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div className="window-header" id="window-header" onDoubleClick={toggleFullscreen}>
                        <WindowControls onClose={onClose} onFullscreen={toggleFullscreen} />
                        <h2 className="font-bold text-sm flex-1 text-center text-gray-600">
                            Trash ({trashItems.length} items)
                        </h2>
                        <div className="w-16" />
                    </div>

                    <div className="trash-toolbar">
                        <button
                            onClick={onEmptyTrash}
                            disabled={trashItems.length === 0}
                            className="empty-trash-btn"
                        >
                            Empty Trash
                        </button>
                    </div>

                    <div className="trash-content">
                        {trashItems.length === 0 ? (
                            <div className="empty-state">
                                <img src="/images/trash.png" alt="Empty Trash" className="w-16 h-16 opacity-30" />
                                <p>Trash is Empty</p>
                            </div>
                        ) : (
                            <ul className="trash-items">
                                {trashItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`trash-item ${selectedItem === item ? 'selected' : ''}`}
                                        onContextMenu={(e) => handleRightClick(e, item)}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setSelectedItem(item)
                                            setShowContextMenu(false)
                                        }}
                                        onDoubleClick={() => {
                                            setSelectedItem(item)
                                            handleRestore()
                                        }}
                                    >
                                        <img
                                            src={item.icon || '/images/folder.png'}
                                            alt={item.name}
                                            className="w-12 h-12 object-contain"
                                        />
                                        <div className="item-info">
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-origin">From: {item.originalLocation || 'Desktop'}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Context Menu */}
                        {showContextMenu && selectedItem && (
                            <div
                                className="context-menu"
                                style={{
                                    position: 'absolute',
                                    left: contextMenuPos.x + 50,
                                    top: contextMenuPos.y + 80
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button onClick={handleRestore}>
                                    <span>↩️</span> Put Back
                                </button>
                                <button onClick={() => {
                                    onRestore(selectedItem, true) // true = delete permanently
                                    setShowContextMenu(false)
                                }}>
                                    <span>🗑️</span> Delete Immediately
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="trash-footer">
                        <p>💡 Right-click an item for options, or double-click to restore</p>
                    </div>
                </div>
            )}
        </ResizableWindow>
    )
}

export default TrashWindow
