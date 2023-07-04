import {useState,useContext,createContext} from 'react';

const Searchcontext = createContext();

const SearchProvider=({children})=>{
    const [value,setValue]=useState({
        keyword:"",
        results:[],
    });

    return (
        <Searchcontext.Provider value={[value,setValue]}>
            {children}
        </Searchcontext.Provider>
    )
}

// making a custom hook
const useSearch=()=> useContext(Searchcontext)

export {useSearch,SearchProvider};


