const fs = require('fs');
//console.log('hello');


//Blocking syncronizing way
const textIn = fs.readFileSync('./text/abc.txt', 'utf-8');
//console.log(textIn);

const textOut = `This shows the respect for avacado: ${textIn}. \nCreated on ${Date(Date.now)}`;
fs.writeFileSync('./text/output.txt', textOut);


//non-blocking asyncronizing way
fs.readFile('./text/first.txt', 'utf-8',(err, data1) => {
    if (err) return console.log('Error!');
    
    fs.readFile(`./text/${data1}.txt`, 'utf-8',(err, data2) => {
        console.log(data2);
        fs.readFile('./text/another.txt', 'utf-8',(err, data3) => {
            console.log(data3);
            fs.writeFile('./text/final.txt', `${data2}\n${data3}`, 'utf-8', err =>{
                console.log('Fianl file is ready');
            });
            
        });
    });
});

console.log('This will show first bcoz i am not blocking the code.');