import {v4String} from 'uuid/interfaces';
import {
    Table,
    Column,
    Model,
    PrimaryKey,
    Default,
    ForeignKey, AllowNull
} from 'sequelize-typescript';
import {DataTypes} from 'sequelize';
import {Post} from '@entities';

enum eReactionType {
    LIKE,
    RETWEET,
}

export interface IReaction {
    id?: v4String;
    userId?: v4String;
    postId?: v4String;
    reactionType?: eReactionType;
}

@Table({paranoid: true, tableName: 'reaction'})
export class Reaction extends Model<Reaction> implements IReaction {

    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    public id?: v4String;

    @AllowNull(false)
    @Column(DataTypes.UUID)
    public userId?: v4String;

    @ForeignKey(() => Post)
    @AllowNull(false)
    @Column(DataTypes.UUID)
    public postId?: v4String;

    @Column(
        DataTypes.ENUM({
           values: ['LIKE', 'RETWEET'],
        }),
    )
    public reactionType?: eReactionType;
}
