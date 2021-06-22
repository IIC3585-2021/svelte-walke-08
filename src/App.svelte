<script>
  import { Router, Route } from "svelte-navigator";

  import Favorites from "./routes/Favorites.svelte";
  import MealDetail from "./routes/MealDetail.svelte";
  import Meals from "./routes/Meals.svelte";
  import Header from "./components/Header.svelte";

  export let url = "";
</script>

<Router {url}>
  <Header />
  <div>
    <Route path="meals/:id" component={MealDetail} />
    <Route path="favorites" component={Favorites} />
    <Route path="/"><Meals /></Route>
  </div>
</Router>
