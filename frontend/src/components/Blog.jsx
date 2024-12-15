import useBlogs from "@/store/blogSlice";
import { Pen, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import CommentDialog from "./CommentDialog";
import { Button } from "./ui/button";

const Blog = ({ blog }) => {
  const { deleteBlog, loading } = useBlogs();
  const navigate = useNavigate();

  const user = JSON.parse(window.localStorage.getItem("user"));

  async function handleDelete() {
    deleteBlog(blog._id);
  }
  return (
    <div className="rounded-lg overflow-hidden bg-background shadow-md transition-all hover:scale-[1.02] hover:shadow-md">
      <Link to={`/blog/article/${blog?._id}`} className="block">
        <img
          src={blog?.coverUrl}
          alt={blog?.title}
          width={600}
          height={400}
          className="object-cover w-full h-48"
        />
      </Link>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-semibold">{blog?.title}</h3>
        <ReactMarkdown>{blog?.content.slice(0, 25)}</ReactMarkdown>
        <div className="flex items-center justify-between">
          <CommentDialog post_id={blog._id} title={blog.title} />
          {user?.id === blog?.user && (
            <>
              <Button
                onClick={() => {
                  navigate(`edit/blog-post/${blog._id}`);
                }}
                variant="ghost"
                size="icon"
              >
                <Pen className="w-5 h-5" />
              </Button>
              <Button
                disabled={loading}
                onClick={handleDelete}
                variant="ghost"
                size="icon"
              >
                <Trash2 color="red" size={18} className="w-5 h-5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
