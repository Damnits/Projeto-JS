
function calc_percent(data){

    let size = data.length
    let cont_other = 0
    let cont_vlike = 0
    let cont_like = 0
    let cont_slike = 0
    let cont_llike = 0
    let cont_nlike = 0
    let cont_nnlike = 0
    for(let i of data){
        if(i == 7||  i== 8||i == 9){
            cont_other +=1
        }
        else if(i == 1){
            cont_vlike += 1
        }
        else if(i == 2){
            cont_like += 1
        }
        else if(i == 3){
            cont_slike += 1
        }
        else if(i == 4){
            cont_llike += 1
        }
        else if(i == 5){
            cont_nlike += 1
        }
        else if(i == 6){
            cont_nnlike += 1
        }
    }
    x1 = porcent(cont_other, size)
    x2 = porcent(cont_vlike, size)
    x3 = porcent(cont_like, size)
    x4 = porcent(cont_llike, size)
    x5 = porcent(cont_slike, size)
    x6 = porcent(cont_nlike, size)
    x7 = porcent(cont_nnlike, size)
    return [x1, x2, x3, x4, x5, x6, x7]
}
function porcent(val, size){
    return (val*100/size).toFixed(2)
}
function selectCountry(country, json){
custom = []
    for(let i of json){
        if(country == i['country']){
          custom.push(i['impfree'])  
        }
    }
    return custom


}
// Funções assíncronas 
function set_options(url){
    fetch(url)
        .then(res => {return res.json()})
        .then(json => repeated(json))
}
function set_graphic(url, country){
    fetch(url)
        .then(res => {return res.json()})
        .then(json => selectCountry(country, json))
        .then(data => create_graphic(data))    
    }
function create_graphic(data){
        values_porc = calc_percent(data)
        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          exportEnabled: true,
          showInLegend: true,
          theme: "light1", // "light1", "light2", "dark1", "dark2"
          title:{
            text: `${country}`
          },
          data: [{
            type: "pie", //change type to bar, line, area, pie, etc
            indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: [
            {  y: values_porc[0], indexLabel: "Others*" },
        
            {  y: values_porc[1], indexLabel: "Very much like me" },

            { y:values_porc[2], indexLabel: "Like me" },

            { y:values_porc[3], indexLabel: "A little like me" },

            {y:values_porc[4], indexLabel: "Somewhat like me"},

            {y:values_porc[5], indexLabel: "Not like me"},

            {y:values_porc[6], indexLabel: "Not like me at all"}

            
            ]
          }]
        });
        chart.render();
        
}
function repeated(json){
    let countries = []
    let name_country = {
        "AT": 'Austria',
        "BE": 'Belgium',
        "BG": 'Bulgaria',
        "CH": 'Switzerland',
        "CY": 'Cyprus',
        "CZ": 'Czechia',
        "DE": 'Germany',
        "EE": 'Estonia',
        "FI": 'Finland',
        "FR": 'France',
        "GB": 'United Kingdom',
        "HU": 'Hungary',
        "IE": 'Ireland',
        "IT": 'Italy',
        "NL": 'Netherlands',
        "NO": 'Norway',
        "PL": 'Poland',
        "RS": 'Serbia',
        "SI": 'Slovenia'}
    let options = document.querySelector('#options-drop').innerHTML
    for(let i of json){
        if(countries.includes(i['country'])==false){
            countries.push(i['country'])
        }
    }   
    for(let i of countries){

        options = options +`\n<button class="dropdown-item" type="button" id="${i}">${name_country[i]}</button>`
    }
    document.querySelector('#options-drop').innerHTML = options

}

const url = 'http://127.0.0.1:8080/dataprocessed.json'

set_options(url)
// Carregador de eventos no caso selecionar uma opção
option = document.querySelector('#options-drop')
option.addEventListener('click', function(){
    if(event.target.id == 'options-drop'){
        return
    }
    else{
    country = document.querySelector('#options').textContent = event.target.textContent
    countrymin = document.querySelector('#options').value = event.target.id
    }
})

choose = document.querySelector('#choose')
choose.addEventListener('click', function(){
        
    set_graphic(url, countrymin)

})


