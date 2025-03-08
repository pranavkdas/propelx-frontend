'use client'
import { createContext, useContext, useState } from 'react';

const DnDContext = createContext([null, (_) => { }]);

export const DnDProvider = ({ children }) => {
    const [type, setType] = useState(null);
    const [data, setData] = useState(null);

    return (
        <DnDContext.Provider value={[type, setType, data, setData]}>
            {children}
        </DnDContext.Provider>
    );
}

export default DnDContext;

export const useDnD = () => {
    return useContext(DnDContext);
}