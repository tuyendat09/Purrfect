import PageTransition from "../../../shared/components/PageTransition/AuthPageTransition";
import OnboardingVideo from "./OnboardingVideo";
import { AuthTransitionProvider } from "../../../shared/context/AuthTransitionContext";
import OnboardingFormStep2 from "./OnboardingStep2";
import OnboardingFormStep1 from "./OnboardingFormStep1";
import OnboardingFormStep3 from "./OnboardingStep3";
import { OnboardingStepProvider } from "./context/OnboardingStepContext";
import "../Auth.css";

export default function Onboarding() {
  return (
    <AuthTransitionProvider>
      <OnboardingStepProvider>
        <div className="container overflow-hidden h-screen flex">
          <PageTransition />
          <OnboardingVideo />
          <OnboardingFormStep1 />
          <OnboardingFormStep2 />
          <OnboardingFormStep3 />
        </div>
      </OnboardingStepProvider>
    </AuthTransitionProvider>
  );
}
