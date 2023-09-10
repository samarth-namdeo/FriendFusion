import express from 'express';

import {getFeedPosts, getUserPosts, likePosts} from '../controllers/posts.js';
import { verifyToken } from '../middlewares/auth.js';
import e from 'express';

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts); //on home page -> all feed
router.get("/:id", verifyToken, getUserPosts); // on profile page -> all user posts

// UPDATE
router.patch("/:id/like", verifyToken, likePosts); // like post

export default router;

