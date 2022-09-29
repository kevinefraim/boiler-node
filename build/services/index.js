"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.createOne = exports.updateOne = exports.findOne = exports.findAll = void 0;
const ormconfig_1 = require("ormconfig");
const findAll = async (entity, findOptions = {}) => await ormconfig_1.AppDataSource.manager.find(entity, findOptions);
exports.findAll = findAll;
const findOne = async (entity, findOptions = {}) => await ormconfig_1.AppDataSource.manager.findOne(entity, findOptions);
exports.findOne = findOne;
const updateOne = async (entity, rowToUpdate = {}, updateData = {}) => {
    ormconfig_1.AppDataSource.manager.merge(entity, rowToUpdate, updateData);
    return await ormconfig_1.AppDataSource.manager.save(entity, rowToUpdate);
};
exports.updateOne = updateOne;
const createOne = async (entity, newData = {}) => await ormconfig_1.AppDataSource.manager.save(entity, newData);
exports.createOne = createOne;
const deleteOne = async (entity, rowToDelete) => await ormconfig_1.AppDataSource.manager.softRemove(entity, rowToDelete);
exports.deleteOne = deleteOne;
