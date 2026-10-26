<template>
  <main class="not-found">
    <p class="status">404</p>
    <h1>Page not found</h1>
    <p>The page you requested does not exist.</p>
    <RouterLink to="/">Return home</RouterLink>
  </main>
</template>

<style scoped>
.not-found {
  display: grid;
  min-height: 60vh;
  place-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
}

.status {
  color: var(--color-text);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

a {
  color: var(--color-text);
  font-weight: 600;
}
</style>
