import Container from "../../components/Container";
import classes from "./Subscribe.module.css";
const Subscribe = () => {
  return (
    <div className={classes.container}>
      <Container>
        <div className={classes.content}>
          <div className={classes.intro}>
            <h3>En cas de probléme contactez-nous</h3>
            <p>
              Si vous rencontrez un problème quelconque, on est là pour vous aider
            </p>
          </div>
          <div className={classes.signUp}>
            <form className={classes.form}>
              <input className={classes.input} placeholder="Entrer votre mail" />
              <button className={classes.btn}>Signaler problème</button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Subscribe;
