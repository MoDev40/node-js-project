import useComments from "@/store/commentSlice";

const Comments = () => {
  const { comments } = useComments();
  return (
    <ul class="space-y-4">
      {comments.map((comment) => (
        <li key={comment._id} class="bg-white w-full rounded-lg shadow-md p-2">
          <div class="flex justify-between items-start">
            <p class="text-gray-700">{comment.message}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Comments;
