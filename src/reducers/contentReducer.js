const initialState = {
    contents: [],
    filtered: [],
    searchKey: ''
}

function contentReducer(state = initialState, action) {

    switch (action.type) {
        case "ADD_CONTENTS":
            return { ...state, contents: [...state.contents, ...action.data] };
        case "ADD_SEARCH":
            let searchedKeyWord = action.data
            let contents = state.contents
            contents = contents.filter(content => ((content.name.toLowerCase().indexOf(searchedKeyWord.toLowerCase()) > -1)));
            return { ...state, filtered: contents, searchKey: searchedKeyWord };
        default:
            return state;
    }

}

export default contentReducer;