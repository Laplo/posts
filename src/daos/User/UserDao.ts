import {IUser, Reaction, User} from '@entities';
import {SequelizeConnection, logger} from '@shared';

export interface IUserDao {
    getAll: () => Promise<IUser[]>;
    add: (user: IUser) => Promise<any>;
    update: (user: IUser) => Promise<any>;
    delete: (id: number) => Promise<any>;
}

export class UserDao implements IUserDao {
    private userRepository = SequelizeConnection.getInstance().getRepository(User);
    /**
     *
     */
    public async getAll(): Promise<IUser[]> {
        return this.userRepository.findAll();
    }

    /**
     *
     * @param user
     */
    public async add(user: IUser): Promise<any> {
        return this.userRepository.create(user);
    }

    /**
     *
     * @param user
     */
    public async update(user: IUser): Promise<void> {
        // TODO
        return {} as any;
    }

    /**
     *
     * @param id
     */
    public async delete(id: number): Promise<void> {
        // TODO
        return {} as any;
    }
}
