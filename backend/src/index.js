//arquivo de comunicacao com o servidor, onde o servidor é criado e configurado para responder às requisições dos clientes. Ele define as rotas e os métodos HTTP que o servidor irá aceitar, além de lidar com erros e iniciar o servidor na porta especificada.
const http = require('http');

const PORT = process.env.PORT || 3000;

//inicia na porta 3000.
//req servidor recebendo a requisição do cliente
//res servidor respondendo a requisição do cliente
const requestHandler = (req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Olá! Esta é uma aplicação Node.js simples.');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Página não encontrada');
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Erro no servidor:', err);
  process.exit(1);
});
