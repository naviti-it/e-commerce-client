import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, IconButton, Typography, Tabs, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { shades } from '../../theme'
import { addToCart } from '../../state'
import { useParams } from 'react-router-dom';
import Item from '../../components/Item'
import { API_URL, STRAPI_API_TOKEN } from './../../utils/url';


const ItemDetails = () => {

    const dispatch = useDispatch();
    const { itemId } = useParams();
    const [value, setValue] = useState('description');
    const [count, setCount] = useState(1);
    const [item, setItem] = useState(null);
    const [items, setItems] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const getItem = async () => {
        const item = await fetch(
            `${API_URL}/api/items/${itemId}?populate=*`,
            {
                method: 'GET',
            }
        )

        const itemJson = await item.json();
        setItem(itemJson.data);
    }

    console.log('getItem', item);

    const getItems = async () => {
        const items = await fetch(
            `${API_URL}/api/items?populate=*`,
            {
                method: 'GET',

            }
        )

        const itemsJson = await items.json();
        setItems(itemsJson.data);
    }
    console.log('getITEMS', items);


    useEffect(() => {
        getItem();
        getItems();
    }, [itemId])

    return (
        <Box width='80%' m='80px auto'>
            <Box
                display='flex'
                flexWrap='wrap'

            >
                {/* IMAGES */}
                <Box
                    flex='1 1 40%'
                    mb='40px'
                >
                    <img
                        alt={item?.attributes?.name}
                        width='100%'
                        height='100%'
                        src={item?.attributes?.image?.data?.attributes?.formats?.medium?.url}
                        style={{ objectFit: 'contain' }}
                    />
                </Box>

                {/* ACTIONS */}
                <Box
                    flex='1 1 50%'
                    pl='40px'
                    mb='40px'

                >
                    <Box
                        display='flex'
                        justifyContent='space-between'>
                        <Box>Home/Item</Box>
                        <Box>Prev Next</Box>
                    </Box>
                    <Box>
                        <Box m='65px 0 25px 0'>
                            <Typography variant='h3'>
                                {item?.attributes?.name}
                            </Typography>
                            <Typography>
                                ${item?.attributes?.price}
                            </Typography>
                            <Typography
                                sx={{ mt: '20px' }}
                            >
                                {item?.attributes?.longDescription}
                            </Typography>
                        </Box>

                        {/* COUNT AND BUTTON */}
                        <Box
                            display='flex'
                            alignItems='center'
                            minHeight='50px'
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                border={`1px solid ${shades.neutral[300]}`}
                                mr='20px'
                                p='2px 5px'
                            >
                                <IconButton
                                    onClick={() => setCount(Math.max(count - 1, 1))}>
                                    <RemoveIcon />
                                </IconButton>
                                <Typography
                                    sx={{ p: '0 5px' }}
                                >
                                    {count}
                                </Typography>
                                <IconButton
                                    onClick={() => setCount(count + 1)}>
                                    <AddIcon />
                                </IconButton>
                            </Box>
                            <Button
                                sx={{
                                    backgroundColor: '#222222',
                                    color: 'white',
                                    borderRadius: 0,
                                    minWidth: '150px',
                                    padding: '10px 40px',
                                    '&:hover': { backgroundColor: shades.primary[200] }
                                }}
                                onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
                            >
                                ADD TO CART
                            </Button>
                        </Box>
                        <Box>
                            <Box
                                m='20px 0 5px 0'
                                display='flex'

                            >
                                <FavoriteBorderOutlinedIcon />
                                <Typography
                                    sx={{ ml: '5px' }}
                                >
                                    ADD TO WISHLIST
                                </Typography>
                            </Box>
                            <Typography>
                                CATEGORIES: {item?.attributes?.category}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* INFORMATION */}
            <Box
                m='20px 0'
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                >
                    <Tab label='DESCRIPTION' value='description' />
                    <Tab label='REVIEWS' value='reviews' />
                </Tabs>
            </Box>
            <Box
                display='flex'
                flexWrap='wrap'
                gap='55px'
            >
                {value === 'description' && (
                    <div>
                        {item?.attributes?.longDescription}
                    </div>
                )}
                {value === 'reviews' && (
                    <div>
                        reviews
                    </div>
                )}
            </Box>

            {/* RELATED ITEMS */}
            <Box
                mt='50px'
                width='100%'
            >
                <Typography
                    variant='h3'
                    fontWeight='bold'
                >
                    Related Products
                </Typography>
                <Box
                    mt='20px'
                    display='flex'
                    flexWrap='wrap'
                    columnGap='1.33%'
                    justifyContent='space-between'
                >
                    {items.slice(0, 4).map((item, index) => (
                        <Item key={`${item.name}-${index}`} item={item} />
                    ))}
                </Box>
            </Box>
        </Box >
    )
}

export default ItemDetails; 