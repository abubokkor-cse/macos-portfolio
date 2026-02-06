import { useState, useRef } from 'react'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'

const ResizableWindow = ({
    children,
    id,
    zIndex,
    bringToFront,
    defaultWidth = 600,
    defaultHeight = 500,
    minWidth = 300,
    minHeight = 200,
    defaultTop = 80,
    defaultLeft = 150
}) => {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight })
    const [position, setPosition] = useState({ x: defaultLeft, y: defaultTop })
    const nodeRef = useRef(null)

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen)
    }

    if (isFullscreen) {
        return (
            <div
                ref={nodeRef}
                id={id}
                className="fullscreen-window"
                style={{
                    position: 'fixed',
                    top: '28px',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: 'calc(100vh - 28px)',
                    zIndex,
                    borderRadius: 0
                }}
                data-fullscreen="true"
            >
                {typeof children === 'function'
                    ? children({ toggleFullscreen, isFullscreen })
                    : children}
            </div>
        )
    }

    return (
        <Draggable
            handle=".window-header"
            onStart={bringToFront}
            nodeRef={nodeRef}
            position={position}
            onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
        >
            <div ref={nodeRef} style={{ position: 'absolute' }}>
                <Resizable
                    size={size}
                    onResizeStop={(e, direction, ref, d) => {
                        setSize({
                            width: size.width + d.width,
                            height: size.height + d.height,
                        })
                    }}
                    minWidth={minWidth}
                    minHeight={minHeight}
                    enable={{
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        topRight: true,
                        bottomRight: true,
                        bottomLeft: true,
                        topLeft: true
                    }}
                >
                    <div
                        id={id}
                        style={{
                            zIndex,
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        {typeof children === 'function'
                            ? children({ toggleFullscreen, isFullscreen })
                            : children}
                    </div>
                </Resizable>
            </div>
        </Draggable>
    )
}

export default ResizableWindow
