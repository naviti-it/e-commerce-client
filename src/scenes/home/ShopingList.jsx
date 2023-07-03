import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import Item from '../../components/Item';
import { setItems } from '../../state'
import { API_URL } from './../../utils/url';
import Loader from './Loader';

const ShopingList = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const items = useSelector((state) => state.cart.items);
    const filteredItems = useSelector((state) => state.cart.filteredItems)


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

    return (
        <Box
            width='80%'
            margin='100px auto'
        >
            <Typography
                variant='h3'
                textAlign='center'
                marginBottom='20px'
            >
                Our Feature <b>Products</b>
            </Typography>

            {loading && <Loader />}

            <Box
                margin='1 auto'
                display='grid'
                gridTemplateColumns='repeat(auto-fill, 300px)'
                justifyContent='space-around'
                rowGap='20px'
                columnGap='1.33%'
            >
                {filteredItems.length > 0 ?
                    filteredItems?.map((item) => (
                        <Item item={item} key={`${item.name} - ${item.id}`} />
                    )) :
                    items?.map((item) => (
                        <Item item={item} key={`${item.name} - ${item.id}`} />
                    ))}
            </Box>
        </Box>
    )
}

export default ShopingList; 