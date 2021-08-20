import React from 'react'

type Props = {
  user: IUser
  selected: boolean
  onUserSelect: () => void
}

const UserItem: React.FC<Props> = ({ user, selected = false, onUserSelect }) => {
  return (
    <div className={`Card ${selected ? "selected" : ""}`}  onClick={onUserSelect}>
      <div className='Card--text'>
        <h1>{user.name}</h1>
      </div>
    </div>
  )
}

export default UserItem
