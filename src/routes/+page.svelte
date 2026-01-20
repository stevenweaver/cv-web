<script lang="ts">
	const name = "Steven Weaver";
	const title = "Senior Programming Analyst & Bioinformatics PhD";
</script>

<svelte:head>
	<title>{name} - CV</title>
</svelte:head>

<main>
	<header>
		<h1>{name}</h1>
		<p class="title">{title}</p>
	</header>

	<section>
		<h2>About</h2>
		<p>Bioinformatics researcher and software developer specializing in computational biology, data analysis, and web application development.</p>
	</section>

	<section>
		<h2>Experience</h2>
		<p>Add your experience here.</p>
	</section>

	<section>
		<h2>Education</h2>
		<p>Add your education here.</p>
	</section>

	<section>
		<h2>Skills</h2>
		<p>Add your skills here.</p>
	</section>
</main>

<style>
	main {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
		font-family: system-ui, -apple-system, sans-serif;
	}

	header {
		text-align: center;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 2px solid #333;
	}

	h1 {
		margin: 0;
		font-size: 2.5rem;
	}

	.title {
		color: #666;
		font-size: 1.2rem;
		margin-top: 0.5rem;
	}

	section {
		margin-bottom: 1.5rem;
	}

	h2 {
		color: #333;
		border-bottom: 1px solid #ddd;
		padding-bottom: 0.25rem;
	}
</style>
