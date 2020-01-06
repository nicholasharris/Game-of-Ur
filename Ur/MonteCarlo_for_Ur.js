//Class for black and white game pieces/stones
class ur_piece
{
    constructor(color, position)
    {
        this.color = color;
        this.position = position;
        this.highlighted = false;
        this.selected = false;
        this.radius = 22;

        this.width = this.radius*2;
        this.height = this.radius*2;


        if (this.color == 0) //0 signifying white pieces
        {
            this.piece_x_locations = WHITE_PIECE_X_LOCATIONS;
            this.piece_y_locations = WHITE_PIECE_Y_LOCATIONS;

            this.stroke_style = "rgba(180, 180, 180, 1)";
            this.fillStyle = "rgba(240, 240, 240, 1)";
        }
        else
        {
            this.piece_x_locations = BLACK_PIECE_X_LOCATIONS;
            this.piece_y_locations = BLACK_PIECE_Y_LOCATIONS;

            this.stroke_style = "rgba(20, 20, 20, 1)";
            this.fillStyle = "rgba(40, 40, 40, 1)";
        }
    }
    render(context)
    {
        context.beginPath();
        context.arc(this.piece_x_locations[this.position], this.piece_y_locations[this.position], this.radius, 0 ,Math.PI*2);
        context.lineWidth = 3;
        context.strokeStyle = this.stroke_style;
        context.fillStyle = this.fillStyle;
        context.stroke();
        context.fill();

        if (this.highlighted == true)
        {
            context.beginPath();
            context.arc(this.piece_x_locations[this.position], this.piece_y_locations[this.position], this.radius + 4, 0 ,Math.PI*2);
            context.lineWidth = 3;
            context.strokeStyle = "rgba(200, 200, 20, 0.3)";
            context.fillStyle = "rgba(200, 200, 20, 0.3)";
            context.stroke();
            context.fill();
        }
    }
}

// Function to evaluate a board position in the game of Ur using a Pure Monte Carlo Tree Search
   // Returns the probability of winning from a given position;
function MonteCarloEvaluate(my_pieces, my_roll, my_player, player_to_move, num_rollouts, depth)
{
    if (num_rollouts == 0)
    {
        return [-1, -1, -1];
    }
    var fixed_roll_flag = false;
    //console.log(depth, num_rollouts);
    if (my_roll == -1)  //Dice not rolled
    {
        fixed_roll_flag = false;
    }
    else
    {
        fixed_roll_flag = true;
    }

    var piece_positions = [];
    for(var i = 0; i < my_pieces.length; i++)
    {
        piece_positions.push(my_pieces[i].position);
    }

    var my_win_probs = [];
    var legal_moves = [];    

    if (num_rollouts > 1 && fixed_roll_flag == true)
    {
        legal_moves = pretend_calculate_legal_pieces(my_roll, my_pieces, player_to_move);
        for (var i = 0; i < legal_moves.length; i++)
        {
            my_win_probs.push(-1);
        }
    }

    var wins_per_move = [];
    var rollouts_per_move = [];
    var wins = 0;
    if (num_rollouts > 1 && fixed_roll_flag == true)
    {
        for (var i = 0; i < legal_moves.length; i++)
        {
            wins_per_move.push(0);
            rollouts_per_move.push(0);
        }
    }
    var playout_counter = num_rollouts;

    for (var h = 0; h < num_rollouts; h++)
    {
        //console.log("my pieces length: ", my_pieces.length);
        if(fixed_roll_flag == false)
        {
            my_roll = roll_pretend_dice();
            legal_moves = pretend_calculate_legal_pieces(my_roll, my_pieces, player_to_move);
        }

        //console.log("legal moves length: ", legal_moves.length);

        //console.log("piece positions: ", piece_positions);

        if (legal_moves.length < 1)
        {
            //console.log("No legal moves in this variation...", depth);
            var result = MonteCarloEvaluate(my_pieces, -1, my_player, (player_to_move + 1) % 2, num_rollouts, depth + 1);
            return [result[0], 0, result[0]];  
        }

        // if any legal moves result in winning, assign full win probability to them
        var color_count = 0;
        for (var i = 0; i < my_pieces.length; i++)
        {
            //console.log("Player to move", player_to_move);
            if (my_pieces[i].color == player_to_move)
            {
                color_count += 1;
            }
        }     
        //check if any moves result in a win
        //console.log("color count: ", color_count);
        var terminal_flag = false;
        if ( color_count == 1 )
        {
            for (var i = 0;  i < legal_moves.length; i++)
            {
                if (my_pieces[legal_moves[i]].position + my_roll == 21) //The terminal game position 
                {
                    //console.log("Terminal position found", depth, num_rollouts, player_to_move, my_player);
                    terminal_flag = true;
                    if (player_to_move == my_player)
                    {
                        return [1, i, 1];
                    }
                    else
                    {
                        return [0, 0, 0];
                    }
                }
            }
        }
        //All other moves are evaluated with Monte Carlo 
        var d_move_flag = false;
        var chosen_move = getRandomIntInclusive(0, legal_moves.length - 1);
        
        //Collect position resulting from chosen move
        var new_pieces = [];
        for (var j = 0; j < my_pieces.length; j++)
        {
            new_pieces.push(new ur_piece(my_pieces[j].color, my_pieces[j].position) );
        }
        var selected_index = legal_moves[chosen_move];
        for (var j = 0; j < new_pieces.length; j++)
        {
            if (new_pieces[j].position == new_pieces[selected_index].position + my_roll && new_pieces[j].color != new_pieces[selected_index].color)
            {
                pretend_knock(new_pieces[j], new_pieces);
            }
        }

        var old_index = new_pieces[selected_index].position;
        new_pieces[selected_index].position += my_roll;

        if (old_index == 6)
        {
            pretend_move_up_friendly_pieces(new_pieces[selected_index], new_pieces);
        }

        if (new_pieces[selected_index].position == 14 || new_pieces[selected_index].position == 10 || new_pieces[selected_index].position == 20)
        {
            d_move_flag = true;
        }

        if (new_pieces[selected_index].position == 21)
        {
            new_pieces.splice(selected_index, 1);
        }


        if(num_rollouts > 1)
        {
            rollouts_per_move[chosen_move] += 1;
        }

        //if it is a double-move, then next move will be by the same player
        if (d_move_flag== true)
        {
            var result = MonteCarloEvaluate(new_pieces, -1, my_player, player_to_move, 1, depth + 1);
            wins += result[0];
            if (num_rollouts > 1)
            {
                wins_per_move[chosen_move] += result[0];
            }     
        }//Otherwise, the next move will be by the opposing player
        else
        {
            var result = MonteCarloEvaluate(new_pieces, -1, my_player, (player_to_move + 1) % 2, 1, depth + 1);
            wins += result[0];
            if (num_rollouts > 1)
            {
                wins_per_move[chosen_move] += result[0];
            }    
        }       
         
    }


    if(depth == 0)
    {
        best = 0.0;
        best_index = 0;
        for (var i = 0; i < legal_moves.length; i++)
        {
            
            if (rollouts_per_move[i] > 0)
            {
                my_win_probs[i] = wins_per_move[i]/rollouts_per_move[i];
                if (my_win_probs[i] > best)
                {
                    best = my_win_probs[i];
                    best_index = i;
                }
            }
            else
            {
                my_win_probs[i] = -1;
            } 
        }

        console.log("legal moves length:", legal_moves.length);
        console.log("Win Probabilities: ",my_win_probs);
        console.log("rollouts per move: ", rollouts_per_move);

        return [wins/num_rollouts, best_index, best];
    }
    else
    {
        return [wins/num_rollouts, 0, wins/num_rollouts];
    }
}

//Separate dice roll function for internal use in Monte Carlo
function roll_pretend_dice()
{
    var my_roll = 0;
    for (var i = 0; i < 4; i++)
    {
        if (Math.random() < 0.5)
        {
            my_roll+= 1;
        }
    }

    return my_roll;
}

//returns an array of indices of all the pieces which are legal to move (for the computer player)
function pretend_calculate_legal_pieces(my_roll, my_pieces, current_player)
{
    var legal_pieces = [];
    for(var i = 0; i < my_pieces.length; i++)
    {
        if (my_pieces[i].color == current_player && my_pieces[i].position >= 6)
        {
            if(my_pieces[i].position + my_roll == 21)
            {
                legal_pieces.push(i);
            }
            else if(my_pieces[i].position + my_roll < 21 )
            {
                var spot_occupied = false;
                for(var j = 0; j < my_pieces.length; j++)
                {
                    if (my_pieces[j].position == my_pieces[i].position + my_roll && my_pieces[j].color == my_pieces[i].color)
                    {
                        spot_occupied = true;
                    }
                    else if (my_pieces[j].position == my_pieces[i].position + my_roll && my_pieces[j].color != my_pieces[i].color && my_pieces[j].position == 14)
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

function pretend_knock(my_piece, my_pieces)
{
    var index = 6;
    var done_flag = false;
    while(done_flag == false)
    {
        var occupied = false;
        for(var i = 0; i < my_pieces.length; i++)
        {
            if(my_pieces[i].position == index && my_pieces[i].color == my_piece.color)
            {
                occupied = true;
            }
        }
        if (occupied == false)
        {
            my_piece.position = index;
            done_flag = true;
        }
        else
        {
            index--;
        }
    }
    
}

function pretend_move_up_friendly_pieces(piece, my_pieces)
{
    var move_needed = true;
    for(var i = 0; i < my_pieces.length; i++)
    {
        if(my_pieces[i].position == 6 && my_pieces[i].color == piece.color)
        {
            move_needed = false;
        }
    }

    if(move_needed == true)
    {
        for(var i = 0; i < my_pieces.length; i++)
        {
            if(my_pieces[i].position < 6 && my_pieces[i].color == piece.color)
            {
                my_pieces[i].position++;
            }
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The max and min are inclusive
  }

//function to check if a given ur position is in the position cache
// If it is, returns the index of the position in the cache. Otherwise, returns -1
//position consists of array of piece positions plus a bit signifying the player-to-move
/*
function is_in(position, cache)
{
    for (var i = 0; i < cache.length; i++)
    {
        if (position[0].length != cache[i][0].length)
        {
            continue;
        }
        else
        {
            var same_flag = true;
            for(var j = 0; j < position.length; j++)
            {
                if(position[0][j].position != cache[i][0][j].position || position[0][j].color != cache[i][0][j].color)
                {
                    same_flag = false;
                    break;
                }
            }

            if(position[1] != cache[i][1])
                {
                    same_flag = false;
                }

            if (same_flag == true)
            {
                return i;
            }
        } 
    }

    return -1;
}*/