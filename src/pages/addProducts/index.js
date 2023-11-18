/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import MainCard from 'components/MainCard';
import { Box, Grid, Typography } from '@mui/material';
import HeadingText from 'components/HeadingText/HeadingText';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, OutlinedInput, Stack } from '@mui/material';
import { TextareaAutosize } from '../../../node_modules/@mui/material/index';

const AddProductsDefault = () => {
  const [selectedImages, setSelectedImages] = useState([]); // Use state for storing selected images
  const [pizzaData, setPizzaData] = useState({
    title: '',
    description: '',
    prices: {
      small: '',
      medium: '',
      large: ''
    }
  });
  const maxImageCount = 3;

  const handleImageChange = (e) => {
    const files = e.target.files;
    // Validate the number of selected images
    if (files.length + selectedImages.length > maxImageCount) {
      alert(`You can only upload a maximum of ${maxImageCount} images.`);
      return;
    }

    // Loop through the selected files
    const newImages = [];

    for (const file of files) {
      // Validate file type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please select a PNG or JPG image.');
        return;
      }
      // Add the selected image to the state with file name
      newImages.push({ url: URL.createObjectURL(file), fileName: file.name });
    }
    // Update the pizzaData state with the new image URLs
    setPizzaData((prevData) => ({
      ...prevData,
      images: newImages // Assuming you have an "images" property in pizzaData
    }));
    // Update the selectedImages state
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages[index].fileName = '';
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Pizza Data:', pizzaData);
    // validate flowFrom:
    {
      if (pizzaData.title || pizzaData.description === '') {
        alert('Fill up the field');
      }
    }
    // Clear form fields and selected images after successful upload
    setPizzaData({
      title: '',
      description: '',
      prices: {
        small: '',
        medium: '',
        large: ''
      }
    });
  };

  const handleInputChange = (field, value) => {
    setPizzaData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handlePriceInputChange = (size, value) => {
    setPizzaData((prevData) => ({
      ...prevData,
      prices: {
        ...prevData.prices,
        [size]: value
      }
    }));
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={5} lg={6} alignItems="center" justifyContent="space-between">
        <Grid item width="100%" sx={{}}>
          <HeadingText heading="Add Pizza"></HeadingText>
        </Grid>
        <Grid item />
        <Box>
          <form noValidate style={{}}>
            <Grid container spacing={0}>
              <Grid item xs={12} sx={{ background: '#fc167a', width: '100%', p: 3, borderRadius: '0 0 4px 4px' }}>
                <Stack spacing={0} sx={{ mb: 1 }}>
                  <OutlinedInput
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="imageInput"
                    onChange={handleImageChange}
                    multiple
                    required
                    name="userImage"
                    style={{ pr: 3 }}
                  />
                  {/* Show error message if no images are selected */}
                  {selectedImages.length === 0 && (
                    <Typography variant="body2" color="#fff" sx={{}}>
                      Please select at least one image (PNG or JPG).
                    </Typography>
                  )}
                </Stack>
                <Stack sx={{ mb: 1 }}>
                  <OutlinedInput
                    id="title"
                    type="text"
                    value={pizzaData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Title"
                    fullWidth
                    error={''}
                    sx={{ background: '#fff' }}
                  />
                </Stack>
                <Stack sx={{ mb: 1 }}>
                  <TextareaAutosize
                    id="description"
                    value={pizzaData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Description"
                    minRows={8}
                    style={{
                      width: '100%',
                      resize: 'none',
                      background: '#fff',
                      borderRadius: '4px',
                      border: 'none',
                      outline: 'blue'
                    }}
                  />
                </Stack>
                {/* price */}
                <Typography variant="h6" color="#fff">
                  Price
                </Typography>
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Stack sx={{}}>
                      <OutlinedInput
                        id="small"
                        type="text"
                        value={pizzaData.prices.small}
                        onChange={(e) => handlePriceInputChange('small', e.target.value)}
                        name="small"
                        placeholder="small"
                        fullWidth
                        error={''}
                        sx={{ background: '#fff' }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Stack sx={{}}>
                      <OutlinedInput
                        id="medium"
                        type="text"
                        value={pizzaData.prices.medium}
                        onChange={(e) => handlePriceInputChange('medium', e.target.value)}
                        name="medium"
                        // onBlur={handleBlur}
                        placeholder="medium"
                        fullWidth
                        error={''}
                        sx={{ background: '#fff' }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Stack sx={{}}>
                      <OutlinedInput
                        id="large"
                        type="text"
                        // value={values.title}
                        name="large"
                        // onBlur={handleBlur}
                        value={pizzaData.prices.large}
                        onChange={(e) => handlePriceInputChange('large', e.target.value)}
                        placeholder="large"
                        fullWidth
                        error={''}
                        sx={{ background: '#fff' }}
                      />
                    </Stack>
                  </Grid>

                  <Box sx={{ mt: 2, p: 3 }}>
                    <Button
                      sx={{ display: 'flex', alignItems: 'center' }}
                      component="label"
                      variant="contained"
                      onClick={handleSubmit}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>

      {/* Show Image */}
      <Grid item xs={12} md={5} lg={6} alignItems="center" justifyContent="space-between">
        <Grid item width="100%" sx={{}}>
          <HeadingText heading="Show Pizza"></HeadingText>
        </Grid>
        <Grid item />
        <MainCard sx={{ borderRadius: '0 0 4px 4px' }} content={false}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, gap: 2 }}>
            {selectedImages.map((imageUrl, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                <img
                  src={imageUrl.url}
                  alt={`Uploaded Image ${index + 1}`}
                  style={{ maxWidth: '100%', height: 'auto', border: '2px solid #ccc', borderRadius: '4px' }}
                />
                <button
                  style={{
                    position: 'absolute',
                    top: -10,
                    right: -15,
                    cursor: 'pointer',
                    outline: 'none',
                    border: 'none',
                    background: '#eee',
                    borderRadius: '50%'
                  }}
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon color="error"></DeleteIcon>
                </button>
              </Box>
            ))}
            {<Typography>{pizzaData.title}</Typography>}
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default AddProductsDefault;
