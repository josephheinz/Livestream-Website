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

<li class="my-1 px-2 flex gap-2 items-start w-full overflow-hidden text-wrap">
  {#if message.Role == "Owner"}
    <span class="max-w-full">
      <FontAwesomeIcon icon={faCrown} class="text-md text-[#2FFF2F]" />
      <strong>{message.Username}: </strong>
      <span>{message.Contents}</span>
    </span>
  {:else if message.Role == "Moderator"}
    <span class="max-w-full">
      <FontAwesomeIcon icon={faShield} class="text-md text-[#7957FF]" />
      <strong>{message.Username}: </strong>
      <span>{message.Contents}</span>
    </span>
  {:else if message.Role == "Highlight"}
    <span class="w-full bg-[#7DF9FF] max-w-full">
      <strong>{message.Username}: </strong>
      <span>{message.Contents}</span>
    </span>
  {:else}
    <span class="max-w-full">
      <strong>{message.Username}: </strong>
      <span class="overflow-hidden text-wrap">{message.Contents}</span>
    </span>
  {/if}
</li>
