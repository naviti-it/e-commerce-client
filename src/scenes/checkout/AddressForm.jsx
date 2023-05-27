import { Box, useMediaQuery, TextField } from '@mui/material';
import { getIn } from 'formik';

const AddressForm = ({
    type,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
}) => {

    const isNoneMobile = useMediaQuery('(min-width:600px)');

    const formatedName = (field) => `${type}.${field}`;

    const formatedError = (field) =>
        Boolean(
            getIn(touched, formatedName(field)) &&
            getIn(errors, formatedName(field))
        );

    const formatedHelper = (field) =>
        getIn(touched, formatedName(field)) &&
        getIn(errors, formatedName(field))

    return (
        <Box
            display='grid'
            gap='15px'
            gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            sx={{ '&>div': { gridColumn: isNoneMobile ? undefined : 'span 4' } }}
        >
            <TextField
                fullWidth
                type='text'
                label='First Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name={formatedName('firstName')}
                error={formatedError('firstName')}
                helperText={formatedHelper('firstName')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField
                fullWidth
                type='text'
                label='Last Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name={formatedName('lastName')}
                error={formatedError('lastName')}
                helperText={formatedHelper('lastName')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField
                fullWidth
                type='text'
                label='Country'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name={formatedName('country')}
                error={formatedError('country')}
                helperText={formatedHelper('country')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField
                fullWidth
                type='text'
                label='Street Address'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street1}
                name={formatedName('street1')}
                error={formatedError('street1')}
                helperText={formatedHelper('street1')}
                sx={{ gridColumn: 'span 4' }}
            />
            <TextField
                fullWidth
                type='text'
                label='Street Address 2 (optional)'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.street2}
                name={formatedName('street2')}
                error={formatedError('street2')}
                helperText={formatedHelper('street2')}
                sx={{ gridColumn: 'span 4' }}
            />
            <TextField
                fullWidth
                type='text'
                label='City'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name={formatedName('city')}
                error={formatedError('city')}
                helperText={formatedHelper('city')}
                sx={{ gridColumn: 'span 2' }}
            />
            <TextField
                fullWidth
                type='text'
                label='State'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name={formatedName('state')}
                error={formatedError('state')}
                helperText={formatedHelper('state')}
                sx={{ gridColumn: '1fr' }}
            />
            <TextField
                fullWidth
                type='text'
                label='Zip Code'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zipCode}
                name={formatedName('zipCode')}
                error={formatedError('zipCode')}
                helperText={formatedHelper('zipCode')}
                sx={{ gridColumn: '1fr' }}
            />
        </Box>
    )
}

export default AddressForm;