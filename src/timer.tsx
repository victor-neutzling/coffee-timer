import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

export function Timer() {
    const duration = 240; 
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isCompleted, setIsCompleted] = useState(false);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
     const progressBarColor = isCompleted ? '#8aeea3ff':  '#8abeeeff';

    const sendNotification = () => {
      const command = 'echo Hello, World!';  // You can replace this with any shell command
      try{
        const result = (window as any).electron.runShellCommand(`notify-send -h "string:sound-name:bell" -i info "Coffee is Ready!" "Your coffee is ready." `)
      }catch(error){
        console.log(error)
      }

    };

    useEffect(() => {
        const interval = 1000;
        const timer = setInterval(() => {
        setTimeLeft(prev => {
            if (prev <= 1) {
                    clearInterval(timer);
                    setIsCompleted(true); 
                    sendNotification();
                    return 0;
                }
                return prev - 1;
        });

        setProgress(prev => Math.min(prev + 100 / duration, 100));
        }, interval);

        return () => clearInterval(timer);
    }, []);

    return (
        <Box sx={{ marginTop: "56px", display: "flex", flexDirection: 'column', alignItems: 'center', gap: "4px"}}>
            <Typography sx={{zIndex: 999}} variant="h6">{`${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`}</Typography>
            <CircularProgress variant="determinate" value={progress} size={'120px'} thickness={22} sx={{
                    marginTop: '-80px',
                    transition: 'color 0.5s ease',
                    color: progressBarColor
                }} />
        </Box>
    )
}