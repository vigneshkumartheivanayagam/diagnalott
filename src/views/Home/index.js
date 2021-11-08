import React from 'react'
import axios from 'axios'
import Header from '../Header'
import { useDispatch, useSelector } from 'react-redux'
import { addContents } from "../../actions"
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import useInView from "react-cool-inview"

function Home(props) {

    const dispatch = useDispatch()
    let hasMore = React.useRef(true)
    let page = React.useRef(1)
    const [loading, setLoading] = React.useState(false)

    let contents = useSelector(state => state.contentReducer.contents)
    let filteredContents = useSelector(state => state.contentReducer.filtered)
    let searchKey = useSelector(state => state.contentReducer.searchKey)

    if (searchKey !== '') {
        contents = filteredContents
        window['scrollTo']({ top: 0, behavior: 'smooth' })
    }

    React.useEffect(() => {
        window['scrollTo']({ top: 0, behavior: 'smooth' })
        getContent()
        return () => {
            page.current = 1
            hasMore.current = true
        }
    }, [])


    const { observe } = useInView({
        rootMargin: "50px 0px",
        onEnter: ({ unobserve, observe }) => {
            unobserve();
            getContent()
            observe();
        },
    });

    const getContent = async () => {

        if (!loading && hasMore.current) {
            setLoading(true)
            try {
                if (page.current === 1) {
                    dispatch(addContents([]))
                }
                let url = 'data/CONTENTLISTINGPAGE-PAGE' + page.current+'.json'
                const result = await axios.get(url);
                if (result !== undefined && result !== null && result.status !== undefined && result.status !== null && result.status === 200 && result.data !== undefined && result.data !== null && result.data.page !== undefined && result.data.page !== null && result.data.page['content-items'] !== undefined && result.data.page['content-items'] !== null && result.data.page['content-items'].content !== undefined && result.data.page['content-items'].content !== null && result.data.page['content-items'].content.length > 0) {
                    page.current = parseInt(page.current) + 1
                    dispatch(addContents(result.data.page['content-items'].content))
                } else {
                    hasMore.current = false
                }
                setLoading(false)
            } catch(e) {
                hasMore.current = false
                setLoading(false)
            }
        }
    }


    return (
        <React.Fragment>
            <Header />
            <div className="container contentsection" id='content'>
                <div className='row'>
                    {contents.length > 0 && (
                        contents.map((content, index) => {
                            return (
                                <div className="col-4 content-card" ref={index === contents.length - 1 ? observe : null} key={'list-'+index}>
                                    <div className=" relative">
                                        <div className=" inset-0  w-full">
                                            <LazyLoadImage
                                                alt={'...'}
                                                effect="blur"
                                                src={'static/images/' + content['poster-image']}
                                                placeholderSrc={'static/images/placeholder_for_missing_posters.png'}
                                                className="posterimg overflow-hidden"
                                                height='150px'
                                                width='100px'
                                            />
                                            <div className="flex flex-col">
                                                <h2 className="content-name">{content.name}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </React.Fragment>
        
    )
}

export default Home