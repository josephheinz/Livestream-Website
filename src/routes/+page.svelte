<style global>
  @import "../app.css";
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Sora:wght@100..800&display=swap');
  *{box-sizing:border-box;}
</style>
<script>
    import VideoPlayer from '../VideoPlayer.svelte';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { faShield, faCrown, faAngleRight, faCircleUser, faUser } from "@fortawesome/free-solid-svg-icons";
</script>

<main class="bg-[#FADF0B] w-screen grid h-screen grid-cols-custom grid-rows-custom overflow-y-scroll overflow-x-hidden">
  <div class="border-r-4 border-b-4 border-black"></div>
  <!--Title bar-->
  <div class="border-b-4 border-r-4 border-black flex items-center justify-left p-4">
    <h1 class="text-5xl font-black font-sora">JosephHeinz.live</h1>
  </div>
  <div class="border-r-4 border-b-4 border-black"></div>
  <div class="border-r-4 border-b-4 border-black"></div>
  <div class="border-r-4 border-b-4 border-black"></div>
  <div class="border-black border-r-4 border-b-4">
    <VideoPlayer/> 
  </div>
  <div class="bg-white border-b-4 border-r-4 border-black py-2 flex flex-col-reverse items-center py-4 gap-4 font-oswald">
    <div class="w-[90%] border-black border-4 p-2 flex justify-between rounded-full shadow-custom gap-2">
      <input type="text" placeholder="Placeholder text..." class="grow">
      <button class="p-2 border-4 border-black bg-[#FF69B4] aspect-square flex justify-center items-center rounded-full font-black">
        <FontAwesomeIcon icon={faAngleRight}/>
      </button>
    </div>
    <ul id="chat-list" class="flex flex-col items-start w-full grow justify-end">
      <li class="w-full bg-[#7DF9FF] flex gap-2">
        <span class="mx-2 my-1">
          <strong>Username: </strong>
          <span>Highlighted message words chat words other</span>
        </span>
      </li>
      <li class="mx-2 my-1 flex gap-2 items-start">
        <span>
          <strong>Username: </strong>
          <span>Message contents words other words chat</span>
        </span>
      </li>
      <li class="mx-2 my-1 flex gap-2 items-start">
        <span>
          <FontAwesomeIcon icon={faShield} class="text-md text-[#7957FF]"/>
          <strong>Username: </strong>
          <span>Message contents words other words chat</span>
        </span>
      </li>
      <li class="mx-2 my-1 flex gap-2 items-start">
        <span>
          <FontAwesomeIcon icon={faCrown} class="text-md text-[#2FFF2F]"/>
          <strong>Username: </strong>
          <span>Message contents words other words chat</span>
        </span>
      </li>
    </ul>
    <div class="w-[90%] bg-[#FF69B4] border-4 border-black p-2 rounded-full shadow-custom gap-2 flex items-center">
      <FontAwesomeIcon icon={faCircleUser}/>
      <strong>Username - $5.00</strong>
    </div>
  </div>
  <div class="border-r-4 border-b-4 border-black"></div>
  <div class="border-r-4 border-b-4 border-black"></div>
  <div class="border-r-4 border-b-4 border-black p-4 flex items-start justify-between h-full">
    <div class="flex flex-col justify-evenly items-start grow h-full">
      <h1 class="font-sora text-5xl font-black">Title</h1> 
      <h2 class="font-sora text-3xl font-light">Subtitle</h2>
    </div>
    <div class="flex flex-col justify-evenly items-center">
      <button class="px-8 py-2 bg-[#FF69B4] border-4 border-black shadow-custom rounded-full font-oswald font-bold">Subscribe</button>
      <span class="flex gap-2 w-full mx-auto my-4 items-center">
        <FontAwesomeIcon icon={faUser}/>
        9,999
      </span>
    </div>
  </div>
  <div class="border-r-4 border-b-4 border-black"></div>
  <div class="border-r-4 border-b-4 border-black"></div>
</main>
