import cover from '../assets/landing_page.jpg'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Container, Typography } from '@mui/material';
import InfoCards from '../components/InfoCards';
import SearchBox from '../components/SearchBox';
import ReviewCarousel from '../components/ReviewCarousel';
import SearchResults from '../components/SearchResults';

function MainPage() {

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%'
        }}>

            <Box sx={{
                backgroundImage: `url(${cover})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: '65vh',
                backgroundPosition: "center",
                display: 'block',
                width: '100%'
            }}>
            </Box>



            <Box sx={{ padding: 10, position: 'relative' }}>
                <SearchBox></SearchBox>
            </Box>

            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 2
            }}>

                <Typography variant="h4">
                    Why Choose Us
                </Typography>

                <InfoCards></InfoCards>

                <ReviewCarousel></ReviewCarousel>

                <Typography variant="h4">
                    Our Dog Sitters
                </Typography>

                <SearchResults preview={true}></SearchResults>

            </Box>

        </Box>
    )
}

export default MainPage