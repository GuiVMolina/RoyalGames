import styles from "./login.module.css";

const Login = () => {
  return (
    <>
      <section id={styles.login}>
        <img id={styles.img_login} src="./imgs/img_login.png" alt="" />
        <form className="card">
          <img
            id={styles.login_logo}
            src="./imgs/royal_games_logo.png"
            alt=""
          />
          <div className="campo_form">
            <label>Email</label>
            <input
              className="input"
              type="text"
              placeholder="admind@admin.com"
            />
          </div>
          <div className="campo_form">
            <label>Senha</label>
            <input className="input" type="password" placeholder="123456" />
          </div>
          <button className="btn">Entrar</button>
        </form>
      </section>
    </>
  );
};

export default Login;
