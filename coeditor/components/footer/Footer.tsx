import classes from "./Footer.module.css";

const Footer = () => {

  return (
    <footer className={classes.footer}>
      <a href="https://testquest.vercel.app/" className={classes.footer__logo}>
        Test Quest
      </a>

      <ul className={classes.footer_permalink}>
        <li>
          <a href="https://testquest.vercel.app/#services">Services</a>
        </li>
        <li>
          <a href="https://testquest.vercel.app/#portfolio">Portfolio</a>
        </li>
        <li>
          <a href="https://testquest.vercel.app/#testimonials">Testimonials</a>
        </li>
        <li>
          <a href="https://testquest.vercel.app/#contact">Contact</a>
        </li>
      </ul>
      <div className={classes.footer__copyright}>
        <small>&copy; Test Quest. All rights reserved</small>
      </div>
    </footer>
  );
};

export default Footer;