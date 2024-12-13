<script>
  import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
  import { faX } from "@fortawesome/free-solid-svg-icons";
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

  let invalidCreds = $state(false);
  let passMatch = $state(false);

  async function Login() {
    const emailDOM = document.getElementById("loginemail");
    const passwordDOM = document.getElementById("loginpassword");
    fetch("http://localhost:2541/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailDOM.value,
        password: passwordDOM.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ", data);
        if (data?.error == "Invalid login credentials") {
          invalidCreds = true;
          emailDOM.value = "";
          passwordDOM.value = "";
        }
      })
      .catch((error) => console.error("Error:", error));

    return true;
  }

  async function SignUp() {
    const emailDOM = document.getElementById("signupemail");
    const passwordDOM = document.getElementById("signuppassword");
    const passwordDOM2 = document.getElementById("signuppassword2");
    if (passwordDOM.value !== passwordDOM2.value) {
      passMatch = true;
      return;
    }
    fetch("http://localhost:2541/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailDOM.value,
        password: passwordDOM.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data: ", data);
        if (data?.error == "Invalid login credentials") {
          invalidCreds = true;
          emailDOM.value = "";
          passwordDOM.value = "";
        }
        if (data.data){
          console.log(data.data);
        }
      })
      .catch((error) => console.error("Error:", error));

    return true;
  }
</script>

{#if loginModal}
  <div
    class="fixed w-screen h-screen top-0 left-0 bg-[rgb(56,56,56,0.75)] z-50 flex justify-center items-center"
  >
    <div
      class="relative w-1/4 h-3/6 bg-[#F8D6B3] border-black border-4 shadow-custom flex flex-col justify-evenly items-center gap-4 px-12 py-8"
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
          class="p-1 border-4 border-black bg-gray w-5/6 shadow-custom font-sora"
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
          class="p-1 border-4 border-black bg-gray w-5/6 shadow-custom font-sora"
        />
      </div>
      {#if invalidCreds}
        <span class="text-red-500 font-black">Invalid Login Credentials!</span>
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
      class="relative w-1/4 h-4/6 bg-[#F8D6B3] border-black border-4 shadow-custom flex flex-col justify-evenly items-center gap-4 px-12 py-8"
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
          class="p-1 border-4 border-black bg-gray w-5/6 shadow-custom font-sora"
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
          id="signuppassword"
          placeholder="username@example.com"
          class="p-1 border-4 border-black bg-gray w-5/6 shadow-custom font-sora"
        />
      </div>
      <div class="w-full flex flex-col justify-center items-center">
        <label for="password" class="font-700 font-sora color-black"
          >Repeat Password</label
        >
        <br />
        <input
          name="password"
          type="text"
          id="signuppassword2"
          placeholder="username@example.com"
          class="p-1 border-4 border-black bg-gray w-5/6 shadow-custom font-sora"
        />
      </div>
      {#if passMatch}
        <span class="text-red-500 font-black">Passwords don't match!</span>
      {/if}
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
