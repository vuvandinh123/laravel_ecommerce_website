import { useEffect, useState } from "react";

export default function useDropdown(isDrop, dropdowRef, iconRef) {
    const [dropdow, setDropdow] = useState(isDrop);
    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (dropdowRef?.current && !dropdowRef?.current.contains(e.target)&& !iconRef?.current.contains(e.target)) {
                setDropdow(false);
            }
        })
    }, [dropdowRef,dropdow,iconRef])
    return {
        dropdow,
        setDropdow,
    }
}