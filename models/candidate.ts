// import sequelize from '../database/sequelize/init-sequelize.js';

import {
    Model,
    DataTypes,
    Sequelize,
} from 'sequelize';

interface CandidateAttributes {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
}

export default (sequelize: Sequelize, DataTypes: any) => {
    class Candidate extends Model<CandidateAttributes> implements CandidateAttributes {
        declare id: number; // this is ok! The 'declare' keyword ensures this field will not be emitted by TypeScript.
        public first_name!: string;
        public last_name!: string;
        public email!: string;
        // declare enabled: boolean;
        // declare slug: string;
        // declare gender: string;
        // declare birth_day: string;
        // declare description: string;
        // declare image: string;
        // declare address: string;
        // declare city: string;
        // declare state: string;
        // declare occupation: string;
        // declare hobbies: string;
        // declare remember_token: string;
        getFullname() {
            return [this.first_name, this.last_name].join(' ');
        }

        static associate(models: any) {
            // Define associations here
        }
    }

    Candidate.init(
        {
            id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                },
                allowNull: false
            },
            // enabled: {
            //     type: DataTypes.BOOLEAN,
            //     defaultValue: true
            // },
            // slug: {
            //     type: DataTypes.STRING,
            //     allowNull: false
            // },
            // gender: {
            //     type: DataTypes.STRING
            // },
            // birth_day: {
            //     type: DataTypes.DATE
            // },
            // description: {
            //     type: DataTypes.STRING
            // },
            // image: {
            //     type: DataTypes.STRING
            // },
            // address: {
            //     type: DataTypes.STRING
            // },
            // city: {
            //     type: DataTypes.STRING
            // },
            // state: {
            //     type: DataTypes.STRING
            // },
            // occupation: {
            //     type: DataTypes.STRING
            // },
            // hobbies: {
            //     type: DataTypes.STRING
            // },
            // remember_token: {
            //     type: DataTypes.STRING
            // },
        },
        { 
            sequelize,
            // modelName: 'Candidate',
            tableName: 'Candidate',
        },
    );

    // the defined model is the class itself
    console.log('Candidate === sequelize.models.Candidate is: ', Candidate === sequelize.models.Candidate); // true

    return Candidate;
};
