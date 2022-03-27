const initialstate = [];

const permission_reducer = (state=initialstate,action)=>{
    switch(action.type){
        case 'set_permissions':
           return action.payload;
        default:
           return state;
    }
}

export default permission_reducer;