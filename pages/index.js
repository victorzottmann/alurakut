import React, { useState, useEffect } from 'react'

import ProfileSidebar from '../src/components/ProfileSidebar'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import ProfileRelations from '../src/components/ProfileRelations'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function Home() {
  const [comunidades, setComunidades] = useState([])

  const [seguidores, setSeguidores] = useState([])
  
  useEffect(() => {
    // GET request
    fetch('https://api.github.com/users/victorzottmann/followers')
      .then(res => res.json())
      .then(data => setSeguidores(data))

    // GraphQL API
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'cb94c76f7bea2e4fa1cb58ab83d405',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({'query': `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`
      })
    })
    .then(res => res.json())
    .then(query => {
      const comunidadesDoDato = query.data.allCommunities
      console.log(comunidades)
      setComunidades(comunidadesDoDato)
    })
  }, [])

  const pessoasFavoritas = [
    'juunegreiros', 
    'omariosouto', 
    'peas', 
    'rafaballerini', 
    'marcobrunodev',
    'felipefialho'
  ]

  const usuarioAleatorio = 'victorzottmann'
  
  const handleCriaComunidade = (e) => {
    e.preventDefault();
    const formInputData = new FormData(e.target);

    const comunidade = {
      title: formInputData.get('title'),
      imageUrl: formInputData.get('image'),
      creatorSlug: usuarioAleatorio,
    }
    
    fetch('/api/comunidades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comunidade)
    })
    .then(async (res) => {
      const dados = await res.json()

      console.log(dados.registroCriado)
      setComunidades([...comunidades, comunidade])
    })
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">
              O que você deseja fazer?
            </h2>
            <form onSubmit={handleCriaComunidade}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?" 
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para colocarmos de capa." 
                  name="image" 
                  aria-label="Coloque uma URL para colocarmos de capa." 
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea:'profileRelationsArea' }}>
          <ProfileRelations title="Seguidores" items={seguidores} />
          <ProfileRelations title="Comunidades" items={comunidades} />
          <ProfileRelations title="Pessoas da Comunidade" items={pessoasFavoritas} />
        </div>
      </MainGrid>
    </>
  ) 
}

export default Home
