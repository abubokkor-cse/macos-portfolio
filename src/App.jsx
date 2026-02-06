import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Desktop from './components/Desktop'
import Dock from './components/Dock'
import ContextMenu from './components/ContextMenu'
import RenameDialog from './components/RenameDialog'
import FinderWindow from './components/windows/FinderWindow'
import TerminalWindow from './components/windows/TerminalWindow'
import SafariWindow from './components/windows/SafariWindow'
import ContactWindow from './components/windows/ContactWindow'
import PhotosWindow from './components/windows/PhotosWindow'
import ResumeWindow from './components/windows/ResumeWindow'
import TxtFileWindow from './components/windows/TxtFileWindow'
import ImgFileWindow from './components/windows/ImgFileWindow'
import TrashWindow from './components/windows/TrashWindow'
import InfoWindow from './components/windows/InfoWindow'
import WelcomeMessage from './components/WelcomeMessage'
import MobileNavbar from './components/MobileNavbar'
import MobileHome from './components/MobileHome'
import MobileDock from './components/MobileDock'
import { WINDOW_CONFIG, INITIAL_Z_INDEX, locations as initialLocations } from './data/constants'

function App() {
    const [windows, setWindows] = useState(WINDOW_CONFIG)
    const [highestZIndex, setHighestZIndex] = useState(INITIAL_Z_INDEX)
    const [trashItems, setTrashItems] = useState([])
    const [contextMenu, setContextMenu] = useState(null)
    const [renameDialog, setRenameDialog] = useState(null)
    const [desktopItems, setDesktopItems] = useState(initialLocations.work.children)
    const [locations, setLocations] = useState(initialLocations)

    // Debug: log when locations state changes
    useEffect(() => {
        console.log('App: locations state updated:', locations.work.children.map(c => ({ id: c.id, name: c.name })))
    }, [locations])

    const openWindow = (windowType, data = null) => {
        const newZIndex = highestZIndex + 1
        setHighestZIndex(newZIndex)
        setWindows(prev => ({
            ...prev,
            [windowType]: { isOpen: true, zIndex: newZIndex, data }
        }))
    }

    const closeWindow = (windowType) => {
        setWindows(prev => ({
            ...prev,
            [windowType]: { ...prev[windowType], isOpen: false, data: null }
        }))
    }

    const bringToFront = (windowType) => {
        const newZIndex = highestZIndex + 1
        setHighestZIndex(newZIndex)
        setWindows(prev => ({
            ...prev,
            [windowType]: { ...prev[windowType], zIndex: newZIndex }
        }))
    }

    const moveToTrash = (item, originalLocation = 'Desktop') => {
        // Add to trash
        setTrashItems(prev => [...prev, { ...item, originalLocation, deletedAt: new Date(), originalId: item.id }])

        // Remove from desktop items
        setDesktopItems(prev => prev.filter(i => i.id !== item.id))

        // Also update locations state
        setLocations(prev => ({
            ...prev,
            work: {
                ...prev.work,
                children: prev.work.children.filter(i => i.id !== item.id)
            }
        }))
    }

    const restoreFromTrash = (item, deletePermanently = false) => {
        if (deletePermanently) {
            setTrashItems(prev => prev.filter(i => i.originalId !== item.originalId))
        } else {
            // Restore the item to desktop
            const restoredItem = { ...item }
            delete restoredItem.originalLocation
            delete restoredItem.deletedAt
            delete restoredItem.originalId

            setDesktopItems(prev => [...prev, restoredItem])
            setLocations(prev => ({
                ...prev,
                work: {
                    ...prev.work,
                    children: [...prev.work.children, restoredItem]
                }
            }))
            setTrashItems(prev => prev.filter(i => i.originalId !== item.originalId))
        }
    }

    const duplicateItem = (item) => {
        const newItem = {
            ...item,
            id: Date.now(), // Generate new unique ID
            name: `${item.name} copy`,
            position: getNewPosition(item.position)
        }

        setDesktopItems(prev => [...prev, newItem])
        setLocations(prev => ({
            ...prev,
            work: {
                ...prev.work,
                children: [...prev.work.children, newItem]
            }
        }))
    }

    const getNewPosition = (originalPosition) => {
        // Parse original position and offset it
        if (!originalPosition) return 'top-10 left-32'
        const match = originalPosition.match(/top-(\d+)/)
        if (match) {
            const topValue = parseInt(match[1]) + 10
            return originalPosition.replace(/top-\d+/, `top-${topValue}`)
        }
        return originalPosition
    }

    const renameItem = (itemId, newName, parentFolderId = null) => {
        console.log('Renaming item:', itemId, 'to:', newName, 'parentFolderId:', parentFolderId)

        // Update locations state
        setLocations(prev => {
            const newChildren = prev.work.children.map(folder => {
                // If we have a parentFolderId, we're renaming a file inside a folder
                if (parentFolderId !== null && String(folder.id) === String(parentFolderId)) {
                    console.log('Found parent folder:', folder.name)
                    return {
                        ...folder,
                        children: folder.children.map(file => {
                            if (String(file.id) === String(itemId)) {
                                console.log('Found file! Renaming', file.name, 'to', newName)
                                return { ...file, name: newName }
                            }
                            return file
                        })
                    }
                }
                // If no parentFolderId, we're renaming a top-level folder
                if (parentFolderId === null && String(folder.id) === String(itemId)) {
                    console.log('Found folder! Renaming', folder.name, 'to', newName)
                    return { ...folder, name: newName }
                }
                return folder
            })
            return {
                ...prev,
                work: {
                    ...prev.work,
                    children: newChildren
                }
            }
        })

        // Also update desktopItems for top-level folders
        if (parentFolderId === null) {
            setDesktopItems(prev => prev.map(i =>
                String(i.id) === String(itemId) ? { ...i, name: newName } : i
            ))
        }

        setRenameDialog(null)
    }

    const emptyTrash = () => {
        if (window.confirm('Are you sure you want to permanently delete all items in Trash?')) {
            setTrashItems([])
        }
    }

    const showContextMenu = (e, item) => {
        e.preventDefault()
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            item
        })
    }

    const hideContextMenu = () => {
        setContextMenu(null)
    }

    const handleContextMenuAction = (action, item) => {
        switch (action) {
            case 'open':
                if (item.kind === 'folder') {
                    openWindow('finder', { location: 'work', folder: item })
                } else if (item.fileType === 'txt') {
                    openWindow('txtfile', item)
                } else if (item.fileType === 'img') {
                    openWindow('imgfile', item)
                } else if (item.fileType === 'url') {
                    window.open(item.href, '_blank')
                } else if (item.fileType === 'pdf') {
                    openWindow('resume')
                }
                break
            case 'getInfo':
                openWindow('infowindow', item)
                break
            case 'quickLook':
                if (item.fileType === 'img') {
                    openWindow('imgfile', item)
                } else if (item.fileType === 'txt') {
                    openWindow('txtfile', item)
                }
                break
            case 'moveToTrash':
                moveToTrash(item)
                break
            case 'copy':
                navigator.clipboard?.writeText(item.name)
                break
            case 'setDesktop':
                if (item.imageUrl) {
                    document.body.style.backgroundImage = `url(${item.imageUrl})`
                }
                break
            case 'duplicate':
                duplicateItem(item)
                break
            case 'rename':
                setRenameDialog({ item })
                break
            case 'makeAlias':
                // Create an alias (shortcut) - similar to duplicate but marked as alias
                const aliasItem = {
                    ...item,
                    id: Date.now(),
                    name: `${item.name} alias`,
                    isAlias: true,
                    position: getNewPosition(item.position)
                }
                setDesktopItems(prev => [...prev, aliasItem])
                break
            case 'share':
            case 'tags':
                // These could show additional dialogs
                console.log(`${action} action for:`, item.name)
                break
            default:
                break
        }
    }

    return (
        <main onClick={hideContextMenu}>
            <Navbar openWindow={openWindow} />
            
            {/* Mobile Navbar */}
            <MobileNavbar />

            <Desktop
                openWindow={openWindow}
                onContextMenu={showContextMenu}
                deletedItems={new Set()}
                fileState={locations}
            />

            <WelcomeMessage />
            
            {/* Mobile Home Grid */}
            <MobileHome openWindow={openWindow} />
            
            {/* Mobile Dock */}
            <MobileDock openWindow={openWindow} />

            {/* All Windows */}
            {windows.finder.isOpen && (
                <FinderWindow
                    onClose={() => closeWindow('finder')}
                    zIndex={windows.finder.zIndex}
                    bringToFront={() => bringToFront('finder')}
                    openWindow={openWindow}
                    data={windows.finder.data}
                    onContextMenu={showContextMenu}
                    deletedItems={new Set()}
                    fileState={locations}
                />
            )}

            {windows.terminal.isOpen && (
                <TerminalWindow
                    onClose={() => closeWindow('terminal')}
                    zIndex={windows.terminal.zIndex}
                    bringToFront={() => bringToFront('terminal')}
                    openWindow={openWindow}
                />
            )}

            {windows.safari.isOpen && (
                <SafariWindow
                    onClose={() => closeWindow('safari')}
                    zIndex={windows.safari.zIndex}
                    bringToFront={() => bringToFront('safari')}
                />
            )}

            {windows.contact.isOpen && (
                <ContactWindow
                    onClose={() => closeWindow('contact')}
                    zIndex={windows.contact.zIndex}
                    bringToFront={() => bringToFront('contact')}
                />
            )}

            {windows.photos.isOpen && (
                <PhotosWindow
                    onClose={() => closeWindow('photos')}
                    zIndex={windows.photos.zIndex}
                    bringToFront={() => bringToFront('photos')}
                    openWindow={openWindow}
                />
            )}

            {windows.resume.isOpen && (
                <ResumeWindow
                    onClose={() => closeWindow('resume')}
                    zIndex={windows.resume.zIndex}
                    bringToFront={() => bringToFront('resume')}
                />
            )}

            {windows.txtfile.isOpen && (
                <TxtFileWindow
                    onClose={() => closeWindow('txtfile')}
                    zIndex={windows.txtfile.zIndex}
                    bringToFront={() => bringToFront('txtfile')}
                    data={windows.txtfile.data}
                />
            )}

            {windows.imgfile.isOpen && (
                <ImgFileWindow
                    onClose={() => closeWindow('imgfile')}
                    zIndex={windows.imgfile.zIndex}
                    bringToFront={() => bringToFront('imgfile')}
                    data={windows.imgfile.data}
                />
            )}

            {windows.trash.isOpen && (
                <TrashWindow
                    onClose={() => closeWindow('trash')}
                    zIndex={windows.trash.zIndex}
                    bringToFront={() => bringToFront('trash')}
                    trashItems={trashItems}
                    onRestore={restoreFromTrash}
                    onEmptyTrash={emptyTrash}
                />
            )}

            {windows.infowindow?.isOpen && (
                <InfoWindow
                    onClose={() => closeWindow('infowindow')}
                    zIndex={windows.infowindow.zIndex}
                    bringToFront={() => bringToFront('infowindow')}
                    data={windows.infowindow.data}
                />
            )}

            {/* Context Menu */}
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    item={contextMenu.item}
                    onClose={hideContextMenu}
                    onAction={handleContextMenuAction}
                />
            )}

            {/* Rename Dialog */}
            {renameDialog && (
                <RenameDialog
                    item={renameDialog.item}
                    onRename={renameItem}
                    onClose={() => setRenameDialog(null)}
                />
            )}

            <Dock openWindow={openWindow} trashCount={trashItems.length} />
        </main>
    )
}

export default App
