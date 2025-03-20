import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box, Typography } from '@mui/material';

// Sample images - replace these with your actual work images
const items = [
    {
        id: 1,
        image: "https://source.unsplash.com/random/1600x900/?architecture",
        title: "Project One",
        description: "Modern architectural design"
    },
    {
        id: 2,
        image: "https://source.unsplash.com/random/1600x900/?interior",
        title: "Project Two",
        description: "Interior design concept"
    },
    {
        id: 3,
        image: "https://source.unsplash.com/random/1600x900/?landscape",
        title: "Project Three",
        description: "Landscape design"
    },
    {
        id: 4,
        image: "https://source.unsplash.com/random/1600x900/?construction",
        title: "Project Four",
        description: "Commercial construction"
    }
];

const ImageSlider = () => {
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
                animation="slide"
                interval={6000}
                duration={1000}
                swipe
                indicators={true}
                sx={{
                    height: '100%'
                }}
            >
                {items.map((item) => (
                    <Item key={item.id} item={item} />
                ))}
            </Carousel>
        </Box>
    );
};

const Item = ({ item }) => {
    return (
        <Paper
            sx={{
                height: '100vh',
                width: '100%',
                position: 'relative',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
            <Typography variant="h5" sx={{ maxWidth: '70%', textAlign: 'center' }}>
                {item.description}
            </Typography>
        </Paper>
    );
};

export default ImageSlider; 