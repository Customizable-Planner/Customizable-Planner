<template>
    <header>
        <h1>{{ mode }} Mode</h1>
        <nav>
            <div class="nav-link">Home</div>
            <div class="nav-link">about</div>
            <div class="nav-link">Page1</div>
            <div class="nav-link">Page2</div>
        </nav>
    </header>
</template>
<script>

export default {
  props: ['mode']
}
</script>

<style>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 25px;
    height: 60px;
    background: #c3c3c3;
    /* transition: background 0.3s; */
}
.dark header {
    background: #15202B;
}
header h1 {
    font-size: 32px;
    text-transform: uppercase;
    font-weight: 900;
}

header nav {
    display: flex;
    height: 60px;
}
header nav .nav-link {
    display: flex;
    align-items: center;
    padding: 0px 15px;
}
header nav .nav-link:hover {
    background: #B0B0B0;
}
.dark header nav .nav-link:hover {
    background: #101520;
}
</style>
