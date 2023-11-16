import { useRef } from "react";

export default function useSlick() {
    const arrowsRef = useRef(null);

    const handleClickNext = () => {
        arrowsRef.current.slickNext();
    };
    const handleClickPrev = () => {
        arrowsRef.current.slickPrev();
    };
    return {
        handleClickNext,
        handleClickPrev,
        arrowsRef,
    }
}