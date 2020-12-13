// requisition get to server.js in folder API
export async function getRepositories(data) {
	const response = await fetch(`/api/repositories/${data.language}/${data.page}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})

	return await response.json()
}