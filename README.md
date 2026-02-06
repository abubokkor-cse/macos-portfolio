# macOS Portfolio

A stunning and interactive macOS-inspired web portfolio that replicates the Apple desktop experience with resizable windows, smooth animations, and authentic macOS UI elements.

![macOS Portfolio Preview](https://via.placeholder.com/800x500/000000/FFFFFF?text=macOS+Portfolio+Preview)

## ✨ Features

### 🖥️ Authentic macOS Experience
- **Resizable Windows** - All applications support drag, resize, and fullscreen just like real macOS
- **Window Controls** - Red (close), yellow (minimize), green (fullscreen) traffic light buttons
- **Dock Animation** - Smooth hover effects and realistic dock behavior
- **Control Center** - Apple Liquid Glass styling with backdrop blur effects
- **Menu Bar** - Complete with system status indicators and time display

### 📱 Responsive Design
- **Desktop First** - Optimized for desktop viewing with full macOS experience
- **Mobile Friendly** - Adaptive design with mobile-specific components
- **Cross-platform** - Works seamlessly across all modern browsers

### 🎨 Interactive Applications
- **Finder** - Browse portfolio projects and files
- **Safari** - Web browser simulation with search functionality  
- **Terminal** - Interactive command-line interface
- **Photos** - Image gallery with preview capabilities
- **Contact** - Get in touch form with social links
- **Resume** - PDF viewer displaying professional CV
- **Text Editor** - View and edit text documents
- **Trash** - File management system

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.9
- **Styling**: Tailwind CSS 4.0.0
- **Window Management**: re-resizable
- **Animations**: CSS Transitions & Transforms
- **Icons**: Custom SVG icons
- **Font**: SF Pro Display (system font)

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/abubokkor-cse/macos-portfolio.git
cd macos-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173` to view the portfolio

## 📖 Usage

### Desktop Experience
- **Click** on dock icons to open applications
- **Drag** windows by their title bars to move them around
- **Resize** windows by dragging from edges or corners
- **Double-click** window headers or click green button for fullscreen
- **Right-click** for context menus (where applicable)

### Mobile Experience
- **Tap** on app icons to open applications
- **Swipe** through different sections
- **Tap** outside windows to close them

## 📁 Project Structure

```
macos-portfolio/
├── public/
│   ├── files/           # Resume and document files
│   ├── icons/           # Application icons
│   └── images/          # Project screenshots and assets
├── src/
│   ├── components/
│   │   ├── windows/     # Individual application windows
│   │   ├── ResizableWindow.jsx
│   │   ├── WindowControls.jsx
│   │   ├── ContextMenu.jsx
│   │   └── ...
│   ├── styles/
│   │   └── index.css    # Main stylesheet with Tailwind
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Entry point
├── package.json
└── README.md
```

## 🎯 Key Components

### ResizableWindow
Wrapper component that makes any window draggable, resizable, and fullscreen-capable.

### WindowControls  
Traffic light buttons (close, minimize, maximize) with authentic macOS styling.

### Dock
Bottom application launcher with bounce animations and hover effects.

### Control Center
Apple-inspired glass morphism design with system controls.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

Please make sure to update tests as appropriate and follow the existing code style.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Md. Abu Bokkor**
- 📧 Email: [abubokkor.cse@gmail.com](mailto:abubokkor.cse@gmail.com)
- 🐙 GitHub: [@abubokkor-cse](https://github.com/abubokkor-cse)
- 💼 LinkedIn: [Connect with me](https://www.linkedin.com/in/md-abubokkor)

## 🙏 Acknowledgments

- Apple Inc. for the beautiful macOS design inspiration
- React community for amazing tools and libraries
- Tailwind CSS for utility-first styling approach

---

**Made with ❤️ and attention to detail**
