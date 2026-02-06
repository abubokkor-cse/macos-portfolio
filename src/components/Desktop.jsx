import { useEffect, useState, useRef } from 'react'
import Draggable from 'react-draggable'

const Desktop = ({ openWindow, onContextMenu, deletedItems = new Set(), fileState = {}, onUpdatePosition }) => {
    // Get work projects from fileState or empty array
    const workProjects = fileState.work?.children || []
    const [renderKey, setRenderKey] = useState(0)

    // Store positions locally for smooth dragging
    const [positions, setPositions] = useState({})
    const nodeRefs = useRef({})

    // Force re-render when workProjects changes
    useEffect(() => {
        console.log('Desktop projects changed:', JSON.stringify(workProjects.map(p => ({ id: p.id, name: p.name }))))
        setRenderKey(prev => prev + 1)
    }, [JSON.stringify(workProjects)])

    // Filter out deleted items
    const visibleProjects = workProjects.filter(p => !deletedItems.has(p.id))

    const handleDoubleClick = (project) => {
        openWindow('finder', {
            location: 'work',
            folder: project
        })
    }

    const handleRightClick = (e, project) => {
        e.preventDefault()
        e.stopPropagation()
        onContextMenu(e, { ...project, parentLocation: 'work' })
    }

    const handleDragStop = (projectId, e, data) => {
        // Update local position
        setPositions(prev => ({
            ...prev,
            [projectId]: { x: data.x, y: data.y }
        }))
        // Optionally update parent state
        if (onUpdatePosition) {
            onUpdatePosition(projectId, { x: data.x, y: data.y })
        }
    }

    // Get or create ref for each project
    const getNodeRef = (id) => {
        if (!nodeRefs.current[id]) {
            nodeRefs.current[id] = { current: null }
        }
        return nodeRefs.current[id]
    }

    // Calculate initial positions based on index - LEFT side like macOS
    const getInitialPosition = (project, index) => {
        if (positions[project.id]) {
            return positions[project.id]
        }
        // Default grid layout - LEFT side of screen (like macOS)
        const col = Math.floor(index / 6)
        const row = index % 6
        return {
            x: 20 + (col * 100),  // Left side, 20px from edge
            y: 50 + (row * 100)
        }
    }

    return (
        <div id="home" key={renderKey}>
            {visibleProjects.map((project, index) => {
                const nodeRef = getNodeRef(project.id)
                const initialPos = getInitialPosition(project, index)

                return (
                    <Draggable
                        key={project.id}
                        nodeRef={nodeRef}
                        defaultPosition={initialPos}
                        position={positions[project.id] || null}
                        onStop={(e, data) => handleDragStop(project.id, e, data)}
                        bounds="parent"
                    >
                        <div
                            ref={el => nodeRef.current = el}
                            className="desktop-icon group"
                            onDoubleClick={() => handleDoubleClick(project)}
                            onContextMenu={(e) => handleRightClick(e, project)}
                        >
                            <img
                                src={project.icon}
                                alt={project.name}
                                className="w-16 h-16 object-contain"
                                draggable={false}
                            />
                            <p data-text={project.name}>{project.name}</p>
                        </div>
                    </Draggable>
                )
            })}
        </div>
    )
}

export default Desktop
