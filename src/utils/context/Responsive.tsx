import React, { createContext, useEffect } from 'react'

const WindowSizeContext = createContext<number>(window.innerWidth);

interface WindowSizeProviderProps {
    children: React.ReactNode;
}

const WindowSizeProvider: React.FC<WindowSizeProviderProps> = ({ children }) => {
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WindowSizeContext.Provider value={windowSize}>
            {children}
        </WindowSizeContext.Provider>
    );
}

export { WindowSizeContext, WindowSizeProvider };