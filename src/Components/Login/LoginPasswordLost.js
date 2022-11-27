import React from 'react';
import Input from '../Form/Input';
import Button from '../Form/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../api';

const LoginPasswordLost = () => {
  const login = useForm();
  const { request, data, loading } = useFetch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace('perdeu', 'resetar'),
      });
      await request(url, options);
    }
  };
  return (
    <section className="animeLeft">
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input name="login" label="Email/Usuário" type="text" {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar email</Button>
          )}
        </form>
      )}
    </section>
  );
};

export default LoginPasswordLost;
