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
        for (const product of receipt.products) {
            const userProduct = userProductsList.find((p) => p.id === product.id);

            if (!userProduct) {
                return false;
            }
        }
        return true;
    }

    checkQuantity(receipt, userProductsList) {
        for (const product of receipt.products) {
            const userProduct = userProductsList.find((p) => p.id === product.id);

            if (userProduct.amount < product.amount) {
                return false;
            }
        }
        return true;
    }
}
 module.exports = ProductsChecker;