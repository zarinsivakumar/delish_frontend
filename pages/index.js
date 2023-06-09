import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper";
import styles from "./index.module.css"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getAllRecipes } from "@lib/api";
import Router, { useRouter } from "next/router";


export default function IndexPage({session}) {

    const router = useRouter();
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const recipes = await getAllRecipes()
                setRecipes(recipes)
            } catch (e) {
                console.error(e)
                alert("Could not load recipes!")
            }
        }
        loadRecipes()
    }, []);



    return (


        <div className={styles.index}>
            <br />
            <h1 className={styles.text2}>Swipe to find your next meal.</h1>

        
            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className={styles.swiper}
            >

                { recipes && [...recipes].sort( () => .5 - Math.random() ).slice(0,10).map(recipe => (
                    <SwiperSlide className={styles.swiperSlide}><img onClick={() => router.push(`/recipes/${recipe.id}`)} src={recipe.image} ></img></SwiperSlide>
                ))}
        

            </Swiper>


            <h1 className={styles.text}>Still can’t decide what you want to cook today? Here you can find our most popular recipes:</h1>
            <br />


            {
                recipes && recipes.slice(0,5).map(recipe => (


                    <div key={recipe.id} className={styles.card}>
                        <img className={styles.image} src={recipe.image}></img>
                        <h1>{recipe.name}</h1>

                        <div className={styles.ratings}>
                        <p>Difficulty <span>
                            {
                                [...Array( recipe.rating).keys()].map(i => (
                                    <FontAwesomeIcon className={styles.checked} icon={faStar}style={{ fontSize: 16 }} />
                                   
                                ))
                            }
                                      </span>
                            </p>
                        </div>

                        <p>Needed time: {recipe.time}</p>
                        <p><button onClick={() => Router.push(`/recipes/${recipe.id}`)} className={styles.button}> Click for Recipe</button></p>
                    </div>

                )) 
            }



        </div>

    )

}
