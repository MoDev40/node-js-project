import axiosInstance from "@/lib/axiosUtil";
import { create } from "zustand";

const useComments = create((set, get) => ({
  comments: [],
  fetchComments: async (post_id) => {
    const { data } = await axiosInstance.get(`/comments/${post_id}`);
    set({ comments: data });
  },
}));

export default useComments;
