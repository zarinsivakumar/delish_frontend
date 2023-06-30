
import styles from "./index.module.css"
import { deleteRecipe, updateRecipe, createRecipe, getRecipeById, getAllRecipes, getFavorites, deleteFavorite } from "@lib/api";
import { useEffect, useState } from "react";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FavoritePage({ session }) {

    const [recipes, setRecipes] = useState([])


    useEffect(() => {
        if (!session.user || !session.user.id) return
        const load = async () => {
            setRecipes(await getFavorites(session.user.id, session.accessToken))
        }
        load()
    }, [session])


    const removeFavorite = async (recipeId) => {
        deleteFavorite(session.user.id, recipeId, session.accessToken);
        alert("Favorite Removed")
    }

    return (

        <div className={styles.index}>

            <h1 className={styles.title}>Favorites</h1>
            {
                recipes.map(recipe => (

                    <div key={recipe.id} className={styles.card}>
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
                        <img src= "/x.png" className={styles.xbutton} onClick={() => removeFavorite(recipe.id)}  ></img>
                    </div>

                ))
            }

        </div>

    )
}