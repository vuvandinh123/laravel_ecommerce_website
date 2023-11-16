import { useEffect, useState } from "react";

export default function useCountDown(timeCountDown) {
    const [time, setTime] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    useEffect(() => {
        const countdown = setInterval(() => {
            let days = 0; let hours = 0; let minutes = 0; let seconds = 0;
            let now = new Date().getTime();
            let distance = timeCountDown - now;
            if (distance > 0) {
                days = Math.floor(distance / (1000 * 60 * 60 * 24));
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTime({ 
                    days,
                    hours,
                    minutes,
                    seconds
                })
            }
        }, 1000)
        return () => clearInterval(countdown)
    }, [timeCountDown])
    return {
        time
    }
}