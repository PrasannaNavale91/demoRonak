import Logo from "../../assets/logo.png"

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300/50">
      <img
        src={Logo}
        alt="Loading..."
        className="w-20 h-20 animate-bounce shadow-lg"
      />
    </div>
  );
}

export default Loader;