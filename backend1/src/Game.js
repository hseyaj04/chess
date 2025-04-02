const {WebSocket} = require('ws');
const { Chess } = require('chess.js');
const { MOVE, GAME_OVER, INIT_GAME } = require('./messages.js')


class Game {
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess()
        // this.moves = []
        this.startTime = new Date()
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color : "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color : "black"
            }
        }))
    }

    makeMove(socket, move){
        // Validate the move
        // update the board
        // push the move
        // check if the game is over
        // send the updated board to both players

        if(this.board.moves().length % 2 === 0 && socket !== this.player1){
            return
        }
        if(this.board.moves().length % 2 === 1 && socket !== this.player2){
            return
        }
        try {
            this.board.move(move)
        } catch (error) {
            console.log(error);
            
            return
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? "black" : "white"
                }
            }))
            return
        }
        if(this.board.moves().length % 2 === 0){
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
        if(this.board.moves().length % 2 === 1){
            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        }
    }
}


module.exports = Game