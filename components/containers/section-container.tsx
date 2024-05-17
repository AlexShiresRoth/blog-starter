export default function SectionContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center w-full md:w-11/12 lg:w-3/4">
      {children}
    </section>
  );
}
