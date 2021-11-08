import React from 'react'
import axios from 'axios'
import Header from '../Header'
import Contents from './Contents'
import { useDispatch } from 'react-redux'
import { addContents } from "../../actions"

function Home(props) {

    const dispatch = useDispatch()
    let hasMore = React.useRef(true)
    let page = React.useRef(1)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        window['scrollTo']({ top: 0, behavior: 'smooth' })

        setTimeout(function() {
            getContent()
        }, 1000)

        return () => {
            page.current = 1
            hasMore.current = true
        }
    }, [])

    const getContent = async () => {

        if(!loading) {
            setLoading(true)
            try {
                if (hasMore.current) {
                    let url = 'data/CONTENTLISTINGPAGE-PAGE' + page.current+'.json'
                    const result = await axios.get(url);
                    if (result !== undefined && result !== null && result.status !== undefined && result.status !== null && result.status === 200 && result.data !== undefined && result.data !== null && result.data.page !== undefined && result.data.page !== null && result.data.page['content-items'] !== undefined && result.data.page['content-items'] !== null && result.data.page['content-items'].content !== undefined && result.data.page['content-items'].content !== null && result.data.page['content-items'].content.length > 0) {
                        page.current = parseInt(page.current) + 1
                        dispatch(addContents(result.data.page['content-items'].content))
                    } else {
                        hasMore.current = false
                    }
                    setLoading(false)
                }
            } catch(e) {
                hasMore.current = false
                setLoading(false)
            }
        }
    }

    const handleScroll = (e) => {
        // if (window.innerHeight + window.scrollY >= (document.body.offsetHeight - 10)) {
        //     alert("Condition satisfied")
        //     getContent()
        // }

        var pageHeight = document.documentElement.offsetHeight,
            windowHeight = window.innerHeight,
            scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

        // document.getElementById("val").innerHTML = pageHeight + ',' + windowHeight + ',' + scrollPosition;


        if (pageHeight <= windowHeight + scrollPosition) {
            alert('At the bottom');
            getContent()
        }
    };

    return (
        <React.Fragment>
            <Header />
            <div className="container contentsection ">
                <Contents getContent={getContent} />
            </div>
        </React.Fragment>
        
    )
}

export default Home