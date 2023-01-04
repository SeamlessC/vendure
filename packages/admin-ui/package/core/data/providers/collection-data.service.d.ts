import { AssignCollectionsToChannelInput, AssignCollectionsToChannelMutation, CreateCollectionInput, DeleteCollectionsMutation, MoveCollectionInput, PreviewCollectionContentsQuery, PreviewCollectionVariantsInput, ProductVariantListOptions, RemoveCollectionsFromChannelInput, RemoveCollectionsFromChannelMutation, UpdateCollectionInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class CollectionDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    getCollectionFilters(): import("../query-result").QueryResult<import("../../common/generated-types").GetCollectionFiltersQuery, Record<string, any>>;
    getCollections(take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").GetCollectionListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").Maybe<import("../../common/generated-types").CollectionListOptions> | undefined;
    }>>;
    getCollection(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetCollectionQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createCollection(input: CreateCollectionInput): import("rxjs").Observable<import("../../common/generated-types").CreateCollectionMutation>;
    updateCollection(input: UpdateCollectionInput): import("rxjs").Observable<import("../../common/generated-types").UpdateCollectionMutation>;
    moveCollection(inputs: MoveCollectionInput[]): import("rxjs").Observable<import("../../common/generated-types").MoveCollectionMutation[]>;
    deleteCollection(id: string): import("rxjs").Observable<import("../../common/generated-types").DeleteCollectionMutation>;
    deleteCollections(ids: string[]): import("rxjs").Observable<DeleteCollectionsMutation>;
    previewCollectionVariants(input: PreviewCollectionVariantsInput, options: ProductVariantListOptions): import("../query-result").QueryResult<PreviewCollectionContentsQuery, import("../../common/generated-types").Exact<{
        input: PreviewCollectionVariantsInput;
        options?: import("../../common/generated-types").Maybe<ProductVariantListOptions> | undefined;
    }>>;
    getCollectionContents(id: string, take?: number, skip?: number, filterTerm?: string): import("../query-result").QueryResult<import("../../common/generated-types").GetCollectionContentsQuery, import("../../common/generated-types").Exact<{
        id: string;
        options?: import("../../common/generated-types").Maybe<ProductVariantListOptions> | undefined;
    }>>;
    assignCollectionsToChannel(input: AssignCollectionsToChannelInput): import("rxjs").Observable<AssignCollectionsToChannelMutation>;
    removeCollectionsFromChannel(input: RemoveCollectionsFromChannelInput): import("rxjs").Observable<RemoveCollectionsFromChannelMutation>;
}
