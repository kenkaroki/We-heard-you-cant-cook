<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Navbar from "../../components/navbar.svelte";
    import "../../styles/page_styles/dashboard/dashboard.css";
    import type { Meal } from '../../types/recipetypes';
	import { base } from '$app/paths';

    const RANDOM_MEAL_API_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const CACHE_KEY = 'dashboard_random_recipes';
    const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

    let food_list: Meal[] = [];
    let loading = true;
    let error: string | null = null;
    let searchQuery = '';

    interface CachedData {
        meals: Meal[];
        timestamp: number;
    }

    /**
     * Save recipes to sessionStorage with timestamp
     */
    function saveToCache(meals: Meal[]) {
        const cacheData: CachedData = {
            meals,
            timestamp: Date.now()
        };
        try {
            sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        } catch (err) {
            console.error('Error saving to cache:', err);
        }
    }

    /**
     * Load recipes from sessionStorage if not expired
     */
    function loadFromCache(): Meal[] | null {
        try {
            const cached = sessionStorage.getItem(CACHE_KEY);
            if (!cached) return null;

            const cacheData: CachedData = JSON.parse(cached);
            const isExpired = Date.now() - cacheData.timestamp > CACHE_DURATION;

            if (isExpired) {
                sessionStorage.removeItem(CACHE_KEY);
                return null;
            }

            return cacheData.meals;
        } catch (err) {
            console.error('Error loading from cache:', err);
            return null;
        }
    }

    /**
     * Fetch a single random meal from the API
     */
    async function fetchRandomMeal(): Promise<Meal | null> {
        try {
            const response = await fetch(RANDOM_MEAL_API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data?.meals?.[0] ?? null;
        } catch (err) {
            console.error('Error fetching random meal:', err);
            return null;
        }
    }

    /**
     * Fetch multiple random meals
     */
    async function fetchRandomMeals(count: number): Promise<Meal[]> {
        const promises = Array.from({ length: count }, () => fetchRandomMeal());
        const results = await Promise.all(promises);
        return results.filter((meal): meal is Meal => meal !== null);
    }

    onMount(async () => {
        // Try to load from cache first
        const cachedMeals = loadFromCache();
        
        if (cachedMeals && cachedMeals.length > 0) {
            food_list = cachedMeals;
            loading = false;
            return;
        }

        // If no cache, fetch from API
        loading = true;
        try {
            food_list = await fetchRandomMeals(6);
            if (food_list.length === 0) {
                error = 'Unable to load recipes. Please try again later.';
            } else {
                // Save to cache after successful fetch
                saveToCache(food_list);
            }
        } catch (err) {
            console.error(err);
            error = 'A connection error occurred. Please refresh the page.';
        } finally {
            loading = false;
        }
    });

    function handleSearch(event: Event) {
        event.preventDefault();
        if (searchQuery.trim()) {
            goto(`${base}/recipes?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    }

    function viewRecipe(meal: Meal) {
        // Navigate to recipes page with the meal name as search query
        goto(`${base}/recipes?q=${encodeURIComponent(meal.strMeal)}`);
    }

    const recipeLabels = [
        "Featured Recipe",
        "Quick Bite",
        "Comfort Food",
        "Healthy Choice",
        "Chef's Special",
        "Popular Pick"
    ];
</script>

<Navbar />

<center>
    <section class="search_recipies">
        <form on:submit={handleSearch} class="search-form">
            <input
                type="search"
                name="search_bar"
                id="search_bar"
                bind:value={searchQuery}
                placeholder="e.g., Lasagna, Pad Thai, Chocolate Cake..."
                required>
            <button type="submit" id="search_button">Search</button>
        </form>
    </section>
</center>

{#if loading}
    <div class="loading-container">
        <div class="spinner"></div>
        <p class="loading-text">Loading delicious recipes...</p>
    </div>
{:else if error}
    <div class="error-container">
        <p class="error-text">{error}</p>
        <button on:click={() => window.location.reload()} class="retry-button">
            Retry
        </button>
    </div>
{:else}
    <section class="recipies_feed">
        <div class="recipies_feed_container">
            <div id="main_recipie" on:click={() => viewRecipe(food_list[0])} on:keypress={(e) => e.key === 'Enter' && viewRecipe(food_list[0])} role="button" tabindex="0">
                <img src={food_list[0]?.strMealThumb ?? 'https://placehold.co/800x600/e7e5e4/44403c?text=Recipe'} alt={food_list[0]?.strMeal ?? 'Recipe'}>
                <h2>{food_list[0]?.strMeal ?? 'Loading...'}</h2>
            </div>
            <div id="sub_recipie_one" on:click={() => viewRecipe(food_list[1])} on:keypress={(e) => e.key === 'Enter' && viewRecipe(food_list[1])} role="button" tabindex="0">
                <img src={food_list[1]?.strMealThumb ?? 'https://placehold.co/800x600/e7e5e4/44403c?text=Recipe'} alt={food_list[1]?.strMeal ?? 'Recipe'}>
                <h2>{food_list[1]?.strMeal ?? 'Loading...'}</h2>
            </div>
            <div id="sub_recipie_two" on:click={() => viewRecipe(food_list[2])} on:keypress={(e) => e.key === 'Enter' && viewRecipe(food_list[2])} role="button" tabindex="0">
                <img src={food_list[2]?.strMealThumb ?? 'https://placehold.co/800x600/e7e5e4/44403c?text=Recipe'} alt={food_list[2]?.strMeal ?? 'Recipe'}>
                <h2>{food_list[2]?.strMeal ?? 'Loading...'}</h2>
            </div>
            <div id="sub_recipie_three" on:click={() => viewRecipe(food_list[3])} on:keypress={(e) => e.key === 'Enter' && viewRecipe(food_list[3])} role="button" tabindex="0">
                <img src={food_list[3]?.strMealThumb ?? 'https://placehold.co/800x600/e7e5e4/44403c?text=Recipe'} alt={food_list[3]?.strMeal ?? 'Recipe'}>
                <h2>{food_list[3]?.strMeal ?? 'Loading...'}</h2>
            </div>
            <div id="sub_recipie_four" on:click={() => viewRecipe(food_list[4])} on:keypress={(e) => e.key === 'Enter' && viewRecipe(food_list[4])} role="button" tabindex="0">
                <img src={food_list[4]?.strMealThumb ?? 'https://placehold.co/800x600/e7e5e4/44403c?text=Recipe'} alt={food_list[4]?.strMeal ?? 'Recipe'}>
                <h2>{food_list[4]?.strMeal ?? 'Loading...'}</h2>
            </div>
            <div id="sub_recipie_five" on:click={() => viewRecipe(food_list[5])} on:keypress={(e) => e.key === 'Enter' && viewRecipe(food_list[5])} role="button" tabindex="0">
                <img src={food_list[5]?.strMealThumb ?? 'https://placehold.co/800x600/e7e5e4/44403c?text=Recipe'} alt={food_list[5]?.strMeal ?? 'Recipe'}>
                <h2>{food_list[5]?.strMeal ?? 'Loading...'}</h2>
            </div>
        </div>
    </section>
{/if}
    