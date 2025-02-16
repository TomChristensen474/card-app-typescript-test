import { describe, expect, test } from "@jest/globals";
import assert from "assert";
import { isExportSpecifier } from "typescript";
import Prisma from "../src/db";
import { server } from "../src/server";



describe('testing the "/create/ route"', () => {
  
  beforeEach(async () => {
    await Prisma.entry.deleteMany();
  });

  afterEach(async () => {
    await Prisma.entry.deleteMany();
  });

  test("default POST request", async () => {
    const reqBody = {
      title: "test",
      description: "test description",
      created_at: new Date().toISOString().split("T")[0], // get passed in as ISOstrings from FE
      scheduled_for: new Date().toISOString().split("T")[0], // get passed in as ISOstrings from FE
    };

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: reqBody,
    });

    expect(response.statusCode).toBe(200);
    expect.objectContaining({
      title: expect(reqBody.title),
      description: expect(reqBody.description),
      created_at: expect.any(reqBody.created_at),
      scheduled_for: expect.any(reqBody.scheduled_for),
    });
  });

  test("POST request inserts to db", async () => {
    const reqBody = {
      title: "test",
      description: "test description",
      created_at: new Date().toISOString().split("T")[0], // get passed in as ISOstrings from FE
      scheduled_for: new Date().toISOString().split("T")[0], // get passed in as ISOstrings from FE
    };

    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: reqBody,
    });

    const dbEntry = await Prisma.entry.findUnique({
      where: { id: response.json().id },
    });

    const entry = {
      id: dbEntry?.id,
      title: dbEntry?.title,
      description: dbEntry?.description,
      created_at: dbEntry?.created_at.toISOString(),
      scheduled_for: dbEntry?.scheduled_for.toISOString(),
    };

    expect(entry).toEqual(response.json());
  });
});

describe('testing the "/update/:id"route', () => {

  beforeEach(async () => {
    await Prisma.entry.deleteMany();
  });

  afterEach(async () => {
    await Prisma.entry.deleteMany();
  });

  test("default PUT request", async () => {
    const reqBody = {
      title: "test",
      description: "test description",
      created_at: new Date().toISOString().split("T")[0], // get passed in as ISOstrings from FE
      scheduled_for: new Date().toISOString().split("T")[0], // get passed in as ISOstrings from FE
    };

    const post_response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: reqBody,
    });

    const new_scheduled_for = new Date().toISOString().split("T")[0];
    const new_description = "updated description";
    reqBody.scheduled_for = new_scheduled_for;
    reqBody.description = "new_description";

    const response = await server.inject({
      method: "PUT",
      url: "/update/" + post_response.json().id,
      payload: reqBody,
    });

    expect(response.statusCode).toBe(200);
    expect.objectContaining({
      title: expect(reqBody.title),
      description: expect(new_description),
      created_at: expect.any(reqBody.created_at),
      scheduled_for: expect.any(new_scheduled_for),
    });
  });

  test("PUT request updates db", async () => {
    const reqBody = {
      title: "test",
      description: "test description",
      created_at: new Date().toISOString().split("T")[0], // get passed in as ISOstrings from FE
      scheduled_for: new Date().toISOString().split("T")[0], // get passed in as ISOstrings from FE
    };

    const post_response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: reqBody,
    });

    const new_scheduled_for = new Date().toISOString().split("T")[0];
    const new_description = "updated description";
    reqBody.scheduled_for = new_scheduled_for;
    reqBody.description = new_description;

    const response = await server.inject({
      method: "PUT",
      url: "/update/" + post_response.json().id,
      payload: reqBody,
    });

    const dbEntry = await Prisma.entry.findUnique({
      where: { id: post_response.json().id },
    });

    const expected = {
      title: reqBody.title,
      description: reqBody.description,
      created_at: reqBody.created_at,
      scheduled_for: reqBody.scheduled_for,
    };

    const entry = {
      title: dbEntry?.title,
      description: dbEntry?.description,
      created_at: dbEntry?.created_at.toISOString().split("T")[0],
      scheduled_for: dbEntry?.scheduled_for.toISOString().split("T")[0],
    };

    expect(entry).toEqual(expected);
  });
});
