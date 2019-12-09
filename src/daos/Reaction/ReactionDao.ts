import {IReaction, Reaction} from '@entities';
import {SequelizeConnection, logger} from '@shared';
import {v4String} from 'uuid/interfaces';

export interface IReactionDao {
    getAll: () => Promise<IReaction[]>;
    add: (reaction: IReaction) => Promise<any>;
    delete: (id: v4String) => Promise<any>;
}

export class ReactionDao implements IReactionDao {
    private reactionRepository = SequelizeConnection.getInstance().getRepository(Reaction);

    /**
     *
     */
    public async getAll(): Promise<IReaction[]> {
        return this.reactionRepository.findAll();
    }

    /**
     *
     */
    public async getAllOfPost(id: v4String): Promise<IReaction[]> {
        return this.reactionRepository.findAll({where: {postId: id.toString()}});
    }

    /**
     *
     * @param reaction
     */
    public async add(reaction: IReaction): Promise<any> {
        return this.reactionRepository.create(reaction);
    }

    /**
     *
     * @param id
     */
    public async delete(id: v4String): Promise<any> {
        return this.reactionRepository.destroy({where: {id: id.toString()}});
    }
}
