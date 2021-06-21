<script>
  let name = "nitro";
</script>

<div class="container">
  <h1>Soy un h1</h1>
  <div class="overlay-content">
    <form>
      <input
        type="text"
        placeholder="Search a recipe for your meal"
        name="search"
        v-model="input"
      />
      <button type="submit"><i class="fa fa-search" /></button>
    </form>
  </div>
</div>

<style>
  h1 {
    color: purple;
    margin: 0;
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
</style>
