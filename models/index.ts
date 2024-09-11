'use strict';

import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import commonConfig from '../config/common';
import sequelize from '../database/sequelize/init-sequelize';

const { __dirname, __filename } = commonConfig(import.meta.url);
const basename = path.basename(__filename);

// Read all files in the models directory and dynamically import them
export async function loadModels() {
  const files = fs.readdirSync(__dirname).filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  });

  const db: { [key: string]: any } = {};

  // Import all model files dynamically
  for (const file of files) {
    const modelPath = path.join(__dirname, file);
    console.log(`Attempting to import model from: ${modelPath}`);
    try {
        // Import the model using dynamic import
        const modelModule = await import(modelPath);
        const model = modelModule.default;
        if (model) {
            db[model.name] = model(sequelize, DataTypes);
            console.log(`Loaded model: ${model.name}`);
        } else {
            console.error(`No default export found in model file: ${modelPath}`);
        }
    } catch (error) {
        console.error(`Error loading model at ${modelPath}:`, error);
    }
  }

  // Associate models
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  return db;
};