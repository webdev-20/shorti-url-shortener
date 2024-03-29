const router = require('express').Router();
const linksController = require('../controllers/links.controller');

/**
 * @openapi
 * /api/links:
 *   get:
 *     tags:
 *       - Links
 *     description: Get all links in the database
 *     responses:
 *       200:
 *         description: Successfully get all links
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - data
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         description: original (long) link
 *                       short:
 *                         type: string
 *                         description: shortened code of the URL
 *                       creationDate:
 *                         type: string
 *                         description: creation date
 *                       expirationDate:
 *                         type: string
 *                         description: date when the link will be expired and be automatically deleted from the database
 *                       id:
 *                         type: string
 *                         description: id of the link
 *
 *       500:
 *         description: cannot get links (server errors)
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get('/', linksController.getAllLinks);

/**
 * @openapi
 *  /api/links:
 *   post:
 *     tags:
 *       - Links
 *     description: Create a shortened link (code)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - url
 *             properties:
 *               url:
 *                 type: string
 *                 description: original url
 *               short:
 *                 type: string
 *                 description: optional custom short code. If not specified, a random code will be generated
 *               title:
 *                 type: string
 *                 description: optional title for the URL
 *     responses:
 *       201:
 *         description: Successfully created a (short) code for the link
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - data
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: original (long) link
 *                     short:
 *                       type: string
 *                       description: shortened code of the URL
 *                     title:
 *                       type: string
 *                       desecription: (optional) if specified
 *       409:
 *         description: Duplicate
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       422:
 *         description: Incorrect length
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Link creation fail
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post('/', linksController.createLink);

/**
 * @openapi
 * /api/links/{short}:
 *   get:
 *     tags:
 *       - Links
 *     description: Get original url from the short code
 *     parameters:
 *       - in: path
 *         name: short
 *         schema:
 *           type: string
 *         required: true
 *         description: short code
 *     responses:
 *       302:
 *         description: Successfully get the original URL and redirect the user
 *       500:
 *         description: cannot get link
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *
 */
router.put('/:short', linksController.editLink);

/**
 * @openapi
 *  /api/links/{short}:
 *    put:
 *     tags:
 *       - Links
 *     description: Edit the original url and/or title, given the short code
 *     parameters:
 *       - in: path
 *         name: short
 *         schema:
 *           type: string
 *         required: true
 *         description: short code
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               url:
 *                 type: string
 *                 require: false
 *               title:
 *                 type: string
 *                 require: false
 *       required: true
 *     responses:
 *       200:
 *         description: URL updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - data
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Url or Title is required in body
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Link Not Found (If short is not matching)
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       422:
 *         description: Invalid Url
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - success
 *                 - message
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get('/:short', linksController.getLinkFromCode);

/**
 * @openapi
 *  /api/links/{short}:
 *   delete:
 *     tags:
 *       - Links
 *     description: delete a link
 *     parameters:
 *       - in : query
 *         name: short
 *         description: short code
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '404':
 *         description: Short link doesn't exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '500':
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                   message:
 *                     type: string
 */
router.delete('/:short', linksController.deleteLink);

module.exports = router;
