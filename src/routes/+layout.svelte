<slot />

<style>
	@import url('../styles/water.css');

	@font-face {
		font-family: 'Press Start 2P';
		src:
			url('../fonts/PressStart2P-Regular.woff2') format('woff2'),
			url('../fonts/PressStart2P-Regular.woff') format('woff');
	}

	@font-face {
		font-family: 'pokemon-solid';
		src: url('../fonts/pokemon-solid.woff');
		font-weight: normal;
		font-style: normal;
	}

	:global(body) {
		font-family: 'Press Start 2P';
		font-size: 14px;
		overflow: hidden;
		image-rendering: auto;
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 10px;
		gap: 50px;
		justify-content: center;
		height: 100svh;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
</style>
