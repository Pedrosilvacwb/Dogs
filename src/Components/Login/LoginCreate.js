import React from 'react';
import Input from '../Form/Input';
import Button from '../Form/Button';
import Error from '../Helper/Error';
import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../api';
import { userContext } from '../../userContext';
import useFetch from '../../Hooks/useFetch';

const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm();
  const { userLogin } = React.useContext(userContext);
  const { loading, error, request } = useFetch();
  // console.log(error);
  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) {
      userLogin(username.value, password.value);
    }
  }
  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Usuário"
          placeholder="Nome de Usuário"
          name="username"
          {...username}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Seu email..."
          name="email"
          {...email}
        />
        <Input
          type="password"
          label="Senha"
          placeholder="Senha"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
