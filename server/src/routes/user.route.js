const express = require('express');
const router = express.Router();
const {postSignup, postLogin} = require('../controllers/user.controller');

/**
 * @openapi
 * /api/users/signup/:
 *   post:
 *     tags:
 *       - Auth
 *     description: Register/Signup a new user
 *     requestBody:
 *       $ref: '#/components/requestBodies/Auth'
 *     responses:
 *       200:
 *         description: Signup successful
 *         content:
 *             application/json:
 *               schema:
 *                 required:
 *                   - success
 *                   - message
 *                 properties:
 *                     success:
 *                       type: boolean
 *                     message:
 *                       type: string
 *       400:
 *         description: Validation error
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
 *       409:
 *         description: Account already exist
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
 *       '500':
 *         description: Unknown error
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

router.post('/signup', postSignup);
/**
 * @openapi
 * /api/users/login/:
 *   post:
 *     tags:
 *       - Auth
 *     description: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Auth successful
 *         content:
 *           application/json:
 *             schema:
 *               required:
 *                 - sucess
 *                 - message
 *                 - token
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       '401':
 *         description: Unauthorized (incorrect username/password)
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
 *       '500':
 *         description: Unexpected error
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
router.post('/login', postLogin);

module.exports = router;
