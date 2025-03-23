import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, IconButton, Tooltip, Fade, Slider, Popover, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import SettingsIcon from '@mui/icons-material/Settings';
import { AudioContext } from '../App';

// Path to the audio file
const AUDIO_FILE = '/images/audio/ms-track.mp3';

const AudioPlayer = () => {
  const { audioState, setAudioState } = useContext(AudioContext);
  const [isPlaying, setIsPlaying] = useState(audioState.isPlaying);
  const [volume, setVolume] = useState(audioState.volume);
  const [anchorEl, setAnchorEl] = useState(null);
  const audioRef = useRef(null);
  
  // Initialize audio element once on mount
  useEffect(() => {
    // Create audio element
    const audio = new Audio(AUDIO_FILE);
    audio.loop = true;
    audio.volume = volume / 100; // Convert percentage to decimal
    audioRef.current = audio;
    
    // Clean up on unmount
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [volume]); // Include volume as dependency since we use it
  
  // Sync local state with context
  useEffect(() => {
    setIsPlaying(audioState.isPlaying);
    setVolume(audioState.volume);
  }, [audioState]);
  
  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  // Handle play/pause state changes separately
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.warn('Audio playback was prevented:', e);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  // Update global context when local state changes
  useEffect(() => {
    setAudioState({
      isPlaying,
      volume
    });
  }, [isPlaying, volume, setAudioState]);

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
    localStorage.setItem('audioVolume', JSON.stringify(newValue));
  };

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
          gap: 1,
          animation: 'none' // Remove animation to improve performance
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
              },
              position: 'relative'
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