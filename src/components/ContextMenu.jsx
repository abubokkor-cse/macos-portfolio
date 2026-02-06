import { useState, useEffect, useRef } from 'react'

const ContextMenu = ({ x, y, item, onClose, onAction }) => {
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose()
            }
        }

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [onClose])

    // Adjust position to keep menu in viewport
    const [position, setPosition] = useState({ x, y })

    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect()
            const viewportWidth = window.innerWidth
            const viewportHeight = window.innerHeight

            let newX = x
            let newY = y

            if (x + rect.width > viewportWidth) {
                newX = viewportWidth - rect.width - 10
            }
            if (y + rect.height > viewportHeight) {
                newY = viewportHeight - rect.height - 10
            }

            setPosition({ x: newX, y: newY })
        }
    }, [x, y])

    const menuItems = [
        { id: 'open', label: 'Open', shortcut: '⌘O', action: 'open' },
        { id: 'divider1', type: 'divider' },
        { id: 'getInfo', label: 'Get Info', shortcut: '⌘I', action: 'getInfo' },
        { id: 'rename', label: 'Rename', action: 'rename' },
        { id: 'divider2', type: 'divider' },
        { id: 'duplicate', label: 'Duplicate', shortcut: '⌘D', action: 'duplicate' },
        { id: 'makeAlias', label: 'Make Alias', action: 'makeAlias' },
        { id: 'quickLook', label: 'Quick Look', shortcut: 'Space', action: 'quickLook' },
        { id: 'divider3', type: 'divider' },
        { id: 'copy', label: 'Copy', shortcut: '⌘C', action: 'copy' },
        { id: 'share', label: 'Share...', action: 'share', hasSubmenu: true },
        { id: 'divider4', type: 'divider' },
        { id: 'tags', label: 'Tags...', action: 'tags', hasSubmenu: true },
        { id: 'divider5', type: 'divider' },
        { id: 'moveToTrash', label: 'Move to Bin', shortcut: '⌘⌫', action: 'moveToTrash', danger: true },
    ]

    // Add "Set Desktop Picture" for image files
    if (item?.fileType === 'img') {
        menuItems.splice(menuItems.length - 1, 0, {
            id: 'setDesktop',
            label: 'Set Desktop Picture',
            action: 'setDesktop'
        })
    }

    const handleClick = (action) => {
        onAction(action, item)
        onClose()
    }

    return (
        <div
            ref={menuRef}
            className="context-menu"
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            <ul>
                {menuItems.map((menuItem) => {
                    if (menuItem.type === 'divider') {
                        return <li key={menuItem.id} className="divider" />
                    }

                    return (
                        <li
                            key={menuItem.id}
                            className={`menu-item ${menuItem.danger ? 'danger' : ''}`}
                            onClick={() => handleClick(menuItem.action)}
                        >
                            <span className="label">{menuItem.label}</span>
                            <span className="shortcut">
                                {menuItem.hasSubmenu ? '▶' : menuItem.shortcut || ''}
                            </span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ContextMenu
