import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Formik validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title cannot exceed 50 characters')
    .required('Title is required'),
  price: Yup.number()
    .positive('Price must be a positive number')
    .required('Price is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  image: Yup.mixed()
    .required('An image is required')
    .test(
      'fileSize',
      'File too large',
      value => value && value.size <= 2 * 1024 * 1024 // 2MB
    )
    .test(
      'fileType',
      'Unsupported Format',
      value => value && ['image/jpeg', 'image/png'].includes(value.type)
    ),
});

// The form component
const ArtworkForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ title: '', price: '', description: '', image: null }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('image', values.image);

        onSubmit(formData);
        setSubmitting(false);
      }}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <Field type="number" name="price" />
            <ErrorMessage name="price" component="div" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field as="textarea" name="description" />
            <ErrorMessage name="description" component="div" />
          </div>

          <div>
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={(event) => {
                setFieldValue('image', event.currentTarget.files[0]);
              }}
            />
            <ErrorMessage name="image" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ArtworkForm;
