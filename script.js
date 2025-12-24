//insert an array to store item that the user adds to the cart
let cart= [];
//function to add a product to the cart when the user click to the button
function AddToCart(productName,event){
    const button= event.currentTarget;
    const buttonText=button.querySelector('.buttontext');
    const circle= button.querySelector('.circle');
//add class to activate a visual effect when adding the product
    button.classList.add("added");
//temporarily hide the bottun after clicking on it
    setTimeout(()=>{
        button.style.display="none";},
    800);
    //show the bottun again after a short time
    setTimeout(()=>{
        button.style.display="flex";
    button.classList.remove("added")},
    1200);

//get the parent element to access the selected size
    const wrapper= button.closest('.Wrapper1');
    const selectElement= wrapper.querySelector('select');
    const selectedSize= selectElement.value;
//check if a size was selected before adding to cart
    if (!selectedSize||selectedSize==="choose the size") {
        alert("please chose size")
        return;
    }
    //get the price based on the selected size
    let price=getPriceFromSize(selectElement,selectedSize);
    //add the product to the cart
    cart.push({name: productName, size: selectedSize, price: price});
    //update the cart display on the page
    updateCart();}

       //function to get the price from the selected option in the dropdown 
    function getPriceFromSize(selectElement,selectedSize){
        const selectedOption= selectElement.querySelector(`option[value="${selectedSize}"]`);
        if (selectedOption){
            const match= selectedOption.textContent.match(/([\d.]+)\s*BD/);
            if (match){
                //convert the price to a decimal number
                return parseFloat(match[1]); }
        }
        //return 0 if the price could not found
        return 0;
    }
    //function to update the cart display and total price
function updateCart(){
    const cartItemList= document.getElementById("cartitems");
    const totalPrice= document.getElementById("total-price");
    //clear old cart items before re-display them
    cartItemList.innerHTML="";

    let total=0;
    cart.forEach(item =>{
        //creat an {li} fro each product in the cart and display it
    const li= document.createElement("li");
    li.textContent=`${item.name} - ${item.size} - ${item.price} BD`;
    cartItemList.appendChild(li);
    //add up price to calculate the total
    total+= item.price;
     });
     //display the total price on the page
     totalPrice.textContent=`Total: ${total.toFixed(2)} BD`;
     //print the cart content to the consol 
     console.log(cart);
}
//function to show or hide the cart box when the cart button click
function toggleCart(){
    const cartBox= document.getElementById("cartbox");
    cartBox.style.display= cartBox.style.display=== "none"? "block": "none";
}
