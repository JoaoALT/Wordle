import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Score{
    name: string,
    points: number
}

interface ContextProps{
    wordSelected: string,
    saveGame: (value: Score) => Promise<void>,
    getGame: () => Promise<void>,
    listScores: Score[]
}


export const GameContext = createContext({} as ContextProps)

export const GameProvider = ({children}: any) => {

    const words = ["test", "hola", "perro", "solar", "amigo", "rabia"]
    
    const [listScores, setListScores] = useState([] as Score[])
    const [wordSelected, setWordSelected] = useState(words[Math.round(Math.random() * (words.length-2) + 1)])

    useEffect(() => {
        getGame()
    }, [])


    const saveGame = async (value:Score) => {
        try{
            setListScores([...listScores, value])
            await AsyncStorage.setItem(('listScores'), JSON.stringify(([...listScores, value])));
            
            setWordSelected(words[Math.round(Math.random() * (words.length-2) + 1)])
        }catch (error){
            console.log(error)
        }
    }

    const getGame = async() => {
        try{

            const response = await AsyncStorage.getItem('my-key');

            if (response !== null) return setListScores(JSON.parse(response))

        }catch (error){
            console.log(error)
        }
    }

    return (
        
        <GameContext.Provider 
            value={{
                wordSelected,
                listScores,
                saveGame,
                getGame
                }}
        >
            {children}
        </GameContext.Provider>
        
        )
        
}

