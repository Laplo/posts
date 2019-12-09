import {v4String} from 'uuid/interfaces';
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    Length,
    Default,
    BelongsTo,
    HasMany,
    ForeignKey, AllowNull,
} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Reaction} from '@entities';

export interface IPost {
    id?: v4String;
    description?: string;
    userId?: v4String;
    postId?: v4String;
    parent?: Post;
    comments?: Post[];
    reactions?: Reaction[];
}

@Table({paranoid: true, tableName: 'post'})
export class Post extends Model<Post> implements IPost {

    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    public id?: v4String;

    @Length({max: 144})
    @AllowNull(false)
    @Column(DataTypes.STRING)
    public content?: string;

    @AllowNull(false)
    @Column(DataTypes.UUID)
    public userId?: v4String;

    @ForeignKey(() => Post)
    @Column(DataTypes.UUID)
    public postId?: v4String;

    @BelongsTo(() => Post)
    public parent?: Post;

    @HasMany(() => Post)
    public comments?: Post[];

    @HasMany(() => Reaction)
    public reactions?: Reaction[];
}
