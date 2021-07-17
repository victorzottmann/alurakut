import React from 'react'
import { ProfileRelationsBoxWrapper } from '../ProfileRelations'

function FriendsList({ title, items }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>
      <ul>
        {items.map((user, index) => {
          if (index < 6) {
            return (
              <li key={user.id}>
                <a href={`https://github.com/${user.login}`}>
                  <img src={user.avatar_url} />
                  <span>{user.login}</span>
                </a>
              </li>
            )
          }
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default FriendsList
