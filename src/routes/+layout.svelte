<slot />

<style>
	@import url('../styles/water.css');

	@font-face {
		font-family: 'Press Start 2P';
		src:
			url('../fonts/PressStart2P-Regular.woff2') format('woff2'),
			url('../fonts/PressStart2P-Regular.woff') format('woff');
	}

	:global(body) {
		font-family: 'Press Start 2P';
		font-size: 14px;
		overflow: hidden;
		image-rendering: auto;
		display: flex;
		justify-content: end;
		align-items: center;
	}

	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
</style>
