import { createSlice } from '@reduxjs/toolkit'

export const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: []
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload
    },
  },
})

export const { setFriends } = friendsSlice.actions

export default friendsSlice.reducer
