export default function IconLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen min-w-[400px] flex items-center justify-center bg-[#020202] p-0 m-0">
      {children}
    </div>
  )
}
