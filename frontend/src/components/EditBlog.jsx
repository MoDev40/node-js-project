import route from "@/lib/route";
import useBlogs from "@/store/blogSlice";
import "easymde/dist/easymde.min.css";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

function EditBlog() {
  const { loading, article: blog, error, editPost, fetchArticle } = useBlogs();
  const [content, setContent] = useState();
  const [navigate] = route();
  const { id } = useParams();
  const user = JSON.parse(window.localStorage.getItem("user"));

  useEffect(() => {
    toast.promise(fetchArticle(id), {
      loading: "Fetching Blog",
    });
  }, []);

  const onChange = useCallback((content) => {
    setContent(content);
  }, []);

  if (!user) {
    window.location.pathname = "/login";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (content === "") {
      toast.error("Content must provide");
      return;
    }

    const data = {
      title: formData.get("title"),
      coverUrl: formData.get("coverUrl"),
      tags: formData.get("tags"),
      content,
    };

    await editPost(id, data);
    navigate("/");
  }

  if (error) {
    return (
      <h1 className="flex flex-col items-center justify-center h-screen text-4xl font-black text-center">
        404
      </h1>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen mx-auto bg-background">
      <div className="w-full max-w-4xl px-4 py-12 md:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Create a New Blog Post
            </h1>
            <p className="mt-2 text-muted-foreground">
              Write and publish your latest thoughts.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <div className="mt-1">
                <Input
                  defaultValue={blog.title}
                  required
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter a title for your blog post"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="cover_url">Url</Label>
              <div className="mt-1">
                <Input
                  defaultValue={blog.coverUrl}
                  required
                  type="text"
                  id="coverUrl"
                  name="coverUrl"
                  placeholder="Enter a coverUrl for your blog post"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="tags">Tags</Label>
              <div className="mt-1">
                <Input
                  defaultValue={blog.tags}
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Enter a , separated tags for your blog post"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <div className="mt-1">
                <SimpleMDE value={blog.content} onChange={onChange} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button disabled={loading} type="submit">
                Publish
              </Button>
            </div>
          </form>
        </div>
        <Link className="text-center text-blue-500 underline" to="/">
          Back to blogs
        </Link>
      </div>
    </div>
  );
}

export default EditBlog;
