import axiosInstance from "@/lib/axiosUtil";
import toast from "react-hot-toast";
import { create } from "zustand";

const useBlogs = create((set, get) => ({
  blogs: [],
  error: false,
  article: {},
  loading: false,

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
  deleteBlog: async (id) => {
    set({ loading: true });
    await axiosInstance
      .delete(`/posts/delete/${id}`)
      .catch(() => {
        toast.error("try again");
      })
      .finally(() => {
        set({ loading: false });
        toast.success("Successfully");
      });
  },
  editPost: async (id, data) => {
    await axiosInstance
      .put(`/posts/edit/${id}`, data)
      .catch(() => {
        toast.error("try again..");
      })
      .finally(() => {
        set({ error: false, article: {}, loading: false });
      });
  },
}));

export default useBlogs;
