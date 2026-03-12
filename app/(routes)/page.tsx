import getBillboard from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import { Billboard as BillboardType, Product } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const HomePage = async () => {
  let products: Product[] = [];
  let billboard: BillboardType | null = null;

  try {
    [products, billboard] = await Promise.all([
      getProducts({ isFeatured: true }),
      getBillboard("63de3277-c092-4812-b24d-8d1d4f2c4d64"),
    ]);
  } catch (error) {
    console.error("[HOME_PAGE]", error);
  }

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {billboard && <Billboard data={billboard} />}
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured products" items={products} />
      </div>
    </Container>
  );
};

export default HomePage;
