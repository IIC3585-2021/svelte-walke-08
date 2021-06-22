<script>
    export let username;
    export let comment;
    export let date;
</script>

<div class="comment">
    <div class="title">
        <img src="https://i.imgur.com/yTFUilP.jpg" alt="" class="rounded-circle" width="40" height="40">
        <h4>{username}</h4> <span>- {date}</span>
    </div>
    <p>{comment}</p>
</div>

<style>
    .rounded-circle{
        border-radius: 20px;
    }

    .title{
        display: flex;
        align-items: center;
    }

    h4 {
        margin: 0 20px;
    }

    .comment{
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px 30px;
        margin-bottom: 20px;
    }
</style>