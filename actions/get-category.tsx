import { Billboard, Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/categories`;

const getCategory = async (id: string): Promise<Category & { billboard: Billboard }> => {
    const res = await fetch(`${URL}/${id}`);
    return res.json();        
}
export default getCategory;