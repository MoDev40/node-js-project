import axios from "axios"
import { Pen, Trash2 } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import CommentDialog from "./CommentDialog"
import { Button } from "./ui/button"

const Blog = ({ blog }) => {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const user = JSON.parse(window.localStorage.getItem("user"))

  async function handleDelete(){
    setLoading(true)
    await axios.delete(`http://localhost:8080/api/posts/delete/${blog.id}`).catch(()=>{
      toast.error("try again")
    }).finally(()=>{
        setLoading(false)
        toast.success("Successfully")
        window.location.pathname = "/"
    })
  }
  return (
    <div className="rounded-lg overflow-hidden bg-background shadow-md transition-all hover:scale-[1.02] hover:shadow-md">
    <Link to={`/blog/article/${blog?.id}`} className="block">
      <img
        src={blog?.coverUrl}
        alt={blog?.title}
        width={600}
        height={400}
        className="w-full h-48 object-cover"
      />
    </Link>
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">
        {blog?.title}
      </h3>
      <p className="text-muted-foreground mb-4">
        {blog?.summary}
      </p>
      <div className="flex items-center justify-between">
        <CommentDialog post_id={blog.id} title={blog.title}/>
        {
          user?.id === blog.post_id &&
        <>
          <Button onClick={()=>{
            navigate(`edit/blog-post/${blog.id}`)
          }} variant="ghost" size="icon">
            <Pen className="w-5 h-5" />
          </Button>
          <Button disabled={loading} onClick={handleDelete} variant="ghost" size="icon">
            <Trash2 color="red" size={18} className="w-5 h-5" />
          </Button>
        </>
        }
      </div>
    </div>
  </div>  
  )
}


export default Blog