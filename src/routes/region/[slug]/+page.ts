export async function load({ params }) {
	const rest = await fetch(
		`https://pokeapi.co/api/v2/pokedex/${params.slug}`,
	).then((r) => r.json());
	return rest;
}
