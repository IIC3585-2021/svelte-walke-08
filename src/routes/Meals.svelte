<script>
  import Card from "../components/Card.svelte";
  import Filters from "../components/Filters.svelte";
  import { useNavigate } from "svelte-navigator";
  import { currentMeal } from "../stores.js";
  import Loader from "../components/Loader.svelte";

  const navigate = useNavigate();

  let isSearching = false;
  let input = "";
  let promise = Promise.resolve([]);

  const searchHandler = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${input}&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`
    );
    const res = await response.json();
    console.log(res.hits);
    return res.hits;
  };
</script>

<div class="container main-container">
  {#if isSearching}
    <div class="filter">
      <Filters />
    </div>
  {/if}
  <div class="no-main-container">
    {#if !isSearching}
      <div class="overlay-content">
        <form
          on:submit|preventDefault={() => {
            isSearching = true;
            promise = searchHandler();
          }}
        >
          <input
            type="text"
            placeholder="Search a recipe for your meal"
            name="search"
            bind:value={input}
          />
          <button><i class="fa fa-search" /></button>
        </form>
      </div>
    {:else}
      <div class="overlay-content2">
        <form
          on:submit|preventDefault={() => {
            isSearching = true;
            promise = searchHandler();
          }}
        >
          <input
            type="text"
            placeholder="Search a recipe for your meal"
            name="search"
            bind:value={input}
          />
          <button type="submit"><i class="fa fa-search" /></button>
        </form>
      </div>
      {#await promise}
        <Loader />
      {:then data}
        <div class="centrando">
          {#each data as meal}
            <Card
              onClick={() => {
                console.log(meal.recipe.label);
                currentMeal.set(meal);
                navigate(`meals/${meal.recipe.label.replace(/ /g, "")}`);
              }}
              image={meal.recipe.image}
              name={meal.recipe.label}
              calories={meal.recipe.calories}
            />
          {/each}
        </div>
      {/await}
    {/if}
  </div>
</div>

<style>
  .main-container {
    display: flex;
  }
  .no-main-container {
    flex: 5;
  }
  .filter {
    flex: 1;
    border-right: 3px solid black;
    background-color: #ccc;
  }
  .centrando {
    text-align: center;
  }
  .overlay-content {
    display: grid;
    place-items: center;
    width: 100%;
    height: 70vh;
  }
  .overlay-content input[type="text"] {
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 15px;
    font-size: 17px;
    background: white;
    border-radius: 5px;
    width: 500px;
  }
  .overlay-content input[type="text"]:hover {
    background: #f1f1f1;
  }
  .overlay-content input[type="text"]:focus {
    border: none;
  }
  .overlay-content button {
    padding: 15px;
    background: #f5f5f5;
    font-size: 17px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    width: 80px;
    margin-left: 4px;
  }
  .overlay-content button:hover {
    background: #bbb;
  }
  .overlay-content2 {
    display: grid;
    place-items: center;
    width: 100%;
    margin: 10px 0;
  }
  .overlay-content2 input[type="text"] {
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 15px;
    font-size: 17px;
    background: white;
    border-radius: 5px;
    width: 500px;
  }
  .overlay-content2 input[type="text"]:hover {
    background: #f1f1f1;
  }
  .overlay-content2 input[type="text"]:focus {
    border: none;
  }
  .overlay-content2 button {
    padding: 15px;
    background: #ddd;
    font-size: 17px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    width: 80px;
    margin-left: 4px;
  }
  .overlay-content2 button:hover {
    background: #bbb;
  }
</style>
