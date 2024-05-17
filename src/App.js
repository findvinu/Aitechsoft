// App.js

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setData } from './store/slices/gridSlice';
import Layout from './components/Layout/Layout';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Simulated API call
    const fetchData = async () => {
      const response = await fetch('../../data.json');
      const data = await response.json();
      dispatch(setData(data.data));
    };

    fetchData();
  }, [dispatch]);

  return <Layout />;
};

export default App;
