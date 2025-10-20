import FloatingInput from "@/shared/components/Input/FloatingInput";

export default function AccountSetting() {
  return (
    <div className="h-full">
      <h1 className="font-serif font-light mb-5 text-xl">Account</h1>
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Username"
        name="username"
      />
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Email"
        name="321"
      />
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Fullname"
        name="fullname"
      />
    </div>
  );
}
