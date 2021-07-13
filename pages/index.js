import styled from 'styled-components'

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

const Box = styled.div`
  background: #fff;
  border-radius: 8px;

`

const MainGrid = styled.main`
  display: grid;
  padding: 16px;
  grid-gap: 10px;

  @media(min-width: 860px) {
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 618px 312px;
  }
`

export default function Home() {
  return (
    <MainGrid>
      <div style={{ gridArea: 'profileArea' }}>
        <Box>
          Imagem
        </Box>
      </div>
      <div style={{ gridArea: 'welcomeArea' }}>
        <Box>
          Bem-vindo
        </Box>
      </div>
      <div style={{ gridArea:'profileRelationsArea' }}>
        <Box>
          Comunidades
        </Box>
      </div>
    </MainGrid>
  ) 
}
