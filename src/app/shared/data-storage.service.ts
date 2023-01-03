import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, shareReplay, tap } from "rxjs";

import { RecipeService } from "../recipes/recipe.service";
import { RecipeModel } from "../recipes/recipe.model";


@Injectable({providedIn: 'root'})
export class DataStorageService {
    private cache$: Observable<RecipeModel[]>;
    private cacheTimestamp: number;
    private readonly CACHE_EXPIRATION_TIME = 900000;

    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
        .put('https://recipebook-ad021-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        if (!this.cache$ || Date.now() - this.cacheTimestamp > this.CACHE_EXPIRATION_TIME) {
          this.cache$ = this.http.get<RecipeModel[]>(
            'https://recipebook-ad021-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
          ).pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),
            tap(recipes => {
              this.recipeService.setRecipes(recipes);
            }),
            shareReplay(1)
          );
          this.cacheTimestamp = Date.now();
        }
        return this.cache$;
      }
      
}