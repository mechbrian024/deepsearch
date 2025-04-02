import NavigationBar from "../components/NavigationBar";

const Community = () => (
  <div className="bg-black min-h-screen text-[#a8f0e8] p-10 w-full flex flex-col">
    {/* Navigation Bar */}
    <div className="bg-black fixed top-0 left-0 right-0 z-50 w-full">
      <NavigationBar />
    </div>

    {/* Main Content */}
    <div className="mt-24 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold mb-4">Welcome to Community Page</h2>
      <p className="text-lg text-gray-400">
        Connect and engage with the community here.
      </p>
    </div>
  </div>
);

export default Community;
