
import { login } from "@lib/api";
import { useRouter } from "next/router";
import { useState } from "react"
import styles from "./login.module.css"


const model = {
    username: "",
    password: ""
}


export default function LoginPage({ session }) {

    const [user, setUser] = useState(model);
    const router = useRouter();


    const handleChange = (e) => {
        if (e.target.name === "username") {
            setUser({ ...user, username: e.target.value })
        }
        if (e.target.name === "password") {
            setUser({ ...user, password: e.target.value })
        }

    }

    const submitForm = async (e) => {
        const resp = await login(user)
        session.login(resp)
        router.push("/")

    }


    return (

        <div className={styles.posts}>

            <h1 className={styles.logintitle}>login</h1>

            <div className={styles.container}>

                <a href="/"><img src="/avatar.png"></img></a>
                <label className={styles.font} >Username:</label>
                <input className={styles.font} type="text" name="username" onChange={handleChange} value={user.username} />

                <label className={styles.font}>Password:</label>
                <input className={styles.font} type="password" name="password" onChange={handleChange} value={user.password} />

                <button className={styles.login} onClick={submitForm} >Login</button>

            </div>
        </div>
    )
}