import { Button, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { createUser, deleteUser, getAllUser, updateUser } from '../services';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import Navbar from './Navbar';
import Login from './Login';

export default function Usertable() {
  const [users, setUsers] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (loggedIn) {
      getAllUser().then(res => setUsers(res)).catch(err => console.log(err));
    }
  }, [loggedIn])

  const filteredUsers = users.filter(user => user.id.toString().includes(search));

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setOpenEditModal(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleDelete = async (id) => {
    await deleteUser(id).then(getAllUser).then(res => setUsers(res));
  }

  const handleEditUser = async (data) => {
    console.log(data);
    await updateUser(data).then(getAllUser).then(res => setUsers(res));
  }

  const handleAddUser = async (newUser) => {
    try {
      await createUser(newUser).then(getAllUser).then(res => setUsers(res));
      handleCloseAddModal();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Grid>
      {loggedIn ? (
        <>
          <Navbar />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenEditModal(user)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid sx={{ display: "flex", py: 2, justifyContent: "space-evenly" }} >
            <Button variant="contained" onClick={handleOpenAddModal}>Add User</Button>
            <Button variant="contained" onClick={handleLogout}>Logout</Button>
          </Grid>
          <AddUserModal open={openAddModal} onClose={handleCloseAddModal} onAddUser={handleAddUser} />
          <EditUserModal open={openEditModal} onClose={handleCloseEditModal} onEditUser={handleEditUser} userData={selectedUser} />
        </>) : (
        <Login onLogin={handleLogin} />)}
    </Grid>

  )
}
