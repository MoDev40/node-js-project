import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";

function Article() {
  const [article, setArticle] = useState({});
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchArticle() {
      const res = await axios
        .get(`http://localhost:8000/api/posts/${id}`)
        .catch(() => {
          setError(true);
        });
      const data = await res.data;
      setArticle(data);
    }
    toast.promise(fetchArticle(), {
      loading: "Fetching Article",
    });
  }, []);

  if (error) {
    return (
      <h1 className="flex flex-col items-center justify-center h-screen text-4xl font-black text-center">
        404
      </h1>
    );
  }
  return (
    article && (
      <div className="flex flex-col px-4 py-6 space-y-6 md:px-6 lg:py-16">
        <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
            {article?.title}
          </h1>
          <div className="mt-6">
            <p>
              <strong>Tags:</strong> {article.tags}
            </p>
          </div>
          <div className="mt-6">
            <ReactMarkdown>{article?.content}</ReactMarkdown>
          </div>
        </article>
        <Link className="text-center text-blue-500 underline" to="/">
          Back to blogs
        </Link>
      </div>
    )
  );
}

export default Article;
