const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//Configuration db
/* const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'olxdb'
  }); */

  const connection = mysql.createConnection({
    host: 'db4free.net',
    port: 3306,
    user: 'marlong03',
    password: 'Marlong2013',
    database: 'dbglobal',
    driver: 'com.mysql.cj.jdbc.Driver'
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); 
app.use(
  express.urlencoded({
    extended: true,
  })
);


//Conexion db
connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión exitosa a la base de datos');
  });
// Rutas
app.get('/', (req, res) => {
  res.send('API funcionando correctamente srs');
});


//OBTENER DATOS
app.get('/usuario', (req, res) => {
    const query = 'SELECT * FROM user';
  
    connection.query(query, (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
      res.json(rows);
    });
});
app.get('/usuario/:id', (req, res) => {
  const query = 'SELECT * FROM user where iduser = ?';
  const {id} = req.params
  connection.query(query,[id],(err, rows) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    res.json(rows);
  });
});
app.get('/usuario/email/:email', (req, res) => {
  const query = 'SELECT * FROM user where email = ?';
  const {email} = req.params
  connection.query(query,[email],(err, rows) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    res.json(rows);
  });
});
app.get('/articulo', (req, res) => {
    const query = `
      SELECT 
        a.idarticulo,
        a.titulo,
        a.descripcion,
        a.fecha,
        a.situacion,
        a.imagen,
        c.idcategoria,
        c.nombre AS categoria,
        u.iduser,
        u.nombre AS nombre_usuario,
        u.apellido,
        u.ubicacion,
        u.email,
        u.password,
        u.imagen AS imagen_usuario,
        u.telefono,
        a.estado,
        a.precio
      FROM
        articulo a
        JOIN categoria c ON a.categoria_idcategoria = c.idcategoria
        JOIN user u ON a.user_iduser = u.iduser
    `;
  
    connection.query(query, (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al obtener los artículos' });
      }
  
      const articulos = rows.map(row => {
        return {
          idarticulo: row.idarticulo,
          titulo: row.titulo,
          descripcion: row.descripcion,
          fecha: row.fecha,
          situacion: row.situacion,
          imagen: row.imagen,
          categoria_idcategoria: {
            id: row.idcategoria,
            nombre: row.categoria
          },
          user_iduser: {
            id: row.iduser,
            nombre: row.nombre_usuario,
            apellido: row.apellido,
            ubicacion: row.ubicacion,
            email: row.email,
            password: row.password,
            imagen: row.imagen_usuario,
            telefono: row.telefono
          },
          estado: row.estado,
          precio:row.precio
        };
      });
  
      res.json(articulos);
    });
  });
  app.get('/articulo/:id', (req, res) => {
    const {id} = req.params
    const query = `
      SELECT 
        a.idarticulo,
        a.titulo,
        a.precio,
        a.descripcion,
        a.fecha,
        a.situacion,
        a.imagen,
        c.idcategoria,
        c.nombre AS categoria,
        u.iduser,
        u.nombre AS nombre_usuario,
        u.apellido,
        u.ubicacion,
        u.email,
        u.password,
        u.imagen AS imagen_usuario,
        u.telefono,
        a.estado
      FROM
        articulo a
        JOIN categoria c ON a.categoria_idcategoria = c.idcategoria
        JOIN user u ON a.user_iduser = u.iduser 
      WHERE a.idarticulo = ?
    `;
  
    connection.query(query,[id], (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al obtener los artículos' });
      }
  
      const articulos = rows.map(row => {
        return {
          idarticulo: row.idarticulo,
          titulo: row.titulo,
          precio:row.precio,
          descripcion: row.descripcion,
          fecha: row.fecha,
          situacion: row.situacion,
          imagen: row.imagen,
          categoria_idcategoria: {
            id: row.idcategoria,
            nombre: row.categoria
          },
          user_iduser: {
            id: row.iduser,
            nombre: row.nombre_usuario,
            apellido: row.apellido,
            ubicacion: row.ubicacion,
            email: row.email,
            password: row.password,
            imagen: row.imagen_usuario,
            telefono: row.telefono
          },
          estado: row.estado
        };
      });
  
      res.json(articulos);
    });
  });
  app.get('/favorito', (req, res) => {
    const query = `
      SELECT 
        f.idfavorito,
        f.articulo_idarticulo,
        f.user_iduser,
        a.titulo,
        a.descripcion,
        a.fecha,
        a.situacion,
        a.imagen,
        c.idcategoria,
        c.nombre AS categoria,
        u.iduser,
        u.nombre AS nombre_usuario,
        u.apellido,
        u.ubicacion,
        u.email,
        u.password,
        u.imagen AS imagen_usuario,
        u.telefono,
        a.estado,
        u_fav.iduser AS user_idfavorito,
        u_fav.nombre AS nombre_favorito,
        u_fav.apellido AS apellido_favorito,
        u_fav.ubicacion AS ubicacion_favorito,
        u_fav.email AS email_favorito,
        u_fav.password AS password_favorito,
        u_fav.imagen AS imagen_favorito,
        u_fav.telefono AS telefono_favorito
      FROM
        favorito f
        JOIN articulo a ON f.articulo_idarticulo = a.idarticulo
        JOIN categoria c ON a.categoria_idcategoria = c.idcategoria
        JOIN user u ON a.user_iduser = u.iduser
        JOIN user u_fav ON f.user_iduser = u_fav.iduser
    `;
  
    connection.query(query, (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al obtener los favoritos' });
      }
  
      const favoritos = rows.map(row => {
        return {
          idfavorito: row.idfavorito,
          articulo: {
            titulo: row.titulo,
            descripcion: row.descripcion,
            fecha: row.fecha,
            situacion: row.situacion,
            imagen: row.imagen,
            categoria_idcategoria: {
              id: row.idcategoria,
              nombre: row.categoria
            },
            user_iduser: {
              id: row.iduser,
              nombre: row.nombre_usuario,
              apellido: row.apellido,
              ubicacion: row.ubicacion,
              email: row.email,
              password: row.password,
              imagen: row.imagen_usuario,
              telefono: row.telefono
            },
            estado: row.estado
          },
          user_idfavorito: {
            id: row.user_idfavorito,
            nombre: row.nombre_favorito,
            apellido: row.apellido_favorito,
            ubicacion: row.ubicacion_favorito,
            email: row.email_favorito,
            password: row.password_favorito,
            imagen: row.imagen_favorito,
            telefono: row.telefono_favorito
          }
        };
      });
  
      res.json(favoritos);
    });
  });
app.get('/categoria', (req, res) => {
    const query = 'SELECT * FROM categoria';
  
    connection.query(query, (err, rows) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al obtener los usuarios' });
      }
      res.json(rows);
    });
});
app.get('/categoria/nombre/:nombre', (req, res) => {
   const{ nombre } = req.params
  const query = 'SELECT nombre FROM categoria where nombre = ?';

  connection.query(query, nombre, (err, rows) => {
    if (err) {
      console.error('Error consultar el nombre de la cateogria', err);
      return res.status(500).json({ error: 'Error consultar el nombre de la cateogria' });
    }
    if(rows.length == 0){

      res.json(false);
    }else{
      res.json(true);
    }
  });
});
// CREAR DATOS
app.post('/usuario/new', (req, res) => {
    const { nombre,apellido,telefono,ubicacion,email,password,imagen } = req.body;
    const query = 'INSERT INTO user (nombre,apellido,telefono,ubicacion,email,password,imagen) VALUES (?,?,?,?,?,?,?)';
    const values = [nombre,apellido,telefono,ubicacion,email,password,imagen];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al crear un usuario' });
      }
  
      res.json({ message: 'Usuario creado exitosamente' });
    });
});
app.post('/categoria/new', (req, res) => {
    const { nombre } = req.body;
    const query = 'INSERT INTO categoria (nombre) VALUES (?)';
    const values = [nombre];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al crear una Categoria' });
      }
      res.json({ message: 'Categoria creado exitosamente' });
    });
});
app.post('/articulo/new', (req, res) => {
    const { titulo,precio,descripcion,fecha,situacion,imagen,categoria_idcategoria,user_iduser,estado } = req.body;
    const query = 'INSERT INTO articulo (titulo,precio,descripcion,fecha,situacion,imagen,categoria_idcategoria,user_iduser,estado) VALUES (?,?,?,?,?,?,?,?,?)';
    const values = [titulo,precio,descripcion,fecha,situacion,imagen,categoria_idcategoria,user_iduser,estado];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al crear un Articulo' });
      }
      res.json({ message: 'Articulo creado exitosamente' });
    });
});
app.post('/favorito/new', (req, res) => {
    const { articulo_idarticulo,user_iduser } = req.body;
    const query = 'INSERT INTO favorito (articulo_idarticulo,user_iduser ) VALUES (?,?)';
    const values = [articulo_idarticulo,user_iduser ];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al crear un Favorito' });
      }
      res.json({ message: 'Favorito creado exitosamente' });
    });
});
//ELIMINAR DATOS
app.delete('/favorito/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'delete from favorito where idfavorito ='+id;
    const values = [id];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        return res.status(500).json({ error: 'Error al eliminar favorito' });
      }
      res.json({ message: 'Favorito eliminado exitosamente' });
    });
});
app.delete('/usuario/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'delete from user where iduser ='+id;
  const values = [id];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ error: 'Error al eliminar usuario' });
    }
    res.json({ message: 'Usuario eliminado exitosamente' });
  });
});
app.delete('/categoria/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'delete from categoria where idcategoria ='+id;
  const values = [id];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ error: 'Error al eliminar categoria' });
    }
    res.json({ message: 'categoria eliminado exitosamente' });
  });
});
app.delete('/articulo/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'delete from articulo where idarticulo ='+id;
  const values = [id];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return res.status(500).json({ error: 'Error al eliminar articulo' });
    }
    res.json({ message: 'articulo eliminado exitosamente' });
  });
});

//EDITAR DATOS
app.put('/usuario/update/:id', (req, res) => {
  const userId = req.params.id;
  const newNombre = req.body.nombre;
  const newApellido = req.body.apellido;
  const newUbicacion = req.body.ubicacion;
  const newEmail = req.body.email;
  const newImagen = req.body.imagen;
  const newTelefono = req.body.telefono;

  const query = 'UPDATE user SET nombre = ?,apellido = ?,ubicacion = ?,email = ?, imagen = ?,telefono = ? WHERE iduser = ?';
  const values = [newNombre, newApellido,newUbicacion,newEmail,newImagen,newTelefono,userId]
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el usuario: ', err);
      res.status(500).send('Error al actualizar el usuario');
    } else {
      res.send('Usuario con ID ' + userId + ' actualizado');
    }
  });
});
app.put('/usuario/update/password/:id', (req, res) => {
  const userId = req.params.id;
  const newPassword = req.body.password;
 

  const query = 'UPDATE user SET password = ? WHERE iduser = ?';
  const values = [newPassword, userId]
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar contraseña del usuario: ', err);
      res.status(500).send('Error al actualizar contraseña del usuario');
    } else {
      res.send('Usuario con ID ' + userId + 'contraseña actualizada');
    }
  });
});

app.put('/articulo/update/:id', (req, res) => {
  let {id} = req.params
  let { titulo,precio,descripcion,fecha,situacion,imagen,categoria_idcategoria,user_iduser,estado } = req.body



  const values = [titulo,precio,descripcion,fecha,situacion,imagen,categoria_idcategoria,user_iduser,estado,parseInt(id)];
  const query = 'UPDATE articulo SET titulo = ?,precio = ?,descripcion = ?,fecha = ?,situacion = ?,imagen = ?,categoria_idcategoria = ?,user_iduser = ?,estado = ? WHERE idarticulo = ?';
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el articulo: ', err);
      res.status(500).send('Error al actualizar el articulo');
    } else {
      res.send('articulo con ID ' + id + ' actualizado');
    }
  });
});


/* 

{
    "nombre":"jamer camilo",
"apellido":"martinez rodriguez",
"telefono":"3001221235",
"ubicacion":"cartagena",
"email":"jamec@gmail.com",
"password":"123123",
"imagen":"https://static-cdn.jtvnw.net/jtv_user_pictures/5a72c3d9-424a-40a6-bf23-73370cd85578-profile_image-300x300.png"
}

{
    "nombre":"deporte"
}

*/



// Escuchar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});