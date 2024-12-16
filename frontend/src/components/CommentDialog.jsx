import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { MessageCircleIcon } from "lucide-react";
import CommentForm from "./CommentForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import Comments from "./Comments";
import useComments from "@/store/commentSlice";
import toast from "react-hot-toast";

const CommentDialog = ({ post_id, title }) => {
  const { fetchComments } = useComments();

  const handleFetchComments = () => {
    toast.promise(fetchComments(post_id), {
      loading: "Fetching comments",
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleFetchComments} variant="ghost" size="icon">
          <MessageCircleIcon className="w-5 h-5" />
          <span className="sr-only">Comment</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-black">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start">
          <Comments />
        </div>
        <DialogFooter className="sm:justify-start">
          <CommentForm post_id={post_id} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
