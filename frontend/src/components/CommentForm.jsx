import { CornerDownLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useComments from "@/store/commentSlice";
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";

const CommentForm = ({ post_id }) => {
  const { createComment, loading, fetchComments } = useComments();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      post: post_id,
      message: formData.get("message"),
    };

    toast.promise(createComment(data), {
      loading: "comment creation",
    });
    fetchComments(post_id);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full p-2 space-y-3"
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        required
        name="message"
        id="message"
        placeholder="Type your message here..."
        className="w-full p-3 shadow-none resize-none min-h-12 focus-visible:ring-0"
      />
      <Button
        disabled={loading}
        type="submit"
        size="sm"
        className="ml-auto gap-1.5"
      >
        Send Message
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <CornerDownLeft className="size-3.5" />
        )}
      </Button>
    </form>
  );
};

export default CommentForm;
