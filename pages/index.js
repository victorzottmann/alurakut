import React, { useState, useEffect } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

import ProfileSidebar from '../src/components/ProfileSidebar'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import ProfileRelations from '../src/components/ProfileRelations'

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx)
  const token = cookies.USER_TOKEN

  const { isAuthenticated } = await fetch(
    'https://alurakut.vercel.app/api/auth',
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((res) => res.json())

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser, // will be passed to the Home component as props
    },
  }
}

function Home(props) {
  const [communities, setCommunities] = useState([])
  const [followers, setFollowers] = useState([])

  const githubUser = props.githubUser

  useEffect(() => {
    // GET request
    fetch('https://api.github.com/users/victorzottmann/followers')
      .then((res) => res.json())
      .then((data) => setFollowers(data))

    // GraphQL API
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: 'cb94c76f7bea2e4fa1cb58ab83d405',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((jsonResponse) => {
        const communitiesFromDatoCms = jsonResponse.data.allCommunities
        console.log(communities)
        setCommunities(communitiesFromDatoCms)
      })
  }, [])

  const handleCreateCommunity = (e) => {
    e.preventDefault()
    const formInputData = new FormData(e.target)

    const community = {
      title: formInputData.get('title'),
      imageUrl: formInputData.get('image'),
      creatorSlug: githubUser,
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community),
    }).then(async (res) => {
      const data = await res.json()

      console.log('data:', data.registroCriado)
      setCommunities([...communities, community])
    })
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        {/* First column */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar user={githubUser} />
        </div>

        {/* Second column */}
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Welcome</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">What would you like to do?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  placeholder="What will be the name of your community?"
                  name="title"
                  aria-label="What will be the name of your community?"
                />
              </div>
              <div>
                <input
                  placeholder="Provide a URL to link to the image."
                  name="image"
                  aria-label="Provide a URL to link to the image."
                />
              </div>
              <button>Create community</button>
            </form>
          </Box>
        </div>

        {/* Third column */}
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelations title="Followers" items={followers} />
          <ProfileRelations title="Communities" items={communities} />
        </div>
      </MainGrid>
    </>
  )
}

export default Home
