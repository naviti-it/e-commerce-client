import { useDispatch, useSelector } from 'react-redux';
import { Badge, Box, IconButton, Tab, Tabs, useMediaQuery } from '@mui/material';
import { PersonOutline, ShoppingBagOutlined, MenuOutlined, SearchOutlined, ClearOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme'
import { filterByCategory, setIsCartOpen, setIsMenuCategoryOpen } from '../../state'
import { useState, useEffect } from 'react';



const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart)
    const isMenuCategoryOpen = useSelector((state) => state.cart.isMenuCategoryOpen)
    const [category, setCategory] = useState('all');
    const isNonMobile = useMediaQuery('(min-width:800px)');

    const handleChange = (event, newValue) => {
        setCategory(newValue);
    }

    useEffect(() => {
        dispatch(filterByCategory(category))
    }, [category, dispatch])

    return <Box
        display='flex'
        alignItems='center'
        width='100%'
        height='60px'
        mt='10px'
        backgroundColor='rgba(255, 255, 255, 0,95)'
        color='black'
        position='fixed'
        top='0'
        left='0'
        zIndex='1'>
        <Box
            width='80%'
            margin='auto'
            display='flex'
            justifyContent='space-between'
            alignItems='center'>
            <Box
                onClick={() => navigate('/')}
                sx={{ '&:hover': { cursor: 'pointer' } }}
                color={shades.secondary[500]}
            >
                ECOMMER
            </Box>
            <Tabs

                textColor='secondary'
                indicatorColor='secondary'
                value={category}
                onClick={() => navigate('items')}
                onChange={handleChange}
                centered

                sx={{
                    display: isNonMobile ? 'block' : 'none',
                    borderRadius: '15px',
                    '&:hover': { backgroundColor: 'rgba(245, 245, 245, 0.8)' }
                }
                }
            >
                <Tab label='All' value='all' />
                <Tab label='NEW ARRIVALS' value='newArrivals' />
                <Tab label='BEST SELLERS' value='bestSellers' />
                <Tab label='TOP RATED' value='topRated' />
            </Tabs>

            <Box
                display='flex'
                justifyContent='space-between'
                columnGap='20px'
                zIndex='2'
            >
                <IconButton sx={{ color: 'black' }}>
                    <SearchOutlined />
                </IconButton>
                <IconButton sx={{ color: 'black' }}>
                    <PersonOutline />
                </IconButton>
                <Badge
                    badgeContent={cart.length}
                    color='secondary'
                    invisible={cart.length === 0}
                    sx={{
                        '& .MuiBadge-badge': {
                            right: 5,
                            top: 5,
                            padding: '0 4px',
                            height: '14px',
                            minWidth: '13px',

                        }
                    }}
                >
                    <IconButton
                        sx={{
                            color: 'black',
                        }}
                        onClick={() => dispatch(setIsCartOpen({}))}>
                        <ShoppingBagOutlined />
                    </IconButton>
                </Badge>
                {!isNonMobile && <IconButton sx={{
                    color: 'black',
                }} onClick={() => dispatch(setIsMenuCategoryOpen({}))}>
                    <MenuOutlined />
                </IconButton>}
            </Box>
        </Box>

        {/* MOBILE MENU CATEGORY */}
        {!isNonMobile && isMenuCategoryOpen && (
            <Box
                position='fixed'
                top='0'
                right='50%'
                zIndex={10}
                width='150px'
                height='auto'
                marginRight='-75px'
                backgroundColor='rgba(245, 245, 245, 0.8)'
                padding='5px'
                borderRadius='15px'

            >
                <Box
                    justifyContent='flex-end'
                    display='flex'
                >
                    <IconButton
                        onClick={() => dispatch(setIsMenuCategoryOpen({}))}
                        sx={{
                            color: 'black',
                            width: '24px',
                            height: '24px'
                        }}
                    >
                        <ClearOutlined />
                    </IconButton>
                </Box>
                <Tabs
                    textColor='secondary'
                    indicatorColor='secondary'
                    value={category}
                    onClick={() => navigate('items')}
                    onChange={handleChange}
                    centered
                    orientation="vertical"
                >
                    <Tab label='All' value='all' />
                    <Tab label='NEW ARRIVALS' value='newArrivals' />
                    <Tab label='BEST SELLERS' value='bestSellers' />
                    <Tab label='TOP RATED' value='topRated' />
                </Tabs>
            </Box>)
        }
    </Box >
}

export default Navbar;