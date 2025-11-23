// src/scripts/utils/authUtils.ts

/**
 * Check if user is logged in
 * @returns boolean indicating if user is authenticated
 */
export function isUserLoggedIn(): boolean {
	if (typeof window === 'undefined') return false;

	const isLoggedIn = localStorage.getItem('isLoggedIn');
	const loginTimestamp = localStorage.getItem('loginTimestamp');

	// If not logged in, return false
	if (isLoggedIn !== 'true') return false;

	// Optional: Check if login is still valid (e.g., 7 days)
	if (loginTimestamp) {
		const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
		const currentTime = Date.now();
		const loginTime = parseInt(loginTimestamp);

		if (currentTime - loginTime > sevenDaysInMs) {
			// Login expired, clear storage
			logout();
			return false;
		}
	}

	return true;
}

/**
 * Get logged in user's email
 * @returns email string or null if not logged in
 */
export function getUserEmail(): string | null {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem('userEmail');
}

/**
 * Logout user by clearing stored data
 */
export function logout(): void {
	if (typeof window === 'undefined') return;

	localStorage.removeItem('isLoggedIn');
	localStorage.removeItem('userEmail');
	localStorage.removeItem('loginTimestamp');
}

/**
 * Get user data object
 * @returns object with user info or null
 */
export function getUserData(): { email: string; loginTimestamp: string } | null {
	if (!isUserLoggedIn()) return null;

	return {
		email: getUserEmail() || '',
		loginTimestamp: localStorage.getItem('loginTimestamp') || ''
	};
}
