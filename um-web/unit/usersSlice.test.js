import { configureStore } from "@reduxjs/toolkit";
import usersReducer, { fetchUsers, createUser, updateUser, deleteUser, fetchUserById } from "./usersSlice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Create a mock instance of axios
const mock = new MockAdapter(axios);

// Setup a test Redux store
const store = configureStore({ reducer: { users: usersReducer, auth: (state = { token: "test-token" }) => state } });

describe("Users Slice", () => {
  afterEach(() => {
    mock.reset(); // Reset the mock after each test
  });

  test("should handle fetching users", async () => {
    // Mock API response for fetching users
    const users = [{ _id: "123", firstname: "John", lastname: "Doe" }];
    mock.onGet("http://localhost:5000/api/users").reply(200, users);

    // Dispatch the fetchUsers action
    await store.dispatch(fetchUsers());

    // Get updated state
    const state = store.getState().users;

    // Expect users to be set in the state
    expect(state.users).toEqual(users);
  });

  test("should handle creating a user", async () => {
    // Mock API response for creating a user
    const newUser = { _id: "123", firstname: "John", lastname: "Doe" };
    mock.onPost("http://localhost:5000/api/users").reply(200, newUser);

    // Dispatch the createUser action
    await store.dispatch(createUser(newUser));

    // Get updated state
    const state = store.getState().users;

    // Expect user to be added to the users array
    expect(state.users).toContainEqual(newUser);
  });

  test("should handle updating a user", async () => {
    // Mock API response for updating a user
    const updatedUser = { _id: "123", firstname: "John", lastname: "Smith" };
    mock.onPut("http://localhost:5000/api/users/123").reply(200, updatedUser);

    // Dispatch updateUser action
    await store.dispatch(updateUser(updatedUser));

    // Get updated state
    const state = store.getState().users;

    // Expect updated user to be in users array
    expect(state.users.find((user) => user._id === "123")).toEqual(updatedUser);
  });

  test("should handle deleting a user", async () => {
    // Mock API response for deleting a user
    const userId = "123";
    mock.onDelete(`http://localhost:5000/api/users/${userId}`).reply(200, userId);

    // Dispatch deleteUser action
    await store.dispatch(deleteUser(userId));

    // Get updated state
    const state = store.getState().users;

    // Expect user to be removed from the users array
    expect(state.users.find((user) => user._id === userId)).toBeUndefined();
  });

  test("should handle fetching a user by ID", async () => {
    // Mock API response for fetching a user by ID
    const user = { _id: "123", firstname: "John", lastname: "Doe" };
    mock.onGet(`http://localhost:5000/api/users/${user._id}`).reply(200, user);

    // Dispatch fetchUserById action
    await store.dispatch(fetchUserById(user._id));

    // Get updated state
    const state = store.getState().users;

    // Expect selected user to be set in the state
    expect(state.selectedUser).toEqual(user);
  });
});
