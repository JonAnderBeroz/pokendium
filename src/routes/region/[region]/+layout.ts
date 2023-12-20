export async function load({ fetch, params }) {
	const rest = await fetch(
		`https://pokeapi.co/api/v2/pokedex/${params.region}`,
	).then((r) => r.json());
	return rest;
}
