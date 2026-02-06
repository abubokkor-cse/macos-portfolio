import ResizableWindow from '../ResizableWindow'
import WindowControls from '../WindowControls'

const InfoWindow = ({ onClose, zIndex, bringToFront, data }) => {
    if (!data) return null

    const getFileSize = () => {
        // Simulated file sizes
        const sizes = {
            folder: '-- items',
            txt: '4 KB',
            img: '2.4 MB',
            pdf: '156 KB',
            url: '1 KB',
            fig: '8 KB',
        }
        return sizes[data.fileType] || sizes[data.kind] || '0 KB'
    }

    const getCreatedDate = () => {
        return 'January 1, 2026 at 10:00 AM'
    }

    const getModifiedDate = () => {
        return 'January 6, 2026 at 8:42 PM'
    }

    return (
        <ResizableWindow
            id="infowindow"
            zIndex={zIndex}
            bringToFront={bringToFront}
            defaultWidth={350}
            defaultHeight={450}
            defaultLeft={300}
            defaultTop={100}
            minWidth={280}
            minHeight={350}
        >
            {({ toggleFullscreen }) => (
                <>
                    <div className="window-header" id="window-header" onDoubleClick={toggleFullscreen}>
                        <WindowControls onClose={onClose} onFullscreen={toggleFullscreen} />
                        <h2>{data.name} Info</h2>
                        <div className="w-16" />
                    </div>

                    <div className="info-content">
                        {/* Icon and Name */}
                        <div className="info-header">
                            <img src={data.icon} alt={data.name} className="info-icon" />
                            <div className="info-name">
                                <input
                                    type="text"
                                    defaultValue={data.name}
                                    className="name-input"
                                    readOnly
                                />
                            </div>
                        </div>

                        {/* General Info */}
                        <div className="info-section">
                            <div className="section-header">
                                <span className="arrow">▼</span>
                                <span>General:</span>
                            </div>
                            <div className="section-content">
                                <div className="info-row">
                                    <span className="label">Kind:</span>
                                    <span className="value">
                                        {data.kind === 'folder' ? 'Folder' : data.fileType?.toUpperCase() + ' File'}
                                    </span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Size:</span>
                                    <span className="value">{getFileSize()}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Where:</span>
                                    <span className="value">/Users/abubokkor/Portfolio</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Created:</span>
                                    <span className="value">{getCreatedDate()}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Modified:</span>
                                    <span className="value">{getModifiedDate()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="info-section">
                            <div className="section-header">
                                <span className="arrow">▼</span>
                                <span>Tags:</span>
                            </div>
                            <div className="section-content">
                                <div className="tags-row">
                                    <span className="tag red"></span>
                                    <span className="tag orange"></span>
                                    <span className="tag yellow"></span>
                                    <span className="tag green"></span>
                                    <span className="tag blue"></span>
                                    <span className="tag purple"></span>
                                    <span className="tag gray"></span>
                                </div>
                            </div>
                        </div>

                        {/* Preview for images */}
                        {data.fileType === 'img' && data.imageUrl && (
                            <div className="info-section">
                                <div className="section-header">
                                    <span className="arrow">▼</span>
                                    <span>Preview:</span>
                                </div>
                                <div className="section-content">
                                    <img src={data.imageUrl} alt="Preview" className="preview-img" />
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </ResizableWindow>
    )
}

export default InfoWindow
