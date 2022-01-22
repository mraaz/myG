import fastify from 'fastify'
import jwt from 'jsonwebtoken';

const secret = '67566B597033733676397924423F4528482B4D6251655468576D5A7134743777217A25432A46294A404E635266556A586E3272357538782F413F4428472B4B61';
const server = fastify()

function generateAccessToken(payload: object) {
  // 86400 seconds = 1 day
  return jwt.sign(payload, secret, { expiresIn: '86400s' });
}

server.get('/get', async (request, reply) => {
  const token = generateAccessToken({
    data: {
      client: 'myG'
    },
    aud: 'myG_webserver'
  });
	return token;
})

server.listen(8080, (err, address) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}
	console.log(`Server listening at ${address}`);
})
