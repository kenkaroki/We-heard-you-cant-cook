// src/routes/recipes/api.ts
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
	[key: `strIngredient${number}`]: string | null;
	[key: `strMeasure${number}`]: string | null;
}

const MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

/**
 * Fetch recipes from TheMealDB API based on a search query.
 * @param query The meal name to search for
 * @returns Array of Meal objects or empty array if not found
 */
export async function fetchRecipes(query: string): Promise<Meal[]> {
	if (!query) return [];

	try {
		const response = await fetch(`${MEAL_API_URL}${encodeURIComponent(query)}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		// The API returns 'meals' array or null
		return data?.meals ?? [];
	} catch (error) {
		console.error('Error fetching recipes:', error);
		throw error;
	}
}
