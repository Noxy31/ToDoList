<template>
  <header class="HeaderComp">
    <nav>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/lists">Tasks Lists</RouterLink>
      <RouterLink to="/categories">Categories</RouterLink>
      <RouterLink to="/account">My account</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.HeaderComp {
  position: fixed;
  top: 0;
  width: 100%;
  justify-content: center;
  color: white;
  padding: 10px;
  z-index: 1000;
  background-color: #181818;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

nav {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 4vw;
}

nav a {
  margin: 0 10px;
  color: rgb(249, 253, 255);
  text-decoration: none;
  font-family: 'Switzer', sans-serif;
  font-size: 2rem;
}

body {
  margin: 0;
  padding: 0;
}

html,
body {
  scroll-behavior: smooth;
}

.scroll-fade {
  position: relative;
  z-index: 999;
  background: linear-gradient(to bottom, rgba(24, 24, 24, 1), transparent);
  height: 100px;
  pointer-events: none;
}
</style>
