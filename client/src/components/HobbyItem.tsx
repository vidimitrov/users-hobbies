import React from 'react'

type Props = {
  hobby: IHobby
  deleteHobby: (_id: string) => void
}

const HobbyItem: React.FC<Props> = ({ hobby, deleteHobby }) => {
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1>{hobby.name}</h1>
        <h4>Passion: {hobby.passionLevel} / Ever since: {hobby.year}</h4>
      </div>
      <div className='Card--button'>
        <button
          onClick={() => deleteHobby(hobby._id)}
          className='Card--button__delete'
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default HobbyItem
