const initState = {};

export default  function addId(state = initState,action) {
    switch (action.type){
        case 'ADD_ID':{
            return action;
        }
        default:
            return state ;
    }
}

