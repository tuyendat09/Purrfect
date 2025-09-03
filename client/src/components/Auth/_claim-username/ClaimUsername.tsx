import ClaimUsernameForm from "./ClaimUsernameForm";
import { AuthTransitionProvider } from "../../../shared/context/AuthTransitionContext";
import PageTransition from "../../../shared/components/PageTransition/AuthPageTransition";

import "../Auth.css";

export default function ClaimUsername() {
  return (
    <AuthTransitionProvider>
      <div className="container overflow-hidden h-screen flex">
        <PageTransition />
        <ClaimUsernameForm />
      </div>
    </AuthTransitionProvider>
  );
}
