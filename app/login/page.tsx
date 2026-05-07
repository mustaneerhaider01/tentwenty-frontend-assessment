import AuthForm from "@/components/auth/auth-form";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="h-screen w-full overflow-hidden flex">
      <div className="flex-1 h-full flex items-center justify-center px-8 md:px-10">
        <AuthForm />
      </div>
      <div className="hidden flex-1 bg-primary-600 h-full md:flex flex-col justify-center space-y-3.5 px-[70px]">
        <h1 className="font-semibold text-[40px] text-white">ticktock</h1>
        <p className="text-gray-200 max-w-xl">
          Introducing ticktock, our cutting-edge timesheet web application
          designed to revolutionize how you manage employee work hours. With
          ticktock, you can effortlessly track and monitor employee attendance
          and productivity from anywhere, anytime, using any internet-connected
          device.
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
