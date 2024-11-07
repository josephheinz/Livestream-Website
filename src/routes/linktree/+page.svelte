<script>
    import Link from "./Link.svelte";
    const links = [
        {
            name: "GitHub",
            url: "https://github.com/josephheinz",
            icon: "fa-brands fa-github",
            color: "bg-rose-500",
        },
        {
            name: "Instagram",
            url: "https://instagram.com/josephheinz26",
            icon: "fa-brands fa-instagram",
            color: "bg-sky-400",
        },
        {
            name: "YouTube",
            url: "https://youtube.com/@josephheinz",
            icon: "fa-brands fa-youtube",
            color: "bg-purple-400",
        },
        {
            name: "Ko-Fi",
            url: "https://ko-fi.com/josephheinz",
            icon: "fa-solid fa-mug-hot",
            color: "bg-orange-400",
        },
    ];
</script>
<title>Linktree - JosephHeinz.live</title>

<main class="flex justify-center items-center bg-[#FADF0B] w-screen h-screen">
    <div class="p-8 bg-[#F8D6B3] rounded-[27px] gap-4 border-4 border-black shadow-custom flex flex-col justify-evenly items-center">
        <h1 class="font-black font-sora text-3xl">Joseph Heinz</h1>
        <br><br>
        {#each links as link}
            <Link
                name={link.name}
                color={link.color}
                icon={link.icon}
                url={link.url}
            />
        {/each}
    </div>
</main>
