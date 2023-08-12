export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      {children}
    </div>
  );
}
