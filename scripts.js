// Captando os elementos do DOM
const amount = document.getElementById("amount")
const form = document.querySelector("form")
const options = document.getElementById("options")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")
const convertBtn = document.getElementById("convert-btn")

const currencyConverter = document.getElementById("currency-converter")
const speedConverter = document.getElementById("speed-converter")
const temperatureConverter = document.getElementById("temperature-converter")
const lengthConverter = document.getElementById("length-converter")
const weightConverter = document.getElementById("weight-converter")
const converters = {
    currency: currencyConverter,
    speed: speedConverter,
    temperature: temperatureConverter,
    length: lengthConverter,
    weight: weightConverter,
}

amount.addEventListener("input", () => {
    const onlyNumberRegex = /^\d*\.?\d*$/
    const hasCharacterRegex = /[^0-9.]/g

    if (!onlyNumberRegex.test(amount.value)) {
        amount.value = amount.value.replace(hasCharacterRegex, "")
    }
})


function showConverter(type) {
    Object.entries(converters).forEach(([converterType, converter]) => {
        const isActive = converterType === type

        converter.style.display = isActive ? "flex" : "none"
        converter.style.flexDirection = isActive ? "column" : "none"
        converter.style.gap = isActive ? "10px" : "none"
        converter.style.alignItems = isActive ? "center" : "none"
        converter.querySelectorAll("input, select").forEach((field) => {
            field.disabled = !isActive
        })
    })
    
    switch(type) {
        case 'currency':
            convertBtn.textContent = 'Converter em reais'
            break
        case 'speed':
            convertBtn.textContent = 'Converter velocidade'
            break
        case 'temperature':
            convertBtn.textContent = 'Converter temperatura'
            break
        case 'length':
            convertBtn.textContent = 'Converter comprimento'
            break
        case 'weight':
            convertBtn.textContent = 'Converter peso'
            break
    }
}


options.addEventListener('change', () => {
    showConverter(options.value)
    footer.classList.remove("show-result")
})

showConverter('currency')

async function getExchangeRate(from) {
    try {
        const response = await fetch(
            `https://api.frankfurter.dev/v1/latest?from=${from}&to=BRL`
        )

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()

        return {
            rate: data.rates.BRL,
            date: data.date
        }

    } catch (error) {
        console.error("Erro real:", error)
        return null
    }
}

form.onsubmit = async (event) => {
    event.preventDefault()

    const amountValue = amount.value

    if (!amountValue) {
        alert("Digite um valor para converter.")
        return
    }

    const converterType = options.value
    
    result.textContent = "Carregando..."
    footer.classList.add("show-result")

    try {
        switch(converterType) {
            case 'currency':
                await handleCurrencyConversion(amountValue)
                break
            case 'speed':
                handleSpeedConversion(amountValue)
                break
            case 'temperature':
                handleTemperatureConversion(amountValue)
                break
            case 'length':
                handleLengthConversion(amountValue)
                break
            case 'weight':
                handleWeightConversion(amountValue)
                break
        }
    } catch (error) {
        footer.classList.remove("show-result")
        alert("Erro na conversão: " + error.message)
    }
}

async function handleCurrencyConversion(amountValue) {
    const currency = document.getElementById("currency")
    
    if (!currency.value) {
        alert("Selecione uma moeda.")
        return
    }

    let symbol = ""

    switch (currency.value) {
        case "USD": symbol = "US$"; break
        case "EUR": symbol = "€"; break
        case "GBP": symbol = "£"; break
        case "CHF": symbol = "CHF"; break
        case "JPY": symbol = "¥"; break
        case "CNY": symbol = "¥"; break
        case "CAD": symbol = "C$"; break
        case "AUD": symbol = "A$"; break
        case "ARS": symbol = "AR$"; break
        case "CLP": symbol = "CL$"; break
        case "UYU": symbol = "UY$"; break
        case "MXN": symbol = "MX$"; break
        case "KRW": symbol = "¥"; break
        case "INR": symbol = "₹"; break
        case "RUB": symbol = "₽"; break
        case "ZAR": symbol = "R"; break
        case "TRY": symbol = "₺"; break
        case "NOK": symbol = "kr"; break
        case "SEK": symbol = "kr"; break
        case "DKK": symbol = "kr"; break
        default:
            alert("Moeda inválida.")
            return
    }

    const data = await getExchangeRate(currency.value)

    if (!data) {
        footer.classList.remove("show-result")
        alert("Erro ao buscar cotação ")
        return
    }

    convertCurrency(amountValue, data.rate, symbol, data.date)
}

function convertCurrency(amountValue, currencyValue, symbol, date) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(currencyValue)} (Cotação de ${date})`

        const total = Number(amountValue) * currencyValue

        if (isNaN(total)) {
            alert("Erro ao converter moeda, digite um valor válido.")
            return
        }

        result.textContent = formatCurrencyBRL(total)

    } catch (error) {
        footer.classList.remove("show-result")
        console.log(error)
        alert("Erro ao converter moeda, tente novamente.")
    }
}

function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}

function handleSpeedConversion(amountValue) {
    const fromSpeed = document.getElementById("from-speed").value
    const toSpeed = document.getElementById("to-speed").value
    
    if (fromSpeed === toSpeed) {
        description.textContent = `Mesma unidade selecionada`
        result.textContent = Number(amountValue).toFixed(2) + " " + toSpeed
        return
    }
    
    let valueInMS = Number(amountValue)
    switch(fromSpeed) {
        case "km/h": valueInMS = valueInMS / 3.6; break
        case "mph": valueInMS = valueInMS * 0.44704; break
        case "knots": valueInMS = valueInMS * 0.514444; break
        case "mach": valueInMS = valueInMS * 343; break
        case "m/s": break;
    }
    
    let finalValue = valueInMS
    switch(toSpeed) {
        case "km/h": finalValue = valueInMS * 3.6; break
        case "mph": finalValue = valueInMS / 0.44704; break
        case "knots": finalValue = valueInMS / 0.514444; break
        case "mach": finalValue = valueInMS / 343; break
        case "m/s": break;
    }
    
    description.textContent = `${amountValue} ${fromSpeed} =`
    result.textContent = finalValue.toFixed(4) + " " + toSpeed
}

function handleTemperatureConversion(amountValue) {
    const fromTemp = document.getElementById("from-temp").value
    const toTemp = document.getElementById("to-temp").value
    
    if (fromTemp === toTemp) {
        description.textContent = `Mesma unidade selecionada`
        result.textContent = Number(amountValue).toFixed(2) + " " + toTemp
        return
    }
    
    let valueInCelsius = Number(amountValue)
    switch(fromTemp) {
        case "fahrenheit": valueInCelsius = (valueInCelsius - 32) * 5/9; break
        case "kelvin": valueInCelsius = valueInCelsius - 273.15; break
        case "celsius": break;
    }
    
    let finalValue = valueInCelsius
    switch(toTemp) {
        case "fahrenheit": finalValue = (valueInCelsius * 9/5) + 32; break
        case "kelvin": finalValue = valueInCelsius + 273.15; break
        case "celsius": break; 
    }
    
    const symbols = {celsius: "°C", fahrenheit: "°F", kelvin: "K"}
    description.textContent = `${amountValue} ${symbols[fromTemp]} =`
    result.textContent = finalValue.toFixed(2) + " " + symbols[toTemp]
}

function handleLengthConversion(amountValue) {
    const fromLength = document.getElementById("from-length").value
    const toLength = document.getElementById("to-length").value
    
    if (fromLength === toLength) {
        description.textContent = `Mesma unidade selecionada`
        result.textContent = Number(amountValue).toFixed(2) + " " + toLength
        return
    }
    
    let valueInMeters = Number(amountValue)
    switch(fromLength) {
        case "km": valueInMeters = valueInMeters * 1000; break
        case "ft": valueInMeters = valueInMeters * 0.3048; break
        case "in": valueInMeters = valueInMeters * 0.0254; break
        case "mi": valueInMeters = valueInMeters * 1609.344; break
        case "yd": valueInMeters = valueInMeters * 0.9144; break
        case "cm": valueInMeters = valueInMeters / 100; break
        case "mm": valueInMeters = valueInMeters / 1000; break
        case "m": break; 
    }
    
    let finalValue = valueInMeters
    switch(toLength) {
        case "km": finalValue = valueInMeters / 1000; break
        case "ft": finalValue = valueInMeters / 0.3048; break
        case "in": finalValue = valueInMeters / 0.0254; break
        case "mi": finalValue = valueInMeters / 1609.344; break
        case "yd": finalValue = valueInMeters / 0.9144; break
        case "cm": finalValue = valueInMeters * 100; break
        case "mm": finalValue = valueInMeters * 1000; break
        case "m": break; 
    }
    
    description.textContent = `${amountValue} ${fromLength} =`
    result.textContent = finalValue.toFixed(4) + " " + toLength
}

function handleWeightConversion(amountValue) {
    const fromWeight = document.getElementById("from-weight").value
    const toWeight = document.getElementById("to-weight").value
    
    if (fromWeight === toWeight) {
        description.textContent = `Mesma unidade selecionada`
        result.textContent = Number(amountValue).toFixed(2) + " " + toWeight
        return
    }
    
    let valueInKg = Number(amountValue)
    switch(fromWeight) {
        case "g": valueInKg = valueInKg / 1000; break
        case "lb": valueInKg = valueInKg * 0.453592; break
        case "oz": valueInKg = valueInKg * 0.0283495; break
        case "mg": valueInKg = valueInKg / 1000000; break
        case "t": valueInKg = valueInKg * 1000; break
        case "kg": break;
    }
    
    let finalValue = valueInKg
    switch(toWeight) {
        case "g": finalValue = valueInKg * 1000; break
        case "lb": finalValue = valueInKg / 0.453592; break
        case "oz": finalValue = valueInKg / 0.0283495; break
        case "mg": finalValue = valueInKg * 1000000; break
        case "t": finalValue = valueInKg / 1000; break
        case "kg": break;
    }
    
    description.textContent = `${amountValue} ${fromWeight} =`
    result.textContent = finalValue.toFixed(4) + " " + toWeight
}
