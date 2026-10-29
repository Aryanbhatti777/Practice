import { Router } from 'express'
import mongoose from 'mongoose'
import Post from '../models/post.model.js'
import { Redis } from 'ioredis' 

const router = Router();
const redis = new Redis();

router.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const title = req.body?.title;

    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({ error: 'id must be a valid post ID' });
    }

    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'title must be a non-empty string' });
    }

    try {
        const post = await Post.findByIdAndUpdate(
            id,
            { $set: { title: title.trim() } },
            { new: true, runValidators: true }
        ).lean();

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await redis.del(`post${id}`);
        return res.json({ post });
    } catch (error) {
        return next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const post = await redis.get(`post${id}`)
    if (post) {
        return res.status(200).json({
            post: JSON.parse(post)
        })
    }

    try {
        const getpost = await Post.findById(id).lean();
        if (!getpost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await redis.set(`post${id}`, JSON.stringify(getpost))
        return res.json({post: getpost });
    } catch (error) {
        return next(error);
    }
});

export default router;
