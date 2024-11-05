<style global>
  @import "../app.css";
</style>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<link href="https://vjs.zencdn.net/7.17.0/video-js.css" rel="stylesheet" />
<video
  id="live-stream"
  class="video-js vjs-default-skin"
  controls
  preload="auto"
  data-setup="{'autoplay'}"
>
  <source
    src="https://stream.josephheinz.live/hls/zebra.m3u8"
    type="application/vnd.apple.mpegurl"
  >
</video>
<script src="https://vjs.zencdn.net/7.17.0/video.min.js"></script>
