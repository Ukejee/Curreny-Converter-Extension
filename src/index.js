import axios from "../node_modules/axios";
//1
const host = "api.frankfurter.app";
const fromDropdown = document.querySelector(".from-items");
const toDropdown = document.querySelector(".to-items");
const amountEditBox = document.getElementById("famount");
const exchangedValue = document.getElementById("exchanged-value");
const submitBtn = document.getElementById("convert-btn");

async function getAvailableCurrencies(){
    try {
        await axios
                .get(`https://${host}/currencies`)
                .then((response) => {
                
                        for(let prop in response.data){
                                var fromOption = document.createElement("option");
                                var toOption  = document.createElement("option");
                                fromOption.text = response.data[prop];
                                fromOption.value = prop;

                                toOption.text = response.data[prop];
                                toOption.value = prop;

                                fromDropdown.add(fromOption);
                                toDropdown.add(toOption);
                        }
                })
        } catch (e) {
                console.log(e);
        }
}

async function convertCurrency(){

        if(fromDropdown.value == "item-1"){
                alert("Select a currency to convert from")       
        }
        else if(toDropdown.value == "item-1"){
                alert("Select a currency to convert to");
        }
        else if(amountEditBox.value == null || amountEditBox.value == ""){
                alert("Enter amount to be converted")
        }
        else{
                try{
                        var amount = amountEditBox.value;
                        var fromCurrency = fromDropdown.value;
                        var toCurrency = toDropdown.value;

                        await axios
                        .get(`https://${host}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
                        .then((response) => {
                                exchangedValue.textContent = `${response.data.rates[toCurrency]} ${toCurrency}`
                        })
                }
                catch(e){
                        console.log(e);
                }
        }
}


window.onload = function(){
        getAvailableCurrencies();
};

//getAvailableCurrencies();
submitBtn.addEventListener("click", convertCurrency);
