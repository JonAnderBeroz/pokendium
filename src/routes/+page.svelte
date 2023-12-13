<script lang="ts">
	import type { RegionDetails } from './+page';

	export let data: { regions: RegionDetails[] };
</script>

<h1>POKENDIUM</h1>

<section id="regions">
	{#each data.regions as { name, pokedexIndex }}
		<a href="/region/{pokedexIndex}" class="region">
			<img
				height="225"
				width="100%"
				src="/regions/{name}.webp"
				alt="{name} image"
			/>
			{name[0].toUpperCase()}{name.slice(1)}</a
		>
	{/each}
</section>

<style>
	h1 {
		font-family: 'pokemon-solid';
		color: #fbc904;
		text-shadow:
			-5px 0 #385aa4,
			0 5px #385aa4,
			5px 0 #385aa4,
			0 -5px #385aa4;
		letter-spacing: 0.65rem;
		font-size: 5rem;
		align-self: center;
	}
	#regions {
		align-content: center;
		align-self: center;
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
		max-width: 1300px;
		width: 100%;
		margin: auto;
	}
	.region {
		display: flex;
		flex-direction: column;
		gap: 10px;
		justify-items: center;
		align-items: center;
		transition: all 0.2s ease-in;
		font-size: 16px;
		color: #c8c6c6;
	}

	.region:hover {
		color: white;
		scale: 1.05;
		font-weight: 700;
	}

	.region img {
		border-radius: 20px;
	}
</style>
