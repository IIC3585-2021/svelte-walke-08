<script>
  import { get } from "svelte/store";
  import { useNavigate } from "svelte-navigator";

  import Card from "../components/Card.svelte";
  import { favorites, currentMeal } from "../stores.js";

  const navigate = useNavigate();

  let favoritesMeals = get(favorites);
</script>

<div class="container">
  <h1>Favorites</h1>
  <div class="centrando">
    {#each favoritesMeals as meal}
      <Card
        onClick={() => {
          currentMeal.set(meal);
          navigate(`/meals/${meal.recipe.label.replace(/ /g, "")}`);
        }}
        image={meal.recipe.image}
        name={meal.recipe.label}
        calories={meal.recipe.calories}
      />
    {/each}
  </div>
</div>

<style>
  h1 {
    margin: 0;
    text-align: center;
    padding-top: 25px;
    font-size: 300%;
    color: #000;
  }
  .centrando {
    text-align: center;
  }
</style>
