import { useEffect, useRef, useState } from "react"
import { debounce } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilterBy}){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 400)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    useEffect(() => {
        setFilterByToEdit(filterBy)
    }, [filterBy])
    

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (target.multiple) {
        value = Array.from(target.selectedOptions, opt => opt.value)
        } else {
        if (target.type === 'number' || target.type === 'range') value = +value
        if (target.type === 'checkbox') value = target.checked
        }

        setFilterByToEdit(prev => ({ ...prev, [field]: value }))
    }


    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    const {name, inStock, labels: selectedLabels, sortBy} = filterByToEdit
    return(
        <form className="toy-filter">
            <section>
                <label htmlFor="name">Name: </label>
                <input value={name || ''} name="name" id="name" onChange={handleChange} />
            </section>

            <section>
                <label htmlFor="inStick">Is The Toy In Stock ? </label>
                <select onChange={handleChange} value={inStock || ''} id="inStock" name="inStock" >
                    <option value="">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Not In Stock</option>
                </select>
            </section>
{/* 
            <section>
                <label htmlFor="labels">Filter by labels (hold Ctrl/Cmd to select multiple): </label>
                <select 
                onChange={handleChange} 
                name="labels" 
                id="labels" 
                multiple 
                value={selectedLabels || []}
                size="4"
                >
                {labels.map(lbl => (
                    <option key={lbl} value={lbl}>{lbl}</option>
                ))}
                </select>
            </section> */}

            <section className="label-filter">
                <label>Filter by labels:</label>
                <div className="filter-checkbox-group">
                    {labels.map(lbl => (
                        <label key={lbl} className="checkbox-label">
                            <input 
                                type="checkbox" 
                                value={lbl}
                                checked={selectedLabels?.includes(lbl) || false}
                                onChange={(e) => {
                                    const isChecked = e.target.checked
                                    const newLabels = isChecked 
                                        ? [...(selectedLabels || []), lbl]
                                        : (selectedLabels || []).filter(l => l !== lbl)
                                    setFilterByToEdit(prev => ({...prev, labels: newLabels}))
                                }}
                            />
                            {lbl}
                        </label>
                    ))}
                </div>
            </section>

            <section>
                <label htmlFor="sort">Sort by: </label>
                <select onChange={handleChange} value={sortBy || ''} id="sortBy" name="sortBy" >
                    <option value="">None</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="created">Created</option>
                </select>
            </section>
            
            <section>
                <button>Submit</button>
            </section>
        </form>
    )
}