import { Link } from "react-router-dom";

export function ToyPreview({toy}){

    return(
        <article className="toy-preview">
            <Link to={`/toy/$toy._id`}>
                <h1>{toy.name}</h1>
                {toy.inStock ? (
                    <p>In Stock!</p>
                ) : (
                    <p> is Not In Stock</p>
                )}
                <p>price: {toy.price}</p>
            </Link>
        </article>
    )

}