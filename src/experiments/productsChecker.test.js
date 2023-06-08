const ProductsChecker = require('./productsChecker');


describe('ProductsChecker', () => {
    let checker;

    beforeEach(() => {
        checker = new ProductsChecker();
    });

    describe('checkAvailability', () => {
        test('returns false if any required product is missing', () => {
            const recipeProducts = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
                { id: '3fbdcbac-50d6-4697-99e0-df7c18e4329b' },
            ];
            const userProductsList = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
            ];

            const result = checker.checkAvailability(recipeProducts, userProductsList);

            expect(result).toBe(false);
        });

        test('returns true if all required products are available', () => {
            const recipeProducts = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
                { id: '3fbdcbac-50d6-4697-99e0-df7c18e4329b' },
            ];
            const userProductsList = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
                { id: '3fbdcbac-50d6-4697-99e0-df7c18e4329b' },
            ];

            const result = checker.checkAvailability(recipeProducts, userProductsList);

            expect(result).toBe(true);
        });

        test('returns false if recipeProducts is empty', () => {
            const recipeProducts = [];
            const userProductsList = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
                { id: '3fbdcbac-50d6-4697-99e0-df7c18e4329b' },
            ];

            const result = checker.checkAvailability(recipeProducts, userProductsList);

            expect(result).toBe(false);
        });

        test('returns false if userProductsList is empty', () => {
            const recipeProducts = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
                { id: '3fbdcbac-50d6-4697-99e0-df7c18e4329b' },
            ];
            const userProductsList = [];

            const result = checker.checkAvailability(recipeProducts, userProductsList);

            expect(result).toBe(false);
        });
    });

    describe('checkQuantity', () => {
        test('returns false if any required product has insufficient quantity', () => {
            const recipeProducts = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216', recipe_products: { amount: 2000 } },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528', recipe_products: { amount: 150 } },
            ];
            const userProductsList = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216', amount: 1500 },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528', amount: 100 },
            ];

            const result = checker.checkQuantity(recipeProducts, userProductsList);

            expect(result).toBe(false);
        });

        test('returns true if all required products have sufficient quantity', () => {
            const recipeProducts = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216', recipe_products: { amount: 500 } },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528', recipe_products: { amount: 50 } },
            ];
            const userProductsList = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216', amount: 600 },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528', amount: 70 },
            ];

            const result = checker.checkQuantity(recipeProducts, userProductsList);

            expect(result).toBe(true);
        });

        test('returns false if recipeProducts is empty', () => {
            const recipeProducts = [];
            const userProductsList = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
                { id: '3fbdcbac-50d6-4697-99e0-df7c18e4329b' },
            ];

            const result = checker.checkQuantity(recipeProducts, userProductsList);

            expect(result).toBe(false);
        });

        test('returns false if userProductsList is empty', () => {
            const recipeProducts = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
                { id: '3fbdcbac-50d6-4697-99e0-df7c18e4329b' },
            ];
            const userProductsList = [];

            const result = checker.checkQuantity(recipeProducts, userProductsList);

            expect(result).toBe(false);
        });
    });

    describe('checkRecipe', () => {
        test('returns false if any required product is missing', () => {
            const recipe = {
                products: [
                    { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                    { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
                    { id: '3fbdcbac-50d6-4697-99e0-df7c18e4329b' },
                ],
            };
            const userProductsList = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
            ];

            const result = checker.checkRecipe(recipe, userProductsList);

            expect(result).toBe(false);
        });

        test('returns true if all required products are available and have sufficient quantity', () => {
            const recipe = {
                products: [
                    { id: '585a5a18-eef4-445c-8b3f-05d12363c216', recipe_products: { amount: 500 } },
                    { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528', recipe_products: { amount: 50 } },
                ],
            };
            const userProductsList = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216', amount: 600 },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528', amount: 70 },
            ];

            const result = checker.checkRecipe(recipe, userProductsList);

            expect(result).toBe(true);
        });

        test('returns false if recipe.products is empty', () => {
            const recipe = {
                products: [],
            };
            const userProductsList = [
                { id: '585a5a18-eef4-445c-8b3f-05d12363c216' },
                { id: 'd75789df-15ec-4d71-9dc6-66d80be9b528' },
                { id: '3fbdcbac-50d6-4697-99e0-df7c18e4329b' },
            ];

            const result = checker.checkRecipe(recipe, userProductsList);

            expect(result).toBe(false);
        });
    });
});

