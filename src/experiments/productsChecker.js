 class ProductsChecker {
    checkRecipe(receipt, userProductsList) {
        const isAvailable = this.checkAvailability(receipt, userProductsList);

        if (isAvailable) {
            const hasEnoughQuantity = this.checkQuantity(receipt, userProductsList);
            return hasEnoughQuantity;
        }

        return false;
    }
      checkAvailability(receipt, userProductsList) {
         return receipt.products.every((product) =>
             userProductsList.some((p) => p.id === product.id)
         );
     }

     checkQuantity(receipt, userProductsList) {
         return receipt.products.every((product) =>
             userProductsList.some((p) => p.id === product.id && p.amount >= product.amount)
         );
     }
}
 module.exports = ProductsChecker;
