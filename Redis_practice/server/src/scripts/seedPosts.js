import mongoose from 'mongoose'
import connectToDb from '../config/db.js'
import Post from '../models/post.model.js'

const TOTAL_POSTS = 1_000_000;
const BATCH_SIZE = 1_000;
const TITLES = [
    'A day in the mountains',
    'Learning something new',
    'Thoughts on good design',
    'A simple recipe to try',
    'Notes from the weekend',
    'Building better habits',
    'Exploring a new place',
    'The value of taking a break',
    'Small wins this week',
    'A project in progress'
];
const BODY = 'This is sample post content generated for development and load testing. ';
const BASE_DATE = new Date('2020-01-01T00:00:00.000Z');

const makePostId = (index) => new mongoose.Types.ObjectId(
    index.toString(16).padStart(24, '0')
);

const seedPosts = async () => {
    await connectToDb();

    for (let start = 0; start < TOTAL_POSTS; start += BATCH_SIZE) {
        const end = Math.min(start + BATCH_SIZE, TOTAL_POSTS);
        const operations = [];

        for (let index = start; index < end; index += 1) {
            operations.push({
                updateOne: {
                    filter: { _id: makePostId(index) },
                    update: {
                        $setOnInsert: {
                            title: `${TITLES[index % TITLES.length]} #${index + 1}`,
                            body: BODY.repeat(1 + (index % 4)),
                            authorId: (index % 10_000) + 1,
                            createdAt: new Date(BASE_DATE.getTime() + index * 1_000)
                        }
                    },
                    upsert: true
                }
            });
        }

        await Post.bulkWrite(operations, { ordered: false });

        if (end % 100_000 === 0 || end === TOTAL_POSTS) {
            console.log(`Seeded ${end.toLocaleString()} / ${TOTAL_POSTS.toLocaleString()} posts`);
        }
    }
};

try {
    await seedPosts();
} catch (error) {
    console.error('Failed to seed posts:', error);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
