fetch('https://in3.dev/inv/')
    .then(response => response.json())
    .then(data => {

        document.querySelector('.serNr').textContent = 'Serijos NR.: ' + data.number;
        document.querySelector('.israsymoData').textContent = data.date;
        document.querySelector('.sumoketiIki').textContent = data.due_date;

        document.querySelector('.pardavejoPavadini').textContent = data.company.seller.name;
        document.querySelector('.pardavejoAdresas').textContent = data.company.seller.address;
        document.querySelector('.pardavejoImonesKodas').textContent = 'Įmonės kodas: ' + data.company.seller.code;
        document.querySelector('.pardavejoPvmKodas').textContent = 'PVM kodas: ' + data.company.seller.vat;
        document.querySelector('.pardavejoTelNr').textContent = 'Tel. numeris: ' + data.company.seller.phone;
        document.querySelector('.pardavejoEmail').textContent = 'El. paštas: ' + data.company.seller.email;

        document.querySelector('.pirkejoPavadini').textContent = data.company.buyer.name;
        document.querySelector('.pirkejoAdresas').textContent = data.company.buyer.address;
        document.querySelector('.pirkejoImonesKodas').textContent = 'Įmonės kodas: ' + data.company.buyer.code;
        document.querySelector('.pirkejoPvmKodas').textContent = 'PVM kodas: ' + data.company.buyer.vat;
        document.querySelector('.pirkejoTelNr').textContent = 'Tel. numeris: ' + data.company.buyer.phone;
        document.querySelector('.pirkejoEmail').textContent = 'El. paštas: ' + data.company.buyer.email;







        // Prekių sąrašas
        const prekeslenteleje = document.querySelector('#prekes');
        let tarpineSuma = 0;
        data.items.forEach(item => {
            const nuolaidosTipas = item.discount && item.discount.type ? item.discount.type : ' ';
            const nuolaidosDydis = item.discount && item.discount.value ? item.discount.value : '-';



            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price} €</td>
                    <td>${nuolaidosDydis} (${nuolaidosTipas})</td>
                    <td>${item.finalPrice} €</td>
                    
                `;
            prekeslenteleje.appendChild(row);
            // nuolaidos +=
            tarpineSuma += item.price * item.quantity;
        });


        document.querySelector('#transportoIslaidos').textContent = data.shippingPrice + ' €';

        // Tarpinė kaina, PVM ir galutinė kaina
        const pvmSuma = tarpineSuma * 0.21;
        // const visoSuma = tarpineSuma + pvmSuma + data.shippingPrice;
        // document.querySelector('#tarpineSuma').textContent = tarpineSuma + ' €';
        // document.querySelector('#pvm').textContent = pvmSuma.toFixed(2) + ' €';
        // document.querySelector('#galutineSuma').textContent = visoSuma.toFixed(2) + ' €';
    })
    .catch(error => console.error('Klaida gaunant duomenis iš API:', error));