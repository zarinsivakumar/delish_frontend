
import Header from "@components/Header"
import "swiper/css/bundle";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import useSession from "@lib/session";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
    const session = useSession()
    const newPageProps = {
        ...pageProps,
        session
    }
    return (
        <>
            <div id="root">
                <Header {...newPageProps}></Header>
                <Component  {...newPageProps} />
            </div>
        </>

    )
}
