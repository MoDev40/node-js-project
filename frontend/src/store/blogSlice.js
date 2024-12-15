import axiosInstance from "@/lib/axiosUtil";
import { create } from "zustand";

const useBlogs = create((set) => ({
  blogs: [],
  error: false,
  post: {},
  reFetch: function () {
    set({ error: false });
  },
  fetchBlogs: async function () {
    const { data } = await axiosInstance.get("/posts/").catch((err) => {
      set({ error: true });
    });
    set({ error: false, blogs: data });
  },
}));

export default useBlogs;
