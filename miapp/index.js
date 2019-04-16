var express = require('express');
var app = express();
app.set('view engine', 'jade');
const fs = require('fs');

app.use(express.static('public'));

app.use(express.urlencoded({
    extended: false
}));



app.get('/', function (req, res) {
    res.send('Hola mundo! en Express :)');
});

app.post('/', function (req, res) {
    res.send('Llamada POST misma url');
});

app.put('/user', function (req, res) {
    res.send('Recibimos un PUT en /user');
});

app.delete('/', function (req, res) {
    res.send('Recibimos un DELETE en /user');
});

// DEMO

app.get('/demo/:n1/:n2', function (req, res) {
    let num1 = parseInt(req.params.n1);
    let num2 = parseInt(req.params.n2);
    let total = num1 + num2;
    let datos = {
        "n1": num1,
        "n2": num2,
        "tot": total
    }
    res.render("demo", datos);
});

app.post('/demo/sumar', function (req, res) {
    let n1 = parseInt(req.body.n1);
    let n2 = parseInt(req.body.n2);
    let suma = n1 + n2;
    res.send("Total es" + suma);
});




/*
    TAREA
*/

app.post('/calcular', function (req, res) {
    let basico = req.body.basico;
    let intermedio = req.body.intermedio;
    let avanzado = req.body.avanzado;
    let curso = req.body.curso;
    let pago = req.body.pago;

    let costo = 0;
    if (curso == 'java') {
        costo = 1200;
    } else if (curso == 'php'){
        costo = 800;
    } else {
        costo = 1500;
    }
    if (pago = 'efectivo'){
        costo = costo*0.9;
    }
    
    fs.readFile('./public/views/resultado.html', (err, html) => {
        let htmlString = html.toString();
        console.log(basico);
        if (basico !== undefined) {
            htmlString = htmlString.replace('{basico}', basico);
        } else {
            htmlString = htmlString.replace('{basico}', " ");
        }
        if (intermedio !== undefined) {
            htmlString = htmlString.replace('{intermedio}', intermedio);
        } else {
            htmlString = htmlString.replace('{intermedio}', " ");
        }
        if (avanzado !== undefined) {
            htmlString = htmlString.replace('{avanzado}', avanzado);
        } else {
            htmlString = htmlString.replace('{avanzado}', " ");
        }
        htmlString = htmlString.replace('{curso}', curso);
        res.writeHead(200, { 'Content-type': 'text' });
        res.write(htmlString);
        res.end();
    });
 //  res.send("Total es" + basico +" "+pago);
});


/*
    FIN TAREA
*/






app.use(function (req, res, next) {
    res.status(404).send("Eso no existe!");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Algo salio mal!');
});

app.listen(3000, function () {
    console.log('Aplicacion de ejemplo escuchando en el puerto 3000!');
});