import { faList, faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllRecipes } from "@lib/api"
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react"
import styles from "./overview.module.css"



export default function OverviewPage({ session }) {
    const search = "";

    const router = useRouter()
    const [recipes, setRecipes] = useState([])
    const [filterdRecipes, setFilteredRecipes] = useState(recipes)


    useEffect(() => {
    
        const loadRecipes = async () => {
            try {
                const recipes = await getAllRecipes()
                setRecipes(recipes)
                setFilteredRecipes(recipes)
            } catch (e) {
                console.error(e)
                alert("Could not load recipes!")
            }
        }
        loadRecipes()
    }, []);

    const handleChange = (e) => {
        var search = e.target.value.toLowerCase()
        setFilteredRecipes(recipes.filter(recipe => recipe.name.toLowerCase().includes(search)))


        console.log(search)

    }

    return (
        <>

            <div className={styles.input}>
                <h3 className={styles.title}>Search:</h3>
                <input className={styles.search} onChange={handleChange}></input>
            </div>


            <div className={styles.index} >
                {
                    filterdRecipes && [...filterdRecipes].map(recipe => (

                        <div key={recipe.id} className={styles.card}onClick={() => router.push(`/recipes/${recipe.id}`)}>
                            <img className={styles.image} src={recipe.image}></img>
                            <h3>{recipe.name}</h3>

                            <div className={styles.ratings}>

                                <p>Difficulty <span>
                                    {
                                        [...Array(recipe.rating).keys()].map(i => (
                                            <FontAwesomeIcon className={styles.checked} icon={faStar} style={{ fontSize: 16 }} />

                                        ))
                                    }
                                </span>
                                </p>
                            </div>

                            <p>Needed time: {recipe.time}</p>
                        </div>

                    ))
                }



            </div>
        </>)


}