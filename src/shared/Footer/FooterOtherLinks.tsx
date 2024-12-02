import { Link } from "react-router-dom";

const FooterOtherLinks = () => {
  return (
    <div>
      <h1 className="text-2xl hind-siliguri-regular mb-2">Other Links</h1>
      <div>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/blog"
        >
          Blog
        </Link>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/"
        >
          Book Hub
        </Link>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/"
        >
          Free Notes & Guide
        </Link>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/"
        >
          Ebook Download
        </Link>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/"
        >
          Verify Certificate
        </Link>
        <Link
          className="block text-lg hind-siliguri-light hover:text-customSecondery"
          to="/"
        >
          Play Quiz
        </Link>
      </div>
    </div>
  );
};

export default FooterOtherLinks;
