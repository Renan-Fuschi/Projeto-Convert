const amount = document.getElementById("amount")

// Manipulando o input amount para receber somente números
amount.addEventListener("input", (event) => {
    event.preventDefault()

    const onlyNumberRegex = /^\d+$/
    const hasCharacterRegex = /[^0-9]/g
    
    if(!onlyNumberRegex.test(amount.value)) {
        amount.value = amount.value.replace(hasCharacterRegex, "")
    }
})