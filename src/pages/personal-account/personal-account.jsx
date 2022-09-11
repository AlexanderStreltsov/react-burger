import pageStyles from "./personal-account.module.css";
import PersonalAccountNavigation from "./navigation/navigation";
import Profile from "./profile/profile";

const PersonalAccountPage = () => {
  return (
    <div className={pageStyles.wrapper}>
      <PersonalAccountNavigation />
      <Profile />
    </div>
  );
};

export default PersonalAccountPage;
