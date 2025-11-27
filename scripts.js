// Moedas
const USD = 5.36
const EUR = 6.21
const GBP = 7.09
const CHF = 6.65

// Captando os elementos do DOM
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
        case "CHF":
            convertCurrency(amountValue, CHF, "CHF")
            break
    }
}

// Converte a moeda selecionada para Real Brasileiro
    function convertCurrency(amountValue, currencyValue, symbol) {
        try {
            // Atualiza e exibe a cotação da moeda selecionada
            description.textContent = `${symbol} 1 = ${formatCurrencyBRL(currencyValue)}`
            
            // Calcula o valor convertido
            let total = amountValue * currencyValue

            if(isNaN(total)) {
                return alert("Erro ao converter moeda, digite um valor válido.")
            }

            //Formata o valor convertido
            total = formatCurrencyBRL(total).replace("R$", "")

            // Exibe o valor convertido
            result.textContent = `${total} Reais`

            // Aplica a classe que exibe o footer com o resultado
            footer.classList.add("show-result")
        } catch (error) {

            //Remove a classe do footer, removendo ele da tela
            footer.classList.remove("show-result")
            console.log(error)
            alert("Erro ao converter moeda, tente novamente.")
        }
    }

// Formata a moeda em Real Brasileiro
    function formatCurrencyBRL(value) {
        // Converte o valor para número para que possa ser formatado
        return Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })
    }