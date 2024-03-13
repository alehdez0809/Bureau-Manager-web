const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require('fs');
const app = express();

const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_secreta';

const bcrypt = require('bcrypt');
const saltRounds = 10;

const CryptoJS = require("crypto-js");
const secretKeyAES = "tu_clave_secreta";

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

const { PDFDocument, StandardFonts, PageSizes } = require('pdf-lib');

async function crearPDF(datos) {
  // Crear un nuevo documento PDF
  const pdfDoc = await PDFDocument.create();

  // Agregar una página al documento
  const page = pdfDoc.addPage();
  // Definir la fuente y el tamaño de letra
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 3

  // Función para escribir un texto en el PDF
  function escribirTexto(texto, x, y) {
    page.drawText(texto, { x, y, font, fontSize });
  }
  // Variables para controlar la posición del texto en el PDF
  let x = 50;
  let y = page.getHeight() - 50;
  
  // Escribir los valores en el PDF
  escribirTexto('Inquilino:', x, y);
  escribirTexto(datos.nombre_completo_inquilino, x + 300, y);
  y -=40;

  escribirTexto('No. de Recibo:', x, y);
  escribirTexto(datos.no_recibo, x + 300, y);
  y -=40;

  escribirTexto('Fecha:', x, y);
  escribirTexto(datos.fecha, x + 300, y);
  y -=40;

  escribirTexto('Concepto de Pago:', x, y);
  escribirTexto(datos.concepto_pago, x + 300, y);
  y -=40;

  escribirTexto('Cuota Ordinaria:', x, y);
  escribirTexto('$'+datos.cuota_ordinaria, x + 300, y);
  y -=40;

  escribirTexto('Concepto:', x, y);
  escribirTexto(datos.concepto_cuota_ordinaria, x + 300, y);
  y -=40;

  escribirTexto('Cuota Penalización:', x, y);
  escribirTexto('$'+datos.cuota_penalizacion, x + 300, y);
  y -=40;

  escribirTexto('Concepto:', x, y);
  escribirTexto(datos.concepto_cuota_penalizacion, x + 300, y);
  y -=40;

  escribirTexto('Cuota Extraordinaria:', x, y);
  escribirTexto('$'+datos.cuota_extraordinaria, x + 300, y);
  y -=40;

  escribirTexto('Concepto:', x, y);
  escribirTexto(datos.concepto_cuota_extraordinaria, x + 300, y);
  y -=40;

  escribirTexto('Cuota Reserva:', x, y);
  escribirTexto('$'+datos.cuota_reserva, x + 300, y);
  y -=40;

  escribirTexto('Concepto:', x, y);
  escribirTexto(datos.concepto_cuota_reserva, x + 300, y);
  y -=40;

  escribirTexto('Cuota Adeudos:', x, y);
  escribirTexto('$'+datos.cuota_adeudos, x + 300, y);
  y -=40;

  escribirTexto('Concepto :', x, y);
  escribirTexto(datos.concepto_cuota_adeudos, x + 300, y);
  y -=40;

  escribirTexto('Total a Pagar:', x, y);
  escribirTexto('$'+datos.total_pagar, x + 300, y);

  // Generar el contenido del PDF como una matriz de bytes
  const pdfBytes = await pdfDoc.save();

  // Devolver los bytes del PDF
  return pdfBytes;
}

async function crearPDFMultiple(datosList) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 3;

  datosList.forEach((datos) => {
    const page = pdfDoc.addPage();

    let x = 50;
    let y = page.getHeight() - 50;

    function escribirTexto(texto, x, y) {
      page.drawText(texto, { x, y, font, fontSize });
    }

    escribirTexto('Inquilino:', x, y);
    escribirTexto(datos.nombre_completo_inquilino, x + 300, y);
    y -= 40;

    escribirTexto('No. de Recibo:', x, y);
    escribirTexto(datos.no_recibo, x + 300, y);
    y -= 40;

    escribirTexto('Fecha:', x, y);
    escribirTexto(datos.fecha, x + 300, y);
    y -= 40;

    escribirTexto('Concepto de Pago:', x, y);
    escribirTexto(datos.concepto_pago, x + 300, y);
    y -= 40;

    escribirTexto('Cuota Ordinaria:', x, y);
    escribirTexto('$' + datos.cuota_ordinaria, x + 300, y);
    y -= 40;

    escribirTexto('Concepto:', x, y);
    escribirTexto(datos.concepto_cuota_ordinaria, x + 300, y);
    y -= 40;

    escribirTexto('Cuota Penalización:', x, y);
    escribirTexto('$' + datos.cuota_penalizacion, x + 300, y);
    y -= 40;

    escribirTexto('Concepto:', x, y);
    escribirTexto(datos.concepto_cuota_penalizacion, x + 300, y);
    y -= 40;

    escribirTexto('Cuota Extraordinaria:', x, y);
    escribirTexto('$' + datos.cuota_extraordinaria, x + 300, y);
    y -= 40;

    escribirTexto('Concepto:', x, y);
    escribirTexto(datos.concepto_cuota_extraordinaria, x + 300, y);
    y -= 40;

    escribirTexto('Cuota Reserva:', x, y);
    escribirTexto('$' + datos.cuota_reserva, x + 300, y);
    y -= 40;

    escribirTexto('Concepto:', x, y);
    escribirTexto(datos.concepto_cuota_reserva, x + 300, y);
    y -= 40;

    escribirTexto('Cuota Adeudos:', x, y);
    escribirTexto('$' + datos.cuota_adeudos, x + 300, y);
    y -= 40;

    escribirTexto('Concepto:', x, y);
    escribirTexto(datos.concepto_cuota_adeudos, x + 300, y);
    y -= 40;

    escribirTexto('Total a Pagar:', x, y);
    escribirTexto('$' + datos.total_pagar, x + 300, y);
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
  connection.connect(error => {
    if (error) throw error;
    console.log('Conexión a la base de datos MySQL establecida');
  });  
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
  const { nombre_condominio, direccion_condominio , id_administrador} = req.body;
  const sql = `INSERT INTO condominio (nombre_condominio, direccion_condominio, id_administrador) VALUES (?, ?, ?)`;
  const values = [nombre_condominio, direccion_condominio, id_administrador];
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
  const { id_departamento, nombre_inquilino, apellino_paterno_inquilino, apellino_materno_inquilino, correo_inquilino } = req.body;
  const sql = `INSERT INTO inquilino (id_departamento, nombre_inquilino, apellino_paterno_inquilino, apellino_materno_inquilino, correo_inquilino) VALUES (?, ?, ?, ?, ?)`;
  const values = [id_departamento, nombre_inquilino, apellino_paterno_inquilino, apellino_materno_inquilino, correo_inquilino];
  connection.query(sql, values, error => {
    if (error) console.log(error);
    res.send("200");
  });
});

app.post('/api/registrarRecibo', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const { id_condominio, id_departamento, id_inquilino, nombre_completo_inquilino, no_recibo, fecha, concepto_pago, cuota_ordinaria, concepto_cuota_ordinaria, cuota_penalizacion, concepto_cuota_penalizacion, cuota_extraordinaria, concepto_cuota_extraordinaria, cuota_reserva, concepto_cuota_reserva, cuota_adeudos, concepto_cuota_adeudos, total_pagar, id_administrador } = req.body;
  const nombre_completo_inquilinoAES = CryptoJS.AES.encrypt(nombre_completo_inquilino, secretKeyAES).toString();
  const no_reciboAES = CryptoJS.AES.encrypt(no_recibo, secretKeyAES).toString();
  const cuota_ordinariaAES = CryptoJS.AES.encrypt(cuota_ordinaria, secretKeyAES).toString();
  const cuota_extraordinariaAES = CryptoJS.AES.encrypt(cuota_extraordinaria, secretKeyAES).toString();
  const cuota_penalizacionAES = CryptoJS.AES.encrypt(cuota_penalizacion, secretKeyAES).toString();
  const cuota_reservaAES = CryptoJS.AES.encrypt(cuota_reserva, secretKeyAES).toString();
  const cuota_adeudosAES = CryptoJS.AES.encrypt(cuota_adeudos, secretKeyAES).toString();
  const sql = `INSERT INTO reciboCompleto (id_condominio, id_departamento, id_inquilino, nombre_completo_inquilino, no_recibo, fecha, concepto_pago, cuota_ordinaria, concepto_cuota_ordinaria, cuota_penalizacion, concepto_cuota_penalizacion, cuota_extraordinaria, concepto_cuota_extraordinaria, cuota_reserva, concepto_cuota_reserva, cuota_adeudos, concepto_cuota_adeudos, total_pagar, id_administrador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    id_condominio, id_departamento, id_inquilino, nombre_completo_inquilinoAES, no_reciboAES, fecha, concepto_pago, cuota_ordinariaAES, concepto_cuota_ordinaria, cuota_penalizacionAES, concepto_cuota_penalizacion, cuota_extraordinariaAES, concepto_cuota_extraordinaria, cuota_reservaAES, concepto_cuota_reserva, cuota_adeudosAES, concepto_cuota_adeudos, total_pagar, id_administrador];
  connection.query(sql, values, error => {
    if (error) console.log(error);
    res.send("200");
  });
});

app.post('/api/enviarRecibosCorreoElectronico', (req, res) => {
  console.log("-------------------------------")
  console.log(req.body);
  const lista = req.body;
  
  for (let i = 0; i < lista.length; i++) {
    const elemento = lista[i];
    connection.query('SELECT * FROM reciboCompleto WHERE id_recibo = ?',[elemento], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error al enviar los correos');
      } else {

       const datos = {
          id_recibo: results[0].id_recibo,
          id_condominio: results[0].id_condominio,
          id_departamento: results[0].id_departamento,
          id_inquilino: results[0].id_inquilino,
          nombre_completo_inquilino: CryptoJS.AES.decrypt(results[0].nombre_completo_inquilino, secretKey).toString(CryptoJS.enc.Utf8),
          fecha: results[0].fecha,
          no_recibo: CryptoJS.AES.decrypt(results[0].no_recibo, secretKey).toString(CryptoJS.enc.Utf8),
          concepto_pago: results[0].concepto_pago,
          cuota_ordinaria: CryptoJS.AES.decrypt(results[0].cuota_ordinaria, secretKey).toString(CryptoJS.enc.Utf8),
          concepto_cuota_ordinaria: results[0].concepto_cuota_ordinaria,
          cuota_penalizacion: CryptoJS.AES.decrypt(results[0].cuota_penalizacion, secretKey).toString(CryptoJS.enc.Utf8),
          concepto_cuota_penalizacion: results[0].concepto_cuota_penalizacion,
          cuota_extraordinaria: CryptoJS.AES.decrypt(results[0].cuota_extraordinaria, secretKey).toString(CryptoJS.enc.Utf8),
          concepto_cuota_extraordinaria: results[0].concepto_cuota_extraordinaria,
          cuota_reserva: CryptoJS.AES.decrypt(results[0].cuota_reserva, secretKey).toString(CryptoJS.enc.Utf8),
          concepto_cuota_reserva: results[0].concepto_cuota_reserva,
          cuota_adeudos: CryptoJS.AES.decrypt(results[0].cuota_adeudos, secretKey).toString(CryptoJS.enc.Utf8),
          concepto_cuota_adeudos: results[0].concepto_cuota_adeudos,
          total_pagar: results[0].total_pagar

        };
        console.log(datos);

        crearPDF(datos)
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
                  console.error('Error al enviar el correo:', error);
                } else {
                  console.log('Correo enviado:', info.response);
                }
              });


            }
          });
        })
        .catch((error) => {
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

    // Crear una matriz de promesas para las consultas a la base de datos
    const promises = lista.map(elemento => {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM reciboCompleto WHERE id_recibo = ?', [elemento], (error, results) => {
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
              nombre_completo_inquilino: CryptoJS.AES.decrypt(results[0].nombre_completo_inquilino, secretKey).toString(CryptoJS.enc.Utf8),
              fecha: results[0].fecha,
              no_recibo: CryptoJS.AES.decrypt(results[0].no_recibo, secretKey).toString(CryptoJS.enc.Utf8),
              concepto_pago: results[0].concepto_pago,
              cuota_ordinaria: CryptoJS.AES.decrypt(results[0].cuota_ordinaria, secretKey).toString(CryptoJS.enc.Utf8),
              concepto_cuota_ordinaria: results[0].concepto_cuota_ordinaria,
              cuota_penalizacion: CryptoJS.AES.decrypt(results[0].cuota_penalizacion, secretKey).toString(CryptoJS.enc.Utf8),
              concepto_cuota_penalizacion: results[0].concepto_cuota_penalizacion,
              cuota_extraordinaria: CryptoJS.AES.decrypt(results[0].cuota_extraordinaria, secretKey).toString(CryptoJS.enc.Utf8),
              concepto_cuota_extraordinaria: results[0].concepto_cuota_extraordinaria,
              cuota_reserva: CryptoJS.AES.decrypt(results[0].cuota_reserva, secretKey).toString(CryptoJS.enc.Utf8),
              concepto_cuota_reserva: results[0].concepto_cuota_reserva,
              cuota_adeudos: CryptoJS.AES.decrypt(results[0].cuota_adeudos, secretKey).toString(CryptoJS.enc.Utf8),
              concepto_cuota_adeudos: results[0].concepto_cuota_adeudos,
              total_pagar: results[0].total_pagar
            };
            superDatos.push(datos);
            resolve();
          }
        });
      });
    });

    // Esperar a que todas las consultas se completen
    await Promise.all(promises);

    const pdfBytes = await crearPDFMultiple(superDatos);

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
  const { id_condominio, nombre_condominio, direccion_condominio } = req.body;
  const sql = `UPDATE condominio SET nombre_condominio = ?, direccion_condominio = ? WHERE id_condominio= ?`;
  const values = [nombre_condominio, direccion_condominio,id_condominio];
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
        // Usuario encontrado, ahora compara la contraseña
        const user = results[0];
        bcrypt.compare(contraseña_administrador, user.contraseña_administrador, (error, isMatch) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error al verificar la contraseña');
          } else if (isMatch) {
            // Las contraseñas coinciden, procede con el inicio de sesión
            const token = jwt.sign({ correo_administrador }, secretKey, { expiresIn: '5m' });
            res.json({ token, id_administrador: user.id_administrador });
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

app.get('/api/getRecibos/:id_administrador', (req, res) => {
  const id_administrador  = parseInt(req.params.id_administrador);
  connection.query('SELECT * FROM reciboCompleto WHERE id_administrador = ?', [id_administrador], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error al obtener los registros de la tabla');
    } else {
      const recibosDesencriptados = results.map((recibo) => {
        return {
          ...recibo,
          nombre_completo_inquilino: CryptoJS.AES.decrypt(recibo.nombre_completo_inquilino, secretKey).toString(CryptoJS.enc.Utf8),
          no_recibo: CryptoJS.AES.decrypt(recibo.no_recibo, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_ordinaria: CryptoJS.AES.decrypt(recibo.cuota_ordinaria, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_extraordinaria: CryptoJS.AES.decrypt(recibo.cuota_extraordinaria, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_penalizacion: CryptoJS.AES.decrypt(recibo.cuota_penalizacion, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_reserva: CryptoJS.AES.decrypt(recibo.cuota_reserva, secretKey).toString(CryptoJS.enc.Utf8),
          cuota_adeudos: CryptoJS.AES.decrypt(recibo.cuota_adeudos, secretKey).toString(CryptoJS.enc.Utf8)

        };
      });  
      console.log(results);
      console.log(recibosDesencriptados);
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
