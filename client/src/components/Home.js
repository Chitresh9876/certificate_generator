import { Button, Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Stack width={"100%"} mt={25} ml={3}>
      <h1 style={{textAlign:"center"}}>Admin Panel</h1>
      <Button variant="contained" color="primary" style={{width:"15rem", marginLeft:"40rem"}}>
        <Link to="/Generate" style={{color:"white", textDecoration:"none"}}>Generate Certificate</Link>
      </Button>
    </Stack>
  );
}

export default Home
