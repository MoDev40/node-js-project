import axiosInstance from "@/lib/axiosUtil";
import { create } from "zustand";

const useComments = create((set, get) => ({
  comments: [],
  loading: false,
  fetchComments: async (post_id) => {
    const { data } = await axiosInstance.get(`/comments/${post_id}`);
    set({ comments: data });
  },
  createComment: async (data) => {
    set({ loading: true });
    await axiosInstance
      .post("/comments/create", data)
      .catch(() => {
        toast.error("try again latter");
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));

export default useComments;
