///////---------------- Constants ---------------------- ////////
CANVAS_WIDTH = 1000;
CANVAS_HEIGHT = 800;

WHITE_PIECE_X_LOCATIONS = [62.5, 62.5, 62.5, 62.5, 62.5, 62.5, 62.5, 137.5, 137.5, 137.5, 137.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 137.5, 137.5];
WHITE_PIECE_Y_LOCATIONS = [737.5, 687.5, 637.5 , 587.5, 537.5, 487.5, 437.5, 437.5, 512.5, 587.5, 662.5, 662.5, 587.5, 512.5, 437.5, 362.5, 287.5, 212.5, 137.5, 137.5, 212.5];

BLACK_PIECE_X_LOCATIONS = [362.5, 362.5, 362.5, 362.5, 362.5, 362.5, 362.5, 287.5, 287.5, 287.5, 287.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 212.5, 287.5, 287.5];
BLACK_PIECE_Y_LOCATIONS = [737.5, 687.5, 637.5 , 587.5, 537.5, 487.5, 437.5, 437.5, 512.5, 587.5, 662.5, 662.5, 587.5, 512.5, 437.5, 362.5, 287.5, 212.5, 137.5, 137.5, 212.5];

WHITE_FINISH_X = 137.5;
WHITE_FINISH_Y = 287.5;

BLACK_FINISH_X = 287.5;
BLACK_FINISH_Y = 287.5;

NUM_PIECES_EACH = 7;

CURRENT_PLAYER = 0;
BUTTON_LOCK = false;
MOVE_FINISH_FLAG = false;
DOUBLE_TURN_FLAG = false;

COMPUTER_TURN_DELAY = 1; //Number of milliseconds between computer's actions 
COMPUTER_WIN_PROB = 0.0;
////////////////////////////

///////---------------- Classes ---------------------- ////////

// Class for game dice
class die
{
    constructor(position_x, position_y)
    {
        this.position_x = position_x;
        this.position_y = position_y;
        this.corner_states = [1, 0, 0,  1];
    }
    roll()
    {
        ////console.log("roll entered");
        var white_corner_1 = Math.floor(Math.random()*4);
        var index = Math.floor(Math.random()*3);
        var white_corner_2 = -2;

        var choices = [0, 1, 2, 3];
        choices.splice(white_corner_1, 1);

        white_corner_2 = choices[index];


        for(var i = 0; i < 4; i++)
        {
            this.corner_states[i] = 0;
        }
        this.corner_states[white_corner_1] = 1;
        this.corner_states[white_corner_2] = 1;

        ////console.log("new states: " + this.corner_states[0].toString(10) +  "," + this.corner_states[1].toString(10) +  "," + this.corner_states[2].toString(10) +  "," + this.corner_states[3].toString(10));
    }
    render(context)
    {
        ///// draw die /////////////////
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(this.position_x, this.position_y);
        context.lineTo(this.position_x, this.position_y - 30);
        context.lineTo(this.position_x + Math.sqrt(450), this.position_y + Math.sqrt(450));
        context.lineTo(this.position_x, this.position_y);
        context.strokeStyle = 'rgb(20, 20, 20, 1)';
        context.fillStyle = 'rgb(40, 40, 40, 1)';
        context.stroke();
        context.fill();

        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(this.position_x, this.position_y);
        context.lineTo(this.position_x, this.position_y - 30);
        context.lineTo(this.position_x - Math.sqrt(450), this.position_y + Math.sqrt(450));
        context.lineTo(this.position_x, this.position_y);
        context.strokeStyle = 'rgb(20, 20, 20, 1)';
        context.fillStyle = 'rgb(60, 60, 60, 1)';
        context.stroke();
        context.fill();
       
        context.beginPath();
        context.lineWidth = 1;
        context.moveTo(this.position_x, this.position_y);
        context.lineTo(this.position_x - Math.sqrt(450), this.position_y + Math.sqrt(450));
        context.lineTo(this.position_x +Math.sqrt(450), this.position_y + Math.sqrt(450));
        context.lineTo(this.position_x, this.position_y);
        context.strokeStyle = 'rgb(20, 20, 20, 1)';
        context.fillStyle = 'rgb(30, 30, 30, 1)';
        context.stroke();
        context.fill();
        //////////////////////////////

        /// draw corners ////
        if(this.corner_states[0] == 1) //top corner
        {
            context.beginPath();
            context.lineWidth = 0.01;
            context.moveTo(this.position_x, this.position_y - 30);
            context.lineTo(this.position_x - Math.sqrt(10), this.position_y - 30 + Math.sqrt(50));
            context.lineTo(this.position_x, this.position_y - 15);
            context.lineTo(this.position_x + Math.sqrt(10), this.position_y - 30 + Math.sqrt(50));
            context.lineTo(this.position_x, this.position_y - 30);
            context.strokeStyle = 'rgb(200, 200, 200, 1)';
            context.fillStyle = 'rgb(240, 240, 240, 1)';
            context.stroke();
            context.fill();
        }

        if(this.corner_states[1] == 1) //center corner
        {
            context.beginPath();
            context.lineWidth = 0.01;
            context.moveTo(this.position_x, this.position_y - 7);
            context.lineTo(this.position_x + Math.sqrt(25), this.position_y + Math.sqrt(25));
            context.lineTo(this.position_x - Math.sqrt(25), this.position_y + Math.sqrt(25));
            context.lineTo(this.position_x, this.position_y - 7);
            context.strokeStyle = 'rgb(200, 200, 200, 1)';
            context.fillStyle = 'rgb(240, 240, 240, 1)';
            context.stroke();
            context.fill();
        }

        if(this.corner_states[2] == 1) //bottom left corner
        {
            context.beginPath();
            context.lineWidth = 0.01;
            context.moveTo(this.position_x - Math.sqrt(450), this.position_y + Math.sqrt(450));
            context.lineTo(this.position_x - Math.sqrt(450) + Math.sqrt(55), this.position_y + Math.sqrt(450));
            context.lineTo(this.position_x - Math.sqrt(450)/1.5, this.position_y + Math.sqrt(450)/1.5);
            context.lineTo(this.position_x - Math.sqrt(450) + Math.sqrt(15), this.position_y + Math.sqrt(450) - Math.sqrt(60));
            context.lineTo(this.position_x - Math.sqrt(450), this.position_y + Math.sqrt(450));
            context.strokeStyle = 'rgb(200, 200, 200, 1)';
            context.fillStyle = 'rgb(240, 240, 240, 1)';
            context.stroke();
            context.fill();
        }

        if(this.corner_states[3] == 1) //bottom right corner
        {
            context.beginPath();
            context.lineWidth = 0.01;
            context.moveTo(this.position_x + Math.sqrt(450), this.position_y + Math.sqrt(450));
            context.lineTo(this.position_x + Math.sqrt(450) - Math.sqrt(55), this.position_y + Math.sqrt(450));
            context.lineTo(this.position_x + Math.sqrt(450)/1.5, this.position_y + Math.sqrt(450)/1.5);
            context.lineTo(this.position_x + Math.sqrt(450) - Math.sqrt(15), this.position_y + Math.sqrt(450) - Math.sqrt(60));
            context.lineTo(this.position_x + Math.sqrt(450), this.position_y + Math.sqrt(450));
            context.strokeStyle = 'rgb(200, 200, 200, 1)';
            context.fillStyle = 'rgb(240, 240, 240, 1)';
            context.stroke();
            context.fill();
        }
        /////////////////////
    

    }
}


//class for highlight object to show legal moves
class square_highlight
{
    constructor(x, y, width)
    {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = width;
    }

    render(ctx)
    {
      
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo(this.x - this.width/2, this.y - this.width/2);
        ctx.lineTo(this.x + this.width/2, this.y - this.width/2);
        ctx.lineTo(this.x + this.width/2, this.y + this.width/2);
        ctx.lineTo(this.x - this.width/2, this.y + this.width/2);
        ctx.lineTo(this.x - this.width/2, this.y - this.width/2);

        ctx.strokeStyle = "rgba(250, 250, 20, 0.4)";
        ctx.fillStyle = "rgba(250, 250, 20, 0.4)";
        ctx.stroke();
        ctx.fill();
        
    }
}

//Class to distinguish player
class player
{
    constructor(type)
    {
        this.type = type;
    }
}

///////////////////////////////////////////

///////---------------- Functions, etc. ------------------//////////

// roll the drawn game dice on the board
function roll_game_dice()
{
    for(var i = 0; i < dice.length; i++)
    {
        dice[i].roll();
    } 

    roll_button.enabled = false;

    roll = 0;
    for (var i = 0; i < dice.length; i++)
    {
        if (dice[i].corner_states[1] == 1)
        {
            roll++;
        }
    }

    return roll;
}

var myGameArea = 
{
    canvas : document.createElement("canvas"),
    start : function() 
    {
      this.canvas.width = CANVAS_WIDTH;
      this.canvas.height = CANVAS_HEIGHT;
      this.canvas.id = "canvas";
      this.canvas.style = "border:1px solid #000000";
      this.canvas.parentElement = "parent";
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[4]);

      //initialize game piece objects
      pieces = [];
      for(var i = 0 ; i < NUM_PIECES_EACH; i++)
      {
          pieces.push(new ur_piece(0, i)); //white pieces
      }
      for(var i = 0 ; i < NUM_PIECES_EACH; i++)
      {
          pieces.push(new ur_piece(1, i)); //black pieces
      }

      //initialize  dice
      dice = [];
      for(var i = 0; i < 4; i++)
      {
          dice.push(new die(600 + 60*i, 300));
      }

      roll = 0;

      //initialize highlight squares
      highlight_squares = [];

      
      //initialize roll button
      roll_button = new roll_rect();

      //initialize points to illustrate computer's moves
      motion_points = [];

      /// initialize roll button functionality //////
        // Binding the click event on the canvas
        this.canvas.addEventListener('click', function(evt) {
            var mousePos = getMousePos(canvas, evt);
            if (isInside(mousePos,roll_button) && roll_button.enabled == true) 
            {
                roll = roll_game_dice();          
            }
            else if (check_selected_pieces() == false)
            {
                var piece_selected = false;
                for(var i = 0; i < pieces.length; i++)
                {
                    if (isInsidePiece(mousePos,pieces[i]) && pieces[i].highlighted == true)
                    {
                        pieces[i].selected = true;
                        highlight_squares.splice(0, highlight_squares.length);
                        if(pieces[i].position + roll < WHITE_PIECE_X_LOCATIONS.length)
                        {
                            highlight_squares.push(new square_highlight(pieces[i].piece_x_locations[pieces[i].position + roll], pieces[i].piece_y_locations[pieces[i].position + roll], 75 ));
                        }
                        else if (pieces[i].position + roll == WHITE_PIECE_X_LOCATIONS.length)
                        {
                            highlight_squares.push(new square_highlight(pieces[i].piece_x_locations[pieces[i].piece_x_locations.length - 1], pieces[i].piece_y_locations[pieces[i].piece_y_locations.length - 1] + 75, 75 ));
                        }
                        piece_selected = true;
                    }
                }

                if(piece_selected == true)
                {
                    for(var i = 0; i < pieces.length; i++)
                    {
                        if (pieces[i].selected == false)
                        {
                            pieces[i].highlighted == false;
                        }
                    }
                }
            }  
            else if (highlight_squares.length > 0)
            {
                if (isInside(mousePos,highlight_squares[0]))
                {
                    for(var i = 0; i < pieces.length; i++)
                    {
                        if(pieces[i].selected == true)
                        {
                            if(pieces[i].position + roll < WHITE_PIECE_X_LOCATIONS.length)
                            {
                                //remove opposing piece if it is there
                                for(var j = 0 ; j < pieces.length; j++)
                                {
                                    if(pieces[j].position == pieces[i].position + roll && pieces[j].color != pieces[i].color && pieces[j].position > 10 && pieces[j].position <= 18)
                                    {
                                        knock(pieces[j]);
                                    }
                                }

                                pieces[i].position += roll;

                                if (pieces[i].position == 10 || pieces[i].position == 14 || pieces[i].position == 20)
                                {
                                    DOUBLE_TURN_FLAG = true;
                                }
                                move_up_friendly_pieces(pieces[i]);
                            }
                            else
                            {
                                pieces.splice(i, 1); //remove finishing piece
                            }

                        }
                    }

                    //console.log("getting there...");
                    highlight_squares.splice(0, highlight_squares.length);
                    MOVE_FINISH_FLAG = true;
                    for(var k = 0; k < pieces.length; k++)
                    {
                        pieces[k].selected = false;
                        pieces[k].highlighted = false;
                    }
                    //console.log("got there.");
                    
                }
                else
                {
                    highlight_squares.splice(0, highlight_squares.length);
                    for(var i = 0; i < pieces.length; i++)
                    {
                        pieces[i].selected = false;
                    }
                }
            } 
        }, false);
    ////////////////////////////////////////////////////

      //initialize players
      players = [];
      players.push(new player(0));  //0 signifies human player
      players.push(new player(1));


    }
}

//Function to get the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    ////console.log("get mouse entered");
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//Function to check whether a point is inside a rectangle
function isInside(pos, rect)
{
    return pos.x > rect.x - rect.width/2 && pos.x < rect.x+rect.width/2 && pos.y < rect.y+rect.height/2 && pos.y > rect.y-rect.height/2
}

function isInsidePiece(pos, piece)
{
    return pos.x > piece.piece_x_locations[piece.position] - piece.width/2 && pos.x < piece.piece_x_locations[piece.position] + piece.width/2 && pos.y < piece.piece_y_locations[piece.position]+piece.height/2 && pos.y > piece.piece_y_locations[piece.position]-piece.height/2;
}

// Class for clickable area to roll the dice
class roll_rect
{
    constructor()
    {
        this.x = 690;
        this.y = 200;
        this.width = 200;
        this.height = 70;
        this.enabled = true;
    }

    render(context)
    {
        context.beginPath();
        context.lineWidth = 6
        context.moveTo(this.x - this.width/2, this.y - this.height/2);
        context.lineTo(this.x + this.width/2, this.y - this.height/2);
        context.lineTo(this.x + this.width/2, this.y + this.height/2);
        context.lineTo(this.x - this.width/2, this.y + this.height/2);
        context.lineTo(this.x - this.width/2, this.y - this.height/2);
        if (this.enabled == false)
        {
            context.strokeStyle = 'rgba(80, 80, 80, 1)';
            context.fillStyle = 'rgba(100, 100, 100, 1)';
        }
        else if (CURRENT_PLAYER == 0) // White's move
        {
            //context.strokeStyle = 'rgba(80, 20, 20, 1)';
            //context.fillStyle = 'rgba(180, 90, 70, 1)';

            context.strokeStyle = 'rgba(80, 80, 80, 1)';
            context.fillStyle = 'rgba(255, 255, 255, 1)';
        }
        else //Black's move
        {
            context.strokeStyle = 'rgba(80, 80, 80, 1)';
            context.fillStyle = 'rgba(30, 30, 30, 1)';
        }

        context.stroke();
        context.fill();

        //text
        context.font = "35px Arial";
        if(this.enabled == false)
        {
            context.fillStyle = 'rgba(80, 80, 80, 1)';
        }
        else if (CURRENT_PLAYER == 0) // White's move
        {
            context.fillStyle = 'rgba(0, 0, 0, 1)';
        }
        else // Black's move
        {
            context.fillStyle = 'rgba(240, 240, 240, 1)';
        }
        
        context.textAlign = "center";
        context.fillText("ROLL", this.x, this.y + 12); 
    }

}

// Class for clickable area to roll the dice
class player_rect
{
    constructor()
    {
        this.x = 690;
        this.y = 200;
        this.width = 200;
        this.height = 70;
        this.enabled = true;
    }

    render(context)
    {
        context.beginPath();
        context.lineWidth = 6
        context.moveTo(this.x - this.width/2, this.y - this.height/2);
        context.lineTo(this.x + this.width/2, this.y - this.height/2);
        context.lineTo(this.x + this.width/2, this.y + this.height/2);
        context.lineTo(this.x - this.width/2, this.y + this.height/2);
        context.lineTo(this.x - this.width/2, this.y - this.height/2);
        if (this.enabled == false)
        {
            context.strokeStyle = 'rgba(80, 80, 80, 1)';
            context.fillStyle = 'rgba(100, 100, 100, 1)';
        }
        else if (CURRENT_PLAYER == 0) // White's move
        {
            //context.strokeStyle = 'rgba(80, 20, 20, 1)';
            //context.fillStyle = 'rgba(180, 90, 70, 1)';

            context.strokeStyle = 'rgba(80, 80, 80, 1)';
            context.fillStyle = 'rgba(255, 255, 255, 1)';
        }
        else //Black's move
        {
            context.strokeStyle = 'rgba(80, 80, 80, 1)';
            context.fillStyle = 'rgba(30, 30, 30, 1)';
        }

        context.stroke();
        context.fill();

        //text
        context.font = "35px Arial";
        if(this.enabled == false)
        {
            context.fillStyle = 'rgba(80, 80, 80, 1)';
        }
        else if (CURRENT_PLAYER == 0) // White's move
        {
            context.fillStyle = 'rgba(0, 0, 0, 1)';
        }
        else // Black's move
        {
            context.fillStyle = 'rgba(240, 240, 240, 1)';
        }
        
        context.textAlign = "center";
        context.fillText("ROLL", this.x, this.y + 12); 
    }

}

////////-------------- Functions to handle turns by human/computer players ------------------ ///////////

//highlights the pieces which are legal to move (for the human player)
function highlight_legal_pieces(roll)
{
    var legal_count = 0;
    for(var i = 0; i < pieces.length; i++)
    {
        if (pieces[i].color == CURRENT_PLAYER && pieces[i].position >= 6)
        {
            if(pieces[i].position + roll == WHITE_PIECE_X_LOCATIONS.length)
            {
                pieces[i].highlighted = true;
                legal_count += 1;
                //console.log("piece highlighted | color: " + pieces[i].color.toString(10) + " | position: " + pieces[i].position.toString(10) + " | locations length: " + WHITE_PIECE_X_LOCATIONS.length.toString(10) + " | position + roll: " + (pieces[i].position + roll).toString(10));

            }
            else if(pieces[i].position + roll < WHITE_PIECE_X_LOCATIONS.length )
            {
                var spot_occupied = false;
                for(var j = 0; j < pieces.length; j++)
                {
                    if (pieces[j].position == pieces[i].position + roll && pieces[j].color == pieces[i].color)
                    {
                        spot_occupied = true;
                    }
                    else if (pieces[j].position == pieces[i].position + roll && pieces[j].color != pieces[i].color && pieces[j].position == 14)
                    {
                        spot_occupied = true;
                    }
                }

                if(spot_occupied == false)
                {
                    pieces[i].highlighted = true;
                    legal_count += 1;
                    //console.log("piece highlighted | color: " + pieces[i].color.toString(10) + " | position: " + pieces[i].position.toString(10) + " | locations length: " + WHITE_PIECE_X_LOCATIONS.length.toString(10) + " | position + roll: " + (pieces[i].position + roll).toString(10));
                }
            }
        }
    }

    return legal_count;
}

//returns an array of indices of all the pieces which are legal to move (for the computer player)
function calculate_legal_pieces(roll)
{
    var legal_pieces = [];
    for(var i = 0; i < pieces.length; i++)
    {
        if (pieces[i].color == CURRENT_PLAYER && pieces[i].position >= 6)
        {
            if(pieces[i].position + roll == WHITE_PIECE_X_LOCATIONS.length)
            {
                legal_pieces.push(i);
            }
            else if(pieces[i].position + roll < WHITE_PIECE_X_LOCATIONS.length )
            {
                var spot_occupied = false;
                for(var j = 0; j < pieces.length; j++)
                {
                    if (pieces[j].position == pieces[i].position + roll && pieces[j].color == pieces[i].color)
                    {
                        spot_occupied = true;
                    }
                    else if (pieces[j].position == pieces[i].position + roll && pieces[j].color != pieces[i].color && pieces[j].position == 14)
                    {
                        spot_occupied = true;
                    }
                }

                if(spot_occupied == false)
                {
                    legal_pieces.push(i);
                }
            }
        }
    }
    return legal_pieces;
}

function check_selected_pieces()
{
    for(var i = 0; i < pieces.length; i++)
    {
        if(pieces[i].selected == true)
        {
            return true;
        }
    }

    return false;
}

// Function to handle knocking an opponent's piece off the board
function knock(piece)
{
    var index = 6;
    var done_flag = false;
    while(done_flag == false)
    {
        var occupied = false;
        for(var i = 0; i < pieces.length; i++)
        {
            if(pieces[i].position == index && pieces[i].color == piece.color)
            {
                occupied = true;
            }
        }
        if (occupied == false)
        {
            piece.position = index;
            done_flag = true;
        }
        else
        {
            index--;
        }
    }
    
}

// Function to adjust friendly pieces after one has moved
function move_up_friendly_pieces(piece)
{
    var move_needed = true;
    for(var i = 0; i < pieces.length; i++)
    {
        if(pieces[i].position == 6 && pieces[i].color == piece.color)
        {
            move_needed = false;
        }
    }

    if(move_needed == true)
    {
        for(var i = 0; i < pieces.length; i++)
        {
            if(pieces[i].position < 6 && pieces[i].color == piece.color)
            {
                pieces[i].position++;
            }
        }
    }
}

// Function to handle game turns
function handle_game_turn()
{
   //Check select tag to see if human/computer player has been toggled
   var player2_selection = document.getElementById('Player2Select').value;
   console.log(player2_selection);
   if(player2_selection == "Human")
   {
       players[1].type = 0;
   }
   else
   {
       players[1].type = 1;
   }

    if (players[CURRENT_PLAYER].type == 0) //if the current player is a human
    {
        if(BUTTON_LOCK == false)
        {
            roll_button.enabled = true;
            BUTTON_LOCK = true;
        }
        
        execute_human_turn();
    }
    else  // if the player is the computer
    {
        //if(BUTTON_LOCK == false)
        //{
        roll_button.enabled = true;
        //}
        render_board();
        sleep(COMPUTER_TURN_DELAY);
        execute_computer_turn();
    }

    //CURRENT_PLAYER = (CURRENT_PLAYER + 1) %  2;  //change the current player for next turn
}

// Function to check if one player has won and the game is over
function check_game_over()
{
    var white_count = 0;
    var black_count = 0;
    for (var i = 0; i < pieces.length; i++ )
    {
        if (pieces[i].color == 0)
        {
            white_count += 1;
        }
        else
        {
            black_count += 1;
        }
    }

    if (white_count == 0)
    {
        return 0; //signifying white has won
    }
    else if (black_count == 0)
    {
        return 1;  //signifying black has won
    }
    else
    {
        // Nobody has won
        return -1;
    }
}

//function to set the canvas to a game over screen once the game is won
function game_finish_screen(winner, cntx)
{
    BUTTON_LOCK = true;
    //text
    cntx.font = "40px Arial";
    cntx.strokeStyle = 'rgba(80, 20, 20, 1)';
    cntx.textAlign = "center";
    
    //context.fillStyle = 'rgba(180, 90, 70, 1)';

    if (winner == 0)  // White won
    {
        cntx.fillText("White Wins!", 700, 600); 
    }
    else  // black won
    {
        cntx.fillText("Black Wins!", 700, 600); 
    }
}

// function to handle human turns
function execute_human_turn()
{

    if(roll_button.enabled == false)
    {
        motion_points = [];
        if (roll == 0)
        {
            CURRENT_PLAYER = (CURRENT_PLAYER + 1) %  2;  //change the current player for next turn
            BUTTON_LOCK = false;
            return;
        }

        if (MOVE_FINISH_FLAG == true)
        {
            //Check if game is over
            if (check_game_over() == 0)
            {
                //game_finish_screen(0);  //white victory
                return;
            }
            else if (check_game_over() == 1) 
            {
               //game_finish_screen(1); //Black victory
                return;
            }


            CURRENT_PLAYER = (CURRENT_PLAYER + 1) %  2;  //change the current player for next turn

            

            if(DOUBLE_TURN_FLAG == true)
            {
                CURRENT_PLAYER = (CURRENT_PLAYER + 1) %  2;
                DOUBLE_TURN_FLAG = false;
            }

            MOVE_FINISH_FLAG = false;
            BUTTON_LOCK = false;

            //console.log("turn finished!");
        }
        else if (check_selected_pieces() == false)
        {
            var num_legal_moves = highlight_legal_pieces(roll);

            if(num_legal_moves == 0)
            {
                CURRENT_PLAYER = (CURRENT_PLAYER + 1) %  2;  //change the current player for next turn
                BUTTON_LOCK = false;
                return;
            }
        }
    }

}

// To sleep for a set amount of milliseconds (To make a small pause between computer's actions)
function sleep(milliseconds) 
{
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

// Handle turn by the AI including calling Monte Carlo and handling effects on the game board
function execute_computer_turn()
{
    roll_button.enabled = true;
    render_board();
    roll = roll_game_dice();
    render_board();

    motion_points = [];
    
    var legal_moves = calculate_legal_pieces(roll);

    if (legal_moves.length > 0)
    {
        //chose the move to play
        COMPUTER_WIN_PROB = 0.0;
        best_index = 0;
        var result = MonteCarloEvaluate(pieces, roll, CURRENT_PLAYER, CURRENT_PLAYER, 20000, 0);  //Use Monte Carlo Tree Search to select move
        console.log(result);
        selected_piece = pieces[legal_moves[result[1]]];
        selected_index = legal_moves[result[1]];

        COMPUTER_WIN_PROB = result[2];

        //Mark motion points for human to visualize
        if (CURRENT_PLAYER == 0)
        {
            motion_points.push([WHITE_PIECE_X_LOCATIONS[selected_piece.position], WHITE_PIECE_Y_LOCATIONS[selected_piece.position]]);
            if(selected_piece.position + roll < WHITE_PIECE_X_LOCATIONS.length)
            {
                motion_points.push([WHITE_PIECE_X_LOCATIONS[selected_piece.position + roll], WHITE_PIECE_Y_LOCATIONS[selected_piece.position + roll]]);
            }
            else
            {
                motion_points.push([WHITE_FINISH_X, WHITE_FINISH_Y]);
            }
            
            
        }
        else
        {
            motion_points.push([BLACK_PIECE_X_LOCATIONS[selected_piece.position], BLACK_PIECE_Y_LOCATIONS[selected_piece.position]]);
            if(selected_piece.position + roll < BLACK_PIECE_X_LOCATIONS.length)
            {
                motion_points.push([BLACK_PIECE_X_LOCATIONS[selected_piece.position + roll], BLACK_PIECE_Y_LOCATIONS[selected_piece.position + roll]]);
            }
            else
            {
                motion_points.push([BLACK_FINISH_X, BLACK_FINISH_Y]);
            }
        }

        //Play the selected move and handle all necessary effects on the board
        if(selected_piece.position + roll < WHITE_PIECE_X_LOCATIONS.length)
        {
            //remove opposing piece if it is there
            for(var j = 0 ; j < pieces.length; j++)
            {
                if(pieces[j].position == selected_piece.position + roll && pieces[j].color != selected_piece.color && pieces[j].position > 10 && pieces[j].position <= 18)
                {
                    knock(pieces[j]);
                }
            }

            selected_piece.position += roll;

            if (selected_piece.position == 10 || selected_piece.position == 14 || selected_piece.position == 20)
            {
                DOUBLE_TURN_FLAG = true;
            }
            move_up_friendly_pieces(selected_piece);
        }
        else
        {
            pieces.splice(selected_index, 1); //remove finishing piece
        }
    }

    render_board();
    sleep(COMPUTER_TURN_DELAY);

    CURRENT_PLAYER = (CURRENT_PLAYER + 1) %  2;  //change the current player for next turn
    BUTTON_LOCK = false;

    if(DOUBLE_TURN_FLAG == true)
    {
        CURRENT_PLAYER = (CURRENT_PLAYER + 1) %  2;
        DOUBLE_TURN_FLAG = false;
        sleep(COMPUTER_TURN_DELAY);
    }
    return;
}
//////////////////////////////////////////////////////////////////////

////// render board ///
function render_board()
{
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

  //clear
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  //draw background color
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, CANVAS_HEIGHT);
  ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.lineTo(CANVAS_WIDTH, 0);
  ctx.strokeStyle =  "rgba(0, 0, 0, 1)";
  ctx.fillStyle = "rgba(200, 100, 30, 0.3)";
  ctx.fill();
  ctx.stroke();

  ////////////// draw game board ////////////////////
  
  ///// outline /////////////
  ctx.beginPath();
  ctx.lineWidth = 6;
  ctx.moveTo(100, 100);
  ctx.lineTo(325, 100);
  ctx.lineTo(325, 250);
  ctx.lineTo(250, 250);
  ctx.lineTo(250, 400);
  ctx.lineTo(325, 400);
  ctx.lineTo(325, 700);
  ctx.lineTo(100, 700);
  ctx.lineTo(100, 400);
  ctx.lineTo(175, 400);
  ctx.lineTo(175, 250);
  ctx.lineTo(100, 250);
  ctx.lineTo(100, 100);
  ctx.strokeStyle =  "rgba(80, 20, 20, 1)";
  ctx.fillStyle = "rgba(180, 90, 70, 1)";
  ctx.stroke();
  ctx.fill();
  //////////////////////////


  //// inner lines //////////////
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(175, 100);
  ctx.lineTo(175, 700);
  ctx.moveTo(250, 100);
  ctx.lineTo(250, 700);
  ctx.moveTo(100, 175);
  ctx.lineTo(325, 175);
  ctx.moveTo(100, 250);
  ctx.lineTo(325, 250);
  ctx.moveTo(175, 325);
  ctx.lineTo(250, 325);
  ctx.moveTo(175, 400);
  ctx.lineTo(250, 400);
  ctx.moveTo(100, 475);
  ctx.lineTo(325, 475);
  ctx.moveTo(100, 550);
  ctx.lineTo(325, 550);
  ctx.moveTo(100, 625);
  ctx.lineTo(325, 625);
  ctx.strokeStyle =  "rgba(80, 20, 20, 1)";
  ctx.stroke();
  //////////////////////////////

  //// Special spaces //////////
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(137.5, 212.5 );
  ctx.arc(137.5,212.5, 30 , 0, 2*Math.PI);
  ctx.strokeStyle =  "rgba(0, 42, 175, 1)";
  ctx.fillStyle = "rgba(0, 42, 175, 1)";
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.lineWidth = 4;
  for(var i = 0; i < 12; i++)
  {
    ctx.moveTo(137.5, 212.5);
    ctx.lineTo(137.5 + 29*Math.cos(i*(Math.PI)*2/12), 212.5 + 29*Math.sin(i*(Math.PI*2/12)));
  }
  ctx.strokeStyle =  "rgba(200, 200, 50, 1)";
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(287.5, 212.5 );
  ctx.arc(287.5,212.5, 30 , 0, 2*Math.PI);
  ctx.strokeStyle =  "rgba(0, 42, 175, 1)";
  ctx.fillStyle = "rgba(0, 42, 175, 1)";
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.lineWidth = 4;
  for(var i = 0; i < 12; i++)
  {
    ctx.moveTo(287.5, 212.5);
    ctx.lineTo(287.5 + 29*Math.cos(i*(Math.PI)*2/12), 212.5 + 29*Math.sin(i*(Math.PI*2/12)));
  }
  ctx.strokeStyle =  "rgba(200, 200, 50, 1)";
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(212.5, 437.5 );
  ctx.arc(212.5,437.5, 30 , 0, 2*Math.PI);
  ctx.strokeStyle =  "rgba(0, 42, 175, 1)";
  ctx.fillStyle = "rgba(0, 42, 175, 1)";
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.lineWidth = 4;
  for(var i = 0; i < 12; i++)
  {
    ctx.moveTo(212.5, 437.5);
    ctx.lineTo(212.5 + 29*Math.cos(i*(Math.PI)*2/12), 437.5 + 29*Math.sin(i*(Math.PI*2/12)));
  }
  ctx.strokeStyle =  "rgba(200, 200, 50, 1)";
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(137.5, 662.5 );
  ctx.arc(137.5,662.5, 30 , 0, 2*Math.PI);
  ctx.strokeStyle =  "rgba(0, 42, 175, 1)";
  ctx.fillStyle = "rgba(0, 42, 175, 1)";
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.lineWidth = 4;
  for(var i = 0; i < 12; i++)
  {
    ctx.moveTo(137.5, 662.5);
    ctx.lineTo(137.5 + 29*Math.cos(i*(Math.PI)*2/12), 662.5 + 29*Math.sin(i*(Math.PI*2/12)));
  }
  ctx.strokeStyle =  "rgba(200, 200, 50, 1)";
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(287.5, 662.5 );
  ctx.arc(287.5,662.5, 30 , 0, 2*Math.PI);
  ctx.strokeStyle =  "rgba(0, 42, 175, 1)";
  ctx.fillStyle = "rgba(0, 42, 175, 1)";
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.lineWidth = 4;
  for(var i = 0; i < 12; i++)
  {
    ctx.moveTo(287.5, 662.5);
    ctx.lineTo(287.5 + 29*Math.cos(i*(Math.PI)*2/12), 662.5 + 29*Math.sin(i*(Math.PI*2/12)));
  }
  ctx.strokeStyle =  "rgba(200, 200, 50, 1)";
  ctx.stroke();
  /////////////////////////////////////////////////////

  /// draw  pieces ///////
  for (var i = 0; i < pieces.length; i++)
  {
     pieces[i].render(ctx);
  }
  ////////////////////////

  // draw dice /////
  for(var i = 0; i < dice.length; i++)
  {
      dice[i].render(ctx);
  }

  //draw roll button///
  roll_button.render(ctx);

  //draw highlight sqaures
  for(var i = 0; i < highlight_squares.length; i++)
  {
      highlight_squares[i].render(ctx);
  }

  //draw roll number
   ctx.beginPath();
   ctx.font = "42px Arial";
  
   ctx.fillStyle = 'rgba(80, 20, 20, 1)';
   ctx.textAlign = "center";
   ctx.fillText(roll.toString(10), 870, 315);
   ctx.stroke();
   ctx.fill();

  ///// draw canvas border ///////////
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.moveTo(0, 0);
  ctx.lineTo(0, CANVAS_HEIGHT);
  ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.lineTo(CANVAS_WIDTH, 0);
  ctx.lineTo(0, 0);
  ctx.strokeStyle =  "rgba(80, 20, 20, 1)";
  ctx.stroke();
  ///////////////////////////////////

  //Draw points of computer's motion if it just moved
  if (motion_points.length > 0)
  {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(motion_points[0][0], motion_points[0][1]);
    ctx.lineTo(motion_points[1][0], motion_points[1][1]);
    ctx.strokeStyle =  "rgba(255, 20, 20, 1)";
    ctx.stroke();
  }

  //Draw the computer win probability
  ctx.beginPath();
  ctx.font = "30px Arial";
   ctx.fillStyle = 'rgba(80, 20, 20, 1)';
   ctx.textAlign = "center";
   var formatted_prob = COMPUTER_WIN_PROB*100;
   formatted_prob = formatted_prob.toFixed(3);
   ctx.fillText("Computer's Chance of Victory: " + formatted_prob.toString(10) + "%", 700, 100);
   ctx.stroke();
   ctx.fill();

  if (check_game_over() == 0)  //white wins
  {
      game_finish_screen(0, ctx);
  }
  else if (check_game_over() == 1)  //Black wins
  {
      game_finish_screen(1, ctx);
  }
}


//////// Game loop ///////
function game_loop()
{
   //render board
   render_board();

   //// Conduct player turns by making computer move or awaiting human's move //////////
   handle_game_turn();
  
  //do it again
  window.requestAnimationFrame(game_loop);
}
/////////////////////////////////////////////////////



////////////////// main initialization ////////////////////////////////////////
myGameArea.start();
window.requestAnimationFrame(game_loop);  //launches game- and rendering-loop
//////////////////////////////////////////////////////////////////////////