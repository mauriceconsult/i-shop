import { Billboard } from "@/types";

const getBillboard = async (id: string): Promise<Billboard | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/billboards/${id}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export default getBillboard;
