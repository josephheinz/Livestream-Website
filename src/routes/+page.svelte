<script>
  import VideoPlayer from "./VideoPlayer.svelte";
  import EmptyGridSquare from "./EmptyGridSquare.svelte";
  import Message from "./Message.svelte";
  import SubscribeButton from "./SubscribeButton.svelte";
  import LoginModal from "./LoginModal.svelte";
  import ChatToast from "./ChatToast.svelte";
  import StreamInfoBox from "./StreamInfoBox.svelte";
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import {
    faShield,
    faCrown,
    faAngleRight,
  } from "@fortawesome/free-solid-svg-icons";
  import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
  import { io } from "socket.io-client";
  import { onMount } from "svelte";
  import { Username } from "../store";

  let username = $state(null);

  Username.subscribe((value) => {
    username = value;
  });

  let loginModal;
  let chatList;

  let messages = $state([]);
  function addMessage(message) {
    try {
      messages.push(message);
    } catch (err) {
      throw err;
    }
  }

  let socket;
  let viewers = $state(0);

  async function getAuthenticatedUser(session) {
    // Restore session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

    if (sessionError) {
      console.error("Failed to restore session:", sessionError.message);
      return null;
    }

    // Fetch authenticated user

    if (userError) {
      console.error("Failed to fetch user:", userError.message);
      return null;
    }

    return userData?.user ?? null;
  }

  onMount(async () => {
    if (typeof window !== "undefined") {
      socket = io();

      socket.on("viewer-update", (view) => {
        console.log("got a viewer update");
        viewers = view;
        updateViewers(view);
      });

      socket.on("message", (message) => {
        addMessage(message);
      });
      console.log("Attempting to get session");
      const storedSession = localStorage.getItem("supabaseSession");

      if (storedSession) {
        const session = JSON.parse(storedSession);
        console.log("Restored session from localStorage:", session);
        Username.set(session.user.user_metadata.display_name);

        const { error } = await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });

        if (error) {
          console.error("Error restoring session:", error.message);
        } else {
          console.log("Session successfully restored in Supabase client.");
        }
      } else {
        console.log("No session found in localStorage.");
      }
    }
  });

  function updateViewers(amt) {
    if (typeof document !== "undefined") {
      console.log(amt);
      document.getElementById("viewer-count").innerText = amt;
    }
  }

  function enterChatMessage(event) {
    switch (event.key) {
      case "Enter":
        sendMessage();
    }
  }

  const chatColor = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
  const chatRole = "Viewer";
  function sendMessage() {
    const inputDOM = document.getElementById("chat-input");
    let message = {
      username: username,
      Contents: inputDOM.value,
      Role: chatRole,
      ChatColor: chatColor,
    };
    console.log(message, message.username);
    if (message.Contents.trim() === "") {
      throw new Error("Message contents cannot be empty");
    }
    socket.emit("message", message);
    inputDOM.value = "";
  }
  $effect(() => {
    // Check if messages have been updated
    if (messages.length > 0) {
      chatList.scrollTop = chatList.scrollHeight;
    }
  });
</script>

<title>JosephHeinz.live</title>
<main
  class="bg-[#FADF0B] w-screen grid h-screen grid-cols-custom grid-rows-custom overflow-y-scroll overflow-x-hidden"
>
  <EmptyGridSquare />
  <!--Title bar-->
  <div
    class="border-b-4 border-r-4 border-black flex items-center justify-left p-4"
  >
    <h1 class="text-5xl font-black font-sora">JosephHeinz.live</h1>
  </div>
  <EmptyGridSquare>
    {#if username}
      <div class="w-full h-full flex justify-end items-start p-4 gap-2">
        <span class="text-md font-700 font-sora text-right">
          {username}
          <br />
          {chatRole}
        </span>
        <FontAwesomeIcon icon={faCircleUser} class="text-5xl" />
      </div>
    {:else}
      <div class="w-full h-3/6 flex justify-left items-start py-2 px-4 gap-4">
        <button class="underline" onclick={loginModal.openLoginModal}
          >Login</button
        >
        <button class="underline" onclick={loginModal.openSignUpModal}
          >Sign Up</button
        >
      </div>
      {username}
    {/if}
  </EmptyGridSquare>
  <EmptyGridSquare />
  <EmptyGridSquare />
  <EmptyGridSquare>
    <VideoPlayer />
  </EmptyGridSquare>
  <div
    class="relative bg-white border-b-4 border-r-4 border-black flex flex-col items-center py-4 gap-4 font-oswald"
  >
    <!--wrapper for toasts-->
    <ChatToast />
    <div class="h-4/5 max-h-4/5 overflow-y-hidden w-full relative">
      <ul
        id="chat-list"
        class="absolute bottom-0 flex flex-col items-end w-full h-full overflow-y-scroll"
        bind:this={chatList}
      >
        {#each messages as message1}
          <Message message={message1} />
        {/each}
      </ul>
    </div>
    <!--wrapper for chat input-->
    <div class="h-1/10 w-full flex justify-center items-center">
      <div
        class="w-[90%] border-black border-4 p-2 flex justify-between shadow-custom gap-2"
      >
        <input
          type="text"
          placeholder="Placeholder text..."
          class="grow outline-none focus:outline-none px-2"
          maxlength="200"
          id="chat-input"
          onkeyup={enterChatMessage}
        />
        <button
          onclick={sendMessage}
          class="p-2 border-4 border-black bg-[#FF69B4] aspect-square flex justify-center items-center rounded-full font-black cursor-pointer"
        >
          <FontAwesomeIcon icon={faAngleRight} id="chat-button" />
        </button>
      </div>
    </div>
  </div>
  <EmptyGridSquare />
  <EmptyGridSquare />
  <div
    class="border-r-4 border-b-4 border-black p-4 flex items-start justify-between h-full"
  >
    <div class="flex flex-col justify-evenly items-start grow h-full">
      <h1 class="font-sora text-5xl font-black">Title</h1>
      <h2 class="font-sora text-3xl font-light">Subtitle</h2>
    </div>
    <div class="flex flex-col gap-2 justify-evenly items-center">
      <SubscribeButton />
      <span
        class="flex gap-2 w-full mx-auto my-4 justify-center items-center h-full"
      >
        <FontAwesomeIcon icon={faCircleUser} class="text-xl" />
        <span>
          <span id="viewer-count">{viewers} </span>
          <span>
            {#if viewers > 1}viewers{:else}viewer{/if}</span
          >
        </span>
      </span>
    </div>
  </div>
  <EmptyGridSquare />
  <EmptyGridSquare />
  <EmptyGridSquare />
  <div
    class="border-r-4 border-b-4 border-black flex justify-evenly items-center"
  >
    <StreamInfoBox
      info={{
        image: { url: "Wallet_Character.svg", alt: "Wallet Character" },
        link: { text: "Ko-Fi", url: "https://kofi.com/" },
      }}
    />
    <StreamInfoBox
      info={{
        image: { url: "Phone_Character.svg", alt: "Phone Character" },
        link: { text: "Linktree", url: "/linktree" },
      }}
    />
  </div>
  <EmptyGridSquare />
  <EmptyGridSquare />
  <LoginModal bind:this={loginModal} />
</main>

<style global>
  @import "../app.css";
  @import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Sora:wght@100..800&display=swap");
  * {
    box-sizing: border-box;
    transition: 0.2s ease all;
  }
  *.overflow-scroll {
  }
</style>
