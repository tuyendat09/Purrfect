import Link from "next/link";
import Button from "../Button";

export default function NotFoundPage() {
 return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-extralight font-serif">
          This page isn&apos;t available
        </h1>
        <p className="text-gray-neutral-600 text-sm my-2">
          Sorry, you can&apos;t access this.
        </p>
        <Button className="mt-3" variant="black" size="md">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}

