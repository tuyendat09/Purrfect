import PageTransition from "../PageTransition";
import OnboardingForm from "./OnboardingForm";
import OnboardingFormStep2 from "./OnboardingStep2";
import OnboardingFormStep3 from "./OnboardingStep3";
import OnboardingVideo from "./OnboardingVideo";
import { AnimationProvider } from "../store/LoginContext";

export default function Onboarding() {
  return (
    <AnimationProvider>
      <div className="container overflow-hidden h-screen flex">
        <PageTransition />
        <OnboardingVideo />
        {/* <OnboardingForm /> */}
        {/* <OnboardingFormStep2 /> */}
        <OnboardingFormStep3 />
      </div>
    </AnimationProvider>
  );
}
