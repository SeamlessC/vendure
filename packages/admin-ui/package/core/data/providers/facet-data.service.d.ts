import { AssignFacetsToChannelInput, CreateFacetInput, CreateFacetValueInput, RemoveFacetsFromChannelInput, UpdateFacetInput, UpdateFacetValueInput } from '../../common/generated-types';
import { BaseDataService } from './base-data.service';
export declare class FacetDataService {
    private baseDataService;
    constructor(baseDataService: BaseDataService);
    getFacets(take?: number, skip?: number): import("../query-result").QueryResult<import("../../common/generated-types").GetFacetListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").Maybe<import("../../common/generated-types").FacetListOptions> | undefined;
    }>>;
    getAllFacets(): import("../query-result").QueryResult<import("../../common/generated-types").GetFacetListQuery, import("../../common/generated-types").Exact<{
        options?: import("../../common/generated-types").Maybe<import("../../common/generated-types").FacetListOptions> | undefined;
    }>>;
    getFacet(id: string): import("../query-result").QueryResult<import("../../common/generated-types").GetFacetWithValuesQuery, import("../../common/generated-types").Exact<{
        id: string;
    }>>;
    createFacet(facet: CreateFacetInput): import("rxjs").Observable<import("../../common/generated-types").CreateFacetMutation>;
    updateFacet(facet: UpdateFacetInput): import("rxjs").Observable<import("../../common/generated-types").UpdateFacetMutation>;
    deleteFacet(id: string, force: boolean): import("rxjs").Observable<import("../../common/generated-types").DeleteFacetMutation>;
    deleteFacets(ids: string[], force: boolean): import("rxjs").Observable<import("../../common/generated-types").DeleteFacetsMutation>;
    createFacetValues(facetValues: CreateFacetValueInput[]): import("rxjs").Observable<import("../../common/generated-types").CreateFacetValuesMutation>;
    updateFacetValues(facetValues: UpdateFacetValueInput[]): import("rxjs").Observable<import("../../common/generated-types").UpdateFacetValuesMutation>;
    deleteFacetValues(ids: string[], force: boolean): import("rxjs").Observable<import("../../common/generated-types").DeleteFacetValuesMutation>;
    assignFacetsToChannel(input: AssignFacetsToChannelInput): import("rxjs").Observable<import("../../common/generated-types").AssignFacetsToChannelMutation>;
    removeFacetsFromChannel(input: RemoveFacetsFromChannelInput): import("rxjs").Observable<import("../../common/generated-types").RemoveFacetsFromChannelMutation>;
}
