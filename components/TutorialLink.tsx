function Link({
  href = '',
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="md:text-xl bg-blue-400 border-blue-600 hover:bg-blue-600 duration-150 ease-in-out border-2 text-white drop-shadow-sm font-bold p-3 rounded-lg w-full text-center"
      href={href}
    >
      {children}
    </a>
  );
}

export default function TutorialLink() {
  return (
    <div className="bg-blue-200 border-blue-400 border-2 p-6 md:p-12 flex flex-col items-start justify-center gap-8 rounded-lg max-w-3xl drop-shadow-md">
      <h2 className="text-lg md:text-2xl text-blue-600">
        Learn how to build a SaaS using{' '}
        <span className="font-bold">Next.js</span>,{' '}
        <span className="font-bold">Clerk</span>,{' '}
        <span className="font-bold">AWS DynamoDB</span> and,{' '}
        <span className="font-bold">Stripe</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 w-full">
        <Link href="">View the code</Link>
        <Link href="">View the tutorial</Link>
      </div>
    </div>
  );
}
