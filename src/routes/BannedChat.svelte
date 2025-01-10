<script>
  import { bannedChat } from "../store";
  const d = new Date($bannedChat.expires_at);
  const endsTime = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
</script>

{#if $bannedChat.banned}
  <div
    class="w-full h-full absolute z-10 top-0 left-0 flex flex-col justify-center items-center gap-4 bg-orange-200"
  >
    <img src="Bomb_Character.svg" alt="Bomb guy" class="w-3/4" />
    <h1 class="text-3xl">You are banned</h1>
    <span>You have been banned from chat</span>
    <span>For <b>{$bannedChat.reason}</b></span>
    {#if $bannedChat.expires_at}
      <span>Ban ends: {endsTime}</span>
    {:else}
      <span>Banned indefinitely</span>
    {/if}
    <button
      class="py-2 px-8 border-4 border-black bg-[#FF69B4] flex justify-center items-center rounded-full font-medium cursor-pointer shadow-custom active:shadow-none transition-all"
    >
      Request Unban
    </button>
  </div>
{/if}
