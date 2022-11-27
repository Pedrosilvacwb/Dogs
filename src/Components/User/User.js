import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { userContext } from '../../userContext';
import Feed from '../Feed/Feed';
import NotFound from '../NotFound';
import UserHeader from './UserHeader';
import UserPhotoPost from './UserPhotoPost';
import UserStats from './UserStats';

const User = () => {
  const { data } = React.useContext(userContext);
  return (
    <div className="container">
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default User;
