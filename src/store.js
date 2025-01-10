import { writable } from "svelte/store";

export const Username = writable(undefined);
export const bannedChat = writable({
    banned: false,
    reason: "",
    expires_at: null,
    banned_by: null,
  });