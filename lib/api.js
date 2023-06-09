import { text } from "@fortawesome/fontawesome-svg-core"

const URL = "http://localhost:8080"

export async function login({ username, password }) {
    const response = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getAllRecipes() {
    const response = await fetch(`${URL}/recipes`, {
        headers: {
            "content-type": "application/json"
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getRecipeById(id) {
    const response = await fetch(`${URL}/recipes/${id}`, {
        headers: {
            "content-type": "application/json",
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getFavorites(id, token) {
    const response = await fetch(`${URL}/favorites/${id}`, {
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getQuantityAndAmount(recipeId, ingredientId) {
    const response = await fetch(`${URL}/ingredients/quantity/${recipeId}/${ingredientId}`, {
        headers: {
            "content-type": "application/json",
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function getIngredientByRecipeId(id) {
    const response = await fetch(`${URL}/ingredients/recipe/${id}`, {
        headers: {
            "content-type": "application/json",
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}


export async function getIngredientById(id) {
    const response = await fetch(`${URL}/ingredients/${id}`, {
        headers: {
            "content-type": "application/json",
        },
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function createRecipe(recipe, token) {
    const response = await fetch(`${URL}/recipes`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(recipe)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function addFavorite(favorites, token) {
    const response = await fetch(`${URL}/favorites`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(favorites)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function updateRecipe(recipe, token) {
    const response = await fetch(`${URL}/recipes/${recipe.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(recipe)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function deleteFavorite(userId, recipeId, token) {
    const response = await fetch(`${URL}/favorites/${userId}/${recipeId}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }
}