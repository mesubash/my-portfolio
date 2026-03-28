const SectionHeading = ({ children, label, description }) => (
  <div className="mb-14 sm:mb-16">
    {label && (
      <p className="text-indigo text-xs font-medium uppercase tracking-[0.2em] mb-3">{label}</p>
    )}
    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
      {children}
    </h2>
    <div className="w-10 h-[2px] bg-indigo mt-4 rounded-full" />
    {description && (
      <p className="mt-4 text-slate-500 text-base sm:text-lg max-w-xl leading-relaxed">{description}</p>
    )}
  </div>
);

export default SectionHeading;
