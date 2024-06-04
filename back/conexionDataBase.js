const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const app = express();
const path = require('path');
const fontkit = require('@pdf-lib/fontkit');
require('dotenv').config();

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const bcrypt = require('bcrypt');
const saltRounds = 10;

//const CryptoJS = require("crypto-js");
//const secretKeyAES = process.env.SECRET_KEY;

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'n0m3l0',
  database: 'bureau-manager'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Conexión a la base de datos MySQL establecida');
});

// Configurar body-parser para manejar solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Permitir solicitudes CORS desde cualquier origen
app.use(cors());

const { PDFDocument, rgb } = require('pdf-lib');

async function crearPDFImagen(datos){
  const imagePath = path.join(__dirname, './formato_recibo.PNG');
  const fontPath = path.join(__dirname, './Arial.ttf');
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const [width, height] = [612, 792]; //tamaño de una hoja tamaño carta
  const page = pdfDoc.addPage([width, height]);

  const imagenBytes = fs.readFileSync(imagePath);
  const imagen = await pdfDoc.embedPng(imagenBytes);

  const scaleX = width / imagen.width;
  const scaleY = (height/2) / imagen.height;
  const scale = Math.min(scaleX, scaleY);

  page.drawImage(imagen,{
    x:0,
    y:height/2,
    width:imagen.width*scale,
    height:imagen.height*scale,
  });

  const fontColor = rgb(0, 0, 0);
  const font = await pdfDoc.embedFont(fs.readFileSync(fontPath));
  const colorRed = rgb(1, 0, 0);
  const textwidthdir = font.widthOfTextAtSize(datos.direccion_condominio || '', 8);
  const textwidthNC = font.widthOfTextAtSize(`${datos.nombre_condominio} - ${datos.nombre_edificio}` || '', 11);
  const textwidthTPL = font.widthOfTextAtSize(`SON: (${datos.total_pagar_letra})` || '', 9);
  const nombre_completo_inquilino = datos.nombre_inquilino + ' ' + datos.apellino_paterno_inquilino + ' ' + datos.apellino_materno_inquilino;

  page.drawText(nombre_completo_inquilino || '', {x: 125,y: height - 133,size: 13,color: fontColor,font: font});
  page.drawText(datos.direccion_condominio || '', {x: width-textwidthdir-20,y: height - 76,size: 8,color: fontColor,font: font});
  page.drawText(datos.no_recibo || '', {x: 532,y: height - 63,size: 13,color: colorRed,font: font});
  page.drawText(`${datos.nombre_condominio} - ${datos.nombre_edificio}` || '', {x: width-textwidthNC-20,y: height - 89,size: 11,color: fontColor,font: font});
  page.drawText(datos.mes_pago || '', {x: 390,y: height - 105,size: 10,color: fontColor,font: font});
  page.drawText(datos.numero_departamento || '', {x: 532,y: height - 133,size: 13,color: colorRed,font: font});
  page.drawText('$', {x: 125,y: height - 165,size: 10,color: fontColor,font: font});
  page.drawText(datos.cuota_ordinaria || '', {x: 254,y: height - 165,size: 10,color: fontColor,font: font});
  page.drawText(datos.concepto_pago || '', {x: 125,y: height - 187,size: 10,color: fontColor,font: font});
  page.drawText('$', {x: 125,y: height - 208,size: 10,color: fontColor,font: font});
  page.drawText(datos.cuota_adeudos || '', {x: 254,y: height - 208,size: 10,color: fontColor,font: font});
  page.drawText('$', {x: 125,y: height - 230,size: 10,color: fontColor,font: font});
  page.drawText(datos.cuota_extraordinaria || '', {x: 254,y: height - 230,size: 10,color: fontColor,font: font});
  page.drawText('$', {x: 125,y: height - 253,size: 10,color: fontColor,font: font});
  page.drawText(datos.cuota_penalizacion || '', {x: 254,y: height - 253,size: 10,color: fontColor,font: font});
  page.drawText('$', {x: 125,y: height - 275,size: 10,color: fontColor,font: font});
  page.drawText(datos.cuota_reserva || '', {x: 254,y: height - 275,size: 10,color: fontColor,font: font});
  page.drawText('$', {x: 127,y: height - 302,size: 10,color: fontColor,font: font});
  page.drawText(datos.total_pagar || '', {x: 187,y: height - 302,size: 10,color: fontColor,font: font});
  page.drawText(`SON: (${datos.total_pagar_letra})` || '', {x: width-textwidthTPL-70,y: height - 302,size: 9,color: fontColor,font: font});
  page.drawText(datos.admin_condominio || '', {x: 16,y: height - 348,size: 10,color: fontColor,font: font});
  page.drawText(datos.fecha || '', {x: 410,y: height - 331,size: 10,color: fontColor,font: font});

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

async function crearPDFImagenMultiple(datosList){
  const fontPath = path.join(__dirname, './Arial.ttf');
  const imagePath = path.join(__dirname, './formato_recibo.PNG');
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const font = await pdfDoc.embedFont(fs.readFileSync(fontPath));
  const fontColor = rgb(0, 0, 0);
  const colorRed = rgb(1, 0, 0);
  const [width, height] = [612, 792];
  const imagenBytes = fs.readFileSync(imagePath);
  const imagen = await pdfDoc.embedPng(imagenBytes);

  datosList.forEach((datos) => {
    const page = pdfDoc.addPage([width, height]);
    const scaleX = width / imagen.width;
    const scaleY = (height/2) / imagen.height;
    const scale = Math.min(scaleX, scaleY);
    const textwidthdir = font.widthOfTextAtSize(datos.direccion_condominio || '', 8);
    const textwidthNC = font.widthOfTextAtSize(`${datos.nombre_condominio} - ${datos.nombre_edificio}` || '', 11);
    const textwidthTPL = font.widthOfTextAtSize(`SON: (${datos.total_pagar_letra})` || '', 9);
    const nombre_completo_inquilino = datos.nombre_inquilino + ' ' + datos.apellino_paterno_inquilino + ' ' + datos.apellino_materno_inquilino;

    page.drawImage(imagen,{
      x:0,
      y:height/2,
      width:imagen.width*scale,
      height:imagen.height*scale,
    });

    page.drawText(nombre_completo_inquilino || '', {x: 125,y: height - 133,size: 13,color: fontColor,font: font});
    page.drawText(datos.direccion_condominio || '', {x: width-textwidthdir-20,y: height - 76,size: 8,color: fontColor,font: font});
    page.drawText(datos.no_recibo || '', {x: 532,y: height - 63,size: 13,color: colorRed,font: font});
    page.drawText(`${datos.nombre_condominio} - ${datos.nombre_edificio}` || '', {x: width-textwidthNC-20,y: height - 89,size: 11,color: fontColor,font: font});
    page.drawText(datos.mes_pago || '', {x: 390,y: height - 105,size: 10,color: fontColor,font: font});
    page.drawText(datos.numero_departamento || '', {x: 532,y: height - 133,size: 13,color: colorRed,font: font});
    page.drawText('$', {x: 125,y: height - 165,size: 10,color: fontColor,font: font});
    page.drawText(datos.cuota_ordinaria || '', {x: 254,y: height - 165,size: 10,color: fontColor,font: font});
    page.drawText(datos.concepto_pago || '', {x: 125,y: height - 187,size: 10,color: fontColor,font: font});
    page.drawText('$', {x: 125,y: height - 208,size: 10,color: fontColor,font: font});
    page.drawText(datos.cuota_adeudos || '', {x: 254,y: height - 208,size: 10,color: fontColor,font: font});
    page.drawText('$', {x: 125,y: height - 230,size: 10,color: fontColor,font: font});
    page.drawText(datos.cuota_extraordinaria || '', {x: 254,y: height - 230,size: 10,color: fontColor,font: font});
    page.drawText('$', {x: 125,y: height - 253,size: 10,color: fontColor,font: font});
    page.drawText(datos.cuota_penalizacion || '', {x: 254,y: height - 253,size: 10,color: fontColor,font: font});
    page.drawText('$', {x: 125,y: height - 275,size: 10,color: fontColor,font: font});
    page.drawText(datos.cuota_reserva || '', {x: 254,y: height - 275,size: 10,color: fontColor,font: font});
    page.drawText('$', {x: 127,y: height - 302,size: 10,color: fontColor,font: font});
    page.drawText(datos.total_pagar || '', {x: 187,y: height - 302,size: 10,color: fontColor,font: font});
    page.drawText(`SON: (${datos.total_pagar_letra})` || '', {x: width-textwidthTPL-70,y: height - 302,size: 9,color: fontColor,font: font});
    page.drawText(datos.admin_condominio || '', {x: 16,y: height - 348,size: 10,color: fontColor,font: font});
    page.drawText(datos.fecha || '', {x: 410,y: height - 331,size: 10,color: fontColor,font: font});
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}


// Endpoint para manejar solicitudes POST
//███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
app.post('/api/registrarCuenta', (req, res) => {
  console.log(req.body);
  const { nombre_administrador, apellido_paterno_administrador, apellido_materno_administrador, correo_administrador, contraseña_administrador } = req.body;

  // Primero, verifica si el correo ya está registrado
  connection.query(
    'SELECT correo_administrador FROM administrador WHERE correo_administrador = ?',
    [correo_administrador],
    async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Error al verificar el correo electrónico');
      }

      if (results.length > 0) {
        return res.status(400).send('Ya existe una cuenta con el correo electrónico registrado');
      }
      const hasheo = await bcrypt.hash(contraseña_administrador, saltRounds);

      const sql = `INSERT INTO administrador (nombre_administrador, apellido_paterno_administrador, apellido_materno_administrador, correo_administrador, contraseña_administrador) VALUES (?, ?, ?, ?, ?)`;
      const values = [nombre_administrador, apellido_paterno_administrador, apellido_materno_administrador, correo_administrador, hasheo];

      connection.query(sql, values, error => {
        if (error) {
          console.log(error);
          return res.status(500).send('Error al registrar la cuenta');
        }
        res.send("Cuenta registrada exitosamente");
      });
    }
  );
});


app.post('/api/registrarDepartamento', (req, res) => { 
  console.log("-------------------------------")
  console.log(req.body);
  const { id_edificio, numero_departamento } = req.body;
  const sql = `INSERT INTO departamento (id_edificio, numero_departamento) VALUES (?, ?)`;
  const values = [id_edificio, numero_departamento];
  connection.query(sql, values, error => {
    if (error) console.log(error);
    res.send("200");
  });
});

app.post('/api/registrarCondominio', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { nombre_condominio, direccion_condominio , admin_condominio,id_administrador} = req.body;
  const sql = `INSERT INTO condominio (nombre_condominio, direccion_condominio, admin_condominio,id_administrador) VALUES (?, ?, ?, ?)`;
  const values = [nombre_condominio, direccion_condominio, admin_condominio,id_administrador];
  connection.query(sql, values, error => {
    if (error) console.log(error);
    res.send("200");
  });
});

app.post('/api/registrarEdificio', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { id_condominio, nombre_edificio } = req.body;
  const sql = `INSERT INTO edificio (id_condominio, nombre_edificio) VALUES (?, ?)`;
  const values = [id_condominio, nombre_edificio];
  connection.query(sql, values, error => {
    if (error) console.log(error);
    res.send("200");
  });
});


app.post('/api/registrarInquilino', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { id_departamento, nombre_inquilino, apellino_paterno_inquilino, apellino_materno_inquilino, correo_inquilino, codigo_inquilino } = req.body;
  const sql = `INSERT INTO inquilino (id_departamento, nombre_inquilino, apellino_paterno_inquilino, apellino_materno_inquilino, correo_inquilino, codigo_inquilino) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [id_departamento, nombre_inquilino, apellino_paterno_inquilino, apellino_materno_inquilino, correo_inquilino, codigo_inquilino];
  connection.query(sql, values, error => {
    if (error) console.log(error);
    res.send("200");
  });
});

app.post('/api/registrarRecibo', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const recibos = Array.isArray(req.body) ? req.body : [req.body];
  /*const nombre_completo_inquilinoAES = CryptoJS.AES.encrypt(nombre_completo_inquilino, secretKeyAES).toString();
  const cuota_ordinariaAES = CryptoJS.AES.encrypt(cuota_ordinaria, secretKeyAES).toString();
  const cuota_extraordinariaAES = CryptoJS.AES.encrypt(cuota_extraordinaria, secretKeyAES).toString();
  const cuota_penalizacionAES = CryptoJS.AES.encrypt(cuota_penalizacion, secretKeyAES).toString();
  const cuota_reservaAES = CryptoJS.AES.encrypt(cuota_reserva, secretKeyAES).toString();
  const cuota_adeudosAES = CryptoJS.AES.encrypt(cuota_adeudos, secretKeyAES).toString();*/
  const sql = `INSERT INTO reciboCompleto (id_condominio, id_edificio, id_departamento, id_inquilino, nombre_completo_inquilino, no_recibo, fecha, fecha_formateada, mes_pago, concepto_pago, cuota_ordinaria, cuota_penalizacion, cuota_extraordinaria, cuota_reserva, cuota_adeudos, total_pagar, total_pagar_letra, id_administrador) VALUES ?`;
  const values = recibos.map(recibo => [
    recibo.id_condominio, recibo.id_edificio, recibo.id_departamento, recibo.id_inquilino, recibo.nombre_completo_inquilino, recibo.no_recibo, recibo.fecha, recibo.fecha_formateada, recibo.mes_pago, recibo.concepto_pago, recibo.cuota_ordinaria, recibo.cuota_penalizacion, recibo.cuota_extraordinaria, recibo.cuota_reserva, recibo.cuota_adeudos, recibo.total_pagar, recibo.total_pagar_letra, recibo.id_administrador
  ]);
  connection.query(sql, [values], error => {
    if (error) console.log(error);
    res.send("200");
  });
});


app.post('/api/registrarInfoPagosCompleto', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const pagos = Array.isArray(req.body) ? req.body : [req.body];
  const query = `INSERT INTO infopagos (id_administrador, id_condominio, id_edificio, id_inquilino, no_recibo, total_pagado, adeudo, fecha_pago) VALUES ?`;
  const values = pagos.map(pago => [
    pago.id_administrador, pago.id_condominio, pago.id_edificio, pago.id_inquilino, pago.no_recibo,pago.total_pagado, pago.adeudo, pago.fecha_pago
  ]);
  connection.query(query, [values], error => {
    if (error) console.log(error);
    res.send("200");
  })
});

app.post('/api/registrarCuotas', (req, res) => {
  console.log(req.body);
  let { id_condominio, id_edificio, cuota_base, cuota_extra } = req.body;
  if(cuota_extra === ''){
    cuota_extra = null;
  }
  const sql = 'INSERT INTO admin_cuotas (id_condominio, id_edificio, cuota_base, cuota_extra) VALUES (?, ?, ?, ?)';
  const values = [id_condominio, id_edificio, cuota_base, cuota_extra];
  connection.query(sql, values, error => {
    if(error){
      console.log(error);
      res.status(500).send('Error al registrar las cuotas');
    };
    res.status(200).send('Registro exitoso de cuotas');
  });
});


app.post('/api/enviarRecibosCorreoElectronico', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const lista = req.body;
  
  for (let i = 0; i < lista.length; i++) {
    const elemento = lista[i];
    const query = `
      SELECT 
        rc.id_recibo,
        rc.id_condominio,
        rc.id_departamento,
        rc.id_inquilino,
        rc.nombre_completo_inquilino,
        rc.fecha_formateada,
        rc.mes_pago,
        rc.no_recibo,
        rc.concepto_pago,
        rc.cuota_ordinaria,
        rc.cuota_penalizacion,
        rc.cuota_extraordinaria,
        rc.cuota_reserva,
        rc.cuota_adeudos,
        rc.total_pagar,
        rc.total_pagar_letra,
        c.nombre_condominio,
        c.direccion_condominio,
        c.admin_condominio,
        e.nombre_edificio,
        d.numero_departamento,
        i.nombre_inquilino,
        i.apellino_paterno_inquilino,
        i.apellino_materno_inquilino
      FROM 
        reciboCompleto AS rc 
      INNER JOIN departamento AS d ON rc.id_departamento = d.id_departamento 
      INNER JOIN edificio AS e ON d.id_edificio = e.id_edificio 
      INNER JOIN condominio AS c ON e.id_condominio = c.id_condominio 
      INNER JOIN inquilino AS i ON rc.id_inquilino = i.id_inquilino
      WHERE
        rc.id_recibo = ?
    `;
    connection.query(query,[elemento], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al enviar los correos');
      } else {

       const datos = {
          id_recibo: results[0].id_recibo,
          id_condominio: results[0].id_condominio,
          id_departamento: results[0].id_departamento,
          id_inquilino: results[0].id_inquilino,
          //nombre_completo_inquilino: CryptoJS.AES.decrypt(results[0].nombre_completo_inquilino, secretKey).toString(CryptoJS.enc.Utf8),
          nombre_completo_inquilino: results[0].nombre_completo_inquilino,
          fecha: results[0].fecha_formateada,
          mes_pago: results[0].mes_pago,
          no_recibo: results[0].no_recibo,
          concepto_pago: results[0].concepto_pago,
          //cuota_ordinaria: CryptoJS.AES.decrypt(results[0].cuota_ordinaria, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_ordinaria: results[0].cuota_ordinaria,
          //cuota_penalizacion: CryptoJS.AES.decrypt(results[0].cuota_penalizacion, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_penalizacion: results[0].cuota_penalizacion,
          //cuota_extraordinaria: CryptoJS.AES.decrypt(results[0].cuota_extraordinaria, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_extraordinaria: results[0].cuota_extraordinaria,
          //cuota_reserva: CryptoJS.AES.decrypt(results[0].cuota_reserva, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_reserva: results[0].cuota_reserva,
          //cuota_adeudos: CryptoJS.AES.decrypt(results[0].cuota_adeudos, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_adeudos: results[0].cuota_adeudos,
          total_pagar: results[0].total_pagar,
          total_pagar_letra: results[0].total_pagar_letra,
          nombre_condominio: results[0].nombre_condominio,
          direccion_condominio: results[0].direccion_condominio,
          admin_condominio: results[0].admin_condominio,
          nombre_edificio: results[0].nombre_edificio,
          numero_departamento: results[0].numero_departamento,
          apellido_paterno_inquilino: results[0].apellino_paterno_inquilino,
          apellido_materno_inquilino: results[0].apellino_materno_inquilino

        };
        console.log(datos);

        crearPDFImagen(datos)
        .then((pdfBytes) => {
          // Aquí puedes hacer lo que desees con los bytes del PDF, como guardarlo en un archivo o enviarlo al cliente
          console.log('PDF creado exitosamente');
          connection.query('SELECT * FROM inquilino WHERE id_inquilino = ?',[datos.id_inquilino], (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).send('Error al enviar los correos');
            } else {
              //███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
              const coreo_destinatario = results[0].correo_inquilino;
              const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                  user: 'bureau.manager.project@gmail.com',
                  pass: 'aavrdsdbfhxyclyk',
                },
              });

              const mailOptions = {
                from: 'bureau.manager.project@gmail.com',
                to: coreo_destinatario,
                subject: 'Adjunto PDF Recibo',
                text: 'Recibo',
                attachments: [
                  {
                    filename: 'recibo.pdf',
                    content: pdfBytes,
                  },
                ],
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  res.status(500).send('Error al enviar los correos');
                  console.error('Error al enviar el correo:', error);
                } else {
                  res.status(200).send('Correo enviado exitosamente');
                  console.log('Correo enviado:', info.response);
                }
              });


            }
          });
        })
        .catch((error) => {
          res.status(500).send('Error al enviar los correos');
          console.error('Error al crear el PDF:', error);
        });
        
      }
    });
  }
});

app.post('/api/generarPDFMasivo', async (req, res) => {
  try {
    console.log(req.body);
    const lista = req.body;
    let superDatos = [];
    const query = `
      SELECT 
        rc.id_recibo,
        rc.id_condominio,
        rc.id_departamento,
        rc.id_inquilino,
        rc.nombre_completo_inquilino,
        rc.fecha_formateada,
        rc.mes_pago,
        rc.no_recibo,
        rc.concepto_pago,
        rc.cuota_ordinaria,
        rc.cuota_penalizacion,
        rc.cuota_extraordinaria,
        rc.cuota_reserva,
        rc.cuota_adeudos,
        rc.total_pagar,
        rc.total_pagar_letra,
        c.nombre_condominio,
        c.direccion_condominio,
        c.admin_condominio,
        e.nombre_edificio,
        d.numero_departamento,
        i.nombre_inquilino,
        i.apellino_paterno_inquilino,
        i.apellino_materno_inquilino
      FROM 
        reciboCompleto AS rc 
      INNER JOIN departamento AS d ON rc.id_departamento = d.id_departamento 
      INNER JOIN edificio AS e ON d.id_edificio = e.id_edificio 
      INNER JOIN condominio AS c ON e.id_condominio = c.id_condominio 
      INNER JOIN inquilino AS i ON rc.id_inquilino = i.id_inquilino
      WHERE
        rc.id_recibo = ?
    `;
    // Crear una matriz de promesas para las consultas a la base de datos
    const promises = lista.map(elemento => {
      return new Promise((resolve, reject) => {
        connection.query(query, [elemento], (error, results) => {
          if (error) {
            console.error(error);
            reject(error);
          } else {
            let datos;
            datos = {
              id_recibo: results[0].id_recibo,
              id_condominio: results[0].id_condominio,
              id_departamento: results[0].id_departamento,
              id_inquilino: results[0].id_inquilino,
              //nombre_completo_inquilino: CryptoJS.AES.decrypt(results[0].nombre_completo_inquilino, secretKey).toString(CryptoJS.enc.Utf8),
              nombre_completo_inquilino: results[0].nombre_completo_inquilino,
              fecha: results[0].fecha_formateada,
              mes_pago: results[0].mes_pago,
              no_recibo: results[0].no_recibo,
              concepto_pago: results[0].concepto_pago,
              //cuota_ordinaria: CryptoJS.AES.decrypt(results[0].cuota_ordinaria, secretKey).toString(CryptoJS.enc.Utf8),
              cuota_ordinaria: results[0].cuota_ordinaria,
              //cuota_penalizacion: CryptoJS.AES.decrypt(results[0].cuota_penalizacion, secretKey).toString(CryptoJS.enc.Utf8),
              cuota_penalizacion: results[0].cuota_penalizacion,
              //cuota_extraordinaria: CryptoJS.AES.decrypt(results[0].cuota_extraordinaria, secretKey).toString(CryptoJS.enc.Utf8),
              cuota_extraordinaria: results[0].cuota_extraordinaria,
              //cuota_reserva: CryptoJS.AES.decrypt(results[0].cuota_reserva, secretKey).toString(CryptoJS.enc.Utf8),
              cuota_reserva: results[0].cuota_reserva,
              //cuota_adeudos: CryptoJS.AES.decrypt(results[0].cuota_adeudos, secretKey).toString(CryptoJS.enc.Utf8),
              cuota_adeudos: results[0].cuota_adeudos,
              total_pagar: results[0].total_pagar,
              total_pagar_letra: results[0].total_pagar_letra,
              nombre_condominio: results[0].nombre_condominio,
              direccion_condominio: results[0].direccion_condominio,
              admin_condominio: results[0].admin_condominio,
              nombre_edificio: results[0].nombre_edificio,
              numero_departamento: results[0].numero_departamento,
              nombre_inquilino: results[0].nombre_inquilino,
              apellino_paterno_inquilino: results[0].apellino_paterno_inquilino,
              apellino_materno_inquilino: results[0].apellino_materno_inquilino
            };
            superDatos.push(datos);
            resolve();
          }
        });
      });
    });

    // Esperar a que todas las consultas se completen
    await Promise.all(promises);

    const pdfBytes = await crearPDFImagenMultiple(superDatos);

    // Guardar el archivo PDF en el servidor
    const filePath = './archivo.pdf';
    fs.writeFileSync(filePath, pdfBytes);

    // Enviar el archivo PDF al cliente
    res.download(filePath, 'archivo.pdf', (error) => {
      if (error) {
        console.error('Error al enviar el archivo:', error);
        res.status(500).send('Error al enviar el archivo PDF');
      }

      // Eliminar el archivo del servidor después de enviarlo
    });
  } 
  catch (error) {
    console.error('Error al crear el PDF:', error);
    res.status(500).send('Error al crear el PDF');
  }
});


//███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

app.post('/api/actualizarCondominio', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { id_condominio, nombre_condominio, direccion_condominio , admin_condominio} = req.body;
  const sql = `UPDATE condominio SET nombre_condominio = ?, direccion_condominio = ? ,admin_condominio = ? WHERE id_condominio= ?`;
  const values = [nombre_condominio, direccion_condominio, admin_condominio,id_condominio];
  connection.query(sql, values, error => {
    if (error) console.log(error);
    res.send("200");
  });
});

app.post('/api/actualizarEdificio', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { id_edificio, nombre_edificio} = req.body;
  const sql = `UPDATE edificio SET nombre_edificio = ? WHERE id_edificio= ?`;
  const values = [nombre_edificio,id_edificio];
  connection.query(sql, values, error => {
    if (error) console.log(error);
    res.send("200");
  });
});

app.post('/api/actualizarDepartamento', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { id_departamento, nombre_departamento} = req.body;
  const sql = `UPDATE departamento SET numero_departamento = ? WHERE id_departamento= ?`;
  const values = [nombre_departamento,id_departamento];
  connection.query(sql, values, error => {
    if (error) console.log(error);
    res.send("200");
  });
});

app.post('/api/actualizarInquilino', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { id_inquilino, nombre_inquilino, apellino_paterno_inquilino, apellino_materno_inquilino, correo_inquilino} = req.body;
  const sql = `UPDATE inquilino SET nombre_inquilino = ?, apellino_paterno_inquilino = ? , apellino_materno_inquilino = ? , correo_inquilino = ? WHERE id_inquilino= ?`;
  const values = [nombre_inquilino, apellino_paterno_inquilino, apellino_materno_inquilino, correo_inquilino, id_inquilino];
  connection.query(sql, values, error => {
    if (error) console.log(error);
    res.send("200");
  });
});

app.post('/api/actualizarCuotas', (req, res) => {
  console.log(req.body);
  let { cuota_base, cuota_extra, id_edificio } = req.body;
  if(cuota_extra === ''){
    cuota_extra = null;
  }
  const sql = 'UPDATE admin_cuotas SET cuota_base = ?, cuota_extra = ? WHERE id_edificio = ?';
  const values = [cuota_base, cuota_extra, id_edificio];
  connection.query(sql, values, error => {
    if(error){
      console.error(error);
      res.status(500).send('Error al actualizar las cuotas');
    }
    res.status(200).send('Cuotas actualizadas con éxito');
  });
});

//███████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████



app.post('/api/getAdmin', (req, res) => {
  console.log(req.body);
  const { correo_administrador, contraseña_administrador } = req.body;
  connection.query(
    'SELECT * FROM administrador WHERE correo_administrador = ?',
    [correo_administrador],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al obtener los registros');
      } else if (results.length === 1) {
       
        const user = results[0];
        bcrypt.compare(contraseña_administrador, user.contraseña_administrador, (error, isMatch) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error al verificar la contraseña');
          } else if (isMatch) {
            
            const token = jwt.sign({ correo_administrador }, secretKey, { expiresIn: '5m' });
            res.json({ token, id_administrador: user.id_administrador });
            ///res.json({ id_administrador: user.id_administrador });
          } else {
            // Las contraseñas no coinciden
            res.status(401).send('Correo o contraseña incorrectos');
          }
        });
      } else {
        // Usuario no encontrado
        res.status(404).send('Usuario no encontrado');
      }
    }
  );
});

app.get('/api/getAdmin/:id_administrador', (req, res) => {
  const { id_administrador } = req.params;

  connection.query(
      'SELECT * FROM administrador WHERE id_administrador = ?',
      [id_administrador],
      (error, results) => {
          if (error) {
              console.error(error);
              return res.status(500).send('Error al obtener los registros');
          } else if (results.length > 0) {
              const adminData = results[0];
              res.json(adminData);
          } else {
              res.status(404).send('Administrador no encontrado');
          }
      }
  );
});

app.get('/api/getRecibos/:id_administrador', (req, res) => {
  const id_administrador  = parseInt(req.params.id_administrador);
  const sql = `
    SELECT r.*, i.correo_inquilino, 
           i.correo_inquilino IS NOT NULL AS tiene_correo
    FROM reciboCompleto r
    JOIN inquilino i ON r.id_inquilino = i.id_inquilino
    WHERE r.id_administrador = ?;
  `;
  connection.query(sql, [id_administrador], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los registros de la tabla');
    } else {
      const recibosDesencriptados = results.map((recibo) => {
        return {
          ...recibo,
          //nombre_completo_inquilino: CryptoJS.AES.decrypt(recibo.nombre_completo_inquilino, secretKey).toString(CryptoJS.enc.Utf8),
          nombre_completo_inquilino: recibo.nombre_completo_inquilino,
          //cuota_ordinaria: CryptoJS.AES.decrypt(recibo.cuota_ordinaria, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_ordinaria: recibo.cuota_ordinaria,
          //cuota_extraordinaria: CryptoJS.AES.decrypt(recibo.cuota_extraordinaria, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_extraordinaria: recibo.cuota_extraordinaria,
          //cuota_penalizacion: CryptoJS.AES.decrypt(recibo.cuota_penalizacion, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_penalizacion: recibo.cuota_penalizacion,
          //cuota_reserva: CryptoJS.AES.decrypt(recibo.cuota_reserva, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_reserva: recibo.cuota_reserva,
          //cuota_adeudos: CryptoJS.AES.decrypt(recibo.cuota_adeudos, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_adeudos: recibo.cuota_adeudos,
          tiene_correo: recibo.tiene_correo === 1
        };
      });  

      res.json(recibosDesencriptados);
    }
  });
});

app.get('/api/getCondominios/:id_administrador', (req, res) => {
  const id_administrador = parseInt(req.params.id_administrador);
  connection.query('SELECT * FROM condominio WHERE id_administrador = ?', [id_administrador], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los registros de la tabla');
    } else {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).send('No se encontraron condominios para el administrador especificado');
      }
    }
  });
});


app.post('/api/getEdificiosbyCondominio', (req, res) => {
  console.log(req.body);
  const { id_condominio } = req.body;
  connection.query('SELECT * FROM edificio WHERE id_condominio = ?',[id_condominio], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los registros de la tabla');
    } else {
      res.json(results);
      console.log(results);
    }
  });
});

app.post('/api/getDepartamentosbyEdificios', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { id_edificio } = req.body;
  connection.query('SELECT * FROM departamento WHERE id_edificio = ?',[id_edificio], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los registros de la tabla');
    } else {
      res.json(results);
      console.log(results);
    }
  });
});

app.post('/api/getInquilinosbyDepartamento', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { id_departamento } = req.body;
  connection.query('SELECT * FROM inquilino WHERE id_departamento = ?',[id_departamento], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los registros de la tabla');
    } else {
      res.json(results);
      console.log(results);
    }
  });
});

app.get('/api/getInquilinosByCondominio', (req, res) => {
  const { id_condominio } = req.query;
  const query = `
    SELECT i.nombre_inquilino, i.apellino_paterno_inquilino, i.apellino_materno_inquilino, 
    i.correo_inquilino, i.codigo_inquilino, d.numero_departamento, e.nombre_edificio
    FROM inquilino i
    JOIN departamento d ON i.id_departamento = d.id_departamento
    JOIN edificio e ON d.id_edificio = e.id_edificio
    WHERE e.id_condominio = ?;
  `;
  connection.query(query, [id_condominio], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los registros de la tabla');
    } else {
      res.json(results);
    }
  });
});


app.get('/api/getEdificios', (req, res) => {
  console.log("-------------------------------")
  connection.query('SELECT * FROM edificio', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los registros de la tabla');
    } else {
      res.json(results);
      console.log(results);
    }
  });
});

app.get('/api/getInfoCondominio', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { id_condominio} = req.body;
  connection.query(
    'SELECT * FROM condominio WHERE id_condominio = ?',
    [id_condominio],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al obtener los registros');
      } else {
        console.log(results.body);
        res.status(2)
      }
    }
  );
});

app.get('/api/getInfoPagos/:id_administrador', (req, res) => {
  const id_administrador = parseInt(req.params.id_administrador);
  const sql = `
    SELECT
      c.nombre_condominio,
      d.numero_departamento,
      p.total_pagado,
      p.adeudo,
      p.fecha_pago
    FROM infopagos p
    INNER JOIN inquilino i ON p.id_inquilino = i.id_inquilino
    INNER JOIN departamento d ON i.id_departamento = d.id_departamento
    INNER JOIN condominio c ON p.id_condominio = c.id_condominio
    WHERE p.id_administrador = ?
  `;

  connection.query(sql, [id_administrador], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los registros de la tabla');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/obtenerCuota/:id_edificio', (req, res) => {
  const id_edificio = parseInt(req.params.id_edificio);
  const sql = 'SELECT * FROM admin_cuotas WHERE id_edificio = ?';
  connection.query(sql, [id_edificio], (error, results) => {
    if(error){
      console.error(error);
      res.status(500).send('Error al obtener las cuotas');
    }else{
      res.json(results);
    }
  });
});

app.get('/api/getRecibosFiltrados/:id_administrador', (req, res) => {
  const id_administrador = parseInt(req.params.id_administrador);
  const { condominio, edificio, departamento, mes, anio } = req.query;

  let sql = `
    SELECT r.*, i.correo_inquilino IS NOT NULL AS tiene_correo
    FROM reciboCompleto r
    JOIN inquilino i ON r.id_inquilino = i.id_inquilino
    WHERE r.id_administrador = ?
  `;
  let values = [id_administrador];

  if (condominio) {
    sql += ' AND r.id_condominio = ?';
    values.push(condominio);
  }
  if (edificio) {
    sql += ' AND r.id_edificio = ?';
    values.push(edificio);
  }
  if (departamento) {
    sql += ' AND r.id_departamento = ?';
    values.push(departamento);
  }
  if (mes && anio) {
    sql += ' AND MONTH(r.fecha) = ? AND YEAR(r.fecha) = ?';
    values.push(mes, anio);
  }

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los registros filtrados');
    } else {
      const recibosDesencriptados = results.map((recibo) => {
        return {
          ...recibo,
          //nombre_completo_inquilino: CryptoJS.AES.decrypt(recibo.nombre_completo_inquilino, secretKey).toString(CryptoJS.enc.Utf8),
          nombre_completo_inquilino: recibo.nombre_completo_inquilino,
          //cuota_ordinaria: CryptoJS.AES.decrypt(recibo.cuota_ordinaria, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_ordinaria: recibo.cuota_ordinaria,
          //cuota_extraordinaria: CryptoJS.AES.decrypt(recibo.cuota_extraordinaria, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_extraordinaria: recibo.cuota_extraordinaria,
          //cuota_penalizacion: CryptoJS.AES.decrypt(recibo.cuota_penalizacion, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_penalizacion: recibo.cuota_penalizacion,
          //cuota_reserva: CryptoJS.AES.decrypt(recibo.cuota_reserva, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_reserva: recibo.cuota_reserva,
          //cuota_adeudos: CryptoJS.AES.decrypt(recibo.cuota_adeudos, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_adeudos: recibo.cuota_adeudos,
          tiene_correo: recibo.tiene_correo === 1
        };
      });
      res.json(recibosDesencriptados);
    }
  });
});

app.get('/api/getInfoPagosFiltrados/:id_administrador', (req, res) => {
  const { condominio, edificio, anio, mes } = req.query;
  let query = `
    SELECT
      c.nombre_condominio,
      d.numero_departamento,
      p.total_pagado,
      p.adeudo,
      p.fecha_pago
    FROM infopagos p
    INNER JOIN inquilino i ON p.id_inquilino = i.id_inquilino
    INNER JOIN departamento d ON i.id_departamento = d.id_departamento
    INNER JOIN condominio c ON p.id_condominio = c.id_condominio
    WHERE p.id_administrador = ?
  `;
  let params = [req.params.id_administrador];

  if (condominio) {
      query += " AND c.id_condominio = ?";
      params.push(condominio);
  }
  if (edificio) {
      query += " AND p.id_edificio = ?";
      params.push(edificio);
  }
  if (anio && mes) {
      query += " AND YEAR(p.fecha_pago) = ? AND MONTH(p.fecha_pago) = ?";
      params.push(anio, mes);
  }

  connection.query(query, params, (error, results) => {
      if (error) {
          console.error('Error al obtener datos filtrados:', error);
          res.status(500).send('Error al obtener datos filtrados');
      } else {
          res.json(results);
      }
  });
});


app.get('/api/verificarRecibo/:id_condominio/:no_recibo', (req, res) => {
  const { id_condominio, no_recibo } = req.params;
  const sql = `
    SELECT COUNT(*) AS count
    FROM reciboCompleto
    WHERE id_condominio = ? AND no_recibo = ?;
  `;
  connection.query(sql, [id_condominio, no_recibo], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al verificar el recibo');
    } else {
      res.json({ existe: results[0].count > 0 });
    }
  });
});

app.get('/api/verificarCodigoInquilino/:codigo_inquilino', (req, res) => {
  const { codigo_inquilino } = req.params;
  const sql = `
    SELECT COUNT(*) AS count FROM inquilino WHERE codigo_inquilino = ?
  `;
  connection.query(sql, [codigo_inquilino], (error, results) => {
    if (error){
      console.error(error);
      res.status(500).send('Error al verificar el código del inquilino');
    } else {
      res.json({ existe: results[0].count > 0 });
    }
  });
});

app.get('/api/obtenerUltimoNumeroRecibo/:id_condominio', async (req, res) => {
  try {
    const id_condominio = req.params.id_condominio;
    const query = `SELECT MAX(no_recibo) AS ultimoNumeroRecibo FROM recibocompleto WHERE id_condominio = ?`;
    connection.query(query, [id_condominio], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al obtener el último número de recibo');
      } else {
        res.json(results[0]);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});


app.post('/api/eliminarRecibos', (req, res) => {
  const { ids } = req.body;
  if (ids.length === 0) {
      return res.status(400).send('No se proporcionaron IDs de recibos.');
  }

  const placeholders = ids.map(() => '?').join(',');
  const selectSql = `
    SELECT no_recibo, id_condominio 
    FROM recibocompleto 
    WHERE id_recibo IN (${placeholders})
  `;

  connection.beginTransaction((err) => {
    if (err) {
      return res.status(500).send('Error al iniciar transacción');
    }

    connection.query(selectSql, ids, (error, results) => {
        if (error) {
            return connection.rollback(() => {
                console.error('Error al recuperar recibos:', error);
                res.status(500).send('Error al recuperar recibos');
            });
        }

        // Preparamos los datos para eliminar en infopagos
        const infopagosDeletes = results.map(row => [row.no_recibo, row.id_condominio]);
        if (infopagosDeletes.length > 0) {
            const deleteInfopagosSql = `
                DELETE FROM infopagos 
                WHERE (no_recibo, id_condominio) IN (?)
            `;
            connection.query(deleteInfopagosSql, [infopagosDeletes], (error) => {
                if (error) {
                    return connection.rollback(() => {
                        console.error('Error al eliminar en infopagos:', error);
                        res.status(500).send('Error al eliminar en infopagos');
                    });
                }

                // Eliminación en recibocompleto
                const deleteReciboCompletoSql = `DELETE FROM recibocompleto WHERE id_recibo IN (${placeholders})`;
                connection.query(deleteReciboCompletoSql, ids, (error) => {
                    if (error) {
                        return connection.rollback(() => {
                            console.error('Error al eliminar recibos completos:', error);
                            res.status(500).send('Error al eliminar recibos completos');
                        });
                    }

                    // Si todo fue bien, hacemos commit
                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                console.error('Error al hacer commit de la transacción:', err);
                                res.status(500).send('Error al finalizar la transacción');
                            });
                        }
                        res.send('Recibos eliminados correctamente');
                    });
                });
            });
        } else {
            connection.rollback(() => {
                res.status(404).send('No se encontraron datos para eliminar en infopagos');
            });
        }
    });
  });
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Servidor iniciado en http://0.0.0.0:${PORT}`);
});
