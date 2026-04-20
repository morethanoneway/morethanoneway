const PageHero = ({
  title,
  gradientText,
  description,
  subDescription,
  primaryAction,
  secondaryAction,
  tertiaryAction,
}) => {
  return (
    <section className="pt-0 pb-5 bg-[#FFFBF7]">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">

          <h1 className="text-[3.25rem] leading-[1.05] md:text-[4rem] md:leading-[1.05] font-extrabold tracking-tight text-gray-900">
            {title}
            <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              {gradientText}
            </span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
            {description}
          </p>

          {subDescription && (
            <p className="mt-4 text-sm md:text-base text-gray-500">
              {subDescription}
            </p>
          )}

          <div className="mt-10 flex flex-col md:flex-row gap-3 justify-center">
            {primaryAction}
            {secondaryAction}
            {tertiaryAction}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PageHero;
