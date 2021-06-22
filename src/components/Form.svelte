<script>

    import {currentMeal, comentarios} from "../stores.js"
    import {get} from "svelte/store"
    let comment = "";
    let username = "";
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const meal = get(currentMeal);
    const submitHandler = async () => {
        const date = new Date().toLocaleDateString("en-US", options);
        const response = await fetch("http://localhost:3000/comments", {method: "POST", headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify({
            username, comment, date, mealID: meal.recipe.label.replace(/ /g, "")
        })})

        const data = await response.json();
        comentarios.update(comments => [...comments, {...data, mealID: meal.recipe.label.replace(/ /g, "")}])
        username = "";
        comment = "";
    }
</script>

<form on:submit|preventDefault={() => submitHandler()}>
    <div>
        <h4>Leave a comment</h4> <label for="message">Message</label> <textarea name="msg" id="" msg cols="30" rows="5" placeholder="Comment..." bind:value={comment}></textarea>
    </div>
    <div> <label for="name">Name</label> <input type="text" name="email" id="fullname" placeholder="Username..." bind:value={username}> </div>
    <div> <button id="post" class="btn">Post Comment</button> </div>
</form>

<style>
    form {
        padding: 0px 30px;
        border: 1px solid black;
        padding-bottom: 10px;
    }

    input[type=text] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
    }

    textarea {
        width: 100%;
        height: 150px;
        padding: 12px 20px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        resize: none;
        margin-top: 5px;
    }

    h4 {
        font-size: 125%;
    }

    button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 16px 32px;
        text-decoration: none;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 10px;
    }
</style>