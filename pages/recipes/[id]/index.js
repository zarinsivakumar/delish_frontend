
import { useRouter } from "next/router"
import { getIngredientById, getIngredientByRecipeId, getRecipeById, getQuantityAndAmount, addFavorite } from "@lib/api"
import { useRedirectToLogin } from "@lib/session"
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { faHeart } from "@fortawesome/free-solid-svg-icons"



export default function IndexRecipePage({ session }) {
    useRedirectToLogin(session)

    const router = useRouter();
    const { id } = router.query
    const [amount, setAmount] = useState(4)
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [ingredients, setIngredients] = useState([])
    const [quantitiesAndAmounts, setQuantitiesAndAmounts] = useState([])





    useEffect(() => {
        if (!id) return
        const loadRecipe = async () => {
            try {
                const recipe = await getRecipeById(id, session.accessToken)
                setRecipe(recipe)
            } catch (e) {
                if (e.status === 404) router.push("/")
            }
        }
        loadRecipe()
    }, [id, router])



    const addFavorites = async () => {
        if (!session.isLoggedIn()) {
            router.push("/login")
            return
        }
        addFavorite({ "login": { "id": session.user.id }, "recipe": { "id": parseInt(id) } }, session.accessToken);
        alert("Added New Favorite ")
    }

    useEffect(() => {
        if (!id) return
        const loadIngredients = async () => {
            try {

                const ingredients = await getIngredientByRecipeId(id, session.accessToken)
                const loadQuantitiesAndAmounts = []
                for (const ingredient of ingredients) {
                    //TODO request -> save in list (quantitiesAndAmounts)
                    const quantityAndAmount = await getQuantityAndAmount(id, ingredient.id)
                    loadQuantitiesAndAmounts.push(quantityAndAmount)
                }
                setQuantitiesAndAmounts(loadQuantitiesAndAmounts);

                setIngredients(ingredients)
                setLoading(false)
                console.log(loadQuantitiesAndAmounts)
            } catch (e) {
                if (e.status === 404) router.push("/")
            }
        }
        loadIngredients()
    }, [id, router])

    function extround(zahl) {
        zahl = (Math.round(zahl * 100) / 100);
        return zahl;
    }


    return (
        <div className={styles.index}>
            {recipe &&
                <div>
                    <h1 className={styles.title}>{recipe.name}</h1>
                    <img className={styles.pic} src={`/${recipe.image}`}></img>


                    <h2 className={styles.instructions}>ingredients:</h2>

                    <div className={styles.addPeople}>
                        <p className={styles.ppl}>Number of People</p>
                        <p className={styles.symbol}>  <button onClick={() => setAmount(amount - 1)} className={styles.button}> - </button> {amount}
                            <button onClick={() => setAmount(amount + 1)} className={styles.button} > + </button> </p>


                    </div>

                    <div className={styles.ingredientlist}>

                        {!loading && ingredients.map((i, index) => {

                            if (quantitiesAndAmounts[index].amount == 0) {
                                return <p className={styles.ingredients} key={i.id}>{quantitiesAndAmounts[index].quantity.name} {i.name}</p>
                            } else {
                                return <p className={styles.amount} key={i.id}>{extround(amount * quantitiesAndAmounts[index].amount).toFixed(2)} {quantitiesAndAmounts[index].quantity.name} {i.name}</p>
                                
                            }



                        })}

                    </div>



                    <h2 className={styles.instructions}>instructions:</h2>

                    <div className={styles.text} dangerouslySetInnerHTML={{ __html: recipe.instruction }}></div>
                    <img src= "/heart.png" className={styles.favButton} onClick={() => addFavorites()}  ></img>
                </div>

            }

        </div>

    )
}

