import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, IconButton, Tooltip, Fade, Slider, Popover, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import SettingsIcon from '@mui/icons-material/Settings';
import { AudioContext } from '../App';
import { useImages } from '../contexts/ImageContext';

// Path to the audio file (will be resolved with our context)
const AUDIO_FILE = 'audio/ms-track.mp3';

const AudioPlayer = () => {
  const { audioState, setAudioState } = useContext(AudioContext);
  const { resolveImagePath, pathMode } = useImages();
  const [isPlaying, setIsPlaying] = useState(audioState.isPlaying);
  const [volume, setVolume] = useState(audioState.volume);
  const [anchorEl, setAnchorEl] = useState(null);
  const [audioError, setAudioError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const audioRef = useRef(null);
  
  // Initialize audio element once on mount
  useEffect(() => {
    console.log('Initializing audio player...');
    
    // Resolve the audio path using our context
    const audioPath = resolveImagePath(AUDIO_FILE);
    console.log(`Loading audio from: ${audioPath} (using ${pathMode} strategy)`);
    
    // Create audio element
    const audio = new Audio(audioPath);
    audio.loop = true;
    audio.volume = volume / 100; // Convert percentage to decimal
    audio.onerror = (e) => {
      console.error('Audio loading error:', e);
      setAudioError(true);
    };
    audioRef.current = audio;
    
    // Clean up on unmount
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [volume, resolveImagePath, pathMode]); // Include context dependencies
  
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
    if (!audioRef.current || audioError) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.warn('Audio playback was prevented:', e);
          // Auto-play might be blocked by browser policy
          setIsPlaying(false);
          setAudioState(prev => ({ ...prev, isPlaying: false }));
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioError, setAudioState]);
  
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
    if (audioError) {
      // If there was an error loading audio, try reloading with a different strategy
      if (audioRef.current && retryCount < 2) {
        setRetryCount(prev => prev + 1);
        
        // Try a different path strategy
        const retryPath = retryCount === 0
          ? resolveImagePath(AUDIO_FILE, { absolute: true })
          : resolveImagePath(AUDIO_FILE, { withPublicUrl: false });
          
        console.log(`Retrying audio with alternate path: ${retryPath}`);
        audioRef.current.src = retryPath;
        audioRef.current.load();
        setAudioError(false);
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Get the appropriate volume icon
  const getVolumeIcon = () => {
    if (!isPlaying || volume === 0 || audioError) {
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
          title={audioError 
            ? retryCount < 2 
              ? "Audio failed to load, click to retry" 
              : "Audio could not be loaded (Codespaces limitation)" 
            : (isPlaying ? "Mute audio" : "Play audio")
          }
          placement="left"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <IconButton 
            color="primary" 
            onClick={toggleAudio}
            aria-label={isPlaying ? "Mute audio" : "Play audio"}
            className="audio-player-button"
            disabled={audioError && retryCount >= 2}
            sx={{ 
              color: audioError ? (retryCount < 2 ? 'orange' : 'rgba(255, 255, 255, 0.5)') : 'white',
              '&:hover': {
                color: audioError ? (retryCount < 2 ? 'orange' : 'rgba(255, 255, 255, 0.5)') : '#fff',
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
            disabled={audioError && retryCount >= 2}
            sx={{ 
              color: audioError ? (retryCount < 2 ? 'orange' : 'rgba(255, 255, 255, 0.5)') : 'white',
              '&:hover': {
                color: audioError ? (retryCount < 2 ? 'orange' : 'rgba(255, 255, 255, 0.5)') : '#fff',
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
          
          {audioError && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
              {retryCount < 2 
                ? "Error loading audio. Click the audio button to retry with a different path." 
                : "Error loading audio file. This may be due to Codespaces environment limitations."}
            </Typography>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default AudioPlayer; 