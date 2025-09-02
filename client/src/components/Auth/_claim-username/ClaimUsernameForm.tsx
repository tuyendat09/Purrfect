import Button from "@/shared/components/Button";
import FormHeader from "@/shared/components/Form/FormHeader";
import FloatingInput from "@/shared/components/Input/FloatingInput";

export default function ClaimUsernameForm() {
  return (
    <div className="flex items-center grow-1 transition duration-300">
      <div className="relative mx-auto">
        <div className="claim-username-form-border" />
        <div className="claim-username-form  w-[440px]  h-[664px]  text-white flex flex-col py-8 px-8 ">
          <FormHeader
            className="h-1/3 mb-auto"
            title="Claim Username"
            subtitle="Set your Cosmos handle"
          />
          <form className="w-full mb-8  h-full flex flex-col justify-center relative z-10">
            <div className="flex items-center rounded-full border-[#242424] border">
              <span className="pl-4">@</span>
              <input className=" w-full py-4 focus:outline-none" type="text" />
            </div>

            <div className="text-center text-[12px] text-gray-neutral-600 mt-4">
              <p>purrfect.com/ </p>
            </div>
            <button />
          </form>
          <Button size="lg" type="button">
            Claim
          </Button>
        </div>
      </div>
    </div>
  );
}
