import Logo from "../../assets/logo.png"

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100/50">
      <img
        src={Logo}
        alt="Loading..."
        className="w-20 h-20 animate-spin-slow opacity-80"
      />
    </div>
  );
}

export default Loader;