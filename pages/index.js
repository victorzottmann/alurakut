import React, { useState } from 'react'
import styled from 'styled-components'

import ProfileSidebar from '../src/components/ProfileSidebar'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import ProfileRelations, { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function Home() {
  const [comunidades, setComunidades] = useState([{
    id: 1,
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }])

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
      id: new Date().toISOString(),
      title: formInputData.get('title'),
      image: formInputData.get('image'),
    }
    
    setComunidades([...comunidades, comunidade])
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
          <ProfileRelationsBoxWrapper>
            <ProfileRelations 
              className="smallTitle" 
              text="Comunidades" 
              relationType={comunidades} 
            />

            <ul>
              {comunidades.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`/users/${item.title}`} key={item.title}>
                      <img src={item.image} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <ProfileRelations 
              className="smallTitle" 
              text="Pessoas da Comunidade" 
              relationType={pessoasFavoritas} 
            />
            
            <ul>
              {pessoasFavoritas.map((item) => {
                return (
                  <li key={item}>
                    <a href={`/users/${item}`}>
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  ) 
}

export default Home
