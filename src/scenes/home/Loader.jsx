import React from 'react'
import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <Box
            textAlign='center'
        >
            <CircularProgress color='primary' size={100}
            />
        </Box>
    )
}

export default Loader