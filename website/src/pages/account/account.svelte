<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { isUserLoggedIn, getUserEmail, logout } from '../../lib/utils/authchecks/authcheck';

	let userEmail: string | null = null;
	let isLoading = true;
	let loginDate: string = '';

	onMount(() => {
		// Check if user is logged in
		if (!isUserLoggedIn()) {
			// Redirect to login if not authenticated
			goto(base + '/login');
			return;
		}

		// Get user data
		userEmail = getUserEmail();
		
		// Format login date
		const timestamp = localStorage.getItem('loginTimestamp');
		if (timestamp) {
			const date = new Date(parseInt(timestamp));
			loginDate = date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit'
			});
		}

		isLoading = false;
	});

	function handleLogout() {
		logout();
		goto(base + '/login');
	}

	function goToDashboard() {
		goto(base + '/dashboard');
	}
</script>

<svelte:head>
	<title>My Account</title>
</svelte:head>

{#if !isLoading}
<section class="account-page">
	<div class="account-container">
		<div class="account-header">
			<h1>👤 My Account</h1>
			<button class="back-button" on:click={goToDashboard}>
				← Back to Dashboard
			</button>
		</div>

		<div class="account-card">
			<div class="profile-section">
				<div class="avatar">
					{userEmail ? userEmail.charAt(0).toUpperCase() : '?'}
				</div>
				<h2>Account Information</h2>
			</div>

			<div class="info-section">
				<div class="info-row">
					<span class="info-label">📧 Email Address</span>
					<span class="info-value">{userEmail || 'Not available'}</span>
				</div>

				<div class="info-row">
					<span class="info-label">🔐 Login Status</span>
					<span class="info-value status-active">Active</span>
				</div>

				<div class="info-row">
					<span class="info-label">📅 Last Login</span>
					<span class="info-value">{loginDate || 'Unknown'}</span>
				</div>
			</div>

			<div class="actions-section">
				<button class="logout-button" on:click={handleLogout}>
					🚪 Logout
				</button>
			</div>
		</div>

		<div class="info-card">
			<h3>ℹ️ Account Features</h3>
			<ul>
				<li>✅ Access to all dashboard features</li>
				<li>✅ Secure session management</li>
				<li>✅ 7-day automatic login</li>
				<li>✅ Easy logout option</li>
			</ul>
		</div>
	</div>
</section>
{:else}
<section class="account-page">
	<div class="loading-container">
		<div class="spinner"></div>
		<p>Loading account information...</p>
	</div>
</section>
{/if}

<style>
	.account-page {
		min-height: 100vh;
		background-color: #8b6f2f;
		padding: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.account-container {
		max-width: 600px;
		width: 100%;
	}

	.account-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.account-header h1 {
		color: #fdfcfa;
		font-size: 2rem;
		margin: 0;
	}

	.back-button {
		background: rgba(255, 255, 255, 0.2);
		color: #fdfcfa;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.9rem;
		transition: background 0.3s ease;
	}

	.back-button:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.account-card {
		background: white;
		border-radius: 20px;
		padding: 2rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
		margin-bottom: 1.5rem;
	}

	.profile-section {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 2rem;
		border-bottom: 2px solid #f0f0f0;
	}

	.avatar {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: linear-gradient(135deg, #8b6f2f 0%, #6d561f 100%);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: bold;
		margin: 0 auto 1rem;
		box-shadow: 0 4px 12px rgba(139, 111, 47, 0.3);
	}

	.profile-section h2 {
		color: #333;
		font-size: 1.5rem;
		margin: 0;
	}

	.info-section {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin-bottom: 2rem;
	}

	.info-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 10px;
	}

	.info-label {
		font-weight: 600;
		color: #555;
		font-size: 0.95rem;
	}

	.info-value {
		color: #333;
		font-weight: 500;
		text-align: right;
		max-width: 60%;
		word-wrap: break-word;
	}

	.status-active {
		color: #28a745;
		font-weight: 600;
	}

	.actions-section {
		display: flex;
		justify-content: center;
		padding-top: 1rem;
		border-top: 2px solid #f0f0f0;
	}

	.logout-button {
		background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
		color: white;
		border: none;
		padding: 0.875rem 2rem;
		border-radius: 10px;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
	}

	.logout-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
	}

	.logout-button:active {
		transform: scale(0.98);
	}

	.info-card {
		background: white;
		border-radius: 20px;
		padding: 1.5rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
	}

	.info-card h3 {
		color: #333;
		font-size: 1.25rem;
		margin: 0 0 1rem 0;
	}

	.info-card ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.info-card li {
		color: #555;
		padding: 0.5rem 0;
		font-size: 0.95rem;
	}

	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem;
		background: white;
		border-radius: 20px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #8b6f2f;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.loading-container p {
		color: #333;
		margin: 0;
	}

	/* Mobile responsiveness */
	@media (max-width: 768px) {
		.account-page {
			padding: 1rem;
		}

		.account-header {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.account-header h1 {
			font-size: 1.5rem;
		}

		.info-row {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.5rem;
		}

		.info-value {
			text-align: left;
			max-width: 100%;
		}
	}
</style>