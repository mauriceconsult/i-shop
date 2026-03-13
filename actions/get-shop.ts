// i-shop/actions/get-shop.ts
interface Shop {
  id: string;
  name: string;
  currency: string;
  country: string;
}

const getShop = async (): Promise<Shop | null> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export default getShop;
