const WindowControls = ({ onClose, onFullscreen }) => {
    return (
        <div id="window-controls">
            <button className="close" onClick={onClose} aria-label="Close" />
            <button className="minimize" aria-label="Minimize" />
            <button className="maximize" onClick={onFullscreen} aria-label="Maximize" />
        </div>
    )
}

export default WindowControls
