import { Link } from "react-router-dom";

const FooterImportantLinks = () => {
  return (
    <div>
      <h1 className="text-2xl hind-siliguri-regular mb-2">Important Links</h1>
      <div>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/"
        >
          Join Affeliate
        </Link>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/"
        >
          Career
        </Link>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/"
        >
          Privacy Policy
        </Link>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/"
        >
          Refund Policy
        </Link>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/"
        >
          Disclaimar
        </Link>
      </div>
    </div>
  );
};

export default FooterImportantLinks;
