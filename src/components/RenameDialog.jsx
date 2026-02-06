import { useState, useRef, useEffect } from 'react';

const RenameDialog = ({ item, onRename, onClose }) => {
    const [name, setName] = useState(item.name || item.title || 'Untitled');
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            // Pass parentFolderId if the item has one (for files inside folders)
            onRename(item.id, name.trim(), item.parentFolderId || null);
        }
        onClose();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative bg-gray-200 dark:bg-gray-800 rounded-xl shadow-2xl p-6 min-w-[350px]">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Rename</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-600 
                                     text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Rename
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RenameDialog;
