import { useEffect, useRef, useState } from "react"
import { debounce } from "../services/util.service.js"




export function ToyFilter({ filterBy, onSetFilterBy}){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 400)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    // function handleChange({ target }) {
    //     let { name: field, value, type } = target
    //     switch (type) {
    //         case 'number':
    //         case 'range':
    //             value = +value
    //             break;
    //         case 'checkbox':
    //             value = target.checked
    //             break;
    //         default:
    //             break;
    //     }
    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    // }
    

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
    const {name, inStock, labels: selectedLabels} = filterByToEdit
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
                    <option value="inStock">In Stock</option>
                    <option value="notInStock">Not In Stock</option>
                </select>
            </section>

            <section>
                {/* <label htmlFor="label">Filter by label: </label>
                <select  onChange={handleChange} value={filterByToEdit.label || ''} id="label" name="label" >
                    <option value="">All labels</option>
                    {labels.map(lbl => (
                        <option key={lbl} value={lbl}>{lbl}</option>
                    ))}
                </select> */}
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
            </section>
            
            <section>
                <button>Submit</button>
            </section>
        </form>
    )
}