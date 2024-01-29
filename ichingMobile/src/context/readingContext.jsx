import { createContext, useContext, useState } from "react";

const ReadingContext = createContext();

export function useReadingContext() {
    return useContext(ReadingContext)
}

export function ReadingProvider({children}) {
    const [bg, setBg] = useState(null)
    const readingValues = {
        bg,
        setBg
    }

    return (
        <ReadingContext.Provider value={readingValues}>
            {children}
        </ReadingContext.Provider>
    )
}
