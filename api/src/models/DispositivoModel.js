import pool from "../database/data.js";
import bcrypt from "bcryptjs";

// Cadastrar dispositivo
export const cadastrar = async (dispositivo, cx = null) => {
    let localCx = cx
    try {

        if (!localCx) {
            localCx = await pool.getConnection();
        }

        const { nome, mac, usuario_id } = dispositivo;
        
        const query = `
            INSERT INTO dispositivo (nome, tipo, usuario_id) 
            VALUES (?, ?, ?)
        `;

        const values = [nome, tipo, usuario_id];
        
        const [result] = await localCx.query(query, values);

        if (result.affectedRows === 0) {
            throw new Error("Erro ao cadastrar dispositivo")
        }

        const lastIdDispositivo = result.insertId;

        const dispositivoCadastrado = await consultarPorId(lastIdDispositivo, localCx);
        return dispositivoCadastrado;

    } catch (error) {
        throw new Error("Erro ao cadastrar dispositivo: " + error.message);
    } finally{
        if (!cx && localCx) {
            localCx.release();
        }
    }
};

// Consultar por ID
// export const consultarPorId = async (id, cx = null) => {
//    let localCx = cx;
//    try{
//     if (!localCx) {
//         localCx = await pool.getConnection();
//     }
    
//     const query = "SELECT * FROM dispositivo WHERE id = ?";

//     const [rows] = await localCx.query(query, [id]);

//     return rows[0];

//    } catch (error) {
//     throw new Error("Erro ao consultar dispositivo por ID: " + error.message);
//    } finally{
//     if (!cx && localCx) {
//         localCx.release();
//     }
//    }
// };

// Consultar todos os dispositivos de um usuário
// export const consultarPorUsuarioId = async (usuario_id, cx = null) => {
//     let localCx = cx;
//     try{
//      if (!localCx) {
//          localCx = await pool.getConnection();
//      }

//         const query = "SELECT * FROM dispositivo WHERE usuario_id = ?";
//         const [rows] = await localCx.query(query, [usuario_id]);

//         return rows;

//     } catch (error) {
//      throw new Error("Erro ao consultar dispositivos por usuário ID: " + error.message);
//     } finally{
//      if (!cx && localCx) {
//          localCx.release();
//      }
//     }
//  };

// Deletar por ID
// export const deletarPorId = async (id, cx = null) => {
//     let localCx = cx;
//     try{
//      if (!localCx) {
//          localCx = await pool.getConnection();
//      }

//         const query = "DELETE FROM dispositivo WHERE id = ?";
//         const [result] = await localCx.query(query, [id]);

//         return result.affectedRows > 0;

//     } catch (error) {
//      throw new Error("Erro ao deletar dispositivo por ID: " + error.message);
//     } finally{
//      if (!cx && localCx) {
//          localCx.release();
//      }
//     }
//  };

// Alterar dispositivo
// export const alterar = async (id, dispositivo, cx = null) => {
//     let localCx = cx;
//     try{
//      if (!localCx) {
//          localCx = await pool.getConnection();
//      }

//         const { nome, tipo } = dispositivo;

//         const query = `
//             UPDATE dispositivo 
//             SET nome = ?, tipo = ?
//             WHERE id = ?
//         `;

//         const values = [nome, tipo, id];

//         const [result] = await localCx.query(query, values);

//         if (result.affectedRows === 0) {
//             throw new Error("Erro ao alterar dispositivo")
//         }

//         const dispositivoAlterado = await consultarPorId(id, localCx);
//         return dispositivoAlterado;

//     } catch (error) {
//      throw new Error("Erro ao alterar dispositivo: " + error.message);
//     } finally{
//      if (!cx && localCx) {
//          localCx.release();
//      }
//     }
//  };

// export default {
//     cadastrar,
//     consultarPorId,
//     consultarPorUsuarioId,
//     deletarPorId,
//     alterar
// };