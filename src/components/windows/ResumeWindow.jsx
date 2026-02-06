import ResizableWindow from '../ResizableWindow'
import WindowControls from '../WindowControls'

const ResumeWindow = ({ onClose, zIndex, bringToFront }) => {
    return (
        <ResizableWindow
            id="resume"
            zIndex={zIndex}
            bringToFront={bringToFront}
            defaultWidth={700}
            defaultHeight={600}
            defaultLeft={200}
            defaultTop={60}
        >
            {({ toggleFullscreen }) => (
                <>
                    <div className="window-header" id="window-header" onDoubleClick={toggleFullscreen}>
                        <WindowControls onClose={onClose} onFullscreen={toggleFullscreen} />
                        <h2>Engineering_cv_by_Abubokkor.pdf</h2>
                        <div className="w-16" />
                    </div>

                    <div className="resume-content" style={{ height: 'calc(100% - 52px)' }}>
                        <iframe
                            src="/files/Engineering_cv_by_Abubokkor.pdf"
                            title="Resume"
                            width="100%"
                            height="100%"
                            style={{ border: 'none' }}
                        />
                    </div>
                </>
            )}
        </ResizableWindow>
    )
}

export default ResumeWindow
