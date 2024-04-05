import {menuArray} from './data.js'

const menuItems = document.getElementById('menuItems')
const footerBox = document.getElementById('footerBox')
const date = new Date();
const orderItemsArr = document.getElementById('orderItemsArr')
const totalPrice = document.getElementById('totalPrice');
const orderBox = document.getElementById('orderBox')
const completeOrderBtn = document.getElementById('completeOrderBtn')
const paymentBox = document.getElementById('paymentBox')
const paymentCloseBtn = document.getElementById('paymentCloseBtn')
const totalPaymentAmt = document.getElementById('totalPaymentAmt')
const paymentBtn = document.getElementById('paymentBtn')

const orderedItemsObj = {   }
let total = 0






// Rendering the Menu

let menuHtml = ``

menuArray.forEach(function({name, ingredients, id, price, emoji}){
    menuHtml += 
    `<div class="itemBox">
        <div class="column1"> 
            <img
                src="./images/icon-${id}.png"
                alt="${name.toLowerCase()}-img"
                width="50px"
            />
            <div>
                <h5 class="itemName"> ${name} </h5>
                <p class="ingredients"> ${ingredients.join(', ')}</p>
                <p> $${price}</p>
            </div>
        </div>
        <div class="column2">
            <button class="incBtn" id="incBtn-${id}">
            </button>
        </div>
    </div>`
})

menuItems.innerHTML = menuHtml


// Add Item to Checkout
document.addEventListener('click',function(e){
    //To check the click of incBtn only
    if(e.target.id.includes('incBtn')){
        // in orderedItemsObj we store {itemName : [count,  price, id]
        let pressedId = (e.target.id)
        menuArray.forEach(function({name, ingredients, id, price, emoji}){
            if (pressedId === `incBtn-${id}`){
                if (orderedItemsObj[name]){
                    orderedItemsObj[name][0] += 1;
                    
                }else{
                    orderedItemsObj[name] = [1,price,id];
                }
            }
        })

        renderOrder()
    }
})


//To remove from your order
document.addEventListener('click',function(e){
    //To check the click of removeBtn only
    if(e.target.id.includes('removeBtn')){
        // we get the name from the menu and delete it from orderedItemsArr
        let pressedId = (e.target.id)
        menuArray.forEach(function({name, ingredients, id, price, emoji}){
            if (pressedId === `removeBtn-${id}`){
                delete orderedItemsObj[`${name}`]
            }
            renderOrder()
        })
        
    }
})


//To render the order
function renderOrder(){
    
    // To get total we multiply forEach Item => ( count * price of item)
    let tempTotal = 0
    for(let name in orderedItemsObj){
        tempTotal += orderedItemsObj[name][0] * orderedItemsObj[name][1] 
    }
    total = tempTotal
    //console.log(orderedItemsObj, total)

    
    // To update the items in Your Order Section
    let orderItemsHtml = ``
    for(let name in orderedItemsObj){
        //console.log(name)
        orderItemsHtml += 
        `<div class='orderItem' >  
            <div>
                <p> ${name} -----  ${orderedItemsObj[name][0]}  
                <button 
                class="removeBtn"
                id = "removeBtn-${orderedItemsObj[name][2]}"
                >remove</button></p>
            </div>
            <p>$${(orderedItemsObj[name][0])*(orderedItemsObj[name][1])}</p>
        </div>`
    }
    orderItemsArr.innerHTML = orderItemsHtml
    totalPrice.textContent = `$${total}`
    if(Object.keys(orderedItemsObj).length > 0){
        orderBox.classList.remove('hidden')        
    }else{
        orderBox.classList.add('hidden')
    }
}



// Complete Order -> Card details
completeOrderBtn.addEventListener('click',function(){
    
    paymentBox.classList.remove('hidden')
    orderBox.classList.add('hidden');
    totalPaymentAmt.textContent=`$${total}`
})

// close card details -> show bill details  
paymentCloseBtn.addEventListener('click',function(){
    paymentBox.classList.add('hidden')
    orderBox.classList.remove('hidden');    
})

//Complete Payment -> display order confirmation
paymentBtn.addEventListener('click',function(e){
    //Confirmation message
    if(document.getElementById('userName').value && document.getElementById('userCardNum').value && document.getElementById('userCardCVC').value){
        e.preventDefault()
        orderBox.innerHTML = `<p class="OrderName"> Thanks, <span class="nameCapital" id="nameValue"></span>! Your order is on its way!</p>`
        document.getElementById('nameValue').textContent = (document.getElementById('userName').value)
        paymentBox.classList.add('hidden')
        orderBox.classList.remove('hidden'); 
        orderBox.classList.add('orderPadding')
    }
})


// Footer Section

footerBox.innerHTML = `<p>©️ Coder's Pizza ©️  ${date.getFullYear()} ©️</p>`


