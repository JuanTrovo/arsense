import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Importando as rotas
import usuarioRoute from './routes/UsuarioRoutes.js';
// import dispositivoRoute from './routes/DispositivoRoutes.js';
// import leituraRoute from './routes/LeituraRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rota raiz (documentação básica da API)
app.get('/', (req, res) => {
    const rootDomain = req.protocol + '://' + req.get('host');
    res.status(200).json({
        status_server: 'ok',
        dominio_raiz: rootDomain,
        atualizacao: '05/09/2025 - 10:00',
        rotas: {
            usuario: {
                'POST - Cadastrar usuário': `${rootDomain}/api/usuario`,
                'GET - Consultar todos os usuários': `${rootDomain}/api/usuario`,
                'GET - Consultar por email': `${rootDomain}/api/usuario`,
                'GET - Consultar usuário por ID': `${rootDomain}/api/usuario/:id`,
                'PUT - Alterar usuário': `${rootDomain}/api/usuario/:id`,
                'DELETE - Deletar usuário': `${rootDomain}/api/usuario/:id`,
                'POST - Login usuário': `${rootDomain}/api/usuario/login`
            }
            // dispositivo: {
            //     'POST - Cadastrar dispositivo': `${rootDomain}/api/dispositivo`,
            //     'GET - Consultar todos os dispositivos': `${rootDomain}/api/dispositivo`,
            //     'GET - Consultar dispositivo por ID': `${rootDomain}/api/dispositivo/:id`,
            //     'PUT - Alterar dispositivo': `${rootDomain}/api/dispositivo/:id`,
            //     'DELETE - Deletar dispositivo': `${rootDomain}/api/dispositivo/:id`
            // },
            // leitura: {
            //     'POST - Registrar leitura': `${rootDomain}/api/leitura`,
            //     'GET - Consultar todas as leituras': `${rootDomain}/api/leitura`,
            //     'GET - Consultar leitura por ID': `${rootDomain}/api/leitura/:id`,
            //     'GET - Leituras de um dispositivo': `${rootDomain}/api/leitura/dispositivo/:id_dispositivo`
            // }
        }
    });
});

// Configurando as rotas
app.use('/api/usuario', usuarioRoute);
// app.use('/api/dispositivo', dispositivoRoute);
// app.use('/api/leitura', leituraRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}`);
});
