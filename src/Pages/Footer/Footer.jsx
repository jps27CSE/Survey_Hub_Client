import brandLogo from "../../../public/brandlogo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-base-200 text-base-content mt-2">
        <aside>
          <img src={brandLogo} className="w-20" alt="" />
          <p className="font-bold">
            SurveyHub
            <br />
            &copy; {new Date().getFullYear()} SurveyHub. All rights reserved.
          </p>
        </aside>
        <nav>
          <header className="footer-title"></header>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
        </nav>

        <nav>
          <header className="footer-title">Connect</header>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Twitter</a>
          <a className="link link-hover">Instagram</a>
          <a className="link link-hover">YouTube</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
