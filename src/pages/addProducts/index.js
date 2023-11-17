// /* eslint-disable jsx-a11y/img-redundant-alt */
// // ==============================|| DASHBOARD - DEFAULT ||============================== //

// import React, { useState } from 'react';
// import MainCard from 'components/MainCard';
// import { Box, Grid, Typography } from '@mui/material';
// import HeadingText from 'components/HeadingText/HeadingText';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { OutlinedInput, Stack } from '../../../node_modules/@mui/material/index';
// // import Button from 'themes/overrides/Button';

// const AddProductsDefault = () => {
//   const [selectedImages, setSelectedImages] = useState([]); // Use state for storing selected images
//   const maxImageCount = 3;
//   console.log(selectedImages);
//   const handleImageChange = (e) => {
//     const files = e.target.files;

//     // Validate the number of selected images
//     if (files.length + selectedImages.length > maxImageCount) {
//       alert(`You can only upload a maximum of ${maxImageCount} images.`);
//       return;
//     }

//     // Loop through the selected files
//     for (const file of files) {
//       // Validate file type
//       const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//       if (!allowedTypes.includes(file.type)) {
//         alert('Please select a PNG or JPG image.');
//         return;
//       }

//       // Add the selected image to the state
//       setSelectedImages((prevImages) => [...prevImages, URL.createObjectURL(file)]);
//     }
//   };
//   const handleDeleteImage = (index) => {
//     const updatedImages = [...selectedImages];
//     updatedImages.splice(index, 1);
//     setSelectedImages(updatedImages);
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <Grid container rowSpacing={4.5} columnSpacing={2.75}>
//       <Grid item xs={12} md={5} lg={6} alignItems="center" justifyContent="space-between">
//         {/*============== income overview =====*/}
//         <Grid item width="100%" sx={{}}>
//           <HeadingText heading="Add Pizza"></HeadingText>
//         </Grid>
//         <Grid item />
//         <Box content={false}>
//           <form noValidate onSubmit={handleSubmit} style={{}}>
//             <Grid container spacing={0}>
//               <Grid item xs={12} sx={{ background: '#fc167a', width: '100%', p: 3, borderRadius: '0 0 4px 4px' }}>
//                 <Stack spacing={0} sx={{ mb: 1 }}>
//                   <OutlinedInput
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     id="imageInput"
//                     onChange={handleImageChange}
//                     multiple
//                     required
//                     name="userImage"
//                     style={{ pr: 3 }}
//                   />
//                   {/* Show error message if no images are selected */}
//                   {selectedImages.length === 0 && (
//                     <Typography variant="body2" color="error" sx={{}}>
//                       Please select at least one image (PNG or JPG).
//                     </Typography>
//                   )}
//                 </Stack>
//                 <Stack sx={{ mb: 1 }}>
//                   <OutlinedInput
//                     id="title"
//                     type="text"
//                     // value={values.title}
//                     name="title"
//                     // onBlur={handleBlur}
//                     // onChange={handleChange}
//                     placeholder="Title"
//                     fullWidth
//                     error={''}
//                     sx={{ background: '#fff' }}
//                   />
//                 </Stack>
//                 <Stack sx={{ mb: 1 }}>
//                   <OutlinedInput
//                     id="description"
//                     type="textarea"
//                     // value={values.title}
//                     name="description"
//                     // onBlur={handleBlur}
//                     // onChange={handleChange}
//                     placeholder="Description"
//                     TextareaAutosize
//                     fullWidth
//                     error={''}
//                     sx={{ background: '#fff' }}
//                   />
//                 </Stack>
//                 {/* price */}
//                 <Typography variant="h6" color="#fff">
//                   Price
//                 </Typography>
//                 <Grid container rowSpacing={4.5} columnSpacing={2.75}>
//                   <Grid item xs={12} sm={6} md={4} lg={4}>
//                     <Stack sx={{}}>
//                       <OutlinedInput
//                         id="title"
//                         type="text"
//                         // value={values.title}
//                         name="title"
//                         // onBlur={handleBlur}
//                         // onChange={handleChange}
//                         placeholder="small"
//                         fullWidth
//                         error={''}
//                         sx={{ background: '#fff' }}
//                       />
//                     </Stack>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4} lg={4}>
//                     <Stack sx={{}}>
//                       <OutlinedInput
//                         id="title"
//                         type="text"
//                         // value={values.title}
//                         name="title"
//                         // onBlur={handleBlur}
//                         // onChange={handleChange}
//                         placeholder="medium"
//                         fullWidth
//                         error={''}
//                         sx={{ background: '#fff' }}
//                       />
//                     </Stack>
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={4} lg={4}>
//                     <Stack sx={{}}>
//                       <OutlinedInput
//                         id="title"
//                         type="text"
//                         // value={values.title}
//                         name="title"
//                         // onBlur={handleBlur}
//                         // onChange={handleChange}
//                         placeholder="large"
//                         fullWidth
//                         error={''}
//                         sx={{ background: '#fff' }}
//                       />
//                     </Stack>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </form>
//         </Box>
//       </Grid>

//       {/* Show Image */}
//       <Grid item xs={12} md={5} lg={6} alignItems="center" justifyContent="space-between">
//         <Grid item width="100%" sx={{}}>
//           <HeadingText heading="Show Pizza"></HeadingText>
//         </Grid>
//         <Grid item />
//         <MainCard sx={{ borderRadius: '0 0 4px 4px' }} content={false}>
//           <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, gap: 2 }}>
//             {selectedImages.map((imageUrl, index) => (
//               <Box key={index} sx={{ position: 'relative' }}>
//                 <img
//                   src={imageUrl}
//                   alt={`Uploaded Image ${index + 1}`}
//                   style={{ maxWidth: '100%', height: 'auto', border: '2px solid #ccc', borderRadius: '4px' }}
//                 />
//                 <button
//                   style={{
//                     position: 'absolute',
//                     top: -10,
//                     right: -15,
//                     cursor: 'pointer',
//                     outline: 'none',
//                     border: 'none',
//                     background: '#eee',
//                     borderRadius: '50%'
//                   }}
//                   onClick={() => handleDeleteImage(index)}
//                 >
//                   <DeleteIcon color="error"></DeleteIcon>
//                 </button>
//               </Box>
//             ))}
//           </Box>
//         </MainCard>
//       </Grid>
//     </Grid>
//   );
// };

// export default AddProductsDefault;
