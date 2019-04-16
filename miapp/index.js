var express = require('express');
var app = express();
app.set('view engine', 'jade');
const fs = require('fs');


var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies


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
    metodoPago = req.body.metodoPago;
    let costo = 0;
    let descuento = 0;
    if (curso == 'java') {
        costo = 1200;
    } else if (curso == 'php'){
        costo = 800;
    } else {
        costo = 1500;
    }

    
    fs.readFile('./public/views/resultado.html', (err, html) => {
        let htmlString = html.toString();
        cont = 0;
        if (basico !== undefined) {
            htmlString = htmlString.replace('{basico}', basico);
            cont++;
        } else {
            htmlString = htmlString.replace('{basico}', " ");
        }
        if (intermedio !== undefined) {
            htmlString = htmlString.replace('{intermedio}', intermedio);
            cont++;
        } else {
            htmlString = htmlString.replace('{intermedio}', " ");
        }
        if (avanzado !== undefined) {
            htmlString = htmlString.replace('{avanzado}', avanzado);
            cont++;
        } else {
            htmlString = htmlString.replace('{avanzado}', " ");
        }
        costo = costo*cont;
        if (metodoPago === 'efectivo'){
            descuento = costo*0.1;
        }
        let costoFinal = costo - descuento;
        htmlString = htmlString.replace('{curso}', curso);
        htmlString = htmlString.replace('{metodoPago}', metodoPago);
        htmlString = htmlString.replace('{costo}', costo);
        htmlString = htmlString.replace('{descuento}', descuento);
        htmlString = htmlString.replace('{costoFinal}', costoFinal);
        res.writeHead(200, { 'Content-type': 'text' });
        res.write(htmlString);
        res.end();
    });
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

app.listen(4000, function () {
    console.log('Aplicacion de ejemplo escuchando en el puerto 3000!');
});