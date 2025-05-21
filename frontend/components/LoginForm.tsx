"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useAuthStore } from "@/stores/authStore"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"


export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { login, user, error } = useAuthStore()

  // Efecto para manejar la redirección cuando el usuario cambia
  useEffect(() => {
    // Solo ejecutar la redirección si acabamos de enviar el formulario
    if (isSubmitting) {
      if (error) {
        toast.error(error)
        setIsSubmitting(false)
        return
      }

      if (user) {
        if (user.isAdmin) {
          router.push("/dashboard")
        } else {
          router.push("/")
        }
        setIsSubmitting(false)
      }
    }
  }, [user, error, isSubmitting, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Evitar múltiples envíos
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      await login(email, password)
      // No hacemos nada aquí, el useEffect se encargará de la redirección
    } catch (err) {
      // En caso de que ocurra un error no manejado
      console.error("Login error:", err)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" required onChange={(e) => setPassword(e.target.value)} />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
      
    </div>
  )
}