<script lang="ts">
	import "../../styles/page_styles/authentications/signup.css";
	import {signup} from "../../scripts/api/auth.ts"
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	// Form state (bind to inputs)
	let email: string = '';
	let password: string = '';
	let isLoading: boolean = false;

	let errorMessage: string = '';

	let showPassword = false; // Controls password visibility
	let passwordFocused = false; // Controls eye-following/dialogue
	let typingTimeout: number = 0;
	let isMobile = false;

	// === STATE FOR SNEAKY PLAN & ANIMATION TIMING ===
	let isSneaking = false; // Set to true when the sequence starts
	let showTelescope = false; // Carrot zooms in
	let showNotebook = false; // Carrot writes down password
    let showInitialDialogue = false;
	let carrotGotPassword = false; // Cabbage dialogue
	
	// Define the exact timing for the animation sequence (in milliseconds)
	const TELESCOPE_TIME = 5000; // Time the telescope is visible
	const NOTEBOOK_TIME = 3000; // Time the notebook is visible
	const DIALOGUE_BUFFER_TIME = 2000; // Time buffer for dialogue display
	const TOTAL_SEQUENCE_TIME = TELESCOPE_TIME + NOTEBOOK_TIME + DIALOGUE_BUFFER_TIME; // Total time plus reset buffer
	// =================================

    // UPDATED LOGIC: Eyes are closed only if the password is shown AND neither the telescope NOR the notebook are active.
    $: eyesClosed = showPassword && !showTelescope && !showNotebook;

	// DOM refs for characters
	let carrotbody: HTMLElement;
	let cabbagebody: HTMLElement;
	let cakebody: HTMLElement;

	// Cursor tracking
	let targetX = 0;
	let targetY = 0;

	const PUPIL_MAX_MOVE = 9;

	function gotodashboard() {
		goto(base + '/dashboard');
	}

	async function handlesignup(event: SubmitEvent) {
		event.preventDefault();
		isLoading = true;

		// 💡 Access the email and password variables directly here
		const userEmail = email;
		const userPassword = password;

		// login func defined at src/scripts/api/auth
		const response = await signup(userEmail, userPassword);
if (response === "good signup") {
    gotodashboard();
} else {
    // Show error to user
    errorMessage = response;
}
	}

	function togglePasswordVisibility() {
		if (showPassword) {
			// Case 1: If the password is currently visible, allow the user to hide it.
			showPassword = false;
			resetSneakyPlan();
		} else {
			// Case 2: If the password is currently hidden, only allow showing if length >= 3.
			if (password.length >= 3) {
				showPassword = true;
				startSneakyPlan();
			}
		}
	}

	function startSneakyPlan() {
		if (isSneaking) return;
		isSneaking = true;
        
        // 0. Show the initial denial dialogue immediately
        showInitialDialogue = true;

		// 1. Show the telescope (Carrot looks)
		showTelescope = true; 

		// 2. After TELESCOPE_TIME, hide telescope and show notebook (Carrot writes)
		setTimeout(() => {
			showTelescope = false; 
			showNotebook = true; // This will keep the eyes open
		}, TELESCOPE_TIME);

		// 3. After NOTEBOOK_TIME, hide notebook, hide initial dialogue, and show success dialogue
		setTimeout(() => {
			showNotebook = false; // This will trigger eyes to close again
            showInitialDialogue = false; 
			carrotGotPassword = true; 
		}, TELESCOPE_TIME + NOTEBOOK_TIME);

		// 4. Reset the state after the whole sequence (includes time for success dialogue display)
		setTimeout(() => {
			resetSneakyPlan();
		}, TOTAL_SEQUENCE_TIME);
	}

	function resetSneakyPlan() {
		isSneaking = false;
		showTelescope = false;
		showNotebook = false;
        showInitialDialogue = false;
		carrotGotPassword = false;
	}

	function handlePasswordFocus() {
		passwordFocused = true;
	}

	function handlePasswordBlur() {
		passwordFocused = false;
		clearTimeout(typingTimeout);
	}

	function handlePasswordInput() {
		clearTimeout(typingTimeout);
		typingTimeout = window.setTimeout(() => {
			// Debounce logic
		}, 500);
	}

	function handleMouseMove(e: MouseEvent | TouchEvent) {
		const clientX = e instanceof MouseEvent ? e.clientX : e.touches?.[0]?.clientX ?? targetX;
		const clientY = e instanceof MouseEvent ? e.clientY : e.touches?.[0]?.clientY ?? targetY;
		targetX = clientX;
		targetY = clientY;
	}

	function animateEyesAndLean() {
		if (!carrotbody || !cabbagebody) {
			requestAnimationFrame(animateEyesAndLean);
			return;
		}

		// Use the computed variable here for Carrot.
		const carrotEyesClosed = eyesClosed; 
		// Cabbage's eyes are always closed when password is shown
		const cabbageEyesClosed = showPassword; 

		// Carrot Logic
        const carrotEl = carrotbody;
		if (carrotEl) {
			const rect = carrotEl.getBoundingClientRect();
			const itemX = rect.left + rect.width / 2;
			const itemY = rect.top + rect.height / 2;

			const dx = targetX - itemX;
			const dy = targetY - itemY;
			const distance = Math.sqrt(dx * dx + dy * dy) || 1;

			const pupilEls = Array.from(carrotEl.querySelectorAll<HTMLElement>('.pupil'));
			pupilEls.forEach(pupilEl => {
				if (carrotEyesClosed) {
					pupilEl.style.transform = 'translate(0px, 0px)';
				} else {
					const normalizedDx = dx / distance;
					const normalizedDy = dy / distance;
					const pupilTx = normalizedDx * PUPIL_MAX_MOVE;
					const pupilTy = normalizedDy * PUPIL_MAX_MOVE;
					pupilEl.style.transform = `translate(${pupilTx}px, ${pupilTy}px)`;
				}
			});
			carrotEl.style.transform = `rotate(0deg) translateY(-50%)`;
		}

        // Cabbage Logic (Stays the same)
        const cabbageEl = cabbagebody;
        if (cabbageEl) {
            const rect = cabbageEl.getBoundingClientRect();
			const itemX = rect.left + rect.width / 2;
			const itemY = rect.top + rect.height / 2;

			const dx = targetX - itemX;
			const dy = targetY - itemY;
			const distance = Math.sqrt(dx * dx + dy * dy) || 1;

			const pupilEls = Array.from(cabbageEl.querySelectorAll<HTMLElement>('.pupil'));
			pupilEls.forEach(pupilEl => {
				if (cabbageEyesClosed) {
					pupilEl.style.transform = 'translate(0px, 0px)';
				} else {
					const normalizedDx = dx / distance;
					const normalizedDy = dy / distance;
					const pupilTx = normalizedDx * PUPIL_MAX_MOVE;
					const pupilTy = normalizedDy * PUPIL_MAX_MOVE;
					pupilEl.style.transform = `translate(${pupilTx}px, ${pupilTy}px)`;
				}
			});
            cabbageEl.style.transform = `rotate(0deg) translateY(-50%)`;
        }

		if (isLoading && cakebody) {
			const cakeEl = cakebody;
			const rect = cakeEl.getBoundingClientRect();
			const itemX = rect.left + rect.width / 2;
			const itemY = rect.top + rect.height / 2;

			const dx = targetX - itemX;
			const dy = targetY - itemY;
			const distance = Math.sqrt(dx * dx + dy * dy) || 1;

			const pupilEls = Array.from(cakeEl.querySelectorAll<HTMLElement>('.pupil'));
			pupilEls.forEach((pupilEl) => {
				const normalizedDx = dx / distance;
				const normalizedDy = dy / distance;
				const pupilTx = normalizedDx * PUPIL_MAX_MOVE;
				const pupilTy = normalizedDy * PUPIL_MAX_MOVE;
				pupilEl.style.transform = `translate(${pupilTx}px, ${pupilTy}px)`;
			});
		}

		requestAnimationFrame(animateEyesAndLean);
	}

	onMount(() => {
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('touchmove', handleMouseMove, { passive: true });
		animateEyesAndLean();

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('touchmove', handleMouseMove);
			clearTimeout(typingTimeout);
		};
	});
</script>

<section class="signup">
	{#if !isLoading}
	<div class="food-item carrot" bind:this={carrotbody} role="img" aria-hidden="true">
		<span class="emoji-body" aria-hidden="true">🥕</span>

		<div class="eye-container" aria-hidden="true">
			<div class="eye" role="presentation" class:closed={eyesClosed}> 
				<div class="pupil" role="presentation"></div>
			</div>
			<div class="eye" role="presentation" class:closed={eyesClosed}>
				<div class="pupil" role="presentation"></div>
			</div>
		</div>
        
        {#if showTelescope}
            <div class="sneaky-icon telescope" style="--telescope-duration: {TELESCOPE_TIME}ms;">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 512.001 512.001" xml:space="preserve" class="telescope-svg">
                    
                    <line x1="512" y1="256" x2="650" y2="100" class="telescope-stretch-line" stroke="#CC0000" stroke-width="8" stroke-linecap="round" />

                    <g class="telescope-stretch-parts">
                        <rect x="43.635" y="222.568" style="fill:#F15A24;" width="118.382" height="66.876"/>
                        <rect x="162.014" y="199.069" style="fill:#F15A24;" width="130.132" height="113.864"/>
                        <rect x="292.146" y="174.673" style="fill:#F15A24;" width="159.954" height="162.667"/>
                    </g>
                    <g>
                        <path style="fill:#FF931E;" d="M476.949,369.865L476.949,369.865c13.725,0,24.851-11.126,24.851-24.851V166.988
                            c0-13.725-11.126-24.851-24.851-24.851l0,0c-13.725,0-24.851,11.126-24.851,24.851v178.025
                            C452.098,358.739,463.224,369.865,476.949,369.865z"/>
                        <path style="fill:#FF931E;" d="M26.918,310.222L26.918,310.222c9.233,0,16.719-7.485,16.719-16.719v-75.005
                            c0-9.233-7.485-16.719-16.719-16.719l0,0c-9.233,0-16.719,7.485-16.719,16.719v75.005
                            C10.199,302.737,17.684,310.222,26.918,310.222z"/>
                    </g>
                    <path d="M476.949,131.938c-18.479,0-33.653,14.378-34.95,32.532H292.147c-5.632,0-10.199,4.567-10.199,10.199v14.199h-119.93
                        c-5.632,0-10.199,4.567-10.199,10.199v13.297H53.122c-2.783-11.896-13.471-20.785-26.204-20.785C12.075,191.581,0,203.656,0,218.498
                        v75.006c0,14.843,12.075,26.918,26.918,26.918c12.733,0,23.42-8.889,26.204-20.785h98.697v13.297
                        c0,5.632,4.567,10.199,10.199,10.199h119.931v14.199c0,5.632,4.567,10.199,10.199,10.199h149.853
                        c1.296,18.155,16.471,32.532,34.95,32.532c19.326,0,35.051-15.724,35.051-35.051V166.99
                        C512,147.662,496.276,131.938,476.949,131.938z M33.436,293.504c0,3.594-2.924,6.519-6.519,6.519s-6.518-2.925-6.518-6.519v-75.006
                        c0-3.594,2.924-6.519,6.519-6.519s6.519,2.924,6.519,6.519v75.006H33.436z M53.834,279.238v-46.474h97.983v46.474H53.834z
                        M172.217,209.268h109.732v93.467H172.217V209.268z M302.346,184.87h139.553v142.263H302.346V184.87z M462.298,166.99
                        c0-8.08,6.572-14.652,14.651-14.652c8.08,0,14.652,6.572,14.652,14.652v178.024c0,8.08-6.572,14.652-14.652,14.652
                        c-8.079,0-14.651-6.572-14.651-14.652V166.99z"/>
                    <path d="M321.065,193.388c-5.632,0-10.199,4.567-10.199,10.199v70.487c0,5.632,4.567,10.199,10.199,10.199
                        c5.632,0,10.199-4.567,10.199-10.199v-70.487C331.264,197.955,326.697,193.388,321.065,193.388z"/>
                    <path d="M321.065,291.89c-5.632,0-10.199,4.567-10.199,10.199v7.229c0,5.632,4.567,10.199,10.199,10.199
                        c5.632,0,10.199-4.567,10.199-10.199v-7.229C331.264,296.456,326.697,291.89,321.065,291.89z"/>
                </svg>
            </div>
        {/if}
        {#if showNotebook}
            <span class="sneaky-icon notebook" style="animation-duration: {NOTEBOOK_TIME}ms;" role="img" aria-label="Writing in a notebook">✍️</span>
        {/if}

        <div class="character-dialogue" class:visible={showPassword && showInitialDialogue}>
			I'm not looking! 🙈
		</div>
	</div>

	<div class="food-item cabbage" bind:this={cabbagebody} role="img" aria-hidden="true">
		<span class="emoji-body" aria-hidden="true">🥬</span>

		<div class="eye-container" aria-hidden="true">
			<div class="eye" role="presentation" class:closed={showPassword}>
				<div class="pupil" role="presentation"></div>
			</div>
			<div class="eye" role="presentation" class:closed={showPassword}>
				<div class="pupil" role="presentation"></div>
			</div>
		</div>

        <div class="character-dialogue" class:visible={showPassword && showInitialDialogue || carrotGotPassword}>
            {#if carrotGotPassword}
                Got the password! Time to signup! 🤫
            {:else}
                Privacy first! 🤐
            {/if}
		</div>
	</div>

	<div class="signup-card">
		<h1>🔐 Signup</h1>
		<form method="POST" id="signup-form" on:submit={handlesignup}>
			<input
				type="text"
				name="email"
				placeholder="Email Address"
				required
				class="email"
				bind:value={email}
			/>

			<div class="password-input-group">
				<input
					name="password"
					placeholder="Password"
					required
					type={showPassword ? 'text' : 'password'}
					on:focus={handlePasswordFocus}
					on:blur={handlePasswordBlur}
					on:input={handlePasswordInput}
					bind:value={password}
					aria-describedby="password-help"
				/>

				<button
					type="button"
					on:click={togglePasswordVisibility}
					on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePasswordVisibility(); } }}
					class="toggle-visibility-button"
					aria-label={showPassword ? 'Hide password' : 'Show password'}
				>
					{#if showPassword}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<path fill="none" stroke="#333" stroke-width="2" d="M10.585 13.414a2 2 0 002.828-2.828l-2.828 2.828zm.924.924a4 4 0 01-5.656-5.656M3 3l18 18M7.3 17.5A11 11 0 0012 19c5 0 9.27-3.11 11-7-1-2.18-2.88-4.21-5.11-5.74"></path>
						</svg>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
							<circle cx="12" cy="12" r="2" fill="#333"></circle>
							<path fill="none" stroke="#333" stroke-width="2" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"></path>
						</svg>
					{/if}
				</button>
			</div>

			<button type="submit">Sign Up</button>
		</form>
	</div>
	<a href="{base}/signup" class="login_switch">Already have an account? Login</a>
	{:else}
	<div class="food-item cake cake-drop" bind:this={cakebody} role="img" aria-hidden="true">
		<span class="emoji-body" aria-hidden="true">🧁</span>

		<div class="eye-container" aria-hidden="true">
			<div class="eye" role="presentation">
				<div class="pupil" role="presentation"></div>
			</div>
			<div class="eye" role="presentation">
				<div class="pupil" role="presentation"></div>
			</div>
		</div>

		<div class="character-dialogue visible cake-dialogue">
			Let's wait for you to login. But we can be calling the fire department in the meantime, you know, cause you can't cook! 🚒
		</div>
	</div>
	{/if}
</section>