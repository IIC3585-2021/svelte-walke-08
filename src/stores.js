import { writable } from "svelte/store";

export const currentMeal = writable(null);
export const favorites = writable([]);
export const selMeal = writable([]);
export const selDiet = writable([]);
export const minimo = writable(0);
export const maximo = writable(5000);
export const comentarios = writable([]);
