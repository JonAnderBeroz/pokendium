<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data: {
		pokemon_entries: {
			entry_number: number;
			pokemon_species: {
				name: string;
				url: string;
			};
		}[];
	};

	const currentPath = $page.url.pathname;
	const regionPath = currentPath.slice(0, currentPath.lastIndexOf('/'));
	const pokeAmount = data.pokemon_entries.length;
	const bgs = ['#b8b0b8', '#e8e0c0', '#d0c8b8'];
	const circleBgs = ['#c0a0a0', '#e8d0b0', '#d0b8a8'];

	const getPokemonNumber = (index: number): number => {
		const url = new URL(data.pokemon_entries[index].pokemon_species.url);
		const path = url.pathname.slice(0, url.pathname.length - 1);
		return +path.substring(path.lastIndexOf('/') + 1);
	};

	const setPokemon = (index: number): void => {
		if (!browser) return;
		goto(`${regionPath}/${index}`, { replaceState: true });
	};

	const changePokemon = (amount: number) => {
		const pokeball = document.querySelector('.pokeball');

		active += amount;
		currentMon += amount;
		if (active > pokeAmount) {
			active = 1;
			currentMon = 0;
		}
		if (active < 1) {
			active = pokeAmount;
			currentMon = pokeAmount - 1;
		}
		pokeball?.animate(
			[{ transform: 'rotate(0)' }, { transform: `rotate(${amount * 360}deg)` }],
			{
				duration: 300,
				iterations: 1,
			},
		);
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			pNumber = getPokemonNumber(currentMon);
			setPokemon(pNumber);
		}, 200);
	};

	let currentMon = 0;
	let active = 1;
	let pNumber = getPokemonNumber(currentMon);
	let timeoutId: number = -1;

	setPokemon(pNumber);

	onMount(() => {
		const $ = (element: string) => document.querySelector(element);

		const dialog = $('#infoDialog');

		if (!(dialog instanceof HTMLDialogElement)) return;

		$('#howToButton')?.addEventListener('click', (e) => {
			e.preventDefault();
			dialog?.showModal();
		});
		$('#closeModalBtn')?.addEventListener('click', (e) => {
			e.preventDefault();
			dialog?.close();
		});
		document.addEventListener('keydown', (e: KeyboardEvent) => {
			if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
			const amount = e.key === 'ArrowDown' ? 1 : -1;

			changePokemon(amount);
		});
		document.addEventListener('wheel', (e: WheelEvent) => {
			const amount = e.deltaY > 0 ? 1 : -1;
			changePokemon(amount);
		});
	});
</script>

<section class="layout-container">
	<slot />

	<dialog id="infoDialog">
		<section class="dialog-body">
			<button id="closeModalBtn">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="icon icon-tabler icon-tabler-x"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
						d="M18 6l-12 12"
					/><path d="M6 6l12 12" /></svg
				>
			</button>
			<p class="instruction">
				Usa <img src="/up-arrow.png" alt="arrow" height="45" width="45" /> para ir
				al pokemon anterior
			</p>
			<p class="instruction">
				Usa <img src="/down-arrow.png" alt="arrow" height="45" width="45" /> para
				ir al pokemon siguiente
			</p>
		</section>
	</dialog>

	<button id="howToButton">
		Ayuda
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="icon icon-tabler icon-tabler-help-circle-filled"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			stroke-width="2"
			stroke="currentColor"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
				d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 13a1 1 0 0 0 -.993 .883l-.007 .117l.007 .127a1 1 0 0 0 1.986 0l.007 -.117l-.007 -.127a1 1 0 0 0 -.993 -.883zm1.368 -6.673a2.98 2.98 0 0 0 -3.631 .728a1 1 0 0 0 1.44 1.383l.171 -.18a.98 .98 0 0 1 1.11 -.15a1 1 0 0 1 -.34 1.886l-.232 .012a1 1 0 0 0 .111 1.994a3 3 0 0 0 1.371 -5.673z"
				stroke-width="0"
				fill="currentColor"
			/>
		</svg>
	</button>

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
				style="
						--offsetRight: calc(20px * {Math.abs(dif)});
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
</section>

<style>
	.dialog-body {
		display: flex;
		flex-direction: column;
		min-width: 350px;
		aspect-ratio: 2/1;
	}

	.instruction {
		margin: auto;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.dialog-body > button {
		background-color: transparent;
		display: flex;
		justify-content: center;
		padding: 0px;
		width: 34px;
		height: 34px;
		align-items: center;
		align-self: flex-end;
		margin-right: -20px;
		transition: all 0.2s ease-in;
		border-radius: 100%;
	}

	.dialog-body > button:focus {
		outline: 0;
		box-shadow: none;
	}

	.dialog-body > button:hover {
		background-color: #30373c;
	}

	#howToButton {
		position: absolute;
		top: 10px;
		left: 10px;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		padding-inline: 5px;
		width: 120px;
	}

	#howToButton:focus {
		outline: 0;
		box-shadow: none;
	}

	.layout-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.pokeball {
		top: calc(50% - 175px);
		image-rendering: pixelated;
	}

	ul {
		height: 100vh;
		list-style: none;
		position: relative;
		width: 50%;
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
