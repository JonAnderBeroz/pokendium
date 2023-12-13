type Region = {
	name: string;
	url: string;
};

export type RegionDetails = {
	id: number;
	name: string;
	pokedexIndex: string;
};

export async function load({ fetch }) {
	console.log('Loading regions...');
	const res: { results: Region[] } = await fetch(
		'https://pokeapi.co/api/v2/region',
	).then((res) => res.json());
	const regions: Promise<RegionDetails>[] = res.results.map(
		async ({ name, url }) => {
			const data: { id: number; pokedexes: Region[] } = await fetch(url).then(
				(res) => res.json(),
			);
			return { id: data.id, name, pokedexIndex: data.pokedexes[0].name };
		},
	);
	return { regions: await Promise.all(regions) };
}
