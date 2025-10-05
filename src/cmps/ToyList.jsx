import { Link } from "react-router-dom"; 
import { ToyPreview } from "./ToyPreview";


export function ToyList({ toys, onRemoveToy }) {

    return(
        <ul className="toy-list">
            {toys && toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy}/>
                    <section>
                        <button onClick={() => onRemoveToy(toy._id)}>X</button>
                        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                    </section>
                </li>
            )}
        </ul>
    )

}