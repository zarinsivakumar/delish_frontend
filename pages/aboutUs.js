import styles from "./aboutUs.module.css"


export default function AboutUsPage() {
    return (
        <div className={styles.AboutUs}>
            <h1 className={styles.title}>About Us</h1>

            <p className={styles.text}>Welcome to Delish!</p>
            <br></br>
            <p className={styles.text}>Kinora, Zarin, Elena, Robin, Kerem and Thierry, these are members of Delish. Together we form a great team that creates delicious recipes for you to enjoy at home. We are teenagers who have fun while cooking and baking.</p>
            <img src="/team.jpg" className={styles.pic}></img>
        </div>
        
        )
}


