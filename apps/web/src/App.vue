<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink class="brand" to="/" aria-label="Baby Footprints home">
      <img alt="" class="logo" src="@/assets/logo.svg" width="44" height="44" />
      <span>Baby Footprints</span>
    </RouterLink>

    <nav aria-label="Primary navigation">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-border);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-heading);
  font-weight: 600;
}

.brand:hover {
  background: transparent;
}

.logo {
  display: block;
  width: 44px;
  height: 44px;
}

nav {
  display: flex;
  gap: 0.25rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  font-weight: 600;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0.5rem 0.75rem;
}
</style>
