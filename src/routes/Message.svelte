<script>
  let { message } = $props();
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import {
    faShield,
    faCrown,
    faAngleRight,
    faCircleUser,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
</script>

<li
  class="my-1 px-2 flex gap-2 flex-shrink-0 items-start w-full overflow-hidden break-all"
>
  {#if message.Role == "admin"}
    <span class="max-w-full">
      <FontAwesomeIcon icon={faCrown} class="text-md text-[#2FFF2F]" />
      <strong style="color:{message.ChatColor};">{message.username}: </strong>
      <span class="overflow-hidden text-wrap break-all">{message.Contents}</span
      >
    </span>
  {:else if message.Role == "Moderator"}
    <span class="max-w-full">
      <FontAwesomeIcon icon={faShield} class="text-md text-[#7957FF]" />
      <strong>{message.username}: </strong>
      <span class="overflow-hidden text-wrap break-all">{message.Contents}</span
      >
    </span>
  {:else if message.Role == "Highlight"}
    <span class="w-full bg-[#7DF9FF] max-w-full">
      <strong>{message.username}: </strong>
      <span class="overflow-hidden text-wrap break-all">{message.Contents}</span
      >
    </span>
  {:else}
    <span class="max-w-full">
      <strong style="color:{message.ChatColor};">{message.username}: </strong>
      <span class="overflow-hidden text-wrap break-all">{message.Contents}</span
      >
    </span>
  {/if}
</li>
