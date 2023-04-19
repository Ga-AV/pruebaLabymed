const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database:'crudga',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err)
    console.log('Conexión establecida correctamente');
    else
    console.log('Connexión fallida' + JSON.stringify(err,undefined,2));
});

const port = process.env.PORT || 8080;
app.listen(port,() => console.log(`Escuchando puerto ${port}..`));

app.get('/buscarEstudiante', (req,res) => {
    mysqlConnection.query('SELECT * FROM Estudiantes', (err,rows,fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.get('/buscarCursos', (req,res) => {
    mysqlConnection.query('SELECT * FROM Cursos', (err,rows,fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.post('/crearEstudiante', (req,res) => {
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var nivel = req.body.nivel;
    var seccion = req.body.seccion;

    mysqlConnection.query('INSERT INTO Estudiantes(nombre,apellido,nivel,seccion) values(?,?,?,?)',[nombre,apellido,nivel,seccion], (err,rows,fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.post('/crearCurso', (req,res) => {
    var nombreCurso = req.body.nombreCurso;
    var idGrado = req.body.idGrado;
    var idCarrera = req.body.idCarrera;
    var catedratico = req.body.catedratico;

    mysqlConnection.query('INSERT INTO Cursos(nombreCurso,idGrado,idCarrera,catedratico) values(?,?,?,?)',[nombreCurso,idGrado,idCarrera,catedratico], (err,rows,fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.get('/datosEstudiante2/:idEstudiante', (req,res) => {
    mysqlConnection.query('SELECT * FROM Estudiantes WHERE idEstudiante = ?', [req.params.idEstudiante], (err,rows,fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

app.get('/datosEstudiante/:idEstudiante', (req,res) => {
    mysqlConnection.query('SELECT E.idEstudiante, E.nombre, E.apellido, E.nivel, E.seccion, C.idCurso, C.nombreCurso, C.idGrado, C.idCarrera, C.catedratico FROM Estudiantes E, Cursos C, CursoEstudiante A WHERE A.idEstudiante = ? AND A.idEstudiante = E.idestudiante AND C.idCurso = A.idCurso', [req.params.idEstudiante], (err,rows,fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});


app.delete('/eliminarEstudiante/:idEstudiante', (req,res) => {
    mysqlConnection.query('DELETE FROM Estudiantes WHERE idEstudiante = ?', [req.params.idEstudiante], (err,rows,fields) => {
        if(!err)
        res.send('Eliminado exitosamente');
        else
        console.log(err);
    })
});

app.put('/actualizarEstudiante', (req,res) => {
    var nombre = req.body.nombre;
    var idEstudiante = req.body.idEstudiante;
    mysqlConnection.query('UPDATE Estudiantes SET nombre=? WHERE idEstudiante=?',[nombre,idEstudiante], (err,rows,fields) => {
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

