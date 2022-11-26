import React from 'react';
import { COMMENT_POST } from '../../api';
import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import styles from './PhotoCommentsForm.module.css';

const PhotoCommentsForm = ({ id, setComments }) => {
  const [comment, setComment] = React.useState('');
  const { request, error } = useFetch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);

    if (response.ok) {
      setComments((comments) => [...comments, json]);
      setComment('');
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textArea}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        placeholder="Comente"
      ></textarea>
      <button className={styles.button}>
        <Enviar />
      </button>
      {error && <Error error={error} />}
    </form>
  );
};

export default PhotoCommentsForm;
