<template>
  <header class="HeaderComp">
    <nav>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
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
</style>
