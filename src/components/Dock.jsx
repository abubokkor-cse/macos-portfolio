import { Tooltip } from 'react-tooltip'
import { dockApps } from '../data/constants'

const Dock = ({ openWindow, trashCount = 0 }) => {
    const handleDockClick = (app) => {
        if (app.canOpen) {
            openWindow(app.id)
        }
    }

    const getTrashIcon = () => {
        return trashCount > 0 ? '/images/trash-full.png' : '/images/trash.png'
    }

    return (
        <div id="dock">
            <div className="dock-container">
                {dockApps.map((app) => (
                    <div
                        key={app.id}
                        className="dock-icon"
                        data-tooltip-id={`dock-${app.id}`}
                        data-tooltip-content={app.id === 'trash' && trashCount > 0
                            ? `Trash (${trashCount} items)`
                            : app.name
                        }
                        onClick={() => handleDockClick(app)}
                    >
                        <img
                            src={app.id === 'trash' ? getTrashIcon() : `/images/${app.icon}`}
                            alt={app.name}
                            className="w-full h-full object-contain hover:scale-110 transition-transform"
                        />
                        <Tooltip
                            id={`dock-${app.id}`}
                            place="top"
                            className="tooltip"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dock
