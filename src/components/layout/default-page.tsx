import Balance from "react-wrap-balancer";

interface DefaultPageProps {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
}

export const DefaultPage = ({
  title,
  description,
  className,
  children,
}: DefaultPageProps) => {
  return (
    <>
      <div className="flex h-full flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-18 px-8">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter sm:text-6xl lg:leading-[1.1]">
          {title}
        </h1>

        <Balance className="max-w-[750px] text-lg text-muted-foreground sm:text-xl text-center">
          {description}
        </Balance>

        <section className={className}>
          {children}
        </section>
      </div>
    </>
  );
}