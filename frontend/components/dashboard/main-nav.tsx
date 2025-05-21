import Link from "next/link"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <span className="font-bold">MODISH ADMIN</span>
      </Link>
    </div>
  )
}
