import OnboardingVideo from "../_onboarding/OnboardingVideo";
import ClaimUsernameForm from "./ClaimUsernameForm";
import "../Auth.css";

export default function ClaimUsername() {
  return (
    <div className="container overflow-hidden h-screen flex">
      <OnboardingVideo />
      <ClaimUsernameForm />
    </div>
  );
}
