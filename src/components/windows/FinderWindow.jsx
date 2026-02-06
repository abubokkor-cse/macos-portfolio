import ResizableWindow from '../ResizableWindow'
import WindowControls from '../WindowControls'
import { useState, useMemo } from 'react'

const FinderWindow = ({
    onClose,
    zIndex,
    bringToFront,
    openWindow,
    data,
    onContextMenu,
    deletedItems = new Set(),
    fileState = {}
}) => {
    const [activeLocation, setActiveLocation] = useState(data?.location || 'work')
    const [currentFolderId, setCurrentFolderId] = useState(data?.folder?.id || null)

    // Use fileState instead of static locations
    const locationData = fileState[activeLocation] || { name: 'Unknown', icon: '', children: [] }

    // Get the current folder from fileState (so it stays updated)
    const currentFolder = useMemo(() => {
        if (currentFolderId === null) return null
        return locationData.children?.find(f => f.id === currentFolderId) || null
    }, [currentFolderId, locationData.children])

    // Get items and filter out deleted ones
    const allItems = currentFolder ? currentFolder.children : locationData.children || []
    const displayItems = allItems.filter(item => !deletedItems.has(item.id))

    const handleLocationChange = (locationType) => {
        setActiveLocation(locationType)
        setCurrentFolderId(null)
    }

    const handleItemDoubleClick = (item) => {
        if (item.kind === 'folder') {
            setCurrentFolderId(item.id)
        } else if (item.kind === 'file') {
            switch (item.fileType) {
                case 'txt':
                    openWindow('txtfile', item)
                    break
                case 'img':
                    openWindow('imgfile', item)
                    break
                case 'url':
                    window.open(item.href, '_blank')
                    break
                case 'pdf':
                    openWindow('resume')
                    break
                case 'fig':
                    window.open(item.href, '_blank')
                    break
                default:
                    break
            }
        }
    }

    const handleRightClick = (e, item) => {
        e.preventDefault()
        e.stopPropagation()
        if (onContextMenu) {
            // If we're inside a folder, pass the folder's id as parentFolderId
            const parentFolderId = currentFolder ? currentFolder.id : null
            onContextMenu(e, { ...item, parentLocation: activeLocation, parentFolderId })
        }
    }

    return (
        <ResizableWindow
            id="finder"
            zIndex={zIndex}
            bringToFront={bringToFront}
            defaultWidth={800}
            defaultHeight={500}
            defaultLeft={140}
            defaultTop={80}
        >
            {({ toggleFullscreen }) => (
                <>
                    <div className="window-header" id="window-header" onDoubleClick={toggleFullscreen}>
                        <WindowControls onClose={onClose} onFullscreen={toggleFullscreen} />
                        <h2 className="font-bold text-sm flex-1 text-center">
                            {currentFolder ? currentFolder.name : locationData.name}
                        </h2>
                        <div className="w-16" />
                    </div>

                    <div className="flex h-full" style={{ height: 'calc(100% - 52px)' }}>
                        {/* Sidebar */}
                        <div className="sidebar">
                            <h3>Favorites</h3>
                            <ul>
                                {Object.entries(fileState).map(([key, loc]) => (
                                    <li
                                        key={loc.id}
                                        className={activeLocation === key ? 'active' : 'not-active'}
                                        onClick={() => handleLocationChange(key)}
                                    >
                                        <img src={loc.icon} alt={loc.name} className="w-4 h-4" />
                                        <span className="text-sm">{loc.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Content */}
                        <div className="content">
                            {displayItems.map((item) => (
                                <li
                                    key={item.id}
                                    className={`group ${item.position || ''}`}
                                    onDoubleClick={() => handleItemDoubleClick(item)}
                                    onContextMenu={(e) => handleRightClick(e, item)}
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.name}
                                    />
                                    <p>{item.name}</p>
                                </li>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </ResizableWindow>
    )
}

export default FinderWindow
