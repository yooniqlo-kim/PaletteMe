import LoginForm from "@/features/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative h-screen w-screen bg-red-200 flex justify-center items-center">
      <div className="w-full max-w-[25.75rem] h-full bg-white overflow-y-auto flex justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
