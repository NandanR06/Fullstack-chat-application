const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="lg:flex items-center justify-center bg-base-100 lg:bg-base-200 p-12  md:items-center md:justify-center md:flex flex">
      <div className="max-w-md text-center mt-10">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10  ${
                i % 2 === 0 ? "animate-pulse hover:bg-primary/20" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;