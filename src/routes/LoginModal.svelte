<script>
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faX } from "@fortawesome/free-solid-svg-icons";
  import { supabase } from "../supabase";
  import { Username } from "../store";
  import Page from "./+page.svelte";
  import { onMount } from "svelte";

  let loginModal = $state(false);
  let signUpModal = $state(false);

  export function openLoginModal() {
    loginModal = true;
    signUpModal = false;
    return true;
  }

  export function openSignUpModal() {
    loginModal = false;
    signUpModal = true;
    return true;
  }

  export function closeAll() {
    loginModal = false;
    signUpModal = false;
    return true;
  }

  let invalidCreds = $state(false);
  let passMatch = $state(false);
  let userExists = $state(false);
  let emailConfirm = $state(false);

  let email = "";
  let password = "";

  async function Login() {
    const emailDOM = document.getElementById("loginemail");
    const passwordDOM = document.getElementById("loginpassword");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      return;
    }

    if (data.session) {
      console.log("User signed in:", data.user);
      localStorage.setItem("supabaseSession", JSON.stringify(data.session));
      Username.set(data.user.user_metadata.display_name);
      closeAll();
    } else {
      console.error("No session returned after login");
    }

    return true;
  }

  async function SignUp() {
    const emailDOM = document.getElementById("signupemail");
    const passwordDOM = document.getElementById("signuppassword");
    const passwordDOM2 = document.getElementById("signuppassword2");
    const usernameDOM = document.getElementById("signupusername");
    if (passwordDOM.value !== passwordDOM2.value) {
      passMatch = true;
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: emailDOM.value,
      password: passwordDOM.value,
      options: {
        data: {
          display_name: usernameDOM.value,
        },
      },
    });
    console.log("Data: ", data);
    if (error) {
      console.error("Sign up error:", error.message);
    }
    if (data) {
      console.log(data);
      closeAll();
    }
  }
</script>

{#if loginModal}
  <div
    class="fixed w-screen h-screen top-0 left-0 bg-[rgb(56,56,56,0.75)] z-50 flex justify-center items-center"
  >
    <div
      class="relative w-11/12 bg-[#F8D6B3] border-black border-4 shadow-custom flex flex-col justify-evenly items-center gap-4 px-12 py-8
      sm:w-1/4 sm:h-3/6"
    >
      <button onclick={(loginModal = false)}>
        <FontAwesomeIcon
          icon={faX}
          class="absolute top-4 right-4 cursor-pointer"
        />
      </button>
      <h1 class="text-5xl font-black font-sora text-center">Login</h1>
      <div class="w-full flex flex-col justify-center items-center">
        <label for="email" class="font-700 font-sora color-black">Email</label>
        <br />
        <input
          name="email"
          type="Email"
          id="loginemail"
          placeholder="username@example.com"
          class="p-1 border-4 border-black bg-gray shadow-custom font-sora
          sm:w-5/6"
          bind:value={email}
        />
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <label for="password" class="font-700 font-sora color-black"
          >Password</label
        >
        <br />
        <input
          name="password"
          type="text"
          id="loginpassword"
          placeholder="username@example.com"
          class="p-1 border-4 border-black bg-gray shadow-custom font-sora
          sm:w-5/6"
          bind:value={password}
        />
      </div>
      {#if invalidCreds}
        <span class="text-red-500 font-black">Invalid Login Credentials!</span>
      {/if}
      {#if emailConfirm}
        <span class="text-red-500 font-black">Confirm your email!</span>
      {/if}
      <button
        class="py-2 px-16 border-4 border-black bg-[#FF69B4] flex justify-center items-center rounded-full font-black cursor-pointer shadow-custom active:shadow-none transition-all"
        onclick={Login}
      >
        Login
      </button>
      <span
        >Don't have an account yet? <button
          class="underline cursor-pointer"
          onclick={() => {
            signUpModal = true;
            loginModal = false;
          }}>Sign Up</button
        ></span
      >
    </div>
  </div>
{/if}
{#if signUpModal}
  <div
    class="fixed w-screen h-screen top-0 left-0 bg-[rgb(56,56,56,0.75)] z-50 flex justify-center items-center"
  >
    <div
      class="relative w-11/12 bg-[#F8D6B3] border-black border-4 shadow-custom flex flex-col justify-evenly items-center gap-4 px-12 py-8
      sm:w-1/4 sm:h-4/6"
    >
      <button onclick={(signUpModal = false)}>
        <FontAwesomeIcon
          icon={faX}
          class="absolute top-4 right-4 cursor-pointer"
        />
      </button>
      <h1 class="text-5xl font-black font-sora text-center">Sign Up</h1>
      <div class="w-full flex flex-col justify-center items-center">
        <label for="email" class="font-700 font-sora color-black">Email</label>
        <br />
        <input
          name="email"
          type="Email"
          id="signupemail"
          placeholder="username@example.com"
          class="p-1 border-4 border-black bg-gray shadow-custom font-sora
          sm:w-5/6"
        />
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <label for="Username" class="font-700 font-sora color-black"
          >Username</label
        >
        <br />
        <input
          name="username"
          type="username"
          id="signupusername"
          placeholder="Username"
          class="p-1 border-4 border-black bg-gray shadow-custom font-sora
          sm:w-5/6"
        />
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <label for="password" class="font-700 font-sora color-black"
          >Password</label
        >
        <br />
        <input
          name="password"
          type="password"
          id="signuppassword"
          placeholder="securepassword123"
          class="p-1 border-4 border-black bg-gray shadow-custom font-sora
          sm:w-5/6"
        />
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <label for="password" class="font-700 font-sora color-black"
          >Repeat Password</label
        >
        <br />
        <input
          name="password"
          type="password"
          id="signuppassword2"
          placeholder="securepassword123"
          class="p-1 border-4 border-black bg-gray shadow-custom font-sora
          sm:w-5/6"
        />
      </div>
      {#if passMatch}
        <span class="text-red-500 font-black">Passwords don't match!</span>
      {/if}
      {#if userExists}
        <span class="text-red-500 font-black">Username already exists!</span>
      {/if}
      <span class="text-xs"
        >Passwords must contain at least 8 characters, a lower and uppercase
        letter, a number, and at least one special character ( !&%? )</span
      >
      <button
        class="py-2 px-16 border-4 border-black bg-[#FF69B4] flex justify-center items-center rounded-full font-black cursor-pointer shadow-custom active:shadow-none transition-all"
        onclick={SignUp}
      >
        Sign Up
      </button>
      <span
        >Already have an account? <button
          class="underline cursor-pointer"
          onclick={() => {
            signUpModal = false;
            loginModal = true;
          }}>Login</button
        ></span
      >
    </div>
  </div>
{/if}
