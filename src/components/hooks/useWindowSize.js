////////////////////////////////////////////////////////////////////////////////
// FILE: useWindowSize.js
// AUTHOR: David Ruvolo
// CREATED: 2020-05-14
// MODIFIED: 2020-05-18
// PURPOSE: fetches window dimensions on resize
// DEPENDENCIES: NA
// STATUS: workgin
// COMMENTS: @ref: https://usehooks.com/useWindowSize/
////////////////////////////////////////////////////////////////////////////////
import { useState, useEffect } from "react"
export const useWindowSize = () => {
    const isClient = typeof window === 'object';

    function getSize() {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
}