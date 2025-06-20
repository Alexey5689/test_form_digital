<script setup></script>
<template>
    <section class="section">
        <div class="section-header">
            <h3>Форма A</h3>
        </div>
        <div class="section-body">
            <form action="/">
                <input type="text" placeholder="Имя" />
                <input type="text" placeholder="Фамилия" />
                <button type="submit">Отправить</button>
            </form>
        </div>
    </section>
</template>
<style scoped>
.section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
