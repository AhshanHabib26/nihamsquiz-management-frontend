import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

export const packageIconGeneretor = (altTitle: string, index: number) => {
  if (altTitle === "Basic") {
    return index <= 5 ? (
      <FaRegCircleCheck color="white" size={18} />
    ) : (
      <RxCrossCircled color="white" size={18} />
    );
  } else if (altTitle === "Plus") {
    return index <= 7 ? (
      <FaRegCircleCheck color="white" size={18} />
    ) : (
      <RxCrossCircled color="white" size={18} />
    );
  } else if (altTitle === "Premium") {
    return <FaRegCircleCheck color="white" size={18} />;
  }
};




