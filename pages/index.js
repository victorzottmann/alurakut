import styled from 'styled-components'

import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu } from '../src/lib/AlurakutCommons'

function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const usuarioAleatorio = 'victorzottmann'

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            Bem-vindo
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea:'profileRelationsArea' }}>
          <Box>
            Amigos
          </Box>
          <Box>
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  ) 
}
