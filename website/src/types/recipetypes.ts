// src/routes/recipes/types.ts

/**
 * Represents a single meal returned from TheMealDB API.
 */
export interface Meal {
	idMeal: string;
	strMeal: string;
	strDrinkAlternate: string | null;
	strCategory: string | null;
	strArea: string | null;
	strInstructions: string | null;
	strMealThumb: string | null;
	strTags: string | null;
	strYoutube: string | null;
	strSource: string | null;

	// Ingredients and measures (1-20)
	[key: `strIngredient${number}`]: string | null;
	[key: `strMeasure${number}`]: string | null;
}
