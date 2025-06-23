<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/">
        <img src="/src/assets/Black & White Minimalist Business Logo.png" alt="Logo" class="logo" />
      </router-link>
    </div>

    <div class="nav-center">
      <router-link to="/rent" class="nav-link">Movies</router-link>
    </div>

    <div class="nav-right">
      <router-link to="/clientDashboard" class="nav-link">
        Historial
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7845a0"
          class="bi bi-person-fill" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
        </svg>
      </router-link>
    </div>
  </nav>
</template>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.nav-left,
.nav-center,
.nav-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-left {
  justify-content: flex-start;
}

.nav-right {
  justify-content: flex-end;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

</style>