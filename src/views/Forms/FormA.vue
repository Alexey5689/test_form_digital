<script setup></script>
<template>
    <section class="section">
        <div class="section-header">
            <h2>Форма A</h2>
        </div>
        <div class="section-body">
            <form stop.prevent action="/form/a" class="form">
                <input type="text" placeholder="Имя" />
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="ИНН" />
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
    margin-top: 50px;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 20px;
    min-width: 500px;
    padding: 20px;
    background-color: #f3f3f3;
    border-radius: 20px;
}

input {
    width: 100%;
    height: 59px;
    border-radius: 15px;
    padding: 10px 20px;
}
button {
    padding: 10px 8px;
    border-radius: var(--border-radius-small);
    transition: var(--transition-duration);
    cursor: pointer;
    background-color: var(--color-dark);
    color: var(--color-accent);
}
button:hover {
    background-color: var(--color-accent);
    color: var(--color-dark);
}
</style>
