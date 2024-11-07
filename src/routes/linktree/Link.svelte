<style global>
    @import "../../app.css";
    @import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Sora:wght@100..800&display=swap");
    * {box-sizing: border-box;user-select: none;transition: 0.2s ease all;}
</style>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script>
    let { name, url, icon, color } = $props();
</script>

<a class="w-60 {color} py-2 px-4 flex justify-start items-center gap-8 text-lg border-4 border-black shadow-custom rounded-full hover:shadow-none active:shadow-none font-regular font-sora" href="{url}" target="_blank">
    <i class="{icon} text-3xl"></i> {name}
</a>