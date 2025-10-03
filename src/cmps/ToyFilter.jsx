import { useEffect, useRef, useState } from "react"
import { debounce } from "../services/util.service.js"




export function ToyFilter({ filterBy, onSetFilterBy}){
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 400)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }



    const {name, inStock} = filterByToEdit
    return(
        <form className="toy-filter">
            <section>
                <label htmlFor="name">Name: </label>
                <input value={name} name="name" id="name" onChange={handleChange} />
            </section>
            <section>
                <label htmlFor="inStick">Is The Toy In Stock ? </label>
                <select onChange={handleChange} value={inStock} id="inStock" name="inStock" >
                    <option value="">All</option>
                    <option value="inStock">In Stock</option>
                    <option value="notInStock">Not In Stock</option>
                </select>
            </section>
            <section>
                <button>Submit</button>
            </section>
        </form>
    )
}