import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

function Profile() {
    const user = JSON.parse(window.localStorage.getItem("user"))
    if(!user){
        window.location.pathname = "/login"
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md p-6 bg-card text-card-foreground shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{user?.username?.slice(0,1)?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <h4 className="text-lg font-semibold">{user?.username}</h4>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <Separator className="my-6" />
        <Button onClick={()=>{
            window.localStorage.clear()
            window.location.pathname = "/login"
        }} variant="destructive" className="w-full">
          Logout
        </Button>
      </Card>
    </div>
  )
}


export default Profile