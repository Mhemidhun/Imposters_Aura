const Newsletter = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-6 md:px-12">
        <h3 className="text-lg font-bold text-black mr-6 mb-4 md:mb-0">
          GET THE LATEST UPDATES
        </h3>
        <div className="flex w-full max-w-lg">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none"
          />
          <button className="bg-black text-white px-6 py-2 font-bold">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
