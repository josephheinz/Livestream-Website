<script>
    import 'video.js/dist/video-js.css';
    import videojs from 'video.js';
    import { onMount } from 'svelte';

    let player;
    const videoSrc = 'https://stream.josephheinz.live/hls/zebra.m3u8';

    onMount(() => {
        // Initialize Video.js player
        player = videojs('my-video', {
            controls: true,
            autoplay: false,
            preload: 'auto',
        });

        // Load the video source
        player.src({ src: videoSrc, type: 'application/x-mpegURL' });

        // Clean up on component destroy
        return () => {
            if (player) {
                player.dispose();
            }
        };
    });
</script>

<video
    id="my-video"
    class="video-js vjs-default-skin h-full w-full"
    controls
    preload="auto"
    width="640"
    height="264">
    <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
    </p>
</video>

<style global>
    @import "../app.css"; 
</style>

