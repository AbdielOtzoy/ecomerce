'use client'

import { useAuthStore } from "@/stores/authStore"
import Link from "next/link"

const AuthButtons = () => {
  const { isAuthenticated, logout } = useAuthStore()
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <div className="flex gap-4">
            <Link href="/sign-in" className="text-sm font-medium hover:text-gray-600">
                Sign in
            </Link>
            <Link href="/sign-up" className="text-sm font-medium hover:text-gray-600">
                Sign up
            </Link>
        </div>
      )}
    </div>
  )
}

export default AuthButtons