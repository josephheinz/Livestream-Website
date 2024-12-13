<script>
  let { info } = $props();
</script>

<div
  class="flex flex-col w-80 h-4/6 p-8 bg-[#F8D6B3] border-black border-4 rounded-[27px] justify-evenly items-center shadow-custom aspect-[3/4] gap-4"
>
<!--  <h1 class="text-5xl font-black font-sora">Donate</h1>-->
  <img src="/{info.image.url}" alt="{info.image.alt}" class="h-3/6" />
  <a
    class="
    px-6 py-3 bg-[#FF69B4] flex justify-center items-center shadow-custom border-4 border-black rounded-[27px] text-3xl font-sora font-regular active:shadow-none
    "
    href="{info.link.url}"
    >{info.link.text}</a
  >
</div>
