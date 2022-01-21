let game;

function init()
{
    game = new Game();
}

class Tile
{
    constructor(div)
    {
        this.goto = -1;
        this.div = div;
    }
}

class Player
{
    constructor(index)
    {
        this.atTile = 0;
        this.index = index;
        this.pawn = document.getElementsByClassName("pawn" + index)[0];
        this.pawn.style.display = "block";
    }
}

class Game
{
    constructor()
    {
        this.selectplayersDiv = document.getElementsByClassName("selectplayers")[0];
        this.winnerDiv = document.getElementsByClassName("winner")[0];
        this.playerturnDiv = document.getElementsByClassName("playerturn")[0];
        this.rollDiv = document.getElementsByClassName("roll")[0];
        this.mainDiv = document.getElementsByClassName("main")[0];
        this.boardDiv = document.getElementsByClassName("board")[0];
        this.boardoverlayDiv = document.getElementsByClassName("boardoverlay")[0];

        this.tiles = [];
        this.players = [];
        this.playerTurn = 0;
        this.setupBoard();
    }
    setupBoard()
    {
        //1 = right 0 = up 3 = left
        let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 3, 3, 3, 3, 3, 3, 3, 3, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
                    0, 3, 3, 3, 3, 3, 3, 3, 3, 0,
                    0, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        let x = 0;
        let y = 10;
        let tileSize = 55;

        for (var i = 0; i < path.length; i++)
        {
            let cmd = path[i];
            if (cmd == 1)
            {
                //right
                x++;
            }
            else if (cmd == 3)
            {
                //left
                x--;
            }
            else if (cmd == 0)
            {
                //up
                y--;
            }

            let div = this.makeBoardDiv(x * tileSize, y * tileSize, i+1)

            let tile = new Tile(div);
            this.tiles.push(tile);
        }

        this.setupGotos();
    }
    setupGotos()
    {
        let goto = [[6, 14], [16, 4], [17, 23], [27, 33], [29, 10], [38, 43], [39, 20], [45, 34]];
        
        for (var i = 0; i < goto.length; i++ )
        {
            let element = goto[i];

            let start = element[0] - 1;
            let end = element[1] - 1;

            let tile = this.tiles[start];
            tile.goto = end;
        }
        
        
    }
    start(amountOfPlayers)
    {
        this.selectplayersDiv.style.display = "none";
        this.winnerDiv.style.display = "none";
        this.mainDiv.style.display = "block";

        let pawns = document.getElementsByClassName("pawn");
        for (var i = 0; i < pawns.length; i++)
        {
            pawns[i].style.display = "none";

        }
        
        for (var i = 0; i < amountOfPlayers; i++)
        {
            let player = new Player(i);
            this.players.push(player);
        }

        this.playerTurn = -1;
        this.moveToNextPlayer();

    }
    moveToNextPlayer()
    {
        this.playerTurn++;
        if (this.playerTurn == this.players.length)  
        {
            this.playerTurn = 0;
        }

        this.draw()
    }
    draw()
    {
        for (var i = 0; i < this.players.length; i++)
        {
            this.setPawn(i, this.players[i].atTile);
        }
    }
    roll()
    {
        var rol  = Math.floor((Math.random() * 6) + 1);

        this.rollDiv.style.backgroundImage = "url(img/dice" + rol + ".png)";

        
        //pakken we onze speler, en plaatsen die
        //met attile
        
        //als de speler op vakje 50 komt (index 49) dan laten we het win scherm zien
        //en dhet speler nummer in de win div

        //draw

        //goto afhandelen van de nieuwe tile
        //pak de tile
        //kijk naar goto of die geen -1 is
        //attile player naar de goto zetten

        //draw

        //ga naar volgende speler
    }
    setPawn(playerI, atTile)
    {
        let tile = this.tiles[atTile];
        let player = this.players[playerI]

        player.pawn.style.left = tile.div.style.left;
        player.pawn.style.top = tile.div.style.top;
    }
    makeBoardDiv(x, y, tileDisplayNumber)
    {
        let div = document.createElement("div");

        div.className = "tile";
        div.style.left = x + "px";
        div.style.top = y + "px";
        div.textContent = tileDisplayNumber;

        this.boardDiv.appendChild(div);

        return div;
    }
}