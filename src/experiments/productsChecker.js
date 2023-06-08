class ProductsChecker {
    checkRecipe(recipe, userProductsList) {
        if (this.checkAvailability(recipe.products, userProductsList)) {
            return this.checkQuantity(recipe.products, userProductsList);
        }

        return false;
    }

    checkAvailability(recipeProducts, userProductsList) {
        if (recipeProducts && recipeProducts.length > 0) {
            return recipeProducts.every(product => {
                return userProductsList.some(userProduct => userProduct.id === product.id);
            });
        }

        return false;
    }

    checkQuantity(recipeProducts, userProductsList) {
        if (recipeProducts && recipeProducts.length > 0) {
            return recipeProducts.every(product => {
                const userProduct = userProductsList.find(userProduct => userProduct.id === product.id);
                return userProduct && userProduct.amount >= product.recipe_products.amount;
            });
        }

        return false;
    }
}

module.exports = ProductsChecker;
