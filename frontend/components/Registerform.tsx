"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"
import { useAuthStore } from "@/stores/authStore"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, error,user } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if(isSubmitting) {
      if (error) {
        toast.error(error)
        setIsSubmitting(false)
        return
      }
  
      if (user) {
        toast.success("Usuario registrado con éxito")
        router.push("/sign-in")
        setIsSubmitting(false)
      }
    }
  }, [error, user, router, isSubmitting])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await register(name, email, password)
    } catch (error) {
      console.error("Registration error:", error)
      setIsSubmitting(false)
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your details to get started</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="John Doe" required onChange={(e) => setName(e.target.value)} />
            </div>
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
          <CardFooter className="flex flex-col space-y-4 mt-3">
            <Button type="submit" className="w-full">
              Create account
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
