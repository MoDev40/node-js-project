import axiosInstance from "@/lib/axiosUtil";
import toast from "react-hot-toast";
import { create } from "zustand";

const useBlogs = create((set) => ({
  blogs: [],
  error: false,
  post: {},
  loading: false,
  reFetch: function () {
    set({ error: false });
  },
  fetchBlogs: async () => {
    const { data } = await axiosInstance.get("/posts/").catch(() => {
      set({ error: true });
    });
    set({ error: false, blogs: data });
  },
  postBlog: async (post) => {
    set({ loading: true });
    await axiosInstance
      .post("/posts/create", post)
      .then(() => {
        window.location.pathname = "/";
      })
      .catch(() => {
        toast.error("try again..");
      })
      .finally(() => {
        set({ loading: false });
      });
  },
}));

export default useBlogs;
