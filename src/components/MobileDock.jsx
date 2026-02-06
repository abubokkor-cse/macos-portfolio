const MobileDock = ({ openWindow }) => {
    const dockApps = [
        { id: 'finder', name: 'Portfolio', icon: '/images/finder.png' },
        { id: 'safari', name: 'Articles', icon: '/images/safari.png' },
        { id: 'photos', name: 'Gallery', icon: '/images/photos.png' },
        { id: 'contact', name: 'Contact', icon: '/images/contact.png' },
    ]

    return (
        <section id="mobile-dock">
            <div className="mobile-dock-container">
                {dockApps.map((app) => (
                    <button
                        key={app.id}
                        className="dock-icon"
                        onClick={() => openWindow(app.id)}
                        aria-label={app.name}
                    >
                        <img src={app.icon} alt={app.name} />
                    </button>
                ))}
            </div>
        </section>
    )
}

export default MobileDock
