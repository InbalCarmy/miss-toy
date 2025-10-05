import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { toyService } from "../services/toy.service"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadToy()
    }, [params.toyId])

    function loadToy() {
        toyService.getById(params.toyId)
        .then(toy => setToy(toy))
        .catch (err => console.log('Error loading toy: ', err))
    }



    if (!toy) return <div>Loading...</div>
    return(
        <section className="toy-details">
            <p>Name: {toy.name}</p>
            <p>Price: {toy.price}</p>
            {toy.inStock ? (
                <p>This Toy Is In Stock!</p>
            ): (
                <p>This Toy Is Not In Stock</p>
            )}

            <div >
                <Link className="link" to={`/toy/${toy.prevToyId}`}>Prev Toy</Link>
                <Link className="link" to={`/toy/${toy.nextToyId}`}>Next Toy</Link>
            </div>


        </section>
    )
}