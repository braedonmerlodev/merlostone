import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LazyImage from './LazyImage';

// Define both optimized and original image paths
const items = [
    {
        id: 1,
        // Try to use the optimized version first, fall back to original
        image: "/images/optimized/4.jpg",
        originalImage: "/images/4.jpg", 
        thumbImage: "/images/optimized/thumb_4.jpg",
        title: "Merlo Stone Welcomes You!",
        description: ""
    },
    {
        id: 2,
        image: "/images/optimized/2.jpg",
        originalImage: "/images/2.jpg",
        thumbImage: "/images/optimized/thumb_2.jpg", 
        title: "Merlo Stone Welcomes You!",
        description: ""
    },
    {
        id: 3,
        image: "/images/optimized/3.jpg",
        originalImage: "/images/3.jpg",
        thumbImage: "/images/optimized/thumb_3.jpg",
        title: "Merlo Stone Welcomes You!",
        description: ""
    },
    {
        id: 4,
        image: "/images/optimized/1.jpg",
        originalImage: "/images/1.jpg",
        thumbImage: "/images/optimized/thumb_1.jpg",
        title: "Merlo Stone Welcomes You!",
        description: ""
    }
];

const CustomImageSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [optimizedImagesAvailable, setOptimizedImagesAvailable] = useState(false);
    
    // Check if optimized images exist
    useEffect(() => {
        const checkOptimizedImages = async () => {
            try {
                // Try to fetch the first optimized image as a test
                const response = await fetch(items[0].image, { method: 'HEAD' });
                setOptimizedImagesAvailable(response.ok);
            } catch (error) {
                console.log('Optimized images not available, using originals');
                setOptimizedImagesAvailable(false);
            }
        };
        
        checkOptimizedImages();
    }, []);
    
    // Auto advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 6000);
        
        return () => clearInterval(timer);
    }, []);
    
    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };
    
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    };
    
    const handleDotClick = (index) => {
        setActiveIndex(index);
    };
    
    // Helper to get the appropriate image path
    const getImagePath = (item) => {
        // If optimized images exist, use them, otherwise use original
        if (optimizedImagesAvailable) {
            return item.image;
        }
        return item.originalImage;
    };
    
    // Helper to get thumbnail path (for low-quality loading placeholder)
    const getThumbPath = (item) => {
        if (optimizedImagesAvailable) {
            return item.thumbImage;
        }
        // If no optimized images, just use the original as there's no thumb
        return item.originalImage;
    };
    
    return (
        <Box 
            sx={{ 
                position: 'relative',
                height: '100vh',
                width: '100%',
                overflow: 'hidden'
            }}
        >
            {items.map((item, index) => (
                <Box
                    key={item.id}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: activeIndex === index ? 1 : 0,
                        visibility: activeIndex === index ? 'visible' : 'hidden',
                        transition: 'opacity 1s ease-in-out, visibility 1s ease-in-out',
                        zIndex: activeIndex === index ? 1 : 0,
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 2
                        }}
                    />
                    
                    {/* Custom image component with preloading and optimized path selection */}
                    <LazyImage 
                        src={getImagePath(item)}
                        // If we want to try progressive loading with a thumbnail
                        // placeholderUrl={getThumbPath(item)}
                        alt={`Slide ${index + 1}`}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1
                        }}
                        placeholderBgColor="rgba(0, 0, 0, 0.2)"
                        showLoadingIndicator={activeIndex === index}
                    />
                    
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 3
                        }}
                    >
                        <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>
                            {item.title}
                        </Typography>
                        {item.description && (
                            <Typography variant="h5" sx={{ maxWidth: '70%', textAlign: 'center', color: 'white' }}>
                                {item.description}
                            </Typography>
                        )}
                    </Box>
                </Box>
            ))}
            
            {/* Navigation arrows */}
            <IconButton
                onClick={handlePrev}
                sx={{
                    position: 'absolute',
                    left: 20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                    zIndex: 10
                }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>
            
            <IconButton
                onClick={handleNext}
                sx={{
                    position: 'absolute',
                    right: 20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                    zIndex: 10
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
            
            {/* Indicator dots */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1,
                    zIndex: 10
                }}
            >
                {items.map((_, index) => (
                    <Box
                        key={index}
                        onClick={() => handleDotClick(index)}
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: index === activeIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default CustomImageSlider; 