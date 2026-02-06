const MobileHome = ({ openWindow }) => {
    const apps = [
        { id: 'finder', name: 'Portfolio', icon: '/images/finder.png' },
        { id: 'safari', name: 'Articles', icon: '/images/safari.png' },
        { id: 'photos', name: 'Gallery', icon: '/images/photos.png' },
        { id: 'contact', name: 'Contact', icon: '/images/contact.png' },
        { id: 'terminal', name: 'Skills', icon: '/images/terminal.png' },
        { id: 'resume', name: 'Resume', icon: '/images/pages.png' },
    ]

    return (
        <section id="mobile-home">
            <ul>
                {apps.map((app) => (
                    <li key={app.id} onClick={() => openWindow(app.id)}>
                        <img src={app.icon} alt={app.name} />
                        <span>{app.name}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default MobileHome
