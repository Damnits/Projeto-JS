// loading the functions we need
var fs = require("fs");
var d3 = require("d3");
// reading the file we will process
fs.readFile("dados/ESS9e01.1_F1.csv", "utf8", function(error, data) {  
    // this command we peer the data with the header
    data = d3.csvParse(data);
    clean = []
    //here i go through the data
     data.forEach(element => {
         //here i transform the data into a JSON archive
        clean.push({'country':element['cntry'],'impfree':element['impfree']})
    });
    // this command is to turn into string cause i need to write into a archive
    clean = JSON.stringify(clean)
    // and here i write the archive preprocessed XD
    fs.writeFile('dataprocessed.json',clean,function(err){
        console.log('Everything well')
    })
})
