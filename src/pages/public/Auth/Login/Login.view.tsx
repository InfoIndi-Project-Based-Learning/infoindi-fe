import LoginForm from "./LoginForm";
const LoginView = () => {
  return (
    <div className="bg-[#F3F0FF] grid grid-cols-1 md:grid-cols-2">
      <div className=""></div>
      <div className="bg-white p-10 rounded-3xl">
        <h2 className="text-2xl font-bold">Masuk ke akun</h2>
        <p className="text-gray-600 text-sm font-thin mb-6">
          Masukkan detail akun anda di bawah ini
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginView;
