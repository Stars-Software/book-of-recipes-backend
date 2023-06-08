class ProductsChecker {
    checkRecipe(receipts: Recipe[], userProductsList: Product[]): boolean {
      const isAvailable = this.checkAvailability(receipts, userProductsList);
  
      if (isAvailable) {
        const hasEnoughQuantity = this.checkQuantity(receipts, userProductsList);
        return hasEnoughQuantity;
      }
  
      return false;
    }
  
    private checkAvailability(
      receipts: Recipe[],
      userProductsList: Product[]
    ): boolean {
      const receiptProductIds = receipts.flatMap((recipe) =>
        recipe.products.map((product) => product.id)
      );
      const userProductIds = userProductsList.map((product) => product.id);
  
      return receiptProductIds.every((productId) =>
        userProductIds.includes(productId)
      );
    }
  
    private checkQuantity(
      receipts: Recipe[],
      userProductsList: Product[]
    ): boolean {
      for (const recipe of receipts) {
        for (const product of recipe.products) {
          const matchingProduct = userProductsList.find(
            (p) => p.id === product.id
          );
  
          if (!matchingProduct || matchingProduct.amount < product.recipe_products.amount) {
            return false;
          }
        }
      }
  
      return true;
    }
  }
  
  interface Recipe {
    id: string;
    title: string;
    description?: string;
    private: boolean;
    categoryId: string;
    userId?: string;
    products: RecipeProduct[];
    recipe_category?: RecipeCategory;
  }
  
  interface RecipeProduct {
    id: string;
    title: string;
    categoryId: string;
    recipe_products: {
      amount: number;
    };
  }
  
  interface RecipeCategory {
    id: string;
    title: string;
  }
  
  interface Product {
    id: string;
    title: string;
    categoryId: string;
    product_categories?: {
      image: string;
      title: string;
    };
    amount: number;
  }
  
  export const productsChecker = new ProductsChecker();
  