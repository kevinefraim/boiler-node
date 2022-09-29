"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateId = void 0;
const ormconfig_1 = require("ormconfig");
const helpers_1 = require("utils/helpers");
const validateId = (entity) => async (req, res, next) => {
    const entityName = entity.name;
    try {
        const item = await ormconfig_1.AppDataSource.manager.findOne(entity, {
            where: { id: +req.params.id },
        });
        if (!item)
            throw await (0, helpers_1.customError)(`${entityName.substring(0, entityName.length - 1)} not found`, 2);
        res.locals.item = item;
        next();
    }
    catch (error) {
        return res.status((error === null || error === void 0 ? void 0 : error.status) || 400).json({
            message: (error === null || error === void 0 ? void 0 : error.message) || (error === null || error === void 0 ? void 0 : error.msg) || error,
            code: (error === null || error === void 0 ? void 0 : error.codeError) || 0,
            descri: (error === null || error === void 0 ? void 0 : error.descriError) || '',
        });
    }
};
exports.validateId = validateId;
