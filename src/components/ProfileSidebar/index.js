import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons'

import Box from '../Box'

function ProfileSidebar({ user }) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${user}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${user}`}>
          @{user}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default ProfileSidebar
