import {
  FaLaptopCode,
  FaLinkedin,
  FaLocationDot,
  FaPhone,
  FaSquareGithub,
} from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";

const FooterConatctInfo = () => {
  return (
    <div>
      <h1 className="text-2xl hind-siliguri-regular mb-2">About Us</h1>
      <div>
        <div className="flex items-center">
          <FaLocationDot size={18} />
          <p className="text-lg hind-siliguri-light ml-2">Dhaka, Bangladesh</p>
        </div>
        <div className="flex items-center">
          <FaPhone size={18} />
          <a
            className="text-lg hind-siliguri-light ml-2"
            href="callto:+8801646418365"
          >
            +8801646418365
          </a>
        </div>
        <div className="flex items-center">
          <MdMail size={18} />
          <a
            className="text-lg hind-siliguri-light ml-2"
            href="mailto:ahshan.habib026@gmail.com"
          >
            ahshan.habib026@gmail.com
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <a target="_blank" href="https://web.facebook.com/AhshanHabib26">
          <FaFacebookSquare size={22} />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/ahshanhabib26/">
          <FaLinkedin size={22} />
        </a>
        <a target="_blank" href="https://github.com/AhshanHabib26">
          <FaSquareGithub size={22} />
        </a>
        <a target="_blank" href="https://leetcode.com/u/AhshanHabib/">
          <FaLaptopCode size={22} />
        </a>
        <Link to="/">
          <IoLogoYoutube size={22} />
        </Link>
      </div>
    </div>
  );
};

export default FooterConatctInfo;
