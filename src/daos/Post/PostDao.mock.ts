import {IPost, IUser} from '@entities';
import { MockDaoMock } from '../MockDb/MockDao.mock';
import { IPostDao } from './PostDao';
import v4 from 'uuid/v4';
import {v4String} from 'uuid/interfaces';

export class PostDao extends MockDaoMock implements IPostDao {

    public async getAll(): Promise<IUser[]> {
        try {
            const db = await super.openDb();
            return db.posts;
        } catch (err) {
            throw err;
        }
    }

    public async getAllOfUser(id: v4String): Promise<IUser[]> {
        try {
            const db = await super.openDb();
            return db.posts;
        } catch (err) {
            throw err;
        }
    }

    public async getAllForUser(id: v4String): Promise<IUser[]> {
        try {
            const db = await super.openDb();
            return db.posts;
        } catch (err) {
            throw err;
        }
    }

    public async getCommentsOfPost(id: v4String): Promise<IUser[]> {
        try {
            const db = await super.openDb();
            return db.posts;
        } catch (err) {
            throw err;
        }
    }

    public async add(post: IPost): Promise<any> {
        try {
            const db = await super.openDb();
            post.id = v4;
            db.posts.push(post);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }

    public async update(post: IPost): Promise<any> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.posts.length; i++) {
                if (db.posts[i].id === post.id) {
                    db.posts[i] = post;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Post not found');
        } catch (err) {
            throw err;
        }
    }

    public async delete(id: v4String): Promise<any> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.posts.length; i++) {
                if (db.posts[i].id === id) {
                    db.posts.splice(i, 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Post not found');
        } catch (err) {
            throw err;
        }
    }
}
