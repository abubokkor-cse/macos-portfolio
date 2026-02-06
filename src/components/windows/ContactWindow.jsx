import ResizableWindow from '../ResizableWindow'
import WindowControls from '../WindowControls'
import { socials } from '../../data/constants'

const ContactWindow = ({ onClose, zIndex, bringToFront }) => {
    return (
        <ResizableWindow
            id="contact"
            zIndex={zIndex}
            bringToFront={bringToFront}
            defaultWidth={500}
            defaultHeight={450}
            defaultLeft={200}
            defaultTop={100}
        >
            {({ toggleFullscreen }) => (
                <>
                    <div className="window-header" id="window-header" onDoubleClick={toggleFullscreen}>
                        <WindowControls onClose={onClose} onFullscreen={toggleFullscreen} />
                        <h2>Contact</h2>
                        <div className="w-16" />
                    </div>

                    <div className="p-8 space-y-6" style={{ height: 'calc(100% - 52px)', overflow: 'auto' }}>
                        <h3>Let's Connect! 🤝</h3>
                        <p className="text-gray-600">
                            Feel free to reach out for collaborations, opportunities, or just to say hi!
                        </p>

                        <ul>
                            {socials.map((social) => (
                                <li key={social.id} style={{ backgroundColor: social.bg }}>
                                    <a href={social.link} target="_blank" rel="noopener noreferrer">
                                        <img src={social.icon} alt={social.text} className="w-8 h-8" />
                                        <p>{social.text}</p>
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                                📧 Email: <a href="mailto:abubokkor.cse@gmail.com" className="text-blue-600 hover:underline">abubokkor.cse@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </>
            )}
        </ResizableWindow>
    )
}

export default ContactWindow
