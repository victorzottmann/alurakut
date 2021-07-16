import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(req, res) {
  if (req.method === 'POST') {
    const TOKEN = '0fd0edb5147cbc553923aab4540034'
    const client = new SiteClient(TOKEN) 
  
    // Validar os dados antes de sair cadastrando
    const registroCriado = await client.items.create({
      itemType: '972886', // ID do Model criado pelo Dato
      ...req.body,
      // title: 'Teste',
      // imageUrl: 'https://github.com/victorzottmann.png',
      // creatorSlug: 'victorzottmann'
    })
  
    res.json({
      registroCriado: registroCriado,
    })

    return
  }

  res.status(404).json({
    message: "Ainda não temos nada no GET, mas no POST tem!"
  })
}