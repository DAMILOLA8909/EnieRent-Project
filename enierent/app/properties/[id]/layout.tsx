// app/properties/[id]/layout.tsx
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}