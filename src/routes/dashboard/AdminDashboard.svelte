<script>
  import { onMount } from "svelte";
  import { supabase } from "../../supabase";
  import { goto } from "$app/navigation";
  import { Username } from "../../store";

  let title = $state("");
  let message = $state("");
  let isAdmin = $state(false);
  let username = $state(null);

  Username.subscribe((value) => {
    username = value;
  });

  // Restore session from localStorage
  async function getSession() {
    console.log("Attempting to get session");
    const storedSession = localStorage.getItem("supabaseSession");

    if (storedSession) {
      const session = JSON.parse(storedSession);
      console.log("Restored session from localStorage:", session);

      const { error } = await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      if (error) {
        console.error("Error restoring session:", error.message);
      } else {
        console.log("Session successfully restored in Supabase client.");
        const { data: userData } = await supabase.auth.getUser();
        Username.set(userData?.user?.user_metadata?.display_name);
      }
    } else {
      console.log("No session found in localStorage.");
    }
  }

  // Check if the user has admin role in user_roles table
  async function checkAdminRole() {
    try {
      const { data: session, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const Session = session.session;

      if (!Session || !Session.user) {
        console.error("No user session found");
        goto("/");
        return;
      }

      const userId = Session.user.id;

      // Fetch role from `user_roles`
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();
      const role = roles.role;

      if (roleError) throw roleError;

      console.log("Roles fetched:", role);

      if (roles && role === "admin") {
        isAdmin = true;
      } else {
        isAdmin = false;
        goto("/"); // Redirect if not admin
      }
    } catch (err) {
      console.error("Error in checkAdminRole:", err.message);
    }
  }

  async function fetchTitle() {
    const { data, error } = await supabase
      .from("livestream")
      .select("title")
      .single();

    if (error) {
      message = `Error fetching title: ${error.message}`;
    } else {
      title = data.title;
    }
  }

  async function updateTitle() {
    const { error } = await supabase
      .from("livestream")
      .update({ title })
      .eq("id", "02290fb5-ce8c-4f07-b73f-9d1ad5200ef5");

    if (error) {
      message = `Error updating title: ${error.message}`;
    } else {
      message = "Livestream title updated successfully!";
    }
  }

  onMount(async () => {
    await getSession();
    await checkAdminRole();
    if (isAdmin) {
      await fetchTitle();
    }
  });
</script>

{#if isAdmin}
  <div class="my-16 mx-3">
    <label for="livestream-title" class="font-sora text-3xl font-black"
      >Livestream Title:</label
    ><br /><br />
    <input
      id="livestream-title"
      type="text"
      bind:value={title}
      placeholder="Enter new title"
      class="px-2 py-1 border-4 border-black shadow-custom font-sora"
    /><br /><br />
    <button
      on:click={updateTitle}
      class="px-6 py-2 bg-[#FF69B4] border-4 border-black shadow-custom rounded-full font-oswald font-bold active:shadow-none"
      >Update Title</button
    ><br /><br />
    <p>{message}</p>
  </div>
{:else}
  <p>Loading...</p>
{/if}
