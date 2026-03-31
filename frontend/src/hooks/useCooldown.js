import { useEffect, useState } from 'react';


function useCooldown(seconds, cooldownKey) {
    const [ timeLeft, setTimeLeft ] = useState(() => {
        const savedExpiry = localStorage.getItem(cooldownKey);
        if (!savedExpiry) return 0;
    
        const secondsRemaining = Math.floor((parseInt(savedExpiry) - Date.now()) /1000);
        return secondsRemaining? secondsRemaining : 0;
    });
    
    
    const start = () => {
        const now = Date.now();
        const expiryDate = now + (seconds * 1000);
        localStorage.setItem(cooldownKey, expiryDate.toString());
        setTimeLeft(seconds)
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            localStorage.removeItem(cooldownKey);
            return;
        };

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                const newValue = prev - 1;
                if (newValue <= 0) {
                    localStorage.removeItem(cooldownKey);
                    return(0);
                }
                return newValue;
            });
        }, 1000);

        return () => clearInterval(interval);

    }, [timeLeft, cooldownKey]);


    return { timeLeft, isActive: timeLeft > 0, start };

};

export default useCooldown;