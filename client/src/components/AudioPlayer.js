import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Tooltip, Fade, Slider, Popover, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import SettingsIcon from '@mui/icons-material/Settings';

// You should replace this with your actual audio file path
const AUDIO_FILE = '/audio/background-music.mp3';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [volume, setVolume] = useState(30);
  const [anchorEl, setAnchorEl] = useState(null);
  const audioRef = useRef(null);

  const handleSettingsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'volume-popover' : undefined;

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue / 100;
    }
  };

  useEffect(() => {
    // Create audio element
    const audio = new Audio(AUDIO_FILE);
    audio.loop = true;
    audio.volume = volume / 100; // Convert percentage to decimal
    audioRef.current = audio;

    // Add event listeners
    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true);
    });

    audio.addEventListener('error', (e) => {
      console.error('Error loading audio file:', e);
      setAudioLoaded(false);
      setIsPlaying(false);
    });

    // Try to automatically play audio when the component mounts
    if (isPlaying) {
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn('Autoplay was prevented by browser policy:', error);
          setIsPlaying(false);
        });
      }
    }

    // Cleanup function
    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('canplaythrough', () => {});
      audio.removeEventListener('error', () => {});
    };
  }, [isPlaying, volume]);

  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      // Using a promise to handle autoplay policy
      const playPromise = audioRef.current.play();
      
      // Modern browsers return a promise
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
          })
          .catch(error => {
            // Autoplay was prevented
            console.warn('Autoplay was prevented by browser policy:', error);
            setIsPlaying(false);
          });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioLoaded]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  // Get the appropriate volume icon
  const getVolumeIcon = () => {
    if (!isPlaying || volume === 0) {
      return <VolumeOffIcon />;
    } else if (volume < 50) {
      return <VolumeDownIcon />;
    } else {
      return <VolumeUpIcon />;
    }
  };

  return (
    <>
      <Box
        className="audio-player-container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Tooltip 
          title={isPlaying ? "Mute audio" : "Play audio"} 
          placement="left"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <IconButton 
            color="primary" 
            onClick={toggleAudio}
            aria-label={isPlaying ? "Mute audio" : "Play audio"}
            className="audio-player-button"
            sx={{ 
              color: 'white',
              '&:hover': {
                color: '#fff',
              }
            }}
          >
            {getVolumeIcon()}
          </IconButton>
        </Tooltip>
        
        <Tooltip
          title="Audio settings"
          placement="left"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <IconButton
            aria-describedby={id}
            onClick={handleSettingsClick}
            className="audio-player-button"
            sx={{ 
              color: 'white',
              '&:hover': {
                color: '#fff',
              }
            }}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2, width: 200 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Volume
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <VolumeOffIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Slider
              aria-label="Volume"
              value={volume}
              onChange={handleVolumeChange}
              size="small"
            />
            <VolumeUpIcon sx={{ ml: 1, color: 'text.secondary' }} />
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default AudioPlayer; 