export async function load({ fetch, params }) {
	const rest = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${params.slug}`,
	).then((r) => r.json());
	return rest;
}
