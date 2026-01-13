import { create } from "zustand";
import { Api } from "@/lib/api";
import type { Article } from "@/types/article";

type ArticleStore = {
  articles: Article[];
  loading: boolean;
  fetchArticles: ({ page, limit }: { page?: number; limit?: number }) => void;
  createArticle: (article: Article) => void;
};

type ArticleResponse = {
  success: boolean;
  message: string;
  data: {
    articles: Article[];
    count: number;
  };
  page: number;
  limit: number;
};

type CreateArticleResponse = {
  success: boolean;
  message: string;
  data: Article;
};

const useArticleStore = create<ArticleStore>((set) => ({
  articles: [],
  loading: false,
  fetchArticles: async ({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }) => {
    try {
      set({ loading: true });
      const response = await Api.get<ArticleResponse>(
        `/article?page=${page}&limit=${limit}`
      );
      set({ loading: false, articles: response.data.data.articles });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
  createArticle: async (article: Article) => {
    try {
      set({ loading: true });
      const response = await Api.post<CreateArticleResponse>(
        "/article",
        article
      );
      set((prev) => ({
        loading: false,
        articles: [...prev.articles, response.data.data],
      }));
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
}));

export default useArticleStore;
