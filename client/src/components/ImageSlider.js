import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box, Typography } from '@mui/material';

// Use actual images from the images folder in specified order
const items = [
    {
        id: 1,
        image: "/images/1.jpg",
        title: "Merlo Stone Welcomes You!",
        description: ""
    },
    {
        id: 2,
        image: "/images/2.jpg",
        title: "Merlo Stone Welcomes You!",
        description: ""
    },
    {
        id: 3,
        image: "/images/3.jpg",
        title: "Merlo Stone Welcomes You!",
        description: ""
    },
    {
        id: 4,
        image: "/images/4.jpg",
        title: "Merlo Stone Welcomes You!",
        description: ""
    }
];

const ImageSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    
    // Debug logging
    useEffect(() => {
        console.log("Current active slide:", activeIndex);
    }, [activeIndex]);

    const handleChange = (now) => {
        setActiveIndex(now);
    };

    return (
        <Box sx={{ 
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            zIndex: 0
        }}>
            <Carousel
                navButtonsAlwaysVisible
                animation="fade"  // Changed from "slide" to "fade" for smoother transitions
                autoPlay={true}
                interval={6000}
                timeout={1000}  // Transition duration
                indicators={true}
                swipe={true}
                index={activeIndex}
                onChange={handleChange}
                sx={{
                    height: '100%'
                }}
                navButtonsProps={{
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: 0,
                        padding: '10px',
                        margin: '0 20px'
                    }
                }}
                indicatorIconButtonProps={{
                    style: {
                        margin: '0 5px',
                        color: 'rgba(255, 255, 255, 0.5)'
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        color: 'white'
                    }
                }}
            >
                {items.map((item, index) => (
                    <Item key={item.id} item={item} index={index} />
                ))}
            </Carousel>
        </Box>
    );
};

const Item = ({ item, index }) => {
    // Add a pre-loading hook for images
    useEffect(() => {
        const img = new Image();
        img.src = item.image;
        img.onload = () => console.log(`Image ${index + 1} loaded:`, item.image);
        img.onerror = () => console.error(`Error loading image ${index + 1}:`, item.image);
    }, [item.image, index]);

    return (
        <Paper
            sx={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                borderRadius: 0
            }}
            elevation={0}
        >
            <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                {item.title}
            </Typography>
            {item.description && (
                <Typography variant="h5" sx={{ maxWidth: '70%', textAlign: 'center' }}>
                    {item.description}
                </Typography>
            )}
        </Paper>
    );
};

export default ImageSlider; 