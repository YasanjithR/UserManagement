import { configureStore } from "@reduxjs/toolkit";
import usersReducer, {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser
} from "../src/features/userSlice";


jest.mock('axios');

import axios from 'axios';

const store = configureStore({ 
  reducer: { 
    users: usersReducer 
  } 
});

describe("Users Slice", () => {
  beforeEach(() => {
 
    jest.clearAllMocks();
  });

  test("should handle fetching users", async () => {
    const users = [{ _id: "123", firstname: "John", lastname: "Doe" }];

    axios.get.mockResolvedValueOnce({ data: users });

    await store.dispatch(fetchUsers());

    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:5000/api/users"
    );

    const state = store.getState().users;
    expect(state.users).toEqual(users);
  });

  test("should handle creating a user", async () => {
    const newUser = { firstname: "John", lastname: "Doe" };
    const savedUser = { ...newUser, _id: "123" };
    
    axios.post.mockResolvedValueOnce({ data: savedUser });

    await store.dispatch(createUser(newUser));

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/api/users",
      newUser
    );

    const state = store.getState().users;
    expect(state.users).toContainEqual(savedUser);
  });

  test("should handle updating a user", async () => {
    const updatedUser = { _id: "123", firstname: "John", lastname: "Smith" };
    
    axios.put.mockResolvedValueOnce({ data: updatedUser });

    await store.dispatch(updateUser(updatedUser));

    expect(axios.put).toHaveBeenCalledWith(
      `http://localhost:5000/api/users/${updatedUser._id}`,
      updatedUser
    );

    const state = store.getState().users;
    expect(state.users.find(u => u._id === updatedUser._id)).toEqual(updatedUser);
  });

  test("should handle deleting a user", async () => {
    const userId = "123";
    
    axios.delete.mockResolvedValueOnce({ data: userId });

   
    store.dispatch({ 
      type: 'users/resetState', 
      payload: [{ _id: userId, firstname: "John", lastname: "Doe" }] 
    });

    await store.dispatch(deleteUser(userId));

    expect(axios.delete).toHaveBeenCalledWith(
      `http://localhost:5000/api/users/${userId}`
    );

    const state = store.getState().users;
    expect(state.users.find(u => u._id === userId)).toBeUndefined();
  });
});