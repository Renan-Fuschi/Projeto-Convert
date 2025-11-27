const USD = 5.36
const EUR = 6.21
const GBP = 7.09


const amount = document.getElementById("amount")
const form = document.querySelector("form")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números
amount.addEventListener("input", (event) => {
    event.preventDefault()

    const onlyNumberRegex = /^\d+$/
    const hasCharacterRegex = /[^0-9]/g

    if(!onlyNumberRegex.test(amount.value)) {
        amount.value = amount.value.replace(hasCharacterRegex, "")
    }
})

// Captando o evento de submit do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    const currencyValue = currency.value
    const amountValue = amount.value

    switch (currency.value) {
        case "USD":
            convertCurrency(amountValue, USD, "US$")
            break
        case "EUR":
            convertCurrency(amountValue, EUR, "€")
            break
        case "GBP":
            convertCurrency(amountValue, GBP, "£")
            break
    }
}


    function convertCurrency(amountValue, currencyValue, symbol) {
        try {
            footer.classList.add("show-result")
        } catch (error) {
            console.log(error)
            footer.classList.remove("show-result")
            alert("Erro ao converter moeda, tente novamente.")
        }
    }