<script>
  import AdminDashboard from "./AdminDashboard.svelte";
  import { supabase } from "../../supabase";
  import EmptyGridSquare from "../EmptyGridSquare.svelte";
</script>

<title>JosephHeinz.live Admin Dashboard</title>
<main
  class="bg-[#FADF0B] w-screen grid h-screen grid-cols-custom grid-rows-custom overflow-y-hidden overflow-x-hidden"
>
  <EmptyGridSquare />
  <EmptyGridSquare />
  <EmptyGridSquare />
  <EmptyGridSquare />
  <EmptyGridSquare />
  <EmptyGridSquare>
    <AdminDashboard />
  </EmptyGridSquare>
  <EmptyGridSquare />
  <EmptyGridSquare />
  <EmptyGridSquare />
  <EmptyGridSquare
    ><h1 class="font-sora text-5xl font-black m-8">
      Admin Dashboard
    </h1></EmptyGridSquare
  >
  <EmptyGridSquare />
  <EmptyGridSquare />
</main>

<style global>
  @import "../../app.css";
  @import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Sora:wght@100..800&display=swap");
  * {
    box-sizing: border-box;
    transition: 0.2s ease all;
  }
  *.overflow-scroll {
  }
</style>
