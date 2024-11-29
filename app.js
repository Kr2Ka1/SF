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

// viršutiniai duomanys keičiaisi atnaujinus. pradžia baigta




        // Prekių sąrašas
        const prekeslenteleje = document.querySelector('#prekes');
        let tarpineSuma = 0;

        data.items.forEach(item => {
            const nuolaidosTipas = item.discount.value ? item.discount.value : 0;
            let nuolaida = 0;
            let nuolaidosDydis = "";

            if (item.discount && item.discount.value) {
                if (item.discount.type === 'fixed') {
                    nuolaida = item.discount.value; 
                    nuolaidosDydis = `${nuolaida} €`;
                } else if (item.discount.type === 'percentage') {
                    nuolaida = (item.price * nuolaidosTipas) / 100;
                    nuolaidosDydis = `${nuolaidosTipas}% (- ${nuolaida.toFixed(2)} €)`; 
                }
            }
        
          console.log(nuolaida);
          
            const kainaSuNuolaida = (item.price * item.quantity) - nuolaida;
            item.kainaSuNuolaida = kainaSuNuolaida.toFixed(2);

            tarpineSuma += parseFloat(item.kainaSuNuolaida);
           
            const row = document.createElement('tr');
            row.innerHTML = `
                    <td>${item.description}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price} €</td>
                    <td>${nuolaidosDydis}</td>
                    <td>${item.kainaSuNuolaida} €</td>
                    
                `;
            prekeslenteleje.appendChild(row);
            
            let tarpineKaina = tarpineSuma + data.shippingPrice;

            document.querySelector('#transportoIslaidos').textContent = data.shippingPrice + ' €';
        
            // Tarpinė kaina, PVM ir galutinė kaina
            const pvmSuma = tarpineKaina * 0.21;            
            const visoSuma = tarpineKaina + pvmSuma + data.shippingPrice;

            document.querySelector('#tarpineSuma').textContent = '' + tarpineKaina.toFixed(2) + ' €';
            document.querySelector('#pvm').textContent = '' + pvmSuma.toFixed(2) + ' €';
            document.querySelector('#galutineSuma').textContent = ' ' + visoSuma.toFixed(2) + ' €';
        });


       
    })
    .catch(error => console.error('Klaida gaunant duomenis iš API:', error));