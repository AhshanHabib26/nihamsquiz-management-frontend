import Container from "@/lib/Container";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Banner = () => {
  return (
    <div>
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center justify-center flex-col">
            <p className=" text-lg hind-siliguri-light">
              Introducing <span className=" text-TextPrimary">Award Winning Quiz Website</span>
            </p>
            <h1 className="text-5xl lg:text-7xl text-center hind-siliguri-bold max-w-[25ch] my-2">🎉Challenge Your Mind, One Question at a Time!</h1>
            <p className="text-xl hind-siliguri-light mb-3 text-center">
              Explore quizzes, unlock achievements, and master new topics. Join
              the fun today!
            </p>
            <div>
              <Link to="/login">
                <Button
                  size="lg"
                  className=" bg-BgPrimary hover:bg-BgPrimaryHover text-lg font-light"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
