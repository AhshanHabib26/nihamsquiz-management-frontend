import { IMCQProps } from "@/types/common.data";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import newImg from "../../../assets/icons/newLabel.png";
import { isNewBlog } from "@/lib/isNew";

interface Props extends IMCQProps {
    isLast?: boolean;
}

const RecentMCQCard: React.FC<Props> = ({ mcq, isLast }) => {
    return (
        <div
            className={`text-gray-300 ${isLast ? "" : "border-b border-gray-800 border-dashed"
                }`}
        >
            <Link to={`/mcq/${mcq._id}`}>
                <div className="flex items-center justify-between">
                    <h1 className="my-1 text-[17px] hind-siliguri-light hover:text-TextPrimary">
                        {mcq?.questions?.questionText}
                    </h1>
                    <div>
                        {mcq?.createdAt && (
                            <div>
                                {isNewBlog(mcq.createdAt) ? (
                                    <div>
                                        <img className="w-[35px]" src={newImg} alt="New Post" />
                                    </div>
                                ) : (
                                    <div>
                                        <FaAngleRight className="text-gray-300" size={15} />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RecentMCQCard;
