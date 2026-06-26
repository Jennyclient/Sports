import LoginForm from "@/components/login/LoginForm";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans px-4 py-6 w-full">
      <LoginForm />
    </div>
  );
}
