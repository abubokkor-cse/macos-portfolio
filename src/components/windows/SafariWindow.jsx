import ResizableWindow from '../ResizableWindow'
import WindowControls from '../WindowControls'
import { blogPosts } from '../../data/constants'

const SafariWindow = ({ onClose, zIndex, bringToFront }) => {
    return (
        <ResizableWindow
            id="safari"
            zIndex={zIndex}
            bringToFront={bringToFront}
            defaultWidth={900}
            defaultHeight={600}
            defaultLeft={100}
            defaultTop={60}
        >
            {({ toggleFullscreen }) => (
                <>
                    <div className="window-header" id="window-header" onDoubleClick={toggleFullscreen}>
                        <WindowControls onClose={onClose} onFullscreen={toggleFullscreen} />
                        <div className="search">
                            <img src="/icons/search.svg" alt="Search" className="w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search or enter website"
                                className="flex-1 outline-none bg-transparent text-sm"
                                readOnly
                            />
                        </div>
                        <div className="w-16" />
                    </div>

                    <div className="blog" style={{ height: 'calc(100% - 52px)', overflow: 'auto' }}>
                        <h2>📚 Latest Articles & Tutorials</h2>

                        <div className="space-y-8">
                            {blogPosts.map((post) => (
                                <div key={post.id} className="blog-post">
                                    <div className="col-span-2">
                                        <img src={post.image} alt={post.title} />
                                    </div>
                                    <div className="content">
                                        <p>{post.date}</p>
                                        <h3>{post.title}</h3>
                                        <a href={post.link} target="_blank" rel="noopener noreferrer">
                                            Read more
                                            <img src="/icons/share.svg" alt="Link" className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </ResizableWindow>
    )
}

export default SafariWindow
