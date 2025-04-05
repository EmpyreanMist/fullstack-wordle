import '../styles/footer.css';

function Footer() {
  return (
    <footer>
      <hr />
      <div className="icons">
        <a href="https://github.com/EmpyreanMist" target="_blank">
          <i className="fa-brands fa-github"></i>
        </a>
        <a href="https://linkedin.com/in/christian-fryksten" target="_blank">
          <i className="fa-brands fa-linkedin"></i>
        </a>
        <a href="mailto:christianfryksten1@gmail.com">
          <i className="fa-solid fa-envelope"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
