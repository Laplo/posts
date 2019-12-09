import {IPost, Post, Reaction} from '@entities';
import {SequelizeConnection, logger} from '@shared';
import {v4String} from 'uuid/interfaces';

export interface IPostDao {
    getAll: () => Promise<IPost[]>;
    getAllForUser: (id: v4String) => Promise<IPost[]>;
    getAllOfUser: (id: v4String) => Promise<IPost[]>;
    getCommentsOfPost: (id: v4String) => Promise<IPost[]>;
    add: (post: IPost) => Promise<any>;
    update: (post: IPost) => Promise<any>;
    delete: (id: v4String) => Promise<any>;
}

export class PostDao implements IPostDao {
    private postRepository = SequelizeConnection.getInstance().getRepository(Post);
    private reactionRepository = SequelizeConnection.getInstance().getRepository(Reaction);

    /**
     *
     */
    public async getAll(): Promise<IPost[]> {
        return this.postRepository.findAll({include: [this.reactionRepository]});
    }

    /**
     *
     * @param id
     */
    public async getAllForUser(id: v4String): Promise<IPost[]> {
        return this.postRepository.findAll({where: {userId: id.toString()}});
    }

    /**
     *
     * @param id
     */
    public async getAllOfUser(id: v4String): Promise<IPost[]> {
        return this.postRepository.findAll({where: {userId: id.toString()}});
    }

    /**
     *
     * @param id
     */
    public async getCommentsOfPost(id: v4String): Promise<IPost[]> {
        return this.postRepository.findAll({where: {parentId: id.toString()}});
    }

    /**
     *
     * @param post
     */
    public async add(post: IPost): Promise<any> {
        return this.postRepository.create(post);
    }

    /**
     *
     * @param post
     */
    public async update(post: IPost): Promise<any> {
        return post.id !== undefined ?
            this.postRepository.update(
                post
                , {
                    returning: true
                    , where: {
                        id: post.id.toString(),
                    },
                },
            )
        : [];
    }

    /**
     *
     * @param id
     */
    public async delete(id: v4String): Promise<any> {
        return this.postRepository.destroy({where: {id: id.toString()}});
    }
}
