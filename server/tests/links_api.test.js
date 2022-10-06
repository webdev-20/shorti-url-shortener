const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Link = require('../src/models/link');
const helper = require('./test_helper')
require("dotenv").config();

const api = supertest(app);

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI);
});



beforeEach(async () => {
    await Link.deleteMany({});
    await Link.insertMany(helper.initialLinks);
});

test('GET /api/links - all links are returned', async () => {
    const response = await api.get('/api/links')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    expect(response.body.success).toEqual(true);
    expect(response.body.data).toHaveLength(helper.initialLinks.length);
});

test('GET /api/links - specific links are returned', async () => {
    await api.get('/api/links');
    const links = await helper.getAllLinksInDB()
    const urls = links.map(l=>l.url)
    expect(urls).toContain('https://mongoosejs.com/docs/index.html');
    expect(urls).toContain('https://github.com/webdev-20/TLL-hacktoberfest-2022');
});

test('POST /api/links - a link can be added', async () => {
    const url = 'https://www.frontendmentor.io/home';
    const newLink = {
        url
    };
    const postRes = await api
        .post('/api/links')
        .send(newLink)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    expect(postRes.body.success).toBe(true)
    const links = await helper.getAllLinksInDB()
    const urls = links.map(l=>l.url)
    expect(links).toHaveLength(helper.initialLinks.length + 1);
    expect(urls).toContain(url);
});

test('POST /api/links - a link can be added with a custom code', async () => {
    const customCode = 'vite';
    const url = "https://vitejs.dev/guide/#trying-vite-online";

    const newLink = {
        url,
        short: customCode
    };
    const postRes = await api
        .post('/api/links')
        .send(newLink)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    expect(postRes.body.data.short).toEqual(customCode);
    expect(postRes.body.success).toBe(true);

    const links = await helper.getAllLinksInDB()
    expect(links).toHaveLength(helper.initialLinks.length + 1);

    const urls = links.map(l=>l.url)
    expect(urls).toContain(url);

    const shorts = links.map(l=>l.short)
    expect(shorts).toContain(customCode)
});

test('POST /api/links - duplicate shortcode url will return an error(409)', async () => {
    const customCode = 'shorti';
    const url = "https://vitejs.dev/guide/#trying-vite-online";
    const newLink = {
        url,
        short: customCode
    };
    const postRes = await api
        .post('/api/links')
        .send(newLink)
        .expect(409)
        .expect('Content-Type', /application\/json/);
    expect(postRes.body.success).toBe(false);
    const links = await helper.getAllLinksInDB()
    expect(links).toHaveLength(helper.initialLinks.length);
});

test('POST /api/links - short code with invalid characters will return an error (422)', async () => {
    const customCode = 'a@@#$^';
    const url = "https://github.com/webdev-20/TLL-hacktoberfest-2022";
    const newLink = {
        url,
        short: customCode
    };
    const postRes = await api
        .post('/api/links')
        .send(newLink)
        .expect(422)
        .expect('Content-Type', /application\/json/);
    expect(postRes.body.success).toBe(false);
    const links = await helper.getAllLinksInDB()
    expect(links).toHaveLength(helper.initialLinks.length);
});

// TODO: Add tests for short code too long / too short when they are decided

test('POST /api/links - a link without url will return an error (422)', async () => {
    const newLink = {
    };
    const postRes = await api
        .post('/api/links')
        .send(newLink)
        .expect(422)
        .expect('Content-Type', /application\/json/);
    expect(postRes.body.success).toBe(false);
    const links = await helper.getAllLinksInDB()
    expect(links).toHaveLength(helper.initialLinks.length);
});

test('POST /api/links - invalid url will return an error (422)', async () => {
    const url = "github";
    const newLink = {
        url
    };
    const postRes = await api
        .post('/api/links')
        .send(newLink)
        .expect(422)
        .expect('Content-Type', /application\/json/);
    expect(postRes.body.success).toBe(false);
    const links = await helper.getAllLinksInDB()
    expect(links).toHaveLength(helper.initialLinks.length);
});

afterAll(async () => {
    await mongoose.connection.close();
});