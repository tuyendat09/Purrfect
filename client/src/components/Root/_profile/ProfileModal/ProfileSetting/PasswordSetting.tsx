import FloatingInput from "@/shared/components/Input/FloatingInput";
import usePasswordSetting from "../hook/usePasswordSetting";
import Button from "@/shared/components/Button";

export default function PasswordSetting() {
  const { formik } = usePasswordSetting();
  return (
    <form onSubmit={formik.handleSubmit}>
      <h1 className="font-serif mb-5 text-xl">Password</h1>
      <FloatingInput
        type="password"
        overrideClass="!rounded-2xl"
        clearBackground
        label="Password"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        tabIndex={1}
      />
      <FloatingInput
        type="password"
        overrideClass="!rounded-2xl"
        clearBackground
        label="Confirm Password"
        name="confirmPassword"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        tabIndex={2}
      />
      <Button size="md" className="absolute bottom-6 right-8">
        Save
      </Button>{" "}
    </form>
  );
}
