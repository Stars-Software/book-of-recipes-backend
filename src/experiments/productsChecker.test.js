const ProductsChecker = require('./productsChecker');

describe('ProductsChecker', () => {
    describe('checkRecipe', () => {
        const productsChecker = new ProductsChecker();

        const receipt = {
            title: 'Test',
            description: 'Text',
            products: [
                { id: 'a1b2c3', title: 'test1', amount: 100 },
                { id: 'd4e5f6', title: 'test2', amount: 200 },
            ],
        };

        const userProductsList = [
            {
                id: 'a1b2c3',
                title: 'test1',
                categoryID: '1234-5678-abcd',
                products_categories: {
                    image: 'images/products/olive.png',
                    title: 'Fats & Oils',
                },
                amount: 100,
            },
            {
                id: 'd4e5f6',
                title: 'test2',
                categoryID: '1234-5678-abcd',
                products_categories: {
                    image: 'images/products/olive.png',
                    title: 'Fats & Oils',
                },
                amount: 300,
            },
            {
                id: 'g7h8i9',
                title: 'test3',
                categoryID: '1234-5678-abcd',
                products_categories: {
                    image: 'images/products/olive.png',
                    title: 'Fats & Oils',
                },
                amount: 100,
            },
        ];

        it('should return true if all products are available and have enough quantity', () => {
            const result = productsChecker.checkRecipe(receipt, userProductsList);
            expect(result).toBe(true);
        });

        it('should return false if any product is missing', () => {
            const missingProductList = userProductsList.filter((product) => product.id !== 'a1b2c3');
            const result = productsChecker.checkRecipe(receipt, missingProductList);
            expect(result).toBe(false);
        });

        it('should return false if any product has insufficient quantity', () => {
            const insufficientQuantityList = userProductsList.map((product) => {
                if (product.id === 'd4e5f6') {
                    return { ...product, amount: 150 };
                }
                return product;
            });
            const result = productsChecker.checkRecipe(receipt, insufficientQuantityList);
            expect(result).toBe(false);
        });

        it('should handle an empty receipt', () => {
            const emptyReceipt = {
                title: 'Empty Receipt',
                description: 'No products',
                products: [],
            };
            const result = productsChecker.checkRecipe(emptyReceipt, userProductsList);
            expect(result).toBe(true);
        });

        it('should handle an empty user products list', () => {
            const emptyUserProductsList = [];
            const result = productsChecker.checkRecipe(receipt, emptyUserProductsList);
            expect(result).toBe(false);
        });

        it('should handle an empty receipt and empty user products list', () => {
            const emptyReceipt = {
                title: 'Empty Receipt',
                description: 'No products',
                products: [],
            };
            const emptyUserProductsList = [];
            const result = productsChecker.checkRecipe(emptyReceipt, emptyUserProductsList);
            expect(result).toBe(true);
        });
    });
});
