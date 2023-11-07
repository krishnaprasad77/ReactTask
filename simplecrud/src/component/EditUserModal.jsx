import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Box, TextField, Button } from '@mui/material';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup.string().required('Mobile is required'),
});

const EditUserModal = ({ open, onClose, onEditUser, userData }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    data.id = userData.id;
    onEditUser(data);
    onClose();
    reset();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="name"
              control={control}
              defaultValue={userData && userData.name} // Set default value for editing
              render={({ field }) => <TextField label="Name" fullWidth {...field} />}
            />
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              defaultValue={userData && userData.email} // Set default value for editing
              render={({ field }) => <TextField label="Email" fullWidth {...field} />}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <Controller
              name="mobile"
              control={control}
              defaultValue={userData && userData.mobile} // Set default value for editing
              render={({ field }) => <TextField label="Mobile" fullWidth {...field} />}
            />
            <p>{errors.mobile?.message}</p>
          </div>
          <Button type="submit" variant="contained" sx={{ mr: 2 }}>Save Changes</Button>
          <Button variant="contained" onClick={onClose}>Close</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
