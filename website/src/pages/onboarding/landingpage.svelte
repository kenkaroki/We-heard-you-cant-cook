<script lang="ts">
import { onMount } from 'svelte';
import { base } from '$app/paths';
import { goto } from '$app/navigation';
import '../../styles/page_styles/onboarding/landingpage.css';
import { isUserLoggedIn, getUserEmail, logout } from '../../lib/utils/authchecks/authcheck';

// check login 
let userEmail: string | null = null;
let isAuth = false;

onMount(() => {
	// set auth state and then fetch email if logged in
	isAuth = isUserLoggedIn();
	if (isAuth) {
		userEmail = getUserEmail();
	}

	// Detect mobile
	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	
	// Start tracking cursor
	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('touchmove', handleMouseMove);
	document.addEventListener('keydown', handleKeydown);
	
	// Start animation loop
	animateEyesAndLean();

	return () => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('touchmove', handleMouseMove);
		document.removeEventListener('keydown', handleKeydown);
	};
});

// --- TYPES ---
type Scene = 'initial' | 'reaction' | 'offer' | 'login' | 'noAccount';

// --- SVELTE STATE ---
let currentScene: Scene = 'initial';
let isTransitioning = false;
let showDialogue = true;
let isMobile = false;

// --- DOM REFERENCES FOR EYE TRACKING ---
let carrotbody: HTMLElement;
let cabbagebody: HTMLElement;
let cakebody: HTMLElement;
// --- CURSOR TRACKING STATE ---
let targetX = 0;
let targetY = 0;

// --- CONFIG ---
const LEAN_MAX_DEG = 15;
const PUPIL_MAX_MOVE = 9;
const TRANSITION_DURATION = 600;

// --- DIALOGUE VARIATIONS ---
const dialogues = {
	initial: {
		carrot: ["I heard they can't cook.", "Word is they're kitchen-challenged.", "Rumor has it...no cooking skills!"],
		cabbage: ["Well, we'll see about that.", "Let's find out!", "Time will tell..."]
	},
	reaction: {
		carrot: ["I told you! 💰", "Called it! 💵", "Knew it! 💸"],
		cabbage: ["💸", "🤑", "💰"]
	},
	noAccount: {
		carrot: ["They really think they can cook without us? 🙄","Bold move going solo... bold move.", "Good luck cooking without our help! 🙄"],
		cabbage: ["This is gonna be interesting... 🍿", "We'll see how that goes! 😂", "Oh they're gonna need us soon enough! 🤭"]
	}
};

// Get random dialogue
function getRandomDialogue(scene: 'initial' | 'reaction' | 'noAccount', character: 'carrot' | 'cabbage'): string {
	const options = dialogues[scene][character];
	return options[Math.floor(Math.random() * options.length)];
}

let carrotDialogue = getRandomDialogue('initial', 'carrot');
let cabbageDialogue = getRandomDialogue('initial', 'cabbage');

// --- SOUND EFFECTS (Simple beep sounds using Web Audio API) ---
function playSound(frequency: number, duration: number = 100) {
	try {
		const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();
		
		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);
		
		oscillator.frequency.value = frequency;
		oscillator.type = 'sine';
		
		gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
		
		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + duration / 1000);
	} catch (e) {
		// Silently fail if Web Audio API is not supported
	}
}

// --- SCENE TRANSITIONS ---
function transitionToScene(scene: Scene) {
	if (isTransitioning) return;
	
	isTransitioning = true;
	playSound(scene === 'reaction' ? 400 : 600, 150);
	
	setTimeout(() => {
		currentScene = scene;
		isTransitioning = false;
		
		// Update dialogues for reaction scene
		if (scene === 'reaction') {
			carrotDialogue = getRandomDialogue('reaction', 'carrot');
			cabbageDialogue = getRandomDialogue('reaction', 'cabbage');
		}
	}, TRANSITION_DURATION);
}

// --- USER ACTIONS ---
function handleAgreeNoCook() {
	transitionToScene('reaction');
	setTimeout(() => transitionToScene('offer'), 1500);
}

function handleAcceptHelp() {
	showDialogue = false;
	playSound(700, 150);
	setTimeout(() => transitionToScene('login'), 300);
}

function handleLogin() {
	playSound(800, 200);
	goto(base + '/login');
}

function gotodashboard(){
    goto(base + '/dashboard')
}

function handleContinueWithout() {
	playSound(500, 200);
	isTransitioning = true;
	
	setTimeout(() => {
		// Update dialogues for the no account scene
		carrotDialogue = getRandomDialogue('noAccount', 'carrot');
		cabbageDialogue = getRandomDialogue('noAccount', 'cabbage');
		showDialogue = true;
		currentScene = 'noAccount';
		isTransitioning = false;
		
		// After 3 seconds, navigate to main page
		setTimeout(() => {
			goto(base + '/dashboard');
		}, 3000);
	}, TRANSITION_DURATION);
}

// --- KEYBOARD NAVIGATION ---
function handleKeydown(event: KeyboardEvent) {
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		const activeElement = document.activeElement as HTMLButtonElement;
		if (activeElement && activeElement.tagName === 'BUTTON') {
			activeElement.click();
		}
	}
}

// --- EYE TRACKING AND LEANING LOGIC ---
function handleMouseMove(e: MouseEvent | TouchEvent) {
	const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX || targetX;
	const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY || targetY;

	targetX = clientX;
	targetY = clientY;
}

function animateEyesAndLean() {
	// Cake/Cupcake Logic (only when logged in)
	if (isAuth && cakebody) {
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

	// skip carrot/cabbage eye animation when they are not present
	if (!carrotbody || !cabbagebody) {
		requestAnimationFrame(animateEyesAndLean);
		return;
	}

	[
		{ el: carrotbody, isUpright: true },
		{ el: cabbagebody, isUpright: true },
	].forEach(({ el, isUpright }) => {
		if (!el) return;

		const rect = el.getBoundingClientRect();
		const itemX = rect.left + rect.width / 2;
		const itemY = rect.top + rect.height / 2;

		const dx = targetX - itemX;
		const dy = targetY - itemY;
		const distance = Math.sqrt(dx * dx + dy * dy) || 1;

		// Leaning (Rotation) - only lean based on horizontal distance
		let leanDeg = 0;
		if (!isUpright && !isMobile) {
			// Only lean if cursor is reasonably close horizontally (within 300px)
			const horizontalDistance = Math.abs(dx);
			if (horizontalDistance < 300) {
				let leanFactor = Math.min(horizontalDistance / 200, 1);
				leanDeg = dx > 0 ? LEAN_MAX_DEG * leanFactor : -LEAN_MAX_DEG * leanFactor;
			}
		}

		// Preserve the scene positioning transform while adding rotation
		const currentTransform = window.getComputedStyle(el).transform;
		if (currentTransform && currentTransform !== 'none') {
			el.style.transform = `${currentTransform.replace(/rotate\([^)]*\)/, '').trim()} rotate(${leanDeg}deg)`;
		} else {
			el.style.transform = `rotate(${leanDeg}deg)`;
		}

		// Eye tracking
		const pupilEls = el.querySelectorAll<HTMLElement>('.pupil');
		pupilEls.forEach(pupilEl => {
			const normalizedDx = dx / distance;
			const normalizedDy = dy / distance;

			const pupilTx = normalizedDx * PUPIL_MAX_MOVE;
			const pupilTy = normalizedDy * PUPIL_MAX_MOVE;

			pupilEl.style.transform = `translate(${pupilTx}px, ${pupilTy}px)`;
		});
	});

	requestAnimationFrame(animateEyesAndLean);
}
</script>

<section
	class="landpage"
	class:scene-loggedin={isAuth}
	
	role="main"
	aria-label="Welcome page"
>
	{#if !isAuth}
		<!-- Carrot Character -->
		<div
			class="food-item carrot"
			bind:this={carrotbody}
			role="img"
			aria-label="Animated carrot character"
		>
			{#if showDialogue && (currentScene === 'initial' || currentScene === 'reaction' || currentScene === 'noAccount')}
				<div class="dialogue dialogue-carrot" aria-live="polite">
					{carrotDialogue}
				</div>
			{/if}
			<span class="emoji-body" aria-hidden="true">🥕</span>
			<div class="eye-container" aria-hidden="true">
				<div class="eye"><div class="pupil"></div></div>
				<div class="eye"><div class="pupil"></div></div>
			</div>
		</div>

		<!-- Cabbage Character -->
		<div
			class="food-item cabbage"
			bind:this={cabbagebody}
			role="img"
			aria-label="Animated cabbage character"
		>
			{#if showDialogue && (currentScene === 'initial' || currentScene === 'reaction' || currentScene === 'noAccount')}
				<div class="dialogue dialogue-cabbage" aria-live="polite">
					{cabbageDialogue}
				</div>
			{/if}
			<span class="emoji-body" aria-hidden="true">🥬</span>
			<div class="eye-container" aria-hidden="true">
				<div class="eye"><div class="pupil"></div></div>
				<div class="eye"><div class="pupil"></div></div>
			</div>
		</div>

		<!-- Main Content Card -->
		<div class="card-container" class:hidden={currentScene === 'noAccount'}>
			{#if currentScene === 'initial'}
				<div class="content-wrapper" class:transitioning={isTransitioning}>
					<h1>We heard you can't cook.... 🤔</h1>
					<div class="button-group">
						<button
							on:click={handleAgreeNoCook}
							disabled={isTransitioning}
							aria-label="Confirm you can't cook"
						>
							Yeah, that's true...
						</button>
					</div>
				</div>
			{/if}

			{#if currentScene === 'offer'}
				<div class="content-wrapper" class:transitioning={isTransitioning}>
					<h1>That's sad 😔</h1>
					<h2>But we can help you become a chef! 🧑‍🍳</h2>
					<div class="button-group">
						<button
							on:click={handleAcceptHelp}
							aria-label="Accept cooking help"
						>
							Yes, help me cook!
						</button>
					</div>
				</div>
			{/if}

			{#if currentScene === 'login'}
				<div class="content-wrapper" class:transitioning={isTransitioning}>
					<h1>Awesome! 🎉</h1>
					<h2>Let's get you started with an account</h2>
					<h3>It helps us personalize your cooking journey</h3>
					<div class="button-group">
						<button
							on:click={handleLogin}
							aria-label="Create account or log in"
						>
							Create Account / Log In
						</button>
						<button
							class="secondary"
							on:click={handleContinueWithout}
							aria-label="Continue without account"
						>
							Continue Without Account
						</button>
					</div>
				</div>
			{/if}

			{#if currentScene === 'noAccount'}
				<!-- Empty scene - only character dialogues visible -->
			{/if}
		</div>
	{:else}
		<!-- Logged-in: show ONLY cupcake and its dialogue -->
		<div class="food-item cupcake cake-drop" bind:this={cakebody} role="img" aria-label="Cupcake character">
			<span class="emoji-body" aria-hidden="true">🧁</span>

			<!-- Keep pupils if you'd like eye movement — they are optional; CSS hides eyes by default for logged-in layout -->
			<div class="eye-container" aria-hidden="true">
				<div class="eye" role="presentation">
					<div class="pupil" role="presentation"></div>
				</div>
				<div class="eye" role="presentation">
					<div class="pupil" role="presentation"></div>
				</div>
			</div>

			<div class="dialogue dialogue-cupcake" aria-live="polite">
				Welcome back {userEmail}. But we can be calling the fire department in the meantime, you know, cause you can't cook! 🚒
			</div>
		</div>
        <button on:click={gotodashboard} class= "continuetodashboard">Continue to dashboard</button>
	{/if}
</section>
