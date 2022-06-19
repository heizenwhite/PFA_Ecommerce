import Container from "../../components/Container";
import classes from "./FooterArea.module.css";
import { Link } from "react-router-dom";
const FooterArea = () => {
  return (
    <div className={classes.container}>
      <Container>
        <div className={classes.content}>
          <div className={classes.mission}>
            <h2>Notre Mission</h2>
            <p>
              De vous servir en toute confiance sans trop savoir comment s'y prendre
            </p>
            <p>
              Aussi bien de nous foutre de vos tranches tant qu'on y est 
            </p>
          </div>
          <div className={classes.quickLink}>
            <h3>Liens Rapides</h3>
            <ul>
              <Link to="/">Home</Link>
              <Link to="/">Magasin</Link>
            </ul>
          </div>
          <div className={classes.contact}>
            <h3>Contactez-nous</h3>
            <div className={classes.wrapContact}>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className="fas fa-location-arrow"></i>
                </div>
                <div className={classes["card-content"]}>
                  <h4>Siège</h4>
                  <p>123, 7alib et 9ahwa, Hay Tartinette, Rabat</p>
                </div>
              </div>
              <div className={classes.card}>
                <div className={classes.icon}>
                  <i className="fas fa-phone"></i>
                </div>
                <div className={classes["card-content"]}>
                  <h4>Numéro de Téléphone</h4>
                  <p>+212 689 78 45 00</p>
                  <p>+212 694 18 89 01</p>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FooterArea;
