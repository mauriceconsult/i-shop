import { Billboard } from "@/types";

const getBillboard = async (id: string): Promise<Billboard> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/billboards/${id}`,
  );

  if (!res.ok) {
    throw new Error(`Billboard fetch failed: ${res.status}`);
  }

  return res.json();
};

export default getBillboard;
