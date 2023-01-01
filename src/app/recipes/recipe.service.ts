import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeModel } from "./recipe.model";


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<RecipeModel[]>();

    // private recipes: RecipeModel[] = [
    //     new RecipeModel(
    //         'Sea Salad',
    //         'A salad for the rainy days.',
    //         'https://lobsterfrommaine.com/wp-content/uploads/2022/05/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2883-scaled.jpg',
    //         [
    //             new Ingredient('Crab', 3),
    //             new Ingredient('Lettuce', 1),
    //             new Ingredient('Turnip', 3),
    //             new Ingredient('Cherry Tomato', 1),
    //             new Ingredient('Mixed Greens', 1),
    //             new Ingredient('Pea', 3),
    //         ]),
    //     new RecipeModel(
    //         'The little Burger ofc.',
    //         'This one is a real juicer.',
    //         'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjY5LTExMy14LmpwZw.jpg?s=KhdrRy85PL2d8DVGHXPcUMfe93aldiwn-wyCGJjvOmQ',
    //         [
    //             new Ingredient('Ground beef', 1),
    //             new Ingredient('Bacon', 2),
    //             new Ingredient('Heaven Sauce', 1),
    //             new Ingredient('Buns', 2),
    //             new Ingredient('Cheese', 2),
    //         ])
    //   ];

    private recipes: RecipeModel[] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: RecipeModel){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: RecipeModel){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    setRecipes(recipes: RecipeModel[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}