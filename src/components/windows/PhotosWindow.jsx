import ResizableWindow from '../ResizableWindow'
import WindowControls from '../WindowControls'
import { photosLinks, gallery } from '../../data/constants'

const PhotosWindow = ({ onClose, zIndex, bringToFront, openWindow }) => {
    const handlePhotoClick = (photo) => {
        openWindow('imgfile', {
            name: `Photo ${photo.id}.png`,
            imageUrl: photo.img
        })
    }

    return (
        <ResizableWindow
            id="photos"
            zIndex={zIndex}
            bringToFront={bringToFront}
            defaultWidth={800}
            defaultHeight={550}
            defaultLeft={120}
            defaultTop={70}
        >
            {({ toggleFullscreen }) => (
                <>
                    <div className="window-header" id="window-header" onDoubleClick={toggleFullscreen}>
                        <WindowControls onClose={onClose} onFullscreen={toggleFullscreen} />
                        <h2 className="font-bold text-sm flex-1 text-center">Gallery</h2>
                        <div className="w-16" />
                    </div>

                    <div className="flex" style={{ height: 'calc(100% - 52px)' }}>
                        {/* Sidebar */}
                        <div className="sidebar">
                            <h2>Library</h2>
                            <ul>
                                {photosLinks.map((link) => (
                                    <li key={link.id}>
                                        <img src={link.icon} alt={link.title} />
                                        <p>{link.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Gallery Grid */}
                        <div className="gallery flex-1" style={{ overflow: 'auto' }}>
                            <ul>
                                {gallery.map((photo) => (
                                    <li
                                        key={photo.id}
                                        onClick={() => handlePhotoClick(photo)}
                                        className="cursor-pointer hover:opacity-80 transition-opacity"
                                    >
                                        <img src={photo.img} alt={`Gallery ${photo.id}`} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </ResizableWindow>
    )
}

export default PhotosWindow
