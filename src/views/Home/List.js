import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function List(props) {
    return (
        <div className="col-4 content-card">
            <div className=" relative">
                <div className=" inset-0  w-full">
                    {/* <img className=" w-full object-cover object-center" src={process.env.REACT_APP_IMG_URL + props['poster-image']} /> */}
                    <LazyLoadImage
                        alt={'...'}
                        effect="blur"
                        src={'static/images/' + props['poster-image']}
                        placeholderSrc={'static/images/placeholder_for_missing_posters.png'}
                        className="posterimg overflow-hidden"
                        height='150px'
                        width='100px'
                    />
                    <div className="flex flex-col">
                        <h2 className="content-name">{props.name}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List