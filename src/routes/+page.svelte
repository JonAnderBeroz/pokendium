<script lang="ts">
	import type { RegionDetails } from './+page';

	export let data: { regions: RegionDetails[] };
</script>

<h1>POKENDIUM</h1>

<section id="regions">
	{#each data.regions as { name, pokedexIndex }}
		<a href="/region/{pokedexIndex}/1" class="region {name}">
			<img
				height="225"
				width="100%"
				src="/regions/{name}.webp"
				alt="{name} image"
			/>
			{name}</a
		>
	{/each}
</section>

<style>
	@import url('../styles/region.css');
	h1 {
		font-family: 'pokemon-solid';
		color: #fbc904;
		text-shadow:
			-5px 0 #385aa4,
			0 5px #385aa4,
			5px 0 #385aa4,
			0 -5px #385aa4;
		letter-spacing: 2rem;
		font-size: clamp(2rem, 8vw, 5rem);
		align-self: center;
	}
	#regions {
		align-self: center;
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
		max-width: 1300px;
		overflow-y: auto;
		width: 100%;
		padding: 5px;
		align-content: start;
		height: 100%;
		overflow-x: hidden;
	}

	.region {
		align-items: center;
		border-radius: 20px;
		border: 1px solid #374151;
		color: #f9f9f9;
		display: flex;
		flex-direction: column;
		font-size: 16px;
		gap: 10px;
		height: 250px;
		overflow: hidden;
		padding-bottom: 10px;
		transition: all 0.15s ease-in;
		text-transform: capitalize;
	}

	.region:hover {
		scale: 1.05;
		font-weight: 700;
		text-decoration: none;
	}
</style>
