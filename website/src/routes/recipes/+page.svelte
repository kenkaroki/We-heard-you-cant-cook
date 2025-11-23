<script lang="ts">
	import { onMount } from 'svelte';
	import type { Meal } from '../../types/recipetypes';
	import { fetchRecipes } from '../../scripts/api/recipes';
	import '../../styles/page_styles/recipes/recipe.css';
	import Navbar from"../../components/navbar.svelte";


	let meals: Meal[] = [];
	let loading = false;
	let error: string | null = null;

	// Get search query from URL parameters
	let searchQuery = '';

	onMount(async () => {
		const params = new URLSearchParams(window.location.search);
		searchQuery = params.get('q')?.trim() ?? '';

		if (!searchQuery) {
			error = 'No search query provided.';
			return;
		}

		loading = true;
		try {
			meals = await fetchRecipes(searchQuery);
			if (!meals || meals.length === 0) {
				error = `We couldn't find any recipes for "${searchQuery}".`;
			}
		} catch (err) {
			console.error(err);
			error = 'A connection error occurred. Please try again later.';
		} finally {
			loading = false;
		}
	});

	let selectedMeal: Meal | null = null;

	function selectMeal(meal: Meal) {
		selectedMeal = meal;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	function backToList() {
		selectedMeal = null;
	}

	// New function to go back to the previous page in the browser history
	function goBack() {
		window.history.back();
	}

	function getIngredients(meal: Meal) {
		const ingredients = [];
		for (let i = 1; i <= 20; i++) {
			const ingredient = meal[`strIngredient${i}`];
			const measure = meal[`strMeasure${i}`];
			if (ingredient && ingredient.trim() !== '') {
				ingredients.push({
					name: ingredient.trim(),
					measure: measure?.trim() ?? ''
				});
			}
		}
		return ingredients;
	}
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com">
    {
        theme: {
            extend: {
                colors: {
                    'theme-gold': '#8b6f2f',
                    'theme-error': '#c75a5a'
                },
            }
        }
    }
	</script>
</svelte:head>

<Navbar />

<div class="layout-container layout-padding-sm">
	<header class="text-center py-6">
		<h1 class="header-title">{searchQuery}! ....Mmmh what a nice choice</h1>
		<p class="header-subtitle">Find ingredients and instructions for any meal.</p>
	</header>

	{#if loading}
		<div class="loading-box">
			<div class="spinner"></div>
			<p class="loading-text">Searching the global kitchen...</p>
		</div>
	{:else if error}
		<div class="error-alert" role="alert">
			<p class="error-title">Oops! Something went wrong.</p>
			<p>{error}</p>
		</div>
	{:else if selectedMeal}
		<div class="recipe-detail-box">
			<div class="back-button-bar">
				<button on:click={backToList} class="back-button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="2.5"
						stroke="currentColor"
						class="w-4 h-4 mr-2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
						/>
					</svg>
					Back to Results
				</button>
			</div>

			<div class="recipe-image-wrap">
				<img
					src={selectedMeal.strMealThumb}
					alt={selectedMeal.strMeal}
					class="recipe-image"
					on:error={(event) => {
						const img = event.currentTarget;
						(img as HTMLImageElement).onerror = null;
						(img as HTMLImageElement).src =
							'https://placehold.co/400x225/e7e5e4/44403c?text=Recipe+Preview';
					}}
				/>

				<div class="image-overlay"></div>
				<h2 class="recipe-name">{selectedMeal.strMeal}</h2>
			</div>

			<div class="recipe-content-grid">
				<div class="details-section">
					<h3 class="section-title">Details</h3>
					<div class="detail-list">
						<p><span class="detail-label">Category:</span> {selectedMeal.strCategory ?? 'N/A'}</p>
						<p><span class="detail-label">Cuisine:</span> {selectedMeal.strArea ?? 'N/A'}</p>
						{#if selectedMeal.strSource}
							<a href={selectedMeal.strSource} target="_blank" class="source-link"
								>View Original Source</a
							>
						{/if}
						{#if selectedMeal.strYoutube}
							<a href={selectedMeal.strYoutube} target="_blank" class="youtube-link"
								>Watch Video Guide</a
							>
						{/if}
					</div>
				</div>

				<div class="ingredients-section">
					<h3 class="section-title">Ingredients</h3>
					<ul class="ingredients-list">
						{#each getIngredients(selectedMeal) as item}
							<li class="ingredient-item">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="ingredient-icon"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
								<span class="ingredient-measure"
									>{item.measure} <span class="ingredient-name">{item.name}</span></span
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div class="instructions-section">
				<h3 class="section-title">Instructions</h3>
				<div class="instructions-content recipe-instructions">
					{@html selectedMeal.strInstructions?.replace(/\r\n/g, '<br>') ??
						'<p class="no-instructions">No instructions available.</p>'}
				</div>
			</div>
		</div>
	{:else}
		<div class="back-button-bar" style="padding-bottom: 20px;">
			<button on:click={goBack} class="back-button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="2.5"
					stroke="currentColor"
					class="w-4 h-4 mr-2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
					/>
				</svg>
				Go Back to Search
			</button>
		</div>
		<div class="meal-list-grid">
			{#each meals as meal}
				<button type="button" class="meal-card" on:click={() => selectMeal(meal)}>
					<div class="meal-card-image-container meal-card-image-wrap">
						<img
							src={meal.strMealThumb ??
								'https://placehold.co/400x225/e7e5e4/44403c?text=Recipe+Preview'}
							alt={meal.strMeal}
							class="meal-card-image"
							on:error={(event) => {
								const img = event.currentTarget;
								(img as HTMLImageElement).onerror = null;
								(img as HTMLImageElement).src =
									'https://placehold.co/400x225/e7e5e4/44403c?text=Recipe+Preview';
							}}
						/>
					</div>
					<div class="meal-card-content meal-card-text-container">
						<h3 class="meal-card-title">{meal.strMeal}</h3>
						<p class="meal-card-cuisine text-white">{meal.strArea ?? 'Global'} Cuisine</p>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>
