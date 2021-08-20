import React, { useState } from 'react'
import { Select, MenuItem, Button, TextField } from '@material-ui/core';

enum PassionLevel {
  "Low",
  "Medium",
  "High",
  "Very-High"
}

type Props = { 
  saveHobby: (e: React.FormEvent, formData: IHobby | any) => void 
}

const AddHobby: React.FC<Props> = ({ saveHobby }) => {
  const [formData, setFormData] = useState<IHobby | {}>()
  const [passionLevel, setPassionLevel] = useState<PassionLevel>();

  const handlePassionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const passionLevelValue = event.target.value as PassionLevel;
    if (passionLevelValue) {
      setFormData({
        ...formData,
        passionLevel: passionLevelValue as any,
      })
      setPassionLevel(passionLevelValue);
    }
  };

  const handleForm = (e): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  return (
    <form className='Form' onSubmit={(e) => {
      saveHobby(e, formData)
      setFormData({})
    }}>
      <div>
        <div>
          <TextField id="name" label="Name" variant="outlined" onChange={handleForm} />
        </div>
        <div>
          <Select
            id="passionLevel"
            value={passionLevel}
            variant="outlined"
            onChange={handlePassionChange}
          >
            <MenuItem value={'Low'}>Low</MenuItem>
            <MenuItem value={'Medium'}>Medium</MenuItem>
            <MenuItem value={'High'}>High</MenuItem>
            <MenuItem value={'Very-High'}>Very High</MenuItem>
          </Select>
        </div>
        <div>
          <TextField id="year" label="Year" variant="outlined" type="number" onChange={handleForm} />
        </div>
      </div>
      <div>
        <Button
          variant="contained"
          type="submit"
          disabled={!(formData && (formData as IHobby).name) || 
            !(formData && (formData as IHobby).passionLevel) || 
            !(formData && (formData as IHobby).year)}
          >
            Add
          </Button>
      </div>
    </form>
  )
}

export default AddHobby
