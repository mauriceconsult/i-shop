import { Category } from "@/types";

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
};

export default getCategories;
