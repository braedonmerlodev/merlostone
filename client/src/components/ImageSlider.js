import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Box, Typography } from '@mui/material';

// Sample images - replace these with your actual work images
const items = [
    {
        id: 1,
        image: "linear-gradient(to right, #434343 0%, black 100%)",
        title: "Project One",
        description: "Modern architectural design"
    },
    {
        id: 2,
        image: "linear-gradient(to top, #09203f 0%, #537895 100%)",
        title: "Project Two",
        description: "Interior design concept"
    },
    {
        id: 3,
        image: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
        title: "Project Three",
        description: "Landscape design"
    },
    {
        id: 4,
        image: "linear-gradient(to right, #868f96 0%, #596164 100%)",
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
                backgroundImage: item.image.includes('gradient') 
                    ? item.image 
                    : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})`,
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