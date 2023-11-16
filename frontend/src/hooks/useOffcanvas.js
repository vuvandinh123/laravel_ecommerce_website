import { useState, useEffect } from 'react';
import {useSelector } from 'react-redux';

export default function useOffcanvas(is, activeRef, iconRef) {
    const [isOpen, setIsOpen] = useState(is);
    const { isOpen: isOpenCart } = useSelector((state) => state.cart);
    useEffect(() => {
        const body = document.body;
        (isOpen || isOpenCart) ? body.classList.add('overflow-y-hidden') : body.classList.remove('overflow-y-hidden');
        const handleClickOutside = (e) => {
            if (activeRef.current && !activeRef.current.contains(e.target) && !iconRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen, isOpenCart, activeRef, iconRef]);

    return {
        isOpen,
        setIsOpen,
    };
}
