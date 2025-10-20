import FloatingInput from "@/shared/components/Input/FloatingInput";

export default function PasswordSetting() {
  return (
    <div>
      <h1 className="font-serif mb-5 text-xl">Password</h1>
      <FloatingInput
        overrideClass="!rounded-2xl"
        clearBackground
        label="Username"
        name="username"
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
