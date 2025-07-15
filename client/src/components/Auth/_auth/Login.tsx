import "./Login.css";
import LoginForm from "./LoginForm";
import LoginVideo from "./LoginVideo";
import { AuthTransitionProvider } from "../../../shared/context/AuthTransitionContext";
import PageTransition from "../../../shared/components/PageTransition/AuthPageTransition";

export default function LoginWrapper() {
  return (
    <AuthTransitionProvider>
      <div className="w-screen flex items-center justify-center h-screen text-white">
        <PageTransition />
        <LoginVideo />
        <LoginForm />
      </div>
    </AuthTransitionProvider>
  );
}
