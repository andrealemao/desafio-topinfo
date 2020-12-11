// requisition get to server.js in folder API
export async function getRepositories(language) {
	const response = await fetch(`/api/repositories/${language}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})

	return await response.json()
}