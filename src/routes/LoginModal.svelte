<script>
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import {
    faX 
  } from "@fortawesome/free-solid-svg-icons";
  let loginModal = $state(false);
  let signUpModal = $state(false);

  export function openLoginModal(){
    loginModal = true;
    signUpModal = false;
    return true;
  }

  export function openSignUpModal(){
    loginModal = false;
    signUpModal = true;
    return true;
  }

  async function Login(){
    const emailDOM = document.getElementById("email");
    const passwordDOM = document.getElementById("password");
    fetch('http://localhost:2541/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'securepassword',
      }),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));

    return true;
  }

  async function SignUp(){
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'securepassword',
      }),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));

    return true;
  }
</script>

{#if loginModal}
<div class="fixed w-screen h-screen top-0 left-0 bg-[rgb(56,56,56,0.75)] z-50 flex justify-center items-center">
  <div class="relative w-1/4 h-3/6 bg-[#F8D6B3] border-black border-4 shadow-custom flex flex-col justify-evenly items-center gap-4 px-12 py-8">
    <button onclick={loginModal = false}>
      <FontAwesomeIcon icon={faX} class="absolute top-4 right-4 cursor-pointer" />
    </button>
    <h1 class="text-5xl font-black font-sora text-center">Login</h1>
    <div class="w-full flex flex-col justify-center items-center">
      <label for="email" class="font-700 font-sora color-black">Email</label>
      <br>
      <input name="email" type="Email" id="email" placeholder="username@example.com" class="p-1 border-4 border-black bg-gray w-5/6 shadow-custom font-sora"/>
    </div>
    <div class="w-full flex flex-col justify-center items-center">
      <label for="password" class="font-700 font-sora color-black">Password</label>
      <br>
      <input name="password" type="text" id="password" placeholder="username@example.com" class="p-1 border-4 border-black bg-gray w-5/6 shadow-custom font-sora"/>
    </div>
    <button 
      class="py-2 px-16 border-4 border-black bg-[#FF69B4] flex justify-center items-center rounded-full font-black cursor-pointer shadow-custom active:shadow-none transition-all"
      onclick={Login}
    >
      Login
    </button>
      <span>Don't have an account yet? <button class="underline cursor-pointer" onclick={() => {signUpModal = true; loginModal = false;}}>Sign Up</button></span>
  </div>
</div> 
{/if}
{#if signUpModal}
<div class="fixed w-screen h-screen top-0 left-0 bg-[rgb(56,56,56,0.75)] z-50 flex justify-center items-center">
  <div class="relative w-1/4 h-4/6 bg-[#F8D6B3] border-black border-4 shadow-custom flex flex-col justify-evenly items-center gap-4 px-12 py-8">
    <button onclick={signUpModal = false}>
      <FontAwesomeIcon icon={faX} class="absolute top-4 right-4 cursor-pointer" />
    </button>
    <h1 class="text-5xl font-black font-sora text-center">Sign Up</h1>
    <div class="w-full flex flex-col justify-center items-center">
      <label for="email" class="font-700 font-sora color-black">Email</label>
      <br>
      <input name="email" type="Email" id="email" placeholder="username@example.com" class="p-1 border-4 border-black bg-gray w-5/6 shadow-custom font-sora"/>
    </div>
    <div class="w-full flex flex-col justify-center items-center">
      <label for="password" class="font-700 font-sora color-black">Password</label>
      <br>
      <input name="password" type="text" id="password" placeholder="username@example.com" class="p-1 border-4 border-black bg-gray w-5/6 shadow-custom font-sora"/>
    </div>
    <div class="w-full flex flex-col justify-center items-center">
      <label for="password" class="font-700 font-sora color-black">Repeat Password</label>
      <br>
      <input name="password" type="text" id="password" placeholder="username@example.com" class="p-1 border-4 border-black bg-gray w-5/6 shadow-custom font-sora"/>
    </div>
    <button 
      class="py-2 px-16 border-4 border-black bg-[#FF69B4] flex justify-center items-center rounded-full font-black cursor-pointer shadow-custom active:shadow-none transition-all"
      onclick={SignUp}
    >
      Sign Up 
    </button>
      <span>Already have an account? <button class="underline cursor-pointer" onclick={() => {signUpModal = false; loginModal = true;}}>Login</button></span>
  </div>
</div>
{/if}
