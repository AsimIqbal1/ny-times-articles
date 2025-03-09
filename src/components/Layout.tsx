import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">NY Times Most Popular Articles</Typography>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 3 }}>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout; 