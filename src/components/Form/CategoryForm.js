import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <span className="mb-3">
                    <input style={{display:'inline',width:'85%'}}  type="text" className="form-control" placeholder='Create new Category' 
                    value={value} 
                    onChange={(e)=>setValue(e.target.value)}
                    />
                </span>
                <button type="submit" className="btn btn-primary mx-2 my-2">Submit</button>
            </form>

        </>
    )
}

export default CategoryForm