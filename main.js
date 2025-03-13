const canvas = document.getElementById('dinocanva');
const ctx = canvas.getContext('2d');
const box=20;
let snake=[{x:10,y:10}];
let direction = 'right';
let food={};
let speed= 150;
let comidaconsumida=0;
function drawSnake(){
    ctx.fillStyle= '#6d7c2f';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * box, segment.y * box, box ,box);
        ctx.strokeStyle ='pink';
        ctx.strokeRect(segment.x * box, segment.y * box, box ,box);
    });
}
function foodposition( ){
    let newfoodx,newfoody;
    do{
newfoodx=Math.floor(Math.random()*(canvas.width/box));
newfoody=Math.floor(Math.random()*(canvas.height/box));
    }while(snake.some(segment=> segment.x ===newfoodx&&segment.y ===newfoody));
    return {x:newfoodx,y:newfoody};
}
function drawfood() {
    ctx.fillStyle='red';
    ctx.fillRect(food.x * box,food.y  *  box,box,box);
}
function moveSnake() {
    const head = {x: snake[0].x, y: snake[0].y};
    switch (direction){
        case 'up': 
        head.y--;
        break;
        case 'down': 
        head.y++;
        break; 
        case 'left': 
        head.x--;
        break;
         case 'right': 
        head.x++;
        break;

    }
    if (head.x===food.x && head.y===food.y) {
        food=foodposition();
        comidaconsumida++;
        if (comidaconsumida%5===0) {
            speed*=0.8;
            clearInterval(game);
            game=setInterval(gameLoop,speed);

        }
    }
    else {
        snake.pop();
    }
 snake.unshift(head) ;
 if(head.x<0||head.x>=canvas.width/box ||head.y<0||head.y>=canvas.height/box ) {
    clearInterval(game);
    alert('game over voce colidiu com borda');
    return;
 }
 if(snake.slice(1).some(segment=> segment.x ===head.x&&segment.y ===head.y)) {
    clearInterval(game);
    alert('game over voce colidiu com seu corpo');
    return;
 }
}
function drawscore() {
    ctx.fillStyle =  'black';
    ctx.font='28px Arial';
    ctx.fillText=('score:$(comidacosumida)',10,30);
}
function drawBoard () {
    ctx.clearRect(0,0,canvas.clientWidth, canvas.height);
    for(let i=0;i<canvas.width/box;i++){
        for(let j=0;j<canvas.height/box;j++){
            ctx.fillStyle=(i+j)%2===0?'#f6e0f4':'#98d697';
            ctx.fillRect(i*box,j*box,box,box);
        }
    }
}
function gameLoop(){
    drawBoard();
    drawSnake();
    moveSnake();
    drawfood();
    drawscore();
}
food=foodposition();
let game =setInterval(gameLoop,150);
document.addEventListener('keydown', e=>{
    switch(e.key){
        case 'w':
            direction='up';
            console.log("para cima");
            break;
            case 's':
                direction='down';
                console.log("para baixo");
                break;
                case 'a':
            direction='left';
            console.log("para esquerda");
            break;
            case 'd':
            direction='right';
            console.log("para direita");
            break;
    }
})