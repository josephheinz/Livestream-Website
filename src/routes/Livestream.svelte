<script>
  import { onMount } from "svelte";
  import { supabase } from "../supabase";
  let title = $state("Loading...");

  onMount(async () => {
    // Fetch the initial title
    const { data, error } = await supabase
      .from("livestream")
      .select("title")
      .single();

    if (!error) {
      title = data.title;
      console.log(data)
    }

    // Subscribe to title changes
    const subscription = supabase
      .channel("public:livestream")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "livestream" },
        (payload) => {
          title = payload.new.title; // Update title in real-time
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  });
</script>

<h1 class="font-sora text-3xl font-black">{title}</h1>
