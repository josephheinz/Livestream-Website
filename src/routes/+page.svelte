<style global>
  @import "../app.css";
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Sora:wght@100..800&display=swap');
  *{box-sizing:border-box;user-select: none;transition:0.2s ease all;}
</style>
<script>
    import VideoPlayer from '../VideoPlayer.svelte';
    import EmptyGridSquare from '../EmptyGridSquare.svelte';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
    import { faShield, faCrown, faAngleRight, faCircleUser, faUser } from "@fortawesome/free-solid-svg-icons";
    import { io } from "socket.io-client";
    import { onMount } from "svelte";

    let socket;
    let viewers = 0;
    onMount(() => {
      if (typeof window !== "undefined") {


      socket = io();
      
      socket.on("viewer-update", (view) => {
        console.log("got a viewer update")
        viewers = view;
        updateViewers(view);
      })

      //socket.on("eventFromServer", (message) => {
        //console.log(message);
      //})
      }      
    })

    $: {
      if (viewers!== undefined) {
        updateViewers(viewers);
      }
    }

    function updateViewers(amt){
      if (typeof document !== "undefined") {
        console.log(amt)
        document.getElementById("viewer-count").innerText = amt;
      }
    }
</script>
<title>JosephHeinz.live</title>
<main class="bg-[#FADF0B] w-screen grid h-screen grid-cols-custom grid-rows-custom overflow-y-scroll overflow-x-hidden">
  <EmptyGridSquare/>
  <!--Title bar-->
  <div class="border-b-4 border-r-4 border-black flex items-center justify-left p-4">
    <h1 class="text-5xl font-black font-sora">JosephHeinz.live</h1>
  </div>
  <EmptyGridSquare/>
  <EmptyGridSquare/>
  <EmptyGridSquare/>
  <div class="border-black border-r-4 border-b-4 pattern-grid-md">
    <VideoPlayer/> 
  </div>
  <div class="bg-white border-b-4 border-r-4 border-black py-2 flex flex-col-reverse items-center py-4 gap-4 font-oswald">
    <div class="w-[90%] border-black border-4 p-2 flex justify-between rounded-full shadow-custom gap-2">
      <input type="text" placeholder="Placeholder text..." class="grow focus:outline-none px-2" maxlength="200">
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
  <EmptyGridSquare/>
  <EmptyGridSquare/>
  <div class="border-r-4 border-b-4 border-black p-4 flex items-start justify-between h-full">
    <div class="flex flex-col justify-evenly items-start grow h-full">
      <h1 class="font-sora text-5xl font-black">Title</h1> 
      <h2 class="font-sora text-3xl font-light">Subtitle</h2>
    </div>
    <div class="flex flex-row gap-4 justify-evenly items-center">
      <button class="px-8 py-2 bg-[#FF69B4] border-4 border-black shadow-custom rounded-full font-oswald font-bold active:shadow-none">Subscribe</button>
      <span class="flex gap-2 w-full mx-auto my-4 items-center">
        <FontAwesomeIcon icon={faUser}/>
        <span id="viewer-count">{viewers}</span>
      </span>
    </div>
  </div>
  <EmptyGridSquare/>
  <EmptyGridSquare/>
  <EmptyGridSquare/>
  <div class="border-r-4 border-b-4 border-black flex justify-evenly items-center">
    <div class="flex flex-col w-80 h-4/6 p-8 bg-[#F8D6B3] border-black border-4 rounded-[27px] justify-evenly items-center shadow-custom aspect-[3/4] gap-4">
      <h1 class="text-5xl font-black font-sora">Donate</h1>
      <img src="Wallet_Character.svg" alt="wallet guy" class="h-3/6">
      <button class="px-6 py-3 bg-[#FF69B4] flex justify-center items-center shadow-custom border-4 border-black rounded-[27px] text-3xl font-sora font-regular active:shadow-none">Ko-Fi</button>
    </div>
    <div class="flex flex-col w-80 h-4/6 p-8 bg-[#F8D6B3] border-black border-4 rounded-[27px] justify-evenly items-center shadow-custom aspect-[3/4] gap-4">
      <h1 class="text-5xl font-black font-sora">Socials</h1>
      <img src="Phone_Character.svg" alt="wallet guy" class="h-3/6">
      <a class="px-6 py-3 bg-[#FF69B4] flex justify-center items-center shadow-custom border-4 border-black rounded-[27px] text-3xl font-sora font-regular active:shadow-none hover:shadow-none" href="/linktree">Linktree</a>
    </div>
  </div>
  <EmptyGridSquare/>
  <EmptyGridSquare/>
</main>
