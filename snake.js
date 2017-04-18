$(document).ready(function(){

    var setUpGrid = function(){
		var board = $(".board");
		for(var y=0; y<40; y++){
			for(var x=0; x<40; x++){
				var square = $("<div class=\"square\"></div>");
				square.attr({
					"data-x": x,
					"data-y": y
				});
				board.append(square);
			};
		};
	};

    function generateFood(){
        var i = Math.floor(Math.random()*40);
        var j = Math.floor(Math.random()*40);
        var food = [i,j];
        return food;
    };

    var food; //= generateFood();
    var countFood; //= 0;
    var totalScore; //= 0;
	var snake; //= [[20,20]];
	var snakeHead; //= snake[0];
    var snakeTail; //= snake[snake.length-1];
	var direction; //= "right";
    var speed;//= 150;
    

	var init = function(){
        food = generateFood();
        countFood = 0;
        totalScore = 0;
        $(".score").html("Score: "+totalScore);
        snake = [[20,20]];
        snakeHead = snake[0];
        snakeTail = snake[snake.length-1];
        direction = "right";
        speed = 150;
    	var i = snakeHead[0];
    	var j = snakeHead[1];
    	$("[data-x="+i+"][data-y="+j+"]").addClass("snake");
    };
	
	var getDirection = function(){
    	$(document).keydown(function(event){    		
		    switch(event.which){
			    case 37:
                if(direction != "right"){
                    direction = "left";
                }                    
                break;

                case 38:
                if(direction != "down"){
                    direction = "up";
                    } 
                break;

                case 39: 
                if(direction != "left"){
                    direction = "right";
                }                
                break;

                case 40:
                if(direction != "up"){
                    direction = "down";
                } 
                break;
                /*default:
                    direction = "right";  */
            };        
		});
    };

    var move = function(){
		var i = snakeHead[0];
    	var j = snakeHead[1];

        // move according to the direction
		switch(direction){
			case "right":
			i++;			    
			break;

			case "left":
            i--;
            break;

            case "up":
            j--;
            break;

            case "down":
            j++;
            break;
		};
        $("[data-x="+snakeTail[0]+"][data-y="+snakeTail[1]+"]").removeClass("snake");
        snake.pop(snakeTail);
        snake.unshift([i,j]);       
        snakeTail = snake[snake.length-1];
        snakeHead = snake[0];

         //draw snake
        snake.forEach(function(element){
            $("[data-x="+element[0]+"][data-y="+element[1]+"]").addClass("snake");
        });  		
	};
    
    var moveOntoSelf = function(){
        for(var i = 1; i < snake.length; i++){
            if (snake[i][0]==snakeHead[0] && snake[i][1]==snakeHead[1]){
                return true;
            }
        }
    };

	var gameOver = function(){
		var i = snakeHead[0];
    	var j = snakeHead[1];
    	if (i<0 || i==40 || j<0 || j==40){
    		return true;
    	}//snake move out of the board
        else if (moveOntoSelf()){
            return true;
        };// snake move onto itself
    	return false;
	};
    

    var removeBoard = function(){
        $(".snake").removeClass("snake");
        $(".food").removeClass("food");
    };

    var score = function(){
        if(snake.length > 20){
            totalScore += 4;
        }
        else if (snake.length > 10){
            totalScore += 2;
        }
        else {totalScore ++;};
        $(".score").html("Score: "+totalScore);   
    }
    
    var speedUp = function(){
        if (speed > 10){
            speed -= 5;
        };    
    }

    var placeFood = function(){
        $('[data-x='+food[0]+'][data-y='+food[1]+']').addClass("food");
    };

    var eatFood = function(){
        if(snakeHead[0]==food[0] && snakeHead[1]==food[1]){
            var i = snakeTail[0];
            var j = snakeTail[1];
            switch(direction){
                case "right":
                i--;
                break;

                case "left":
                i++;
                break;

                case "up":
                j++;
                break;

                case "down":
                j--;
                break;
            }
            countFood++;
            score();
            speedUp();
            //console.log(totalScore);
            snake.push([i,j]);  
            $(".food").removeClass("food");  
            food = generateFood(); 
            placeFood();      
        };
    };

    

    var loop = function (){        
        if (!gameOver()){
            setTimeout(function(){               
                getDirection();
                move();
                eatFood();
                loop();
            }, speed);
        }
        else {
            removeBoard();
            alert("Game Over!")}
    };

    
   setUpGrid();
   $("button").click(function(){
        init();
        placeFood();
        loop();
    });
   
})