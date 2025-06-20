<script setup></script>
<template>
    <header class="header container">
        <h1>Тестовое задание Digital</h1>
        <nav class="menu">
            <ul class="menu-list">
                <li class="menu-item" :class="{ active: $route.path === '/form-a' }">
                    <router-link to="/form-a">Форма A</router-link>
                </li>
                <li class="menu-item" :class="{ active: $route.path === '/form-b' }">
                    <router-link to="/form-b">Форма B</router-link>
                </li>
            </ul>
        </nav>
    </header>
    <main class="content">
        <router-view></router-view>
    </main>
</template>
