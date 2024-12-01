import { useEffect, useState } from "react";

export function useLocalStorage(key:string, initialValue: any) {
    const [value, setValue] = useState(() => {
        let storadValue = localStorage.getItem(key)
        return storadValue ? JSON.parse(storadValue) : initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue] as const
}