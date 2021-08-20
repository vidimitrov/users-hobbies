import request from "supertest";
import { app } from "../app";
import { IUser } from "../types/user";

describe("Hobbies Tests", () => {
  it("fetching all hobbies should succeed with given user id", async () => {
    const usersResponse = await request(app).get("/users");
    expect(usersResponse.status).toBe(200);
    expect(usersResponse.body).toBeDefined();
    expect(usersResponse.body.users).toBeDefined();
    expect(Array.isArray(usersResponse.body.users)).toBe(true);
    expect(usersResponse.body.users.length).toBeGreaterThan(0);

    const user: IUser = usersResponse.body.users[0];
    const hobbiesResponse = await request(app).get(`/users/${user._id}/hobbies`);
    expect(hobbiesResponse.status).toBe(200);
    expect(hobbiesResponse.body).toBeDefined();
    expect(hobbiesResponse.body.hobbies).toBeDefined();
    expect(Array.isArray(hobbiesResponse.body.hobbies)).toBe(true);
    expect(hobbiesResponse.body.hobbies.length).toBeGreaterThan(0);
  });

  it("fetching all hobbies should fail for non-existing user", async () => {
    const hobbiesResponse = await request(app).get(`/users/611e3ccf0abd408180b80aa1/hobbies`);
    expect(hobbiesResponse.status).toBe(401);
  });
});
