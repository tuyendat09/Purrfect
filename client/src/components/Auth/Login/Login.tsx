import "./Login.css";
import LoginForm from "./LoginForm";
import LoginVideo from "./LoginVideo";
import { AnimationProvider } from "../store/LoginContext";
import PageTransition from "../PageTransition";

export default function LoginWrapper() {
  return (
    <AnimationProvider>
      <div className="w-screen flex items-center justify-center h-screen text-white">
        <PageTransition />
        <LoginVideo />
        <LoginForm />
      </div>
    </AnimationProvider>
  );
}
