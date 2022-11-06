const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Link = require('../src/models/link');
const helper = require('./test_helper');
const {initialLinks} = require('./test_helper');
require("dotenv").config();

const api = supertest(app);

beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI);
});

beforeEach(async () => {
    await Link.deleteMany({});
    await Link.insertMany(helper.initialLinks);
});

describe('GET /api/links', () => {
    test('all links are returned', async () => {
        const response = await api.get('/api/links')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.body.success).toEqual(true);
        expect(response.body.data).toHaveLength(helper.initialLinks.length);
    });

    test('specific links are returned', async () => {
        await api.get('/api/links');
        const links = await helper.getAllLinksInDB();
        const urls = links.map(l => l.url);
        expect(urls).toContain('https://mongoosejs.com/docs/index.html');
        expect(urls).toContain('https://github.com/webdev-20/TLL-hacktoberfest-2022');
    });


});

describe('GET /api/links/{short} - get original url from shortcode', () => {
    test('redirects to original url', async () => {
        const link = initialLinks[1];

        const res = await api
            .get(`/api/links/${link.short}`)
            .expect(200)

        expect(res.body.success).toBe(true)
        expect(res.body.data.longUrl).toBe(link.url)
    });

    test('returns an error when no link with short exist', async () => {
        const short = "notExist";

        await api
            .get(`/api/links/${short}`)
            .expect(404);
    });
});

describe('POST /api/links', () => {
    test('a link can be added, title is optional, timesClicked is defaulted to 0', async () => {
        const newLink = {
            url: 'https://www.frontendmentor.io/home'
        };
        const res = await api
            .post('/api/links')
            .send(newLink)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        expect(res.body.success).toBe(true);
        const links = await helper.getAllLinksInDB();
        const urls = links.map(l => l.url);
        expect(links).toHaveLength(helper.initialLinks.length + 1);
        expect(urls).toContain(newLink.url);

        expect(res.body.success).toBe(true)
        const short = res.body.data.short

        const link = await helper.getLinkByShort(short)
        expect(link.title).toBe(undefined)
        expect(link.timesClicked).toBe(0)
    });

    test('a link can be added with a custom code', async () => {
        const newLink = {
            url: "https://vitejs.dev/guide/#trying-vite-online",
            short: 'vite'
        };
        const res = await api
            .post('/api/links')
            .send(newLink)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        expect(res.body.data.short).toEqual(newLink.short);
        expect(res.body.success).toBe(true);

        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length + 1);

        const urls = links.map(l => l.url);
        expect(urls).toContain(newLink.url);

        const shorts = links.map(l => l.short);
        expect(shorts).toContain(newLink.short);
    });

    test('a title can be added to the link', async () => {
        const newLink = {
            url: "https://vitejs.dev/guide/#trying-vite-online",
            title: 'Trying Vite'
        };
        const res = await api
            .post('/api/links')
            .send(newLink)
            .expect(201)
            .expect('Content-Type', /application\/json/);


        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length + 1);

        expect(res.body.success).toBe(true)
        const short = res.body.data.short

        const link = await helper.getLinkByShort(short)
        expect(link.title).toBe(newLink.title)
    })

    test('duplicate shortcode url will return an error(409)', async () => {
        const newLink = {
            url: "https://vitejs.dev/guide/#trying-vite-online",
            short: 'shorti'
        };
        const res = await api
            .post('/api/links')
            .send(newLink)
            .expect(409)
            .expect('Content-Type', /application\/json/);
        expect(res.body.success).toBe(false);
        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length);
    });

    test('short code with invalid characters will return an error (422)', async () => {
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
        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length);
    });

// TODO: Add tests for short code too long / too short when they are decided

    test('a link without url will return an error (422)', async () => {
        const newLink = {};
        const res = await api
            .post('/api/links')
            .send(newLink)
            .expect(422)
            .expect('Content-Type', /application\/json/);
        expect(res.body.success).toBe(false);
        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length);
    });

    test('invalid url will return an error (422)', async () => {
        const url = "github";
        const newLink = {
            url
        };
        const res = await api
            .post('/api/links')
            .send(newLink)
            .expect(422)
            .expect('Content-Type', /application\/json/);
        expect(res.body.success).toBe(false);
        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length);
    });
});

describe('PUT api/links/{short}', () => {
    test('a link can be edited (url)', async () => {
        const linksAtStart = await helper.getAllLinksInDB();
        const linkToEdit = linksAtStart[0];
        const newUrl = {
            url: 'https://graphql.org/'
        };

        const res = await api
            .put(`/api/links/${linkToEdit.short}`)
            .send(newUrl)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(res.body.success).toBe(true);
        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length);
        const updatedLinkInDb = await helper.getLinkByShort(linkToEdit.short);
        expect(updatedLinkInDb.url).toBe(newUrl.url);
    });

    test('a link can be edited (title)', async () => {
        const linksAtStart = await helper.getAllLinksInDB();
        const linkToEdit = linksAtStart[0];
        const newUrl = {
            title: 'GraphQL'
        };

        const res = await api
            .put(`/api/links/${linkToEdit.short}`)
            .send(newUrl)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(res.body.success).toBe(true);
        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length);
        const updatedLinkInDb = await helper.getLinkByShort(linkToEdit.short);
        expect(updatedLinkInDb.title).toBe(newUrl.title);
    });

    test('a link can be edited (url and title)', async () => {
        const linksAtStart = await helper.getAllLinksInDB();
        const linkToEdit = linksAtStart[0];
        const newUrl = {
            url: 'https://graphql.org/',
            title: 'GraphQL'
        };

        const res = await api
            .put(`/api/links/${linkToEdit.short}`)
            .send(newUrl)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(res.body.success).toBe(true);
        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length);
        const updatedLinkInDb = await helper.getLinkByShort(linkToEdit.short);
        expect(updatedLinkInDb.title).toBe(newUrl.title);
        expect(updatedLinkInDb.url).toBe(newUrl.url);
    });

    test('post body without url and title will return an error (400)', async () => {
        const short = initialLinks[0].short;
        const newUrl = {};
        const res = await api
            .put(`/api/links/${short}`)
            .send(newUrl)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(res.body.success).toBe(false);
        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length);
    });

    test('returns 404, if no link is found for the short code', async () => {
        const short = "notExist";
        const newUrl = {
            url: 'https://graphql.org/'
        };
        const res = await api
            .put(`/api/links/${short}`)
            .send(newUrl)
            .expect(404)
            .expect('Content-Type', /application\/json/);
        expect(res.body.success).toBe(false);
        expect(await helper.getAllLinksInDB()).toHaveLength(helper.initialLinks.length);

    });

    test('invalid url will return an error (422)', async () => {
        const short = initialLinks[0].short;
        const newLink = {
            url: "github",
            short
        };
        const res = await api
            .put(`/api/links/${short}`)
            .send(newLink)
            .expect(422)
            .expect('Content-Type', /application\/json/);
        expect(res.body.success).toBe(false);
        const links = await helper.getAllLinksInDB();
        expect(links).toHaveLength(helper.initialLinks.length);
    });
});

describe('DELETE api/links/{short}', () => {
    test('a link can be deleted', async () => {
        const linksAtStart = await helper.getAllLinksInDB();
        const linkToDelete = linksAtStart[0];

        const res = await api
            .delete(`/api/links/${linkToDelete.short}`)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(res.body.success).toBe(true);

        const linksAfterDelete = await helper.getAllLinksInDB();
        expect(linksAfterDelete).toHaveLength(helper.initialLinks.length - 1);
        const linksUrl = linksAfterDelete.map(l => l.url);
        expect(linksUrl).not.toContain(linkToDelete.url);
        const linksShort = linksAfterDelete.map(l => l.short);
        expect(linksShort).not.toContain(linkToDelete.short);
    });

    test('/{short} - returns an error when no link with short exist', async () => {
        const short = "notExist";

        const res = await api
            .delete(`/api/links/${short}`)
            .expect(404)
            .expect('Content-Type', /application\/json/);
        expect(res.body.success).toBe(false);
        expect(await helper.getAllLinksInDB()).toHaveLength(helper.initialLinks.length);
    });
});


afterAll(async () => {
    await mongoose.connection.close();
});