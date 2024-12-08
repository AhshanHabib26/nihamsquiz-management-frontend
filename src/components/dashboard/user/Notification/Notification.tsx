import { TUserProps } from "@/types/user.type";
import { Link } from "react-router-dom";

const Notification: React.FC<TUserProps> = ({ user }) => {
  const isBuyPackage = user?.isBuyPackage;
  const isPremium = user?.isPremium;
  const quizzesAttempted = user?.quizzesAttempted;
  const packageExpiry = user?.packageExpiry;
  const currentDate = new Date();
  const isPackageExpired =
    packageExpiry && new Date(packageExpiry) < currentDate;
  let message = null;
  let bgColor = "bg-gray-300";
  const textColor = "text-gray-700";

  if (isPackageExpired) {
    message = (
      <>
        ⏳ <strong>Your plan has expired!</strong> ⏳
        <br />
        Please <strong className="font-medium">renew your package</strong> to
        continue enjoying the service.
        <Link
          to="/price-plan"
          className="text-TextPrimary hover:text-TextPrimaryHover"
        >
          Renew Plan
        </Link>
        .
      </>
    );
    bgColor = "bg-yellow-300";
  } else if (isBuyPackage && !isPremium) {
    message = (
      <>
        🎉 <strong>Thank you for purchasing our service!</strong> 🎉
        <br />
        🚀 Your account is being activated. Please hold on while we set
        everything up!
      </>
    );
    bgColor = "bg-orange-300";
  } else if (isPremium) {
    message = (
      <>
        🌟 <strong>Thank you for being a premium member!</strong> 🌟
        <br />
        We're thrilled to have you on board. Stay tuned for more exciting
        features and exclusive content!
      </>
    );
    bgColor = "bg-green-300";
  } else if (quizzesAttempted === 0) {
    message =
      "🚨 You are currently on the free plan and can participate in up to 5 quizzes. Keep exploring!";
    bgColor = "bg-red-300";
  } else if (quizzesAttempted === 5) {
    message = (
      <>
        😔 Free quiz limit reached! Please{" "}
        <strong className="font-medium">subscribe to a package</strong>{" "}
        <Link
          to="/price-plan"
          className="text-TextPrimary hover:text-TextPrimaryHover"
        >
          See Available Plans
        </Link>{" "}
        to continue enjoying more quizzes.
      </>
    );
    bgColor = "bg-red-300";
  }

  return (
    <div>
      {message && (
        <h1
          className={`${bgColor} text-center py-1 rounded-lg text-lg ${textColor}`}
        >
          {message}
        </h1>
      )}
    </div>
  );
};

export default Notification;
