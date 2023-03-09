"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListQueryBuilder = void 0;
const common_1 = require("@nestjs/common");
const generated_types_1 = require("@vendure/common/lib/generated-types");
const unique_1 = require("@vendure/common/lib/unique");
const typeorm_1 = require("typeorm");
const FindOptionsUtils_1 = require("typeorm/find-options/FindOptionsUtils");
const errors_1 = require("../../../common/error/errors");
const config_service_1 = require("../../../config/config.service");
const vendure_logger_1 = require("../../../config/logger/vendure-logger");
const transactional_connection_1 = require("../../../connection/transactional-connection");
const connection_utils_1 = require("./connection-utils");
const get_calculated_columns_1 = require("./get-calculated-columns");
const parse_channel_param_1 = require("./parse-channel-param");
const parse_filter_params_1 = require("./parse-filter-params");
const parse_sort_params_1 = require("./parse-sort-params");
/**
 * @description
 * This helper class is used when fetching entities the database from queries which return a {@link PaginatedList} type.
 * These queries all follow the same format:
 *
 * In the GraphQL definition, they return a type which implements the `Node` interface, and the query returns a
 * type which implements the `PaginatedList` interface:
 *
 * ```GraphQL
 * type BlogPost implements Node {
 *   id: ID!
 *   published: DateTime!
 *   title: String!
 *   body: String!
 * }
 *
 * type BlogPostList implements PaginatedList {
 *   items: [BlogPost!]!
 *   totalItems: Int!
 * }
 *
 * # Generated at run-time by Vendure
 * input BlogPostListOptions
 *
 * extend type Query {
 *    blogPosts(options: BlogPostListOptions): BlogPostList!
 * }
 * ```
 * When Vendure bootstraps, it will find the `BlogPostListOptions` input and, because it is used in a query
 * returning a `PaginatedList` type, it knows that it should dynamically generate this input. This means
 * all primitive field of the `BlogPost` type (namely, "published", "title" and "body") will have `filter` and
 * `sort` inputs created for them, as well a `skip` and `take` fields for pagination.
 *
 * Your resolver function will then look like this:
 *
 * ```TypeScript
 * \@Resolver()
 * export class BlogPostResolver
 *   constructor(private blogPostService: BlogPostService) {}
 *
 *   \@Query()
 *   async blogPosts(
 *     \@Ctx() ctx: RequestContext,
 *     \@Args() args: any,
 *   ): Promise<PaginatedList<BlogPost>> {
 *     return this.blogPostService.findAll(ctx, args.options || undefined);
 *   }
 * }
 * ```
 *
 * and the corresponding service will use the ListQueryBuilder:
 *
 * ```TypeScript
 * \@Injectable()
 * export class BlogPostService {
 *   constructor(private listQueryBuilder: ListQueryBuilder) {}
 *
 *   findAll(ctx: RequestContext, options?: ListQueryOptions<BlogPost>) {
 *     return this.listQueryBuilder
 *       .build(BlogPost, options)
 *       .getManyAndCount()
 *       .then(async ([items, totalItems]) => {
 *         return { items, totalItems };
 *       });
 *   }
 * }
 * ```
 *
 * @docsCategory data-access
 * @docsPage ListQueryBuilder
 * @docsWeight 0
 */
let ListQueryBuilder = class ListQueryBuilder {
    constructor(connection, configService) {
        this.connection = connection;
        this.configService = configService;
    }
    /** @internal */
    onApplicationBootstrap() {
        this.registerSQLiteRegexpFunction();
    }
    /**
     * @description
     * Creates and configures a SelectQueryBuilder for queries that return paginated lists of entities.
     */
    build(entity, options = {}, extendedOptions = {}) {
        var _a, _b, _c;
        const apiType = (_b = (_a = extendedOptions.ctx) === null || _a === void 0 ? void 0 : _a.apiType) !== null && _b !== void 0 ? _b : 'shop';
        const rawConnection = this.connection.rawConnection;
        const { take, skip } = this.parseTakeSkipParams(apiType, options);
        const repo = extendedOptions.ctx
            ? this.connection.getRepository(extendedOptions.ctx, entity)
            : this.connection.rawConnection.getRepository(entity);
        const qb = repo.createQueryBuilder(extendedOptions.entityAlias || entity.name.toLowerCase());
        const minimumRequiredRelations = this.getMinimumRequiredRelations(repo, options, extendedOptions);
        FindOptionsUtils_1.FindOptionsUtils.applyFindManyOptionsOrConditionsToQueryBuilder(qb, {
            relations: minimumRequiredRelations,
            take,
            skip,
            where: extendedOptions.where || {},
        });
        // tslint:disable-next-line:no-non-null-assertion
        FindOptionsUtils_1.FindOptionsUtils.joinEagerRelations(qb, qb.alias, qb.expressionMap.mainAlias.metadata);
        // join the tables required by calculated columns
        this.joinCalculatedColumnRelations(qb, entity, options);
        const { customPropertyMap, entityAlias } = extendedOptions;
        if (customPropertyMap) {
            this.normalizeCustomPropertyMap(customPropertyMap, options, qb);
        }
        const customFieldsForType = this.configService.customFields[entity.name];
        const sortParams = Object.assign({}, options.sort, extendedOptions.orderBy);
        this.applyTranslationConditions(qb, entity, sortParams, extendedOptions.ctx, extendedOptions.entityAlias);
        const sort = parse_sort_params_1.parseSortParams(rawConnection, entity, sortParams, customPropertyMap, entityAlias, customFieldsForType);
        const filter = parse_filter_params_1.parseFilterParams(rawConnection, entity, options.filter, customPropertyMap, entityAlias);
        if (filter.length) {
            const filterOperator = (_c = options.filterOperator) !== null && _c !== void 0 ? _c : generated_types_1.LogicalOperator.AND;
            if (filterOperator === generated_types_1.LogicalOperator.AND) {
                filter.forEach(({ clause, parameters }) => {
                    qb.andWhere(clause, parameters);
                });
            }
            else {
                qb.andWhere(new typeorm_1.Brackets(qb1 => {
                    filter.forEach(({ clause, parameters }) => {
                        qb1.orWhere(clause, parameters);
                    });
                }));
            }
        }
        if (extendedOptions.channelId) {
            const channelFilter = parse_channel_param_1.parseChannelParam(rawConnection, entity, extendedOptions.channelId, extendedOptions.entityAlias);
            if (channelFilter) {
                qb.andWhere(channelFilter.clause, channelFilter.parameters);
            }
        }
        qb.orderBy(sort);
        this.optimizeGetManyAndCountMethod(qb, repo, extendedOptions, minimumRequiredRelations);
        this.optimizeGetManyMethod(qb, repo, extendedOptions, minimumRequiredRelations);
        return qb;
    }
    parseTakeSkipParams(apiType, options) {
        var _a;
        const { shopListQueryLimit, adminListQueryLimit } = this.configService.apiOptions;
        const takeLimit = apiType === 'admin' ? adminListQueryLimit : shopListQueryLimit;
        if (options.take && options.take > takeLimit) {
            throw new errors_1.UserInputError('error.list-query-limit-exceeded', { limit: takeLimit });
        }
        const rawConnection = this.connection.rawConnection;
        const skip = Math.max((_a = options.skip) !== null && _a !== void 0 ? _a : 0, 0);
        // `take` must not be negative, and must not be greater than takeLimit
        let take = options.take == null ? takeLimit : Math.min(Math.max(options.take, 0), takeLimit);
        if (options.skip !== undefined && options.take === undefined) {
            take = takeLimit;
        }
        return { take, skip };
    }
    /**
     * @description
     * As part of list optimization, we only join the minimum required relations which are needed to
     * get the base list query. Other relations are then joined individually in the patched `getManyAndCount()`
     * method.
     */
    getMinimumRequiredRelations(repository, options, extendedOptions) {
        const requiredRelations = [];
        if (extendedOptions.channelId) {
            requiredRelations.push('channels');
        }
        if (extendedOptions.customPropertyMap) {
            const metadata = repository.metadata;
            for (const [property, path] of Object.entries(extendedOptions.customPropertyMap)) {
                if (!this.customPropertyIsBeingUsed(property, options)) {
                    // If the custom property is not being used to filter or sort, then we don't need
                    // to join the associated relations.
                    continue;
                }
                const tableNameLower = path.split('.')[0];
                const entityMetadata = repository.manager.connection.entityMetadatas.find(em => em.tableNameWithoutPrefix === tableNameLower);
                if (entityMetadata) {
                    const relationMetadata = metadata.relations.find(r => r.type === entityMetadata.target);
                    if (relationMetadata) {
                        requiredRelations.push(relationMetadata.propertyName);
                    }
                }
            }
        }
        return unique_1.unique(requiredRelations);
    }
    customPropertyIsBeingUsed(property, options) {
        var _a, _b;
        return !!(((_a = options.sort) === null || _a === void 0 ? void 0 : _a[property]) || ((_b = options.filter) === null || _b === void 0 ? void 0 : _b[property]));
    }
    /**
     * @description
     * This will monkey-patch the `getManyAndCount()` method in order to implement a more efficient
     * parallel-query based approach to joining multiple relations. This is loosely based on the
     * solution outlined here: https://github.com/typeorm/typeorm/issues/3857#issuecomment-633006643
     *
     * TODO: When upgrading to TypeORM v0.3+, this will likely become redundant due to the new
     * `relationLoadStrategy` feature.
     */
    optimizeGetManyAndCountMethod(qb, repo, extendedOptions, alreadyJoined) {
        const originalGetManyAndCount = qb.getManyAndCount.bind(qb);
        qb.getManyAndCount = async () => {
            var _a;
            const relations = unique_1.unique((_a = extendedOptions.relations) !== null && _a !== void 0 ? _a : []);
            const [entities, count] = await originalGetManyAndCount();
            if (relations == null || alreadyJoined.sort().join() === (relations === null || relations === void 0 ? void 0 : relations.sort().join())) {
                // No further relations need to be joined, so we just
                // return the regular result.
                return [entities, count];
            }
            const result = await this.parallelLoadRelations(entities, relations, alreadyJoined, repo);
            return [result, count];
        };
    }
    /**
     * @description
     * This will monkey-patch the `getMany()` method in order to implement a more efficient
     * parallel-query based approach to joining multiple relations. This is loosely based on the
     * solution outlined here: https://github.com/typeorm/typeorm/issues/3857#issuecomment-633006643
     *
     * TODO: When upgrading to TypeORM v0.3+, this will likely become redundant due to the new
     * `relationLoadStrategy` feature.
     */
    optimizeGetManyMethod(qb, repo, extendedOptions, alreadyJoined) {
        const originalGetMany = qb.getMany.bind(qb);
        qb.getMany = async () => {
            var _a;
            const relations = unique_1.unique((_a = extendedOptions.relations) !== null && _a !== void 0 ? _a : []);
            const entities = await originalGetMany();
            if (relations == null || alreadyJoined.sort().join() === (relations === null || relations === void 0 ? void 0 : relations.sort().join())) {
                // No further relations need to be joined, so we just
                // return the regular result.
                return entities;
            }
            return this.parallelLoadRelations(entities, relations, alreadyJoined, repo);
        };
    }
    async parallelLoadRelations(entities, relations, alreadyJoined, repo) {
        var _a, _b;
        const entityMap = new Map(entities.map(e => [e.id, e]));
        const entitiesIds = entities.map(({ id }) => id);
        const splitRelations = relations
            .map(r => r.split('.'))
            .filter(path => {
            // There is an issue in TypeORM currently which causes
            // an error when trying to join nested relations inside
            // customFields. See https://github.com/vendure-ecommerce/vendure/issues/1664
            // The work-around is to omit them and rely on the GraphQL resolver
            // layer to handle.
            if (path[0] === 'customFields' && 2 < path.length) {
                return false;
            }
            return true;
        });
        const groupedRelationsMap = new Map();
        for (const relationParts of splitRelations) {
            const group = groupedRelationsMap.get(relationParts[0]);
            if (group) {
                group.push(relationParts.join('.'));
            }
            else {
                groupedRelationsMap.set(relationParts[0], [relationParts.join('.')]);
            }
        }
        // If the extendedOptions includes relations that were already joined, then
        // we ignore those now so as not to do the work of joining twice.
        for (const tableName of alreadyJoined) {
            if (((_a = groupedRelationsMap.get(tableName)) === null || _a === void 0 ? void 0 : _a.length) === 1) {
                groupedRelationsMap.delete(tableName);
            }
        }
        const entitiesIdsWithRelations = await Promise.all((_b = Array.from(groupedRelationsMap.values())) === null || _b === void 0 ? void 0 : _b.map(relationPaths => {
            return repo
                .findByIds(entitiesIds, {
                select: ['id'],
                relations: relationPaths,
                loadEagerRelations: false,
            })
                .then(results => results.map(r => ({ relation: relationPaths[0], entity: r })));
        })).then(all => all.flat());
        for (const entry of entitiesIdsWithRelations) {
            const finalEntity = entityMap.get(entry.entity.id);
            if (finalEntity) {
                finalEntity[entry.relation] = entry.entity[entry.relation];
            }
        }
        return Array.from(entityMap.values());
    }
    /**
     * If a customPropertyMap is provided, we need to take the path provided and convert it to the actual
     * relation aliases being used by the SelectQueryBuilder.
     *
     * This method mutates the customPropertyMap object.
     */
    normalizeCustomPropertyMap(customPropertyMap, options, qb) {
        for (const [property, value] of Object.entries(customPropertyMap)) {
            if (!this.customPropertyIsBeingUsed(property, options)) {
                continue;
            }
            const parts = customPropertyMap[property].split('.');
            const entityPart = 2 <= parts.length ? parts[parts.length - 2] : qb.alias;
            const columnPart = parts[parts.length - 1];
            const relationAlias = qb.expressionMap.aliases.find(a => a.metadata.tableNameWithoutPrefix === entityPart);
            if (relationAlias) {
                customPropertyMap[property] = `${relationAlias.name}.${columnPart}`;
            }
            else {
                vendure_logger_1.Logger.error(`The customPropertyMap entry "${property}:${value}" could not be resolved to a related table`);
                delete customPropertyMap[property];
            }
        }
    }
    /**
     * Some calculated columns (those with the `@Calculated()` decorator) require extra joins in order
     * to derive the data needed for their expressions.
     */
    joinCalculatedColumnRelations(qb, entity, options) {
        const calculatedColumns = get_calculated_columns_1.getCalculatedColumns(entity);
        const filterAndSortFields = unique_1.unique([
            ...Object.keys(options.filter || {}),
            ...Object.keys(options.sort || {}),
        ]);
        const alias = connection_utils_1.getEntityAlias(this.connection.rawConnection, entity);
        for (const field of filterAndSortFields) {
            const calculatedColumnDef = calculatedColumns.find(c => c.name === field);
            const instruction = calculatedColumnDef === null || calculatedColumnDef === void 0 ? void 0 : calculatedColumnDef.listQuery;
            if (instruction) {
                const relations = instruction.relations || [];
                for (const relation of relations) {
                    const relationIsAlreadyJoined = qb.expressionMap.joinAttributes.find(ja => ja.entityOrProperty === `${alias}.${relation}`);
                    if (!relationIsAlreadyJoined) {
                        const propertyPath = relation.includes('.') ? relation : `${alias}.${relation}`;
                        const relationAlias = relation.includes('.')
                            ? relation.split('.').reverse()[0]
                            : relation;
                        qb.innerJoinAndSelect(propertyPath, relationAlias);
                    }
                }
                if (typeof instruction.query === 'function') {
                    instruction.query(qb);
                }
            }
        }
    }
    /**
     * @description
     * If this entity is Translatable, and we are sorting on one of the translatable fields,
     * then we need to apply appropriate WHERE clauses to limit
     * the joined translation relations.
     */
    applyTranslationConditions(qb, entity, sortParams, ctx, entityAlias) {
        const languageCode = (ctx === null || ctx === void 0 ? void 0 : ctx.languageCode) || this.configService.defaultLanguageCode;
        const { columns, translationColumns, alias: defaultAlias, } = connection_utils_1.getColumnMetadata(this.connection.rawConnection, entity);
        const alias = entityAlias !== null && entityAlias !== void 0 ? entityAlias : defaultAlias;
        const sortKeys = Object.keys(sortParams);
        let sortingOnTranslatableKey = false;
        for (const translationColumn of translationColumns) {
            if (sortKeys.includes(translationColumn.propertyName)) {
                sortingOnTranslatableKey = true;
            }
        }
        if (translationColumns.length && sortingOnTranslatableKey) {
            const translationsAlias = qb.connection.namingStrategy.eagerJoinRelationAlias(alias, 'translations');
            qb.andWhere(new typeorm_1.Brackets(qb1 => {
                var _a;
                qb1.where(`${translationsAlias}.languageCode = :languageCode`, { languageCode });
                const defaultLanguageCode = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.channel.defaultLanguageCode) !== null && _a !== void 0 ? _a : this.configService.defaultLanguageCode;
                const translationEntity = translationColumns[0].entityMetadata.target;
                if (languageCode !== defaultLanguageCode) {
                    // If the current languageCode is not the default, then we create a more
                    // complex WHERE clause to allow us to use the non-default translations and
                    // fall back to the default language if no translation exists.
                    qb1.orWhere(new typeorm_1.Brackets(qb2 => {
                        const subQb1 = this.connection.rawConnection
                            .createQueryBuilder(translationEntity, 'translation')
                            .where(`translation.base = ${alias}.id`)
                            .andWhere('translation.languageCode = :defaultLanguageCode');
                        const subQb2 = this.connection.rawConnection
                            .createQueryBuilder(translationEntity, 'translation')
                            .where(`translation.base = ${alias}.id`)
                            .andWhere('translation.languageCode = :nonDefaultLanguageCode');
                        qb2.where(`EXISTS (${subQb1.getQuery()})`).andWhere(`NOT EXISTS (${subQb2.getQuery()})`);
                    }));
                }
                else {
                    qb1.orWhere(new typeorm_1.Brackets(qb2 => {
                        const subQb1 = this.connection.rawConnection
                            .createQueryBuilder(translationEntity, 'translation')
                            .where(`translation.base = ${alias}.id`)
                            .andWhere('translation.languageCode = :defaultLanguageCode');
                        const subQb2 = this.connection.rawConnection
                            .createQueryBuilder(translationEntity, 'translation')
                            .where(`translation.base = ${alias}.id`)
                            .andWhere('translation.languageCode != :defaultLanguageCode');
                        qb2.where(`NOT EXISTS (${subQb1.getQuery()})`).andWhere(`EXISTS (${subQb2.getQuery()})`);
                    }));
                }
                qb.setParameters({
                    nonDefaultLanguageCode: languageCode,
                    defaultLanguageCode,
                });
            }));
        }
    }
    /**
     * Registers a user-defined function (for flavors of SQLite driver that support it)
     * so that we can run regex filters on string fields.
     */
    registerSQLiteRegexpFunction() {
        const regexpFn = (pattern, value) => {
            const result = new RegExp(`${pattern}`, 'i').test(value);
            return result ? 1 : 0;
        };
        const dbType = this.connection.rawConnection.options.type;
        if (dbType === 'better-sqlite3') {
            const driver = this.connection.rawConnection.driver;
            driver.databaseConnection.function('regexp', regexpFn);
        }
        if (dbType === 'sqljs') {
            const driver = this.connection.rawConnection.driver;
            driver.databaseConnection.create_function('regexp', regexpFn);
        }
    }
};
ListQueryBuilder = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [transactional_connection_1.TransactionalConnection, config_service_1.ConfigService])
], ListQueryBuilder);
exports.ListQueryBuilder = ListQueryBuilder;
//# sourceMappingURL=list-query-builder.js.map