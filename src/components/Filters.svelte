<script>
  import {selMeal, selDiet, maximo, minimo} from '../stores.js'
  let diets =  [{id: 0, name: "balanced"}, {id: 1, name: "high-protein"}, {id: 2, name:"high-fiber"},
                  {id: 3, name:"low-fat"}, {id: 4, name:"low_carb"},{id: 5, name:"low_sodium"}]
  let mealType = [{id: 0, name:"lunch"}, {id: 2, name:"dinner"}, {id: 3, name:"breakfast"},{id: 3, name:"snack"}]
  let min = 500
  let max = 5000
  let selectedDiet = []
  let selectedMeal = []

  $: (() => {
    selMeal.set(selectedMeal)
    selDiet.set(selectedDiet)
    maximo.set(max)
    minimo.set(min)
    console.log("selected meal: ", selectedMeal)
  })();
</script>

<div class="container">
  <div class="row">
      <div class="col-lg-3 mb-4">
          <h1 class="mt-4">Filters</h1>

          <h3 class="mt-2">Diet Type</h3>
          {#each diets as diet}
          <div class="form-check">
            <label class="container2">
              <input type="checkbox" class="form-check-input"  bind:group={selectedDiet} value={diet.name}>
              {diet.name}
              <span class="checkmark"></span>
            </label>
          </div>
          {/each}

          <h3 class="mt-2">Calories</h3>
          <div class="form-check">
              <div>Minimum
                 <input type="range" min="0" max="5000" step="50" bind:value={min}>
                 <span>{min}</span>
              </div>
              <div>
                 Maximum
                 <input type="range" min="0" max="5000" step="50" bind:value={max}> 
                 <span>{max}</span>
              </div>  
          </div>

          <h3 class="mt-2">Meal Type</h3>
          {#each mealType as meal}
            <div class="form-check">
              <label class="container2">
                <input class="form-check-input" type="checkbox" bind:group={selectedMeal} value={meal.name}>
                {meal.name}
                <span class="checkmark"></span>
              </label>
            </div>
          {/each}
      </div>
  </div>
</div>

<style>
.container {
    text-align: left;
    margin-left: 10px;
}
/* Customize the label (the container) */
.container2 {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* Hide the browser's default radio button */
.container2 input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}
/* On mouse-over, add a grey background color */
.container2:hover input ~ .checkmark {
  background-color: #ccc;
}
/* When the radio button is checked, add a blue background */
.container2 input:checked ~ .checkmark {
  background-color: #2196F3;
}
/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
/* Show the indicator (dot/circle) when checked */
.container2 input:checked ~ .checkmark:after {
  display: block;
}
/* Style the indicator (dot/circle) */
.container2 .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
