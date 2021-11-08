import React from 'react'
import { useDispatch } from 'react-redux'
import { addSearch } from "../../actions"


function Header() {

    const dispatch = useDispatch()
    const [showSearch, setShowSearch] = React.useState(false)

    const handleInputChange = (val) => {
        dispatch(addSearch(val))
    }

    const clearSearch = () => {
        dispatch(addSearch(''))
        setShowSearch(false)
    }
    return (
        <header>
            <nav className="navbar fixed-top">
                <div className='container-fluid'>
                    {!showSearch && (
                        <React.Fragment>
                            <ul className='navbar-nav align-items-center flex-row'>
                                <li><img src={'static/images/Back.png'} alt='Back' className='back' /></li>
                                <li><div className='heading'>Romantic Videos</div></li>
                            </ul>
                            <img src={'static/images/search.png'} alt='Search' className='search' onClick={() => setShowSearch(!showSearch)} />
                        </React.Fragment>
                    )}
                    {showSearch && (
                        <div className="flex items-center w-100">
                            <input type="text" placeholder="Search" onChange={(e) => handleInputChange(e.target.value)} autoFocus />
                            <button className="btn btn-link" type="button" onClick={clearSearch}>Cancel</button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header