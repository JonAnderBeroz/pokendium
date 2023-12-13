<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';

	export let data: {
		pokemon_entries: {
			entry_number: number;
			pokemon_species: {
				name: string;
				url: string;
			};
		}[];
	};

	const pokeAmount = data.pokemon_entries.length;

	onMount(() => {
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;

			const pokeball = document.querySelector('.pokeball');
			const index = e.key === 'ArrowDown' ? 1 : -1;

			active += index;
			if (active > pokeAmount) {
				active = 1;
			}
			if (active < 1) {
				active = pokeAmount;
			}

			pokeball?.animate(
				[
					{ transform: 'rotate(0)' },
					{ transform: `rotate(${index * 360}deg)` },
				],
				{
					duration: 300,
					iterations: 1,
				},
			);
		});
	});

	let active = 1;
	const bgs = ['#b8b0b8', '#e8e0c0', '#d0c8b8'];
	const circleBgs = ['#c0a0a0', '#e8d0b0', '#d0b8a8'];
</script>

<img
	class="pokeball"
	height="350"
	width="350"
	src="/pokeball.png"
	alt="Pokeball"
/>

<ul>
	{#each data.pokemon_entries as { entry_number, pokemon_species }}
		{@const dif = entry_number - active}
		{@const index = Math.abs(dif) % 3}
		<li
			class:active={entry_number === active}
			style="--offsetRight: calc(20px * abs({dif}));
						--offsetTop: calc(40px * {dif});
						--bg: {bgs[index]};
						--circleBg: {circleBgs[index]};
			"
		>
			{entry_number}
			{pokemon_species.name}
		</li>
	{/each}
</ul>

<style>
	.pokeball {
		align-self: center;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100vh;
		list-style: none;
		position: relative;
		width: 100%;
	}

	li {
		--active-pos: calc(50vh - 20px);
		--right-pos: 250px;
		align-items: center;
		background-color: var(--bg, #b8b0b8);
		border-radius: 200px 65px 65px 200px;
		border: 1px solid green;
		color: black;
		display: flex;
		font-weight: 700;
		height: 35px;
		justify-content: center;
		position: absolute;
		right: calc(var(--right-pos) - var(--offsetRight));
		top: calc(var(--active-pos) + var(--offsetTop));
		width: 250px;
	}
	li::before {
		background-color: var(--circleBg);
		border-radius: 50%;
		content: '';
		height: 25px;
		left: 5px;
		position: absolute;
		width: 25px;
	}

	.active {
		background-color: #f8f8c0;
		right: var(--right-pos);
		top: var(--active-pos);
	}

	.active::before {
		background-color: #f8e8b0;
	}

	.pokeball {
		position: absolute;
		right: -175px;
	}
</style>
