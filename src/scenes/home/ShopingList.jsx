import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Tab, Tabs, useMediaQuery, LinearProgress } from '@mui/material';
import Item from '../../components/Item';
import { setItems } from '../../state'
import { API_URL } from './../../utils/url';

const ShopingList = () => {

    const dispatch = useDispatch();
    const [value, setValue] = useState('all');
    const [loading, setLoading] = useState(true)
    const items = useSelector((state) => state.cart.items);
    const isNonMobile = useMediaQuery('(min-width:600px)');

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    async function getItems() {
        setLoading(true)
        try {
            const items = await fetch(
                `${API_URL}/api/items?populate=image`,
                {
                    method: 'GET',
                }
            );


            const itemsJson = await items.json();
            setLoading(false)
            dispatch(setItems(itemsJson.data))
        }
        catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    useEffect(() => {
        getItems();
    }, []);

    const topRatedItems = items.filter(
        (item) => item.attributes.category === 'topRated'
    );
    const newArrivalsItems = items.filter(
        (item) => item.attributes.category === 'newArrivals'
    );
    const bestSellersItems = items.filter(
        (item) => item.attributes.category === 'bestSellers'
    );

    return (
        <Box
            width='80%'
            margin='80px auto'
        >
            <Typography
                variant='h3'
                textAlign='center'
            >
                Our Feature <b>Products</b>
            </Typography>
            <Tabs
                textColor='primary'
                indicatorColor='primary'
                value={value}
                onChange={handleChange}
                centered
                TabIndicatorProps={{
                    sx: { display: isNonMobile ? 'block' : 'none' }
                }}
                sx={{
                    m: '25px',
                    '& .MuiTabs-flexContainer': {
                        flexWrap: 'wrap'
                    }
                }}
            >
                <Tab label='All' value='all' />
                <Tab label='NEW ARRIVALS' value='newArrivals' />
                <Tab label='BEST SELLERS' value='bestSellers' />
                <Tab label='TOP RATED' value='topRated' />
            </Tabs>
            <Box
                margin='1 auto'
                display='grid'
                gridTemplateColumns='repeat(auto-fill, 300px)'
                justifyContent='space-around'
                rowGap='20px'
                columnGap='1.33%'

            >   {loading && <LinearProgress />}
                {value === 'all' && items.map((item) => (
                    <Item item={item} key={`${item.name} - ${item.id}`} />
                ))}
                {value === 'newArrivals' && newArrivalsItems.map((item) => (
                    <Item item={item} key={`${item.name} - ${item.id}`} />
                ))}
                {value === 'bestSellers' && bestSellersItems.map((item) => (
                    <Item item={item} key={`${item.name} - ${item.id}`} />
                ))}
                {value === 'topRated' && topRatedItems.map((item) => (
                    <Item item={item} key={`${item.name} - ${item.id}`} />
                ))}
            </Box>
        </Box>
    )
}

export default ShopingList; 