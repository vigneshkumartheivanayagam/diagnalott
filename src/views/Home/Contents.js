import React from  'react'
import { useSelector } from 'react-redux'
import List from './List'

function Contents(props) {

    let contents = useSelector(state => state.contentReducer.contents)
    let filteredContents = useSelector(state => state.contentReducer.filtered)
    let searchKey = useSelector(state => state.contentReducer.searchKey)

    if (searchKey !== '') {
        contents = filteredContents
        window['scrollTo']({ top: 0, behavior: 'smooth' })
    }

    return (
        <React.Fragment>
            <div class='row'>
                {contents.length > 0 && (
                    contents.map((content, index) => {
                        return (
                            <List key={index} {...content} />
                        )
                    })
                )}
            </div>
        </React.Fragment>
    )
}

export default Contents