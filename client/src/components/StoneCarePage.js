import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert
} from '@mui/material';

const StoneCarePage = () => {
  return (
    <Container maxWidth="lg" className="stone-care-container">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontSize: { xs: '2.3rem', md: '3.2rem' } }}>
          Stone Care
        </Typography>
        
        <Box sx={{ 
          my: 4, 
          p: 3, 
          backgroundColor: 'rgba(0, 0, 0, 0.03)', 
          borderRadius: 2,
          borderLeft: '4px solid',
          borderLeftColor: 'primary.main'
        }}>
          <Typography variant="body1" paragraph sx={{ fontSize: '1.25rem', lineHeight: 1.6, mb: 0 }}>
            Sealing your stone is a very important step that we perform after your stone is installed. 
            <Box component="span" sx={{ fontWeight: 'bold' }}> We suggest resealing your stone every 12-18 months.</Box>
          </Typography>
        </Box>
        
        <Divider sx={{ 
          my: 4, 
          borderColor: 'primary.main', 
          borderWidth: 1,
          '&::before, &::after': {
            borderColor: 'primary.main',
          }
        }}/>
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            How to clean Marble
          </Typography>
          <List sx={{ '& .MuiListItemText-primary': { fontSize: '1.25rem', fontWeight: 'bold', mb: 0.5 }, '& .MuiListItemText-secondary': { fontSize: '1.15rem' } }}>
            <ListItem>
              <ListItemText 
                primary="Step 1:" 
                secondary="Wipe down marble surfaces with a damp rag and buff dry with a chamois for routine weekly cleaning." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 2:" 
                secondary="Use a neutral, non abrasive cleaner (such as acetone, hydrogen peroxide or clear ammonia) for tough stains." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 3:" 
                secondary="Apply the cleaner with a cloth and buff dry." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 4:" 
                secondary="After cleaning, polish marble surfaces using a marble polish containing tin oxide." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 5:" 
                secondary="Protect marble floors with a stone sealer, and use standard non abrasive floor cleaners to clean them." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 6:" 
                secondary="Place coasters under glasses and put plastic under cosmetics on marble surfaces. Use rugs to cover marble floors." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 7:" 
                secondary="Refer scratches of any depth to a professional." 
              />
            </ListItem>
          </List>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            How to clean Granite
          </Typography>
          <List sx={{ '& .MuiListItemText-primary': { fontSize: '1.25rem', fontWeight: 'bold', mb: 0.5 }, '& .MuiListItemText-secondary': { fontSize: '1.15rem' } }}>
            <ListItem>
              <ListItemText 
                primary="Step 1:" 
                secondary="Blot up spills immediately, before they penetrate the surface." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 2:" 
                secondary="Clean stone surfaces with a few drops of neutral cleaner, stone soap (available in hardware stores or from a stone dealer), or mild dishwashing liquid and warm water." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 3:" 
                secondary="Use a soft, clean cloth to clean the granite. Rinse after washing with the soap solution and dry with a soft, clean cloth." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 4:" 
                secondary="Remove a stain on granite, basing the method on the type of stain. Mix a cup of flour, 1–2 tablespoons of dishwashing liquid with water to make a thick paste. Put it on the stain, cover with plastic wrap, and let it sit overnight." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 5:" 
                secondary="Scrape away the mixture with a wooden utensil and rinse. If the stain is oil-based (e.g. grease, oil, milk), use hydrogen peroxide in the paste instead of dishwashing liquid–or try ammonia on it." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 6:" 
                secondary="Try a mixture of 12 percent hydrogen peroxide mixed with a couple drops of ammonia for an organic stain (e.g. coffee, tea, fruit)." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 7:" 
                secondary="Use a lacquer thinner or acetone to remove ink or marker stains from darker stone. On light-colored granite, use hydrogen peroxide to these stains. This also works for wine stains." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 8:" 
                secondary="Mix molding plaster and pure bleach into a paste and spread over a wine, ink or other non-oil stain. Leave on for 30 minutes, then remove and rinse." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 9:" 
                secondary="Paste a mix of molding plaster and water over an oil-based or fat-based stain. Mold it into a bird's-nest shape and allow to stand for 3 hours. Remove and rinse." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 10:" 
                secondary="Reseal the countertop every year or two years. Check with the installer for recommendations. Use a non-toxic sealer on food preparation areas." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 11:" 
                secondary="Consider using a new disinfectant cleaner made specifically for granite." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 12:" 
                secondary="Call your professional stone supplier, installer, or restoration specialist for problems that appear too difficult to treat." 
              />
            </ListItem>
          </List>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            How to clean Limestone
          </Typography>
          <List sx={{ '& .MuiListItemText-primary': { fontSize: '1.25rem', fontWeight: 'bold', mb: 0.5 }, '& .MuiListItemText-secondary': { fontSize: '1.15rem' } }}>
            <ListItem>
              <ListItemText 
                primary="Step 1:" 
                secondary="Wipe up any spills as soon as possible. If left unattended, the spills can etch the polish and dull the finish of the stone. Beverages such as coke and orange juice contain acidic materials that when in contact with limestone can deteriorate the stone." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 2:" 
                secondary="Rinse and dry your natural stone surface after washing. This is very effective on dark stones to get rid of streaks." 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Step 3:" 
                secondary="Daily cleanings should be accompanied by periodic deep cleanings. Daily spot cleaning is simply wiping up any accidental spills promptly. If you do get a stain, attend to it as soon as possible with a slightly stronger solution of detergent and then a poultice if the detergent cleaner is unsuccessful." 
              />
            </ListItem>
          </List>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h2" gutterBottom align="center" sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Tips & Warnings
          </Typography>
          <Alert severity="warning" className="stone-care-warning" sx={{ mb: 2, '& .MuiAlert-message': { fontSize: '1.25rem' } }}>
            Powdered cleansers will scratch or damage marble.
          </Alert>
          <Alert severity="warning" className="stone-care-warning" sx={{ mb: 2, '& .MuiAlert-message': { fontSize: '1.25rem' } }}>
            Even weak acids–vinegar, wine, orange juice, cola–can damage marble. Mop up spills immediately and rinse with water.
          </Alert>
          <Alert severity="error" className="stone-care-danger" sx={{ mb: 2, '& .MuiAlert-message': { fontSize: '1.25rem' } }}>
            DON'T use vinegar, lemon juice, or other cleaners containing acids on your stone.
          </Alert>
          <Alert severity="error" className="stone-care-danger" sx={{ mb: 2, '& .MuiAlert-message': { fontSize: '1.25rem' } }}>
            DON'T use cleaners that contain acid such as bathroom cleaners, grout cleaners, or tub & tile cleaners.
          </Alert>
          <Alert severity="error" className="stone-care-danger" sx={{ mb: 2, '& .MuiAlert-message': { fontSize: '1.25rem' } }}>
            DON'T use abrasive cleaners such as dry cleansers or soft cleansers.
          </Alert>
          <Alert severity="error" className="stone-care-danger" sx={{ mb: 2, '& .MuiAlert-message': { fontSize: '1.25rem' } }}>
            DON'T mix bleach and ammonia; this combination creates a toxic and lethal gas.
          </Alert>
          <Alert severity="error" className="stone-care-danger" sx={{ mb: 2, '& .MuiAlert-message': { fontSize: '1.25rem' } }}>
            DON'T ever mix chemicals together unless directions specifically instruct you to do so.
          </Alert>
        </Box>
      </Paper>
    </Container>
  );
};

export default StoneCarePage;