import useBlogs from "@/store/blogSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Blog from "./Blog";
import { Button } from "./ui/button";

const BlogList = () => {
  const { fetchBlogs, error, blogs } = useBlogs();

  useEffect(() => {
    toast.promise(fetchBlogs(), {
      loading: "Fetching Blogs",
    });
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Button className="w-28" onClick={fetchBlogs}>
          Re fetch
        </Button>
      </div>
    );
  }
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="grid gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Discover the Latest Blog Trends
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Stay ahead of the curve with our curated collection of articles
            covering the hottest topics in world today.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogs && blogs.map((blog) => <Blog key={blog._id} blog={blog} />)}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
