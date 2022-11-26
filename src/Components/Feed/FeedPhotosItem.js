import React from 'react';
import Image from '../Helper/Image';
import styles from './FeedPhotosItem.module.css';

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  const handleClick = () => {
    setModalPhoto(photo);
  };
  return (
    <li onClick={handleClick} className={styles.photo}>
      <Image src={photo.src} alt={photo.title} />
      <span>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
