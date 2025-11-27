const amount = document.getElementById("amount")
const form = document.querySelector("form")
const currency = document.getElementById("currency")

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

    console.log(currency.value)
    
}