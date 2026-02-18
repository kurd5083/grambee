import { useState, useEffect } from "react"

const useMaxResize = () => {
    const [widthScreen, setWidthScreen] = useState(Math.min(window.innerWidth, 767));

    useEffect(() => {
        const handleResize = () => setWidthScreen(Math.min(window.innerWidth, 767));

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return { widthScreen }
}

export default useMaxResize
