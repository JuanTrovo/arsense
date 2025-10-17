import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

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
            'GET - teste': `${rootDomain}/api/teste`
            // usuario: {
            //     'POST - Cadastrar usuário': `${rootDomain}/api/usuario`,
            //     'GET - Consultar todos os usuários': `${rootDomain}/api/usuario`,
            //     'GET - Consultar por email': `${rootDomain}/api/usuario`,
            //     'GET - Consultar usuário por ID': `${rootDomain}/api/usuario/:id`,
            //     'PUT - Alterar usuário': `${rootDomain}/api/usuario/:id`,
            //     'DELETE - Deletar usuário': `${rootDomain}/api/usuario/:id`,
            //     'POST - Login usuário': `${rootDomain}/api/usuario/login`
            // }
        }
    });
});

// Configurando as rotas
app.use('/', usuarioRoute);
// app.use('/', dispositivoRoutes);
// app.use('/api/leitura', leituraRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando: http://localhost:${PORT}`);
});
