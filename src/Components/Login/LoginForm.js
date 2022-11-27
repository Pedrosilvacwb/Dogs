import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Button from '../Form/Button';
import Error from '../Helper/Error';
import Input from '../Form/Input';
import styles from './LoginForm.module.css';
import stylesBtn from '../Form/Button.module.css';
import { userContext } from '../../userContext';

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(userContext);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }
  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Usuário"
          label="Usuário"
          name="username"
          {...username}
        />
        <Input
          type="password"
          placeholder="Senha"
          label="Senha"
          name="password"
          {...password}
        />

        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && 'Dados incorretos'} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastro</h2>
        <p>Ainda não possui conta? Cadastre-se</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
