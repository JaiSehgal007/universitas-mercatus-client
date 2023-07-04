import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const navigator=useNavigate();
    const [values,setValues]=useSearch();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
            setValues({...values,results:data});
            navigator("/search");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input 
                style={{height:'30px'}}
                className="form-control me-2 mt-2" 
                type="search" placeholder="Search for an item" 
                aria-label="Search" 
                value={values.keyword}
                onChange={(e)=>setValues({...values,keyword:e.target.value})}
                />
                <button style={{height:'30px'}} className="btn btn-outline-primary mt-2 pb-4 pt-1" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchInput