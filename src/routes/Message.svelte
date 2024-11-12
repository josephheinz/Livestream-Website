<script>
    let { message } = $props();
</script>

<li class="mx-2 my-1 flex gap-2 items-start">
  <span>
    <strong>{message.Username}: </strong>
    <span>{message.Contents}</span>
  </span>
</li>
