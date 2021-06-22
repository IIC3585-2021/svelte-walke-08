<script>
  export let name;
  export let calories;
  export let image;
  export let onClick;
</script>

<div class="card tarjetas" on:click={onClick}>
  <img src={image} alt={name} />
  <div class="meal-name">
    <p>{name.toUpperCase()}</p>
    <p>{calories.toFixed(2)} cals</p>
  </div>
</div>

<style>
  .card {
    color: #000;
    height: 330px;
    width: 300px;
    border-radius: 5px;
    overflow: hidden;
    background-color: #eee;
    border: 1px solid rgba(0, 100, 200, 0.3);
    margin: 15px;
    box-shadow: 4px 2px 3px 2px rgba(0, 0, 0, 0.3);
  }
  .card:hover {
    border: 2px solid rgb(0, 100, 200);
    cursor: pointer;
  }
  .card img {
    height: 230px;
    width: 100%;
    margin: 0;
  }
  .meal-name {
    height: 80px;
    width: 100%;
    margin-top: 0;
    font-size: 16px;
  }
  p {
    padding-left: 5px;
    padding-right: 5px;
    text-align: center;
  }
  .tarjetas {
    display: inline-block;
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
