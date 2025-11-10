import { Link} from 'react-router-dom'
import Categories from '../../components/Categories'
import './Home.css'
import { useEffect, useState } from 'react'
import Card from "../../components/Card";

export default function Page() {
    const [selectedBtn, setSelectedBtn] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            const data = await getProducts();

            setProducts(data.slice(0, 8));
        }

        loadProducts();
    }, []);
    return (
        <div>

            <Categories selectedBtn={selectedBtn} onSelect={setSelectedBtn} />
            <div className='cards-container'>
                {products.map((item) => (

                    <Card
                        name = {item.title}
                        image = {item.image}
                        category = {item.category}
                        description = {item.description}
                        price = {item.price}
                    />
                ))}
            </div>
        </div>
    )
}