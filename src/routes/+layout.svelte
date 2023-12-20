<slot />

<style>
	@import url('../styles/water.css');
	@import url('../styles/fonts.css');

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
