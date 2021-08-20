import request from "supertest";
import { app } from "../app";

describe("Users Tests", () => {
  it("fetching all users should succeed", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.users).toBeDefined();
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBeGreaterThan(0);
  });
});
