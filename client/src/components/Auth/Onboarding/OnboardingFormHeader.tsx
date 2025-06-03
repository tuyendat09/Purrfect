import Logo from "@/components/UI/Logo";

export default function OnboardingFormHeader() {
  return (
    <div className="text-center">
      <Logo className="size-12 mx-auto" />
      <h3 className="font-serif text-2xl mt-4 mb-2">Welcome to Purrfect</h3>
      <p className="text-sm  text-[#aaaaaa]">Begin by creating an account</p>
    </div>
  );
}
