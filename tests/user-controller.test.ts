// tests/api.spec.ts
import { test, expect } from '@playwright/test';
import {StatusCodes} from "http-status-codes";
let baseURL: string = 'http://localhost:3000/users';

test.describe('User management API', () => {

    test('GET / - should return empty when no users', async ({ request }) => {
        const response = await request.post(`${baseURL}`)
        expect(response.status()).toBe(201)
        const responseBody = await response.json()
        expect(responseBody.id).toBeDefined()
        console.log(responseBody)
        const  id  = responseBody.id;

        console.log(id)

        const getResponse = await request.get(`${baseURL}/${id}`)
        expect(getResponse.status()).toBe(StatusCodes.CREATED)
        const getResponseBody = await response.json()
        expect(getResponseBody.id).toBeDefined()

    });

    test('GET /:id - should return a user by ID', async ({ request }) => {

    });

    test('GET /:id - should return 404 if user not found', async ({ request }) => {
        const response = await request.get(`${baseURL}/1000`)
        expect(response.status()).toBe(StatusCodes.NOT_FOUND)
        const responseBody = await response.json()
        expect.soft(responseBody.message).toBe("User not found")
    });

    test('POST / - should add a new user', async ({ request }) => {
        const response = await request.post(`${baseURL}`)
        expect(response.status()).toBe(StatusCodes.CREATED)
        const responseBody = await response.json()
        expect(responseBody.id).toBeDefined()

    });

    test('DELETE /:id - should delete a user by ID', async ({ request }) => {

        const response = await request.post(`${baseURL}`)
        expect(response.status()).toBe(StatusCodes.CREATED)
        const responseBody = await response.json()
        expect(responseBody.id).toBeDefined()
        const  id  = responseBody.id

        const deleteResponse = await request.delete(`${baseURL}/${id}`)
        expect(deleteResponse.status()).toBe(StatusCodes.CREATED)
        const deleteResponseBody = await deleteResponse.json()
        console.log(deleteResponseBody)
        const getResponse = await request.get(`${baseURL}/${id}`)
        expect(getResponse.status()).toBe(StatusCodes.NOT_FOUND);

    });

    test('DELETE /:id - should return 404 if user not found', async ({ request }) => {
        const response = await request.delete(`${baseURL}/1000`)
        expect(response.status()).toBe(StatusCodes.NOT_FOUND)
        const responseBody = await response.json()
        expect.soft(responseBody.message).toMatch('User not found')
        console.log(responseBody)

    });


});
