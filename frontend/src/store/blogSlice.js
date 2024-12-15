import axiosInstance from "@/lib/axiosUtil";
import toast from "react-hot-toast";
import { create } from "zustand";

const useBlogs = create((set, get) => ({
  blogs: [],
  error: false,
  article: {},
  loading: false,
  reFetch: function () {
    const error = get().error;
    if (error) {
      set({ error: false });
    }
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
  fetchArticle: async (id) => {
    const { data } = await axiosInstance.get(`/posts/${id}`).catch(() => {
      set({ error: true });
    });
    set({ article: data });
  },
}));

export default useBlogs;
