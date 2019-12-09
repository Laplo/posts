import {IPost, IReaction, IUser} from '@entities';
import { MockDaoMock } from '../MockDb/MockDao.mock';
import { IReactionDao } from './ReactionDao';
import v4 from 'uuid/v4';
import {v4String} from 'uuid/interfaces';

export class ReactionDao extends MockDaoMock implements IReactionDao {

    public async getAll(): Promise<IUser[]> {
        try {
            const db = await super.openDb();
            return db.reactions;
        } catch (err) {
            throw err;
        }
    }

    public async add(reaction: IReaction): Promise<any> {
        try {
            const db = await super.openDb();
            reaction.id = v4;
            db.reactions.push(reaction);
            await super.saveDb(db);
        } catch (err) {
            throw err;
        }
    }

    public async update(reaction: IReaction): Promise<any> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.reactions.length; i++) {
                if (db.reactions[i].id === reaction.id) {
                    db.reactions[i] = reaction;
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Reaction not found');
        } catch (err) {
            throw err;
        }
    }

    public async delete(id: v4String): Promise<any> {
        try {
            const db = await super.openDb();
            for (let i = 0; i < db.reactionslength; i++) {
                if (db.reactions[i].id === id) {
                    db.reactions.splice(i, 1);
                    await super.saveDb(db);
                    return;
                }
            }
            throw new Error('Reaction not found');
        } catch (err) {
            throw err;
        }
    }
}
