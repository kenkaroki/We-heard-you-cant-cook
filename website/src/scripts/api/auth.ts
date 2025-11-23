import  app_main_base_url  from '../constants/constants';

const function_base_url: string = `${app_main_base_url}/api/authentication`

export async function login(email: string, password: string): Promise<string> {
	const url: string = `${function_base_url}/login`;
	let responseData: string = '';

	// Create the data object to send
	const data = {
		email: email,
		password: password
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				//TODO:  Add other headers as needed, e.g., Authorization tokens
			},

			body: JSON.stringify(data)
		});

		// Check if the request was successful
		if (response.status == 200) {
			responseData = "good signup";
		} else if (response.status != 200) {
			if (response.status == 400) {
				responseData = 'Fill all fields';
			} else if (response.status == 403) {
				responseData = 'Incorrect username or password';
			} else if (response.status == 404) {
				responseData = 'user not found';
			} else if (response.status == 500) {
				responseData = 'Sorry we cant log you in right now. Try again later ';
			} else {
				responseData = 'Sorry we cant log you in right now. Try again later ';
			}
		}

		return responseData;
	} catch (error) {
		// Handle network errors or errors thrown above
		console.error('Login error:', error);
		throw error;
	}
};
export async function  signup (email: string, password: string,): Promise<string>  {
	const url: string = `${function_base_url}/signup`
	let responseData: string = ""

	// Create the data object to send
	const data = {
		email: email,
		password: password
	};

	try {
		const response = await fetch(url, {
			method: 'POST', 
			headers: {
				'Content-Type': 'application/json' 
				//TODO:  Add other headers as needed, e.g., Authorization tokens
			},
			
			body: JSON.stringify(data)
		});

		// Check if the request was successful
		if (response.status === 201) {
			 responseData = 'good signup';
		}

		else if (response.status != 200 ){
			
            if (response.status == 400) {
				responseData = "Fill all fields";
			}
			else if (response.status == 403) {
				responseData = "Incorrect username or password"
			}
			else if (response.status == 404) {
				responseData = "user not found"
			}
			else if (response.status == 500) {
				responseData = "Sorry we cant log you in right now. Try again later "
			}
			else {
				responseData = "Sorry we cant log you in right now. Try again later "
			}
		}
		
		return responseData; 
	} catch (error) {
		// Handle network errors or errors thrown above
		console.error('Login error:', error);
		throw error; 
	}
};


