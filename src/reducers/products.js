const initialstate = [];

const product_reducer = (state=initialstate,action)=>{
    switch(action.type){
        case 'set_products':
           return action.payload;
        default:
           return state;
    }
}

export default product_reducer;