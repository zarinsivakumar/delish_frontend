import { useState } from "react";

import session from "lib/session.js"

import styles from "./Header.module.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";




export default function Header({session}) {



    const [open, setOpen] = useState(false)
    const myFunction = () => {

        console.log(open)

        setOpen(!open)

    }


    return (


        <header className={styles.topnav}>

            <a className={styles.active} href="/">Home</a>

            <a onClick={myFunction} className={styles.icon}>

                <FontAwesomeIcon icon={faBars} style={{ fontSize: 32 }} />

            </a>

            {open && <div className={styles.myLinks}>

                {session.user && <a className={styles.menuItem} href="/favorite"> Favorite</a>}


                <a className={styles.menuItem} href="/overview"> Overview</a>

                <a className={styles.menuItem} href="/aboutUs"> About Us</a>

            {

            }
                <a className={styles.menuItem} href="/login"> Login</a>


            </div>}
            <img className={styles.logo} src="/logo.PNG"></img>





        </header>



    )

}
