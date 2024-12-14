import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
const SignUp = () => {
  const [loading,setLoading] = useState(false)
  const user = JSON.parse(window.localStorage.getItem("user"))

  if(user){
    window.location.pathname = "/"
    return null;
  }

  async function handleSubmit(e){
    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target)

    const userData = {
      email:formData.get('email'),
      name:formData.get('username'),
      password:formData.get('password')
    }

   await axios.post('http://localhost:8000/api/auth/register',userData).then(()=>{
    toast.success("Sign up successfully")
    }).catch(()=>{
      toast.error("try again invalid credential")
      return
    }).finally(()=>{
      setLoading(false)
    })
  }
  return (
    <Card className="container w-full max-w-sm p-5 mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">SignUp</CardTitle>
        <CardDescription>
          Enter your credentials below to register new account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input name="username" id="username" type="text" placeholder="doe" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input name="email" id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input name="password" id="password" type="password" required />
        </div>
        <Button disabled={loading} type="submit" className="w-full">{
          loading ? <Loader2 className=" animate-spin"/> : "Sign Up"
        }</Button>
        </form>
      </CardContent>
      <CardFooter className={cn(
        "items-center flex flex-col"
      )}>
        <Label htmlFor="new account">have account <Link className="text-blue-400 underline" to='/login'>login</Link></Label>
      </CardFooter>
    </Card>  
  )
}

export default SignUp