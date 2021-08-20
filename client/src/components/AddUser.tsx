import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

type Props = { 
  saveUser: (e: React.FormEvent, formData: IUser | any) => void 
}

const AddUser: React.FC<Props> = ({ saveUser }) => {
  const [formData, setFormData] = useState<IUser | {}>()

  const handleForm = (e): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => saveUser(e, formData)}>
      <div>
        <TextField id="name" label="Name" variant="outlined" onChange={handleForm} />
      </div>
      <div>
        <Button variant="contained" disabled={!(formData && (formData as IUser).name)}>Add</Button>
      </div>
    </form>
  )
}

export default AddUser
