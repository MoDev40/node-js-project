import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Login() {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("user"));

  if (user) {
    window.location.pathname = "/";
    return null;
  }

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await axios
      .post("http://localhost:8000/api/auth/login", userData)
      .catch(() => {
        toast.error("try again invalid credential");
      })
      .finally(() => {
        setLoading(false);
      });

    const { token, user } = await res.data;
    const { _id, name, email } = user;
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        token,
        id: _id,
        username: name,
        email,
      })
    );

    toast.success("Login successfully");
    window.location.pathname = "/";
  }
  return (
    <Card className="container w-full max-w-sm p-5 mx-auto mt-6">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input name="password" id="password" type="password" required />
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? <Loader2 className=" animate-spin" /> : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className={cn("items-center flex flex-col")}>
        <Label htmlFor="new account">
          new user{" "}
          <Link className="text-blue-400 underline" to="/sign-up">
            sign-up
          </Link>
        </Label>
      </CardFooter>
    </Card>
  );
}

export default Login;
