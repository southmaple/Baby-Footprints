<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <div class="intro">
      <h1>You did it!</h1>
      <p>Your Vue application is ready for product development.</p>
    </div>
    <TheWelcome />
  </main>
</template>

<style scoped>
.intro {
  padding: 3rem 0 1rem;
}

.intro h1 {
  color: var(--color-heading);
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 600;
  line-height: 1.1;
}

.intro p {
  margin-top: 1rem;
  max-width: 36rem;
}
</style>
