import axios from 'axios';
import React, { useEffect } from 'react';
import { Navbar } from '../../../components/Navbar';
import { useAuth } from '../../../hooks/useAuth';

const CreateCard = () => {
  const { logout, token, user } = useAuth();
  const [loading, setLoading] = React.useState(true);

  return (
    <>
      <Navbar />
      <div className="main"></div>
    </>
  );
};

export { CreateCard };
