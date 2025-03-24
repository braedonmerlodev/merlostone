import React, { useState, useEffect, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './AliceCarouselSlider.css';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useImages } from '../contexts/ImageContext';

// Define the slider items with simplified paths
const items = [
    {
        id: 1,
        image: "4.jpg", // Using simplified paths that our context will resolve
        title: "Merlo Stone Welcomes You!",
        description: ""
    },
    {
        id: 2,
        image: "2.jpg",
        title: "Merlo Stone Welcomes You!",
        description: ""
    },
    {
        id: 3,
        image: "3.jpg",
        title: "Merlo Stone Welcomes You!",
        description: ""
    },
    {
        id: 4,
        image: "1.jpg",
        title: "Merlo Stone Welcomes You!",
        description: ""
    }
];

const AliceCarouselSlider = () => {
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [errors, setErrors] = useState({});
    const carouselRef = useRef(null);
    
    // Use our ImageContext for consistent path resolution
    const { resolveImagePath, pathMode, loading: imageContextLoading } = useImages();

    // Log when component mounts
    useEffect(() => {
        console.log("AliceCarouselSlider component mounted");
        console.log(`Using image path strategy from context: ${pathMode}`);
        
        // Log environment info
        console.log("Current origin:", window.location.origin);
        console.log("PUBLIC_URL:", process.env.PUBLIC_URL || 'not set');
        
        // Return cleanup function
        return () => {
            console.log("AliceCarouselSlider component unmounting");
        };
    }, [pathMode]);

    // Preload images using ImageContext
    useEffect(() => {
        // Only start loading images once ImageContext has initialized
        if (imageContextLoading) {
            console.log("Waiting for ImageContext to initialize...");
            return;
        }
        
        console.log(`Preloading carousel images using strategy from ImageContext (${pathMode})...`);
        
        // Create an object to track loading status for each image
        const loadingStatus = {};
        let loadedCount = 0;
        const totalImages = items.length;
        
        const checkAllLoaded = () => {
            if (loadedCount >= totalImages) {
                console.log("All carousel images loaded");
                setLoading(false);
            }
        };
        
        // Load all images in parallel
        items.forEach((item, index) => {
            const img = new Image();
            
            // Get path from ImageContext
            const imagePath = resolveImagePath(item.image);
            console.log(`Attempting to load carousel image ${index + 1} from: ${imagePath}`);
            
            img.src = imagePath;
            
            img.onload = () => {
                console.log(`Carousel image ${index + 1} loaded successfully: ${imagePath}`);
                loadingStatus[index] = true;
                loadedCount++;
                checkAllLoaded();
                
                // If the first image is loaded, show the carousel even if others are still loading
                if (index === 0 && loading) {
                    setLoading(false);
                }
            };
            
            img.onerror = () => {
                console.error(`Failed to load carousel image ${index + 1}: ${imagePath}`);
                
                // Try the optimized fallback if we're not already using it
                if (!imagePath.includes('optimized')) {
                    // Try with optimized path
                    const fallbackPath = resolveImagePath(item.image, { useOptimized: true });
                    console.log(`Trying optimized fallback URL: ${fallbackPath}`);
                    
                    const fallbackImg = new Image();
                    fallbackImg.src = fallbackPath;
                    
                    fallbackImg.onload = () => {
                        console.log(`Optimized fallback image loaded: ${fallbackPath}`);
                        loadingStatus[index] = true;
                        loadedCount++;
                        checkAllLoaded();
                        
                        // If the first image is loaded, show the carousel even if others are still loading
                        if (index === 0 && loading) {
                            setLoading(false);
                        }
                    };
                    
                    fallbackImg.onerror = () => {
                        console.error(`Both primary and optimized images failed to load for slide ${index + 1}`);
                        loadingStatus[index] = false;
                        setErrors(prev => ({ ...prev, [index]: { 
                            primary: imagePath, 
                            fallback: fallbackPath 
                        }}));
                        loadedCount++;
                        checkAllLoaded();
                    };
                } else {
                    console.error(`Image failed to load and no fallback available for slide ${index + 1}`);
                    loadingStatus[index] = false;
                    setErrors(prev => ({ ...prev, [index]: { 
                        primary: imagePath, 
                        fallback: null 
                    }}));
                    loadedCount++;
                    checkAllLoaded();
                }
            };
        });

        // Failsafe - if images take too long, show carousel anyway after 3 seconds
        const timeout = setTimeout(() => {
            if (loading) {
                console.log("Loading timeout reached, showing carousel anyway");
                setLoading(false);
            }
        }, 3000);
        
        return () => clearTimeout(timeout);
    }, [imageContextLoading, pathMode, resolveImagePath, loading]);

    // Create slide items for the carousel using ImageContext
    const renderSlideItems = () => {
        return items.map((item, index) => {
            // Get image path from context
            const imagePath = resolveImagePath(item.image);
            
            // For fallback, use optimized version if primary is not optimized
            const fallbackPath = !imagePath.includes('optimized') 
                ? resolveImagePath(item.image, { useOptimized: true })
                : null;
            
            // Add console logging for debugging
            console.log(`Rendering carousel slide ${index + 1} with image: ${imagePath}`);
            if (fallbackPath) {
                console.log(`Fallback image path: ${fallbackPath}`);
            }
            
            // Check if we had an error for this image
            const hasError = errors[index];
            
            return (
                <div key={item.id} className="carousel-item">
                    <div className="carousel-image-container">
                        {/* Overlay */}
                        <div className="carousel-overlay" />
                        
                        {/* Show error state if both image and fallback failed */}
                        {hasError ? (
                            <div 
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    zIndex: 2
                                }}
                            >
                                <Typography color="error" variant="h4" sx={{ mb: 2 }}>
                                    Image Failed to Load
                                </Typography>
                                <Typography color="white" variant="body1">
                                    Primary: {hasError.primary}
                                </Typography>
                                {hasError.fallback && (
                                    <Typography color="white" variant="body1">
                                        Fallback: {hasError.fallback}
                                    </Typography>
                                )}
                            </div>
                        ) : null}
                        
                        {/* Image with error handling and fallback */}
                        <img 
                            src={imagePath} 
                            alt={`Slide ${index + 1}`} 
                            className="carousel-image"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                opacity: 1,
                                transition: 'opacity 0.5s ease-in'
                            }}
                            // Add error handling to fall back to optimized images if regular ones fail
                            onError={(e) => {
                                if (fallbackPath && e.target.src !== fallbackPath) {
                                    console.log(`Image failed to load, trying fallback: ${fallbackPath}`);
                                    e.target.src = fallbackPath;
                                } else {
                                    console.error(`Both primary and fallback images failed for slide ${index + 1}`);
                                    // Mark this image as having an error
                                    setErrors(prev => ({ ...prev, [index]: { 
                                        primary: imagePath, 
                                        fallback: fallbackPath 
                                    }}));
                                    // Hide the broken image
                                    e.target.style.display = 'none';
                                }
                            }}
                        />
                        
                        {/* Text overlay */}
                        <div className="carousel-content">
                            <Typography 
                                variant="h3" 
                                component="h2" 
                                sx={{ 
                                    fontWeight: 'bold', 
                                    mb: 2, 
                                    color: 'white',
                                    textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
                                }}
                            >
                                {item.title}
                            </Typography>
                            {item.description && (
                                <Typography 
                                    variant="h5" 
                                    sx={{ 
                                        maxWidth: '70%', 
                                        textAlign: 'center', 
                                        color: 'white',
                                        textShadow: '1px 1px 3px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            )}
                        </div>
                    </div>
                </div>
            );
        });
    };

    // Custom navigation buttons
    const renderPrevButton = ({ isDisabled }) => {
        return (
            <IconButton
                className="custom-prev-btn"
                disabled={isDisabled}
                onClick={(e) => {
                    e.stopPropagation();
                    if (carouselRef.current) {
                        carouselRef.current.slidePrev();
                    }
                }}
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
        );
    };

    const renderNextButton = ({ isDisabled }) => {
        return (
            <IconButton
                className="custom-next-btn"
                disabled={isDisabled}
                onClick={(e) => {
                    e.stopPropagation();
                    if (carouselRef.current) {
                        carouselRef.current.slideNext();
                    }
                }}
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
        );
    };

    const handleSlideChanged = (e) => {
        setActiveIndex(e.item);
    };

    // Alice Carousel settings
    const responsive = {
        0: { items: 1 },
        568: { items: 1 },
        1024: { items: 1 },
    };

    return (
        <Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
            {loading || imageContextLoading ? (
                <Box 
                    sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)'
                    }}
                >
                    <CircularProgress size={60} sx={{ color: 'white' }} />
                </Box>
            ) : (
                <>
                    <AliceCarousel
                        ref={carouselRef}
                        mouseTracking
                        items={renderSlideItems()}
                        responsive={responsive}
                        controlsStrategy="alternate"
                        autoPlay
                        autoPlayInterval={6000}
                        animationDuration={1000}
                        animationType="fadeout"
                        infinite
                        disableDotsControls={false}
                        disableButtonsControls={true}
                        paddingLeft={0}
                        paddingRight={0}
                        autoHeight={false}
                        renderPrevButton={renderPrevButton}
                        renderNextButton={renderNextButton}
                        activeIndex={activeIndex}
                        onSlideChanged={handleSlideChanged}
                        className="alice-carousel__dots"
                    />
                </>
            )}
            
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 10
                    }}
                >
                    <CircularProgress sx={{ color: 'white' }} />
                </Box>
            )}
        </Box>
    );
};

export default AliceCarouselSlider; 