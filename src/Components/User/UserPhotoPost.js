import React from 'react';
import styles from './UserPhotoPost.module.css';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PHOTO_POST } from '../../api';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm('number');
  const idade = useForm('number');
  const [img, setImg] = React.useState({});
  const navigate = useNavigate();
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    if (data) navigate('/conta');
  }, [data, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('img', img.raw);
    formData.append('nome', nome.value);
    formData.append('peso', peso.value);
    formData.append('idade', idade.value);

    const token = window.localStorage.getItem('@Dogs:token');
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  };

  const handleChange = ({ target }) => {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  };

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" id="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" id="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" id="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{
              backgroundImage: `url('${img.preview}')`,
            }}
          ></div>
        )}
        <Error error={error} />
      </div>
    </section>
  );
};

export default UserPhotoPost;
