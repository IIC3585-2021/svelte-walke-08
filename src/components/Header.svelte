<script>
  import { link } from "svelte-navigator";
</script>

<nav>
  <a href="/" use:link class="link">Go to Meals</a>
  <a href="/favorites" use:link class="link">Go to Favorites</a>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid black;
    height: 70px;
    background-color: rgba(255, 255, 255, 0.7);
  }

  .link {
    margin-left: 50px;
  }

  a {
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.15em;
    display: inline-block;
    padding: 15px 20px;
    position: relative;
  }
  a:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    position: absolute;
    background: #fff;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  a:hover:after {
    width: 100%;
    left: 0;
  }
</style>
