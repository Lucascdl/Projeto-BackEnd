const fs = require('fs').promises;

class ManagerUsers {
  constructor() {
    this.filePath = 'Usuarios.json';
  }

  async CriarUsuario(usuario) {
    try {
      const camposRequeridos = ['nome', 'sobrenome', 'idade', 'curso'];

      for (const campo of camposRequeridos) {
        if (!(campo in usuario)) {
          throw new Error(`Campo obrigatório ausente: ${campo}`);
        }
      }

      let usuarios = [];

      try {
        const data = await fs.readFile(this.filePath, 'utf8');
        usuarios = JSON.parse(data);
      } catch (error) {
        if (error.code === 'ENOENT') {
          usuarios = [];
        } else {
          throw error;
        }
      }

      usuarios.push(usuario);
      await fs.writeFile(this.filePath, JSON.stringify(usuarios, null, 2));

      return usuario;
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      throw error;
    }
  }
}