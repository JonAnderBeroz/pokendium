<script lang="ts">
	export let data: {
		id: number;
		name: string;
		sprites: {
			front_default: string;
		};
		types: {
			type: {
				name: string;
			};
		}[];
	};
</script>

<section class="pokemon">
	<img
		src={data.sprites.front_default}
		alt="{data.name} image"
		height="500"
		width="500"
	/>
	<article class="types">
		{#each data.types as { type: { name } }}
			<span class="type {name}">{name}</span>
		{/each}
	</article>
</section>

<style>
	@import url('../../../../styles/types.css');

	.pokemon {
		align-items: center;
		display: flex;
		flex-direction: column;
		image-rendering: pixelated;
		width: 100%;
	}

	.types {
		display: flex;
		gap: 1rem;
		justify-content: center;
		text-align: center;
	}

	.type {
		font-weight: 600;
		font-size: 18px;
		-moz-box-shadow: inset 0px 0px 1.5px 1.5px rgba(255, 255, 255, 1);
		-webkit-box-shadow: inset 0px 0px 1.5px 1.5px rgba(255, 255, 255, 1);
		background-color: black;
		border-radius: 50px;
		border: 1px solid black;
		box-shadow: inset 0px 0px 1.5px 1.5px rgba(255, 255, 255, 1);
		padding-top: 8px;
		padding-bottom: 4px;
		padding-inline: 5px;
		text-shadow:
			-1px -1px 0 #000,
			-1px 1px 0 #000,
			1px -1px 0 #000,
			1px 1px 0 #000;
		text-transform: uppercase;
		width: 160px;
	}
</style>
