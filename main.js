const form = document.querySelector('form');
const calculateButton = document.querySelector("button");
const res = document.getElementById('res');
const input = document.querySelector("#inputValue");

calculateButton.addEventListener("click", result);

let clearButton = document.createElement('button');
clearButton.textContent = `Limpar`;
clearButton.addEventListener("click", clear);

function result(e) {
    e.preventDefault();
    res.innerHTML = ``;
    fetch('http://economia.awesomeapi.com.br/last/USD-BRL,GBP-BRL')
        .then(response => response.json())
        .then(data => {
            if (input.value != '' && input.value != 0 && input.value > 0) {
                form.appendChild(clearButton);
                let ul = document.createElement('ul');
                let li = document.createElement('li');
                let BRL = document.createElement('p');
                BRL.innerHTML = `Real = R$ ${input.value}`;
                let li2 = document.createElement('li');
                let USD = document.createElement('p');
                USD.innerHTML = `USD (Dólar americano) = $ ${parseFloat(input.value / data.USDBRL.bid).toFixed(2)}`;
                let li3 = document.createElement('li');
                let GBP = document.createElement('p');
                GBP.innerHTML = `GBP (Libra esterlina) = £$ ${parseFloat(input.value / data.GBPBRL.bid).toFixed(2)}`;

                li.appendChild(BRL);
                ul.appendChild(li);

                li2.appendChild(USD);
                ul.appendChild(li2);

                li3.appendChild(GBP);
                ul.appendChild(li3);

                res.appendChild(ul);
            }
            else {
                alert("Type the correct value!");
                input.value = `0`;
            }
        })
        .catch(err => console.log(err.json()));
}
function clear(e) {
    e.preventDefault();
    clearButton.remove();
    input.value = `0`;
    res.innerHTML = ``;
}