import {v4String} from 'uuid/interfaces';
import {Table, Column, Model, PrimaryKey, Length, NotNull, AllowNull, Default} from 'sequelize-typescript';
import {BuildOptions, DataTypes} from 'sequelize';

export interface IUser {
    id?: v4String;
}

@Table({tableName: 'user', timestamps: false})
export class User extends Model<User> implements IUser {

    @PrimaryKey
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.UUID)
    public id?: v4String;
}
