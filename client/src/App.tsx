import React, { useEffect, useState } from 'react'
import { Grid, Hidden } from '@material-ui/core'
import UserItem from './components/UserItem'
import AddUser from './components/AddUser'
import HobbyItem from './components/HobbyItem'
import AddHobby from './components/AddHobby'
import ResizableTable from './components/ResizableTable'
import { useModal } from './hooks/useModal';
import { getUsers, addUser, addHobby, getHobbies, deleteHobby } from './api'
import { ConfirmationModal } from './components/ConfirmationModal'

const App: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [hobbies, setHobbies] = useState<IHobby[]>([])
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
  const [hobbyForDeletionId, setHobbyForDeletionId] = useState<string | null>(null)
  const deleteHobbyModal = useModal();

  const fetchUsers = (): void => {
    getUsers()
    .then(({ data: { users } }: IUser[] | any) => setUsers(users))
    .catch((err: Error) => console.log(err))
  }

  const fetchHobbies = (userId: string): void => {
    getHobbies(userId)
    .then(({ data: { hobbies } }: IHobby[] | any) => setHobbies(hobbies))
    .catch((err: Error) => console.log(err))
  }

  const handleSaveUser = (e: React.FormEvent, formData: IUser): void => {
    e.preventDefault()
    addUser(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! User not saved')
        }
        setUsers(data.users)
      })
      .catch((err) => console.log(err))
  }

  const handleSaveHobby = (e: React.FormEvent, formData: IHobby): void => {
    e.preventDefault()
    const userId = selectedUser?._id;
    if (userId) {
      addHobby(formData, userId)
        .then(({ status }) => {
          if (status !== 201) {
            throw new Error('Error! Hobby not saved')
          }
          fetchHobbies(userId)
        })
        .catch((err) => console.log(err))
    } else {
      throw new Error('Error! Hobby not saved. Select a user first!')
    }
  }

  const handleDeleteHobby = (hobbyId: string): void => {
    const userId = selectedUser?._id;
    if (userId) {
      deleteHobby(userId, hobbyId)
        .then(({ status }) => {
          if (status !== 200) {
            throw new Error('Error! Hobby not deleted')
          }
          fetchHobbies(userId)
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    const userId = selectedUser?._id;
    if (userId) {
      fetchHobbies(userId)
    }
  }, [selectedUser])

  return (
    <main className='App'>
      <h1>User Hobbies</h1>
      <Hidden mdDown>
        <ResizableTable
          headers={["Users", "Hobbies"]}
          tableContent={
            <tbody>
              <tr>
                <td>
                  <AddUser saveUser={handleSaveUser} />
                  <div className="scrollable-container">
                    {users.map((user: IUser) => (
                      <UserItem
                        key={user._id}
                        selected={selectedUser?._id === user._id}
                        user={user}
                        onUserSelect={() => {
                          setSelectedUser(user);
                        }}
                      />
                    ))}
                  </div>
                </td>
                <td>
                  {selectedUser ? 
                    <div>
                      <AddHobby saveHobby={handleSaveHobby} />
                      <div className="scrollable-container">
                        {hobbies.map((hobby: IHobby) => (
                          <HobbyItem
                            key={hobby._id}
                            hobby={hobby}
                            deleteHobby={() => handleDeleteHobby(hobby._id)}
                          />
                        ))}
                        {
                          hobbies && hobbies.length === 0 ?
                          <p>No hobbies for this user</p> :
                          null
                        }
                      </div>
                    </div> 
                  : null}
                </td>
              </tr>
            </tbody>
          }
        />
      </Hidden>
      <Hidden lgUp>
        <Grid container spacing={1} direction="column" style={{ padding: 8 }}>
          <Grid item style={{ width: '100%' }}>
            <AddUser saveUser={handleSaveUser} />
            {users.map((user: IUser) => (
              <UserItem
                key={user._id}
                selected={selectedUser?._id === user._id}
                user={user}
                onUserSelect={() => {
                  setSelectedUser(user);
                }}
              />
            ))}
          </Grid>
          <Grid item style={{ width: '100%' }}>
            {selectedUser ? 
              <div>
                <AddHobby saveHobby={handleSaveHobby} />
                {hobbies.map((hobby: IHobby) => (
                  <HobbyItem
                    key={hobby._id}
                    hobby={hobby}
                    deleteHobby={() => {
                      setHobbyForDeletionId(hobby._id)
                      deleteHobbyModal.openModal();
                    }}
                  />
                ))}
                {
                  hobbies && hobbies.length === 0 ?
                  <p>No hobbies for this user</p> :
                  null
                }
              </div> 
            : null}
          </Grid>
        </Grid>
      </Hidden>
      <ConfirmationModal
        isOpen={deleteHobbyModal.isModalOpen}
        content={'Are you sure you want to delete this hobby?'}
        onConfirm={async () => {
          if (hobbyForDeletionId) {
            handleDeleteHobby(hobbyForDeletionId);
            deleteHobbyModal.closeModal();
          }
        }}
        onDismiss={() => {
          deleteHobbyModal.closeModal();
        }}
      />
    </main>
  )
}

export default App
