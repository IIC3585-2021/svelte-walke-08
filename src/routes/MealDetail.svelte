<script>
  import { get } from "svelte/store";
  import { currentMeal, favorites, comentarios } from "../stores.js";
  import { useNavigate } from "svelte-navigator";
  import Comment from "../components/Comment.svelte"
  import Form from "../components/Form.svelte"
  import {onMount} from "svelte"
  export let id;

  const navigate = useNavigate();
  let meal = get(currentMeal);
  let favoritesRecipes = get(favorites);
  let isFavorite = favoritesRecipes.some(
    (recipe) => recipe.recipe.label.replace(/ /g, "") === id
  );
  favorites.subscribe((newValue) => {
    favoritesRecipes = newValue;
    isFavorite = favoritesRecipes.some(
      (recipe) => recipe.recipe.label.replace(/ /g, "") === id
    );
  });

  onMount(async () => {
    const res = await fetch("http://localhost:3000/comments");
    const data = await res.json();
    comentarios.set(data.filter(d => d.mealID === id))
    return () => {
      comentarios.set([])
    }
  })

  let mealComments = [];
  comentarios.subscribe(value => {
    mealComments = value;
  })
</script>

{#if !meal}
  <div class="container">
    <h1 id="not-found">404</h1>
  </div>
{:else}
  <div class="main2-container">
    <div class="agarrando">
      <div class="otra">
        <i class="fa fa-arrow-left back" on:click={() => navigate(-1)}/>
      </div>
      <h1 class="center inline">{meal.recipe.label}</h1>
      <div class="estrellas">
        {#if isFavorite}
          <i
            class="fa fa-star clase"
            on:click={() => {
              favorites.update((prev) =>
                prev.filter((fav) => fav.recipe.label !== meal.recipe.label)
              );
            }}
          />
        {:else}
          <i
            class="fa fa-star-o clase"
            on:click={() => {
              favorites.update((prev) => [...prev, meal]);
            }}
          />
        {/if}
      </div>
    </div>
    <img src={meal.recipe.image} alt="404" class="center" />
    <h2 class="center">HealthLabels</h2>
    {#each meal.recipe.healthLabels as label}
      <div class="label">{label}</div>
    {/each}
    <div class="los-dos">
      <div class="ingredientes">
        <h2 class="center">Ingredients</h2>
        <ul>
          {#each meal.recipe.ingredientLines as ingredient}
            <li>{ingredient}</li>
          {/each}
        </ul>
      </div>
      <div class="more-labels">
        <h2>Diet Labels</h2>
        {#each meal.recipe.dietLabels as diet}
          <div class="label">{diet}</div>
        {/each}
        <h2 class="mt">Meal Type</h2>
        {#each meal.recipe.mealType as label}
          <div class="label label2">{label}</div>
        {/each}
        <h2>Calories: {meal.recipe.calories.toFixed(2)}</h2>
      </div>
    </div>
    <h2 class="center">
      <a href={meal.recipe.url} target="_blank">Recipe here</a>
    </h2>
    <h2 class="center">Comments</h2>
    <section>
      <div class="comentarios">
        {#each mealComments as comment}
          <Comment username={comment.username} date={comment.date} comment={comment.comment} />
        {/each}
      </div>
      <div class="formulario">
        <Form />
      </div>
    </section>
  </div>
{/if}

<style>
  #not-found {
    margin: 0;
    text-align: center;
  }
  .back {
    font-size: 200%;
  }
  .back:hover {
    cursor: pointer;
  }
  .agarrando {
    display: flex;
  }
  .otra {
    flex: 1;
  }
  .inline {
    flex: 3;
  }
  .estrellas {
    flex: 1;
    text-align: right;
    margin: 15px;
  }
  .clase {
    font-size: 350%;
    color: gold;
    cursor: pointer;
  }
  .los-dos {
    display: flex;
  }
  .ingredientes {
    flex: 1;
  }
  .more-labels {
    flex: 1;
    text-align: center;
  }
  .mt {
    margin-top: 50px;
  }
  .center {
    text-align: center;
    margin: 0 auto;
    padding: 20px;
    display: block;
  }
  .main2-container {
    width: 90%;
    margin: 0 auto;
    background-color: #ccc;
    min-height: 100vh;
    font-family: "Open Sans", sans-serif;
  }
  .label {
    margin: 5px 10px;
    display: inline-block;
    border: 1px solid black;
    border-radius: 20px;
    background-color: chartreuse;
    padding: 5px 10px;
  }
  .label2 {
    background-color: rgb(247, 0, 255);
  }

  .comentarios {
    padding: 10px 40px;
    flex: 3;
    padding-top: 0;
  }

  section {
    display: flex;
    padding-bottom: 15px;
  }

  .formulario {
    flex: 1;
    margin-right: 40px;
  }
</style>
