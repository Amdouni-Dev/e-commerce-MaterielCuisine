import {createSlice} from '@reduxjs/toolkit'

// const initialCartData = localStorage.getItem('carta2');
let initialCart = [];

const initialCartData = localStorage.getItem('carta2');
const addDecimals=(num)=>{
    // nadhreb fel 100 bech n7awel l virgule aal lmin martyn bech n9areb le3dal lel 3dad eli a9rablou
    // w ba3 ne9sem bech nraja3ha
    return (Math.round (num*100)/100 ).toFixed(2) // tofixed traja3li nombre decimal b zouz ar9am ba3d l , hata ken mefamech ar9am ba3d l fasel traja3 zouz
}
if (initialCartData) {
    try {
        initialCart = JSON.parse(initialCartData);
    } catch (error) {
        // En cas d'erreur de parsing JSON, initialCart reste un tableau vide.
        console.error("Erreur lors de la conversion JSON : ", error);
    }
}
const initialState={
    cartItems: [],
    cartTotalQuantity:0,
    cartAmount:0,
    shippingAddress:{},
    paymentMethod:"",
    itemsPrice:0,
    shippingPrice:0,
    taxPrice:0,
    totalPrice:0,
};
const cartSlice=createSlice(  {
    name: 'cart',
    initialState,
    reducers:{ // houni bech nhot les actions appliqués sur la carte
        addToCart(state, action) {
            let doesItemExist = false;
            state.cartItems = state.cartItems.map((item) => {
                if (item._id === action.payload._id) {
                    item.quantity += 1;
                    doesItemExist = true;
                }
                return item;
            });
            if (!doesItemExist) {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }

            state.cartTotalQuantity=state.cartItems.reduce( (total,item)=>  total+item.quantity,0 )
            state.cartAmount=state.cartItems.reduce( (amount,item)=> amount+(item.quantity*item.price),0 )
            state.shippingPrice=addDecimals(
                state.cartItems >100 ? 0 : 100
            )
            state.taxPrice=addDecimals(Number (  (0.15*state.cartAmount).toFixed(2) )  )
            state.totalPrice=(
                Number(state.cartAmount)+
                Number(state.shippingPrice)+
                Number(state.taxPrice)
            ).toFixed(2)
            localStorage.setItem("cartItemsV",JSON.stringify(state.cartItems))
            console.log("cartItemsVVVVVVV")
            const cartItemsJson=localStorage.getItem("cartItemsV")

            if(cartItemsJson){
                const cartItemsN=JSON.parse(cartItemsJson)
                console.log("*************ID*****************",cartItemsN[0]._id)
            }
            else{
                console.log("Aucune valeur dans la carte")
            }


            console.log(localStorage.getItem("cartItemsV"))
            console.log("cartItemsVVVVVVV")






        },

changeQuantityPlus(state,action) {
            state.cartItems=state.cartItems.map( (item)=>{
                if(item._id===action.payload._id) {
                    item.quantity+=1
                    state.cartTotalQuantity=state.cartItems.reduce( (total,item)=>  total+item.quantity,0 )
                    state.cartAmount=state.cartItems.reduce( (amount,item)=> amount+(item.quantity*item.price),0 )
                    state.shippingPrice=addDecimals(
                        state.cartItems >100 ? 0 : 100
                    )
                    state.taxPrice=addDecimals(Number (  (0.15*state.cartAmount).toFixed(2) )  )
                    state.totalPrice=(
                        Number(state.cartAmount)+
                        Number(state.shippingPrice)+
                        Number(state.taxPrice)
                    ).toFixed(2)
                }
                return item;
            })
    localStorage.setItem("cartItemsV",JSON.stringify(state.cartItems))
    console.log("cartItemsVVVVVVV")
    console.log(localStorage.getItem("cartItemsV"))
    console.log("cartItemsVVVVVVV")
},
        changeQuantityMoins(state,action) {
            state.cartItems=state.cartItems.map( (item,index)=>{
                if(item._id===action.payload._id) {
                    item.quantity-=1
                    console.log("777777777777777777777777777777777777777777777777777777")
                    // state.cartItems[action.payload._id].quantity-=1
console.log( JSON.parse( JSON.stringify(state.cartItems[index])) )
                    console.log("777777777777777777777777777777777777777777777777777777")

                    state.cartTotalQuantity=state.cartItems.reduce( (total,item)=>  total+item.quantity,0 )
                    state.cartAmount=state.cartItems.reduce( (amount,item)=> amount+(item.quantity*item.price),0 )
                    state.shippingPrice=addDecimals(
                        state.cartItems >100 ? 0 : 100
                    )
                    state.taxPrice=addDecimals(Number (  (0.15*state.cartAmount).toFixed(2) )  )
                    state.totalPrice=(
                        Number(state.cartAmount)+
                        Number(state.shippingPrice)+
                        Number(state.taxPrice)
                    ).toFixed(2)
                }
                return item;
            })
            localStorage.setItem("cartItemsV",JSON.stringify(state.cartItems))
            console.log("cartItemsVVVVVVV")
            console.log(localStorage.getItem("cartItemsV"))
            console.log("cartItemsVVVVVVV")
        }

        ,
        removeProduct(state, action) {
            const indexToRemove = state.cartItems.findIndex(item => item._id === action.payload._id);

            if (indexToRemove !== -1) {
                const removedItem = state.cartItems[indexToRemove];
                state.cartItems.splice(indexToRemove, 1);

                // Recalculer la quantité totale et le montant total
                state.cartTotalQuantity -= removedItem.quantity;
                state.cartAmount -= removedItem.quantity * removedItem.price;
                state.shippingPrice=addDecimals(
                    state.cartItems >100 ? 0 : 100
                )
                state.taxPrice=addDecimals(Number (  (0.15*state.cartAmount).toFixed(2) )  )
                state.totalPrice=(
                    Number(state.cartAmount)+
                    Number(state.shippingPrice)+
                    Number(state.taxPrice)
                ).toFixed(2)
            }

            localStorage.setItem("cartItemsV",JSON.stringify(state.cartItems))
            console.log("cartItemsVVVVVVV")
            console.log(localStorage.getItem("cartItemsV"))
            console.log("cartItemsVVVVVVV")
        }
        ,
saveShippingaddress(state,action){

            state.shippingAddress =action.payload
},
        savePaymentMethod(state,action){
            state.paymentMethod = action.payload
        },
        viderCarte(){
            return{
                ...initialState,
            }
        }



//
//
//             // state fiha l'etat , action : bech yjoun fiha les données illi associés lel action
// console.log("Test action id ...")
//
//         const itemIndex=    state.cartItems.findIndex(  (item)=>item._id=== action.payload._id )
//             if(itemIndex>=0 ){  // yaani kenou true yaani ken mawjoud fel carta
//                 state.cartItems[itemIndex].cartQuantity+=1
//             }
//        else{
//
//             const tempProduct={...action.payload,cartQuantity:1}
//             // state.cartItems.push(action.payload);// nekhou l'etat mte3 l carta w nhot fiha les données ili jebtehm bel action
//             state.cartItems.push(tempProduct);}
//
//
//             state.cartTotalQuantity = state.cartItems.reduce((total, item) => total + item.cartQuantity, 0);
//
//             localStorage.setItem("qty",state.cartTotalQuantity)
//        localStorage.setItem('carta',JSON.stringify( state.cartItems))
//             console.log("Cartaaa")
// console.log(  JSON.parse( localStorage.getItem('carta')))
//             console.log("Cartaaa")


    },
} );
export const {addToCart,changeQuantityPlus,changeQuantityMoins,removeProduct,saveShippingaddress,savePaymentMethod,viderCarte} =cartSlice.actions;
export default cartSlice.reducer;
