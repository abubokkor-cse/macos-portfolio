import ResizableWindow from '../ResizableWindow'
import WindowControls from '../WindowControls'

const ImgFileWindow = ({ onClose, zIndex, bringToFront, data }) => {
    if (!data) return null

    return (
        <ResizableWindow
            id="imgfile"
            zIndex={zIndex}
            bringToFront={bringToFront}
            defaultWidth={600}
            defaultHeight={500}
            defaultLeft={220}
            defaultTop={90}
        >
            {({ toggleFullscreen }) => (
                <>
                    <div className="window-header" id="window-header" onDoubleClick={toggleFullscreen}>
                        <WindowControls onClose={onClose} onFullscreen={toggleFullscreen} />
                        <p>{data.name}</p>
                        <div className="flex gap-2">
                            <img src="/icons/rotate.svg" alt="Rotate" className="w-4 h-4" />
                            <img src="/icons/share.svg" alt="Share" className="w-4 h-4" />
                            <img src="/icons/edit.svg" alt="Edit" className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="preview" style={{ height: 'calc(100% - 52px)', overflow: 'auto' }}>
                        <img
                            src={data.imageUrl}
                            alt={data.name}
                        />
                    </div>
                </>
            )}
        </ResizableWindow>
    )
}

export default ImgFileWindow
