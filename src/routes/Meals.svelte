<script>
  import Card from "../components/Card.svelte";
  import Filters from "../components/Filters.svelte";
  import { useNavigate } from "svelte-navigator";
  import { currentMeal, selMeal, selDiet, minimo, maximo } from "../stores.js";
  import Loader from "../components/Loader.svelte";
  import {get} from "svelte/store"
  import Form from "../components/Form.svelte";

  const navigate = useNavigate();

  let isSearching = false;
  let input = "";
  let promise = Promise.resolve([]);
  let filteredMeals = [];
  let nofilteredMeals = [];

  const searchHandler = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${input}&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}`
    );
    const res = await response.json();
    console.log(res.hits);
    filteredMeals = res.hits;
    nofilteredMeals = res.hits;
    return res.hits;
  };

  function filtrando(){
    if (selectedMeal.length > 0){
      console.log(filteredMeals)
      filteredMeals = nofilteredMeals.filter(meal => {
        for (const type of selectedMeal){
          if (meal.recipe.mealType && meal.recipe.mealType[0].toLowerCase().includes(type.toLowerCase())){
            console.log("type: ", type)
            console.log("fdsafa: ", meal.recipe.mealType[0])
            return true;
          }
        }
      })

    } else {
      filteredMeals = nofilteredMeals;
    }
    if (selectedDiet.length > 0){
      filteredMeals = filteredMeals.filter(meal => {
        for (const diet of selectedDiet){
          console.log("sdfasdf:", meal.recipe.dietLabels[0])
          console.log("name: ", diet)
          if (meal.recipe.dietLabels[0] && diet === meal.recipe.dietLabels[0].replace("-","_").toLowerCase()){
            return true;
          }
        }
      })
    }
    filteredMeals = filteredMeals.filter(meal => meal.recipe.calories >= min && meal.recipe.calories <= max);
  }

  let selectedMeal = get(selMeal)
  let selectedDiet = get(selDiet)
  let min = get(minimo)
  let max = get(maximo)

  selMeal.subscribe(value => {
    selectedMeal = value;
    filtrando();
  })
  selDiet.subscribe(value => {
    selectedDiet = value;
    filtrando();
  })
  minimo.subscribe(value => {
    min = value;
    filtrando();
  })
  maximo.subscribe(value => {
    max = value;
    filtrando()
  })

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
          {#each filteredMeals as meal}
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
