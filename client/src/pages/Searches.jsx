import NavigationBar from "../components/NavigationBar";
import { useEffect } from "react";

const Searches = () => {
  useEffect(() => {
    console.log("Searches page mounted");
  }, []);
  return (
    <>
      {/* Navigation Bar */}
      <div className="bg-black fixed top-0 left-0 right-0 z-50 w-full">
        <NavigationBar />
      </div>

      {/* Main Content */}
      <div className="mt-24 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold mb-4">
          Welcome to Searches Page
        </h2>
        <p className="text-lg text-gray-400">
          Explore and manage your searches here.
        </p>
      </div>
    </>
  );
};

export default Searches;
