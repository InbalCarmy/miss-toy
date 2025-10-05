import { Link } from "react-router-dom"; 
import { ToyPreview } from "./ToyPreview";


export function ToyList({ toys, onRemoveToy }) {

    return(
        <ul className="toy-list">
            {toys && toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy}/>
                    <section>
                        <button className="close-btn" onClick={() => onRemoveToy(toy._id)}>X</button>
                        <Link className="edit-link" to={`/toy/edit/${toy._id}`}>Edit</Link>
                    </section>
                </li>
            )}
        </ul>
    )

}