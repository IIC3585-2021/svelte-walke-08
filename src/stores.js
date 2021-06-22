import { writable } from "svelte/store";

export const currentMeal = writable(null);
export const favorites = writable([]);
