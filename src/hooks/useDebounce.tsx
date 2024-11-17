import {useEffect, useState} from 'react';

export default function useDebounce(value: any, delay: number) {
    
    const [debouncedValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler)
        };
    }, [value, delay]);

    return debouncedValue;
}