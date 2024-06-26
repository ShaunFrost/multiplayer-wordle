import { useEffect } from "react";
import WordGrid from "./WordGrid";
import Keyboard from "./Keyboard";
import { socket } from "../socket";
import { useAppContext } from "../hooks/useAppContext";

function Game() {

    const {
        wordGrid, currentWord, currentRow,
        handleLetterInputFromServer, handleDeleteFromServer,
        handleSubmitFromServer, handleGameOverFromServer, handleReceiveMessage
    } = useAppContext();
    
    useEffect(() => {

        socket.on("letter_input", handleLetterInputFromServer);
        socket.on("delete_input", handleDeleteFromServer);
        socket.on("submit_input", handleSubmitFromServer);
        socket.on("game_over", handleGameOverFromServer);
        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("letter_input", handleLetterInputFromServer);
            socket.off("delete_input", handleDeleteFromServer);
            socket.off("submit_input", handleSubmitFromServer);
            socket.off("game_over", handleGameOverFromServer);
            socket.off("receive_message", handleReceiveMessage);
        }

    }, [wordGrid, currentWord, currentRow]);

    return (
        <div className="game-container">
            <WordGrid />
            <Keyboard />
        </div>
    )
}

export default Game;