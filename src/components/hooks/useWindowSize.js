////////////////////////////////////////////////////////////////////////////////
// FILE: useWindowSize.js
// AUTHOR: David Ruvolo
// CREATED: 2020-05-14
// MODIFIED: 2020-05-14
// PURPOSE: fetches window dimensions on resize
// DEPENDENCIES: NA
// STATUS: workgin
// COMMENTS: @ref: https://usehooks.com/useWindowSize/
////////////////////////////////////////////////////////////////////////////////
// BEGIN
import { useState, useEffect, useCallback } from "react"
// Hook
function useWindowSize() {
    if (typeof window !== "undefined") {
        const isClient = typeof window === 'object';

        const getSize = useCallback(() => {
            return {
                width: isClient ? window.innerWidth : undefined,
                height: isClient ? window.innerHeight : undefined
            };
        }, [isClient])

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
        }, [isClient, getSize]); // Empty array ensures that effect is only run on mount and unmount

        return windowSize;
    }
}
export default useWindowSize