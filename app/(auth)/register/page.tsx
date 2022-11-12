import Image from "next/image";
import Link from "next/link";
import RegisterForm from "./Register";

function RegisterPage() {
  console.log(process.env.NODE_ENV);
  return (
    <div className="w-full overflow-hidden rounded-3xl bg-[#131D27] text-gray-200 shadow-xl">
      <div className="w-full md:flex">
        <div className="hidden w-1/2 bg-primary-550 py-10 px-10 md:block">
          <Image
            src="/images/illustration.svg"
            alt="Illustration"
            width={580}
            height={580}
          />
        </div>
        <div className="w-full relative py-5 px-1 sm:py-10 sm:px-5 md:w-1/2 md:px-10">
          <Image
            src="/logo/logo.svg"
            width={350}
            height={147}
            alt="logo"
            className="mb-8 w-full sm:w-72"
          />
          <h1 className="font-bold text-3xl">Create an account with us!</h1>
          <RegisterForm />
          <p className="fixed z-10 bg-cool-gray-900 rounded-full px-4 bottom-4 right-0 left-0 mx-auto w-fit sm:absolute">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-450">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
