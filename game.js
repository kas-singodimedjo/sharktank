document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("fishtank");
    const fish = document.getElementById("fish");
    const food = document.getElementById("food");

    fish.style.position = "absolute";
    fish.style.left = "50%";
    fish.style.top = "50%";
    fish.style.transform = "translate(-50%, -50%)";
    fish.style.transition = "left 3s ease-in-out, top 3s ease-in-out";

    let isMovingToFood = false;

    function moveRandomly() {
        if (isMovingToFood) return;

        const tankWidth = container.clientWidth;
        const tankHeight = container.clientHeight;
        const fishWidth = fish.clientWidth;
        const fishHeight = fish.clientHeight;

        const maxX = tankWidth - fishWidth;
        const maxY = tankHeight - fishHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        moveFish(randomX, randomY);

        const speed = Math.random() * 9000 + 500;
        setTimeout(moveRandomly, Math.random() * 5000 + 2000);
    }

    function moveFish(x, y) {
        const currentX = parseInt(fish.style.left);
        if (x < currentX) {
            fish.style.transform = "scaleX(-1)";
        } else if (x > currentX) {
            fish.style.transform = "scaleX(1)";
        }

        fish.style.left = x + "px";
        fish.style.top = y + "px";
    }

    function moveToFood() {
        isMovingToFood = true;
        const foodX = food.offsetLeft;
        const foodY = food.offsetTop;

        moveFish(foodX, foodY);

        setTimeout(() => {
            isMovingToFood = false;
            moveRandomly();
        }, 8000);
    }

    food.addEventListener("click", moveToFood);

    setTimeout(moveRandomly, 1000);

});
