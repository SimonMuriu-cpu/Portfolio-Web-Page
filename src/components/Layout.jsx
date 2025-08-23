import React, { useEffect } from 'react';
import { Tracking } from '../utils/tracking';

const Layout = ({ children }) => {
  useEffect(() => {
    // Initialize tracking and track page view
    Tracking.init();
  }, []);

  return <>{children}</>;
};

export default Layout;