import * as i0 from '@angular/core';
import { Injectable, Injector, isDevMode, Component, Inject, HostListener, ChangeDetectionStrategy, ComponentFactoryResolver, APP_INITIALIZER, ViewChild, ViewContainerRef, EventEmitter, Input, Output, NgModule, Directive, ChangeDetectorRef, forwardRef, Optional, HostBinding, ContentChild, ElementRef, Renderer2, TemplateRef, ContentChildren, SkipSelf, ViewChildren, Pipe, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as i1 from '@angular/common';
import { Location, DOCUMENT, CommonModule, PlatformLocation } from '@angular/common';
import { map, filter, distinctUntilChanged, skip, takeUntil, tap, take, finalize, concatMap, bufferCount, switchMap, mergeMap, mapTo, catchError, startWith, throttleTime, shareReplay, scan, debounceTime, delay, bufferWhen, delayWhen } from 'rxjs/operators';
import { gql, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import * as i1$2 from '@angular/common/http';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { simpleDeepClone } from '@vendure/common/lib/simple-deep-clone';
import { NetworkStatus, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { notNullOrUndefined, getGraphQlInputName, assertNever } from '@vendure/common/lib/shared-utils';
import { Subject, merge, from, of, Observable, EMPTY, combineLatest, timer, interval, BehaviorSubject, forkJoin, fromEvent, concat } from 'rxjs';
import { Kind, getOperationAST, parse } from 'graphql';
import { pick } from '@vendure/common/lib/pick';
import { DomSanitizer, BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as i1$1 from '@ngx-translate/core';
import { TranslateService, TranslateModule, TranslateLoader, TranslateCompiler } from '@ngx-translate/core';
import * as i1$3 from 'ngx-translate-messageformat-compiler';
import { TranslateMessageFormatCompiler, MESSAGE_FORMAT_CONFIG } from 'ngx-translate-messageformat-compiler';
import * as i1$4 from '@angular/router';
import { Router, NavigationEnd, PRIMARY_OUTLET, ActivatedRoute, RouterModule, ActivationStart } from '@angular/router';
import { DEFAULT_CHANNEL_CODE, DEFAULT_AUTH_TOKEN_HEADER_KEY } from '@vendure/common/lib/shared-constants';
import { flatten } from 'lodash';
import { FormControl, FormGroup, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormBuilder, NgControl, FormControlName, FormControlDirective, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { setContext } from '@apollo/client/link/context';
import { ApolloLink as ApolloLink$1 } from '@apollo/client/link/core';
import { createUploadLink } from 'apollo-upload-client';
import { omit } from '@vendure/common/lib/omit';
import { __awaiter } from 'tslib';
import { CodeJar } from 'codejar';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ClarityModule } from '@clr/angular';
import '@clr/icons';
import '@clr/icons/shapes/all-shapes';
import { SELECTION_MODEL_FACTORY, NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import '@webcomponents/custom-elements/custom-elements.min.js';
import { PaginationService, NgxPaginationModule } from 'ngx-pagination';
import dayjs from 'dayjs';
import { TemplatePortal } from '@angular/cdk/portal';
import { joinUp, joinDown, lift, selectParentNode, toggleMark, wrapIn, chainCommands, exitCode, setBlockType, baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { undo, redo, history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { DOMSerializer, DOMParser, Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { wrapInList, splitListItem, liftListItem, sinkListItem, addListNodes } from 'prosemirror-schema-list';
import { NodeSelection, Plugin, TextSelection, EditorState } from 'prosemirror-state';
import { addColumnBefore, addColumnAfter, addRowBefore, addRowAfter, mergeCells, splitCell, toggleHeaderColumn, toggleHeaderRow, deleteColumn, deleteRow, deleteTable, tableNodes, isInTable, toggleHeaderCell, tableNodeTypes, fixTables, columnResizing, tableEditing } from 'prosemirror-tables';
import { EditorView } from 'prosemirror-view';
import { wrappingInputRule, textblockTypeInputRule, smartQuotes, ellipsis, emDash, inputRules, undoInputRule } from 'prosemirror-inputrules';
import { MenuItem, DropdownSubmenu, icons, wrapItem, blockTypeItem, Dropdown, joinUpItem, liftItem, selectParentNodeItem, menuBar } from 'prosemirror-menu';

const ROLE_FRAGMENT = gql `
    fragment Role on Role {
        id
        createdAt
        updatedAt
        code
        description
        permissions
        channels {
            id
            code
            token
        }
    }
`;
const ADMINISTRATOR_FRAGMENT = gql `
    fragment Administrator on Administrator {
        id
        createdAt
        updatedAt
        firstName
        lastName
        emailAddress
        user {
            id
            identifier
            lastLogin
            roles {
                ...Role
            }
        }
    }
    ${ROLE_FRAGMENT}
`;
const GET_ADMINISTRATORS = gql `
    query GetAdministrators($options: AdministratorListOptions) {
        administrators(options: $options) {
            items {
                ...Administrator
            }
            totalItems
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
const GET_ACTIVE_ADMINISTRATOR = gql `
    query GetActiveAdministrator {
        activeAdministrator {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
const GET_ADMINISTRATOR = gql `
    query GetAdministrator($id: ID!) {
        administrator(id: $id) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
const CREATE_ADMINISTRATOR = gql `
    mutation CreateAdministrator($input: CreateAdministratorInput!) {
        createAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
const UPDATE_ADMINISTRATOR = gql `
    mutation UpdateAdministrator($input: UpdateAdministratorInput!) {
        updateAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
const UPDATE_ACTIVE_ADMINISTRATOR = gql `
    mutation UpdateActiveAdministrator($input: UpdateActiveAdministratorInput!) {
        updateActiveAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;
const DELETE_ADMINISTRATOR = gql `
    mutation DeleteAdministrator($id: ID!) {
        deleteAdministrator(id: $id) {
            result
            message
        }
    }
`;
const GET_ROLES = gql `
    query GetRoles($options: RoleListOptions) {
        roles(options: $options) {
            items {
                ...Role
            }
            totalItems
        }
    }
    ${ROLE_FRAGMENT}
`;
const GET_ROLE = gql `
    query GetRole($id: ID!) {
        role(id: $id) {
            ...Role
        }
    }
    ${ROLE_FRAGMENT}
`;
const CREATE_ROLE = gql `
    mutation CreateRole($input: CreateRoleInput!) {
        createRole(input: $input) {
            ...Role
        }
    }
    ${ROLE_FRAGMENT}
`;
const UPDATE_ROLE = gql `
    mutation UpdateRole($input: UpdateRoleInput!) {
        updateRole(input: $input) {
            ...Role
        }
    }
    ${ROLE_FRAGMENT}
`;
const DELETE_ROLE = gql `
    mutation DeleteRole($id: ID!) {
        deleteRole(id: $id) {
            result
            message
        }
    }
`;
const ASSIGN_ROLE_TO_ADMINISTRATOR = gql `
    mutation AssignRoleToAdministrator($administratorId: ID!, $roleId: ID!) {
        assignRoleToAdministrator(administratorId: $administratorId, roleId: $roleId) {
            ...Administrator
        }
    }
    ${ADMINISTRATOR_FRAGMENT}
`;

class AdministratorDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    getAdministrators(take = 10, skip = 0) {
        return this.baseDataService.query(GET_ADMINISTRATORS, {
            options: {
                take,
                skip,
            },
        });
    }
    getActiveAdministrator() {
        return this.baseDataService.query(GET_ACTIVE_ADMINISTRATOR, {});
    }
    getAdministrator(id) {
        return this.baseDataService.query(GET_ADMINISTRATOR, {
            id,
        });
    }
    createAdministrator(input) {
        return this.baseDataService.mutate(CREATE_ADMINISTRATOR, { input });
    }
    updateAdministrator(input) {
        return this.baseDataService.mutate(UPDATE_ADMINISTRATOR, { input });
    }
    updateActiveAdministrator(input) {
        return this.baseDataService.mutate(UPDATE_ACTIVE_ADMINISTRATOR, { input });
    }
    deleteAdministrator(id) {
        return this.baseDataService.mutate(DELETE_ADMINISTRATOR, { id });
    }
    getRoles(take = 10, skip = 0) {
        return this.baseDataService.query(GET_ROLES, {
            options: {
                take,
                skip,
            },
        });
    }
    getRole(id) {
        return this.baseDataService.query(GET_ROLE, { id });
    }
    createRole(input) {
        return this.baseDataService.mutate(CREATE_ROLE, { input });
    }
    updateRole(input) {
        return this.baseDataService.mutate(UPDATE_ROLE, { input });
    }
    deleteRole(id) {
        return this.baseDataService.mutate(DELETE_ROLE, { id });
    }
}

const CONFIGURABLE_OPERATION_FRAGMENT = gql `
    fragment ConfigurableOperation on ConfigurableOperation {
        args {
            name
            value
        }
        code
    }
`;
const CONFIGURABLE_OPERATION_DEF_FRAGMENT = gql `
    fragment ConfigurableOperationDef on ConfigurableOperationDefinition {
        args {
            name
            type
            required
            defaultValue
            list
            ui
            label
            description
        }
        code
        description
    }
`;
const ERROR_RESULT_FRAGMENT = gql `
    fragment ErrorResult on ErrorResult {
        errorCode
        message
    }
`;

const CURRENT_USER_FRAGMENT = gql `
    fragment CurrentUser on CurrentUser {
        id
        identifier
        channels {
            id
            code
            token
            permissions
        }
    }
`;
const ATTEMPT_LOGIN = gql `
    mutation AttemptLogin($username: String!, $password: String!, $rememberMe: Boolean!) {
        login(username: $username, password: $password, rememberMe: $rememberMe) {
            ...CurrentUser
            ...ErrorResult
        }
    }
    ${CURRENT_USER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const LOG_OUT = gql `
    mutation LogOut {
        logout {
            success
        }
    }
`;
const GET_CURRENT_USER = gql `
    query GetCurrentUser {
        me {
            ...CurrentUser
        }
    }
    ${CURRENT_USER_FRAGMENT}
`;

class AuthDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    currentUser() {
        return this.baseDataService.query(GET_CURRENT_USER);
    }
    attemptLogin(username, password, rememberMe) {
        return this.baseDataService.mutate(ATTEMPT_LOGIN, {
            username,
            password,
            rememberMe,
        });
    }
    logOut() {
        return this.baseDataService.mutate(LOG_OUT);
    }
}

const PREFIX = 'vnd_';
/**
 * Wrapper around the browser's LocalStorage / SessionStorage object, for persisting data to the browser.
 */
class LocalStorageService {
    constructor(location) {
        this.location = location;
    }
    /**
     * Set a key-value pair in the browser's LocalStorage
     */
    set(key, value) {
        const keyName = this.keyName(key);
        localStorage.setItem(keyName, JSON.stringify(value));
    }
    /**
     * Set a key-value pair specific to the current location (url)
     */
    setForCurrentLocation(key, value) {
        const compositeKey = this.getLocationBasedKey(key);
        this.set(compositeKey, value);
    }
    /**
     * Set a key-value pair in the browser's SessionStorage
     */
    setForSession(key, value) {
        const keyName = this.keyName(key);
        sessionStorage.setItem(keyName, JSON.stringify(value));
    }
    /**
     * Get the value of the given key from the SessionStorage or LocalStorage.
     */
    get(key) {
        const keyName = this.keyName(key);
        const item = sessionStorage.getItem(keyName) || localStorage.getItem(keyName);
        let result;
        try {
            result = JSON.parse(item || 'null');
        }
        catch (e) {
            // tslint:disable-next-line:no-console
            console.error(`Could not parse the localStorage value for "${key}" (${item})`);
        }
        return result;
    }
    /**
     * Get the value of the given key for the current location (url)
     */
    getForCurrentLocation(key) {
        const compositeKey = this.getLocationBasedKey(key);
        return this.get(compositeKey);
    }
    remove(key) {
        const keyName = this.keyName(key);
        sessionStorage.removeItem(keyName);
        localStorage.removeItem(keyName);
    }
    getLocationBasedKey(key) {
        const path = this.location.path();
        return key + path;
    }
    keyName(key) {
        return PREFIX + key;
    }
}
LocalStorageService.ɵprov = i0.ɵɵdefineInjectable({ factory: function LocalStorageService_Factory() { return new LocalStorageService(i0.ɵɵinject(i1.Location)); }, token: LocalStorageService, providedIn: "root" });
LocalStorageService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
LocalStorageService.ctorParameters = () => [
    { type: Location }
];

const REQUEST_STARTED = gql `
    mutation RequestStarted {
        requestStarted @client
    }
`;
const REQUEST_COMPLETED = gql `
    mutation RequestCompleted {
        requestCompleted @client
    }
`;
const USER_STATUS_FRAGMENT = gql `
    fragment UserStatus on UserStatus {
        username
        isLoggedIn
        loginTime
        activeChannelId
        permissions
        channels {
            id
            code
            token
            permissions
        }
    }
`;
const SET_AS_LOGGED_IN = gql `
    mutation SetAsLoggedIn($input: UserStatusInput!) {
        setAsLoggedIn(input: $input) @client {
            ...UserStatus
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
const SET_AS_LOGGED_OUT = gql `
    mutation SetAsLoggedOut {
        setAsLoggedOut @client {
            ...UserStatus
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
const SET_UI_LANGUAGE_AND_LOCALE = gql `
    mutation SetUiLanguage($languageCode: LanguageCode!, $locale: String) {
        setUiLanguage(languageCode: $languageCode) @client
        setUiLocale(locale: $locale) @client
    }
`;
const SET_UI_LOCALE = gql `
    mutation SetUiLocale($locale: String) {
        setUiLocale(locale: $locale) @client
    }
`;
const SET_DISPLAY_UI_EXTENSION_POINTS = gql `
    mutation SetDisplayUiExtensionPoints($display: Boolean!) {
        setDisplayUiExtensionPoints(display: $display) @client
    }
`;
const SET_CONTENT_LANGUAGE = gql `
    mutation SetContentLanguage($languageCode: LanguageCode!) {
        setContentLanguage(languageCode: $languageCode) @client
    }
`;
const SET_UI_THEME = gql `
    mutation SetUiTheme($theme: String!) {
        setUiTheme(theme: $theme) @client
    }
`;
const GET_NEWTORK_STATUS = gql `
    query GetNetworkStatus {
        networkStatus @client {
            inFlightRequests
        }
    }
`;
const GET_USER_STATUS = gql `
    query GetUserStatus {
        userStatus @client {
            ...UserStatus
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
const GET_UI_STATE = gql `
    query GetUiState {
        uiState @client {
            language
            locale
            contentLanguage
            theme
            displayUiExtensionPoints
        }
    }
`;
const GET_CLIENT_STATE = gql `
    query GetClientState {
        networkStatus @client {
            inFlightRequests
        }
        userStatus @client {
            ...UserStatus
        }
        uiState @client {
            language
            locale
            contentLanguage
            theme
            displayUiExtensionPoints
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
const SET_ACTIVE_CHANNEL = gql `
    mutation SetActiveChannel($channelId: ID!) {
        setActiveChannel(channelId: $channelId) @client {
            ...UserStatus
        }
    }
    ${USER_STATUS_FRAGMENT}
`;
const UPDATE_USER_CHANNELS = gql `
    mutation UpdateUserChannels($channels: [CurrentUserChannelInput!]!) {
        updateUserChannels(channels: $channels) @client {
            ...UserStatus
        }
    }
    ${USER_STATUS_FRAGMENT}
`;

/**
 * @description
 * This class wraps the Apollo Angular QueryRef object and exposes some getters
 * for convenience.
 *
 * @docsCategory providers
 * @docsPage DataService
 */
class QueryResult {
    constructor(queryRef, apollo) {
        this.queryRef = queryRef;
        this.apollo = apollo;
        this.completed$ = new Subject();
        this.valueChanges = queryRef.valueChanges;
    }
    /**
     * @description
     * Re-fetch this query whenever the active Channel changes.
     */
    refetchOnChannelChange() {
        const userStatus$ = this.apollo.watchQuery({
            query: GET_USER_STATUS,
        }).valueChanges;
        const activeChannelId$ = userStatus$.pipe(map(data => data.data.userStatus.activeChannelId), filter(notNullOrUndefined), distinctUntilChanged(), skip(1), takeUntil(this.completed$));
        const loggedOut$ = userStatus$.pipe(map(data => data.data.userStatus.isLoggedIn), distinctUntilChanged(), skip(1), filter(isLoggedIn => !isLoggedIn), takeUntil(this.completed$));
        this.valueChanges = merge(activeChannelId$, this.queryRef.valueChanges).pipe(tap(val => {
            if (typeof val === 'string') {
                new Promise(resolve => setTimeout(resolve, 50)).then(() => this.queryRef.refetch());
            }
        }), filter(val => typeof val !== 'string'), takeUntil(loggedOut$), takeUntil(this.completed$));
        this.queryRef.valueChanges = this.valueChanges;
        return this;
    }
    /**
     * @description
     * Returns an Observable which emits a single result and then completes.
     */
    get single$() {
        return this.valueChanges.pipe(filter(result => result.networkStatus === NetworkStatus.ready), take(1), map(result => result.data), finalize(() => {
            this.completed$.next();
            this.completed$.complete();
        }));
    }
    /**
     * @description
     * Returns an Observable which emits until unsubscribed.
     */
    get stream$() {
        return this.valueChanges.pipe(filter(result => result.networkStatus === NetworkStatus.ready), map(result => result.data), finalize(() => {
            this.completed$.next();
            this.completed$.complete();
        }));
    }
    get ref() {
        return this.queryRef;
    }
    /**
     * @description
     * Returns a single-result Observable after applying the map function.
     */
    mapSingle(mapFn) {
        return this.single$.pipe(map(mapFn));
    }
    /**
     * @description
     * Returns a multiple-result Observable after applying the map function.
     */
    mapStream(mapFn) {
        return this.stream$.pipe(map(mapFn));
    }
}

const COUNTRY_FRAGMENT = gql `
    fragment Country on Country {
        id
        createdAt
        updatedAt
        code
        name
        enabled
        translations {
            id
            languageCode
            name
        }
    }
`;
const GET_COUNTRY_LIST = gql `
    query GetCountryList($options: CountryListOptions) {
        countries(options: $options) {
            items {
                id
                code
                name
                enabled
            }
            totalItems
        }
    }
`;
const GET_AVAILABLE_COUNTRIES = gql `
    query GetAvailableCountries {
        countries(options: { filter: { enabled: { eq: true } } }) {
            items {
                id
                code
                name
                enabled
            }
        }
    }
`;
const GET_COUNTRY = gql `
    query GetCountry($id: ID!) {
        country(id: $id) {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
const CREATE_COUNTRY = gql `
    mutation CreateCountry($input: CreateCountryInput!) {
        createCountry(input: $input) {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
const UPDATE_COUNTRY = gql `
    mutation UpdateCountry($input: UpdateCountryInput!) {
        updateCountry(input: $input) {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
const DELETE_COUNTRY = gql `
    mutation DeleteCountry($id: ID!) {
        deleteCountry(id: $id) {
            result
            message
        }
    }
`;
const ZONE_FRAGMENT = gql `
    fragment Zone on Zone {
        id
        createdAt
        updatedAt
        name
        members {
            ...Country
        }
    }
    ${COUNTRY_FRAGMENT}
`;
const GET_ZONES = gql `
    query GetZones {
        zones {
            ...Zone
            members {
                createdAt
                updatedAt
                id
                name
                code
                enabled
            }
        }
    }
    ${ZONE_FRAGMENT}
`;
const GET_ZONE = gql `
    query GetZone($id: ID!) {
        zone(id: $id) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
const CREATE_ZONE = gql `
    mutation CreateZone($input: CreateZoneInput!) {
        createZone(input: $input) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
const UPDATE_ZONE = gql `
    mutation UpdateZone($input: UpdateZoneInput!) {
        updateZone(input: $input) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
const DELETE_ZONE = gql `
    mutation DeleteZone($id: ID!) {
        deleteZone(id: $id) {
            message
            result
        }
    }
`;
const ADD_MEMBERS_TO_ZONE = gql `
    mutation AddMembersToZone($zoneId: ID!, $memberIds: [ID!]!) {
        addMembersToZone(zoneId: $zoneId, memberIds: $memberIds) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
const REMOVE_MEMBERS_FROM_ZONE = gql `
    mutation RemoveMembersFromZone($zoneId: ID!, $memberIds: [ID!]!) {
        removeMembersFromZone(zoneId: $zoneId, memberIds: $memberIds) {
            ...Zone
        }
    }
    ${ZONE_FRAGMENT}
`;
const TAX_CATEGORY_FRAGMENT = gql `
    fragment TaxCategory on TaxCategory {
        id
        createdAt
        updatedAt
        name
        isDefault
    }
`;
const GET_TAX_CATEGORIES = gql `
    query GetTaxCategories {
        taxCategories {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
const GET_TAX_CATEGORY = gql `
    query GetTaxCategory($id: ID!) {
        taxCategory(id: $id) {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
const CREATE_TAX_CATEGORY = gql `
    mutation CreateTaxCategory($input: CreateTaxCategoryInput!) {
        createTaxCategory(input: $input) {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
const UPDATE_TAX_CATEGORY = gql `
    mutation UpdateTaxCategory($input: UpdateTaxCategoryInput!) {
        updateTaxCategory(input: $input) {
            ...TaxCategory
        }
    }
    ${TAX_CATEGORY_FRAGMENT}
`;
const DELETE_TAX_CATEGORY = gql `
    mutation DeleteTaxCategory($id: ID!) {
        deleteTaxCategory(id: $id) {
            result
            message
        }
    }
`;
const TAX_RATE_FRAGMENT = gql `
    fragment TaxRate on TaxRate {
        id
        createdAt
        updatedAt
        name
        enabled
        value
        category {
            id
            name
        }
        zone {
            id
            name
        }
        customerGroup {
            id
            name
        }
    }
`;
const GET_TAX_RATE_LIST = gql `
    query GetTaxRateList($options: TaxRateListOptions) {
        taxRates(options: $options) {
            items {
                ...TaxRate
            }
            totalItems
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
const GET_TAX_RATE_LIST_SIMPLE = gql `
    query GetTaxRateListSimple($options: TaxRateListOptions) {
        taxRates(options: $options) {
            items {
                id
                createdAt
                updatedAt
                name
                enabled
                value
                category {
                    id
                    name
                }
                zone {
                    id
                    name
                }
            }
            totalItems
        }
    }
`;
const GET_TAX_RATE = gql `
    query GetTaxRate($id: ID!) {
        taxRate(id: $id) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
const CREATE_TAX_RATE = gql `
    mutation CreateTaxRate($input: CreateTaxRateInput!) {
        createTaxRate(input: $input) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
const UPDATE_TAX_RATE = gql `
    mutation UpdateTaxRate($input: UpdateTaxRateInput!) {
        updateTaxRate(input: $input) {
            ...TaxRate
        }
    }
    ${TAX_RATE_FRAGMENT}
`;
const DELETE_TAX_RATE = gql `
    mutation DeleteTaxRate($id: ID!) {
        deleteTaxRate(id: $id) {
            result
            message
        }
    }
`;
const CHANNEL_FRAGMENT = gql `
    fragment Channel on Channel {
        id
        createdAt
        updatedAt
        code
        token
        pricesIncludeTax
        currencyCode
        defaultLanguageCode
        defaultShippingZone {
            id
            name
        }
        defaultTaxZone {
            id
            name
        }
        customFields {
            isOpen
        }
    }
`;
const GET_CHANNELS = gql `
    query GetChannels {
        channels {
            ...Channel
        }
    }
    ${CHANNEL_FRAGMENT}
`;
const GET_CHANNEL = gql `
    query GetChannel($id: ID!) {
        channel(id: $id) {
            ...Channel
        }
    }
    ${CHANNEL_FRAGMENT}
`;
const GET_ACTIVE_CHANNEL = gql `
    query GetActiveChannel {
        activeChannel {
            ...Channel
        }
    }
    ${CHANNEL_FRAGMENT}
`;
const CREATE_CHANNEL = gql `
    mutation CreateChannel($input: CreateChannelInput!) {
        createChannel(input: $input) {
            ...Channel
            ...ErrorResult
        }
    }
    ${CHANNEL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const UPDATE_CHANNEL = gql `
    mutation UpdateChannel($input: UpdateChannelInput!) {
        updateChannel(input: $input) {
            ...Channel
            ...ErrorResult
        }
    }
    ${CHANNEL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const DELETE_CHANNEL = gql `
    mutation DeleteChannel($id: ID!) {
        deleteChannel(id: $id) {
            result
            message
        }
    }
`;
const PAYMENT_METHOD_FRAGMENT = gql `
    fragment PaymentMethod on PaymentMethod {
        id
        createdAt
        updatedAt
        name
        code
        description
        enabled
        checker {
            ...ConfigurableOperation
        }
        handler {
            ...ConfigurableOperation
        }
    }
    ${CONFIGURABLE_OPERATION_FRAGMENT}
`;
const GET_PAYMENT_METHOD_LIST = gql `
    query GetPaymentMethodList($options: PaymentMethodListOptions!) {
        paymentMethods(options: $options) {
            items {
                ...PaymentMethod
            }
            totalItems
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
const GET_PAYMENT_METHOD_OPERATIONS = gql `
    query GetPaymentMethodOperations {
        paymentMethodEligibilityCheckers {
            ...ConfigurableOperationDef
        }
        paymentMethodHandlers {
            ...ConfigurableOperationDef
        }
    }
    ${CONFIGURABLE_OPERATION_DEF_FRAGMENT}
`;
const GET_PAYMENT_METHOD = gql `
    query GetPaymentMethod($id: ID!) {
        paymentMethod(id: $id) {
            ...PaymentMethod
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
const CREATE_PAYMENT_METHOD = gql `
    mutation CreatePaymentMethod($input: CreatePaymentMethodInput!) {
        createPaymentMethod(input: $input) {
            ...PaymentMethod
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
const UPDATE_PAYMENT_METHOD = gql `
    mutation UpdatePaymentMethod($input: UpdatePaymentMethodInput!) {
        updatePaymentMethod(input: $input) {
            ...PaymentMethod
        }
    }
    ${PAYMENT_METHOD_FRAGMENT}
`;
const DELETE_PAYMENT_METHOD = gql `
    mutation DeletePaymentMethod($id: ID!, $force: Boolean) {
        deletePaymentMethod(id: $id, force: $force) {
            result
            message
        }
    }
`;
const GLOBAL_SETTINGS_FRAGMENT = gql `
    fragment GlobalSettings on GlobalSettings {
        id
        availableLanguages
        trackInventory
        outOfStockThreshold
        serverConfig {
            permissions {
                name
                description
                assignable
            }
            orderProcess {
                name
            }
        }
    }
`;
const GET_GLOBAL_SETTINGS = gql `
    query GetGlobalSettings {
        globalSettings {
            ...GlobalSettings
        }
    }
    ${GLOBAL_SETTINGS_FRAGMENT}
`;
const UPDATE_GLOBAL_SETTINGS = gql `
    mutation UpdateGlobalSettings($input: UpdateGlobalSettingsInput!) {
        updateGlobalSettings(input: $input) {
            ...GlobalSettings
            ...ErrorResult
        }
    }
    ${GLOBAL_SETTINGS_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const CUSTOM_FIELD_CONFIG_FRAGMENT = gql `
    fragment CustomFieldConfig on CustomField {
        name
        type
        list
        description {
            languageCode
            value
        }
        label {
            languageCode
            value
        }
        readonly
        nullable
        ui
    }
`;
const STRING_CUSTOM_FIELD_FRAGMENT = gql `
    fragment StringCustomField on StringCustomFieldConfig {
        ...CustomFieldConfig
        pattern
        options {
            label {
                languageCode
                value
            }
            value
        }
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
const LOCALE_STRING_CUSTOM_FIELD_FRAGMENT = gql `
    fragment LocaleStringCustomField on LocaleStringCustomFieldConfig {
        ...CustomFieldConfig
        pattern
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
const TEXT_CUSTOM_FIELD_FRAGMENT = gql `
    fragment TextCustomField on TextCustomFieldConfig {
        ...CustomFieldConfig
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
const BOOLEAN_CUSTOM_FIELD_FRAGMENT = gql `
    fragment BooleanCustomField on BooleanCustomFieldConfig {
        ...CustomFieldConfig
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
const INT_CUSTOM_FIELD_FRAGMENT = gql `
    fragment IntCustomField on IntCustomFieldConfig {
        ...CustomFieldConfig
        intMin: min
        intMax: max
        intStep: step
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
const FLOAT_CUSTOM_FIELD_FRAGMENT = gql `
    fragment FloatCustomField on FloatCustomFieldConfig {
        ...CustomFieldConfig
        floatMin: min
        floatMax: max
        floatStep: step
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
const DATE_TIME_CUSTOM_FIELD_FRAGMENT = gql `
    fragment DateTimeCustomField on DateTimeCustomFieldConfig {
        ...CustomFieldConfig
        datetimeMin: min
        datetimeMax: max
        datetimeStep: step
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
const RELATION_CUSTOM_FIELD_FRAGMENT = gql `
    fragment RelationCustomField on RelationCustomFieldConfig {
        ...CustomFieldConfig
        entity
        scalarFields
    }
    ${CUSTOM_FIELD_CONFIG_FRAGMENT}
`;
const ALL_CUSTOM_FIELDS_FRAGMENT = gql `
    fragment CustomFields on CustomField {
        ... on StringCustomFieldConfig {
            ...StringCustomField
        }
        ... on LocaleStringCustomFieldConfig {
            ...LocaleStringCustomField
        }
        ... on TextCustomFieldConfig {
            ...TextCustomField
        }
        ... on BooleanCustomFieldConfig {
            ...BooleanCustomField
        }
        ... on IntCustomFieldConfig {
            ...IntCustomField
        }
        ... on FloatCustomFieldConfig {
            ...FloatCustomField
        }
        ... on DateTimeCustomFieldConfig {
            ...DateTimeCustomField
        }
        ... on RelationCustomFieldConfig {
            ...RelationCustomField
        }
    }
    ${STRING_CUSTOM_FIELD_FRAGMENT}
    ${LOCALE_STRING_CUSTOM_FIELD_FRAGMENT}
    ${TEXT_CUSTOM_FIELD_FRAGMENT}
    ${BOOLEAN_CUSTOM_FIELD_FRAGMENT}
    ${INT_CUSTOM_FIELD_FRAGMENT}
    ${FLOAT_CUSTOM_FIELD_FRAGMENT}
    ${DATE_TIME_CUSTOM_FIELD_FRAGMENT}
    ${RELATION_CUSTOM_FIELD_FRAGMENT}
`;
const GET_SERVER_CONFIG = gql `
    query GetServerConfig {
        globalSettings {
            id
            serverConfig {
                orderProcess {
                    name
                    to
                }
                permittedAssetTypes
                permissions {
                    name
                    description
                    assignable
                }
                customFieldConfig {
                    Address {
                        ...CustomFields
                    }
                    Administrator {
                        ...CustomFields
                    }
                    Asset {
                        ...CustomFields
                    }
                    Channel {
                        ...CustomFields
                    }
                    Collection {
                        ...CustomFields
                    }
                    Country {
                        ...CustomFields
                    }
                    Customer {
                        ...CustomFields
                    }
                    CustomerGroup {
                        ...CustomFields
                    }
                    Facet {
                        ...CustomFields
                    }
                    FacetValue {
                        ...CustomFields
                    }
                    Fulfillment {
                        ...CustomFields
                    }
                    GlobalSettings {
                        ...CustomFields
                    }
                    Order {
                        ...CustomFields
                    }
                    OrderLine {
                        ...CustomFields
                    }
                    PaymentMethod {
                        ...CustomFields
                    }
                    Product {
                        ...CustomFields
                    }
                    ProductOption {
                        ...CustomFields
                    }
                    ProductOptionGroup {
                        ...CustomFields
                    }
                    ProductVariant {
                        ...CustomFields
                    }
                    Promotion {
                        ...CustomFields
                    }
                    ShippingMethod {
                        ...CustomFields
                    }
                    TaxCategory {
                        ...CustomFields
                    }
                    TaxRate {
                        ...CustomFields
                    }
                    User {
                        ...CustomFields
                    }
                    Zone {
                        ...CustomFields
                    }
                }
            }
        }
    }
    ${ALL_CUSTOM_FIELDS_FRAGMENT}
`;
const JOB_INFO_FRAGMENT = gql `
    fragment JobInfo on Job {
        id
        createdAt
        startedAt
        settledAt
        queueName
        state
        isSettled
        progress
        duration
        data
        result
        error
        retries
        attempts
    }
`;
const GET_JOB_INFO = gql `
    query GetJobInfo($id: ID!) {
        job(jobId: $id) {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
const GET_JOBS_LIST = gql `
    query GetAllJobs($options: JobListOptions) {
        jobs(options: $options) {
            items {
                ...JobInfo
            }
            totalItems
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
const GET_JOBS_BY_ID = gql `
    query GetJobsById($ids: [ID!]!) {
        jobsById(jobIds: $ids) {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
const GET_JOB_QUEUE_LIST = gql `
    query GetJobQueueList {
        jobQueues {
            name
            running
        }
    }
`;
const CANCEL_JOB = gql `
    mutation CancelJob($id: ID!) {
        cancelJob(jobId: $id) {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
const REINDEX = gql `
    mutation Reindex {
        reindex {
            ...JobInfo
        }
    }
    ${JOB_INFO_FRAGMENT}
`;
const GET_PENDING_SEARCH_INDEX_UPDATES = gql `
    query GetPendingSearchIndexUpdates {
        pendingSearchIndexUpdates
    }
`;
const RUN_PENDING_SEARCH_INDEX_UPDATES = gql `
    mutation RunPendingSearchIndexUpdates {
        runPendingSearchIndexUpdates {
            success
        }
    }
`;

function initializeServerConfigService(serverConfigService) {
    return serverConfigService.init();
}
/**
 * A service which fetches the config from the server upon initialization, and then provides that config
 * to the components which require it.
 */
class ServerConfigService {
    constructor(injector) {
        this.injector = injector;
        this._serverConfig = {};
    }
    get baseDataService() {
        return this.injector.get(BaseDataService);
    }
    /**
     * Fetches the ServerConfig. Should be run as part of the app bootstrap process by attaching
     * to the Angular APP_INITIALIZER token.
     */
    init() {
        return () => this.getServerConfig();
    }
    /**
     * Fetch the ServerConfig. Should be run on app init (in case user is already logged in) and on successful login.
     */
    getServerConfig() {
        return this.baseDataService
            .query(GET_SERVER_CONFIG)
            .single$.toPromise()
            .then(result => {
            this._serverConfig = result.globalSettings.serverConfig;
        }, err => {
            // Let the error fall through to be caught by the http interceptor.
        });
    }
    getAvailableLanguages() {
        return this.baseDataService
            .query(GET_GLOBAL_SETTINGS, {}, 'cache-first')
            .mapSingle(res => res.globalSettings.availableLanguages);
    }
    /**
     * When any of the GlobalSettings are modified, this method should be called to update the Apollo cache.
     */
    refreshGlobalSettings() {
        return this.baseDataService.query(GET_GLOBAL_SETTINGS, {}, 'network-only')
            .single$;
    }
    /**
     * Retrieves the custom field configs for the given entity type.
     */
    getCustomFieldsFor(type) {
        return this.serverConfig.customFieldConfig[type] || [];
    }
    getOrderProcessStates() {
        return this.serverConfig.orderProcess;
    }
    getPermittedAssetTypes() {
        return this.serverConfig.permittedAssetTypes;
    }
    getPermissionDefinitions() {
        return this.serverConfig.permissions;
    }
    get serverConfig() {
        return this._serverConfig;
    }
}
ServerConfigService.decorators = [
    { type: Injectable }
];
ServerConfigService.ctorParameters = () => [
    { type: Injector }
];

/**
 * Given a GraphQL AST (DocumentNode), this function looks for fragment definitions and adds and configured
 * custom fields to those fragments.
 */
function addCustomFields(documentNode, customFields) {
    const fragmentDefs = documentNode.definitions.filter(isFragmentDefinition);
    for (const fragmentDef of fragmentDefs) {
        let entityType = fragmentDef.typeCondition.name.value;
        if (entityType === 'OrderAddress') {
            // OrderAddress is a special case of the Address entity, and shares its custom fields
            // so we treat it as an alias
            entityType = 'Address';
        }
        const customFieldsForType = customFields[entityType];
        if (customFieldsForType && customFieldsForType.length) {
            fragmentDef.selectionSet.selections.push({
                name: {
                    kind: Kind.NAME,
                    value: 'customFields',
                },
                kind: Kind.FIELD,
                selectionSet: {
                    kind: Kind.SELECTION_SET,
                    selections: customFieldsForType.map(customField => {
                        return Object.assign({ kind: Kind.FIELD, name: {
                                kind: Kind.NAME,
                                value: customField.name,
                            } }, (customField.type === 'relation'
                            ? {
                                selectionSet: {
                                    kind: Kind.SELECTION_SET,
                                    selections: customField.scalarFields.map(f => ({
                                        kind: Kind.FIELD,
                                        name: { kind: Kind.NAME, value: f },
                                    })),
                                },
                            }
                            : {}));
                    }),
                },
            });
            const localeStrings = customFieldsForType.filter(field => field.type === 'localeString');
            const translationsField = fragmentDef.selectionSet.selections
                .filter(isFieldNode)
                .find(field => field.name.value === 'translations');
            if (localeStrings.length && translationsField && translationsField.selectionSet) {
                translationsField.selectionSet.selections.push({
                    name: {
                        kind: Kind.NAME,
                        value: 'customFields',
                    },
                    kind: Kind.FIELD,
                    selectionSet: {
                        kind: Kind.SELECTION_SET,
                        selections: localeStrings.map(customField => {
                            return {
                                kind: Kind.FIELD,
                                name: {
                                    kind: Kind.NAME,
                                    value: customField.name,
                                },
                            };
                        }),
                    },
                });
            }
        }
    }
    return documentNode;
}
function isFragmentDefinition(value) {
    return value.kind === Kind.FRAGMENT_DEFINITION;
}
function isFieldNode(value) {
    return value.kind === Kind.FIELD;
}

const CREATE_ENTITY_REGEX = /Create([A-Za-z]+)Input/;
const UPDATE_ENTITY_REGEX = /Update([A-Za-z]+)Input/;
/**
 * Checks the current documentNode for an operation with a variable named "Create<Entity>Input" or "Update<Entity>Input"
 * and if a match is found, returns the <Entity> name.
 */
function isEntityCreateOrUpdateMutation(documentNode) {
    const operationDef = getOperationAST(documentNode, null);
    if (operationDef && operationDef.variableDefinitions) {
        for (const variableDef of operationDef.variableDefinitions) {
            const namedType = extractInputType(variableDef.type);
            const inputTypeName = namedType.name.value;
            // special cases which don't follow the usual pattern
            if (inputTypeName === 'UpdateActiveAdministratorInput') {
                return 'Administrator';
            }
            if (inputTypeName === 'ModifyOrderInput') {
                return 'Order';
            }
            if (inputTypeName === 'AddItemToDraftOrderInput' ||
                inputTypeName === 'AdjustDraftOrderLineInput') {
                return 'OrderLine';
            }
            const createMatch = inputTypeName.match(CREATE_ENTITY_REGEX);
            if (createMatch) {
                return createMatch[1];
            }
            const updateMatch = inputTypeName.match(UPDATE_ENTITY_REGEX);
            if (updateMatch) {
                return updateMatch[1];
            }
        }
    }
}
function extractInputType(type) {
    if (type.kind === 'NonNullType') {
        return extractInputType(type.type);
    }
    if (type.kind === 'ListType') {
        return extractInputType(type.type);
    }
    return type;
}
/**
 * Removes any `readonly` custom fields from an entity (including its translations).
 * To be used before submitting the entity for a create or update request.
 */
function removeReadonlyCustomFields(variables, customFieldConfig) {
    if (!Array.isArray(variables)) {
        if (Array.isArray(variables.input)) {
            for (const input of variables.input) {
                removeReadonly(input, customFieldConfig);
            }
        }
        else {
            removeReadonly(variables.input, customFieldConfig);
        }
    }
    else {
        for (const input of variables) {
            removeReadonly(input, customFieldConfig);
        }
    }
    return removeReadonly(variables, customFieldConfig);
}
function removeReadonly(input, customFieldConfig) {
    for (const field of customFieldConfig) {
        if (field.readonly) {
            if (field.type === 'localeString') {
                if (hasTranslations(input)) {
                    for (const translation of input.translations) {
                        if (hasCustomFields$1(translation) &&
                            translation.customFields[field.name] !== undefined) {
                            delete translation.customFields[field.name];
                        }
                    }
                }
            }
            else {
                if (hasCustomFields$1(input) && input.customFields[field.name] !== undefined) {
                    delete input.customFields[field.name];
                }
            }
        }
    }
    return input;
}
function hasCustomFields$1(input) {
    return input != null && input.hasOwnProperty('customFields');
}
function hasTranslations(input) {
    return input != null && input.hasOwnProperty('translations');
}

/**
 * Transforms any custom field "relation" type inputs into the corresponding `<name>Id` format,
 * as expected by the server.
 */
function transformRelationCustomFieldInputs(variables, customFieldConfig) {
    if (variables.input) {
        if (Array.isArray(variables.input)) {
            for (const item of variables.input) {
                transformRelations(item, customFieldConfig);
            }
        }
        else {
            transformRelations(variables.input, customFieldConfig);
        }
    }
    return transformRelations(variables, customFieldConfig);
}
/**
 * @description
 * When persisting custom fields, we need to send just the IDs of the relations,
 * rather than the objects themselves.
 */
function transformRelations(input, customFieldConfig) {
    for (const field of customFieldConfig) {
        if (field.type === 'relation') {
            if (hasCustomFields(input)) {
                const entityValue = input.customFields[field.name];
                if (input.customFields.hasOwnProperty(field.name)) {
                    delete input.customFields[field.name];
                    input.customFields[getGraphQlInputName(field)] =
                        field.list && Array.isArray(entityValue)
                            ? entityValue.map(v => v === null || v === void 0 ? void 0 : v.id)
                            : entityValue === null
                                ? null
                                : entityValue === null || entityValue === void 0 ? void 0 : entityValue.id;
                }
            }
        }
    }
    return input;
}
function hasCustomFields(input) {
    return input != null && input.hasOwnProperty('customFields') && typeof input.customFields === 'object';
}

class BaseDataService {
    constructor(apollo, httpClient, localStorageService, serverConfigService) {
        this.apollo = apollo;
        this.httpClient = httpClient;
        this.localStorageService = localStorageService;
        this.serverConfigService = serverConfigService;
    }
    get customFields() {
        return this.serverConfigService.serverConfig.customFieldConfig || {};
    }
    /**
     * Performs a GraphQL watch query
     */
    query(query, variables, fetchPolicy = 'cache-and-network') {
        const withCustomFields = addCustomFields(query, this.customFields);
        const queryRef = this.apollo.watchQuery({
            query: withCustomFields,
            variables,
            fetchPolicy,
        });
        const queryResult = new QueryResult(queryRef, this.apollo);
        return queryResult;
    }
    /**
     * Performs a GraphQL mutation
     */
    mutate(mutation, variables, update) {
        const withCustomFields = addCustomFields(mutation, this.customFields);
        const withoutReadonlyFields = this.prepareCustomFields(mutation, variables);
        return this.apollo
            .mutate({
            mutation: withCustomFields,
            variables: withoutReadonlyFields,
            update,
        })
            .pipe(map(result => result.data));
    }
    prepareCustomFields(mutation, variables) {
        const entity = isEntityCreateOrUpdateMutation(mutation);
        if (entity) {
            const customFieldConfig = this.customFields[entity];
            if (variables && customFieldConfig) {
                let variablesClone = simpleDeepClone(variables);
                variablesClone = removeReadonlyCustomFields(variablesClone, customFieldConfig);
                variablesClone = transformRelationCustomFieldInputs(variablesClone, customFieldConfig);
                return variablesClone;
            }
        }
        return variables;
    }
}
BaseDataService.decorators = [
    { type: Injectable }
];
BaseDataService.ctorParameters = () => [
    { type: Apollo },
    { type: HttpClient },
    { type: LocalStorageService },
    { type: ServerConfigService }
];

/**
 * Note: local queries all have a fetch-policy of "cache-first" explicitly specified due to:
 * https://github.com/apollographql/apollo-link-state/issues/236
 */
class ClientDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    startRequest() {
        return this.baseDataService.mutate(REQUEST_STARTED);
    }
    completeRequest() {
        return this.baseDataService.mutate(REQUEST_COMPLETED);
    }
    getNetworkStatus() {
        return this.baseDataService.query(GET_NEWTORK_STATUS, {}, 'cache-first');
    }
    loginSuccess(username, activeChannelId, channels) {
        return this.baseDataService.mutate(SET_AS_LOGGED_IN, {
            input: {
                username,
                loginTime: Date.now().toString(),
                activeChannelId,
                channels,
            },
        });
    }
    logOut() {
        return this.baseDataService.mutate(SET_AS_LOGGED_OUT);
    }
    userStatus() {
        return this.baseDataService.query(GET_USER_STATUS, {}, 'cache-first');
    }
    uiState() {
        return this.baseDataService.query(GET_UI_STATE, {}, 'cache-first');
    }
    setUiLanguage(languageCode, locale) {
        return this.baseDataService.mutate(SET_UI_LANGUAGE_AND_LOCALE, {
            languageCode,
            locale,
        });
    }
    setUiLocale(locale) {
        return this.baseDataService.mutate(SET_UI_LOCALE, {
            locale,
        });
    }
    setContentLanguage(languageCode) {
        return this.baseDataService.mutate(SET_CONTENT_LANGUAGE, {
            languageCode,
        });
    }
    setUiTheme(theme) {
        return this.baseDataService.mutate(SET_UI_THEME, {
            theme,
        });
    }
    setDisplayUiExtensionPoints(display) {
        return this.baseDataService.mutate(SET_DISPLAY_UI_EXTENSION_POINTS, {
            display,
        });
    }
    setActiveChannel(channelId) {
        return this.baseDataService.mutate(SET_ACTIVE_CHANNEL, {
            channelId,
        });
    }
    updateUserChannels(channels) {
        return this.baseDataService.mutate(UPDATE_USER_CHANNELS, {
            channels,
        });
    }
}

const ASSET_FRAGMENT = gql `
    fragment Asset on Asset {
        id
        createdAt
        updatedAt
        name
        fileSize
        mimeType
        type
        preview
        source
        width
        height
        focalPoint {
            x
            y
        }
    }
`;
const TAG_FRAGMENT = gql `
    fragment Tag on Tag {
        id
        value
    }
`;
const PRODUCT_OPTION_GROUP_FRAGMENT = gql `
    fragment ProductOptionGroup on ProductOptionGroup {
        id
        createdAt
        updatedAt
        code
        languageCode
        name
        translations {
            id
            languageCode
            name
        }
    }
`;
const PRODUCT_OPTION_FRAGMENT = gql `
    fragment ProductOption on ProductOption {
        id
        createdAt
        updatedAt
        code
        languageCode
        name
        groupId
        translations {
            id
            languageCode
            name
        }
    }
`;
const PRODUCT_VARIANT_FRAGMENT = gql `
    fragment ProductVariant on ProductVariant {
        id
        createdAt
        updatedAt
        enabled
        languageCode
        name
        price
        currencyCode
        priceWithTax
        stockOnHand
        stockAllocated
        trackInventory
        outOfStockThreshold
        useGlobalOutOfStockThreshold
        taxRateApplied {
            id
            name
            value
        }
        taxCategory {
            id
            name
        }
        sku
        options {
            ...ProductOption
        }
        facetValues {
            id
            code
            name
            facet {
                id
                name
            }
        }
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        translations {
            id
            languageCode
            name
        }
        channels {
            id
            code
        }
    }
    ${PRODUCT_OPTION_FRAGMENT}
    ${ASSET_FRAGMENT}
`;
const PRODUCT_DETAIL_FRAGMENT = gql `
    fragment ProductDetail on Product {
        id
        createdAt
        updatedAt
        enabled
        languageCode
        name
        slug
        description
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        translations {
            id
            languageCode
            name
            slug
            description
        }
        optionGroups {
            ...ProductOptionGroup
        }
        facetValues {
            id
            code
            name
            facet {
                id
                name
            }
        }
        channels {
            id
            code
        }
    }
    ${PRODUCT_OPTION_GROUP_FRAGMENT}
    ${ASSET_FRAGMENT}
`;
const PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT = gql `
    fragment ProductOptionGroupWithOptions on ProductOptionGroup {
        id
        createdAt
        updatedAt
        languageCode
        code
        name
        translations {
            id
            name
        }
        options {
            id
            languageCode
            name
            code
            translations {
                name
            }
        }
    }
`;
const UPDATE_PRODUCT = gql `
    mutation UpdateProduct($input: UpdateProductInput!, $variantListOptions: ProductVariantListOptions) {
        updateProduct(input: $input) {
            ...ProductDetail
            variantList(options: $variantListOptions) {
                items {
                    ...ProductVariant
                }
                totalItems
            }
        }
    }
    ${PRODUCT_DETAIL_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
`;
const CREATE_PRODUCT = gql `
    mutation CreateProduct($input: CreateProductInput!, $variantListOptions: ProductVariantListOptions) {
        createProduct(input: $input) {
            ...ProductDetail
            variantList(options: $variantListOptions) {
                items {
                    ...ProductVariant
                }
                totalItems
            }
        }
    }
    ${PRODUCT_DETAIL_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
`;
const DELETE_PRODUCT = gql `
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            result
            message
        }
    }
`;
const DELETE_PRODUCTS = gql `
    mutation DeleteProducts($ids: [ID!]!) {
        deleteProducts(ids: $ids) {
            result
            message
        }
    }
`;
const CREATE_PRODUCT_VARIANTS = gql `
    mutation CreateProductVariants($input: [CreateProductVariantInput!]!) {
        createProductVariants(input: $input) {
            ...ProductVariant
        }
    }
    ${PRODUCT_VARIANT_FRAGMENT}
`;
const UPDATE_PRODUCT_VARIANTS = gql `
    mutation UpdateProductVariants($input: [UpdateProductVariantInput!]!) {
        updateProductVariants(input: $input) {
            ...ProductVariant
        }
    }
    ${PRODUCT_VARIANT_FRAGMENT}
`;
const CREATE_PRODUCT_OPTION_GROUP = gql `
    mutation CreateProductOptionGroup($input: CreateProductOptionGroupInput!) {
        createProductOptionGroup(input: $input) {
            ...ProductOptionGroupWithOptions
        }
    }
    ${PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT}
`;
const GET_PRODUCT_OPTION_GROUP = gql `
    query GetProductOptionGroup($id: ID!) {
        productOptionGroup(id: $id) {
            ...ProductOptionGroupWithOptions
        }
    }
    ${PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT}
`;
const ADD_OPTION_TO_GROUP = gql `
    mutation AddOptionToGroup($input: CreateProductOptionInput!) {
        createProductOption(input: $input) {
            id
            createdAt
            updatedAt
            name
            code
            groupId
        }
    }
`;
const ADD_OPTION_GROUP_TO_PRODUCT = gql `
    mutation AddOptionGroupToProduct($productId: ID!, $optionGroupId: ID!) {
        addOptionGroupToProduct(productId: $productId, optionGroupId: $optionGroupId) {
            id
            createdAt
            updatedAt
            optionGroups {
                id
                createdAt
                updatedAt
                code
                options {
                    id
                    createdAt
                    updatedAt
                    code
                }
            }
        }
    }
`;
const REMOVE_OPTION_GROUP_FROM_PRODUCT = gql `
    mutation RemoveOptionGroupFromProduct($productId: ID!, $optionGroupId: ID!) {
        removeOptionGroupFromProduct(productId: $productId, optionGroupId: $optionGroupId) {
            ... on Product {
                id
                createdAt
                updatedAt
                optionGroups {
                    id
                    createdAt
                    updatedAt
                    code
                    options {
                        id
                        createdAt
                        updatedAt
                        code
                    }
                }
            }
            ...ErrorResult
        }
    }
    ${ERROR_RESULT_FRAGMENT}
`;
const GET_PRODUCT_WITH_VARIANTS = gql `
    query GetProductWithVariants($id: ID!, $variantListOptions: ProductVariantListOptions) {
        product(id: $id) {
            ...ProductDetail
            variantList(options: $variantListOptions) {
                items {
                    ...ProductVariant
                }
                totalItems
            }
        }
    }
    ${PRODUCT_DETAIL_FRAGMENT}
    ${PRODUCT_VARIANT_FRAGMENT}
`;
const GET_PRODUCT_SIMPLE = gql `
    query GetProductSimple($id: ID!) {
        product(id: $id) {
            id
            name
            featuredAsset {
                ...Asset
            }
        }
    }
    ${ASSET_FRAGMENT}
`;
const GET_PRODUCT_LIST = gql `
    query GetProductList($options: ProductListOptions) {
        products(options: $options) {
            items {
                id
                createdAt
                updatedAt
                enabled
                languageCode
                name
                slug
                featuredAsset {
                    id
                    createdAt
                    updatedAt
                    preview
                }
            }
            totalItems
        }
    }
`;
const GET_PRODUCT_OPTION_GROUPS = gql `
    query GetProductOptionGroups($filterTerm: String) {
        productOptionGroups(filterTerm: $filterTerm) {
            id
            createdAt
            updatedAt
            languageCode
            code
            name
            options {
                id
                createdAt
                updatedAt
                languageCode
                code
                name
            }
        }
    }
`;
const GET_ASSET_LIST = gql `
    query GetAssetList($options: AssetListOptions) {
        assets(options: $options) {
            items {
                ...Asset
                tags {
                    ...Tag
                }
            }
            totalItems
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
const GET_ASSET = gql `
    query GetAsset($id: ID!) {
        asset(id: $id) {
            ...Asset
            tags {
                ...Tag
            }
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
const CREATE_ASSETS = gql `
    mutation CreateAssets($input: [CreateAssetInput!]!) {
        createAssets(input: $input) {
            ...Asset
            ... on Asset {
                tags {
                    ...Tag
                }
            }
            ... on ErrorResult {
                message
            }
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
const UPDATE_ASSET = gql `
    mutation UpdateAsset($input: UpdateAssetInput!) {
        updateAsset(input: $input) {
            ...Asset
            tags {
                ...Tag
            }
        }
    }
    ${ASSET_FRAGMENT}
    ${TAG_FRAGMENT}
`;
const DELETE_ASSETS = gql `
    mutation DeleteAssets($input: DeleteAssetsInput!) {
        deleteAssets(input: $input) {
            result
            message
        }
    }
`;
const SEARCH_PRODUCTS = gql `
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            totalItems
            items {
                enabled
                productId
                productName
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                productVariantId
                productVariantName
                productVariantAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                sku
                channelIds
            }
            facetValues {
                count
                facetValue {
                    id
                    createdAt
                    updatedAt
                    name
                    facet {
                        id
                        createdAt
                        updatedAt
                        name
                    }
                }
            }
        }
    }
`;
const PRODUCT_SELECTOR_SEARCH = gql `
    query ProductSelectorSearch($term: String!, $take: Int!) {
        search(input: { groupByProduct: false, term: $term, take: $take }) {
            items {
                productVariantId
                productVariantName
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                price {
                    ... on SinglePrice {
                        value
                    }
                }
                priceWithTax {
                    ... on SinglePrice {
                        value
                    }
                }
                sku
            }
        }
    }
`;
const UPDATE_PRODUCT_OPTION_GROUP = gql `
    mutation UpdateProductOptionGroup($input: UpdateProductOptionGroupInput!) {
        updateProductOptionGroup(input: $input) {
            ...ProductOptionGroup
        }
    }
    ${PRODUCT_OPTION_GROUP_FRAGMENT}
`;
const UPDATE_PRODUCT_OPTION = gql `
    mutation UpdateProductOption($input: UpdateProductOptionInput!) {
        updateProductOption(input: $input) {
            ...ProductOption
        }
    }
    ${PRODUCT_OPTION_FRAGMENT}
`;
const DELETE_PRODUCT_OPTION = gql `
    mutation DeleteProductOption($id: ID!) {
        deleteProductOption(id: $id) {
            result
            message
        }
    }
`;
const DELETE_PRODUCT_VARIANT = gql `
    mutation DeleteProductVariant($id: ID!) {
        deleteProductVariant(id: $id) {
            result
            message
        }
    }
`;
const GET_PRODUCT_VARIANT_OPTIONS = gql `
    query GetProductVariantOptions($id: ID!) {
        product(id: $id) {
            id
            createdAt
            updatedAt
            name
            optionGroups {
                ...ProductOptionGroup
                options {
                    ...ProductOption
                }
            }
            variants {
                id
                createdAt
                updatedAt
                enabled
                name
                sku
                price
                stockOnHand
                enabled
                options {
                    id
                    createdAt
                    updatedAt
                    name
                    code
                    groupId
                }
            }
        }
    }
    ${PRODUCT_OPTION_GROUP_FRAGMENT}
    ${PRODUCT_OPTION_FRAGMENT}
`;
const ASSIGN_PRODUCTS_TO_CHANNEL = gql `
    mutation AssignProductsToChannel($input: AssignProductsToChannelInput!) {
        assignProductsToChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
const ASSIGN_VARIANTS_TO_CHANNEL = gql `
    mutation AssignVariantsToChannel($input: AssignProductVariantsToChannelInput!) {
        assignProductVariantsToChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
const REMOVE_PRODUCTS_FROM_CHANNEL = gql `
    mutation RemoveProductsFromChannel($input: RemoveProductsFromChannelInput!) {
        removeProductsFromChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
const REMOVE_VARIANTS_FROM_CHANNEL = gql `
    mutation RemoveVariantsFromChannel($input: RemoveProductVariantsFromChannelInput!) {
        removeProductVariantsFromChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`;
const GET_PRODUCT_VARIANT = gql `
    query GetProductVariant($id: ID!) {
        productVariant(id: $id) {
            id
            name
            sku
            stockOnHand
            stockAllocated
            stockLevel
            useGlobalOutOfStockThreshold
            featuredAsset {
                id
                preview
                focalPoint {
                    x
                    y
                }
            }
            price
            priceWithTax
            product {
                id
                featuredAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
            }
        }
    }
`;
const GET_PRODUCT_VARIANT_LIST_SIMPLE = gql `
    query GetProductVariantListSimple($options: ProductVariantListOptions!, $productId: ID) {
        productVariants(options: $options, productId: $productId) {
            items {
                id
                name
                sku
                featuredAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                product {
                    id
                    featuredAsset {
                        id
                        preview
                        focalPoint {
                            x
                            y
                        }
                    }
                }
            }
            totalItems
        }
    }
`;
const GET_PRODUCT_VARIANT_LIST = gql `
    query GetProductVariantList($options: ProductVariantListOptions!, $productId: ID) {
        productVariants(options: $options, productId: $productId) {
            items {
                ...ProductVariant
            }
            totalItems
        }
    }
    ${PRODUCT_VARIANT_FRAGMENT}
`;
const GET_TAG_LIST = gql `
    query GetTagList($options: TagListOptions) {
        tags(options: $options) {
            items {
                ...Tag
            }
            totalItems
        }
    }
    ${TAG_FRAGMENT}
`;
const GET_TAG = gql `
    query GetTag($id: ID!) {
        tag(id: $id) {
            ...Tag
        }
    }
    ${TAG_FRAGMENT}
`;
const CREATE_TAG = gql `
    mutation CreateTag($input: CreateTagInput!) {
        createTag(input: $input) {
            ...Tag
        }
    }
    ${TAG_FRAGMENT}
`;
const UPDATE_TAG = gql `
    mutation UpdateTag($input: UpdateTagInput!) {
        updateTag(input: $input) {
            ...Tag
        }
    }
    ${TAG_FRAGMENT}
`;
const DELETE_TAG = gql `
    mutation DeleteTag($id: ID!) {
        deleteTag(id: $id) {
            message
            result
        }
    }
`;

const GET_COLLECTION_FILTERS = gql `
    query GetCollectionFilters {
        collectionFilters {
            ...ConfigurableOperationDef
        }
    }
    ${CONFIGURABLE_OPERATION_DEF_FRAGMENT}
`;
const COLLECTION_FRAGMENT = gql `
    fragment Collection on Collection {
        id
        createdAt
        updatedAt
        name
        slug
        description
        isPrivate
        languageCode
        breadcrumbs {
            id
            name
            slug
        }
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        filters {
            ...ConfigurableOperation
        }
        translations {
            id
            languageCode
            name
            slug
            description
        }
        parent {
            id
            name
        }
        children {
            id
            name
        }
    }
    ${ASSET_FRAGMENT}
    ${CONFIGURABLE_OPERATION_FRAGMENT}
`;
const GET_COLLECTION_LIST = gql `
    query GetCollectionList($options: CollectionListOptions) {
        collections(options: $options) {
            items {
                id
                name
                slug
                description
                isPrivate
                featuredAsset {
                    ...Asset
                }
                parent {
                    id
                }
            }
            totalItems
        }
    }
    ${ASSET_FRAGMENT}
`;
const GET_COLLECTION = gql `
    query GetCollection($id: ID!) {
        collection(id: $id) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
const CREATE_COLLECTION = gql `
    mutation CreateCollection($input: CreateCollectionInput!) {
        createCollection(input: $input) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
const UPDATE_COLLECTION = gql `
    mutation UpdateCollection($input: UpdateCollectionInput!) {
        updateCollection(input: $input) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
const MOVE_COLLECTION = gql `
    mutation MoveCollection($input: MoveCollectionInput!) {
        moveCollection(input: $input) {
            ...Collection
        }
    }
    ${COLLECTION_FRAGMENT}
`;
const DELETE_COLLECTION = gql `
    mutation DeleteCollection($id: ID!) {
        deleteCollection(id: $id) {
            result
            message
        }
    }
`;
const DELETE_COLLECTIONS = gql `
    mutation DeleteCollections($ids: [ID!]!) {
        deleteCollections(ids: $ids) {
            result
            message
        }
    }
`;
const GET_COLLECTION_CONTENTS = gql `
    query GetCollectionContents($id: ID!, $options: ProductVariantListOptions) {
        collection(id: $id) {
            id
            name
            productVariants(options: $options) {
                items {
                    id
                    productId
                    name
                    sku
                }
                totalItems
            }
        }
    }
`;
const PREVIEW_COLLECTION_CONTENTS = gql `
    query PreviewCollectionContents(
        $input: PreviewCollectionVariantsInput!
        $options: ProductVariantListOptions
    ) {
        previewCollectionVariants(input: $input, options: $options) {
            items {
                id
                productId
                name
                sku
            }
            totalItems
        }
    }
`;
const ASSIGN_COLLECTIONS_TO_CHANNEL = gql `
    mutation AssignCollectionsToChannel($input: AssignCollectionsToChannelInput!) {
        assignCollectionsToChannel(input: $input) {
            id
            name
        }
    }
`;
const REMOVE_COLLECTIONS_FROM_CHANNEL = gql `
    mutation RemoveCollectionsFromChannel($input: RemoveCollectionsFromChannelInput!) {
        removeCollectionsFromChannel(input: $input) {
            id
            name
        }
    }
`;

class CollectionDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    getCollectionFilters() {
        return this.baseDataService.query(GET_COLLECTION_FILTERS);
    }
    getCollections(take = 10, skip = 0) {
        return this.baseDataService.query(GET_COLLECTION_LIST, {
            options: {
                take,
                skip,
            },
        });
    }
    getCollection(id) {
        return this.baseDataService.query(GET_COLLECTION, {
            id,
        });
    }
    createCollection(input) {
        return this.baseDataService.mutate(CREATE_COLLECTION, {
            input: pick(input, [
                'translations',
                'parentId',
                'assetIds',
                'featuredAssetId',
                'filters',
                'customFields',
            ]),
        });
    }
    updateCollection(input) {
        return this.baseDataService.mutate(UPDATE_COLLECTION, {
            input: pick(input, [
                'id',
                'isPrivate',
                'translations',
                'assetIds',
                'featuredAssetId',
                'filters',
                'customFields',
            ]),
        });
    }
    moveCollection(inputs) {
        return from(inputs).pipe(concatMap(input => this.baseDataService.mutate(MOVE_COLLECTION, { input })), bufferCount(inputs.length));
    }
    deleteCollection(id) {
        return this.baseDataService.mutate(DELETE_COLLECTION, {
            id,
        });
    }
    deleteCollections(ids) {
        return this.baseDataService.mutate(DELETE_COLLECTIONS, {
            ids,
        });
    }
    previewCollectionVariants(input, options) {
        return this.baseDataService.query(PREVIEW_COLLECTION_CONTENTS, { input, options });
    }
    getCollectionContents(id, take = 10, skip = 0, filterTerm) {
        const filter = filterTerm
            ? { name: { contains: filterTerm } }
            : undefined;
        return this.baseDataService.query(GET_COLLECTION_CONTENTS, {
            id,
            options: {
                skip,
                take,
                filter,
            },
        });
    }
    assignCollectionsToChannel(input) {
        return this.baseDataService.mutate(ASSIGN_COLLECTIONS_TO_CHANNEL, {
            input,
        });
    }
    removeCollectionsFromChannel(input) {
        return this.baseDataService.mutate(REMOVE_COLLECTIONS_FROM_CHANNEL, {
            input,
        });
    }
}

var AdjustmentType;
(function (AdjustmentType) {
    AdjustmentType["PROMOTION"] = "PROMOTION";
    AdjustmentType["DISTRIBUTED_ORDER_PROMOTION"] = "DISTRIBUTED_ORDER_PROMOTION";
    AdjustmentType["OTHER"] = "OTHER";
})(AdjustmentType || (AdjustmentType = {}));
var AssetType;
(function (AssetType) {
    AssetType["IMAGE"] = "IMAGE";
    AssetType["VIDEO"] = "VIDEO";
    AssetType["BINARY"] = "BINARY";
})(AssetType || (AssetType = {}));
/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
var CurrencyCode;
(function (CurrencyCode) {
    /** United Arab Emirates dirham */
    CurrencyCode["AED"] = "AED";
    /** Afghan afghani */
    CurrencyCode["AFN"] = "AFN";
    /** Albanian lek */
    CurrencyCode["ALL"] = "ALL";
    /** Armenian dram */
    CurrencyCode["AMD"] = "AMD";
    /** Netherlands Antillean guilder */
    CurrencyCode["ANG"] = "ANG";
    /** Angolan kwanza */
    CurrencyCode["AOA"] = "AOA";
    /** Argentine peso */
    CurrencyCode["ARS"] = "ARS";
    /** Australian dollar */
    CurrencyCode["AUD"] = "AUD";
    /** Aruban florin */
    CurrencyCode["AWG"] = "AWG";
    /** Azerbaijani manat */
    CurrencyCode["AZN"] = "AZN";
    /** Bosnia and Herzegovina convertible mark */
    CurrencyCode["BAM"] = "BAM";
    /** Barbados dollar */
    CurrencyCode["BBD"] = "BBD";
    /** Bangladeshi taka */
    CurrencyCode["BDT"] = "BDT";
    /** Bulgarian lev */
    CurrencyCode["BGN"] = "BGN";
    /** Bahraini dinar */
    CurrencyCode["BHD"] = "BHD";
    /** Burundian franc */
    CurrencyCode["BIF"] = "BIF";
    /** Bermudian dollar */
    CurrencyCode["BMD"] = "BMD";
    /** Brunei dollar */
    CurrencyCode["BND"] = "BND";
    /** Boliviano */
    CurrencyCode["BOB"] = "BOB";
    /** Brazilian real */
    CurrencyCode["BRL"] = "BRL";
    /** Bahamian dollar */
    CurrencyCode["BSD"] = "BSD";
    /** Bhutanese ngultrum */
    CurrencyCode["BTN"] = "BTN";
    /** Botswana pula */
    CurrencyCode["BWP"] = "BWP";
    /** Belarusian ruble */
    CurrencyCode["BYN"] = "BYN";
    /** Belize dollar */
    CurrencyCode["BZD"] = "BZD";
    /** Canadian dollar */
    CurrencyCode["CAD"] = "CAD";
    /** Congolese franc */
    CurrencyCode["CDF"] = "CDF";
    /** Swiss franc */
    CurrencyCode["CHF"] = "CHF";
    /** Chilean peso */
    CurrencyCode["CLP"] = "CLP";
    /** Renminbi (Chinese) yuan */
    CurrencyCode["CNY"] = "CNY";
    /** Colombian peso */
    CurrencyCode["COP"] = "COP";
    /** Costa Rican colon */
    CurrencyCode["CRC"] = "CRC";
    /** Cuban convertible peso */
    CurrencyCode["CUC"] = "CUC";
    /** Cuban peso */
    CurrencyCode["CUP"] = "CUP";
    /** Cape Verde escudo */
    CurrencyCode["CVE"] = "CVE";
    /** Czech koruna */
    CurrencyCode["CZK"] = "CZK";
    /** Djiboutian franc */
    CurrencyCode["DJF"] = "DJF";
    /** Danish krone */
    CurrencyCode["DKK"] = "DKK";
    /** Dominican peso */
    CurrencyCode["DOP"] = "DOP";
    /** Algerian dinar */
    CurrencyCode["DZD"] = "DZD";
    /** Egyptian pound */
    CurrencyCode["EGP"] = "EGP";
    /** Eritrean nakfa */
    CurrencyCode["ERN"] = "ERN";
    /** Ethiopian birr */
    CurrencyCode["ETB"] = "ETB";
    /** Euro */
    CurrencyCode["EUR"] = "EUR";
    /** Fiji dollar */
    CurrencyCode["FJD"] = "FJD";
    /** Falkland Islands pound */
    CurrencyCode["FKP"] = "FKP";
    /** Pound sterling */
    CurrencyCode["GBP"] = "GBP";
    /** Georgian lari */
    CurrencyCode["GEL"] = "GEL";
    /** Ghanaian cedi */
    CurrencyCode["GHS"] = "GHS";
    /** Gibraltar pound */
    CurrencyCode["GIP"] = "GIP";
    /** Gambian dalasi */
    CurrencyCode["GMD"] = "GMD";
    /** Guinean franc */
    CurrencyCode["GNF"] = "GNF";
    /** Guatemalan quetzal */
    CurrencyCode["GTQ"] = "GTQ";
    /** Guyanese dollar */
    CurrencyCode["GYD"] = "GYD";
    /** Hong Kong dollar */
    CurrencyCode["HKD"] = "HKD";
    /** Honduran lempira */
    CurrencyCode["HNL"] = "HNL";
    /** Croatian kuna */
    CurrencyCode["HRK"] = "HRK";
    /** Haitian gourde */
    CurrencyCode["HTG"] = "HTG";
    /** Hungarian forint */
    CurrencyCode["HUF"] = "HUF";
    /** Indonesian rupiah */
    CurrencyCode["IDR"] = "IDR";
    /** Israeli new shekel */
    CurrencyCode["ILS"] = "ILS";
    /** Indian rupee */
    CurrencyCode["INR"] = "INR";
    /** Iraqi dinar */
    CurrencyCode["IQD"] = "IQD";
    /** Iranian rial */
    CurrencyCode["IRR"] = "IRR";
    /** Icelandic króna */
    CurrencyCode["ISK"] = "ISK";
    /** Jamaican dollar */
    CurrencyCode["JMD"] = "JMD";
    /** Jordanian dinar */
    CurrencyCode["JOD"] = "JOD";
    /** Japanese yen */
    CurrencyCode["JPY"] = "JPY";
    /** Kenyan shilling */
    CurrencyCode["KES"] = "KES";
    /** Kyrgyzstani som */
    CurrencyCode["KGS"] = "KGS";
    /** Cambodian riel */
    CurrencyCode["KHR"] = "KHR";
    /** Comoro franc */
    CurrencyCode["KMF"] = "KMF";
    /** North Korean won */
    CurrencyCode["KPW"] = "KPW";
    /** South Korean won */
    CurrencyCode["KRW"] = "KRW";
    /** Kuwaiti dinar */
    CurrencyCode["KWD"] = "KWD";
    /** Cayman Islands dollar */
    CurrencyCode["KYD"] = "KYD";
    /** Kazakhstani tenge */
    CurrencyCode["KZT"] = "KZT";
    /** Lao kip */
    CurrencyCode["LAK"] = "LAK";
    /** Lebanese pound */
    CurrencyCode["LBP"] = "LBP";
    /** Sri Lankan rupee */
    CurrencyCode["LKR"] = "LKR";
    /** Liberian dollar */
    CurrencyCode["LRD"] = "LRD";
    /** Lesotho loti */
    CurrencyCode["LSL"] = "LSL";
    /** Libyan dinar */
    CurrencyCode["LYD"] = "LYD";
    /** Moroccan dirham */
    CurrencyCode["MAD"] = "MAD";
    /** Moldovan leu */
    CurrencyCode["MDL"] = "MDL";
    /** Malagasy ariary */
    CurrencyCode["MGA"] = "MGA";
    /** Macedonian denar */
    CurrencyCode["MKD"] = "MKD";
    /** Myanmar kyat */
    CurrencyCode["MMK"] = "MMK";
    /** Mongolian tögrög */
    CurrencyCode["MNT"] = "MNT";
    /** Macanese pataca */
    CurrencyCode["MOP"] = "MOP";
    /** Mauritanian ouguiya */
    CurrencyCode["MRU"] = "MRU";
    /** Mauritian rupee */
    CurrencyCode["MUR"] = "MUR";
    /** Maldivian rufiyaa */
    CurrencyCode["MVR"] = "MVR";
    /** Malawian kwacha */
    CurrencyCode["MWK"] = "MWK";
    /** Mexican peso */
    CurrencyCode["MXN"] = "MXN";
    /** Malaysian ringgit */
    CurrencyCode["MYR"] = "MYR";
    /** Mozambican metical */
    CurrencyCode["MZN"] = "MZN";
    /** Namibian dollar */
    CurrencyCode["NAD"] = "NAD";
    /** Nigerian naira */
    CurrencyCode["NGN"] = "NGN";
    /** Nicaraguan córdoba */
    CurrencyCode["NIO"] = "NIO";
    /** Norwegian krone */
    CurrencyCode["NOK"] = "NOK";
    /** Nepalese rupee */
    CurrencyCode["NPR"] = "NPR";
    /** New Zealand dollar */
    CurrencyCode["NZD"] = "NZD";
    /** Omani rial */
    CurrencyCode["OMR"] = "OMR";
    /** Panamanian balboa */
    CurrencyCode["PAB"] = "PAB";
    /** Peruvian sol */
    CurrencyCode["PEN"] = "PEN";
    /** Papua New Guinean kina */
    CurrencyCode["PGK"] = "PGK";
    /** Philippine peso */
    CurrencyCode["PHP"] = "PHP";
    /** Pakistani rupee */
    CurrencyCode["PKR"] = "PKR";
    /** Polish złoty */
    CurrencyCode["PLN"] = "PLN";
    /** Paraguayan guaraní */
    CurrencyCode["PYG"] = "PYG";
    /** Qatari riyal */
    CurrencyCode["QAR"] = "QAR";
    /** Romanian leu */
    CurrencyCode["RON"] = "RON";
    /** Serbian dinar */
    CurrencyCode["RSD"] = "RSD";
    /** Russian ruble */
    CurrencyCode["RUB"] = "RUB";
    /** Rwandan franc */
    CurrencyCode["RWF"] = "RWF";
    /** Saudi riyal */
    CurrencyCode["SAR"] = "SAR";
    /** Solomon Islands dollar */
    CurrencyCode["SBD"] = "SBD";
    /** Seychelles rupee */
    CurrencyCode["SCR"] = "SCR";
    /** Sudanese pound */
    CurrencyCode["SDG"] = "SDG";
    /** Swedish krona/kronor */
    CurrencyCode["SEK"] = "SEK";
    /** Singapore dollar */
    CurrencyCode["SGD"] = "SGD";
    /** Saint Helena pound */
    CurrencyCode["SHP"] = "SHP";
    /** Sierra Leonean leone */
    CurrencyCode["SLL"] = "SLL";
    /** Somali shilling */
    CurrencyCode["SOS"] = "SOS";
    /** Surinamese dollar */
    CurrencyCode["SRD"] = "SRD";
    /** South Sudanese pound */
    CurrencyCode["SSP"] = "SSP";
    /** São Tomé and Príncipe dobra */
    CurrencyCode["STN"] = "STN";
    /** Salvadoran colón */
    CurrencyCode["SVC"] = "SVC";
    /** Syrian pound */
    CurrencyCode["SYP"] = "SYP";
    /** Swazi lilangeni */
    CurrencyCode["SZL"] = "SZL";
    /** Thai baht */
    CurrencyCode["THB"] = "THB";
    /** Tajikistani somoni */
    CurrencyCode["TJS"] = "TJS";
    /** Turkmenistan manat */
    CurrencyCode["TMT"] = "TMT";
    /** Tunisian dinar */
    CurrencyCode["TND"] = "TND";
    /** Tongan paʻanga */
    CurrencyCode["TOP"] = "TOP";
    /** Turkish lira */
    CurrencyCode["TRY"] = "TRY";
    /** Trinidad and Tobago dollar */
    CurrencyCode["TTD"] = "TTD";
    /** New Taiwan dollar */
    CurrencyCode["TWD"] = "TWD";
    /** Tanzanian shilling */
    CurrencyCode["TZS"] = "TZS";
    /** Ukrainian hryvnia */
    CurrencyCode["UAH"] = "UAH";
    /** Ugandan shilling */
    CurrencyCode["UGX"] = "UGX";
    /** United States dollar */
    CurrencyCode["USD"] = "USD";
    /** Uruguayan peso */
    CurrencyCode["UYU"] = "UYU";
    /** Uzbekistan som */
    CurrencyCode["UZS"] = "UZS";
    /** Venezuelan bolívar soberano */
    CurrencyCode["VES"] = "VES";
    /** Vietnamese đồng */
    CurrencyCode["VND"] = "VND";
    /** Vanuatu vatu */
    CurrencyCode["VUV"] = "VUV";
    /** Samoan tala */
    CurrencyCode["WST"] = "WST";
    /** CFA franc BEAC */
    CurrencyCode["XAF"] = "XAF";
    /** East Caribbean dollar */
    CurrencyCode["XCD"] = "XCD";
    /** CFA franc BCEAO */
    CurrencyCode["XOF"] = "XOF";
    /** CFP franc (franc Pacifique) */
    CurrencyCode["XPF"] = "XPF";
    /** Yemeni rial */
    CurrencyCode["YER"] = "YER";
    /** South African rand */
    CurrencyCode["ZAR"] = "ZAR";
    /** Zambian kwacha */
    CurrencyCode["ZMW"] = "ZMW";
    /** Zimbabwean dollar */
    CurrencyCode["ZWL"] = "ZWL";
})(CurrencyCode || (CurrencyCode = {}));
var DeletionResult;
(function (DeletionResult) {
    /** The entity was successfully deleted */
    DeletionResult["DELETED"] = "DELETED";
    /** Deletion did not take place, reason given in message */
    DeletionResult["NOT_DELETED"] = "NOT_DELETED";
})(DeletionResult || (DeletionResult = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    ErrorCode["MIME_TYPE_ERROR"] = "MIME_TYPE_ERROR";
    ErrorCode["LANGUAGE_NOT_AVAILABLE_ERROR"] = "LANGUAGE_NOT_AVAILABLE_ERROR";
    ErrorCode["FACET_IN_USE_ERROR"] = "FACET_IN_USE_ERROR";
    ErrorCode["CHANNEL_DEFAULT_LANGUAGE_ERROR"] = "CHANNEL_DEFAULT_LANGUAGE_ERROR";
    ErrorCode["SETTLE_PAYMENT_ERROR"] = "SETTLE_PAYMENT_ERROR";
    ErrorCode["CANCEL_PAYMENT_ERROR"] = "CANCEL_PAYMENT_ERROR";
    ErrorCode["EMPTY_ORDER_LINE_SELECTION_ERROR"] = "EMPTY_ORDER_LINE_SELECTION_ERROR";
    ErrorCode["ITEMS_ALREADY_FULFILLED_ERROR"] = "ITEMS_ALREADY_FULFILLED_ERROR";
    ErrorCode["INVALID_FULFILLMENT_HANDLER_ERROR"] = "INVALID_FULFILLMENT_HANDLER_ERROR";
    ErrorCode["CREATE_FULFILLMENT_ERROR"] = "CREATE_FULFILLMENT_ERROR";
    ErrorCode["INSUFFICIENT_STOCK_ON_HAND_ERROR"] = "INSUFFICIENT_STOCK_ON_HAND_ERROR";
    ErrorCode["MULTIPLE_ORDER_ERROR"] = "MULTIPLE_ORDER_ERROR";
    ErrorCode["CANCEL_ACTIVE_ORDER_ERROR"] = "CANCEL_ACTIVE_ORDER_ERROR";
    ErrorCode["PAYMENT_ORDER_MISMATCH_ERROR"] = "PAYMENT_ORDER_MISMATCH_ERROR";
    ErrorCode["REFUND_ORDER_STATE_ERROR"] = "REFUND_ORDER_STATE_ERROR";
    ErrorCode["NOTHING_TO_REFUND_ERROR"] = "NOTHING_TO_REFUND_ERROR";
    ErrorCode["ALREADY_REFUNDED_ERROR"] = "ALREADY_REFUNDED_ERROR";
    ErrorCode["QUANTITY_TOO_GREAT_ERROR"] = "QUANTITY_TOO_GREAT_ERROR";
    ErrorCode["REFUND_STATE_TRANSITION_ERROR"] = "REFUND_STATE_TRANSITION_ERROR";
    ErrorCode["PAYMENT_STATE_TRANSITION_ERROR"] = "PAYMENT_STATE_TRANSITION_ERROR";
    ErrorCode["FULFILLMENT_STATE_TRANSITION_ERROR"] = "FULFILLMENT_STATE_TRANSITION_ERROR";
    ErrorCode["ORDER_MODIFICATION_STATE_ERROR"] = "ORDER_MODIFICATION_STATE_ERROR";
    ErrorCode["NO_CHANGES_SPECIFIED_ERROR"] = "NO_CHANGES_SPECIFIED_ERROR";
    ErrorCode["PAYMENT_METHOD_MISSING_ERROR"] = "PAYMENT_METHOD_MISSING_ERROR";
    ErrorCode["REFUND_PAYMENT_ID_MISSING_ERROR"] = "REFUND_PAYMENT_ID_MISSING_ERROR";
    ErrorCode["MANUAL_PAYMENT_STATE_ERROR"] = "MANUAL_PAYMENT_STATE_ERROR";
    ErrorCode["PRODUCT_OPTION_IN_USE_ERROR"] = "PRODUCT_OPTION_IN_USE_ERROR";
    ErrorCode["MISSING_CONDITIONS_ERROR"] = "MISSING_CONDITIONS_ERROR";
    ErrorCode["NATIVE_AUTH_STRATEGY_ERROR"] = "NATIVE_AUTH_STRATEGY_ERROR";
    ErrorCode["INVALID_CREDENTIALS_ERROR"] = "INVALID_CREDENTIALS_ERROR";
    ErrorCode["ORDER_STATE_TRANSITION_ERROR"] = "ORDER_STATE_TRANSITION_ERROR";
    ErrorCode["EMAIL_ADDRESS_CONFLICT_ERROR"] = "EMAIL_ADDRESS_CONFLICT_ERROR";
    ErrorCode["ORDER_LIMIT_ERROR"] = "ORDER_LIMIT_ERROR";
    ErrorCode["NEGATIVE_QUANTITY_ERROR"] = "NEGATIVE_QUANTITY_ERROR";
    ErrorCode["INSUFFICIENT_STOCK_ERROR"] = "INSUFFICIENT_STOCK_ERROR";
    ErrorCode["COUPON_CODE_INVALID_ERROR"] = "COUPON_CODE_INVALID_ERROR";
    ErrorCode["COUPON_CODE_EXPIRED_ERROR"] = "COUPON_CODE_EXPIRED_ERROR";
    ErrorCode["COUPON_CODE_LIMIT_ERROR"] = "COUPON_CODE_LIMIT_ERROR";
    ErrorCode["ORDER_MODIFICATION_ERROR"] = "ORDER_MODIFICATION_ERROR";
    ErrorCode["INELIGIBLE_SHIPPING_METHOD_ERROR"] = "INELIGIBLE_SHIPPING_METHOD_ERROR";
    ErrorCode["NO_ACTIVE_ORDER_ERROR"] = "NO_ACTIVE_ORDER_ERROR";
    ErrorCode["SHOP_CLOSED_ERROR"] = "SHOP_CLOSED_ERROR";
})(ErrorCode || (ErrorCode = {}));
var GlobalFlag;
(function (GlobalFlag) {
    GlobalFlag["TRUE"] = "TRUE";
    GlobalFlag["FALSE"] = "FALSE";
    GlobalFlag["INHERIT"] = "INHERIT";
})(GlobalFlag || (GlobalFlag = {}));
var HistoryEntryType;
(function (HistoryEntryType) {
    HistoryEntryType["CUSTOMER_REGISTERED"] = "CUSTOMER_REGISTERED";
    HistoryEntryType["CUSTOMER_VERIFIED"] = "CUSTOMER_VERIFIED";
    HistoryEntryType["CUSTOMER_DETAIL_UPDATED"] = "CUSTOMER_DETAIL_UPDATED";
    HistoryEntryType["CUSTOMER_ADDED_TO_GROUP"] = "CUSTOMER_ADDED_TO_GROUP";
    HistoryEntryType["CUSTOMER_REMOVED_FROM_GROUP"] = "CUSTOMER_REMOVED_FROM_GROUP";
    HistoryEntryType["CUSTOMER_ADDRESS_CREATED"] = "CUSTOMER_ADDRESS_CREATED";
    HistoryEntryType["CUSTOMER_ADDRESS_UPDATED"] = "CUSTOMER_ADDRESS_UPDATED";
    HistoryEntryType["CUSTOMER_ADDRESS_DELETED"] = "CUSTOMER_ADDRESS_DELETED";
    HistoryEntryType["CUSTOMER_PASSWORD_UPDATED"] = "CUSTOMER_PASSWORD_UPDATED";
    HistoryEntryType["CUSTOMER_PASSWORD_RESET_REQUESTED"] = "CUSTOMER_PASSWORD_RESET_REQUESTED";
    HistoryEntryType["CUSTOMER_PASSWORD_RESET_VERIFIED"] = "CUSTOMER_PASSWORD_RESET_VERIFIED";
    HistoryEntryType["CUSTOMER_EMAIL_UPDATE_REQUESTED"] = "CUSTOMER_EMAIL_UPDATE_REQUESTED";
    HistoryEntryType["CUSTOMER_EMAIL_UPDATE_VERIFIED"] = "CUSTOMER_EMAIL_UPDATE_VERIFIED";
    HistoryEntryType["CUSTOMER_NOTE"] = "CUSTOMER_NOTE";
    HistoryEntryType["ORDER_STATE_TRANSITION"] = "ORDER_STATE_TRANSITION";
    HistoryEntryType["ORDER_PAYMENT_TRANSITION"] = "ORDER_PAYMENT_TRANSITION";
    HistoryEntryType["ORDER_FULFILLMENT"] = "ORDER_FULFILLMENT";
    HistoryEntryType["ORDER_CANCELLATION"] = "ORDER_CANCELLATION";
    HistoryEntryType["ORDER_REFUND_TRANSITION"] = "ORDER_REFUND_TRANSITION";
    HistoryEntryType["ORDER_FULFILLMENT_TRANSITION"] = "ORDER_FULFILLMENT_TRANSITION";
    HistoryEntryType["ORDER_NOTE"] = "ORDER_NOTE";
    HistoryEntryType["ORDER_COUPON_APPLIED"] = "ORDER_COUPON_APPLIED";
    HistoryEntryType["ORDER_COUPON_REMOVED"] = "ORDER_COUPON_REMOVED";
    HistoryEntryType["ORDER_MODIFIED"] = "ORDER_MODIFIED";
})(HistoryEntryType || (HistoryEntryType = {}));
/**
 * @description
 * The state of a Job in the JobQueue
 *
 * @docsCategory common
 */
var JobState;
(function (JobState) {
    JobState["PENDING"] = "PENDING";
    JobState["RUNNING"] = "RUNNING";
    JobState["COMPLETED"] = "COMPLETED";
    JobState["RETRYING"] = "RETRYING";
    JobState["FAILED"] = "FAILED";
    JobState["CANCELLED"] = "CANCELLED";
})(JobState || (JobState = {}));
/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
var LanguageCode;
(function (LanguageCode) {
    /** Afrikaans */
    LanguageCode["af"] = "af";
    /** Akan */
    LanguageCode["ak"] = "ak";
    /** Amharic */
    LanguageCode["am"] = "am";
    /** Arabic */
    LanguageCode["ar"] = "ar";
    /** Azerbaijani */
    LanguageCode["az"] = "az";
    /** Belarusian */
    LanguageCode["be"] = "be";
    /** Bulgarian */
    LanguageCode["bg"] = "bg";
    /** Bambara */
    LanguageCode["bm"] = "bm";
    /** Bangla */
    LanguageCode["bn"] = "bn";
    /** Tibetan */
    LanguageCode["bo"] = "bo";
    /** Breton */
    LanguageCode["br"] = "br";
    /** Bosnian */
    LanguageCode["bs"] = "bs";
    /** Catalan */
    LanguageCode["ca"] = "ca";
    /** Chechen */
    LanguageCode["ce"] = "ce";
    /** Corsican */
    LanguageCode["co"] = "co";
    /** Czech */
    LanguageCode["cs"] = "cs";
    /** Church Slavic */
    LanguageCode["cu"] = "cu";
    /** Welsh */
    LanguageCode["cy"] = "cy";
    /** Danish */
    LanguageCode["da"] = "da";
    /** German */
    LanguageCode["de"] = "de";
    /** Austrian German */
    LanguageCode["de_AT"] = "de_AT";
    /** Swiss High German */
    LanguageCode["de_CH"] = "de_CH";
    /** Dzongkha */
    LanguageCode["dz"] = "dz";
    /** Ewe */
    LanguageCode["ee"] = "ee";
    /** Greek */
    LanguageCode["el"] = "el";
    /** English */
    LanguageCode["en"] = "en";
    /** Australian English */
    LanguageCode["en_AU"] = "en_AU";
    /** Canadian English */
    LanguageCode["en_CA"] = "en_CA";
    /** British English */
    LanguageCode["en_GB"] = "en_GB";
    /** American English */
    LanguageCode["en_US"] = "en_US";
    /** Esperanto */
    LanguageCode["eo"] = "eo";
    /** Spanish */
    LanguageCode["es"] = "es";
    /** European Spanish */
    LanguageCode["es_ES"] = "es_ES";
    /** Mexican Spanish */
    LanguageCode["es_MX"] = "es_MX";
    /** Estonian */
    LanguageCode["et"] = "et";
    /** Basque */
    LanguageCode["eu"] = "eu";
    /** Persian */
    LanguageCode["fa"] = "fa";
    /** Dari */
    LanguageCode["fa_AF"] = "fa_AF";
    /** Fulah */
    LanguageCode["ff"] = "ff";
    /** Finnish */
    LanguageCode["fi"] = "fi";
    /** Faroese */
    LanguageCode["fo"] = "fo";
    /** French */
    LanguageCode["fr"] = "fr";
    /** Canadian French */
    LanguageCode["fr_CA"] = "fr_CA";
    /** Swiss French */
    LanguageCode["fr_CH"] = "fr_CH";
    /** Western Frisian */
    LanguageCode["fy"] = "fy";
    /** Irish */
    LanguageCode["ga"] = "ga";
    /** Scottish Gaelic */
    LanguageCode["gd"] = "gd";
    /** Galician */
    LanguageCode["gl"] = "gl";
    /** Gujarati */
    LanguageCode["gu"] = "gu";
    /** Manx */
    LanguageCode["gv"] = "gv";
    /** Hausa */
    LanguageCode["ha"] = "ha";
    /** Hebrew */
    LanguageCode["he"] = "he";
    /** Hindi */
    LanguageCode["hi"] = "hi";
    /** Croatian */
    LanguageCode["hr"] = "hr";
    /** Haitian Creole */
    LanguageCode["ht"] = "ht";
    /** Hungarian */
    LanguageCode["hu"] = "hu";
    /** Armenian */
    LanguageCode["hy"] = "hy";
    /** Interlingua */
    LanguageCode["ia"] = "ia";
    /** Indonesian */
    LanguageCode["id"] = "id";
    /** Igbo */
    LanguageCode["ig"] = "ig";
    /** Sichuan Yi */
    LanguageCode["ii"] = "ii";
    /** Italian */
    LanguageCode["it"] = "it";
    /** Japanese */
    LanguageCode["ja"] = "ja";
    /** Javanese */
    LanguageCode["jv"] = "jv";
    /** Georgian */
    LanguageCode["ka"] = "ka";
    /** Kikuyu */
    LanguageCode["ki"] = "ki";
    /** Kazakh */
    LanguageCode["kk"] = "kk";
    /** Kalaallisut */
    LanguageCode["kl"] = "kl";
    /** Khmer */
    LanguageCode["km"] = "km";
    /** Kannada */
    LanguageCode["kn"] = "kn";
    /** Korean */
    LanguageCode["ko"] = "ko";
    /** Kashmiri */
    LanguageCode["ks"] = "ks";
    /** Kurdish */
    LanguageCode["ku"] = "ku";
    /** Cornish */
    LanguageCode["kw"] = "kw";
    /** Kyrgyz */
    LanguageCode["ky"] = "ky";
    /** Latin */
    LanguageCode["la"] = "la";
    /** Luxembourgish */
    LanguageCode["lb"] = "lb";
    /** Ganda */
    LanguageCode["lg"] = "lg";
    /** Lingala */
    LanguageCode["ln"] = "ln";
    /** Lao */
    LanguageCode["lo"] = "lo";
    /** Lithuanian */
    LanguageCode["lt"] = "lt";
    /** Luba-Katanga */
    LanguageCode["lu"] = "lu";
    /** Latvian */
    LanguageCode["lv"] = "lv";
    /** Malagasy */
    LanguageCode["mg"] = "mg";
    /** Maori */
    LanguageCode["mi"] = "mi";
    /** Macedonian */
    LanguageCode["mk"] = "mk";
    /** Malayalam */
    LanguageCode["ml"] = "ml";
    /** Mongolian */
    LanguageCode["mn"] = "mn";
    /** Marathi */
    LanguageCode["mr"] = "mr";
    /** Malay */
    LanguageCode["ms"] = "ms";
    /** Maltese */
    LanguageCode["mt"] = "mt";
    /** Burmese */
    LanguageCode["my"] = "my";
    /** Norwegian Bokmål */
    LanguageCode["nb"] = "nb";
    /** North Ndebele */
    LanguageCode["nd"] = "nd";
    /** Nepali */
    LanguageCode["ne"] = "ne";
    /** Dutch */
    LanguageCode["nl"] = "nl";
    /** Flemish */
    LanguageCode["nl_BE"] = "nl_BE";
    /** Norwegian Nynorsk */
    LanguageCode["nn"] = "nn";
    /** Nyanja */
    LanguageCode["ny"] = "ny";
    /** Oromo */
    LanguageCode["om"] = "om";
    /** Odia */
    LanguageCode["or"] = "or";
    /** Ossetic */
    LanguageCode["os"] = "os";
    /** Punjabi */
    LanguageCode["pa"] = "pa";
    /** Polish */
    LanguageCode["pl"] = "pl";
    /** Pashto */
    LanguageCode["ps"] = "ps";
    /** Portuguese */
    LanguageCode["pt"] = "pt";
    /** Brazilian Portuguese */
    LanguageCode["pt_BR"] = "pt_BR";
    /** European Portuguese */
    LanguageCode["pt_PT"] = "pt_PT";
    /** Quechua */
    LanguageCode["qu"] = "qu";
    /** Romansh */
    LanguageCode["rm"] = "rm";
    /** Rundi */
    LanguageCode["rn"] = "rn";
    /** Romanian */
    LanguageCode["ro"] = "ro";
    /** Moldavian */
    LanguageCode["ro_MD"] = "ro_MD";
    /** Russian */
    LanguageCode["ru"] = "ru";
    /** Kinyarwanda */
    LanguageCode["rw"] = "rw";
    /** Sanskrit */
    LanguageCode["sa"] = "sa";
    /** Sindhi */
    LanguageCode["sd"] = "sd";
    /** Northern Sami */
    LanguageCode["se"] = "se";
    /** Sango */
    LanguageCode["sg"] = "sg";
    /** Sinhala */
    LanguageCode["si"] = "si";
    /** Slovak */
    LanguageCode["sk"] = "sk";
    /** Slovenian */
    LanguageCode["sl"] = "sl";
    /** Samoan */
    LanguageCode["sm"] = "sm";
    /** Shona */
    LanguageCode["sn"] = "sn";
    /** Somali */
    LanguageCode["so"] = "so";
    /** Albanian */
    LanguageCode["sq"] = "sq";
    /** Serbian */
    LanguageCode["sr"] = "sr";
    /** Southern Sotho */
    LanguageCode["st"] = "st";
    /** Sundanese */
    LanguageCode["su"] = "su";
    /** Swedish */
    LanguageCode["sv"] = "sv";
    /** Swahili */
    LanguageCode["sw"] = "sw";
    /** Congo Swahili */
    LanguageCode["sw_CD"] = "sw_CD";
    /** Tamil */
    LanguageCode["ta"] = "ta";
    /** Telugu */
    LanguageCode["te"] = "te";
    /** Tajik */
    LanguageCode["tg"] = "tg";
    /** Thai */
    LanguageCode["th"] = "th";
    /** Tigrinya */
    LanguageCode["ti"] = "ti";
    /** Turkmen */
    LanguageCode["tk"] = "tk";
    /** Tongan */
    LanguageCode["to"] = "to";
    /** Turkish */
    LanguageCode["tr"] = "tr";
    /** Tatar */
    LanguageCode["tt"] = "tt";
    /** Uyghur */
    LanguageCode["ug"] = "ug";
    /** Ukrainian */
    LanguageCode["uk"] = "uk";
    /** Urdu */
    LanguageCode["ur"] = "ur";
    /** Uzbek */
    LanguageCode["uz"] = "uz";
    /** Vietnamese */
    LanguageCode["vi"] = "vi";
    /** Volapük */
    LanguageCode["vo"] = "vo";
    /** Wolof */
    LanguageCode["wo"] = "wo";
    /** Xhosa */
    LanguageCode["xh"] = "xh";
    /** Yiddish */
    LanguageCode["yi"] = "yi";
    /** Yoruba */
    LanguageCode["yo"] = "yo";
    /** Chinese */
    LanguageCode["zh"] = "zh";
    /** Simplified Chinese */
    LanguageCode["zh_Hans"] = "zh_Hans";
    /** Traditional Chinese */
    LanguageCode["zh_Hant"] = "zh_Hant";
    /** Zulu */
    LanguageCode["zu"] = "zu";
})(LanguageCode || (LanguageCode = {}));
var LogicalOperator;
(function (LogicalOperator) {
    LogicalOperator["AND"] = "AND";
    LogicalOperator["OR"] = "OR";
})(LogicalOperator || (LogicalOperator = {}));
/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * ## Understanding Permission.Owner
 *
 * `Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only
 * be accessible to the "owner" of that resource.
 *
 * For example, the Shop API `activeCustomer` query resolver should only return the Customer object for the "owner" of that Customer, i.e.
 * based on the activeUserId of the current session. As a result, the resolver code looks like this:
 *
 * @example
 * ```TypeScript
 * \@Query()
 * \@Allow(Permission.Owner)
 * async activeCustomer(\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {
 *   const userId = ctx.activeUserId;
 *   if (userId) {
 *     return this.customerService.findOneByUserId(ctx, userId);
 *   }
 * }
 * ```
 *
 * Here we can see that the "ownership" must be enforced by custom logic inside the resolver. Since "ownership" cannot be defined generally
 * nor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner
 * of the resource has access. If not, then it is the equivalent of using `Permission.Public`.
 *
 *
 * @docsCategory common
 */
var Permission;
(function (Permission) {
    /** Authenticated means simply that the user is logged in */
    Permission["Authenticated"] = "Authenticated";
    /** Grants permission to create Administrator */
    Permission["CreateAdministrator"] = "CreateAdministrator";
    /** Grants permission to create Asset */
    Permission["CreateAsset"] = "CreateAsset";
    /** Grants permission to create Products, Facets, Assets, Collections */
    Permission["CreateCatalog"] = "CreateCatalog";
    /** Grants permission to create Channel */
    Permission["CreateChannel"] = "CreateChannel";
    /** Grants permission to create Collection */
    Permission["CreateCollection"] = "CreateCollection";
    /** Grants permission to create Country */
    Permission["CreateCountry"] = "CreateCountry";
    /** Grants permission to create Customer */
    Permission["CreateCustomer"] = "CreateCustomer";
    /** Grants permission to create CustomerGroup */
    Permission["CreateCustomerGroup"] = "CreateCustomerGroup";
    /** Grants permission to create Facet */
    Permission["CreateFacet"] = "CreateFacet";
    /** Grants permission to create Order */
    Permission["CreateOrder"] = "CreateOrder";
    /** Grants permission to create PaymentMethod */
    Permission["CreatePaymentMethod"] = "CreatePaymentMethod";
    /** Grants permission to create Product */
    Permission["CreateProduct"] = "CreateProduct";
    /** Grants permission to create Promotion */
    Permission["CreatePromotion"] = "CreatePromotion";
    /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    Permission["CreateSettings"] = "CreateSettings";
    /** Grants permission to create ShippingMethod */
    Permission["CreateShippingMethod"] = "CreateShippingMethod";
    /** Grants permission to create System */
    Permission["CreateSystem"] = "CreateSystem";
    /** Grants permission to create Tag */
    Permission["CreateTag"] = "CreateTag";
    /** Grants permission to create TaxCategory */
    Permission["CreateTaxCategory"] = "CreateTaxCategory";
    /** Grants permission to create TaxRate */
    Permission["CreateTaxRate"] = "CreateTaxRate";
    /** Grants permission to create Zone */
    Permission["CreateZone"] = "CreateZone";
    /** Grants permission to delete Administrator */
    Permission["DeleteAdministrator"] = "DeleteAdministrator";
    /** Grants permission to delete Asset */
    Permission["DeleteAsset"] = "DeleteAsset";
    /** Grants permission to delete Products, Facets, Assets, Collections */
    Permission["DeleteCatalog"] = "DeleteCatalog";
    /** Grants permission to delete Channel */
    Permission["DeleteChannel"] = "DeleteChannel";
    /** Grants permission to delete Collection */
    Permission["DeleteCollection"] = "DeleteCollection";
    /** Grants permission to delete Country */
    Permission["DeleteCountry"] = "DeleteCountry";
    /** Grants permission to delete Customer */
    Permission["DeleteCustomer"] = "DeleteCustomer";
    /** Grants permission to delete CustomerGroup */
    Permission["DeleteCustomerGroup"] = "DeleteCustomerGroup";
    /** Grants permission to delete Facet */
    Permission["DeleteFacet"] = "DeleteFacet";
    /** Grants permission to delete Order */
    Permission["DeleteOrder"] = "DeleteOrder";
    /** Grants permission to delete PaymentMethod */
    Permission["DeletePaymentMethod"] = "DeletePaymentMethod";
    /** Grants permission to delete Product */
    Permission["DeleteProduct"] = "DeleteProduct";
    /** Grants permission to delete Promotion */
    Permission["DeletePromotion"] = "DeletePromotion";
    /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    Permission["DeleteSettings"] = "DeleteSettings";
    /** Grants permission to delete ShippingMethod */
    Permission["DeleteShippingMethod"] = "DeleteShippingMethod";
    /** Grants permission to delete System */
    Permission["DeleteSystem"] = "DeleteSystem";
    /** Grants permission to delete Tag */
    Permission["DeleteTag"] = "DeleteTag";
    /** Grants permission to delete TaxCategory */
    Permission["DeleteTaxCategory"] = "DeleteTaxCategory";
    /** Grants permission to delete TaxRate */
    Permission["DeleteTaxRate"] = "DeleteTaxRate";
    /** Grants permission to delete Zone */
    Permission["DeleteZone"] = "DeleteZone";
    /** Owner means the user owns this entity, e.g. a Customer's own Order */
    Permission["Owner"] = "Owner";
    Permission["Placeholder"] = "Placeholder";
    /** Public means any unauthenticated user may perform the operation */
    Permission["Public"] = "Public";
    /** Grants permission to read Administrator */
    Permission["ReadAdministrator"] = "ReadAdministrator";
    /** Grants permission to read Asset */
    Permission["ReadAsset"] = "ReadAsset";
    /** Grants permission to read Products, Facets, Assets, Collections */
    Permission["ReadCatalog"] = "ReadCatalog";
    /** Grants permission to read Channel */
    Permission["ReadChannel"] = "ReadChannel";
    /** Grants permission to read Collection */
    Permission["ReadCollection"] = "ReadCollection";
    /** Grants permission to read Country */
    Permission["ReadCountry"] = "ReadCountry";
    /** Grants permission to read Customer */
    Permission["ReadCustomer"] = "ReadCustomer";
    /** Grants permission to read CustomerGroup */
    Permission["ReadCustomerGroup"] = "ReadCustomerGroup";
    /** Grants permission to read Facet */
    Permission["ReadFacet"] = "ReadFacet";
    /** Grants permission to read Order */
    Permission["ReadOrder"] = "ReadOrder";
    /** Grants permission to read PaymentMethod */
    Permission["ReadPaymentMethod"] = "ReadPaymentMethod";
    /** Grants permission to read Product */
    Permission["ReadProduct"] = "ReadProduct";
    /** Grants permission to read Promotion */
    Permission["ReadPromotion"] = "ReadPromotion";
    /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    Permission["ReadSettings"] = "ReadSettings";
    /** Grants permission to read ShippingMethod */
    Permission["ReadShippingMethod"] = "ReadShippingMethod";
    /** Grants permission to read System */
    Permission["ReadSystem"] = "ReadSystem";
    /** Grants permission to read Tag */
    Permission["ReadTag"] = "ReadTag";
    /** Grants permission to read TaxCategory */
    Permission["ReadTaxCategory"] = "ReadTaxCategory";
    /** Grants permission to read TaxRate */
    Permission["ReadTaxRate"] = "ReadTaxRate";
    /** Grants permission to read Zone */
    Permission["ReadZone"] = "ReadZone";
    /** SuperAdmin has unrestricted access to all operations */
    Permission["SuperAdmin"] = "SuperAdmin";
    /** Grants permission to update Administrator */
    Permission["UpdateAdministrator"] = "UpdateAdministrator";
    /** Grants permission to update Asset */
    Permission["UpdateAsset"] = "UpdateAsset";
    /** Grants permission to update Products, Facets, Assets, Collections */
    Permission["UpdateCatalog"] = "UpdateCatalog";
    /** Grants permission to update Channel */
    Permission["UpdateChannel"] = "UpdateChannel";
    /** Grants permission to update Collection */
    Permission["UpdateCollection"] = "UpdateCollection";
    /** Grants permission to update Country */
    Permission["UpdateCountry"] = "UpdateCountry";
    /** Grants permission to update Customer */
    Permission["UpdateCustomer"] = "UpdateCustomer";
    /** Grants permission to update CustomerGroup */
    Permission["UpdateCustomerGroup"] = "UpdateCustomerGroup";
    /** Grants permission to update Facet */
    Permission["UpdateFacet"] = "UpdateFacet";
    /** Grants permission to update GlobalSettings */
    Permission["UpdateGlobalSettings"] = "UpdateGlobalSettings";
    /** Grants permission to update Order */
    Permission["UpdateOrder"] = "UpdateOrder";
    /** Grants permission to update PaymentMethod */
    Permission["UpdatePaymentMethod"] = "UpdatePaymentMethod";
    /** Grants permission to update Product */
    Permission["UpdateProduct"] = "UpdateProduct";
    /** Grants permission to update Promotion */
    Permission["UpdatePromotion"] = "UpdatePromotion";
    /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
    Permission["UpdateSettings"] = "UpdateSettings";
    /** Grants permission to update ShippingMethod */
    Permission["UpdateShippingMethod"] = "UpdateShippingMethod";
    /** Grants permission to update System */
    Permission["UpdateSystem"] = "UpdateSystem";
    /** Grants permission to update Tag */
    Permission["UpdateTag"] = "UpdateTag";
    /** Grants permission to update TaxCategory */
    Permission["UpdateTaxCategory"] = "UpdateTaxCategory";
    /** Grants permission to update TaxRate */
    Permission["UpdateTaxRate"] = "UpdateTaxRate";
    /** Grants permission to update Zone */
    Permission["UpdateZone"] = "UpdateZone";
})(Permission || (Permission = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "ASC";
    SortOrder["DESC"] = "DESC";
})(SortOrder || (SortOrder = {}));
var StockMovementType;
(function (StockMovementType) {
    StockMovementType["ADJUSTMENT"] = "ADJUSTMENT";
    StockMovementType["ALLOCATION"] = "ALLOCATION";
    StockMovementType["RELEASE"] = "RELEASE";
    StockMovementType["SALE"] = "SALE";
    StockMovementType["CANCELLATION"] = "CANCELLATION";
    StockMovementType["RETURN"] = "RETURN";
})(StockMovementType || (StockMovementType = {}));

const ADDRESS_FRAGMENT = gql `
    fragment Address on Address {
        id
        createdAt
        updatedAt
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
            id
            code
            name
        }
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
    }
`;
const CUSTOMER_FRAGMENT = gql `
    fragment Customer on Customer {
        id
        createdAt
        updatedAt
        title
        firstName
        lastName
        phoneNumber
        emailAddress
        user {
            id
            identifier
            verified
            lastLogin
        }
        addresses {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
const CUSTOMER_GROUP_FRAGMENT = gql `
    fragment CustomerGroup on CustomerGroup {
        id
        createdAt
        updatedAt
        name
    }
`;
const GET_CUSTOMER_LIST = gql `
    query GetCustomerList($options: CustomerListOptions) {
        customers(options: $options) {
            items {
                id
                createdAt
                updatedAt
                title
                firstName
                lastName
                emailAddress
                user {
                    id
                    verified
                }
            }
            totalItems
        }
    }
`;
const GET_CUSTOMER = gql `
    query GetCustomer($id: ID!, $orderListOptions: OrderListOptions) {
        customer(id: $id) {
            ...Customer
            groups {
                id
                name
            }
            orders(options: $orderListOptions) {
                items {
                    id
                    code
                    state
                    totalWithTax
                    currencyCode
                    updatedAt
                }
                totalItems
            }
        }
    }
    ${CUSTOMER_FRAGMENT}
`;
const CREATE_CUSTOMER = gql `
    mutation CreateCustomer($input: CreateCustomerInput!, $password: String) {
        createCustomer(input: $input, password: $password) {
            ...Customer
            ...ErrorResult
        }
    }
    ${CUSTOMER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const UPDATE_CUSTOMER = gql `
    mutation UpdateCustomer($input: UpdateCustomerInput!) {
        updateCustomer(input: $input) {
            ...Customer
            ...ErrorResult
        }
    }
    ${CUSTOMER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const DELETE_CUSTOMER = gql `
    mutation DeleteCustomer($id: ID!) {
        deleteCustomer(id: $id) {
            result
            message
        }
    }
`;
const CREATE_CUSTOMER_ADDRESS = gql `
    mutation CreateCustomerAddress($customerId: ID!, $input: CreateAddressInput!) {
        createCustomerAddress(customerId: $customerId, input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
const UPDATE_CUSTOMER_ADDRESS = gql `
    mutation UpdateCustomerAddress($input: UpdateAddressInput!) {
        updateCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${ADDRESS_FRAGMENT}
`;
const DELETE_CUSTOMER_ADDRESS = gql `
    mutation DeleteCustomerAddress($id: ID!) {
        deleteCustomerAddress(id: $id) {
            success
        }
    }
`;
const CREATE_CUSTOMER_GROUP = gql `
    mutation CreateCustomerGroup($input: CreateCustomerGroupInput!) {
        createCustomerGroup(input: $input) {
            ...CustomerGroup
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
const UPDATE_CUSTOMER_GROUP = gql `
    mutation UpdateCustomerGroup($input: UpdateCustomerGroupInput!) {
        updateCustomerGroup(input: $input) {
            ...CustomerGroup
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
const DELETE_CUSTOMER_GROUP = gql `
    mutation DeleteCustomerGroup($id: ID!) {
        deleteCustomerGroup(id: $id) {
            result
            message
        }
    }
`;
const GET_CUSTOMER_GROUPS = gql `
    query GetCustomerGroups($options: CustomerGroupListOptions) {
        customerGroups(options: $options) {
            items {
                ...CustomerGroup
            }
            totalItems
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
const GET_CUSTOMER_GROUP_WITH_CUSTOMERS = gql `
    query GetCustomerGroupWithCustomers($id: ID!, $options: CustomerListOptions) {
        customerGroup(id: $id) {
            ...CustomerGroup
            customers(options: $options) {
                items {
                    id
                    createdAt
                    updatedAt
                    emailAddress
                    firstName
                    lastName
                }
                totalItems
            }
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
const ADD_CUSTOMERS_TO_GROUP = gql `
    mutation AddCustomersToGroup($groupId: ID!, $customerIds: [ID!]!) {
        addCustomersToGroup(customerGroupId: $groupId, customerIds: $customerIds) {
            ...CustomerGroup
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
const REMOVE_CUSTOMERS_FROM_GROUP = gql `
    mutation RemoveCustomersFromGroup($groupId: ID!, $customerIds: [ID!]!) {
        removeCustomersFromGroup(customerGroupId: $groupId, customerIds: $customerIds) {
            ...CustomerGroup
        }
    }
    ${CUSTOMER_GROUP_FRAGMENT}
`;
const GET_CUSTOMER_HISTORY = gql `
    query GetCustomerHistory($id: ID!, $options: HistoryEntryListOptions) {
        customer(id: $id) {
            id
            history(options: $options) {
                totalItems
                items {
                    id
                    type
                    createdAt
                    isPublic
                    administrator {
                        id
                        firstName
                        lastName
                    }
                    data
                }
            }
        }
    }
`;
const ADD_NOTE_TO_CUSTOMER = gql `
    mutation AddNoteToCustomer($input: AddNoteToCustomerInput!) {
        addNoteToCustomer(input: $input) {
            id
        }
    }
`;
const UPDATE_CUSTOMER_NOTE = gql `
    mutation UpdateCustomerNote($input: UpdateCustomerNoteInput!) {
        updateCustomerNote(input: $input) {
            id
            data
            isPublic
        }
    }
`;
const DELETE_CUSTOMER_NOTE = gql `
    mutation DeleteCustomerNote($id: ID!) {
        deleteCustomerNote(id: $id) {
            result
            message
        }
    }
`;

class CustomerDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    getCustomerList(take = 10, skip = 0, filterTerm) {
        const filter = filterTerm
            ? {
                filter: {
                    emailAddress: {
                        contains: filterTerm,
                    },
                    lastName: {
                        contains: filterTerm,
                    },
                },
            }
            : {};
        return this.baseDataService.query(GET_CUSTOMER_LIST, {
            options: Object.assign(Object.assign({ take,
                skip }, filter), { filterOperator: LogicalOperator.OR }),
        });
    }
    getCustomer(id, orderListOptions) {
        return this.baseDataService.query(GET_CUSTOMER, {
            id,
            orderListOptions,
        });
    }
    createCustomer(input, password) {
        return this.baseDataService.mutate(CREATE_CUSTOMER, {
            input,
            password,
        });
    }
    updateCustomer(input) {
        return this.baseDataService.mutate(UPDATE_CUSTOMER, {
            input,
        });
    }
    deleteCustomer(id) {
        return this.baseDataService.mutate(DELETE_CUSTOMER, { id });
    }
    createCustomerAddress(customerId, input) {
        return this.baseDataService.mutate(CREATE_CUSTOMER_ADDRESS, {
            customerId,
            input,
        });
    }
    updateCustomerAddress(input) {
        return this.baseDataService.mutate(UPDATE_CUSTOMER_ADDRESS, {
            input,
        });
    }
    deleteCustomerAddress(id) {
        return this.baseDataService.mutate(DELETE_CUSTOMER_ADDRESS, { id });
    }
    createCustomerGroup(input) {
        return this.baseDataService.mutate(CREATE_CUSTOMER_GROUP, {
            input,
        });
    }
    updateCustomerGroup(input) {
        return this.baseDataService.mutate(UPDATE_CUSTOMER_GROUP, {
            input,
        });
    }
    deleteCustomerGroup(id) {
        return this.baseDataService.mutate(DELETE_CUSTOMER_GROUP, { id });
    }
    getCustomerGroupList(options) {
        return this.baseDataService.query(GET_CUSTOMER_GROUPS, {
            options,
        });
    }
    getCustomerGroupWithCustomers(id, options) {
        return this.baseDataService.query(GET_CUSTOMER_GROUP_WITH_CUSTOMERS, {
            id,
            options,
        });
    }
    addCustomersToGroup(groupId, customerIds) {
        return this.baseDataService.mutate(ADD_CUSTOMERS_TO_GROUP, {
            groupId,
            customerIds,
        });
    }
    removeCustomersFromGroup(groupId, customerIds) {
        return this.baseDataService.mutate(REMOVE_CUSTOMERS_FROM_GROUP, {
            groupId,
            customerIds,
        });
    }
    getCustomerHistory(id, options) {
        return this.baseDataService.query(GET_CUSTOMER_HISTORY, {
            id,
            options,
        });
    }
    addNoteToCustomer(customerId, note) {
        return this.baseDataService.mutate(ADD_NOTE_TO_CUSTOMER, {
            input: {
                note,
                isPublic: false,
                id: customerId,
            },
        });
    }
    updateCustomerNote(input) {
        return this.baseDataService.mutate(UPDATE_CUSTOMER_NOTE, {
            input,
        });
    }
    deleteCustomerNote(id) {
        return this.baseDataService.mutate(DELETE_CUSTOMER_NOTE, {
            id,
        });
    }
}

const FACET_VALUE_FRAGMENT = gql `
    fragment FacetValue on FacetValue {
        id
        createdAt
        updatedAt
        languageCode
        code
        name
        translations {
            id
            languageCode
            name
        }
        facet {
            id
            createdAt
            updatedAt
            name
        }
    }
`;
const FACET_WITH_VALUES_FRAGMENT = gql `
    fragment FacetWithValues on Facet {
        id
        createdAt
        updatedAt
        languageCode
        isPrivate
        code
        name
        translations {
            id
            languageCode
            name
        }
        values {
            ...FacetValue
        }
    }
    ${FACET_VALUE_FRAGMENT}
`;
const CREATE_FACET = gql `
    mutation CreateFacet($input: CreateFacetInput!) {
        createFacet(input: $input) {
            ...FacetWithValues
        }
    }
    ${FACET_WITH_VALUES_FRAGMENT}
`;
const UPDATE_FACET = gql `
    mutation UpdateFacet($input: UpdateFacetInput!) {
        updateFacet(input: $input) {
            ...FacetWithValues
        }
    }
    ${FACET_WITH_VALUES_FRAGMENT}
`;
const DELETE_FACET = gql `
    mutation DeleteFacet($id: ID!, $force: Boolean) {
        deleteFacet(id: $id, force: $force) {
            result
            message
        }
    }
`;
const DELETE_FACETS = gql `
    mutation DeleteFacets($ids: [ID!]!, $force: Boolean) {
        deleteFacets(ids: $ids, force: $force) {
            result
            message
        }
    }
`;
const CREATE_FACET_VALUES = gql `
    mutation CreateFacetValues($input: [CreateFacetValueInput!]!) {
        createFacetValues(input: $input) {
            ...FacetValue
        }
    }
    ${FACET_VALUE_FRAGMENT}
`;
const UPDATE_FACET_VALUES = gql `
    mutation UpdateFacetValues($input: [UpdateFacetValueInput!]!) {
        updateFacetValues(input: $input) {
            ...FacetValue
        }
    }
    ${FACET_VALUE_FRAGMENT}
`;
const DELETE_FACET_VALUES = gql `
    mutation DeleteFacetValues($ids: [ID!]!, $force: Boolean) {
        deleteFacetValues(ids: $ids, force: $force) {
            result
            message
        }
    }
`;
const GET_FACET_LIST = gql `
    query GetFacetList($options: FacetListOptions) {
        facets(options: $options) {
            items {
                ...FacetWithValues
            }
            totalItems
        }
    }
    ${FACET_WITH_VALUES_FRAGMENT}
`;
const GET_FACET_WITH_VALUES = gql `
    query GetFacetWithValues($id: ID!) {
        facet(id: $id) {
            ...FacetWithValues
        }
    }
    ${FACET_WITH_VALUES_FRAGMENT}
`;
const ASSIGN_FACETS_TO_CHANNEL = gql `
    mutation AssignFacetsToChannel($input: AssignFacetsToChannelInput!) {
        assignFacetsToChannel(input: $input) {
            id
        }
    }
`;
const REMOVE_FACETS_FROM_CHANNEL = gql `
    mutation RemoveFacetsFromChannel($input: RemoveFacetsFromChannelInput!) {
        removeFacetsFromChannel(input: $input) {
            ... on Facet {
                id
            }
            ... on FacetInUseError {
                errorCode
                message
                variantCount
                productCount
            }
        }
    }
`;

class FacetDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    getFacets(take = 10, skip = 0) {
        return this.baseDataService.query(GET_FACET_LIST, {
            options: {
                take,
                skip,
            },
        });
    }
    getAllFacets() {
        return this.baseDataService.query(GET_FACET_LIST, {});
    }
    getFacet(id) {
        return this.baseDataService.query(GET_FACET_WITH_VALUES, {
            id,
        });
    }
    createFacet(facet) {
        const input = {
            input: pick(facet, ['code', 'isPrivate', 'translations', 'values', 'customFields']),
        };
        return this.baseDataService.mutate(CREATE_FACET, input);
    }
    updateFacet(facet) {
        const input = {
            input: pick(facet, ['id', 'code', 'isPrivate', 'translations', 'customFields']),
        };
        return this.baseDataService.mutate(UPDATE_FACET, input);
    }
    deleteFacet(id, force) {
        return this.baseDataService.mutate(DELETE_FACET, {
            id,
            force,
        });
    }
    deleteFacets(ids, force) {
        return this.baseDataService.mutate(DELETE_FACETS, {
            ids,
            force,
        });
    }
    createFacetValues(facetValues) {
        const input = {
            input: facetValues.map(pick(['facetId', 'code', 'translations', 'customFields'])),
        };
        return this.baseDataService.mutate(CREATE_FACET_VALUES, input);
    }
    updateFacetValues(facetValues) {
        const input = {
            input: facetValues.map(pick(['id', 'code', 'translations', 'customFields'])),
        };
        return this.baseDataService.mutate(UPDATE_FACET_VALUES, input);
    }
    deleteFacetValues(ids, force) {
        return this.baseDataService.mutate(DELETE_FACET_VALUES, {
            ids,
            force,
        });
    }
    assignFacetsToChannel(input) {
        return this.baseDataService.mutate(ASSIGN_FACETS_TO_CHANNEL, {
            input,
        });
    }
    removeFacetsFromChannel(input) {
        return this.baseDataService.mutate(REMOVE_FACETS_FROM_CHANNEL, {
            input,
        });
    }
}

const DISCOUNT_FRAGMENT = gql `
    fragment Discount on Discount {
        adjustmentSource
        amount
        amountWithTax
        description
        type
    }
`;
const PAYMENT_FRAGMENT = gql `
    fragment Payment on Payment {
        id
        transactionId
        amount
        method
        state
        metadata
    }
`;
const REFUND_FRAGMENT = gql `
    fragment Refund on Refund {
        id
        state
        items
        shipping
        adjustment
        transactionId
        paymentId
    }
`;
const ORDER_ADDRESS_FRAGMENT = gql `
    fragment OrderAddress on OrderAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        countryCode
        phoneNumber
    }
`;
const ORDER_FRAGMENT = gql `
    fragment Order on Order {
        id
        createdAt
        updatedAt
        orderPlacedAt
        code
        state
        nextStates
        total
        payments {
            id
            method
            state
        }
        totalWithTax
        currencyCode
        customer {
            id
            firstName
            lastName
            phoneNumber
        }
        shippingLines {
            shippingMethod {
                name
            }
        }
        customFields {
            scheduledTime
        }
    }
`;
const FULFILLMENT_FRAGMENT = gql `
    fragment Fulfillment on Fulfillment {
        id
        state
        nextStates
        createdAt
        updatedAt
        method
        summary {
            orderLine {
                id
            }
            quantity
        }
        trackingCode
    }
`;
const ORDER_LINE_FRAGMENT = gql `
    fragment OrderLine on OrderLine {
        id
        featuredAsset {
            preview
        }
        productVariant {
            id
            name
            sku
            trackInventory
            stockOnHand
        }
        discounts {
            ...Discount
        }
        fulfillments {
            ...Fulfillment
        }
        unitPrice
        unitPriceWithTax
        proratedUnitPrice
        proratedUnitPriceWithTax
        quantity
        items {
            id
            refundId
            cancelled
        }
        linePrice
        lineTax
        linePriceWithTax
        discountedLinePrice
        discountedLinePriceWithTax
    }
`;
const ORDER_DETAIL_FRAGMENT = gql `
    fragment OrderDetail on Order {
        id
        createdAt
        updatedAt
        code
        state
        nextStates
        active
        couponCodes
        customer {
            id
            firstName
            lastName
            phoneNumber
        }
        lines {
            ...OrderLine
        }
        surcharges {
            id
            sku
            description
            price
            priceWithTax
            taxRate
        }
        discounts {
            ...Discount
        }
        promotions {
            id
            couponCode
        }
        subTotal
        subTotalWithTax
        total
        totalWithTax
        currencyCode
        shipping
        shippingWithTax
        shippingLines {
            shippingMethod {
                id
                code
                name
                fulfillmentHandlerCode
                description
            }
        }
        taxSummary {
            description
            taxBase
            taxRate
            taxTotal
        }
        shippingAddress {
            ...OrderAddress
        }
        billingAddress {
            ...OrderAddress
        }
        payments {
            id
            createdAt
            transactionId
            amount
            method
            state
            nextStates
            errorMessage
            metadata
            refunds {
                id
                createdAt
                state
                items
                adjustment
                total
                paymentId
                reason
                transactionId
                method
                metadata
                orderItems {
                    id
                }
            }
        }
        fulfillments {
            ...Fulfillment
        }
        modifications {
            id
            createdAt
            isSettled
            priceChange
            note
            payment {
                id
                amount
            }
            orderItems {
                id
            }
            refund {
                id
                paymentId
                total
            }
            surcharges {
                id
            }
        }
    }
    ${DISCOUNT_FRAGMENT}
    ${ORDER_ADDRESS_FRAGMENT}
    ${FULFILLMENT_FRAGMENT}
    ${ORDER_LINE_FRAGMENT}
`;
const GET_ORDERS_LIST = gql `
    query GetOrderList($options: OrderListOptions) {
        orders(options: $options) {
            items {
                ...Order
            }
            totalItems
        }
    }
    ${ORDER_FRAGMENT}
`;
const GET_ORDER = gql `
    query GetOrder($id: ID!) {
        order(id: $id) {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
const SETTLE_PAYMENT = gql `
    mutation SettlePayment($id: ID!) {
        settlePayment(id: $id) {
            ...Payment
            ...ErrorResult
            ... on SettlePaymentError {
                paymentErrorMessage
            }
            ... on PaymentStateTransitionError {
                transitionError
            }
            ... on OrderStateTransitionError {
                transitionError
            }
        }
    }
    ${ERROR_RESULT_FRAGMENT}
    ${PAYMENT_FRAGMENT}
`;
const CANCEL_PAYMENT = gql `
    mutation CancelPayment($id: ID!) {
        cancelPayment(id: $id) {
            ...Payment
            ...ErrorResult
            ... on CancelPaymentError {
                paymentErrorMessage
            }
            ... on PaymentStateTransitionError {
                transitionError
            }
        }
    }
    ${ERROR_RESULT_FRAGMENT}
    ${PAYMENT_FRAGMENT}
`;
const TRANSITION_PAYMENT_TO_STATE = gql `
    mutation TransitionPaymentToState($id: ID!, $state: String!) {
        transitionPaymentToState(id: $id, state: $state) {
            ...Payment
            ...ErrorResult
            ... on PaymentStateTransitionError {
                transitionError
            }
        }
    }
    ${PAYMENT_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const CREATE_FULFILLMENT = gql `
    mutation CreateFulfillment($input: FulfillOrderInput!) {
        addFulfillmentToOrder(input: $input) {
            ...Fulfillment
            ... on CreateFulfillmentError {
                errorCode
                message
                fulfillmentHandlerError
            }
            ... on FulfillmentStateTransitionError {
                errorCode
                message
                transitionError
            }
            ...ErrorResult
        }
    }
    ${FULFILLMENT_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const CANCEL_ORDER = gql `
    mutation CancelOrder($input: CancelOrderInput!) {
        cancelOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const REFUND_ORDER = gql `
    mutation RefundOrder($input: RefundOrderInput!) {
        refundOrder(input: $input) {
            ...Refund
            ...ErrorResult
        }
    }
    ${REFUND_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const SETTLE_REFUND = gql `
    mutation SettleRefund($input: SettleRefundInput!) {
        settleRefund(input: $input) {
            ...Refund
            ...ErrorResult
        }
    }
    ${REFUND_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const GET_ORDER_HISTORY = gql `
    query GetOrderHistory($id: ID!, $options: HistoryEntryListOptions) {
        order(id: $id) {
            id
            history(options: $options) {
                totalItems
                items {
                    id
                    type
                    createdAt
                    isPublic
                    administrator {
                        id
                        firstName
                        lastName
                    }
                    data
                }
            }
        }
    }
`;
const ADD_NOTE_TO_ORDER = gql `
    mutation AddNoteToOrder($input: AddNoteToOrderInput!) {
        addNoteToOrder(input: $input) {
            id
        }
    }
`;
const UPDATE_ORDER_NOTE = gql `
    mutation UpdateOrderNote($input: UpdateOrderNoteInput!) {
        updateOrderNote(input: $input) {
            id
            data
            isPublic
        }
    }
`;
const DELETE_ORDER_NOTE = gql `
    mutation DeleteOrderNote($id: ID!) {
        deleteOrderNote(id: $id) {
            result
            message
        }
    }
`;
const TRANSITION_ORDER_TO_STATE = gql `
    mutation TransitionOrderToState($id: ID!, $state: String!) {
        transitionOrderToState(id: $id, state: $state) {
            ...Order
            ...ErrorResult
            ... on OrderStateTransitionError {
                transitionError
            }
        }
    }
    ${ORDER_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const UPDATE_ORDER_CUSTOM_FIELDS = gql `
    mutation UpdateOrderCustomFields($input: UpdateOrderInput!) {
        setOrderCustomFields(input: $input) {
            ...Order
        }
    }
    ${ORDER_FRAGMENT}
`;
const TRANSITION_FULFILLMENT_TO_STATE = gql `
    mutation TransitionFulfillmentToState($id: ID!, $state: String!) {
        transitionFulfillmentToState(id: $id, state: $state) {
            ...Fulfillment
            ...ErrorResult
            ... on FulfillmentStateTransitionError {
                transitionError
            }
        }
    }
    ${FULFILLMENT_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const GET_ORDER_SUMMARY = gql `
    query GetOrderSummary($start: DateTime!, $end: DateTime!) {
        orders(options: { filter: { orderPlacedAt: { between: { start: $start, end: $end } } } }) {
            totalItems
            items {
                id
                total
                currencyCode
            }
        }
    }
`;
const MODIFY_ORDER = gql `
    mutation ModifyOrder($input: ModifyOrderInput!) {
        modifyOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const ADD_MANUAL_PAYMENT_TO_ORDER = gql `
    mutation AddManualPayment($input: ManualPaymentInput!) {
        addManualPaymentToOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const CREATE_DRAFT_ORDER = gql `
    mutation CreateDraftOrder {
        createDraftOrder {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
const DELETE_DRAFT_ORDER = gql `
    mutation DeleteDraftOrder($orderId: ID!) {
        deleteDraftOrder(orderId: $orderId) {
            result
            message
        }
    }
`;
const ADD_ITEM_TO_DRAFT_ORDER = gql `
    mutation AddItemToDraftOrder($orderId: ID!, $input: AddItemToDraftOrderInput!) {
        addItemToDraftOrder(orderId: $orderId, input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const ADJUST_DRAFT_ORDER_LINE = gql `
    mutation AdjustDraftOrderLine($orderId: ID!, $input: AdjustDraftOrderLineInput!) {
        adjustDraftOrderLine(orderId: $orderId, input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const REMOVE_DRAFT_ORDER_LINE = gql `
    mutation RemoveDraftOrderLine($orderId: ID!, $orderLineId: ID!) {
        removeDraftOrderLine(orderId: $orderId, orderLineId: $orderLineId) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const SET_CUSTOMER_FOR_DRAFT_ORDER = gql `
    mutation SetCustomerForDraftOrder($orderId: ID!, $customerId: ID, $input: CreateCustomerInput) {
        setCustomerForDraftOrder(orderId: $orderId, customerId: $customerId, input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const SET_SHIPPING_ADDRESS_FOR_DRAFT_ORDER = gql `
    mutation SetDraftOrderShippingAddress($orderId: ID!, $input: CreateAddressInput!) {
        setDraftOrderShippingAddress(orderId: $orderId, input: $input) {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
const SET_BILLING_ADDRESS_FOR_DRAFT_ORDER = gql `
    mutation SetDraftOrderBillingAddress($orderId: ID!, $input: CreateAddressInput!) {
        setDraftOrderBillingAddress(orderId: $orderId, input: $input) {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
const APPLY_COUPON_CODE_TO_DRAFT_ORDER = gql `
    mutation ApplyCouponCodeToDraftOrder($orderId: ID!, $couponCode: String!) {
        applyCouponCodeToDraftOrder(orderId: $orderId, couponCode: $couponCode) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const REMOVE_COUPON_CODE_FROM_DRAFT_ORDER = gql `
    mutation RemoveCouponCodeFromDraftOrder($orderId: ID!, $couponCode: String!) {
        removeCouponCodeFromDraftOrder(orderId: $orderId, couponCode: $couponCode) {
            ...OrderDetail
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
`;
const DRAFT_ORDER_ELIGIBLE_SHIPPING_METHODS = gql `
    query DraftOrderEligibleShippingMethods($orderId: ID!) {
        eligibleShippingMethodsForDraftOrder(orderId: $orderId) {
            id
            name
            code
            description
            price
            priceWithTax
            metadata
        }
    }
`;
const SET_DRAFT_ORDER_SHIPPING_METHOD = gql `
    mutation SetDraftOrderShippingMethod($orderId: ID!, $shippingMethodId: ID!) {
        setDraftOrderShippingMethod(orderId: $orderId, shippingMethodId: $shippingMethodId) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ORDER_DETAIL_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;

class OrderDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    getOrders(options = { take: 10 }) {
        return this.baseDataService.query(GET_ORDERS_LIST, {
            options,
        });
    }
    getOrder(id) {
        return this.baseDataService.query(GET_ORDER, { id });
    }
    getOrderHistory(id, options) {
        return this.baseDataService.query(GET_ORDER_HISTORY, {
            id,
            options,
        });
    }
    settlePayment(id) {
        return this.baseDataService.mutate(SETTLE_PAYMENT, {
            id,
        });
    }
    cancelPayment(id) {
        return this.baseDataService.mutate(CANCEL_PAYMENT, {
            id,
        });
    }
    transitionPaymentToState(id, state) {
        return this.baseDataService.mutate(TRANSITION_PAYMENT_TO_STATE, {
            id,
            state,
        });
    }
    createFulfillment(input) {
        return this.baseDataService.mutate(CREATE_FULFILLMENT, {
            input,
        });
    }
    transitionFulfillmentToState(id, state) {
        return this.baseDataService.mutate(TRANSITION_FULFILLMENT_TO_STATE, {
            id,
            state,
        });
    }
    cancelOrder(input) {
        return this.baseDataService.mutate(CANCEL_ORDER, {
            input,
        });
    }
    refundOrder(input) {
        return this.baseDataService.mutate(REFUND_ORDER, {
            input,
        });
    }
    settleRefund(input, orderId) {
        return this.baseDataService.mutate(SETTLE_REFUND, {
            input,
        });
    }
    addNoteToOrder(input) {
        return this.baseDataService.mutate(ADD_NOTE_TO_ORDER, {
            input,
        });
    }
    updateOrderNote(input) {
        return this.baseDataService.mutate(UPDATE_ORDER_NOTE, {
            input,
        });
    }
    deleteOrderNote(id) {
        return this.baseDataService.mutate(DELETE_ORDER_NOTE, {
            id,
        });
    }
    transitionToState(id, state) {
        return this.baseDataService.mutate(TRANSITION_ORDER_TO_STATE, {
            id,
            state,
        });
    }
    updateOrderCustomFields(input) {
        return this.baseDataService.mutate(UPDATE_ORDER_CUSTOM_FIELDS, {
            input,
        });
    }
    getOrderSummary(start, end) {
        return this.baseDataService.query(GET_ORDER_SUMMARY, {
            start: start.toISOString(),
            end: end.toISOString(),
        });
    }
    modifyOrder(input) {
        return this.baseDataService.mutate(MODIFY_ORDER, {
            input,
        });
    }
    addManualPaymentToOrder(input) {
        return this.baseDataService.mutate(ADD_MANUAL_PAYMENT_TO_ORDER, { input });
    }
    createDraftOrder() {
        return this.baseDataService.mutate(CREATE_DRAFT_ORDER);
    }
    deleteDraftOrder(orderId) {
        return this.baseDataService.mutate(DELETE_DRAFT_ORDER, { orderId });
    }
    addItemToDraftOrder(orderId, input) {
        return this.baseDataService.mutate(ADD_ITEM_TO_DRAFT_ORDER, { orderId, input });
    }
    adjustDraftOrderLine(orderId, input) {
        return this.baseDataService.mutate(ADJUST_DRAFT_ORDER_LINE, { orderId, input });
    }
    removeDraftOrderLine(orderId, orderLineId) {
        return this.baseDataService.mutate(REMOVE_DRAFT_ORDER_LINE, { orderId, orderLineId });
    }
    setCustomerForDraftOrder(orderId, { customerId, input }) {
        return this.baseDataService.mutate(SET_CUSTOMER_FOR_DRAFT_ORDER, { orderId, customerId, input });
    }
    setDraftOrderShippingAddress(orderId, input) {
        return this.baseDataService.mutate(SET_SHIPPING_ADDRESS_FOR_DRAFT_ORDER, { orderId, input });
    }
    setDraftOrderBillingAddress(orderId, input) {
        return this.baseDataService.mutate(SET_BILLING_ADDRESS_FOR_DRAFT_ORDER, { orderId, input });
    }
    applyCouponCodeToDraftOrder(orderId, couponCode) {
        return this.baseDataService.mutate(APPLY_COUPON_CODE_TO_DRAFT_ORDER, { orderId, couponCode });
    }
    removeCouponCodeFromDraftOrder(orderId, couponCode) {
        return this.baseDataService.mutate(REMOVE_COUPON_CODE_FROM_DRAFT_ORDER, { orderId, couponCode });
    }
    getDraftOrderEligibleShippingMethods(orderId) {
        return this.baseDataService.query(DRAFT_ORDER_ELIGIBLE_SHIPPING_METHODS, { orderId });
    }
    setDraftOrderShippingMethod(orderId, shippingMethodId) {
        return this.baseDataService.mutate(SET_DRAFT_ORDER_SHIPPING_METHOD, { orderId, shippingMethodId });
    }
}

class ProductDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    searchProducts(term, take = 10, skip = 0) {
        return this.baseDataService.query(SEARCH_PRODUCTS, {
            input: {
                term,
                take,
                skip,
                groupByProduct: true,
            },
        });
    }
    productSelectorSearch(term, take) {
        return this.baseDataService.query(PRODUCT_SELECTOR_SEARCH, {
            take,
            term,
        });
    }
    reindex() {
        return this.baseDataService.mutate(REINDEX);
    }
    getPendingSearchIndexUpdates() {
        return this.baseDataService.query(GET_PENDING_SEARCH_INDEX_UPDATES);
    }
    runPendingSearchIndexUpdates() {
        return this.baseDataService.mutate(RUN_PENDING_SEARCH_INDEX_UPDATES);
    }
    getProducts(options) {
        return this.baseDataService.query(GET_PRODUCT_LIST, {
            options,
        });
    }
    getProduct(id, variantListOptions) {
        return this.baseDataService.query(GET_PRODUCT_WITH_VARIANTS, {
            id,
            variantListOptions,
        });
    }
    getProductSimple(id) {
        return this.baseDataService.query(GET_PRODUCT_SIMPLE, {
            id,
        });
    }
    getProductVariantsSimple(options, productId) {
        return this.baseDataService.query(GET_PRODUCT_VARIANT_LIST_SIMPLE, { options, productId });
    }
    getProductVariants(options, productId) {
        return this.baseDataService.query(GET_PRODUCT_VARIANT_LIST, { options, productId });
    }
    getProductVariant(id) {
        return this.baseDataService.query(GET_PRODUCT_VARIANT, { id });
    }
    getProductVariantsOptions(id) {
        return this.baseDataService.query(GET_PRODUCT_VARIANT_OPTIONS, {
            id,
        });
    }
    getProductOptionGroup(id) {
        return this.baseDataService.query(GET_PRODUCT_OPTION_GROUP, {
            id,
        });
    }
    createProduct(product) {
        const input = {
            input: pick(product, [
                'enabled',
                'translations',
                'customFields',
                'assetIds',
                'featuredAssetId',
                'facetValueIds',
            ]),
        };
        return this.baseDataService.mutate(CREATE_PRODUCT, input);
    }
    updateProduct(product) {
        const input = {
            input: pick(product, [
                'id',
                'enabled',
                'translations',
                'customFields',
                'assetIds',
                'featuredAssetId',
                'facetValueIds',
            ]),
        };
        return this.baseDataService.mutate(UPDATE_PRODUCT, input);
    }
    deleteProduct(id) {
        return this.baseDataService.mutate(DELETE_PRODUCT, {
            id,
        });
    }
    deleteProducts(ids) {
        return this.baseDataService.mutate(DELETE_PRODUCTS, {
            ids,
        });
    }
    createProductVariants(input) {
        return this.baseDataService.mutate(CREATE_PRODUCT_VARIANTS, {
            input,
        });
    }
    updateProductVariants(variants) {
        const input = {
            input: variants.map(pick([
                'id',
                'enabled',
                'translations',
                'sku',
                'price',
                'taxCategoryId',
                'facetValueIds',
                'featuredAssetId',
                'assetIds',
                'trackInventory',
                'outOfStockThreshold',
                'useGlobalOutOfStockThreshold',
                'stockOnHand',
                'customFields',
            ])),
        };
        return this.baseDataService.mutate(UPDATE_PRODUCT_VARIANTS, input);
    }
    deleteProductVariant(id) {
        return this.baseDataService.mutate(DELETE_PRODUCT_VARIANT, {
            id,
        });
    }
    createProductOptionGroups(productOptionGroup) {
        const input = {
            input: productOptionGroup,
        };
        return this.baseDataService.mutate(CREATE_PRODUCT_OPTION_GROUP, input);
    }
    addOptionGroupToProduct(variables) {
        return this.baseDataService.mutate(ADD_OPTION_GROUP_TO_PRODUCT, variables);
    }
    addOptionToGroup(input) {
        return this.baseDataService.mutate(ADD_OPTION_TO_GROUP, { input });
    }
    deleteProductOption(id) {
        return this.baseDataService.mutate(DELETE_PRODUCT_OPTION, { id });
    }
    removeOptionGroupFromProduct(variables) {
        return this.baseDataService.mutate(REMOVE_OPTION_GROUP_FROM_PRODUCT, variables);
    }
    updateProductOption(input) {
        return this.baseDataService.mutate(UPDATE_PRODUCT_OPTION, {
            input: pick(input, ['id', 'code', 'translations', 'customFields']),
        });
    }
    updateProductOptionGroup(input) {
        return this.baseDataService.mutate(UPDATE_PRODUCT_OPTION_GROUP, {
            input: pick(input, ['id', 'code', 'translations', 'customFields']),
        });
    }
    getProductOptionGroups(filterTerm) {
        return this.baseDataService.query(GET_PRODUCT_OPTION_GROUPS, {
            filterTerm,
        });
    }
    getAssetList(take = 10, skip = 0) {
        return this.baseDataService.query(GET_ASSET_LIST, {
            options: {
                skip,
                take,
                sort: {
                    createdAt: SortOrder.DESC,
                },
            },
        });
    }
    getAsset(id) {
        return this.baseDataService.query(GET_ASSET, {
            id,
        });
    }
    createAssets(files) {
        return this.baseDataService.mutate(CREATE_ASSETS, {
            input: files.map(file => ({ file })),
        });
    }
    updateAsset(input) {
        return this.baseDataService.mutate(UPDATE_ASSET, {
            input,
        });
    }
    deleteAssets(ids, force) {
        return this.baseDataService.mutate(DELETE_ASSETS, {
            input: {
                assetIds: ids,
                force,
            },
        });
    }
    assignProductsToChannel(input) {
        return this.baseDataService.mutate(ASSIGN_PRODUCTS_TO_CHANNEL, {
            input,
        });
    }
    removeProductsFromChannel(input) {
        return this.baseDataService.mutate(REMOVE_PRODUCTS_FROM_CHANNEL, {
            input,
        });
    }
    assignVariantsToChannel(input) {
        return this.baseDataService.mutate(ASSIGN_VARIANTS_TO_CHANNEL, {
            input,
        });
    }
    removeVariantsFromChannel(input) {
        return this.baseDataService.mutate(REMOVE_VARIANTS_FROM_CHANNEL, {
            input,
        });
    }
    getTag(id) {
        return this.baseDataService.query(GET_TAG, { id });
    }
    getTagList(options) {
        return this.baseDataService.query(GET_TAG_LIST, { options });
    }
    createTag(input) {
        return this.baseDataService.mutate(CREATE_TAG, { input });
    }
    updateTag(input) {
        return this.baseDataService.mutate(UPDATE_TAG, { input });
    }
    deleteTag(id) {
        return this.baseDataService.mutate(DELETE_TAG, { id });
    }
}

const PROMOTION_FRAGMENT = gql `
    fragment Promotion on Promotion {
        id
        createdAt
        updatedAt
        name
        enabled
        couponCode
        perCustomerUsageLimit
        startsAt
        endsAt
        conditions {
            ...ConfigurableOperation
        }
        actions {
            ...ConfigurableOperation
        }
    }
    ${CONFIGURABLE_OPERATION_FRAGMENT}
`;
const GET_PROMOTION_LIST = gql `
    query GetPromotionList($options: PromotionListOptions) {
        promotions(options: $options) {
            items {
                ...Promotion
            }
            totalItems
        }
    }
    ${PROMOTION_FRAGMENT}
`;
const GET_PROMOTION = gql `
    query GetPromotion($id: ID!) {
        promotion(id: $id) {
            ...Promotion
        }
    }
    ${PROMOTION_FRAGMENT}
`;
const GET_ADJUSTMENT_OPERATIONS = gql `
    query GetAdjustmentOperations {
        promotionConditions {
            ...ConfigurableOperationDef
        }
        promotionActions {
            ...ConfigurableOperationDef
        }
    }
    ${CONFIGURABLE_OPERATION_DEF_FRAGMENT}
`;
const CREATE_PROMOTION = gql `
    mutation CreatePromotion($input: CreatePromotionInput!) {
        createPromotion(input: $input) {
            ...Promotion
            ...ErrorResult
        }
    }
    ${PROMOTION_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
const UPDATE_PROMOTION = gql `
    mutation UpdatePromotion($input: UpdatePromotionInput!) {
        updatePromotion(input: $input) {
            ...Promotion
        }
    }
    ${PROMOTION_FRAGMENT}
`;
const DELETE_PROMOTION = gql `
    mutation DeletePromotion($id: ID!) {
        deletePromotion(id: $id) {
            result
            message
        }
    }
`;

class PromotionDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    getPromotions(take = 10, skip = 0, filter) {
        return this.baseDataService.query(GET_PROMOTION_LIST, {
            options: {
                take,
                skip,
                filter,
            },
        });
    }
    getPromotion(id) {
        return this.baseDataService.query(GET_PROMOTION, {
            id,
        });
    }
    getPromotionActionsAndConditions() {
        return this.baseDataService.query(GET_ADJUSTMENT_OPERATIONS);
    }
    createPromotion(input) {
        return this.baseDataService.mutate(CREATE_PROMOTION, {
            input,
        });
    }
    updatePromotion(input) {
        return this.baseDataService.mutate(UPDATE_PROMOTION, {
            input,
        });
    }
    deletePromotion(id) {
        return this.baseDataService.mutate(DELETE_PROMOTION, { id });
    }
}

class SettingsDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    getCountries(take = 10, skip = 0, filterTerm) {
        return this.baseDataService.query(GET_COUNTRY_LIST, {
            options: {
                take,
                skip,
                filter: {
                    name: filterTerm ? { contains: filterTerm } : null,
                },
            },
        });
    }
    getAvailableCountries() {
        return this.baseDataService.query(GET_AVAILABLE_COUNTRIES);
    }
    getCountry(id) {
        return this.baseDataService.query(GET_COUNTRY, { id });
    }
    createCountry(input) {
        return this.baseDataService.mutate(CREATE_COUNTRY, {
            input: pick(input, ['code', 'enabled', 'translations', 'customFields']),
        });
    }
    updateCountry(input) {
        return this.baseDataService.mutate(UPDATE_COUNTRY, {
            input: pick(input, ['id', 'code', 'enabled', 'translations', 'customFields']),
        });
    }
    deleteCountry(id) {
        return this.baseDataService.mutate(DELETE_COUNTRY, {
            id,
        });
    }
    getZones() {
        return this.baseDataService.query(GET_ZONES);
    }
    getZone(id) {
        return this.baseDataService.query(GET_ZONES, { id });
    }
    createZone(input) {
        return this.baseDataService.mutate(CREATE_ZONE, {
            input,
        });
    }
    updateZone(input) {
        return this.baseDataService.mutate(UPDATE_ZONE, {
            input,
        });
    }
    deleteZone(id) {
        return this.baseDataService.mutate(DELETE_ZONE, {
            id,
        });
    }
    addMembersToZone(zoneId, memberIds) {
        return this.baseDataService.mutate(ADD_MEMBERS_TO_ZONE, {
            zoneId,
            memberIds,
        });
    }
    removeMembersFromZone(zoneId, memberIds) {
        return this.baseDataService.mutate(REMOVE_MEMBERS_FROM_ZONE, {
            zoneId,
            memberIds,
        });
    }
    getTaxCategories() {
        return this.baseDataService.query(GET_TAX_CATEGORIES);
    }
    getTaxCategory(id) {
        return this.baseDataService.query(GET_TAX_CATEGORY, {
            id,
        });
    }
    createTaxCategory(input) {
        return this.baseDataService.mutate(CREATE_TAX_CATEGORY, {
            input,
        });
    }
    updateTaxCategory(input) {
        return this.baseDataService.mutate(UPDATE_TAX_CATEGORY, {
            input,
        });
    }
    deleteTaxCategory(id) {
        return this.baseDataService.mutate(DELETE_TAX_CATEGORY, {
            id,
        });
    }
    getTaxRates(take = 10, skip = 0, fetchPolicy) {
        return this.baseDataService.query(GET_TAX_RATE_LIST, {
            options: {
                take,
                skip,
            },
        }, fetchPolicy);
    }
    getTaxRatesSimple(take = 10, skip = 0, fetchPolicy) {
        return this.baseDataService.query(GET_TAX_RATE_LIST_SIMPLE, {
            options: {
                take,
                skip,
            },
        }, fetchPolicy);
    }
    getTaxRate(id) {
        return this.baseDataService.query(GET_TAX_RATE, {
            id,
        });
    }
    createTaxRate(input) {
        return this.baseDataService.mutate(CREATE_TAX_RATE, {
            input,
        });
    }
    updateTaxRate(input) {
        return this.baseDataService.mutate(UPDATE_TAX_RATE, {
            input,
        });
    }
    deleteTaxRate(id) {
        return this.baseDataService.mutate(DELETE_TAX_RATE, {
            id,
        });
    }
    getChannels() {
        return this.baseDataService.query(GET_CHANNELS);
    }
    getChannel(id) {
        return this.baseDataService.query(GET_CHANNEL, {
            id,
        });
    }
    getActiveChannel(fetchPolicy) {
        return this.baseDataService.query(GET_ACTIVE_CHANNEL, {}, fetchPolicy);
    }
    createChannel(input) {
        return this.baseDataService.mutate(CREATE_CHANNEL, {
            input,
        });
    }
    updateChannel(input) {
        return this.baseDataService.mutate(UPDATE_CHANNEL, {
            input,
        });
    }
    deleteChannel(id) {
        return this.baseDataService.mutate(DELETE_CHANNEL, {
            id,
        });
    }
    getPaymentMethods(take = 10, skip = 0) {
        return this.baseDataService.query(GET_PAYMENT_METHOD_LIST, {
            options: {
                skip,
                take,
            },
        });
    }
    getPaymentMethod(id) {
        return this.baseDataService.query(GET_PAYMENT_METHOD, {
            id,
        });
    }
    createPaymentMethod(input) {
        return this.baseDataService.mutate(CREATE_PAYMENT_METHOD, {
            input,
        });
    }
    updatePaymentMethod(input) {
        return this.baseDataService.mutate(UPDATE_PAYMENT_METHOD, {
            input,
        });
    }
    deletePaymentMethod(id, force) {
        return this.baseDataService.mutate(DELETE_PAYMENT_METHOD, {
            id,
            force,
        });
    }
    getPaymentMethodOperations() {
        return this.baseDataService.query(GET_PAYMENT_METHOD_OPERATIONS);
    }
    getGlobalSettings(fetchPolicy) {
        return this.baseDataService.query(GET_GLOBAL_SETTINGS, undefined, fetchPolicy);
    }
    updateGlobalSettings(input) {
        return this.baseDataService.mutate(UPDATE_GLOBAL_SETTINGS, {
            input,
        });
    }
    getJob(id) {
        return this.baseDataService.query(GET_JOB_INFO, { id });
    }
    pollJobs(ids) {
        return this.baseDataService.query(GET_JOBS_BY_ID, {
            ids,
        });
    }
    getAllJobs(options) {
        return this.baseDataService.query(GET_JOBS_LIST, {
            options,
        }, 'cache-first');
    }
    getJobQueues() {
        return this.baseDataService.query(GET_JOB_QUEUE_LIST);
    }
    getRunningJobs() {
        return this.baseDataService.query(GET_JOBS_LIST, {
            options: {
                filter: {
                    state: {
                        eq: JobState.RUNNING,
                    },
                },
            },
        });
    }
    cancelJob(id) {
        return this.baseDataService.mutate(CANCEL_JOB, {
            id,
        });
    }
}

const SHIPPING_METHOD_FRAGMENT = gql `
    fragment ShippingMethod on ShippingMethod {
        id
        createdAt
        updatedAt
        code
        name
        description
        fulfillmentHandlerCode
        checker {
            ...ConfigurableOperation
        }
        calculator {
            ...ConfigurableOperation
        }
        translations {
            id
            languageCode
            name
            description
        }
    }
    ${CONFIGURABLE_OPERATION_FRAGMENT}
`;
const GET_SHIPPING_METHOD_LIST = gql `
    query GetShippingMethodList($options: ShippingMethodListOptions) {
        shippingMethods(options: $options) {
            items {
                ...ShippingMethod
            }
            totalItems
        }
    }
    ${SHIPPING_METHOD_FRAGMENT}
`;
const GET_SHIPPING_METHOD = gql `
    query GetShippingMethod($id: ID!) {
        shippingMethod(id: $id) {
            ...ShippingMethod
        }
    }
    ${SHIPPING_METHOD_FRAGMENT}
`;
const GET_SHIPPING_METHOD_OPERATIONS = gql `
    query GetShippingMethodOperations {
        shippingEligibilityCheckers {
            ...ConfigurableOperationDef
        }
        shippingCalculators {
            ...ConfigurableOperationDef
        }
        fulfillmentHandlers {
            ...ConfigurableOperationDef
        }
    }
    ${CONFIGURABLE_OPERATION_DEF_FRAGMENT}
`;
const CREATE_SHIPPING_METHOD = gql `
    mutation CreateShippingMethod($input: CreateShippingMethodInput!) {
        createShippingMethod(input: $input) {
            ...ShippingMethod
        }
    }
    ${SHIPPING_METHOD_FRAGMENT}
`;
const UPDATE_SHIPPING_METHOD = gql `
    mutation UpdateShippingMethod($input: UpdateShippingMethodInput!) {
        updateShippingMethod(input: $input) {
            ...ShippingMethod
        }
    }
    ${SHIPPING_METHOD_FRAGMENT}
`;
const DELETE_SHIPPING_METHOD = gql `
    mutation DeleteShippingMethod($id: ID!) {
        deleteShippingMethod(id: $id) {
            result
            message
        }
    }
`;
const TEST_SHIPPING_METHOD = gql `
    query TestShippingMethod($input: TestShippingMethodInput!) {
        testShippingMethod(input: $input) {
            eligible
            quote {
                price
                priceWithTax
                metadata
            }
        }
    }
`;
const TEST_ELIGIBLE_SHIPPING_METHODS = gql `
    query TestEligibleShippingMethods($input: TestEligibleShippingMethodsInput!) {
        testEligibleShippingMethods(input: $input) {
            id
            name
            code
            description
            price
            priceWithTax
            metadata
        }
    }
`;

class ShippingMethodDataService {
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
    }
    getShippingMethods(take = 10, skip = 0) {
        return this.baseDataService.query(GET_SHIPPING_METHOD_LIST, {
            options: {
                take,
                skip,
            },
        });
    }
    getShippingMethod(id) {
        return this.baseDataService.query(GET_SHIPPING_METHOD, {
            id,
        });
    }
    getShippingMethodOperations() {
        return this.baseDataService.query(GET_SHIPPING_METHOD_OPERATIONS);
    }
    createShippingMethod(input) {
        const variables = {
            input: pick(input, [
                'code',
                'checker',
                'calculator',
                'fulfillmentHandler',
                'customFields',
                'translations',
            ]),
        };
        return this.baseDataService.mutate(CREATE_SHIPPING_METHOD, variables);
    }
    updateShippingMethod(input) {
        const variables = {
            input: pick(input, [
                'id',
                'code',
                'checker',
                'calculator',
                'fulfillmentHandler',
                'customFields',
                'translations',
            ]),
        };
        return this.baseDataService.mutate(UPDATE_SHIPPING_METHOD, variables);
    }
    deleteShippingMethod(id) {
        return this.baseDataService.mutate(DELETE_SHIPPING_METHOD, {
            id,
        });
    }
    testShippingMethod(input) {
        return this.baseDataService.query(TEST_SHIPPING_METHOD, {
            input,
        });
    }
    testEligibleShippingMethods(input) {
        return this.baseDataService.query(TEST_ELIGIBLE_SHIPPING_METHODS, {
            input,
        });
    }
}

/**
 * @description
 * Used to interact with the Admin API via GraphQL queries. Internally this service uses the
 * Apollo Client, which means it maintains a normalized entity cache. For this reason, it is
 * advisable to always select the `id` field of any entity, which will allow the returned data
 * to be effectively cached.
 *
 * @docsCategory providers
 * @docsPage DataService
 * @docsWeight 0
 */
class DataService {
    /** @internal */
    constructor(baseDataService) {
        this.baseDataService = baseDataService;
        this.promotion = new PromotionDataService(baseDataService);
        this.administrator = new AdministratorDataService(baseDataService);
        this.auth = new AuthDataService(baseDataService);
        this.collection = new CollectionDataService(baseDataService);
        this.product = new ProductDataService(baseDataService);
        this.client = new ClientDataService(baseDataService);
        this.facet = new FacetDataService(baseDataService);
        this.order = new OrderDataService(baseDataService);
        this.settings = new SettingsDataService(baseDataService);
        this.customer = new CustomerDataService(baseDataService);
        this.shippingMethod = new ShippingMethodDataService(baseDataService);
    }
    /**
     * @description
     * Perform a GraphQL query. Returns a {@link QueryResult} which allows further control over
     * they type of result returned, e.g. stream of values, single value etc.
     *
     * @example
     * ```TypeScript
     * const result$ = this.dataService.query(gql`
     *   query MyQuery($id: ID!) {
     *     product(id: $id) {
     *       id
     *       name
     *       slug
     *     }
     *   },
     *   { id: 123 },
     * ).mapSingle(data => data.product);
     * ```
     */
    query(query, variables, fetchPolicy = 'cache-and-network') {
        return this.baseDataService.query(query, variables, fetchPolicy);
    }
    /**
     * @description
     * Perform a GraphQL mutation.
     *
     * @example
     * ```TypeScript
     * const result$ = this.dataService.mutate(gql`
     *   mutation MyMutation($input: UpdateEntityInput!) {
     *     updateEntity(input: $input) {
     *       id
     *       name
     *     }
     *   },
     *   { input: updateEntityInput },
     * );
     * ```
     */
    mutate(mutation, variables, update) {
        return this.baseDataService.mutate(mutation, variables, update);
    }
}
DataService.decorators = [
    { type: Injectable }
];
DataService.ctorParameters = () => [
    { type: BaseDataService }
];

class AppComponent {
    constructor(dataService, serverConfigService, localStorageService, document) {
        this.dataService = dataService;
        this.serverConfigService = serverConfigService;
        this.localStorageService = localStorageService;
        this.document = document;
        this._document = document;
    }
    ngOnInit() {
        this.loading$ = this.dataService.client
            .getNetworkStatus()
            .stream$.pipe(map(data => 0 < data.networkStatus.inFlightRequests));
        this.dataService.client
            .uiState()
            .mapStream(data => data.uiState.theme)
            .subscribe(theme => {
            var _a;
            (_a = this._document) === null || _a === void 0 ? void 0 : _a.body.setAttribute('data-theme', theme);
        });
        // Once logged in, keep the localStorage "contentLanguageCode" in sync with the
        // uiState. Also perform a check to ensure that the current contentLanguage is
        // one of the availableLanguages per GlobalSettings.
        this.dataService.client
            .userStatus()
            .mapStream(({ userStatus }) => userStatus.isLoggedIn)
            .pipe(filter(loggedIn => loggedIn === true), switchMap(() => {
            return this.dataService.client.uiState().mapStream(data => data.uiState.contentLanguage);
        }), switchMap(contentLang => {
            return this.serverConfigService
                .getAvailableLanguages()
                .pipe(map(available => [contentLang, available]));
        }))
            .subscribe({
            next: ([contentLanguage, availableLanguages]) => {
                this.localStorageService.set('contentLanguageCode', contentLanguage);
                if (availableLanguages.length && !availableLanguages.includes(contentLanguage)) {
                    this.dataService.client.setContentLanguage(availableLanguages[0]).subscribe();
                }
            },
        });
        if (isDevMode()) {
            // tslint:disable-next-line:no-console
            console.log(`%cVendure Admin UI: Press "ctrl/cmd + u" to view UI extension points`, `color: #17C1FF; font-weight: bold;`);
        }
    }
    handleGlobalHotkeys(event) {
        if ((event.ctrlKey === true || event.metaKey === true) && event.key === 'u') {
            event.preventDefault();
            if (isDevMode()) {
                this.dataService.client
                    .uiState()
                    .single$.pipe(switchMap(({ uiState }) => this.dataService.client.setDisplayUiExtensionPoints(!uiState.displayUiExtensionPoints)))
                    .subscribe();
            }
        }
    }
}
AppComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-root',
                template: "<div class=\"progress loop\" [class.visible]=\"loading$ | async\"></div>\n<router-outlet></router-outlet>\n<vdr-overlay-host></vdr-overlay-host>\n",
                styles: [".progress{position:absolute;overflow:hidden;height:4px;background-color:var(--color-grey-500);opacity:0;transition:opacity .1s}.progress.visible{opacity:1}\n"]
            },] }
];
AppComponent.ctorParameters = () => [
    { type: DataService },
    { type: ServerConfigService },
    { type: LocalStorageService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
AppComponent.propDecorators = {
    handleGlobalHotkeys: [{ type: HostListener, args: ['window:keydown', ['$event'],] }]
};

let vendureUiConfig;
function loadAppConfig() {
    return fetch('./vendure-ui-config.json')
        .then(res => res.json())
        .then(config => {
        vendureUiConfig = config;
    });
}
function getAppConfig() {
    if (!vendureUiConfig) {
        throw new Error(`vendure ui config not loaded`);
    }
    return vendureUiConfig;
}

function getDefaultUiLanguage() {
    return getAppConfig().defaultLanguage;
}
function getDefaultUiLocale() {
    var _a;
    const defaultLocale = getAppConfig().defaultLocale;
    if (defaultLocale) {
        return defaultLocale;
    }
    return (_a = navigator.language.split('-')[1]) === null || _a === void 0 ? void 0 : _a.toUpperCase();
}

/**
 * This service handles logic relating to authentication of the current user.
 */
class AuthService {
    constructor(localStorageService, dataService, serverConfigService) {
        this.localStorageService = localStorageService;
        this.dataService = dataService;
        this.serverConfigService = serverConfigService;
    }
    /**
     * Attempts to log in via the REST login endpoint and updates the app
     * state on success.
     */
    logIn(username, password, rememberMe) {
        return this.dataService.auth.attemptLogin(username, password, rememberMe).pipe(switchMap(response => {
            if (response.login.__typename === 'CurrentUser') {
                this.setChannelToken(response.login.channels);
            }
            return this.serverConfigService.getServerConfig().then(() => response.login);
        }), switchMap(login => {
            if (login.__typename === 'CurrentUser') {
                const { id } = this.getActiveChannel(login.channels);
                return this.dataService.client
                    .loginSuccess(username, id, login.channels)
                    .pipe(map(() => login));
            }
            return of(login);
        }));
    }
    /**
     * Update the user status to being logged out.
     */
    logOut() {
        return this.dataService.client.userStatus().single$.pipe(switchMap(status => {
            if (status.userStatus.isLoggedIn) {
                return this.dataService.client
                    .logOut()
                    .pipe(mergeMap(() => this.dataService.auth.logOut()));
            }
            else {
                return [];
            }
        }), mapTo(true));
    }
    /**
     * Checks the app state to see if the user is already logged in,
     * and if not, attempts to validate any auth token found.
     */
    checkAuthenticatedStatus() {
        return this.dataService.client.userStatus().single$.pipe(mergeMap(data => {
            if (!data.userStatus.isLoggedIn) {
                return this.validateAuthToken();
            }
            else {
                return of(true);
            }
        }));
    }
    /**
     * Checks for an auth token and if found, attempts to validate
     * that token against the API.
     */
    validateAuthToken() {
        return this.dataService.auth.currentUser().single$.pipe(mergeMap(result => {
            if (!result.me) {
                return of(false);
            }
            this.setChannelToken(result.me.channels);
            const { id } = this.getActiveChannel(result.me.channels);
            return this.dataService.client.loginSuccess(result.me.identifier, id, result.me.channels);
        }), mapTo(true), catchError(err => of(false)));
    }
    getActiveChannel(userChannels) {
        const lastActiveChannelToken = this.localStorageService.get('activeChannelToken');
        if (lastActiveChannelToken) {
            const lastActiveChannel = userChannels.find(c => c.token === lastActiveChannelToken);
            if (lastActiveChannel) {
                return lastActiveChannel;
            }
        }
        const defaultChannel = userChannels.find(c => c.code === DEFAULT_CHANNEL_CODE);
        return defaultChannel || userChannels[0];
    }
    setChannelToken(userChannels) {
        this.localStorageService.set('activeChannelToken', this.getActiveChannel(userChannels).token);
    }
}
AuthService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthService_Factory() { return new AuthService(i0.ɵɵinject(LocalStorageService), i0.ɵɵinject(DataService), i0.ɵɵinject(ServerConfigService)); }, token: AuthService, providedIn: "root" });
AuthService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
AuthService.ctorParameters = () => [
    { type: LocalStorageService },
    { type: DataService },
    { type: ServerConfigService }
];

/** @dynamic */
class I18nService {
    constructor(ngxTranslate, document) {
        this.ngxTranslate = ngxTranslate;
        this.document = document;
        this._availableLanguages = [];
    }
    get availableLanguages() {
        return [...this._availableLanguages];
    }
    /**
     * Set the default language
     */
    setDefaultLanguage(languageCode) {
        this.ngxTranslate.setDefaultLang(languageCode);
    }
    /**
     * Set the UI language
     */
    setLanguage(language) {
        var _a;
        this.ngxTranslate.use(language);
        if ((_a = this.document) === null || _a === void 0 ? void 0 : _a.documentElement) {
            this.document.documentElement.lang = language;
        }
    }
    /**
     * Set the available UI languages
     */
    setAvailableLanguages(languages) {
        this._availableLanguages = languages;
    }
    /**
     * Translate the given key.
     */
    translate(key, params) {
        return this.ngxTranslate.instant(key, params);
    }
}
I18nService.ɵprov = i0.ɵɵdefineInjectable({ factory: function I18nService_Factory() { return new I18nService(i0.ɵɵinject(i1$1.TranslateService), i0.ɵɵinject(i1.DOCUMENT)); }, token: I18nService, providedIn: "root" });
I18nService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
I18nService.ctorParameters = () => [
    { type: TranslateService },
    { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];

/**
 * This component should only be instantiated dynamically by the ModalService. It should not be used
 * directly in templates. See {@link ModalService.fromComponent} method for more detail.
 */
class ModalDialogComponent {
    constructor() {
        this.titleTemplateRef$ = new Subject();
        this.buttonsTemplateRef$ = new Subject();
    }
    /**
     * This callback is invoked when the childComponentType is instantiated in the
     * template by the {@link DialogComponentOutletComponent}.
     * Once we have the instance, we can set the resolveWith function and any
     * locals which were specified in the config.
     */
    onCreate(componentInstance) {
        componentInstance.resolveWith = (result) => {
            this.closeModal(result);
        };
        if (this.options && this.options.locals) {
            // tslint:disable-next-line
            for (const key in this.options.locals) {
                componentInstance[key] = this.options.locals[key];
            }
        }
    }
    /**
     * This should be called by the {@link DialogTitleDirective} only
     */
    registerTitleTemplate(titleTemplateRef) {
        this.titleTemplateRef$.next(titleTemplateRef);
    }
    /**
     * This should be called by the {@link DialogButtonsDirective} only
     */
    registerButtonsTemplate(buttonsTemplateRef) {
        this.buttonsTemplateRef$.next(buttonsTemplateRef);
    }
    /**
     * Called when the modal is closed by clicking the X or the mask.
     */
    modalOpenChange(status) {
        if (status === false) {
            this.closeModal();
        }
    }
}
ModalDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-modal-dialog',
                template: "<clr-modal\n    [clrModalOpen]=\"true\"\n    (clrModalOpenChange)=\"modalOpenChange($event)\"\n    [clrModalClosable]=\"options?.closable\"\n    [clrModalSize]=\"options?.size\"\n    [ngClass]=\"'modal-valign-' + (options?.verticalAlign || 'center')\"\n>\n    <h3 class=\"modal-title\"><ng-container *ngTemplateOutlet=\"(titleTemplateRef$ | async)\"></ng-container></h3>\n    <div class=\"modal-body\">\n        <vdr-dialog-component-outlet\n            [component]=\"childComponentType\"\n            (create)=\"onCreate($event)\"\n        ></vdr-dialog-component-outlet>\n    </div>\n    <div class=\"modal-footer\">\n        <ng-container *ngTemplateOutlet=\"(buttonsTemplateRef$ | async)\"></ng-container>\n    </div>\n</clr-modal>\n",
                styles: ["::ng-deep clr-modal.modal-valign-top .modal{justify-content:flex-start}::ng-deep clr-modal.modal-valign-bottom .modal{justify-content:flex-end}.modal-body{display:flex;flex-direction:column}\n"]
            },] }
];

/**
 * Used by ModalService.dialog() to host a generic configurable modal dialog.
 */
class SimpleDialogComponent {
    constructor() {
        this.title = '';
        this.body = '';
        this.translationVars = {};
        this.buttons = [];
    }
}
SimpleDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-simple-dialog',
                template: "<ng-template vdrDialogTitle>{{ title | translate:translationVars }}</ng-template>\n<div style=\"white-space: pre-wrap;\">{{ body | translate:translationVars }}</div>\n<ng-template vdrDialogButtons>\n    <ng-container *ngFor=\"let button of buttons\">\n        <button\n            class=\"btn\"\n            [class.btn-primary]=\"button.type === 'primary'\"\n            [class.btn-danger]=\"button.type === 'danger'\"\n            (click)=\"resolveWith(button.returnValue)\"\n        >\n            {{ button.label | translate: (button.translationVars || {}) }}\n        </button>\n    </ng-container>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];

/**
 * The OverlayHostService is used to get a reference to the ViewConainerRef of the
 * OverlayHost component, so that other components may insert components & elements
 * into the DOM at that point.
 */
class OverlayHostService {
    constructor() {
        this.promiseResolveFns = [];
    }
    /**
     * Used to pass in the ViewContainerRed from the OverlayHost component.
     * Should not be used by any other component.
     */
    registerHostView(viewContainerRef) {
        this.hostView = viewContainerRef;
        if (0 < this.promiseResolveFns.length) {
            this.resolveHostView();
        }
    }
    /**
     * Returns a promise which resolves to the ViewContainerRef of the OverlayHost
     * component. This can then be used to insert components and elements into the
     * DOM at that point.
     */
    getHostView() {
        return new Promise((resolve) => {
            this.promiseResolveFns.push(resolve);
            if (this.hostView !== undefined) {
                this.resolveHostView();
            }
        });
    }
    resolveHostView() {
        this.promiseResolveFns.forEach(resolve => resolve(this.hostView));
        this.promiseResolveFns = [];
    }
}
OverlayHostService.ɵprov = i0.ɵɵdefineInjectable({ factory: function OverlayHostService_Factory() { return new OverlayHostService(); }, token: OverlayHostService, providedIn: "root" });
OverlayHostService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

/**
 * @description
 * This service is responsible for instantiating a ModalDialog component and
 * embedding the specified component within.
 *
 * @docsCategory providers
 * @docsPage ModalService
 * @docsWeight 0
 */
class ModalService {
    constructor(componentFactoryResolver, overlayHostService) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.overlayHostService = overlayHostService;
    }
    /**
     * @description
     * Create a modal from a component. The component must implement the {@link Dialog} interface.
     * Additionally, the component should include templates for the title and the buttons to be
     * displayed in the modal dialog. See example:
     *
     * @example
     * ```HTML
     * class MyDialog implements Dialog {
     *  resolveWith: (result?: any) => void;
     *
     *  okay() {
     *    doSomeWork().subscribe(result => {
     *      this.resolveWith(result);
     *    })
     *  }
     *
     *  cancel() {
     *    this.resolveWith(false);
     *  }
     * }
     * ```
     *
     * @example
     * ```HTML
     * <ng-template vdrDialogTitle>Title of the modal</ng-template>
     *
     * <p>
     *   My Content
     * </p>
     *
     * <ng-template vdrDialogButtons>
     *   <button type="button"
     *           class="btn"
     *           (click)="cancel()">Cancel</button>
     *   <button type="button"
     *           class="btn btn-primary"
     *           (click)="okay()">Okay</button>
     * </ng-template>
     * ```
     */
    fromComponent(component, options) {
        const modalFactory = this.componentFactoryResolver.resolveComponentFactory(ModalDialogComponent);
        return from(this.overlayHostService.getHostView()).pipe(mergeMap(hostView => {
            const modalComponentRef = hostView.createComponent(modalFactory);
            const modalInstance = modalComponentRef.instance;
            modalInstance.childComponentType = component;
            modalInstance.options = options;
            return new Observable(subscriber => {
                modalInstance.closeModal = (result) => {
                    modalComponentRef.destroy();
                    subscriber.next(result);
                    subscriber.complete();
                };
            });
        }));
    }
    /**
     * @description
     * Displays a modal dialog with the provided title, body and buttons.
     */
    dialog(config) {
        return this.fromComponent(SimpleDialogComponent, {
            locals: config,
            size: config.size,
        });
    }
}
ModalService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ModalService_Factory() { return new ModalService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(OverlayHostService)); }, token: ModalService, providedIn: "root" });
ModalService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
ModalService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: OverlayHostService }
];

class UiLanguageSwitcherDialogComponent {
    constructor() {
        this.availableLanguages = [];
        this.availableLocales = [
            'AF',
            'AL',
            'DZ',
            'AS',
            'AD',
            'AO',
            'AI',
            'AQ',
            'AG',
            'AR',
            'AM',
            'AW',
            'AU',
            'AT',
            'AZ',
            'BS',
            'BH',
            'BD',
            'BB',
            'BY',
            'BE',
            'BZ',
            'BJ',
            'BM',
            'BT',
            'BO',
            'BQ',
            'BA',
            'BW',
            'BV',
            'BR',
            'IO',
            'BN',
            'BG',
            'BF',
            'BI',
            'CV',
            'KH',
            'CM',
            'CA',
            'KY',
            'CF',
            'TD',
            'CL',
            'CN',
            'CX',
            'CC',
            'CO',
            'KM',
            'CD',
            'CG',
            'CK',
            'CR',
            'HR',
            'CU',
            'CW',
            'CY',
            'CZ',
            'CI',
            'DK',
            'DJ',
            'DM',
            'DO',
            'EC',
            'EG',
            'SV',
            'GQ',
            'ER',
            'EE',
            'SZ',
            'ET',
            'FK',
            'FO',
            'FJ',
            'FI',
            'FR',
            'GF',
            'PF',
            'TF',
            'GA',
            'GM',
            'GE',
            'DE',
            'GH',
            'GI',
            'GR',
            'GL',
            'GD',
            'GP',
            'GU',
            'GT',
            'GG',
            'GN',
            'GW',
            'GY',
            'HT',
            'HM',
            'VA',
            'HN',
            'HK',
            'HU',
            'IS',
            'IN',
            'ID',
            'IR',
            'IQ',
            'IE',
            'IM',
            'IL',
            'IT',
            'JM',
            'JP',
            'JE',
            'JO',
            'KZ',
            'KE',
            'KI',
            'KP',
            'KR',
            'KW',
            'KG',
            'LA',
            'LV',
            'LB',
            'LS',
            'LR',
            'LY',
            'LI',
            'LT',
            'LU',
            'MO',
            'MG',
            'MW',
            'MY',
            'MV',
            'ML',
            'MT',
            'MH',
            'MQ',
            'MR',
            'MU',
            'YT',
            'MX',
            'FM',
            'MD',
            'MC',
            'MN',
            'ME',
            'MS',
            'MA',
            'MZ',
            'MM',
            'NA',
            'NR',
            'NP',
            'NL',
            'NC',
            'NZ',
            'NI',
            'NE',
            'NG',
            'NU',
            'NF',
            'MK',
            'MP',
            'NO',
            'OM',
            'PK',
            'PW',
            'PS',
            'PA',
            'PG',
            'PY',
            'PE',
            'PH',
            'PN',
            'PL',
            'PT',
            'PR',
            'QA',
            'RO',
            'RU',
            'RW',
            'RE',
            'BL',
            'SH',
            'KN',
            'LC',
            'MF',
            'PM',
            'VC',
            'WS',
            'SM',
            'ST',
            'SA',
            'SN',
            'RS',
            'SC',
            'SL',
            'SG',
            'SX',
            'SK',
            'SI',
            'SB',
            'SO',
            'ZA',
            'GS',
            'SS',
            'ES',
            'LK',
            'SD',
            'SR',
            'SJ',
            'SE',
            'CH',
            'SY',
            'TW',
            'TJ',
            'TZ',
            'TH',
            'TL',
            'TG',
            'TK',
            'TO',
            'TT',
            'TN',
            'TR',
            'TM',
            'TC',
            'TV',
            'UG',
            'UA',
            'AE',
            'GB',
            'UM',
            'US',
            'UY',
            'UZ',
            'VU',
            'VE',
            'VN',
            'VG',
            'VI',
            'WF',
            'EH',
            'YE',
            'ZM',
            'ZW',
            'AX',
        ];
        this.availableCurrencyCodes = Object.values(CurrencyCode);
        this.selectedCurrencyCode = 'USD';
        this.now = new Date().toISOString();
        const browserLanguage = navigator.language.split('-');
        this.browserDefaultLocale = browserLanguage.length === 1 ? undefined : browserLanguage[1];
    }
    ngOnInit() {
        this.updatePreviewLocale();
    }
    updatePreviewLocale() {
        if (!this.currentLocale || this.currentLocale.length === 0 || this.currentLocale.length === 2) {
            this.previewLocale = this.createLocaleString(this.currentLanguage, this.currentLocale);
        }
    }
    setLanguage() {
        var _a;
        this.resolveWith([this.currentLanguage, (_a = this.currentLocale) === null || _a === void 0 ? void 0 : _a.toUpperCase()]);
    }
    cancel() {
        this.resolveWith();
    }
    createLocaleString(languageCode, region) {
        if (!region) {
            return languageCode;
        }
        return [languageCode, region.toUpperCase()].join('-');
    }
}
UiLanguageSwitcherDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-ui-language-switcher',
                template: "<ng-template vdrDialogTitle>{{ 'common.select-display-language' | translate }}</ng-template>\n<div class=\"clr-row\">\n    <div class=\"clr-col-md-6\">\n        <clr-select-container>\n            <label>{{ 'common.language' | translate }}</label>\n            <select\n                clrSelect\n                name=\"options\"\n                [(ngModel)]=\"currentLanguage\"\n                (ngModelChange)=\"updatePreviewLocale()\"\n            >\n                <option *ngFor=\"let code of availableLanguages | sort\" [value]=\"code\">\n                    {{ code | uppercase }} ({{ code | localeLanguageName }})\n                </option>\n            </select>\n        </clr-select-container>\n    </div>\n    <div class=\"clr-col-md-6\">\n        <clr-datalist-container>\n            <label>{{ 'common.locale' | translate }}</label>\n            <input\n                clrDatalistInput\n                [(ngModel)]=\"currentLocale\"\n                (ngModelChange)=\"updatePreviewLocale()\"\n                [placeholder]=\"'common.browser-default' | translate\"\n                class=\"locale\"\n                name=\"Locale\"\n            />\n            <datalist>\n                <option *ngFor=\"let locale of availableLocales\" [value]=\"locale\">\n                    {{ locale }} ({{ locale | localeRegionName }})\n                </option>\n            </datalist>\n        </clr-datalist-container>\n    </div>\n</div>\n<div class=\"card\">\n    <div class=\"card-header\">\n        <span class=\"p2\">{{ 'common.sample-formatting' | translate }}:</span><strong>{{ previewLocale | localeLanguageName:previewLocale }}</strong>\n    </div>\n    <div class=\"card-block\">\n        <div class=\"clr-row\">\n            <div class=\"clr-col-sm-4\">\n                <vdr-labeled-data [label]=\"'common.medium-date' | translate\">\n                    {{ now | localeDate: 'medium':previewLocale }}\n                </vdr-labeled-data>\n                <vdr-labeled-data [label]=\"'common.short-date' | translate\">\n                    {{ now | localeDate: 'short':previewLocale }}\n                </vdr-labeled-data>\n            </div>\n            <div class=\"clr-col-sm-4\">\n                <select clrSelect name=\"currency\" class=\"currency\" [(ngModel)]=\"selectedCurrencyCode\">\n                    <option *ngFor=\"let code of availableCurrencyCodes | sort\" [value]=\"code\">\n                        {{ code | uppercase }} ({{ code | localeCurrencyName: 'full':previewLocale }})\n                    </option>\n                </select>\n            </div>\n            <div class=\"clr-col-sm-4\">\n                <vdr-labeled-data [label]=\"'common.price' | translate\">\n                    {{ 12345 | localeCurrency: selectedCurrencyCode:previewLocale }}\n                </vdr-labeled-data>\n            </div>\n        </div>\n    </div>\n</div>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"setLanguage()\"\n        class=\"btn btn-primary\"\n    >\n        {{ 'common.set-language' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["select.currency{max-width:200px}input.locale{text-transform:uppercase}\n"]
            },] }
];
UiLanguageSwitcherDialogComponent.ctorParameters = () => [];

class AppShellComponent {
    constructor(authService, dataService, router, i18nService, modalService, localStorageService) {
        this.authService = authService;
        this.dataService = dataService;
        this.router = router;
        this.i18nService = i18nService;
        this.modalService = modalService;
        this.localStorageService = localStorageService;
        this.availableLanguages = [];
        this.hideVendureBranding = getAppConfig().hideVendureBranding;
    }
    ngOnInit() {
        this.userName$ = this.dataService.client
            .userStatus()
            .single$.pipe(map(data => data.userStatus.username));
        this.uiLanguageAndLocale$ = this.dataService.client
            .uiState()
            .stream$.pipe(map(({ uiState }) => { var _a; return [uiState.language, (_a = uiState.locale) !== null && _a !== void 0 ? _a : undefined]; }));
        this.availableLanguages = this.i18nService.availableLanguages;
        this.isChannelOpen$ = this.dataService.settings
            .getActiveChannel()
            .single$.pipe(map((data) => data.activeChannel.customFields.isOpen));
    }
    selectUiLanguage() {
        this.uiLanguageAndLocale$
            .pipe(take(1), switchMap(([currentLanguage, currentLocale]) => this.modalService.fromComponent(UiLanguageSwitcherDialogComponent, {
            closable: true,
            size: 'lg',
            locals: {
                availableLanguages: this.availableLanguages,
                currentLanguage,
                currentLocale,
            },
        })), switchMap(result => result ? this.dataService.client.setUiLanguage(result[0], result[1]) : EMPTY))
            .subscribe(result => {
            var _a;
            if (result.setUiLanguage) {
                this.i18nService.setLanguage(result.setUiLanguage);
                this.localStorageService.set('uiLanguageCode', result.setUiLanguage);
                this.localStorageService.set('uiLocale', (_a = result.setUiLocale) !== null && _a !== void 0 ? _a : undefined);
            }
        });
    }
    toggleChannelOpenClosedSwitch(isOpen) {
        const activeChannelId$ = this.dataService.client
            .userStatus()
            .mapSingle(({ userStatus }) => userStatus.activeChannelId);
        activeChannelId$.subscribe(activeChannelId => {
            const input = {
                id: activeChannelId,
                customFields: {
                    isOpen,
                },
            };
            this.dataService.settings.updateChannel(input).subscribe();
        });
    }
    logOut() {
        this.authService.logOut().subscribe(() => {
            const { loginUrl } = getAppConfig();
            if (loginUrl) {
                window.location.href = loginUrl;
            }
            else {
                this.router.navigate(['/login']);
            }
        });
    }
}
AppShellComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-app-shell',
                template: "<clr-main-container>\n    <clr-header [ngStyle]=\"{ background: openCloseToggle.checked ? '#02b302' : '#ff3535' }\">\n        <div class=\"branding\">\n            <a [routerLink]=\"['/']\"><img src=\"assets/crepe_runner_logo.png\" class=\"logo\" /></a>\n        </div>\n        <div class=\"header-nav\"></div>\n        <div class=\"header-actions\">\n            <!-- <vdr-datetime-picker></vdr-datetime-picker> -->\n            <clr-toggle-wrapper>\n                <input\n                    #openCloseToggle\n                    type=\"checkbox\"\n                    (change)=\"toggleChannelOpenClosedSwitch(openCloseToggle.checked)\"\n                    [checked]=\"isChannelOpen$ | async\"\n                    clrToggle\n                    name=\"enabled\"\n                />\n                <label class=\"visible-toggle\">\n                    <ng-container *ngIf=\"openCloseToggle.checked; else closed\"\n                        ><span style=\"color: white\">Open</span></ng-container\n                    >\n                    <ng-template #closed><span style=\"color: white\">Closed</span></ng-template>\n                </label>\n            </clr-toggle-wrapper>\n            <vdr-channel-switcher *vdrIfMultichannel></vdr-channel-switcher>\n            <vdr-user-menu\n                [userName]=\"userName$ | async\"\n                [uiLanguageAndLocale]=\"uiLanguageAndLocale$ | async\"\n                [availableLanguages]=\"availableLanguages\"\n                (selectUiLanguage)=\"selectUiLanguage()\"\n                (logOut)=\"logOut()\"\n            ></vdr-user-menu>\n        </div>\n    </clr-header>\n    <nav class=\"subnav\"><vdr-breadcrumb></vdr-breadcrumb></nav>\n\n    <div class=\"content-container\">\n        <div class=\"content-area\"><router-outlet></router-outlet></div>\n        <vdr-main-nav></vdr-main-nav>\n    </div>\n</clr-main-container>\n",
                styles: [".branding{min-width:0}.logo{width:120px}.wordmark{font-weight:bold;margin-left:12px;font-size:24px;color:var(--color-primary-500)}@media screen and (min-width: 768px){vdr-breadcrumb{margin-left:10.8rem}}.header-actions{align-items:center}.content-area{position:relative}::ng-deep .header{background-image:linear-gradient(to right,var(--color-header-gradient-from),var(--color-header-gradient-to))}\n"]
            },] }
];
AppShellComponent.ctorParameters = () => [
    { type: AuthService },
    { type: DataService },
    { type: Router },
    { type: I18nService },
    { type: ModalService },
    { type: LocalStorageService }
];

/**
 * A breadcrumbs component which reads the route config and any route that has a `data.breadcrumb` property will
 * be displayed in the breadcrumb trail.
 *
 * The `breadcrumb` property can be a string or a function. If a function, it will be passed the route's `data`
 * object (which will include all resolved keys) and any route params, and should return a BreadcrumbValue.
 *
 * See the test config to get an idea of allowable configs for breadcrumbs.
 */
class BreadcrumbComponent {
    constructor(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.destroy$ = new Subject();
        this.breadcrumbs$ = this.router.events.pipe(filter(event => event instanceof NavigationEnd), takeUntil(this.destroy$), startWith(true), switchMap(() => this.generateBreadcrumbs(this.route.root)));
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    generateBreadcrumbs(rootRoute) {
        const breadcrumbParts = this.assembleBreadcrumbParts(rootRoute);
        const breadcrumbObservables$ = breadcrumbParts.map(({ value$, path }) => {
            return value$.pipe(map(value => {
                if (isBreadcrumbLabelLinkPair(value)) {
                    return {
                        label: value.label,
                        link: this.normalizeRelativeLinks(value.link, path),
                    };
                }
                else if (isBreadcrumbPairArray(value)) {
                    return value.map(val => ({
                        label: val.label,
                        link: this.normalizeRelativeLinks(val.link, path),
                    }));
                }
                else {
                    return {
                        label: value,
                        link: '/' + path.join('/'),
                    };
                }
            }));
        });
        return combineLatest(breadcrumbObservables$).pipe(map(links => flatten(links)));
    }
    /**
     * Walks the route definition tree to assemble an array from which the breadcrumbs can be derived.
     */
    assembleBreadcrumbParts(rootRoute) {
        const breadcrumbParts = [];
        const inferredUrl = '';
        const segmentPaths = [];
        let currentRoute = rootRoute;
        do {
            const childRoutes = currentRoute.children;
            currentRoute = null;
            childRoutes.forEach((route) => {
                if (route.outlet === PRIMARY_OUTLET) {
                    const routeSnapshot = route.snapshot;
                    let breadcrumbDef = route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb'];
                    segmentPaths.push(routeSnapshot.url.map(segment => segment.path).join('/'));
                    if (breadcrumbDef) {
                        if (isBreadcrumbFunction(breadcrumbDef)) {
                            breadcrumbDef = breadcrumbDef(routeSnapshot.data, routeSnapshot.params, this.dataService);
                        }
                        const observableValue = isObservable(breadcrumbDef)
                            ? breadcrumbDef
                            : of(breadcrumbDef);
                        breadcrumbParts.push({ value$: observableValue, path: segmentPaths.slice() });
                    }
                    currentRoute = route;
                }
            });
        } while (currentRoute);
        return breadcrumbParts;
    }
    /**
     * Accounts for relative routes in the link array, i.e. arrays whose first element is either:
     * * `./`   - this appends the rest of the link segments to the current active route
     * * `../`  - this removes the last segment of the current active route, and appends the link segments
     *            to the parent route.
     */
    normalizeRelativeLinks(link, segmentPaths) {
        const clone = link.slice();
        if (clone[0] === './') {
            clone[0] = segmentPaths.join('/');
        }
        if (clone[0] === '../') {
            clone[0] = segmentPaths.slice(0, -1).join('/');
        }
        return clone.filter(segment => segment !== '');
    }
}
BreadcrumbComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-breadcrumb',
                template: "<nav role=\"navigation\">\n    <ul class=\"breadcrumbs\">\n        <li *ngFor=\"let breadcrumb of (breadcrumbs$ | async); let isLast = last\">\n            <a [routerLink]=\"breadcrumb.link\" *ngIf=\"!isLast\">{{ breadcrumb.label | translate }}</a>\n            <ng-container *ngIf=\"isLast\">{{ breadcrumb.label | translate }}</ng-container>\n        </li>\n    </ul>\n</nav>\n",
                styles: ["@charset \"UTF-8\";:host{display:block}@media screen and (min-width: 768px){:host{padding:0 1rem}}.breadcrumbs{list-style-type:none;display:flex;overflow-x:auto;max-width:100vw;padding:0 3px}@media screen and (min-width: 768px){.breadcrumbs{padding:0}}.breadcrumbs li{font-size:16px;display:inline-block;margin-right:10px;white-space:nowrap}.breadcrumbs li:not(:last-child):after{content:\"\\203a\";top:0;color:var(--color-grey-400);margin-left:10px}\n"]
            },] }
];
BreadcrumbComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: DataService }
];
function isBreadcrumbFunction(value) {
    return typeof value === 'function';
}
function isObservable(value) {
    return value instanceof Observable;
}
function isBreadcrumbLabelLinkPair(value) {
    return value.hasOwnProperty('label') && value.hasOwnProperty('link');
}
function isBreadcrumbPairArray(value) {
    return Array.isArray(value) && isBreadcrumbLabelLinkPair(value[0]);
}

class ChannelSwitcherComponent {
    constructor(dataService, localStorageService) {
        this.dataService = dataService;
        this.localStorageService = localStorageService;
        this.displayFilterThreshold = 10;
        this.filterControl = new FormControl('');
    }
    ngOnInit() {
        const channels$ = this.dataService.client.userStatus().mapStream(data => data.userStatus.channels);
        const filterTerm$ = this.filterControl.valueChanges.pipe(startWith(''));
        this.channels$ = combineLatest(channels$, filterTerm$).pipe(map(([channels, filterTerm]) => {
            return filterTerm
                ? channels.filter(c => c.code.toLocaleLowerCase().includes(filterTerm.toLocaleLowerCase()))
                : channels;
        }));
        this.channelCount$ = channels$.pipe(map(channels => channels.length));
        const activeChannel$ = this.dataService.client
            .userStatus()
            .mapStream(data => data.userStatus.channels.find(c => c.id === data.userStatus.activeChannelId))
            .pipe(filter(notNullOrUndefined));
        this.activeChannelCode$ = activeChannel$.pipe(map(channel => channel.code));
    }
    setActiveChannel(channelId) {
        this.dataService.client.setActiveChannel(channelId).subscribe(({ setActiveChannel }) => {
            const activeChannel = setActiveChannel.channels.find(c => c.id === channelId);
            if (activeChannel) {
                this.localStorageService.set('activeChannelToken', activeChannel.token);
            }
            this.filterControl.patchValue('');
        });
    }
}
ChannelSwitcherComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-channel-switcher',
                template: "<ng-container>\n    <vdr-dropdown>\n        <button class=\"btn btn-link active-channel\" vdrDropdownTrigger>\n            <vdr-channel-badge [channelCode]=\"activeChannelCode$ | async\"></vdr-channel-badge>\n            <span class=\"active-channel\">{{\n                activeChannelCode$ | async | channelCodeToLabel | translate\n            }}</span>\n            <span class=\"trigger\"><clr-icon shape=\"caret down\"></clr-icon></span>\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <input\n                *ngIf=\"((channelCount$ | async) || 0) >= displayFilterThreshold\"\n                [formControl]=\"filterControl\"\n                type=\"text\"\n                class=\"ml2 mr2\"\n                [placeholder]=\"'common.filter' | translate\"\n            />\n            <button\n                *ngFor=\"let channel of channels$ | async\"\n                type=\"button\"\n                vdrDropdownItem\n                (click)=\"setActiveChannel(channel.id)\"\n            >\n                <vdr-channel-badge [channelCode]=\"channel.code\"></vdr-channel-badge>\n                {{ channel.code | channelCodeToLabel | translate }}\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;align-items:center;margin:0 .5rem;height:2.5rem}.active-channel{color:var(--color-grey-200)}.active-channel clr-icon{color:#fff}\n"]
            },] }
];
ChannelSwitcherComponent.ctorParameters = () => [
    { type: DataService },
    { type: LocalStorageService }
];

/**
 * Returns the location of the server, e.g. "http://localhost:3000"
 */
function getServerLocation() {
    const { apiHost, apiPort, adminApiPath, tokenMethod } = getAppConfig();
    const host = apiHost === 'auto' ? `${location.protocol}//${location.hostname}` : apiHost;
    const port = apiPort
        ? apiPort === 'auto'
            ? location.port === ''
                ? ''
                : `:${location.port}`
            : `:${apiPort}`
        : '';
    return `${host}${port}`;
}

class HealthCheckService {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.pollingDelayMs = 60 * 1000;
        this._refresh = new Subject();
        this.healthCheckEndpoint = getServerLocation() + '/health';
        const refresh$ = this._refresh.pipe(throttleTime(1000));
        const result$ = merge(timer(0, this.pollingDelayMs), refresh$).pipe(switchMap(() => this.checkHealth()), shareReplay(1));
        this.status$ = result$.pipe(map(res => res.status));
        this.details$ = result$.pipe(map(res => Object.keys(res.details).map(key => {
            return { key, result: res.details[key] };
        })));
        this.lastCheck$ = result$.pipe(map(res => res.lastChecked));
    }
    refresh() {
        this._refresh.next();
    }
    checkHealth() {
        return this.httpClient.get(this.healthCheckEndpoint).pipe(catchError(err => of(err.error)), map(res => (Object.assign(Object.assign({}, res), { lastChecked: new Date() }))));
    }
}
HealthCheckService.ɵprov = i0.ɵɵdefineInjectable({ factory: function HealthCheckService_Factory() { return new HealthCheckService(i0.ɵɵinject(i1$2.HttpClient)); }, token: HealthCheckService, providedIn: "root" });
HealthCheckService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
HealthCheckService.ctorParameters = () => [
    { type: HttpClient }
];

class JobQueueService {
    constructor(dataService) {
        this.dataService = dataService;
        this.updateJob$ = new Subject();
        this.onCompleteHandlers = new Map();
        this.checkForJobs();
        this.activeJobs$ = this.updateJob$.pipe(scan((jobMap, job) => this.handleJob(jobMap, job), new Map()), map(jobMap => Array.from(jobMap.values())), debounceTime(500), shareReplay(1));
        this.subscription = this.activeJobs$
            .pipe(switchMap(jobs => {
            if (jobs.length) {
                return interval(2500).pipe(mapTo(jobs));
            }
            else {
                return of([]);
            }
        }))
            .subscribe(jobs => {
            if (jobs.length) {
                this.dataService.settings.pollJobs(jobs.map(j => j.id)).single$.subscribe(data => {
                    data.jobsById.forEach(job => {
                        this.updateJob$.next(job);
                    });
                });
            }
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * After a given delay, checks the server for any active jobs.
     */
    checkForJobs(delay = 1000) {
        timer(delay)
            .pipe(switchMap(() => this.dataService.client.userStatus().mapSingle(data => data.userStatus)), switchMap(userStatus => {
            if (userStatus.permissions.includes(Permission.ReadSettings) && userStatus.isLoggedIn) {
                return this.dataService.settings.getRunningJobs().single$;
            }
            else {
                return EMPTY;
            }
        }))
            .subscribe(data => data.jobs.items.forEach(job => this.updateJob$.next(job)));
    }
    addJob(jobId, onComplete) {
        this.dataService.settings.getJob(jobId).single$.subscribe(({ job }) => {
            if (job) {
                this.updateJob$.next(job);
                if (onComplete) {
                    this.onCompleteHandlers.set(jobId, onComplete);
                }
            }
        });
    }
    handleJob(jobMap, job) {
        switch (job.state) {
            case JobState.RUNNING:
            case JobState.PENDING:
                jobMap.set(job.id, job);
                break;
            case JobState.COMPLETED:
            case JobState.FAILED:
            case JobState.CANCELLED:
                jobMap.delete(job.id);
                const handler = this.onCompleteHandlers.get(job.id);
                if (handler) {
                    handler(job);
                    this.onCompleteHandlers.delete(job.id);
                }
                break;
        }
        return jobMap;
    }
}
JobQueueService.ɵprov = i0.ɵɵdefineInjectable({ factory: function JobQueueService_Factory() { return new JobQueueService(i0.ɵɵinject(DataService)); }, token: JobQueueService, providedIn: "root" });
JobQueueService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
JobQueueService.ctorParameters = () => [
    { type: DataService }
];

/**
 * @description
 * Add a section to the main nav menu. Providing the `before` argument will
 * move the section before any existing section with the specified id. If
 * omitted (or if the id is not found) the section will be appended to the
 * existing set of sections.
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     addNavMenuSection({
 *       id: 'reports',
 *       label: 'Reports',
 *       items: [{
 *           // ...
 *       }],
 *     },
 *     'settings'),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 * @docsCategory nav-menu
 */
function addNavMenuSection(config, before) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (navBuilderService) => () => {
            navBuilderService.addNavMenuSection(config, before);
        },
        deps: [NavBuilderService],
    };
}
/**
 * @description
 * Add a menu item to an existing section specified by `sectionId`. The id of the section
 * can be found by inspecting the DOM and finding the `data-section-id` attribute.
 * Providing the `before` argument will move the item before any existing item with the specified id.
 * If omitted (or if the name is not found) the item will be appended to the
 * end of the section.
 *
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     addNavMenuItem({
 *       id: 'reviews',
 *       label: 'Product Reviews',
 *       routerLink: ['/extensions/reviews'],
 *       icon: 'star',
 *     },
 *     'marketing'),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ``
 *
 * @docsCategory nav-menu
 */
function addNavMenuItem(config, sectionId, before) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (navBuilderService) => () => {
            navBuilderService.addNavMenuItem(config, sectionId, before);
        },
        deps: [NavBuilderService],
    };
}
/**
 * @description
 * Adds a button to the ActionBar at the top right of each list or detail view. The locationId can
 * be determined by inspecting the DOM and finding the <vdr-action-bar> element and its
 * `data-location-id` attribute.
 *
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     addActionBarItem({
 *      id: 'print-invoice'
 *      label: 'Print Invoice',
 *      locationId: 'order-detail',
 *      routerLink: ['/extensions/invoicing'],
 *     }),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 * @docsCategory action-bar
 */
function addActionBarItem(config) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (navBuilderService) => () => {
            navBuilderService.addActionBarItem(config);
        },
        deps: [NavBuilderService],
    };
}
/**
 * This service is used to define the contents of configurable menus in the application.
 */
class NavBuilderService {
    constructor() {
        this.sectionBadges = {};
        this.initialNavMenuConfig$ = new BehaviorSubject([]);
        this.addedNavMenuSections = [];
        this.addedNavMenuItems = [];
        this.addedActionBarItems = [];
        this.setupStreams();
    }
    /**
     * Used to define the initial sections and items of the main nav menu.
     */
    defineNavMenuSections(config) {
        this.initialNavMenuConfig$.next(config);
    }
    /**
     * Add a section to the main nav menu. Providing the `before` argument will
     * move the section before any existing section with the specified id. If
     * omitted (or if the id is not found) the section will be appended to the
     * existing set of sections.
     *
     * Providing the `id` of an existing section will replace that section.
     */
    addNavMenuSection(config, before) {
        this.addedNavMenuSections.push({ config, before });
    }
    /**
     * Add a menu item to an existing section specified by `sectionId`. The id of the section
     * can be found by inspecting the DOM and finding the `data-section-id` attribute.
     * Providing the `before` argument will move the item before any existing item with the specified id.
     * If omitted (or if the name is not found) the item will be appended to the
     * end of the section.
     *
     * Providing the `id` of an existing item in that section will replace
     * that item.
     */
    addNavMenuItem(config, sectionId, before) {
        this.addedNavMenuItems.push({ config, sectionId, before });
    }
    /**
     * Adds a button to the ActionBar at the top right of each list or detail view. The locationId can
     * be determined by inspecting the DOM and finding the <vdr-action-bar> element and its
     * `data-location-id` attribute.
     */
    addActionBarItem(config) {
        this.addedActionBarItems.push(Object.assign({ requiresPermission: Permission.Authenticated }, config));
    }
    getRouterLink(config, route) {
        if (typeof config.routerLink === 'function') {
            return config.routerLink(route);
        }
        if (Array.isArray(config.routerLink)) {
            return config.routerLink;
        }
        return null;
    }
    setupStreams() {
        const sectionAdditions$ = of(this.addedNavMenuSections);
        const itemAdditions$ = of(this.addedNavMenuItems);
        const combinedConfig$ = combineLatest(this.initialNavMenuConfig$, sectionAdditions$).pipe(map(([initialConfig, additions]) => {
            for (const { config, before } of additions) {
                if (!config.requiresPermission) {
                    config.requiresPermission = Permission.Authenticated;
                }
                const existingIndex = initialConfig.findIndex(c => c.id === config.id);
                if (-1 < existingIndex) {
                    initialConfig[existingIndex] = config;
                }
                const beforeIndex = initialConfig.findIndex(c => c.id === before);
                if (-1 < beforeIndex) {
                    if (-1 < existingIndex) {
                        initialConfig.splice(existingIndex, 1);
                    }
                    initialConfig.splice(beforeIndex, 0, config);
                }
                else if (existingIndex === -1) {
                    initialConfig.push(config);
                }
            }
            return initialConfig;
        }), shareReplay(1));
        this.navMenuConfig$ = combineLatest(combinedConfig$, itemAdditions$).pipe(map(([sections, additionalItems]) => {
            for (const item of additionalItems) {
                const section = sections.find(s => s.id === item.sectionId);
                if (!section) {
                    // tslint:disable-next-line:no-console
                    console.error(`Could not add menu item "${item.config.id}", section "${item.sectionId}" does not exist`);
                }
                else {
                    const { config, sectionId, before } = item;
                    const existingIndex = section.items.findIndex(i => i.id === config.id);
                    if (-1 < existingIndex) {
                        section.items[existingIndex] = config;
                    }
                    const beforeIndex = section.items.findIndex(i => i.id === before);
                    if (-1 < beforeIndex) {
                        if (-1 < existingIndex) {
                            section.items.splice(existingIndex, 1);
                        }
                        section.items.splice(beforeIndex, 0, config);
                    }
                    else if (existingIndex === -1) {
                        section.items.push(config);
                    }
                }
            }
            // Aggregate any badges defined for the nav items in each section
            for (const section of sections) {
                const itemBadgeStatuses = section.items
                    .map(i => i.statusBadge)
                    .filter(notNullOrUndefined);
                this.sectionBadges[section.id] = combineLatest(itemBadgeStatuses).pipe(map(badges => {
                    const propagatingBadges = badges.filter(b => b.propagateToSection);
                    if (propagatingBadges.length === 0) {
                        return 'none';
                    }
                    const statuses = propagatingBadges.map(b => b.type);
                    if (statuses.includes('error')) {
                        return 'error';
                    }
                    else if (statuses.includes('warning')) {
                        return 'warning';
                    }
                    else if (statuses.includes('info')) {
                        return 'info';
                    }
                    else {
                        return 'none';
                    }
                }));
            }
            return sections;
        }));
        this.actionBarConfig$ = of(this.addedActionBarItems);
    }
}
NavBuilderService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NavBuilderService_Factory() { return new NavBuilderService(); }, token: NavBuilderService, providedIn: "root" });
NavBuilderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
NavBuilderService.ctorParameters = () => [];

class MainNavComponent {
    constructor(route, router, navBuilderService, healthCheckService, jobQueueService, dataService) {
        this.route = route;
        this.router = router;
        this.navBuilderService = navBuilderService;
        this.healthCheckService = healthCheckService;
        this.jobQueueService = jobQueueService;
        this.dataService = dataService;
    }
    shouldDisplayLink(menuItem) {
        if (!this.userPermissions) {
            return false;
        }
        if (!menuItem.requiresPermission) {
            return true;
        }
        if (typeof menuItem.requiresPermission === 'string') {
            return this.userPermissions.includes(menuItem.requiresPermission);
        }
        if (typeof menuItem.requiresPermission === 'function') {
            return menuItem.requiresPermission(this.userPermissions);
        }
    }
    ngOnInit() {
        this.defineNavMenu();
        this.subscription = this.dataService.client
            .userStatus()
            .mapStream(({ userStatus }) => {
            this.userPermissions = userStatus.permissions;
        })
            .subscribe();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    getRouterLink(item) {
        return this.navBuilderService.getRouterLink(item, this.route);
    }
    defineNavMenu() {
        function allow(...permissions) {
            return userPermissions => {
                for (const permission of permissions) {
                    if (userPermissions.includes(permission)) {
                        return true;
                    }
                }
                return false;
            };
        }
        this.navBuilderService.defineNavMenuSections([
            {
                requiresPermission: allow(Permission.ReadCatalog, Permission.ReadProduct, Permission.ReadFacet, Permission.ReadCollection, Permission.ReadAsset),
                id: 'catalog',
                label: marker('nav.catalog'),
                items: [
                    {
                        requiresPermission: allow(Permission.ReadCatalog, Permission.ReadProduct),
                        id: 'products',
                        label: marker('nav.products'),
                        icon: 'library',
                        routerLink: ['/catalog', 'products'],
                    },
                    {
                        requiresPermission: allow(Permission.ReadCatalog, Permission.ReadFacet),
                        id: 'facets',
                        label: marker('nav.facets'),
                        icon: 'tag',
                        routerLink: ['/catalog', 'facets'],
                    },
                    {
                        requiresPermission: allow(Permission.ReadCatalog, Permission.ReadCollection),
                        id: 'collections',
                        label: marker('nav.collections'),
                        icon: 'folder-open',
                        routerLink: ['/catalog', 'collections'],
                    },
                    {
                        requiresPermission: allow(Permission.ReadCatalog, Permission.ReadAsset),
                        id: 'assets',
                        label: marker('nav.assets'),
                        icon: 'image-gallery',
                        routerLink: ['/catalog', 'assets'],
                    },
                ],
            },
            {
                id: 'sales',
                label: marker('nav.sales'),
                requiresPermission: allow(Permission.ReadOrder),
                items: [
                    {
                        requiresPermission: allow(Permission.ReadOrder),
                        id: 'orders',
                        label: marker('nav.orders'),
                        routerLink: ['/orders'],
                        icon: 'shopping-cart',
                    },
                ],
            },
            {
                id: 'customers',
                label: marker('nav.customers'),
                requiresPermission: allow(Permission.ReadCustomer, Permission.ReadCustomerGroup),
                items: [
                    {
                        requiresPermission: allow(Permission.ReadCustomer),
                        id: 'customers',
                        label: marker('nav.customers'),
                        routerLink: ['/customer', 'customers'],
                        icon: 'user',
                    },
                    {
                        requiresPermission: allow(Permission.ReadCustomerGroup),
                        id: 'customer-groups',
                        label: marker('nav.customer-groups'),
                        routerLink: ['/customer', 'groups'],
                        icon: 'users',
                    },
                ],
            },
            {
                id: 'marketing',
                label: marker('nav.marketing'),
                requiresPermission: allow(Permission.ReadPromotion),
                items: [
                    {
                        requiresPermission: allow(Permission.ReadPromotion),
                        id: 'promotions',
                        label: marker('nav.promotions'),
                        routerLink: ['/marketing', 'promotions'],
                        icon: 'asterisk',
                    },
                ],
            },
            {
                id: 'settings',
                label: marker('nav.settings'),
                requiresPermission: allow(Permission.ReadSettings, Permission.ReadChannel, Permission.ReadAdministrator, Permission.ReadShippingMethod, Permission.ReadPaymentMethod, Permission.ReadTaxCategory, Permission.ReadTaxRate, Permission.ReadCountry, Permission.ReadZone, Permission.UpdateGlobalSettings),
                collapsible: true,
                collapsedByDefault: true,
                items: [
                    {
                        requiresPermission: allow(Permission.ReadChannel),
                        id: 'channels',
                        label: marker('nav.channels'),
                        routerLink: ['/settings', 'channels'],
                        icon: 'layers',
                    },
                    {
                        requiresPermission: allow(Permission.ReadAdministrator),
                        id: 'administrators',
                        label: marker('nav.administrators'),
                        routerLink: ['/settings', 'administrators'],
                        icon: 'administrator',
                    },
                    {
                        requiresPermission: allow(Permission.ReadAdministrator),
                        id: 'roles',
                        label: marker('nav.roles'),
                        routerLink: ['/settings', 'roles'],
                        icon: 'users',
                    },
                    {
                        requiresPermission: allow(Permission.ReadShippingMethod),
                        id: 'shipping-methods',
                        label: marker('nav.shipping-methods'),
                        routerLink: ['/settings', 'shipping-methods'],
                        icon: 'truck',
                    },
                    {
                        requiresPermission: allow(Permission.ReadPaymentMethod),
                        id: 'payment-methods',
                        label: marker('nav.payment-methods'),
                        routerLink: ['/settings', 'payment-methods'],
                        icon: 'credit-card',
                    },
                    {
                        requiresPermission: allow(Permission.ReadTaxCategory),
                        id: 'tax-categories',
                        label: marker('nav.tax-categories'),
                        routerLink: ['/settings', 'tax-categories'],
                        icon: 'view-list',
                    },
                    {
                        requiresPermission: allow(Permission.ReadTaxRate),
                        id: 'tax-rates',
                        label: marker('nav.tax-rates'),
                        routerLink: ['/settings', 'tax-rates'],
                        icon: 'calculator',
                    },
                    {
                        requiresPermission: allow(Permission.ReadCountry),
                        id: 'countries',
                        label: marker('nav.countries'),
                        routerLink: ['/settings', 'countries'],
                        icon: 'flag',
                    },
                    {
                        requiresPermission: allow(Permission.ReadZone),
                        id: 'zones',
                        label: marker('nav.zones'),
                        routerLink: ['/settings', 'zones'],
                        icon: 'world',
                    },
                    {
                        requiresPermission: allow(Permission.UpdateGlobalSettings),
                        id: 'global-settings',
                        label: marker('nav.global-settings'),
                        routerLink: ['/settings', 'global-settings'],
                        icon: 'cog',
                    },
                ],
            },
            {
                id: 'system',
                label: marker('nav.system'),
                requiresPermission: Permission.ReadSystem,
                collapsible: true,
                collapsedByDefault: true,
                items: [
                    {
                        id: 'job-queue',
                        label: marker('nav.job-queue'),
                        routerLink: ['/system', 'jobs'],
                        icon: 'tick-chart',
                        statusBadge: this.jobQueueService.activeJobs$.pipe(startWith([]), map(jobs => ({
                            type: jobs.length === 0 ? 'none' : 'info',
                            propagateToSection: jobs.length > 0,
                        }))),
                    },
                    {
                        id: 'system-status',
                        label: marker('nav.system-status'),
                        routerLink: ['/system', 'system-status'],
                        icon: 'rack-server',
                        statusBadge: this.healthCheckService.status$.pipe(map(status => ({
                            type: status === 'ok' ? 'success' : 'error',
                            propagateToSection: status === 'error',
                        }))),
                    },
                ],
            },
        ]);
    }
}
MainNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-main-nav',
                template: "<nav class=\"sidenav\" [clr-nav-level]=\"2\">\n    <section class=\"sidenav-content\">\n        <ng-container *ngFor=\"let section of navBuilderService.navMenuConfig$ | async\">\n            <section\n                class=\"nav-group\"\n                [attr.data-section-id]=\"section.id\"\n                [class.collapsible]=\"section.collapsible\"\n                *ngIf=\"shouldDisplayLink(section)\"\n            >\n                <vdr-ui-extension-point [locationId]=\"section.id\" api=\"navMenu\" [topPx]=\"-6\" [leftPx]=\"8\">\n                    <ng-container *ngIf=\"navBuilderService.sectionBadges[section.id] | async as sectionBadge\">\n                        <vdr-status-badge\n                            *ngIf=\"sectionBadge !== 'none'\"\n                            [type]=\"sectionBadge\"\n                        ></vdr-status-badge>\n                    </ng-container>\n                    <input [id]=\"section.id\" type=\"checkbox\" [checked]=\"section.collapsedByDefault\" />\n                    <label class=\"nav-group-header\" [for]=\"section.id\">{{ section.label | translate }}</label>\n                    <ul class=\"nav-list\">\n                        <ng-container *ngFor=\"let item of section.items\">\n                            <li *ngIf=\"shouldDisplayLink(item)\">\n                                <a\n                                    class=\"nav-link\"\n                                    [attr.data-item-id]=\"section.id\"\n                                    [routerLink]=\"getRouterLink(item)\"\n                                    routerLinkActive=\"active\"\n                                    (click)=\"item.onClick && item.onClick($event)\"\n                                >\n                                    <ng-container *ngIf=\"item.statusBadge | async as itemBadge\">\n                                        <vdr-status-badge\n                                            *ngIf=\"itemBadge.type !== 'none'\"\n                                            [type]=\"itemBadge.type\"\n                                        ></vdr-status-badge>\n                                    </ng-container>\n                                    <clr-icon [attr.shape]=\"item.icon || 'block'\" size=\"20\"></clr-icon>\n                                    {{ item.label | translate }}\n                                </a>\n                            </li>\n                        </ng-container>\n                    </ul>\n                </vdr-ui-extension-point>\n            </section>\n        </ng-container>\n    </section>\n</nav>\n",
                styles: [":host{order:-1;background-color:var(--clr-nav-background-color)}nav.sidenav{height:100%;border-right-color:var(--clr-sidenav-border-color)}.sidenav .nav-group .nav-list{margin:0}.sidenav .nav-group .nav-group-header{margin:0;line-height:1.2}.sidenav .nav-group .nav-link{display:inline-flex;line-height:1rem;padding-right:.6rem}.nav-list clr-icon{flex-shrink:0;margin-right:12px}.nav-group{-webkit-hyphens:auto;hyphens:auto}.nav-group,.nav-link{position:relative}.nav-group vdr-status-badge{left:10px;top:6px}.nav-link vdr-status-badge{left:25px;top:3px}\n"]
            },] }
];
MainNavComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: Router },
    { type: NavBuilderService },
    { type: HealthCheckService },
    { type: JobQueueService },
    { type: DataService }
];

class NotificationComponent {
    constructor() {
        this.offsetTop = 0;
        this.message = '';
        this.translationVars = {};
        this.type = 'info';
        this.isVisible = true;
        this.onClickFn = () => {
            /* */
        };
    }
    registerOnClickFn(fn) {
        this.onClickFn = fn;
    }
    onClick() {
        if (this.isVisible) {
            this.onClickFn();
        }
    }
    /**
     * Fade out the toast. When promise resolves, toast is invisible and
     * can be removed.
     */
    fadeOut() {
        this.isVisible = false;
        return new Promise(resolve => setTimeout(resolve, 1000));
    }
    /**
     * Returns the height of the toast element in px.
     */
    getHeight() {
        if (!this.wrapper) {
            return 0;
        }
        const el = this.wrapper.nativeElement;
        return el.getBoundingClientRect().height;
    }
    getIcon() {
        switch (this.type) {
            case 'info':
                return 'info-circle';
            case 'success':
                return 'check-circle';
            case 'error':
                return 'exclamation-circle';
            case 'warning':
                return 'exclamation-triangle';
        }
    }
    stringifyMessage(message) {
        if (typeof message === 'string') {
            return message;
        }
        else {
            return JSON.stringify(message, null, 2);
        }
    }
}
NotificationComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-notification',
                template: "<div\n    class=\"notification-wrapper\"\n    #wrapper\n    [style.top.px]=\"offsetTop\"\n    [ngClass]=\"{\n        visible: isVisible,\n        info: type === 'info',\n        success: type === 'success',\n        error: type === 'error',\n        warning: type === 'warning'\n    }\"\n>\n    <clr-icon [attr.shape]=\"getIcon()\" size=\"24\"></clr-icon>\n    {{ stringifyMessage(message) | translate: translationVars }}\n</div>\n",
                styles: ["@keyframes fadeIn{0%{opacity:0}to{opacity:.95}}:host{position:relative;z-index:1050}:host>.notification-wrapper{display:block;position:fixed;z-index:1001;top:0;right:10px;border-radius:3px;max-width:98vw;word-wrap:break-word;padding:10px;background-color:var(--color-grey-500);color:#fff;transition:opacity 1s,top .3s;opacity:0;white-space:pre-line}:host>.notification-wrapper.success{background-color:var(--color-success-500)}:host>.notification-wrapper.error{background-color:var(--color-error-500)}:host>.notification-wrapper.warning{background-color:var(--color-warning-500)}:host>.notification-wrapper.info{background-color:var(--color-secondary-500)}:host>.notification-wrapper.visible{opacity:.95;animation:fadeIn .3s .3s backwards}\n"]
            },] }
];
NotificationComponent.propDecorators = {
    wrapper: [{ type: ViewChild, args: ['wrapper', { static: true },] }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

/**
 * The OverlayHostComponent is a placeholder component which provides a location in the DOM into which overlay
 * elements (modals, notify notifications etc) may be injected dynamically.
 */
class OverlayHostComponent {
    constructor(viewContainerRef, overlayHostService) {
        overlayHostService.registerHostView(viewContainerRef);
    }
}
OverlayHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-overlay-host',
                template: '<!-- -->'
            },] }
];
OverlayHostComponent.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: OverlayHostService }
];

class ThemeSwitcherComponent {
    constructor(dataService, localStorageService) {
        this.dataService = dataService;
        this.localStorageService = localStorageService;
    }
    ngOnInit() {
        this.activeTheme$ = this.dataService.client.uiState().mapStream(data => data.uiState.theme);
    }
    toggleTheme(current) {
        const newTheme = current === 'default' ? 'dark' : 'default';
        this.dataService.client.setUiTheme(newTheme).subscribe(() => {
            this.localStorageService.set('activeTheme', newTheme);
        });
    }
}
ThemeSwitcherComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-theme-switcher',
                template: "<button *ngIf=\"activeTheme$ | async as activeTheme\" class=\"theme-toggle\" (click)=\"toggleTheme(activeTheme)\">\n    <span>{{ 'common.theme' | translate }}</span>\n    <div class=\"theme-icon default\" [class.active]=\"activeTheme === 'default'\">\n        <clr-icon shape=\"sun\" class=\"is-solid\"></clr-icon>\n    </div>\n    <div class=\"theme-icon dark\" [class.active]=\"activeTheme === 'dark'\">\n        <clr-icon shape=\"moon\" class=\"is-solid\"></clr-icon>\n    </div>\n</button>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-flex;justify-content:center;align-items:center}button.theme-toggle{position:relative;padding-left:20px;border:none;background:transparent;color:var(--clr-dropdown-item-color);cursor:pointer}.theme-icon{position:absolute;top:0px;left:6px;z-index:0;opacity:.2;color:var(--color-text-300);transition:opacity .3s,left .3s}.theme-icon.active{z-index:1;left:0px;opacity:1}.theme-icon.default.active{color:#d6ae3f}.theme-icon.dark.active{color:#ffdf3a}\n"]
            },] }
];
ThemeSwitcherComponent.ctorParameters = () => [
    { type: DataService },
    { type: LocalStorageService }
];

class UserMenuComponent {
    constructor() {
        this.userName = '';
        this.availableLanguages = [];
        this.logOut = new EventEmitter();
        this.selectUiLanguage = new EventEmitter();
    }
}
UserMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-user-menu',
                template: "<vdr-dropdown>\n    <button class=\"btn btn-link trigger\" vdrDropdownTrigger>\n        <span class=\"user-name\">{{ userName }}</span>\n        <clr-icon shape=\"user\" size=\"24\"></clr-icon>\n        <clr-icon shape=\"caret down\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n        <a [routerLink]=\"['/settings', 'profile']\" vdrDropdownItem>\n            <clr-icon shape=\"user\" class=\"is-solid\"></clr-icon> {{ 'settings.profile' | translate }}\n        </a>\n        <ng-container *ngIf=\"1 < availableLanguages.length\">\n            <button\n                type=\"button\"\n                vdrDropdownItem\n                (click)=\"selectUiLanguage.emit()\"\n                [title]=\"'common.select-display-language' | translate\"\n            >\n                <clr-icon shape=\"language\"></clr-icon> {{ uiLanguageAndLocale?.[0] | localeLanguageName }}\n            </button>\n        </ng-container>\n        <div class=\"dropdown-item\">\n            <vdr-theme-switcher></vdr-theme-switcher>\n        </div>\n        <div class=\"dropdown-divider\"></div>\n        <button type=\"button\" vdrDropdownItem (click)=\"logOut.emit()\">\n            <clr-icon shape=\"logout\"></clr-icon> {{ 'common.log-out' | translate }}\n        </button>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                styles: [":host{display:flex;align-items:center;margin:0 .5rem;height:2.5rem}.user-name{color:var(--color-grey-200);margin-right:12px}@media screen and (max-width: 768px){.user-name{display:none}}.trigger clr-icon{color:#fff}\n"]
            },] }
];
UserMenuComponent.propDecorators = {
    userName: [{ type: Input }],
    availableLanguages: [{ type: Input }],
    uiLanguageAndLocale: [{ type: Input }],
    logOut: [{ type: Output }],
    selectUiLanguage: [{ type: Output }]
};

// tslint:disable
const result = {
    "possibleTypes": {
        "AddFulfillmentToOrderResult": [
            "Fulfillment",
            "EmptyOrderLineSelectionError",
            "ItemsAlreadyFulfilledError",
            "InsufficientStockOnHandError",
            "InvalidFulfillmentHandlerError",
            "FulfillmentStateTransitionError",
            "CreateFulfillmentError"
        ],
        "AddManualPaymentToOrderResult": [
            "Order",
            "ManualPaymentStateError"
        ],
        "ApplyCouponCodeResult": [
            "Order",
            "CouponCodeExpiredError",
            "CouponCodeInvalidError",
            "CouponCodeLimitError"
        ],
        "AuthenticationResult": [
            "CurrentUser",
            "InvalidCredentialsError"
        ],
        "CancelOrderResult": [
            "Order",
            "EmptyOrderLineSelectionError",
            "QuantityTooGreatError",
            "MultipleOrderError",
            "CancelActiveOrderError",
            "OrderStateTransitionError"
        ],
        "CancelPaymentResult": [
            "Payment",
            "CancelPaymentError",
            "PaymentStateTransitionError"
        ],
        "CreateAssetResult": [
            "Asset",
            "MimeTypeError"
        ],
        "CreateChannelResult": [
            "Channel",
            "LanguageNotAvailableError"
        ],
        "CreateCustomerResult": [
            "Customer",
            "EmailAddressConflictError"
        ],
        "CreatePromotionResult": [
            "Promotion",
            "MissingConditionsError"
        ],
        "CustomField": [
            "BooleanCustomFieldConfig",
            "DateTimeCustomFieldConfig",
            "FloatCustomFieldConfig",
            "IntCustomFieldConfig",
            "LocaleStringCustomFieldConfig",
            "RelationCustomFieldConfig",
            "StringCustomFieldConfig",
            "TextCustomFieldConfig"
        ],
        "CustomFieldConfig": [
            "StringCustomFieldConfig",
            "LocaleStringCustomFieldConfig",
            "IntCustomFieldConfig",
            "FloatCustomFieldConfig",
            "BooleanCustomFieldConfig",
            "DateTimeCustomFieldConfig",
            "RelationCustomFieldConfig",
            "TextCustomFieldConfig"
        ],
        "ErrorResult": [
            "AlreadyRefundedError",
            "CancelActiveOrderError",
            "CancelPaymentError",
            "ChannelDefaultLanguageError",
            "CouponCodeExpiredError",
            "CouponCodeInvalidError",
            "CouponCodeLimitError",
            "CreateFulfillmentError",
            "EmailAddressConflictError",
            "EmptyOrderLineSelectionError",
            "FacetInUseError",
            "FulfillmentStateTransitionError",
            "IneligibleShippingMethodError",
            "InsufficientStockError",
            "InsufficientStockOnHandError",
            "InvalidCredentialsError",
            "InvalidFulfillmentHandlerError",
            "ItemsAlreadyFulfilledError",
            "LanguageNotAvailableError",
            "ManualPaymentStateError",
            "MimeTypeError",
            "MissingConditionsError",
            "MultipleOrderError",
            "NativeAuthStrategyError",
            "NegativeQuantityError",
            "NoActiveOrderError",
            "NoChangesSpecifiedError",
            "NothingToRefundError",
            "OrderLimitError",
            "OrderModificationError",
            "OrderModificationStateError",
            "OrderStateTransitionError",
            "PaymentMethodMissingError",
            "PaymentOrderMismatchError",
            "PaymentStateTransitionError",
            "ProductOptionInUseError",
            "QuantityTooGreatError",
            "RefundOrderStateError",
            "RefundPaymentIdMissingError",
            "RefundStateTransitionError",
            "SettlePaymentError",
            "ShopClosedError"
        ],
        "ModifyOrderResult": [
            "Order",
            "NoChangesSpecifiedError",
            "OrderModificationStateError",
            "PaymentMethodMissingError",
            "RefundPaymentIdMissingError",
            "OrderLimitError",
            "NegativeQuantityError",
            "InsufficientStockError",
            "CouponCodeExpiredError",
            "CouponCodeInvalidError",
            "CouponCodeLimitError"
        ],
        "NativeAuthenticationResult": [
            "CurrentUser",
            "InvalidCredentialsError",
            "NativeAuthStrategyError"
        ],
        "Node": [
            "Address",
            "Administrator",
            "Allocation",
            "Asset",
            "AuthenticationMethod",
            "Cancellation",
            "Channel",
            "Collection",
            "Country",
            "Customer",
            "CustomerGroup",
            "Facet",
            "FacetValue",
            "Fulfillment",
            "HistoryEntry",
            "Job",
            "Order",
            "OrderItem",
            "OrderLine",
            "OrderModification",
            "Payment",
            "PaymentMethod",
            "Product",
            "ProductOption",
            "ProductOptionGroup",
            "ProductVariant",
            "Promotion",
            "Refund",
            "Release",
            "Return",
            "Role",
            "Sale",
            "ShippingMethod",
            "StockAdjustment",
            "Surcharge",
            "Tag",
            "TaxCategory",
            "TaxRate",
            "User",
            "Zone"
        ],
        "PaginatedList": [
            "AdministratorList",
            "AssetList",
            "CollectionList",
            "CountryList",
            "CustomerGroupList",
            "CustomerList",
            "FacetList",
            "HistoryEntryList",
            "JobList",
            "OrderList",
            "PaymentMethodList",
            "ProductList",
            "ProductVariantList",
            "PromotionList",
            "RoleList",
            "ShippingMethodList",
            "TagList",
            "TaxRateList"
        ],
        "RefundOrderResult": [
            "Refund",
            "QuantityTooGreatError",
            "NothingToRefundError",
            "OrderStateTransitionError",
            "MultipleOrderError",
            "PaymentOrderMismatchError",
            "RefundOrderStateError",
            "AlreadyRefundedError",
            "RefundStateTransitionError"
        ],
        "RemoveFacetFromChannelResult": [
            "Facet",
            "FacetInUseError"
        ],
        "RemoveOptionGroupFromProductResult": [
            "Product",
            "ProductOptionInUseError"
        ],
        "RemoveOrderItemsResult": [
            "Order",
            "OrderModificationError"
        ],
        "SearchResultPrice": [
            "PriceRange",
            "SinglePrice"
        ],
        "SetCustomerForDraftOrderResult": [
            "Order",
            "EmailAddressConflictError"
        ],
        "SetOrderShippingMethodResult": [
            "Order",
            "OrderModificationError",
            "IneligibleShippingMethodError",
            "NoActiveOrderError"
        ],
        "SettlePaymentResult": [
            "Payment",
            "SettlePaymentError",
            "PaymentStateTransitionError",
            "OrderStateTransitionError"
        ],
        "SettleRefundResult": [
            "Refund",
            "RefundStateTransitionError"
        ],
        "StockMovement": [
            "Allocation",
            "Cancellation",
            "Release",
            "Return",
            "Sale",
            "StockAdjustment"
        ],
        "StockMovementItem": [
            "StockAdjustment",
            "Allocation",
            "Sale",
            "Cancellation",
            "Return",
            "Release"
        ],
        "TransitionFulfillmentToStateResult": [
            "Fulfillment",
            "FulfillmentStateTransitionError"
        ],
        "TransitionOrderToStateResult": [
            "Order",
            "OrderStateTransitionError"
        ],
        "TransitionPaymentToStateResult": [
            "Payment",
            "PaymentStateTransitionError"
        ],
        "UpdateChannelResult": [
            "Channel",
            "LanguageNotAvailableError"
        ],
        "UpdateCustomerResult": [
            "Customer",
            "EmailAddressConflictError"
        ],
        "UpdateGlobalSettingsResult": [
            "GlobalSettings",
            "ChannelDefaultLanguageError"
        ],
        "UpdateOrderItemsResult": [
            "Order",
            "ShopClosedError",
            "OrderModificationError",
            "OrderLimitError",
            "NegativeQuantityError",
            "InsufficientStockError"
        ],
        "UpdatePromotionResult": [
            "Promotion",
            "MissingConditionsError"
        ]
    }
};

// Allows the introspectionResult to be imported as a named symbol

/**
 * This link checks each operation and if it is a mutation, it tells the JobQueueService
 * to poll for active jobs. This is because certain mutations trigger background jobs
 * which should be made known in the UI.
 */
class CheckJobsLink extends ApolloLink {
    /**
     * We inject the Injector rather than the JobQueueService directly in order
     * to avoid a circular dependency error.
     */
    constructor(injector) {
        super((operation, forward) => {
            if (this.isMutation(operation)) {
                this.jobQueueService.checkForJobs();
            }
            return forward ? forward(operation) : null;
        });
        this.injector = injector;
    }
    get jobQueueService() {
        if (!this._jobQueueService) {
            this._jobQueueService = this.injector.get(JobQueueService);
        }
        return this._jobQueueService;
    }
    isMutation(operation) {
        return !!operation.query.definitions.find(d => d.kind === 'OperationDefinition' && d.operation === 'mutation');
    }
}

function getClientDefaults(localStorageService) {
    const currentLanguage = localStorageService.get('uiLanguageCode') || getDefaultUiLanguage();
    const currentLocale = localStorageService.get('uiLocale') || getDefaultUiLocale();
    const currentContentLanguage = localStorageService.get('contentLanguageCode') || getDefaultUiLanguage();
    const activeTheme = localStorageService.get('activeTheme') || 'default';
    return {
        networkStatus: {
            inFlightRequests: 0,
            __typename: 'NetworkStatus',
        },
        userStatus: {
            username: '',
            isLoggedIn: false,
            loginTime: '',
            activeChannelId: null,
            permissions: [],
            channels: [],
            __typename: 'UserStatus',
        },
        uiState: {
            language: currentLanguage,
            locale: currentLocale || '',
            contentLanguage: currentContentLanguage,
            theme: activeTheme,
            displayUiExtensionPoints: false,
            __typename: 'UiState',
        },
    };
}

const ɵ0$4 = (_, args, { cache }) => {
    return updateRequestsInFlight(cache, 1);
}, ɵ1 = (_, args, { cache }) => {
    return updateRequestsInFlight(cache, -1);
}, ɵ2 = (_, args, { cache }) => {
    const { input: { username, loginTime, channels, activeChannelId }, } = args;
    // tslint:disable-next-line:no-non-null-assertion
    const permissions = channels.find(c => c.id === activeChannelId).permissions;
    const data = {
        userStatus: {
            __typename: 'UserStatus',
            username,
            loginTime,
            isLoggedIn: true,
            permissions,
            channels,
            activeChannelId,
        },
    };
    cache.writeQuery({ query: GET_USER_STATUS, data });
    return data.userStatus;
}, ɵ3 = (_, args, { cache }) => {
    const data = {
        userStatus: {
            __typename: 'UserStatus',
            username: '',
            loginTime: '',
            isLoggedIn: false,
            permissions: [],
            channels: [],
            activeChannelId: null,
        },
    };
    cache.writeQuery({ query: GET_USER_STATUS, data });
    return data.userStatus;
}, ɵ4 = (_, args, { cache }) => {
    // tslint:disable-next-line:no-non-null-assertion
    const previous = cache.readQuery({ query: GET_UI_STATE });
    const data = updateUiState(previous, 'language', args.languageCode);
    cache.writeQuery({ query: GET_UI_STATE, data });
    return args.languageCode;
}, ɵ5 = (_, args, { cache }) => {
    var _a;
    // tslint:disable-next-line:no-non-null-assertion
    const previous = cache.readQuery({ query: GET_UI_STATE });
    const data = updateUiState(previous, 'locale', args.locale);
    cache.writeQuery({ query: GET_UI_STATE, data });
    return (_a = args.locale) !== null && _a !== void 0 ? _a : undefined;
}, ɵ6 = (_, args, { cache }) => {
    // tslint:disable-next-line:no-non-null-assertion
    const previous = cache.readQuery({ query: GET_UI_STATE });
    const data = updateUiState(previous, 'contentLanguage', args.languageCode);
    cache.writeQuery({ query: GET_UI_STATE, data });
    return args.languageCode;
}, ɵ7 = (_, args, { cache }) => {
    // tslint:disable-next-line:no-non-null-assertion
    const previous = cache.readQuery({ query: GET_UI_STATE });
    const data = updateUiState(previous, 'theme', args.theme);
    cache.writeQuery({ query: GET_UI_STATE, data });
    return args.theme;
}, ɵ8 = (_, args, { cache }) => {
    // tslint:disable-next-line:no-non-null-assertion
    const previous = cache.readQuery({ query: GET_UI_STATE });
    const data = updateUiState(previous, 'displayUiExtensionPoints', args.display);
    cache.writeQuery({ query: GET_UI_STATE, data });
    return args.display;
}, ɵ9 = (_, args, { cache }) => {
    // tslint:disable-next-line:no-non-null-assertion
    const previous = cache.readQuery({ query: GET_USER_STATUS });
    const activeChannel = previous.userStatus.channels.find(c => c.id === args.channelId);
    if (!activeChannel) {
        throw new Error('setActiveChannel: Could not find Channel with ID ' + args.channelId);
    }
    const permissions = activeChannel.permissions;
    const data = {
        userStatus: Object.assign(Object.assign({}, previous.userStatus), { permissions, activeChannelId: activeChannel.id }),
    };
    cache.writeQuery({ query: GET_USER_STATUS, data });
    return data.userStatus;
}, ɵ10 = (_, args, { cache }) => {
    // tslint:disable-next-line:no-non-null-assertion
    const previous = cache.readQuery({ query: GET_USER_STATUS });
    const data = {
        userStatus: Object.assign(Object.assign({}, previous.userStatus), { channels: Array.isArray(args.channels) ? args.channels : [args.channels] }),
    };
    cache.writeQuery({ query: GET_USER_STATUS, data });
    return data.userStatus;
};
const clientResolvers = {
    Mutation: {
        requestStarted: ɵ0$4,
        requestCompleted: ɵ1,
        setAsLoggedIn: ɵ2,
        setAsLoggedOut: ɵ3,
        setUiLanguage: ɵ4,
        setUiLocale: ɵ5,
        setContentLanguage: ɵ6,
        setUiTheme: ɵ7,
        setDisplayUiExtensionPoints: ɵ8,
        setActiveChannel: ɵ9,
        updateUserChannels: ɵ10,
    },
};
function updateUiState(previous, key, value) {
    return {
        uiState: Object.assign(Object.assign({}, previous.uiState), { [key]: value, __typename: 'UiState' }),
    };
}
function updateRequestsInFlight(cache, increment) {
    const previous = cache.readQuery({ query: GET_NEWTORK_STATUS });
    const inFlightRequests = previous ? previous.networkStatus.inFlightRequests + increment : increment;
    const data = {
        networkStatus: {
            __typename: 'NetworkStatus',
            inFlightRequests,
        },
    };
    cache.writeQuery({ query: GET_NEWTORK_STATUS, data });
    return inFlightRequests;
}

/**
 * The "__typename" property added by Apollo Client causes errors when posting the entity
 * back in a mutation. Therefore this link will remove all such keys before the object
 * reaches the API layer.
 *
 * See: https://github.com/apollographql/apollo-client/issues/1913#issuecomment-393721604
 */
class OmitTypenameLink extends ApolloLink {
    constructor() {
        super((operation, forward) => {
            if (operation.variables) {
                operation.variables = omit(operation.variables, ['__typename'], true);
            }
            return forward ? forward(operation) : null;
        });
    }
}

/**
 * An adapter that allows the Angular HttpClient to be used as a replacement for the global `fetch` function.
 * This is used to supply a custom fetch function to the apollo-upload-client whilst also allowing the
 * use of Angular's http infrastructure such as interceptors.
 */
class FetchAdapter {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.fetch = (input, init) => {
            const url = typeof input === 'string' ? input : input.url;
            const method = typeof input === 'string' ? (init.method ? init.method : 'GET') : input.method;
            return this.httpClient
                .request(method, url, {
                body: init.body,
                headers: init.headers,
                observe: 'response',
                responseType: 'json',
                withCredentials: true,
            })
                .toPromise()
                .then(result => {
                return new Response(JSON.stringify(result.body), {
                    status: result.status,
                    statusText: result.statusText,
                });
            });
        };
    }
}
FetchAdapter.decorators = [
    { type: Injectable }
];
FetchAdapter.ctorParameters = () => [
    { type: HttpClient }
];

// How many ms before the toast is dismissed.
const TOAST_DURATION = 3000;
/**
 * @description
 * Provides toast notification functionality.
 *
 * @example
 * ```TypeScript
 * class MyComponent {
 *   constructor(private notificationService: NotificationService) {}
 *
 *   save() {
 *     this.notificationService
 *         .success(_('asset.notify-create-assets-success'), {
 *           count: successCount,
 *         });
 *   }
 * }
 *
 * @docsCategory providers
 * @docsPage NotificationService
 * @docsWeight 0
 */
class NotificationService {
    constructor(i18nService, resolver, overlayHostService) {
        this.i18nService = i18nService;
        this.resolver = resolver;
        this.overlayHostService = overlayHostService;
        this.openToastRefs = [];
    }
    get hostView() {
        return this.overlayHostService.getHostView();
    }
    /**
     * @description
     * Display a success toast notification
     */
    success(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'success',
        });
    }
    /**
     * @description
     * Display an info toast notification
     */
    info(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'info',
        });
    }
    /**
     * @description
     * Display a warning toast notification
     */
    warning(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'warning',
        });
    }
    /**
     * @description
     * Display an error toast notification
     */
    error(message, translationVars) {
        this.notify({
            message,
            translationVars,
            type: 'error',
            duration: 20000,
        });
    }
    /**
     * @description
     * Display a toast notification.
     */
    notify(config) {
        this.createToast(config);
    }
    /**
     * Load a ToastComponent into the DOM host location.
     */
    createToast(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const toastFactory = this.resolver.resolveComponentFactory(NotificationComponent);
            const hostView = yield this.hostView;
            const ref = hostView.createComponent(toastFactory);
            const toast = ref.instance;
            const dismissFn = this.createDismissFunction(ref);
            toast.type = config.type || 'info';
            toast.message = config.message;
            toast.translationVars = this.translateTranslationVars(config.translationVars || {});
            toast.registerOnClickFn(dismissFn);
            let timerId;
            if (!config.duration || 0 < config.duration) {
                timerId = setTimeout(dismissFn, config.duration || TOAST_DURATION);
            }
            this.openToastRefs.unshift({ ref, timerId });
            setTimeout(() => this.calculatePositions());
        });
    }
    /**
     * Returns a function which will destroy the toast component and
     * remove it from the openToastRefs array.
     */
    createDismissFunction(ref) {
        return () => {
            const toast = ref.instance;
            const index = this.openToastRefs.map(o => o.ref).indexOf(ref);
            if (this.openToastRefs[index]) {
                clearTimeout(this.openToastRefs[index].timerId);
            }
            toast.fadeOut().then(() => {
                ref.destroy();
                this.openToastRefs.splice(index, 1);
                this.calculatePositions();
            });
        };
    }
    /**
     * Calculate and set the top offsets for each of the open toasts.
     */
    calculatePositions() {
        let cumulativeHeight = 10;
        this.openToastRefs.forEach(obj => {
            const toast = obj.ref.instance;
            toast.offsetTop = cumulativeHeight;
            cumulativeHeight += toast.getHeight() + 6;
        });
    }
    translateTranslationVars(translationVars) {
        for (const [key, val] of Object.entries(translationVars)) {
            if (typeof val === 'string') {
                translationVars[key] = this.i18nService.translate(val);
            }
        }
        return translationVars;
    }
}
NotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NotificationService_Factory() { return new NotificationService(i0.ɵɵinject(I18nService), i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(OverlayHostService)); }, token: NotificationService, providedIn: "root" });
NotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
NotificationService.ctorParameters = () => [
    { type: I18nService },
    { type: ComponentFactoryResolver },
    { type: OverlayHostService }
];

const AUTH_REDIRECT_PARAM = 'redirectTo';
/**
 * The default interceptor examines all HTTP requests & responses and automatically updates the requesting state
 * and shows error notifications.
 */
class DefaultInterceptor {
    constructor(dataService, injector, authService, router, localStorageService) {
        this.dataService = dataService;
        this.injector = injector;
        this.authService = authService;
        this.router = router;
        this.localStorageService = localStorageService;
        this.tokenMethod = 'cookie';
        this.tokenMethod = getAppConfig().tokenMethod;
        this.authTokenHeaderKey = getAppConfig().authTokenHeaderKey || DEFAULT_AUTH_TOKEN_HEADER_KEY;
    }
    intercept(req, next) {
        this.dataService.client.startRequest().subscribe();
        return this.dataService.client.uiState().single$.pipe(switchMap(({ uiState }) => {
            var _a;
            const request = req.clone({
                setParams: {
                    languageCode: (_a = uiState === null || uiState === void 0 ? void 0 : uiState.contentLanguage) !== null && _a !== void 0 ? _a : '',
                },
            });
            return next.handle(request);
        }), tap(event => {
            if (event instanceof HttpResponse) {
                this.checkForAuthToken(event);
                this.notifyOnError(event);
                this.dataService.client.completeRequest().subscribe();
            }
        }, err => {
            if (err instanceof HttpErrorResponse) {
                this.notifyOnError(err);
                this.dataService.client.completeRequest().subscribe();
            }
            else {
                this.displayErrorNotification(err.message);
            }
        }));
    }
    notifyOnError(response) {
        var _a, _b, _c;
        if (response instanceof HttpErrorResponse) {
            if (response.status === 0) {
                const { apiHost, apiPort } = getAppConfig();
                this.displayErrorNotification(marker(`error.could-not-connect-to-server`), {
                    url: `${apiHost}:${apiPort}`,
                });
            }
            else if (response.status === 503 && ((_a = response.url) === null || _a === void 0 ? void 0 : _a.endsWith('/health'))) {
                this.displayErrorNotification(marker(`error.health-check-failed`));
            }
            else {
                this.displayErrorNotification(this.extractErrorFromHttpResponse(response));
            }
        }
        else {
            // GraphQL errors still return 200 OK responses, but have the actual error message
            // inside the body of the response.
            const graqhQLErrors = response.body.errors;
            if (graqhQLErrors && Array.isArray(graqhQLErrors)) {
                const firstCode = (_c = (_b = graqhQLErrors[0]) === null || _b === void 0 ? void 0 : _b.extensions) === null || _c === void 0 ? void 0 : _c.code;
                if (firstCode === 'FORBIDDEN') {
                    this.authService.logOut().subscribe(() => {
                        if (!window.location.pathname.includes('login')) {
                            const path = graqhQLErrors[0].path.join(' > ');
                            this.displayErrorNotification(marker(`error.403-forbidden`), { path });
                        }
                        this.router.navigate(['/login'], {
                            queryParams: {
                                [AUTH_REDIRECT_PARAM]: btoa(this.router.url),
                            },
                        });
                    });
                }
                else if (firstCode === 'CHANNEL_NOT_FOUND') {
                    const message = graqhQLErrors.map(err => err.message).join('\n');
                    this.displayErrorNotification(message);
                    this.localStorageService.remove('activeChannelToken');
                }
                else {
                    const message = graqhQLErrors.map(err => err.message).join('\n');
                    this.displayErrorNotification(message);
                }
            }
        }
    }
    extractErrorFromHttpResponse(response) {
        const errors = response.error.errors;
        if (Array.isArray(errors)) {
            return errors.map(e => e.message).join('\n');
        }
        else {
            return response.message;
        }
    }
    /**
     * We need to lazily inject the NotificationService since it depends on the I18nService which
     * eventually depends on the HttpClient (used to load messages from json files). If we were to
     * directly inject NotificationService into the constructor, we get a cyclic dependency.
     */
    displayErrorNotification(message, vars) {
        const notificationService = this.injector.get(NotificationService);
        notificationService.error(message, vars);
    }
    /**
     * If the server is configured to use the "bearer" tokenMethod, each response should be checked
     * for the existence of an auth token.
     */
    checkForAuthToken(response) {
        if (this.tokenMethod === 'bearer') {
            const authToken = response.headers.get(this.authTokenHeaderKey);
            if (authToken) {
                this.localStorageService.set('authToken', authToken);
            }
        }
    }
}
DefaultInterceptor.decorators = [
    { type: Injectable }
];
DefaultInterceptor.ctorParameters = () => [
    { type: DataService },
    { type: Injector },
    { type: AuthService },
    { type: Router },
    { type: LocalStorageService }
];

function createApollo(localStorageService, fetchAdapter, injector) {
    const { adminApiPath, tokenMethod } = getAppConfig();
    const serverLocation = getServerLocation();
    const apolloCache = new InMemoryCache({
        possibleTypes: result.possibleTypes,
        typePolicies: {
            GlobalSettings: {
                fields: {
                    serverConfig: {
                        merge: (existing, incoming) => (Object.assign(Object.assign({}, existing), incoming)),
                    },
                },
            },
        },
    });
    apolloCache.writeQuery({
        query: GET_CLIENT_STATE,
        data: getClientDefaults(localStorageService),
    });
    if (!false) {
        // TODO: enable only for dev mode
        // make the Apollo Cache inspectable in the console for debug purposes
        window['apolloCache'] = apolloCache;
    }
    return {
        link: ApolloLink$1.from([
            new OmitTypenameLink(),
            new CheckJobsLink(injector),
            setContext(() => {
                const headers = {};
                const channelToken = localStorageService.get('activeChannelToken');
                if (channelToken) {
                    headers['vendure-token'] = channelToken;
                }
                if (tokenMethod === 'bearer') {
                    const authToken = localStorageService.get('authToken');
                    if (authToken) {
                        headers.authorization = `Bearer ${authToken}`;
                    }
                }
                return { headers };
            }),
            createUploadLink({
                uri: `${serverLocation}/${adminApiPath}`,
                fetch: fetchAdapter.fetch,
            }),
        ]),
        cache: apolloCache,
        resolvers: clientResolvers,
    };
}
const ɵ0$3 = initializeServerConfigService;
/**
 * The DataModule is responsible for all API calls *and* serves as the source of truth for global app
 * state via the apollo-link-state package.
 */
class DataModule {
}
DataModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule],
                exports: [],
                declarations: [],
                providers: [
                    BaseDataService,
                    DataService,
                    FetchAdapter,
                    ServerConfigService,
                    {
                        provide: APOLLO_OPTIONS,
                        useFactory: createApollo,
                        deps: [LocalStorageService, FetchAdapter, Injector],
                    },
                    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
                    {
                        provide: APP_INITIALIZER,
                        multi: true,
                        useFactory: ɵ0$3,
                        deps: [ServerConfigService],
                    },
                ],
            },] }
];

/**
 * A loader for ngx-translate which extends the HttpLoader functionality by stripping out any
 * values which are empty strings. This means that during development, translation keys which have
 * been extracted but not yet defined will fall back to the raw key text rather than displaying nothing.
 *
 * Originally from https://github.com/ngx-translate/core/issues/662#issuecomment-377010232
 */
class CustomHttpTranslationLoader {
    constructor(http, prefix = '/assets/i18n/', suffix = '.json') {
        this.http = http;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    getTranslation(lang) {
        return this.http
            .get(`${this.prefix}${lang}${this.suffix}`)
            .pipe(map((res) => this.process(res)));
    }
    process(object) {
        const newObject = {};
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                const value = object[key];
                if (typeof value !== 'string') {
                    newObject[key] = this.process(value);
                }
                else if (typeof value === 'string' && value === '') {
                    // do not copy empty strings
                }
                else {
                    newObject[key] = object[key];
                }
            }
        }
        return newObject;
    }
}

/* tslint:disable:no-console */
/**
 * Work-around for Angular 9 compat.
 * See https://github.com/lephyrus/ngx-translate-messageformat-compiler/issues/53#issuecomment-583677994
 *
 * Also logs errors which would otherwise get swallowed by ngx-translate. This is important
 * because it is quite easy to make errors in messageformat syntax, and without clear
 * error messages it's very hard to debug.
 */
class InjectableTranslateMessageFormatCompiler extends TranslateMessageFormatCompiler {
    compileTranslations(value, lang) {
        try {
            return super.compileTranslations(value, lang);
        }
        catch (e) {
            console.error(`There was an error with the ${lang} translations:`);
            console.log(e);
            console.log(`Check the messageformat docs: https://messageformat.github.io/messageformat/page-guide`);
        }
    }
}
InjectableTranslateMessageFormatCompiler.ɵprov = i0.ɵɵdefineInjectable({ factory: function InjectableTranslateMessageFormatCompiler_Factory() { return new InjectableTranslateMessageFormatCompiler(i0.ɵɵinject(i1$3.MESSAGE_FORMAT_CONFIG, 8)); }, token: InjectableTranslateMessageFormatCompiler, providedIn: "root" });
InjectableTranslateMessageFormatCompiler.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];

class ComponentRegistryService {
    constructor() {
        this.inputComponentMap = new Map();
    }
    registerInputComponent(id, component) {
        if (this.inputComponentMap.has(id)) {
            throw new Error(`Cannot register an InputComponent with the id "${id}", as one with that id already exists`);
        }
        this.inputComponentMap.set(id, component);
    }
    getInputComponent(id) {
        return this.inputComponentMap.get(id);
    }
}
ComponentRegistryService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ComponentRegistryService_Factory() { return new ComponentRegistryService(); }, token: ComponentRegistryService, providedIn: "root" });
ComponentRegistryService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

/**
 * This service allows the registration of custom controls for customFields.
 *
 * @deprecated The ComponentRegistryService now handles custom field components directly.
 */
class CustomFieldComponentService {
    constructor(componentRegistryService) {
        this.componentRegistryService = componentRegistryService;
    }
    /**
     * Register a CustomFieldControl component to be used with the specified customField and entity.
     */
    registerCustomFieldComponent(entity, fieldName, component) {
        const id = this.generateId(entity, fieldName, true);
        this.componentRegistryService.registerInputComponent(id, component);
    }
    /**
     * Checks whether a custom component is registered for the given entity custom field,
     * and if so returns the ID of that component.
     */
    customFieldComponentExists(entity, fieldName) {
        const id = this.generateId(entity, fieldName, true);
        return this.componentRegistryService.getInputComponent(id) ? id : undefined;
    }
    generateId(entity, fieldName, isCustomField) {
        let id = entity;
        if (isCustomField) {
            id += '-customFields';
        }
        id += '-' + fieldName;
        return id;
    }
}
CustomFieldComponentService.ɵprov = i0.ɵɵdefineInjectable({ factory: function CustomFieldComponentService_Factory() { return new CustomFieldComponentService(i0.ɵɵinject(ComponentRegistryService)); }, token: CustomFieldComponentService, providedIn: "root" });
CustomFieldComponentService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
CustomFieldComponentService.ctorParameters = () => [
    { type: ComponentRegistryService }
];

/**
 * @description
 * A checkbox input. The default input component for `boolean` fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class BooleanFormInputComponent {
}
BooleanFormInputComponent.id = 'boolean-form-input';
BooleanFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-boolean-form-input',
                template: "<clr-checkbox-wrapper>\n    <input\n        type=\"checkbox\"\n        clrCheckbox\n        [formControl]=\"formControl\"\n        [vdrDisabled]=\"!!readonly\"\n    />\n</clr-checkbox-wrapper>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];

class BaseCodeEditorFormInputComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.isValid = true;
    }
    get height() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.height) || this.config.height;
    }
    configure(config) {
        this.formControl.addValidators(config.validator);
        this.highlight = config.highlight;
        this.getErrorMessage = config.getErrorMessage;
    }
    ngAfterViewInit() {
        let lastVal = '';
        const highlight = (editor) => {
            var _a;
            const code = (_a = editor.textContent) !== null && _a !== void 0 ? _a : '';
            if (code === lastVal) {
                return;
            }
            lastVal = code;
            this.errorMessage = this.getErrorMessage(code);
            this.changeDetector.markForCheck();
            editor.innerHTML = this.highlight(code, this.getErrorPos(this.errorMessage));
        };
        this.jar = CodeJar(this.editorElementRef.nativeElement, highlight);
        this.jar.onUpdate(value => {
            this.formControl.setValue(value);
            this.formControl.markAsDirty();
            this.isValid = this.formControl.valid;
        });
        this.jar.updateCode(this.formControl.value);
        if (this.readonly) {
            this.editorElementRef.nativeElement.contentEditable = 'false';
        }
    }
    getErrorPos(errorMessage) {
        if (!errorMessage) {
            return;
        }
        const matches = errorMessage.match(/at position (\d+)/);
        const pos = matches === null || matches === void 0 ? void 0 : matches[1];
        return pos != null ? +pos : undefined;
    }
}
BaseCodeEditorFormInputComponent.decorators = [
    { type: Directive }
];
BaseCodeEditorFormInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
BaseCodeEditorFormInputComponent.propDecorators = {
    editorElementRef: [{ type: ViewChild, args: ['editor',] }]
};

function htmlValidator() {
    return (control) => {
        return null;
    };
}
const HTML_TAG_RE = /<\/?[^>]+>?/g;
/**
 * @description
 * A JSON editor input with syntax highlighting and error detection. Works well
 * with `text` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class HtmlEditorFormInputComponent extends BaseCodeEditorFormInputComponent {
    constructor(changeDetector) {
        super(changeDetector);
        this.changeDetector = changeDetector;
    }
    ngOnInit() {
        this.configure({
            validator: htmlValidator,
            highlight: (html, errorPos) => {
                let hasMarkedError = false;
                return html.replace(HTML_TAG_RE, (match, ...args) => {
                    let errorClass = '';
                    if (errorPos && !hasMarkedError) {
                        const length = args[0].length;
                        const offset = args[4];
                        if (errorPos <= length + offset) {
                            errorClass = 'je-error';
                            hasMarkedError = true;
                        }
                    }
                    return ('<span class="he-tag' +
                        ' ' +
                        errorClass +
                        '">' +
                        this.encodeHtmlChars(match).replace(/([a-zA-Z0-9-]+=)(["'][^'"]*["'])/g, (_match, ..._args) => `${_args[0]}<span class="he-attr">${_args[1]}</span>`) +
                        '</span>');
                });
            },
            getErrorMessage: (json) => {
                return;
            },
        });
    }
    encodeHtmlChars(html) {
        return html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}
HtmlEditorFormInputComponent.id = 'html-editor-form-input';
HtmlEditorFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-html-editor-form-input',
                template: "<div #editor class=\"code-editor html-editor\" [class.invalid]=\"!isValid\" [style.height]=\"height || '300px'\"></div>\n<div class=\"error-message\">\n    <span *ngIf=\"errorMessage\">{{ errorMessage }}</span>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".code-editor{min-height:6rem;background-color:var(--color-json-editor-background-color);color:var(--color-json-editor-text);border:1px solid var(--color-component-border-200);border-radius:3px;padding:6px;-moz-tab-size:4;tab-size:4;font-family:\"Source Code Pro\",\"Lucida Console\",Monaco,monospace;font-size:14px;font-weight:400;height:340px;letter-spacing:normal;line-height:20px;resize:both;text-align:initial;min-width:200px}.code-editor:focus{border-color:var(--color-primary-500)}.code-editor.invalid{border-color:var(--clr-forms-invalid-color)}.error-message{min-height:1rem;color:var(--color-json-editor-error)}.code-editor ::ng-deep .he-tag{color:var(--color-json-editor-key)}.code-editor ::ng-deep .he-attr{color:var(--color-json-editor-number)}.code-editor ::ng-deep .he-error{-webkit-text-decoration-line:underline;text-decoration-line:underline;-webkit-text-decoration-style:wavy;text-decoration-style:wavy;-webkit-text-decoration-color:var(--color-json-editor-error);text-decoration-color:var(--color-json-editor-error)}\n"]
            },] }
];
HtmlEditorFormInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

function jsonValidator() {
    return (control) => {
        const error = { jsonInvalid: true };
        try {
            JSON.parse(control.value);
        }
        catch (e) {
            control.setErrors(error);
            return error;
        }
        control.setErrors(null);
        return null;
    };
}
/**
 * @description
 * A JSON editor input with syntax highlighting and error detection. Works well
 * with `text` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class JsonEditorFormInputComponent extends BaseCodeEditorFormInputComponent {
    constructor(changeDetector) {
        super(changeDetector);
        this.changeDetector = changeDetector;
    }
    ngOnInit() {
        this.configure({
            validator: jsonValidator,
            highlight: (json, errorPos) => {
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                let hasMarkedError = false;
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match, ...args) => {
                    let cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        }
                        else {
                            cls = 'string';
                        }
                    }
                    else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    }
                    else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    let errorClass = '';
                    if (errorPos && !hasMarkedError) {
                        const length = args[0].length;
                        const offset = args[4];
                        if (errorPos <= length + offset) {
                            errorClass = 'je-error';
                            hasMarkedError = true;
                        }
                    }
                    return '<span class="je-' + cls + ' ' + errorClass + '">' + match + '</span>';
                });
            },
            getErrorMessage: (json) => {
                try {
                    JSON.parse(json);
                }
                catch (e) {
                    return e.message;
                }
                return;
            },
        });
    }
}
JsonEditorFormInputComponent.id = 'json-editor-form-input';
JsonEditorFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-json-editor-form-input',
                template: "<div #editor class=\"code-editor json-editor\" [class.invalid]=\"!isValid\" [style.height]=\"height || '300px'\"></div>\n<div class=\"error-message\">\n    <span *ngIf=\"errorMessage\">{{ errorMessage }}</span>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".code-editor{min-height:6rem;background-color:var(--color-json-editor-background-color);color:var(--color-json-editor-text);border:1px solid var(--color-component-border-200);border-radius:3px;padding:6px;-moz-tab-size:4;tab-size:4;font-family:\"Source Code Pro\",\"Lucida Console\",Monaco,monospace;font-size:14px;font-weight:400;height:340px;letter-spacing:normal;line-height:20px;resize:both;text-align:initial;min-width:200px}.code-editor:focus{border-color:var(--color-primary-500)}.code-editor.invalid{border-color:var(--clr-forms-invalid-color)}.error-message{min-height:1rem;color:var(--color-json-editor-error)}.code-editor ::ng-deep .je-string{color:var(--color-json-editor-string)}.code-editor ::ng-deep .je-number{color:var(--color-json-editor-number)}.code-editor ::ng-deep .je-boolean{color:var(--color-json-editor-boolean)}.code-editor ::ng-deep .je-null{color:var(--color-json-editor-null)}.code-editor ::ng-deep .je-key{color:var(--color-json-editor-key)}.code-editor ::ng-deep .je-error{-webkit-text-decoration-line:underline;text-decoration-line:underline;-webkit-text-decoration-style:wavy;text-decoration-style:wavy;-webkit-text-decoration-color:var(--color-json-editor-error);text-decoration-color:var(--color-json-editor-error)}\n"]
            },] }
];
JsonEditorFormInputComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * ConfigArg values are always stored as strings. If they are not primitives, then
 * they are JSON-encoded. This function unwraps them back into their original
 * data type.
 */
function getConfigArgValue(value) {
    try {
        return value != null ? JSON.parse(value) : undefined;
    }
    catch (e) {
        return value;
    }
}
function encodeConfigArgValue(value) {
    return Array.isArray(value) ? JSON.stringify(value) : (value !== null && value !== void 0 ? value : '').toString();
}
/**
 * Creates an empty ConfigurableOperation object based on the definition.
 */
function configurableDefinitionToInstance(def) {
    return Object.assign(Object.assign({}, def), { args: def.args.map(arg => {
            return Object.assign(Object.assign({}, arg), { value: getDefaultConfigArgValue(arg) });
        }) });
}
/**
 * Converts an object of the type:
 * ```
 * {
 *     code: 'my-operation',
 *     args: {
 *         someProperty: 'foo'
 *     }
 * }
 * ```
 * to the format defined by the ConfigurableOperationInput GraphQL input type:
 * ```
 * {
 *     code: 'my-operation',
 *     arguments: [
 *         { name: 'someProperty', value: 'foo' }
 *     ]
 * }
 * ```
 */
function toConfigurableOperationInput(operation, formValueOperations) {
    const argsArray = Array.isArray(formValueOperations.args) ? formValueOperations.args : undefined;
    const argsMap = !Array.isArray(formValueOperations.args) ? formValueOperations.args : undefined;
    return {
        code: operation.code,
        arguments: operation.args.map(({ name, value }, j) => {
            var _a, _b;
            const formValue = (_b = (_a = argsArray === null || argsArray === void 0 ? void 0 : argsArray.find(arg => arg.name === name)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : argsMap === null || argsMap === void 0 ? void 0 : argsMap[name];
            if (formValue == null) {
                throw new Error(`Cannot find an argument value for the key "${name}"`);
            }
            return {
                name,
                value: (formValue === null || formValue === void 0 ? void 0 : formValue.hasOwnProperty('value'))
                    ? encodeConfigArgValue(formValue.value)
                    : encodeConfigArgValue(formValue),
            };
        }),
    };
}
function configurableOperationValueIsValid(def, value) {
    if (!def || !value) {
        return false;
    }
    if (def.code !== value.code) {
        return false;
    }
    for (const argDef of def.args) {
        const argVal = value.args[argDef.name];
        if (argDef.required && (argVal == null || argVal === '' || argVal === '0')) {
            return false;
        }
    }
    return true;
}
/**
 * Returns a default value based on the type of the config arg.
 */
function getDefaultConfigArgValue(arg) {
    if (arg.list) {
        return [];
    }
    if (arg.defaultValue != null) {
        return arg.defaultValue;
    }
    const type = arg.type;
    switch (type) {
        case 'string':
        case 'datetime':
        case 'float':
        case 'ID':
        case 'int':
            return null;
        case 'boolean':
            return false;
        default:
            assertNever(type);
    }
}

/**
 * Interpolates the description of an ConfigurableOperation with the given values.
 */
function interpolateDescription(operation, values) {
    if (!operation) {
        return '';
    }
    const templateString = operation.description;
    const interpolated = templateString.replace(/{\s*([a-zA-Z0-9]+)\s*}/gi, (substring, argName) => {
        const normalizedArgName = argName.toLowerCase();
        const value = values[normalizedArgName];
        if (value == null) {
            return '_';
        }
        let formatted = value;
        const argDef = operation.args.find(arg => arg.name === normalizedArgName);
        if (argDef && argDef.type === 'int' && argDef.ui && argDef.ui.component === 'currency-form-input') {
            formatted = value / 100;
        }
        if (argDef && argDef.type === 'datetime' && value instanceof Date) {
            formatted = value.toLocaleDateString();
        }
        return formatted;
    });
    return interpolated;
}

/**
 * A form input which renders a card with the internal form fields of the given ConfigurableOperation.
 */
class ConfigurableInputComponent {
    constructor() {
        this.readonly = false;
        this.removable = true;
        this.position = 0;
        this.remove = new EventEmitter();
        this.argValues = {};
        this.form = new FormGroup({});
        this.positionChangeSubject = new BehaviorSubject(0);
    }
    interpolateDescription() {
        if (this.operationDefinition) {
            return interpolateDescription(this.operationDefinition, this.form.value);
        }
        else {
            return '';
        }
    }
    ngOnInit() {
        this.positionChange$ = this.positionChangeSubject.asObservable();
    }
    ngOnChanges(changes) {
        if ('operation' in changes || 'operationDefinition' in changes) {
            this.createForm();
        }
        if ('position' in changes) {
            this.positionChangeSubject.next(this.position);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.form.disable();
        }
        else {
            this.form.enable();
        }
    }
    writeValue(value) {
        if (value) {
            this.form.patchValue(value);
        }
    }
    trackByName(index, arg) {
        return arg.name;
    }
    getArgDef(arg) {
        var _a;
        return (_a = this.operationDefinition) === null || _a === void 0 ? void 0 : _a.args.find(a => a.name === arg.name);
    }
    createForm() {
        var _a, _b;
        if (!this.operation) {
            return;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.form = new FormGroup({});
        this.form.__id = Math.random().toString(36).substr(10);
        if (this.operation.args) {
            for (const arg of ((_a = this.operationDefinition) === null || _a === void 0 ? void 0 : _a.args) || []) {
                let value = (_b = this.operation.args.find(a => a.name === arg.name)) === null || _b === void 0 ? void 0 : _b.value;
                if (value === undefined) {
                    value = getDefaultConfigArgValue(arg);
                }
                const validators = arg.list ? undefined : arg.required ? Validators.required : undefined;
                this.form.addControl(arg.name, new FormControl(value, validators));
            }
        }
        this.subscription = this.form.valueChanges.subscribe(value => {
            if (this.onChange) {
                this.onChange({
                    code: this.operation && this.operation.code,
                    args: value,
                });
            }
            if (this.onTouch) {
                this.onTouch();
            }
        });
    }
    validate(c) {
        if (this.form.invalid) {
            return {
                required: true,
            };
        }
        return null;
    }
}
ConfigurableInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-configurable-input',
                template: "<div class=\"card\" *ngIf=\"operation\">\n    <div class=\"card-block\">{{ interpolateDescription() }}</div>\n    <div class=\"card-block\" *ngIf=\"operation.args?.length\">\n        <form [formGroup]=\"form\" *ngIf=\"operation\" class=\"operation-inputs\">\n            <div *ngFor=\"let arg of operation.args; trackBy: trackByName\" class=\"arg-row\">\n                <ng-container *ngIf=\"form.get(arg.name) && getArgDef(arg) as argDef\">\n                    <label class=\"clr-control-label\">{{ argDef.label || (arg.name | sentenceCase) }}</label>\n                    <vdr-help-tooltip\n                        class=\"mr3\"\n                        *ngIf=\"argDef.description\"\n                        [content]=\"argDef.description\"\n                    ></vdr-help-tooltip>\n                    <vdr-dynamic-form-input\n                        [def]=\"getArgDef(arg)\"\n                        [readonly]=\"readonly\"\n                        [control]=\"form.get(arg.name)\"\n                        [formControlName]=\"arg.name\"\n                    ></vdr-dynamic-form-input>\n                </ng-container>\n            </div>\n        </form>\n    </div>\n    <div class=\"card-footer\" *ngIf=\"!readonly && removable\">\n        <button class=\"btn btn-sm btn-link btn-warning\" (click)=\"remove.emit(operation)\">\n            <clr-icon shape=\"times\"></clr-icon>\n            {{ 'common.remove' | translate }}\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: ConfigurableInputComponent,
                        multi: true,
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(() => ConfigurableInputComponent),
                        multi: true,
                    },
                ],
                styles: [":host{display:block;margin-bottom:12px}:host>.card{margin-top:6px}.operation-inputs{padding-top:0}.operation-inputs .arg-row:not(:last-child){margin-bottom:12px}.operation-inputs .arg-row{display:flex;flex-wrap:wrap;align-items:center}.operation-inputs .arg-row label{margin-right:6px}.operation-inputs .hidden{display:none}.operation-inputs label{min-width:130px;display:inline-block}\n"]
            },] }
];
ConfigurableInputComponent.propDecorators = {
    operation: [{ type: Input }],
    operationDefinition: [{ type: Input }],
    readonly: [{ type: Input }],
    removable: [{ type: Input }],
    position: [{ type: Input }],
    remove: [{ type: Output }]
};

/**
 * @description
 * A special input used to display the "Combination mode" AND/OR toggle.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class CombinationModeFormInputComponent {
    constructor(configurableInputComponent) {
        this.configurableInputComponent = configurableInputComponent;
    }
    ngOnInit() {
        const selectable$ = this.configurableInputComponent
            ? this.configurableInputComponent.positionChange$.pipe(map(position => 0 < position))
            : of(true);
        this.selectable$ = selectable$.pipe(tap(selectable => {
            if (!selectable) {
                this.formControl.setValue(true, { emitEvent: false });
            }
        }));
    }
    setCombinationModeAnd() {
        this.formControl.setValue(true);
    }
    setCombinationModeOr() {
        this.formControl.setValue(false);
    }
}
CombinationModeFormInputComponent.id = 'combination-mode-form-input';
CombinationModeFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-combination-mode-form-input',
                template: "<ng-container *ngIf=\"selectable$ | async; else default\">\n    <div class=\"btn-group btn-outline-primary btn-sm mode-select\">\n        <button\n            class=\"btn\"\n            (click)=\"setCombinationModeAnd()\"\n            [class.btn-primary]=\"formControl.value === true\"\n        >\n            {{ 'common.boolean-and' | translate }}\n        </button>\n        <button\n            class=\"btn\"\n            (click)=\"setCombinationModeOr()\"\n            [class.btn-primary]=\"formControl.value === false\"\n        >\n            {{ 'common.boolean-or' | translate }}\n        </button>\n    </div>\n</ng-container>\n<ng-template #default>\n    <small>{{ 'common.not-applicable' | translate }}</small>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mode-select{text-transform:uppercase}\n"]
            },] }
];
CombinationModeFormInputComponent.ctorParameters = () => [
    { type: ConfigurableInputComponent, decorators: [{ type: Optional }] }
];

/**
 * @description
 * An input for monetary values. Should be used with `int` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class CurrencyFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.currencyCode$ = this.dataService.settings
            .getActiveChannel()
            .mapStream(data => data.activeChannel.currencyCode);
    }
}
CurrencyFormInputComponent.id = 'currency-form-input';
CurrencyFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-currency-form-input',
                template: "<vdr-currency-input\n    [formControl]=\"formControl\"\n    [readonly]=\"readonly\"\n    [currencyCode]=\"currencyCode$ | async\"\n></vdr-currency-input>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CurrencyFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
CurrencyFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};

/**
 * @description
 * Allows the selection of a Customer via an autocomplete select input.
 * Should be used with `ID` type fields which represent Customer IDs.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class CustomerGroupFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.customerGroups$ = this.dataService.customer
            .getCustomerGroupList({
            take: 1000,
        })
            .mapSingle(res => res.customerGroups.items)
            .pipe(startWith([]));
    }
    selectGroup(group) {
        this.formControl.setValue(group.id);
    }
}
CustomerGroupFormInputComponent.id = 'customer-group-form-input';
CustomerGroupFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-group-form-input',
                template: "<ng-select\n    [items]=\"customerGroups$ | async\"\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"false\"\n    bindValue=\"id\"\n    [clearable]=\"true\"\n    [searchable]=\"false\"\n    [ngModel]=\"formControl.value\"\n    (change)=\"selectGroup($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-chip [colorFrom]=\"item.id\">{{ item.name }}</vdr-chip>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CustomerGroupFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
CustomerGroupFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};

/**
 * @description
 * Allows selection of a datetime. Default input for `datetime` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class DateFormInputComponent {
    get min() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.min) || this.config.min;
    }
    get max() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.max) || this.config.max;
    }
    get yearRange() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.yearRange) || this.config.yearRange;
    }
}
DateFormInputComponent.id = 'date-form-input';
DateFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-date-form-input',
                template: "<vdr-datetime-picker\n    [formControl]=\"formControl\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [yearRange]=\"yearRange\"\n    [readonly]=\"readonly\"\n>\n</vdr-datetime-picker>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
DateFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};

/**
 * @description
 * Allows the selection of multiple FacetValues via an autocomplete select input.
 * Should be used with `ID` type **list** fields which represent FacetValue IDs.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class FacetValueFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.isListInput = true;
        this.valueTransformFn = (values) => {
            const isUsedInConfigArg = this.config.__typename === 'ConfigArgDefinition';
            if (isUsedInConfigArg) {
                return JSON.stringify(values.map(s => s.id));
            }
            else {
                return values;
            }
        };
    }
    ngOnInit() {
        this.facets$ = this.dataService.facet
            .getAllFacets()
            .mapSingle(data => data.facets.items)
            .pipe(shareReplay(1));
    }
}
FacetValueFormInputComponent.id = 'facet-value-form-input';
FacetValueFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-value-form-input',
                template: "<vdr-facet-value-selector\n    *ngIf=\"facets$ | async as facets\"\n    [readonly]=\"readonly\"\n    [facets]=\"facets\"\n    [formControl]=\"formControl\"\n    [transformControlValueAccessorValue]=\"valueTransformFn\"\n></vdr-facet-value-selector>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
FacetValueFormInputComponent.ctorParameters = () => [
    { type: DataService }
];

/**
 * @description
 * Displays a number input. Default input for `int` and `float` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class NumberFormInputComponent {
    get prefix() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.prefix) || this.config.prefix;
    }
    get suffix() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.suffix) || this.config.suffix;
    }
    get min() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.min) || this.config.min;
    }
    get max() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.max) || this.config.max;
    }
    get step() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.step) || this.config.step;
    }
}
NumberFormInputComponent.id = 'number-form-input';
NumberFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-number-form-input',
                template: "<vdr-affixed-input\n    [suffix]=\"suffix\"\n    [prefix]=\"prefix\"\n>\n    <input\n        type=\"number\"\n        [readonly]=\"readonly\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [step]=\"step\"\n        [formControl]=\"formControl\"\n    />\n</vdr-affixed-input>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
NumberFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};

/**
 * @description
 * Displays a password text input. Should be used with `string` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class PasswordFormInputComponent {
}
PasswordFormInputComponent.id = 'password-form-input';
PasswordFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-password-form-input',
                template: "<input\n    type=\"password\"\n    [readonly]=\"readonly\"\n    [formControl]=\"formControl\"\n/>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];

/**
 * @description
 * A helper class used to manage selection of list items. Supports multiple selection via
 * cmd/ctrl/shift key.
 */
class SelectionManager {
    constructor(options) {
        this.options = options;
        this._selection = [];
        this.items = [];
        this.selectionChangesSubject = new Subject();
        this.selectionChanges$ = this.selectionChangesSubject.asObservable();
    }
    get selection() {
        return this._selection;
    }
    setMultiSelect(isMultiSelect) {
        this.options.multiSelect = isMultiSelect;
    }
    setCurrentItems(items) {
        this.items = items;
    }
    toggleSelection(item, event) {
        const { multiSelect, itemsAreEqual, additiveMode } = this.options;
        const index = this._selection.findIndex(a => itemsAreEqual(a, item));
        if (multiSelect && (event === null || event === void 0 ? void 0 : event.shiftKey) && 1 <= this._selection.length) {
            const lastSelection = this._selection[this._selection.length - 1];
            const lastSelectionIndex = this.items.findIndex(a => itemsAreEqual(a, lastSelection));
            const currentIndex = this.items.findIndex(a => itemsAreEqual(a, item));
            const start = currentIndex < lastSelectionIndex ? currentIndex : lastSelectionIndex;
            const end = currentIndex > lastSelectionIndex ? currentIndex + 1 : lastSelectionIndex;
            this._selection.push(...this.items.slice(start, end).filter(a => !this._selection.find(s => itemsAreEqual(a, s))));
        }
        else if (index === -1) {
            if (multiSelect && ((event === null || event === void 0 ? void 0 : event.ctrlKey) || (event === null || event === void 0 ? void 0 : event.shiftKey) || additiveMode)) {
                this._selection.push(item);
            }
            else {
                this._selection = [item];
            }
        }
        else {
            if (multiSelect && (event === null || event === void 0 ? void 0 : event.ctrlKey)) {
                this._selection.splice(index, 1);
            }
            else if (1 < this._selection.length && !additiveMode) {
                this._selection = [item];
            }
            else {
                this._selection.splice(index, 1);
            }
        }
        // Make the selection mutable
        this._selection = this._selection.map(x => (Object.assign({}, x)));
        this.invokeOnSelectionChangeHandler();
    }
    selectMultiple(items) {
        this._selection = items;
        this.invokeOnSelectionChangeHandler();
    }
    clearSelection() {
        this._selection = [];
        this.invokeOnSelectionChangeHandler();
    }
    isSelected(item) {
        return !!this._selection.find(a => this.options.itemsAreEqual(a, item));
    }
    areAllCurrentItemsSelected() {
        if (!this.items || this.items.length === 0) {
            return false;
        }
        return this.items.every(a => this._selection.find(b => this.options.itemsAreEqual(a, b)));
    }
    toggleSelectAll() {
        if (this.areAllCurrentItemsSelected()) {
            this._selection = this._selection.filter(a => !this.items.find(b => this.options.itemsAreEqual(a, b)));
        }
        else {
            this._selection = this._selection.slice(0);
            for (const item of this.items) {
                if (!this._selection.find(a => this.options.itemsAreEqual(a, item))) {
                    this._selection.push(item);
                }
            }
        }
        this.invokeOnSelectionChangeHandler();
    }
    lastSelected() {
        return this._selection[this._selection.length - 1];
    }
    invokeOnSelectionChangeHandler() {
        this.selectionChangesSubject.next(this._selection);
    }
}

class ProductMultiSelectorDialogComponent {
    constructor(dataService, changeDetector) {
        this.dataService = dataService;
        this.changeDetector = changeDetector;
        this.mode = 'product';
        this.initialSelectionIds = [];
        this.searchTerm$ = new BehaviorSubject('');
        this.searchFacetValueIds$ = new BehaviorSubject([]);
        this.paginationConfig = {
            currentPage: 1,
            itemsPerPage: 25,
            totalItems: 1,
        };
        this.paginationConfig$ = new BehaviorSubject(this.paginationConfig);
    }
    ngOnInit() {
        const idFn = this.mode === 'product'
            ? (a, b) => a.productId === b.productId
            : (a, b) => a.productVariantId === b.productVariantId;
        this.selectionManager = new SelectionManager({
            multiSelect: true,
            itemsAreEqual: idFn,
            additiveMode: true,
        });
        const searchQueryResult = this.dataService.product.searchProducts('', this.paginationConfig.itemsPerPage, 0);
        const result$ = combineLatest(this.searchTerm$, this.searchFacetValueIds$, this.paginationConfig$).subscribe(([term, facetValueIds, pagination]) => {
            const take = +pagination.itemsPerPage;
            const skip = (pagination.currentPage - 1) * take;
            return searchQueryResult.ref.refetch({
                input: { skip, take, term, facetValueIds, groupByProduct: this.mode === 'product' },
            });
        });
        this.items$ = searchQueryResult.stream$.pipe(tap(data => {
            this.paginationConfig.totalItems = data.search.totalItems;
            this.selectionManager.setCurrentItems(data.search.items);
        }), map(data => data.search.items));
        this.facetValues$ = searchQueryResult.stream$.pipe(map(data => data.search.facetValues));
        if (this.initialSelectionIds.length) {
            if (this.mode === 'product') {
                this.dataService.product
                    .getProducts({
                    filter: {
                        id: {
                            in: this.initialSelectionIds,
                        },
                    },
                })
                    .single$.subscribe(({ products }) => {
                    this.selectionManager.selectMultiple(products.items.map(product => ({
                        productId: product.id,
                        productName: product.name,
                    })));
                    this.changeDetector.markForCheck();
                });
            }
            else {
                this.dataService.product
                    .getProductVariants({
                    filter: {
                        id: {
                            in: this.initialSelectionIds,
                        },
                    },
                })
                    .single$.subscribe(({ productVariants }) => {
                    this.selectionManager.selectMultiple(productVariants.items.map(variant => ({
                        productVariantId: variant.id,
                        productVariantName: variant.name,
                    })));
                    this.changeDetector.markForCheck();
                });
            }
        }
    }
    trackByFn(index, item) {
        return item.productId;
    }
    setSearchTerm(term) {
        this.searchTerm$.next(term);
    }
    setFacetValueIds(ids) {
        this.searchFacetValueIds$.next(ids);
    }
    toggleSelection(item, event) {
        this.selectionManager.toggleSelection(item, event);
    }
    clearSelection() {
        this.selectionManager.selectMultiple([]);
    }
    isSelected(item) {
        return this.selectionManager.isSelected(item);
    }
    entityInfoClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    pageChange(page) {
        this.paginationConfig.currentPage = page;
        this.paginationConfig$.next(this.paginationConfig);
    }
    itemsPerPageChange(itemsPerPage) {
        this.paginationConfig.itemsPerPage = itemsPerPage;
        this.paginationConfig$.next(this.paginationConfig);
    }
    select() {
        this.resolveWith(this.selectionManager.selection);
    }
    cancel() {
        this.resolveWith();
    }
}
ProductMultiSelectorDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-multi-selector-dialog',
                template: "<ng-template vdrDialogTitle>\n    <div class=\"title-row\">\n        <span *ngIf=\"mode === 'product'\">{{ 'common.select-products' | translate }}</span>\n        <span *ngIf=\"mode === 'variant'\">{{ 'common.select-variants' | translate }}</span>\n    </div>\n</ng-template>\n<vdr-product-search-input\n    #productSearchInputComponent\n    [facetValueResults]=\"facetValues$ | async\"\n    (searchTermChange)=\"setSearchTerm($event)\"\n    (facetValueChange)=\"setFacetValueIds($event)\"\n></vdr-product-search-input>\n<div class=\"flex-wrapper\">\n    <div class=\"gallery\">\n        <div\n            class=\"card\"\n            *ngFor=\"let item of (items$ | async) || [] | paginate: paginationConfig; trackBy: trackByFn\"\n            (click)=\"toggleSelection(item, $event)\"\n            [class.selected]=\"isSelected(item)\"\n        >\n            <div class=\"card-img\">\n                <vdr-select-toggle\n                    [selected]=\"isSelected(item)\"\n                    [disabled]=\"true\"\n                    [hiddenWhenOff]=\"true\"\n                ></vdr-select-toggle>\n                <img\n                    [src]=\"\n                        (mode === 'product'\n                            ? item.productAsset\n                            : item.productVariantAsset || item.productAsset\n                        ) | assetPreview: 'thumb'\n                    \"\n                />\n            </div>\n            <div class=\"detail\">\n                <span [title]=\"mode === 'product' ? item.productName : item.productVariantName\">{{\n                    mode === 'product' ? item.productName : item.productVariantName\n                }}</span>\n                <div *ngIf=\"mode === 'variant'\"><small>{{ item.sku }}</small></div>\n            </div>\n        </div>\n    </div>\n    <div class=\"selection\">\n        <div class=\"m2 flex center\">\n            <div>\n                {{ 'common.items-selected-count' | translate: { count: selectionManager.selection.length } }}\n            </div>\n            <div class=\"flex-spacer\"></div>\n            <button class=\"btn btn-sm btn-link\" (click)=\"clearSelection()\">\n                <cds-icon shape=\"times\"></cds-icon> {{ 'common.clear-selection' | translate }}\n            </button>\n        </div>\n        <div class=\"selected-items\">\n            <div *ngFor=\"let item of selectionManager.selection\" class=\"flex item-row\">\n                <div class=\"\">{{ mode === 'product' ? item.productName : item.productVariantName }}</div>\n                <div class=\"flex-spacer\"></div>\n                <div>\n                    <button class=\"icon-button\" (click)=\"toggleSelection(item, $event)\">\n                        <cds-icon shape=\"times\"></cds-icon>\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        (itemsPerPageChange)=\"itemsPerPageChange($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"paginationConfig.currentPage\"\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        [totalItems]=\"paginationConfig.totalItems\"\n        (pageChange)=\"pageChange($event)\"\n    ></vdr-pagination-controls>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button\n        type=\"submit\"\n        (click)=\"select()\"\n        class=\"btn btn-primary\"\n        [disabled]=\"selectionManager.selection.length === 0\"\n    >\n        {{ 'common.select-items-with-count' | translate: { count: selectionManager.selection.length } }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column;flex-direction:1;height:70vh}.flex-wrapper{display:flex;overflow-y:hidden}.gallery{flex:1;display:grid;grid-template-columns:repeat(auto-fill,125px);grid-template-rows:repeat(auto-fill,200px);grid-gap:10px 20px;padding-left:12px;padding-top:12px;padding-bottom:64px;overflow-y:auto}.gallery .card:hover{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.detail{margin:0 3px;font-size:12px;line-height:.8rem}vdr-select-toggle{position:absolute;top:-12px;left:-12px}vdr-select-toggle ::ng-deep .toggle{box-shadow:0 5px 5px -4px #000000bf}.card.selected{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.card.selected .selected-checkbox{opacity:1}.selection{width:23vw;max-width:400px;padding:6px;display:flex;flex-direction:column}.selection .selected-items{flex:1;overflow-y:auto}.selection .selected-items .item-row{padding-left:3px}.selection .selected-items .item-row:hover{background-color:var(--color-component-bg-200)}.paging-controls{display:flex;align-items:center;justify-content:space-between}\n"]
            },] }
];
ProductMultiSelectorDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];

class ProductMultiSelectorFormInputComponent {
    constructor(modalService, dataService, changeDetector) {
        this.modalService = modalService;
        this.dataService = dataService;
        this.changeDetector = changeDetector;
        this.mode = 'product';
        this.isListInput = true;
    }
    ngOnInit() {
        var _a, _b;
        this.mode = (_b = (_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.selectionMode) !== null && _b !== void 0 ? _b : 'product';
    }
    select() {
        this.modalService
            .fromComponent(ProductMultiSelectorDialogComponent, {
            size: 'xl',
            locals: {
                mode: this.mode,
                initialSelectionIds: this.formControl.value,
            },
        })
            .subscribe(selection => {
            if (selection) {
                this.formControl.setValue(selection.map(item => this.mode === 'product' ? item.productId : item.productVariantId));
                this.changeDetector.markForCheck();
            }
        });
    }
}
ProductMultiSelectorFormInputComponent.id = 'product-multi-form-input';
ProductMultiSelectorFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-multi-selector-form-input',
                template: "<div class=\"flex\">\n    <button (click)=\"select()\" class=\"btn btn-sm btn-secondary\">\n        {{ 'common.items-selected-count' | translate: { count: formControl.value?.length ?? 0 } }}...\n    </button>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ProductMultiSelectorFormInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService },
    { type: ChangeDetectorRef }
];
ProductMultiSelectorFormInputComponent.propDecorators = {
    config: [{ type: Input }],
    formControl: [{ type: Input }],
    readonly: [{ type: Input }]
};

/**
 * @description
 * Allows the selection of multiple ProductVariants via an autocomplete select input.
 * Should be used with `ID` type **list** fields which represent ProductVariant IDs.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class ProductSelectorFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.isListInput = true;
    }
    ngOnInit() {
        this.formControl.setValidators([
            control => {
                if (!control.value || !control.value.length) {
                    return {
                        atLeastOne: { length: control.value.length },
                    };
                }
                return null;
            },
        ]);
        this.selection$ = this.formControl.valueChanges.pipe(startWith(this.formControl.value), switchMap(value => {
            if (Array.isArray(value) && 0 < value.length) {
                return forkJoin(value.map(id => this.dataService.product
                    .getProductVariant(id)
                    .mapSingle(data => data.productVariant)));
            }
            return of([]);
        }), map(variants => variants.filter(notNullOrUndefined)));
    }
    addProductVariant(product) {
        const value = this.formControl.value;
        this.formControl.setValue([...new Set([...value, product.productVariantId])]);
    }
    removeProductVariant(id) {
        const value = this.formControl.value;
        this.formControl.setValue(value.filter(_id => _id !== id));
    }
}
ProductSelectorFormInputComponent.id = 'product-selector-form-input';
ProductSelectorFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-selector-form-input',
                template: "<ul class=\"list-unstyled\">\n    <li *ngFor=\"let variant of selection$ | async\" class=\"variant\">\n        <div class=\"thumb\">\n            <img [src]=\"variant.product.featuredAsset | assetPreview: 32\" />\n        </div>\n        <div class=\"detail\">\n            <div>{{ variant.name }}</div>\n            <div class=\"sku\">{{ variant.sku }}</div>\n        </div>\n        <div class=\"flex-spacer\"></div>\n        <button\n            class=\"btn btn-link btn-sm btn-warning\"\n            (click)=\"removeProductVariant(variant.id)\"\n            [title]=\"'common.remove-item-from-list' | translate\"\n        >\n            <clr-icon shape=\"times\"></clr-icon>\n        </button>\n    </li>\n</ul>\n<vdr-product-selector (productSelected)=\"addProductVariant($event)\"></vdr-product-selector>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".variant{margin-bottom:6px;display:flex;align-items:center;transition:background-color .2s}.variant:hover{background-color:var(--color-component-bg-200)}.thumb{margin-right:6px}.sku{color:var(--color-grey-400);font-size:smaller;line-height:1em}\n"]
            },] }
];
ProductSelectorFormInputComponent.ctorParameters = () => [
    { type: DataService }
];

/**
 * @description
 * The default input component for `relation` type custom fields. Allows the selection
 * of a ProductVariant, Product, Customer or Asset. For other entity types, a custom
 * implementation will need to be defined. See {@link registerFormInputComponent}.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class RelationFormInputComponent {
}
RelationFormInputComponent.id = 'relation-form-input';
RelationFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-form-input',
                template: "<div [ngSwitch]=\"config.entity\">\n    <vdr-relation-asset-input\n        *ngSwitchCase=\"'Asset'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-asset-input>\n    <vdr-relation-product-input\n        *ngSwitchCase=\"'Product'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-product-input>\n    <vdr-relation-customer-input\n        *ngSwitchCase=\"'Customer'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-customer-input>\n    <vdr-relation-product-variant-input\n        *ngSwitchCase=\"'ProductVariant'\"\n        [parentFormControl]=\"formControl\"\n        [config]=\"config\"\n        [readonly]=\"readonly\"\n    ></vdr-relation-product-variant-input>\n    <ng-template ngSwitchDefault>\n        <vdr-relation-generic-input\n            [parentFormControl]=\"formControl\"\n               [config]=\"config\"\n               [readonly]=\"readonly\"\n        ></vdr-relation-generic-input>\n    </ng-template>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;background-color:var(--color-component-bg-200);padding:3px}\n"]
            },] }
];
RelationFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};

/**
 * @description
 * Uses the {@link RichTextEditorComponent} as in input for `text` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class RichTextFormInputComponent {
}
RichTextFormInputComponent.id = 'rich-text-form-input';
RichTextFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-rich-text-form-input',
                template: "<vdr-rich-text-editor\n    [readonly]=\"readonly\"\n    [formControl]=\"formControl\"\n></vdr-rich-text-editor>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host textarea{resize:both;height:6rem;width:100%}\n"]
            },] }
];

/**
 * @description
 * Uses a select input to allow the selection of a string value. Should be used with
 * `string` type fields with options.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class SelectFormInputComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    get options() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.options) || this.config.options;
    }
    ngOnInit() {
        this.uiLanguage$ = this.dataService.client.uiState().mapStream(({ uiState }) => uiState.language);
    }
    trackByFn(index, item) {
        return item.value;
    }
}
SelectFormInputComponent.id = 'select-form-input';
SelectFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-form-input',
                template: "<select clrSelect [formControl]=\"formControl\" [vdrDisabled]=\"readonly\">\n    <option *ngIf=\"config.nullable\" [ngValue]=\"null\"></option>\n    <option *ngFor=\"let option of options;trackBy:trackByFn\" [ngValue]=\"option.value\">\n        {{ (option | customFieldLabel:(uiLanguage$ | async)) || option.label || option.value }}\n    </option>\n</select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["select{width:100%}\n"]
            },] }
];
SelectFormInputComponent.ctorParameters = () => [
    { type: DataService }
];
SelectFormInputComponent.propDecorators = {
    readonly: [{ type: Input }]
};

/**
 * @description
 * Uses a regular text form input. This is the default input for `string` and `localeString` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class TextFormInputComponent {
    get prefix() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.prefix) || this.config.prefix;
    }
    get suffix() {
        var _a;
        return ((_a = this.config.ui) === null || _a === void 0 ? void 0 : _a.suffix) || this.config.suffix;
    }
}
TextFormInputComponent.id = 'text-form-input';
TextFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-text-form-input',
                template: "<vdr-affixed-input\n    [suffix]=\"suffix\"\n    [prefix]=\"prefix\"\n>\n    <input type=\"text\" [readonly]=\"readonly\" [formControl]=\"formControl\" />\n</vdr-affixed-input>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["input{width:100%}\n"]
            },] }
];

/**
 * @description
 * Uses textarea form input. This is the default input for `text` type fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
class TextareaFormInputComponent {
    get spellcheck() {
        return this.config.spellcheck === true;
    }
}
TextareaFormInputComponent.id = 'textarea-form-input';
TextareaFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-textarea-form-input',
                template: "<textarea [spellcheck]=\"spellcheck\" autocomplete=\"off\" autocorrect=\"off\"\n    [readonly]=\"readonly\"\n    [formControl]=\"formControl\"\n></textarea>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host textarea{resize:both;height:6rem;width:100%}\n"]
            },] }
];

const defaultFormInputs = [
    BooleanFormInputComponent,
    CurrencyFormInputComponent,
    DateFormInputComponent,
    FacetValueFormInputComponent,
    NumberFormInputComponent,
    SelectFormInputComponent,
    TextFormInputComponent,
    ProductSelectorFormInputComponent,
    CustomerGroupFormInputComponent,
    PasswordFormInputComponent,
    RelationFormInputComponent,
    TextareaFormInputComponent,
    RichTextFormInputComponent,
    JsonEditorFormInputComponent,
    HtmlEditorFormInputComponent,
    ProductMultiSelectorFormInputComponent,
    CombinationModeFormInputComponent,
];
/**
 * @description
 * Registers a custom FormInputComponent which can be used to control the argument inputs
 * of a {@link ConfigurableOperationDef} (e.g. CollectionFilter, ShippingMethod etc) or for
 * a custom field.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   declarations: [MyCustomFieldControl],
 *   providers: [
 *       registerFormInputComponent('my-custom-input', MyCustomFieldControl),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 *
 * This input component can then be used in a custom field:
 *
 * @example
 * ```TypeScript
 * const config = {
 *   // ...
 *   customFields: {
 *     ProductVariant: [
 *       {
 *         name: 'rrp',
 *         type: 'int',
 *         ui: { component: 'my-custom-input' },
 *       },
 *     ]
 *   }
 * }
 * ```
 *
 * or with an argument of a {@link ConfigurableOperationDef}:
 *
 * @example
 * ```TypeScript
 * args: {
 *   rrp: { type: 'int', ui: { component: 'my-custom-input' } },
 * }
 * ```
 *
 * @docsCategory custom-input-components
 */
function registerFormInputComponent(id, component) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (registry) => () => {
            registry.registerInputComponent(id, component);
        },
        deps: [ComponentRegistryService],
    };
}
/**
 * @description
 * **Deprecated** use `registerFormInputComponent()` in combination with the customField `ui` config instead.
 *
 * Registers a custom component to act as the form input control for the given custom field.
 * This should be used in the NgModule `providers` array of your ui extension module.
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *   imports: [SharedModule],
 *   declarations: [MyCustomFieldControl],
 *   providers: [
 *       registerCustomFieldComponent('Product', 'someCustomField', MyCustomFieldControl),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 *
 * @deprecated use `registerFormInputComponent()` in combination with the customField `ui` config instead.
 *
 * @docsCategory custom-input-components
 */
function registerCustomFieldComponent(entity, fieldName, component) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (customFieldComponentService) => () => {
            customFieldComponentService.registerCustomFieldComponent(entity, fieldName, component);
        },
        deps: [CustomFieldComponentService],
    };
}
/**
 * Registers the default form input components.
 */
function registerDefaultFormInputs() {
    return defaultFormInputs.map(cmp => registerFormInputComponent(cmp.id, cmp));
}

class ActionBarItemsComponent {
    constructor(navBuilderService, route, dataService, notificationService) {
        this.navBuilderService = navBuilderService;
        this.route = route;
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.locationId$ = new BehaviorSubject('');
    }
    ngOnInit() {
        this.items$ = combineLatest(this.navBuilderService.actionBarConfig$, this.locationId$).pipe(map(([items, locationId]) => items.filter(config => config.locationId === locationId)));
    }
    ngOnChanges(changes) {
        if ('locationId' in changes) {
            this.locationId$.next(changes['locationId'].currentValue);
        }
    }
    handleClick(event, item) {
        if (typeof item.onClick === 'function') {
            item.onClick(event, {
                route: this.route,
                dataService: this.dataService,
                notificationService: this.notificationService,
            });
        }
    }
    getRouterLink(item) {
        return this.navBuilderService.getRouterLink(item, this.route);
    }
    getButtonStyles(item) {
        const styles = ['btn'];
        if (item.buttonStyle && item.buttonStyle === 'link') {
            styles.push('btn-link');
            return styles;
        }
        styles.push(this.getButtonColorClass(item));
        return styles;
    }
    getButtonColorClass(item) {
        switch (item.buttonColor) {
            case undefined:
            case 'primary':
                return item.buttonStyle === 'outline' ? 'btn-outline' : 'btn-primary';
            case 'success':
                return item.buttonStyle === 'outline' ? 'btn-success-outline' : 'btn-success';
            case 'warning':
                return item.buttonStyle === 'outline' ? 'btn-warning-outline' : 'btn-warning';
            default:
                assertNever(item.buttonColor);
                return '';
        }
    }
}
ActionBarItemsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-action-bar-items',
                template: "<vdr-ui-extension-point [locationId]=\"locationId\" api=\"actionBar\" [leftPx]=\"-24\" [topPx]=\"-6\">\n    <ng-container *ngFor=\"let item of items$ | async\">\n        <button\n            *vdrIfPermissions=\"item.requiresPermission\"\n            [routerLink]=\"getRouterLink(item)\"\n            [disabled]=\"item.disabled ? (item.disabled | async) : false\"\n            (click)=\"handleClick($event, item)\"\n            [ngClass]=\"getButtonStyles(item)\"\n        >\n            <clr-icon *ngIf=\"item.icon\" [attr.shape]=\"item.icon\"></clr-icon>\n            {{ item.label | translate }}\n        </button>\n    </ng-container>\n</vdr-ui-extension-point>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block;min-height:36px}\n"]
            },] }
];
ActionBarItemsComponent.ctorParameters = () => [
    { type: NavBuilderService },
    { type: ActivatedRoute },
    { type: DataService },
    { type: NotificationService }
];
ActionBarItemsComponent.propDecorators = {
    locationId: [{ type: HostBinding, args: ['attr.data-location-id',] }, { type: Input }]
};

class ActionBarLeftComponent {
    constructor() {
        this.grow = false;
    }
}
ActionBarLeftComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-ab-left',
                template: ` <ng-content></ng-content> `
            },] }
];
ActionBarLeftComponent.propDecorators = {
    grow: [{ type: Input }]
};
class ActionBarRightComponent {
    constructor() {
        this.grow = false;
    }
}
ActionBarRightComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-ab-right',
                template: ` <ng-content></ng-content> `
            },] }
];
ActionBarRightComponent.propDecorators = {
    grow: [{ type: Input }]
};
class ActionBarComponent {
}
ActionBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-action-bar',
                template: "<div class=\"left-content\" [class.grow]=\"left?.grow\"><ng-content select=\"vdr-ab-left\"></ng-content></div>\n<div class=\"right-content\" [class.grow]=\"right?.grow\"><ng-content select=\"vdr-ab-right\"></ng-content></div>\n",
                styles: [":host{display:flex;justify-content:space-between;align-items:baseline;background-color:var(--color-component-bg-100);position:sticky;top:-24px;z-index:25;border-bottom:1px solid var(--color-component-border-200);flex-direction:column-reverse}:host>.grow{flex:1}:host .right-content{width:100%;display:flex;justify-content:flex-end}:host ::ng-deep vdr-ab-right>*:last-child{margin-right:0}@media screen and (min-width: 768px){:host{flex-direction:row}:host .right-content{width:initial}}\n"]
            },] }
];
ActionBarComponent.propDecorators = {
    left: [{ type: ContentChild, args: [ActionBarLeftComponent,] }],
    right: [{ type: ContentChild, args: [ActionBarRightComponent,] }]
};

class AddressFormComponent {
}
AddressFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-address-form',
                template: "<form [formGroup]=\"formGroup\">\n    <div class=\"clr-row\">\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.full-name' | translate }}</label>\n                <input formControlName=\"fullName\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.company' | translate }}</label>\n                <input formControlName=\"company\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n    </div>\n\n    <div class=\"clr-row\">\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.street-line-1' | translate }}</label>\n                <input formControlName=\"streetLine1\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.street-line-2' | translate }}</label>\n                <input formControlName=\"streetLine2\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n    </div>\n    <div class=\"clr-row\">\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.city' | translate }}</label>\n                <input formControlName=\"city\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.province' | translate }}</label>\n                <input formControlName=\"province\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n    </div>\n    <div class=\"clr-row\">\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.postal-code' | translate }}</label>\n                <input formControlName=\"postalCode\" type=\"text\" clrInput />\n            </clr-input-container>\n        </div>\n        <div class=\"clr-col-md-4\">\n            <clr-input-container>\n                <label>{{ 'customer.country' | translate }}</label>\n                <select name=\"countryCode\" formControlName=\"countryCode\" clrInput clrSelect>\n                    <option *ngFor=\"let country of availableCountries\" [value]=\"country.code\">\n                        {{ country.name }}\n                    </option>\n                </select>\n            </clr-input-container>\n        </div>\n    </div>\n    <clr-input-container>\n        <label>{{ 'customer.phone-number' | translate }}</label>\n        <input formControlName=\"phoneNumber\" type=\"text\" clrInput />\n    </clr-input-container>\n    <section formGroupName=\"customFields\" *ngIf=\"formGroup.get('customFields') as customFieldsGroup\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Address\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"customFieldsGroup\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n</form>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
AddressFormComponent.propDecorators = {
    customFields: [{ type: Input }],
    formGroup: [{ type: Input }],
    availableCountries: [{ type: Input }]
};

/**
 * A wrapper around an <input> element which adds a prefix and/or a suffix element.
 */
class AffixedInputComponent {
}
AffixedInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-affixed-input',
                template: "<div [class.has-prefix]=\"!!prefix\" [class.has-suffix]=\"!!suffix\">\n    <ng-content></ng-content>\n</div>\n<div class=\"affix prefix\" *ngIf=\"prefix\">{{ prefix }}</div>\n<div class=\"affix suffix\" *ngIf=\"suffix\">{{ suffix }}</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-flex}.affix{color:var(--color-grey-800);display:flex;align-items:center;background-color:var(--color-grey-200);border:1px solid var(--color-component-border-300);top:1px;padding:3px;line-height:.58333rem;transition:border .2s}::ng-deep .has-prefix input{border-top-left-radius:0!important;border-bottom-left-radius:0!important}.prefix{order:-1;border-radius:3px 0 0 3px;border-right:none}::ng-deep .has-suffix input{border-top-right-radius:0!important;border-bottom-right-radius:0!important}.suffix{border-radius:0 3px 3px 0;border-left:none}\n"]
            },] }
];
AffixedInputComponent.propDecorators = {
    prefix: [{ type: Input }],
    suffix: [{ type: Input }]
};

/**
 * A form input control which displays a number input with a percentage sign suffix.
 */
class PercentageSuffixInputComponent {
    constructor() {
        this.disabled = false;
        this.readonly = false;
    }
    ngOnChanges(changes) {
        if ('value' in changes) {
            this.writeValue(changes['value'].currentValue);
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onInput(value) {
        this.onChange(value);
    }
    writeValue(value) {
        const numericValue = +value;
        if (!Number.isNaN(numericValue)) {
            this._value = numericValue;
        }
    }
}
PercentageSuffixInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-percentage-suffix-input',
                template: `
        <vdr-affixed-input suffix="%">
            <input
                type="number"
                step="1"
                [value]="_value"
                [disabled]="disabled"
                [readonly]="readonly"
                (input)="onInput($event.target.value)"
                (focus)="onTouch()"
            />
        </vdr-affixed-input>
    `,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: PercentageSuffixInputComponent,
                        multi: true,
                    },
                ],
                styles: [`
            :host {
                padding: 0;
            }
        `]
            },] }
];
PercentageSuffixInputComponent.propDecorators = {
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    value: [{ type: Input }]
};

class CdTimerComponent {
    constructor(elt, renderer) {
        this.elt = elt;
        this.renderer = renderer;
        this.onStart = new EventEmitter();
        this.onStop = new EventEmitter();
        this.onTick = new EventEmitter();
        this.onComplete = new EventEmitter();
        // Initialization
        this.autoStart = true;
        this.startTime = 0;
        this.endTime = 0;
        this.timeoutId = null;
        this.countdown = true;
        this.format = 'default';
    }
    ngAfterViewInit() {
        const ngContentNode = this.elt.nativeElement.lastChild; // Get last child, defined by user or span
        this.ngContentSchema = ngContentNode ? ngContentNode.nodeValue : '';
        if (this.autoStart === undefined || this.autoStart === true) {
            const fifteen = 60 * this.processingTime;
            const dayPlacedTime = dayjs(this.placedTime);
            const scheduledTime = this.scheduledTime ? dayjs(this.scheduledTime) : undefined;
            const diffFromScheduledTime = scheduledTime === null || scheduledTime === void 0 ? void 0 : scheduledTime.diff(Date.now(), 'seconds');
            const diffFromNow = dayPlacedTime.diff(Date.now(), 'seconds');
            // console.log(dayPlacedTime);
            const diff = diffFromScheduledTime !== null && diffFromScheduledTime !== void 0 ? diffFromScheduledTime : fifteen + diffFromNow;
            console.log(diff);
            if (diff < 0 || isNaN(diff)) {
                this.startTime = 0;
                this.renderer.setProperty(this.elt.nativeElement, 'innerHTML', 'Time up');
            }
            else {
                this.startTime = diff;
                this.start();
            }
        }
    }
    ngOnDestroy() {
        this.resetTimeout();
    }
    /**
     * Start the timer
     */
    start() {
        this.initVar();
        this.resetTimeout();
        this.computeTimeUnits();
        this.startTickCount();
        this.onStart.emit(this);
    }
    /**
     * Resume the timer
     */
    resume() {
        this.resetTimeout();
        this.startTickCount();
    }
    /**
     * Stop the timer
     */
    stop() {
        this.clear();
        this.onStop.emit(this);
    }
    /**
     * Reset the timer
     */
    reset() {
        this.initVar();
        this.resetTimeout();
        this.clear();
        this.computeTimeUnits();
        this.renderText();
    }
    /**
     * Get the time information
     * @returns TimeInterface
     */
    get() {
        return {
            seconds: this.seconds,
            minutes: this.minutes,
            hours: this.hours,
            days: this.days,
            timer: this.timeoutId,
            tick_count: this.tickCounter,
        };
    }
    /**
     * Initialize variable before start
     */
    initVar() {
        this.startTime = this.startTime || 0;
        this.endTime = this.endTime || 0;
        this.countdown = this.countdown || false;
        this.tickCounter = this.startTime;
        // Disable countdown if start time not defined
        if (this.countdown && this.startTime === 0) {
            this.countdown = false;
        }
        // Determine auto format
        if (!this.format) {
            this.format = this.ngContentSchema.length > 5 ? 'user' : 'default';
        }
    }
    /**
     * Reset timeout
     */
    resetTimeout() {
        if (this.timeoutId) {
            clearInterval(this.timeoutId);
        }
    }
    /**
     * Render the time to DOM
     */
    renderText() {
        let outputText;
        if (this.format === 'user') {
            // User presentation
            const items = {
                seconds: this.seconds,
                minutes: this.minutes,
                hours: this.hours,
                days: this.days,
            };
            outputText = this.ngContentSchema;
            for (const key of Object.keys(items)) {
                outputText = outputText.replace('[' + key + ']', items[key].toString());
            }
        }
        else if (this.format === 'intelli') {
            // Intelli presentation
            outputText = '';
            if (this.days > 0) {
                outputText += this.days.toString() + 'day' + (this.days > 1 ? 's' : '') + ' ';
            }
            if (this.hours > 0 || this.days > 0) {
                outputText += this.hours.toString() + 'h ';
            }
            if ((this.minutes > 0 || this.hours > 0) && this.days === 0) {
                outputText += this.minutes.toString().padStart(2, '0') + 'min ';
            }
            if (this.hours === 0 && this.days === 0) {
                outputText += this.seconds.toString().padStart(2, '0') + 's';
            }
        }
        else if (this.format === 'hms') {
            // Hms presentation
            outputText = this.hours.toString().padStart(2, '0') + ':';
            outputText += this.minutes.toString().padStart(2, '0') + ':';
            outputText += this.seconds.toString().padStart(2, '0');
        }
        else if (this.format === 'ms') {
            // ms presentation
            outputText = '';
            if (this.hours > 0) {
                outputText = this.hours.toString().padStart(2, '0') + ':';
            }
            outputText += this.minutes.toString().padStart(2, '0') + ':';
            outputText += this.seconds.toString().padStart(2, '0');
        }
        else {
            // Default presentation
            outputText = this.days.toString() + 'd ';
            outputText += this.hours.toString() + 'h ';
            outputText += this.minutes.toString() + 'm ';
            outputText += this.seconds.toString() + 's';
        }
        this.renderer.setProperty(this.elt.nativeElement, 'innerHTML', outputText);
    }
    clear() {
        this.resetTimeout();
        this.timeoutId = null;
    }
    /**
     * Compute each unit (seconds, minutes, hours, days) for further manipulation
     * @protected
     */
    computeTimeUnits() {
        if (!this.maxTimeUnit || this.maxTimeUnit === 'day') {
            this.seconds = Math.floor(this.tickCounter % 60);
            this.minutes = Math.floor((this.tickCounter / 60) % 60);
            this.hours = Math.floor((this.tickCounter / 3600) % 24);
            this.days = Math.floor(this.tickCounter / 3600 / 24);
        }
        else if (this.maxTimeUnit === 'second') {
            this.seconds = this.tickCounter;
            this.minutes = 0;
            this.hours = 0;
            this.days = 0;
        }
        else if (this.maxTimeUnit === 'minute') {
            this.seconds = Math.floor(this.tickCounter % 60);
            this.minutes = Math.floor(this.tickCounter / 60);
            this.hours = 0;
            this.days = 0;
        }
        else if (this.maxTimeUnit === 'hour') {
            this.seconds = Math.floor(this.tickCounter % 60);
            this.minutes = Math.floor((this.tickCounter / 60) % 60);
            this.hours = Math.floor(this.tickCounter / 3600);
            this.days = 0;
        }
        if (this.tickCounter === 0) {
            this.renderer.setProperty(this.elt.nativeElement, 'innerHTML', 'Time up');
        }
        else {
            this.renderText();
        }
    }
    /**
     * Start tick count, base of this component
     * @protected
     */
    startTickCount() {
        const that = this;
        that.timeoutId = setInterval(() => {
            let counter;
            if (that.countdown) {
                // Compute finish counter for countdown
                counter = that.tickCounter;
                if (that.startTime > that.endTime) {
                    counter = that.tickCounter - that.endTime - 1;
                }
            }
            else {
                // Compute finish counter for timer
                counter = that.tickCounter - that.startTime;
                if (that.endTime > that.startTime) {
                    counter = that.endTime - that.tickCounter - 1;
                }
            }
            that.computeTimeUnits();
            const timer = {
                seconds: that.seconds,
                minutes: that.minutes,
                hours: that.hours,
                days: that.days,
                timer: that.timeoutId,
                tick_count: that.tickCounter,
            };
            that.onTick.emit(timer);
            if (counter < 0) {
                that.stop();
                that.onComplete.emit(that);
                return;
            }
            if (that.countdown) {
                that.tickCounter--;
            }
            else {
                that.tickCounter++;
            }
        }, 1000); // Each seconds
    }
}
CdTimerComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-cd-timer',
                template: ' <ng-content></ng-content>'
            },] }
];
CdTimerComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
CdTimerComponent.propDecorators = {
    scheduledTime: [{ type: Input }],
    startTime: [{ type: Input }],
    endTime: [{ type: Input }],
    processingTime: [{ type: Input }],
    countdown: [{ type: Input }],
    autoStart: [{ type: Input }],
    maxTimeUnit: [{ type: Input }],
    placedTime: [{ type: Input }],
    format: [{ type: Input }],
    onStart: [{ type: Output }],
    onStop: [{ type: Output }],
    onTick: [{ type: Output }],
    onComplete: [{ type: Output }]
};

/**
 * A component for selecting files to upload as new Assets.
 */
class AssetFileInputComponent {
    constructor(serverConfig) {
        this.serverConfig = serverConfig;
        /**
         * CSS selector of the DOM element which will be masked by the file
         * drop zone. Defaults to `body`.
         */
        this.dropZoneTarget = 'body';
        this.uploading = false;
        this.selectFiles = new EventEmitter();
        this.dragging = false;
        this.overDropZone = false;
        this.dropZoneStyle = {
            'width.px': 0,
            'height.px': 0,
            'top.px': 0,
            'left.px': 0,
        };
    }
    ngOnInit() {
        this.accept = this.serverConfig.serverConfig.permittedAssetTypes.join(',');
        this.fitDropZoneToTarget();
    }
    onDragEnter() {
        this.dragging = true;
        this.fitDropZoneToTarget();
    }
    // DragEvent is not supported in Safari, see https://github.com/vendure-ecommerce/vendure/pull/284
    onDragLeave(event) {
        if (!event.clientX && !event.clientY) {
            this.dragging = false;
        }
    }
    /**
     * Preventing this event is required to make dropping work.
     * See https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#Define_a_drop_zone
     */
    onDragOver(event) {
        event.preventDefault();
    }
    // DragEvent is not supported in Safari, see https://github.com/vendure-ecommerce/vendure/pull/284
    onDrop(event) {
        event.preventDefault();
        this.dragging = false;
        this.overDropZone = false;
        const files = Array.from(event.dataTransfer ? event.dataTransfer.items : [])
            .map(i => i.getAsFile())
            .filter(notNullOrUndefined);
        this.selectFiles.emit(files);
    }
    select(event) {
        const files = event.target.files;
        if (files) {
            this.selectFiles.emit(Array.from(files));
        }
    }
    fitDropZoneToTarget() {
        const target = document.querySelector(this.dropZoneTarget);
        if (target) {
            const rect = target.getBoundingClientRect();
            this.dropZoneStyle['width.px'] = rect.width;
            this.dropZoneStyle['height.px'] = rect.height;
            this.dropZoneStyle['top.px'] = rect.top;
            this.dropZoneStyle['left.px'] = rect.left;
        }
    }
}
AssetFileInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-file-input',
                template: "<input type=\"file\" class=\"file-input\" #fileInput (change)=\"select($event)\" multiple [accept]=\"accept\" />\n<button class=\"btn btn-primary\" (click)=\"fileInput.click()\" [disabled]=\"uploading\">\n    <ng-container *ngIf=\"uploading; else selectable\">\n        <clr-spinner clrInline></clr-spinner>\n        {{ 'asset.uploading' | translate }}\n    </ng-container>\n    <ng-template #selectable>\n        <clr-icon shape=\"upload-cloud\"></clr-icon>\n        {{ 'asset.upload-assets' | translate }}\n    </ng-template>\n</button>\n<div\n    class=\"drop-zone\"\n    [ngStyle]=\"dropZoneStyle\"\n    [class.visible]=\"dragging\"\n    [class.dragging-over]=\"overDropZone\"\n    (dragenter)=\"overDropZone = true\"\n    (dragleave)=\"overDropZone = false\"\n    (dragover)=\"onDragOver($event)\"\n    (drop)=\"onDrop($event)\"\n    #dropZone\n>\n    <div class=\"drop-label\" (dragenter)=\"overDropZone = true\">\n        <clr-icon shape=\"upload-cloud\" size=\"32\"></clr-icon>\n        {{ 'catalog.drop-files-to-upload' | translate }}\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".file-input{display:none}.drop-zone{position:fixed;background-color:var(--color-primary-500);border:3px dashed var(--color-component-border-300);opacity:0;visibility:hidden;z-index:1000;transition:opacity .2s,background-color .2s,visibility 0s .2s;display:flex;align-items:center;justify-content:center}.drop-zone.visible{opacity:.3;visibility:visible;transition:opacity .2s,background-color .2s,border .2s,visibility 0s}.drop-zone .drop-label{background-color:#fffc;border-radius:3px;padding:24px;font-size:32px;pointer-events:none;opacity:.5;transition:opacity .2s}.drop-zone.dragging-over{border-color:#fff;background-color:var(--color-primary-500);opacity:.7;transition:background-color .2s,border .2s}.drop-zone.dragging-over .drop-label{opacity:1}\n"]
            },] }
];
AssetFileInputComponent.ctorParameters = () => [
    { type: ServerConfigService }
];
AssetFileInputComponent.propDecorators = {
    dropZoneTarget: [{ type: Input }],
    uploading: [{ type: Input }],
    selectFiles: [{ type: Output }],
    onDragEnter: [{ type: HostListener, args: ['document:dragenter',] }],
    onDragLeave: [{ type: HostListener, args: ['document:dragleave', ['$event'],] }]
};

class AssetPreviewDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.assetWithTags$ = of(this.asset).pipe(mergeMap(asset => {
            if (this.hasTags(asset)) {
                return of(asset);
            }
            else {
                // tslint:disable-next-line:no-non-null-assertion
                return this.dataService.product.getAsset(asset.id).mapSingle(data => data.asset);
            }
        }));
    }
    hasTags(asset) {
        return asset.hasOwnProperty('tags');
    }
}
AssetPreviewDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-preview-dialog',
                template: "<ng-template vdrDialogTitle>\n    <div class=\"title-row\">\n        {{ asset.name }}\n    </div>\n</ng-template>\n\n<vdr-asset-preview\n    *ngIf=\"assetWithTags$ | async as assetWithTags\"\n    [asset]=\"assetWithTags\"\n    (assetChange)=\"assetChanges = $event\"\n    (editClick)=\"resolveWith()\"\n></vdr-asset-preview>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{height:70vh}.update-button.hidden{visibility:hidden}\n"]
            },] }
];
AssetPreviewDialogComponent.ctorParameters = () => [
    { type: DataService }
];

class AssetGalleryComponent {
    constructor(modalService) {
        this.modalService = modalService;
        /**
         * If true, allows multiple assets to be selected by ctrl+clicking.
         */
        this.multiSelect = false;
        this.canDelete = false;
        this.selectionChange = new EventEmitter();
        this.deleteAssets = new EventEmitter();
        this.selectionManager = new SelectionManager({
            multiSelect: this.multiSelect,
            itemsAreEqual: (a, b) => a.id === b.id,
            additiveMode: false,
        });
    }
    ngOnChanges(changes) {
        if (this.assets) {
            for (const asset of this.selectionManager.selection) {
                // Update any selected assets with any changes
                const match = this.assets.find(a => a.id === asset.id);
                if (match) {
                    Object.assign(asset, match);
                }
            }
        }
        if (changes['assets']) {
            this.selectionManager.setCurrentItems(this.assets);
        }
        if (changes['multiSelect']) {
            this.selectionManager.setMultiSelect(this.multiSelect);
        }
    }
    toggleSelection(asset, event) {
        this.selectionManager.toggleSelection(asset, event);
        this.selectionChange.emit(this.selectionManager.selection);
    }
    selectMultiple(assets) {
        this.selectionManager.selectMultiple(assets);
        this.selectionChange.emit(this.selectionManager.selection);
    }
    isSelected(asset) {
        return this.selectionManager.isSelected(asset);
    }
    lastSelected() {
        return this.selectionManager.lastSelected();
    }
    previewAsset(asset) {
        this.modalService
            .fromComponent(AssetPreviewDialogComponent, {
            size: 'xl',
            closable: true,
            locals: { asset },
        })
            .subscribe();
    }
    entityInfoClick(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
AssetGalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-gallery',
                template: "<div class=\"gallery\">\n    <div\n        class=\"card\"\n        *ngFor=\"let asset of assets\"\n        (click)=\"toggleSelection(asset, $event)\"\n        [class.selected]=\"isSelected(asset)\"\n    >\n        <div class=\"card-img\">\n            <vdr-select-toggle\n                [selected]=\"isSelected(asset)\"\n                [disabled]=\"true\"\n                [hiddenWhenOff]=\"true\"\n            ></vdr-select-toggle>\n            <img class=\"asset-thumb\" [src]=\"asset | assetPreview: 'thumb'\" />\n        </div>\n        <div class=\"detail\">\n            <vdr-entity-info\n                [entity]=\"asset\"\n                [small]=\"true\"\n                (click)=\"entityInfoClick($event)\"\n            ></vdr-entity-info>\n            <span [title]=\"asset.name\">{{ asset.name }}</span>\n        </div>\n    </div>\n</div>\n<div class=\"info-bar\">\n    <div class=\"card\">\n        <div class=\"card-img\">\n            <div class=\"placeholder\" *ngIf=\"selectionManager.selection.length === 0\">\n                <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n                <div>{{ 'catalog.no-selection' | translate }}</div>\n            </div>\n            <img\n                class=\"preview\"\n                *ngIf=\"selectionManager.selection.length >= 1\"\n                [src]=\"lastSelected().preview + '?preset=medium'\"\n            />\n        </div>\n        <div class=\"card-block details\" *ngIf=\"selectionManager.selection.length >= 1\">\n            <div class=\"name\">{{ lastSelected().name }}</div>\n            <div>{{ 'asset.original-asset-size' | translate }}: {{ lastSelected().fileSize | filesize }}</div>\n\n            <ng-container *ngIf=\"selectionManager.selection.length === 1\">\n                <vdr-chip *ngFor=\"let tag of lastSelected().tags\" [colorFrom]=\"tag.value\"\n                    ><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ tag.value }}</vdr-chip\n                >\n                <div>\n                    <button (click)=\"previewAsset(lastSelected())\" class=\"btn btn-link\">\n                        <clr-icon shape=\"eye\"></clr-icon> {{ 'asset.preview' | translate }}\n                    </button>\n                </div>\n                <div>\n                    <vdr-asset-preview-links class=\"\" [asset]=\"lastSelected()\"></vdr-asset-preview-links>\n                </div>\n                <div>\n                    <a [routerLink]=\"['./', lastSelected().id]\" class=\"btn btn-link\">\n                        <clr-icon shape=\"pencil\"></clr-icon> {{ 'common.edit' | translate }}\n                    </a>\n                </div>\n            </ng-container>\n            <div *ngIf=\"canDelete\">\n                <button (click)=\"deleteAssets.emit(selectionManager.selection)\" class=\"btn btn-link\">\n                    <clr-icon shape=\"trash\" class=\"is-danger\"></clr-icon> {{ 'common.delete' | translate }}\n                </button>\n            </div>\n        </div>\n    </div>\n    <div class=\"card stack\" [class.visible]=\"selectionManager.selection.length > 1\"></div>\n    <div class=\"selection-count\" [class.visible]=\"selectionManager.selection.length > 1\">\n        {{ 'asset.assets-selected-count' | translate: { count: selectionManager.selection.length } }}\n        <ul>\n            <li *ngFor=\"let asset of selectionManager.selection\">{{ asset.name }}</li>\n        </ul>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;overflow:hidden}.gallery{flex:1;display:grid;grid-template-columns:repeat(auto-fill,150px);grid-template-rows:repeat(auto-fill,180px);grid-gap:10px 20px;overflow-y:auto;padding-left:12px;padding-top:12px;padding-bottom:12px}.gallery .card:hover{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.card{margin-top:0;position:relative}img.asset-thumb{aspect-ratio:1}vdr-select-toggle{position:absolute;top:-12px;left:-12px}vdr-select-toggle ::ng-deep .toggle{box-shadow:0 5px 5px -4px #000000bf}.card.selected{box-shadow:0 .125rem 0 0 var(--color-primary-500);border:1px solid var(--color-primary-500)}.card.selected .selected-checkbox{opacity:1}.detail{font-size:12px;margin:3px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.detail vdr-entity-info{height:16px}.info-bar{width:25%;padding:0 6px;overflow-y:auto}.info-bar .card{z-index:1}.info-bar .stack{z-index:0;opacity:0;transform:perspective(500px) translateZ(0) translateY(-16px);height:16px;transition:transform .3s,opacity 0s .3s;background-color:#fff}.info-bar .stack.visible{opacity:1;transform:perspective(500px) translateZ(-44px) translateY(0);background-color:var(--color-component-bg-100);transition:transform .3s,color .3s}.info-bar .selection-count{opacity:0;position:relative;text-align:center;visibility:hidden;transition:opacity .3s,visibility 0s .3s}.info-bar .selection-count.visible{opacity:1;visibility:visible;transition:opacity .3s,visibility 0s}.info-bar .selection-count ul{text-align:left;list-style-type:none;margin-left:12px}.info-bar .selection-count ul li{font-size:12px}.info-bar .placeholder{text-align:center;color:var(--color-grey-300)}.info-bar .preview img{max-width:100%}.info-bar .details{font-size:12px;word-break:break-all}.info-bar .name{line-height:14px;font-weight:bold}\n"]
            },] }
];
AssetGalleryComponent.ctorParameters = () => [
    { type: ModalService }
];
AssetGalleryComponent.propDecorators = {
    assets: [{ type: Input }],
    multiSelect: [{ type: Input }],
    canDelete: [{ type: Input }],
    selectionChange: [{ type: Output }],
    deleteAssets: [{ type: Output }]
};

/**
 * @description
 * A dialog which allows the creation and selection of assets.
 *
 * @example
 * ```TypeScript
 * selectAssets() {
 *   this.modalService
 *     .fromComponent(AssetPickerDialogComponent, {
 *         size: 'xl',
 *     })
 *     .subscribe(result => {
 *         if (result && result.length) {
 *             // ...
 *         }
 *     });
 * }
 * ```
 *
 * @docsCategory components
 */
class AssetPickerDialogComponent {
    constructor(dataService, notificationService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.paginationConfig = {
            currentPage: 1,
            itemsPerPage: 25,
            totalItems: 1,
        };
        this.multiSelect = true;
        this.initialTags = [];
        this.selection = [];
        this.searchTerm$ = new BehaviorSubject(undefined);
        this.filterByTags$ = new BehaviorSubject(undefined);
        this.uploading = false;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.listQuery = this.dataService.product.getAssetList(this.paginationConfig.itemsPerPage, 0);
        this.allTags$ = this.dataService.product.getTagList().mapSingle(data => data.tags.items);
        this.assets$ = this.listQuery.stream$.pipe(tap(result => (this.paginationConfig.totalItems = result.assets.totalItems)), map(result => result.assets.items));
        this.searchTerm$.pipe(debounceTime(250), takeUntil(this.destroy$)).subscribe(() => {
            this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
        });
        this.filterByTags$.pipe(debounceTime(100), takeUntil(this.destroy$)).subscribe(() => {
            this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
        });
    }
    ngAfterViewInit() {
        if (0 < this.initialTags.length) {
            this.allTags$
                .pipe(take(1), map(allTags => allTags.filter(tag => this.initialTags.includes(tag.value))), tap(tags => this.filterByTags$.next(tags)), delay(1))
                .subscribe(tags => this.assetSearchInputComponent.setTags(tags));
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    pageChange(page) {
        this.paginationConfig.currentPage = page;
        this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
    }
    itemsPerPageChange(itemsPerPage) {
        this.paginationConfig.itemsPerPage = itemsPerPage;
        this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
    }
    cancel() {
        this.resolveWith();
    }
    select() {
        this.resolveWith(this.selection);
    }
    createAssets(files) {
        if (files.length) {
            this.uploading = true;
            this.dataService.product
                .createAssets(files)
                .pipe(finalize(() => (this.uploading = false)))
                .subscribe(res => {
                this.fetchPage(this.paginationConfig.currentPage, this.paginationConfig.itemsPerPage);
                this.notificationService.success(marker('asset.notify-create-assets-success'), {
                    count: files.length,
                });
                const assets = res.createAssets.filter(a => a.__typename === 'Asset');
                this.assetGalleryComponent.selectMultiple(assets);
            });
        }
    }
    fetchPage(currentPage, itemsPerPage) {
        var _a;
        const take = +itemsPerPage;
        const skip = (currentPage - 1) * +itemsPerPage;
        const searchTerm = this.searchTerm$.value;
        const tags = (_a = this.filterByTags$.value) === null || _a === void 0 ? void 0 : _a.map(t => t.value);
        this.listQuery.ref.refetch({
            options: {
                skip,
                take,
                filter: {
                    name: {
                        contains: searchTerm,
                    },
                },
                sort: {
                    createdAt: SortOrder.DESC,
                },
                tags,
                tagsOperator: LogicalOperator.AND,
            },
        });
    }
}
AssetPickerDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-picker-dialog',
                template: "<ng-template vdrDialogTitle>\n    <div class=\"title-row\">\n        <span>{{ 'asset.select-assets' | translate }}</span>\n        <div class=\"flex-spacer\"></div>\n        <vdr-asset-file-input\n            class=\"ml3\"\n            (selectFiles)=\"createAssets($event)\"\n            [uploading]=\"uploading\"\n            dropZoneTarget=\".modal-content\"\n        ></vdr-asset-file-input>\n    </div>\n</ng-template>\n<vdr-asset-search-input\n    class=\"mb2\"\n    [tags]=\"allTags$ | async\"\n    (searchTermChange)=\"searchTerm$.next($event)\"\n    (tagsChange)=\"filterByTags$.next($event)\"\n    #assetSearchInputComponent\n></vdr-asset-search-input>\n<vdr-asset-gallery\n    [assets]=\"(assets$ | async)! | paginate: paginationConfig\"\n    [multiSelect]=\"multiSelect\"\n    (selectionChange)=\"selection = $event\"\n    #assetGalleryComponent\n></vdr-asset-gallery>\n\n<div class=\"paging-controls\">\n    <vdr-items-per-page-controls\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        (itemsPerPageChange)=\"itemsPerPageChange($event)\"\n    ></vdr-items-per-page-controls>\n\n    <vdr-pagination-controls\n        [currentPage]=\"paginationConfig.currentPage\"\n        [itemsPerPage]=\"paginationConfig.itemsPerPage\"\n        [totalItems]=\"paginationConfig.totalItems\"\n        (pageChange)=\"pageChange($event)\"\n    ></vdr-pagination-controls>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"selection.length === 0\">\n        {{ 'asset.add-asset-with-count' | translate: { count: selection.length } }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;flex-direction:column;height:70vh}.title-row{display:flex;align-items:center;justify-content:space-between}vdr-asset-gallery{flex:1}.paging-controls{padding-top:6px;border-top:1px solid var(--color-component-border-100);display:flex;justify-content:space-between;flex-shrink:0}\n"]
            },] }
];
AssetPickerDialogComponent.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService }
];
AssetPickerDialogComponent.propDecorators = {
    assetSearchInputComponent: [{ type: ViewChild, args: ['assetSearchInputComponent',] }],
    assetGalleryComponent: [{ type: ViewChild, args: ['assetGalleryComponent',] }]
};

class AssetPreviewLinksComponent {
    constructor() {
        this.sizes = ['tiny', 'thumb', 'small', 'medium', 'large', 'full'];
    }
}
AssetPreviewLinksComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-preview-links',
                template: "<vdr-dropdown>\n    <button class=\"btn btn-link\" vdrDropdownTrigger>\n        <clr-icon shape=\"link\"></clr-icon> {{ 'catalog.asset-preview-links' | translate }}<clr-icon shape=\"caret\" dir=\"down\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n        <a\n            *ngFor=\"let size of sizes\"\n            [href]=\"asset | assetPreview: size\"\n            [title]=\"asset | assetPreview: size\"\n            target=\"_blank\"\n            class=\"asset-preview-link\"\n            vdrDropdownItem\n        >\n            <vdr-chip><clr-icon shape=\"link\"></clr-icon> {{ 'asset.preview' | translate }}: {{ size }}</vdr-chip>\n        </a>\n    </vdr-dropdown-menu></vdr-dropdown\n>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".asset-preview-link{font-size:12px}\n"]
            },] }
];
AssetPreviewLinksComponent.propDecorators = {
    asset: [{ type: Input }]
};

class ManageTagsDialogComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.toDelete = [];
        this.toUpdate = [];
    }
    ngOnInit() {
        this.allTags$ = this.dataService.product.getTagList().mapStream(data => data.tags.items);
    }
    toggleDelete(id) {
        const marked = this.markedAsDeleted(id);
        if (marked) {
            this.toDelete = this.toDelete.filter(_id => _id !== id);
        }
        else {
            this.toDelete.push(id);
        }
    }
    markedAsDeleted(id) {
        return this.toDelete.includes(id);
    }
    updateTagValue(id, value) {
        const exists = this.toUpdate.find(i => i.id === id);
        if (exists) {
            exists.value = value;
        }
        else {
            this.toUpdate.push({ id, value });
        }
    }
    saveChanges() {
        const operations = [];
        for (const id of this.toDelete) {
            operations.push(this.dataService.product.deleteTag(id));
        }
        for (const item of this.toUpdate) {
            if (!this.toDelete.includes(item.id)) {
                operations.push(this.dataService.product.updateTag(item));
            }
        }
        return forkJoin(operations).subscribe(() => this.resolveWith(true));
    }
}
ManageTagsDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-manage-tags-dialog',
                template: "<ng-template vdrDialogTitle>\n    <span>{{ 'common.manage-tags' | translate }}</span>\n</ng-template>\n<p class=\"mt0 mb4\">{{ 'common.manage-tags-description' | translate }}</p>\n<ul class=\"tag-list\" *ngFor=\"let tag of allTags$ | async\">\n    <li class=\"mb2 p1\" [class.to-delete]=\"markedAsDeleted(tag.id)\">\n        <clr-icon shape=\"tag\" class=\"is-solid mr2\" [style.color]=\"tag.value | stringToColor\"></clr-icon>\n        <input type=\"text\" (input)=\"updateTagValue(tag.id, $event.target.value)\" [value]=\"tag.value\" />\n        <button class=\"icon-button\" (click)=\"toggleDelete(tag.id)\">\n            <clr-icon shape=\"trash\" class=\"is-danger\" [class.is-solid]=\"markedAsDeleted(tag.id)\"></clr-icon>\n        </button>\n    </li>\n</ul>\n<ng-template vdrDialogButtons>\n    <button type=\"submit\" (click)=\"resolveWith(false)\" class=\"btn btn-secondary\">\n        {{ 'common.cancel' | translate }}\n    </button>\n    <button\n        type=\"submit\"\n        (click)=\"saveChanges()\"\n        class=\"btn btn-primary\"\n        [disabled]=\"!toUpdate.length && !toDelete.length\"\n    >\n        {{ 'common.update' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".tag-list{list-style-type:none}.tag-list li{display:flex;align-items:center}.tag-list li input{max-width:170px}.tag-list li.to-delete{opacity:.7;background-color:var(--color-component-bg-300)}.tag-list li.to-delete input{background-color:transparent!important}\n"]
            },] }
];
ManageTagsDialogComponent.ctorParameters = () => [
    { type: DataService }
];

class AssetPreviewComponent {
    constructor(formBuilder, dataService, notificationService, changeDetector, modalService) {
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.changeDetector = changeDetector;
        this.modalService = modalService;
        this.editable = false;
        this.customFields = [];
        this.assetChange = new EventEmitter();
        this.editClick = new EventEmitter();
        this.size = 'medium';
        this.width = 0;
        this.height = 0;
        this.centered = true;
        this.settingFocalPoint = false;
    }
    get fpx() {
        return this.asset.focalPoint ? this.asset.focalPoint.x : null;
    }
    get fpy() {
        return this.asset.focalPoint ? this.asset.focalPoint.y : null;
    }
    ngOnInit() {
        var _a;
        const { focalPoint } = this.asset;
        this.form = this.formBuilder.group({
            name: [this.asset.name],
            tags: [(_a = this.asset.tags) === null || _a === void 0 ? void 0 : _a.map(t => t.value)],
        });
        this.subscription = this.form.valueChanges.subscribe(value => {
            this.assetChange.emit({
                id: this.asset.id,
                name: value.name,
                tags: value.tags,
            });
        });
        this.subscription.add(fromEvent(window, 'resize')
            .pipe(debounceTime(50))
            .subscribe(() => {
            this.updateDimensions();
            this.changeDetector.markForCheck();
        }));
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    getSourceFileName() {
        const parts = this.asset.source.split(/[\\\/]/g);
        return parts[parts.length - 1];
    }
    onImageLoad() {
        this.updateDimensions();
        this.changeDetector.markForCheck();
    }
    updateDimensions() {
        const img = this.imageElementRef.nativeElement;
        const container = this.previewDivRef.nativeElement;
        const imgWidth = img.naturalWidth;
        const imgHeight = img.naturalHeight;
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const constrainToContainer = this.settingFocalPoint;
        if (constrainToContainer) {
            const controlsMarginPx = 48 * 2;
            const availableHeight = containerHeight - controlsMarginPx;
            const availableWidth = containerWidth;
            const hRatio = imgHeight / availableHeight;
            const wRatio = imgWidth / availableWidth;
            const imageExceedsAvailableDimensions = 1 < hRatio || 1 < wRatio;
            if (imageExceedsAvailableDimensions) {
                const factor = hRatio < wRatio ? wRatio : hRatio;
                this.width = Math.round(imgWidth / factor);
                this.height = Math.round(imgHeight / factor);
                this.centered = true;
                return;
            }
        }
        this.width = imgWidth;
        this.height = imgHeight;
        this.centered = imgWidth <= containerWidth && imgHeight <= containerHeight;
    }
    setFocalPointStart() {
        this.sizePriorToSettingFocalPoint = this.size;
        this.size = 'medium';
        this.settingFocalPoint = true;
        this.lastFocalPoint = this.asset.focalPoint || { x: 0.5, y: 0.5 };
        this.updateDimensions();
    }
    removeFocalPoint() {
        this.dataService.product
            .updateAsset({
            id: this.asset.id,
            focalPoint: null,
        })
            .subscribe(() => {
            this.notificationService.success(marker('asset.update-focal-point-success'));
            this.asset = Object.assign(Object.assign({}, this.asset), { focalPoint: null });
            this.changeDetector.markForCheck();
        }, () => this.notificationService.error(marker('asset.update-focal-point-error')));
    }
    onFocalPointChange(point) {
        this.lastFocalPoint = point;
    }
    setFocalPointCancel() {
        this.settingFocalPoint = false;
        this.lastFocalPoint = undefined;
        this.size = this.sizePriorToSettingFocalPoint;
    }
    setFocalPointEnd() {
        this.settingFocalPoint = false;
        this.size = this.sizePriorToSettingFocalPoint;
        if (this.lastFocalPoint) {
            const { x, y } = this.lastFocalPoint;
            this.lastFocalPoint = undefined;
            this.dataService.product
                .updateAsset({
                id: this.asset.id,
                focalPoint: { x, y },
            })
                .subscribe(() => {
                this.notificationService.success(marker('asset.update-focal-point-success'));
                this.asset = Object.assign(Object.assign({}, this.asset), { focalPoint: { x, y } });
                this.changeDetector.markForCheck();
            }, () => this.notificationService.error(marker('asset.update-focal-point-error')));
        }
    }
    manageTags() {
        this.modalService
            .fromComponent(ManageTagsDialogComponent, {
            size: 'sm',
        })
            .subscribe(result => {
            if (result) {
                this.notificationService.success(marker('common.notify-updated-tags-success'));
            }
        });
    }
}
AssetPreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-preview',
                template: "<div class=\"preview-image\" #previewDiv [class.centered]=\"centered\">\n    <div class=\"image-wrapper\">\n        <vdr-focal-point-control\n            [width]=\"width\"\n            [height]=\"height\"\n            [fpx]=\"fpx\"\n            [fpy]=\"fpy\"\n            [editable]=\"settingFocalPoint\"\n            (focalPointChange)=\"onFocalPointChange($event)\"\n        >\n            <img\n                class=\"asset-image\"\n                [src]=\"asset | assetPreview: size\"\n                [ngClass]=\"size\"\n                #imageElement\n                (load)=\"onImageLoad()\"\n            />\n        </vdr-focal-point-control>\n        <div class=\"focal-point-info\" *ngIf=\"settingFocalPoint\">\n            <button class=\"icon-button\" (click)=\"setFocalPointCancel()\">\n                <clr-icon shape=\"times\"></clr-icon>\n            </button>\n            <button class=\"btn btn-primary btn-sm\" (click)=\"setFocalPointEnd()\" [disabled]=\"!lastFocalPoint\">\n                <clr-icon shape=\"crosshairs\"></clr-icon>\n                {{ 'asset.set-focal-point' | translate }}\n            </button>\n        </div>\n    </div>\n</div>\n\n<div class=\"controls\" [class.fade]=\"settingFocalPoint\">\n    <form [formGroup]=\"form\">\n        <clr-input-container class=\"name-input\" *ngIf=\"editable\">\n            <label>{{ 'common.name' | translate }}</label>\n            <input\n                clrInput\n                type=\"text\"\n                formControlName=\"name\"\n                [readonly]=\"!(['UpdateCatalog', 'UpdateAsset'] | hasPermission) || settingFocalPoint\"\n            />\n        </clr-input-container>\n\n        <vdr-labeled-data [label]=\"'common.name' | translate\" *ngIf=\"!editable\">\n            <span class=\"elide\">\n                {{ asset.name }}\n            </span>\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.source-file' | translate\">\n            <a [href]=\"asset.source\" [title]=\"asset.source\" target=\"_blank\" class=\"elide source-link\">{{\n                getSourceFileName()\n            }}</a>\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.original-asset-size' | translate\">\n            {{ asset.fileSize | filesize }}\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.dimensions' | translate\">\n            {{ asset.width }} x {{ asset.height }}\n        </vdr-labeled-data>\n\n        <vdr-labeled-data [label]=\"'asset.focal-point' | translate\">\n            <span *ngIf=\"fpx\"\n                ><clr-icon shape=\"crosshairs\"></clr-icon> x: {{ fpx | number: '1.2-2' }}, y:\n                {{ fpy | number: '1.2-2' }}</span\n            >\n            <span *ngIf=\"!fpx\">{{ 'common.not-set' | translate }}</span>\n            <br />\n            <button\n                class=\"btn btn-secondary-outline btn-sm\"\n                [disabled]=\"settingFocalPoint\"\n                (click)=\"setFocalPointStart()\"\n            >\n                <ng-container *ngIf=\"!fpx\">{{ 'asset.set-focal-point' | translate }}</ng-container>\n                <ng-container *ngIf=\"fpx\">{{ 'asset.update-focal-point' | translate }}</ng-container>\n            </button>\n            <button\n                class=\"btn btn-warning-outline btn-sm\"\n                [disabled]=\"settingFocalPoint\"\n                *ngIf=\"!!fpx\"\n                (click)=\"removeFocalPoint()\"\n            >\n                {{ 'asset.unset-focal-point' | translate }}\n            </button>\n        </vdr-labeled-data>\n        <vdr-labeled-data [label]=\"'common.tags' | translate\">\n            <ng-container *ngIf=\"editable\">\n                <vdr-tag-selector formControlName=\"tags\"></vdr-tag-selector>\n                <button class=\"btn btn-link btn-sm\" (click)=\"manageTags()\">\n                    <clr-icon shape=\"tags\"></clr-icon>\n                    {{ 'common.manage-tags' | translate }}\n                </button>\n            </ng-container>\n            <div *ngIf=\"!editable\">\n                <vdr-chip *ngFor=\"let tag of asset.tags\" [colorFrom]=\"tag.value\">\n                    <clr-icon shape=\"tag\" class=\"mr2\"></clr-icon>\n                    {{ tag.value }}</vdr-chip\n                >\n            </div>\n        </vdr-labeled-data>\n    </form>\n    <section *ngIf=\"customFields.length\">\n        <label>{{ 'common.custom-fields' | translate }}</label>\n        <vdr-tabbed-custom-fields\n            entityName=\"Asset\"\n            [compact]=\"true\"\n            [customFields]=\"customFields\"\n            [customFieldsFormGroup]=\"customFieldsForm\"\n            [readonly]=\"!(['UpdateCatalog', 'UpdateAsset'] | hasPermission)\"\n        ></vdr-tabbed-custom-fields>\n    </section>\n    <div class=\"flex-spacer\"></div>\n    <div class=\"preview-select\">\n        <clr-select-container>\n            <label>{{ 'asset.preview' | translate }}</label>\n            <select clrSelect name=\"options\" [(ngModel)]=\"size\" [disabled]=\"settingFocalPoint\">\n                <option value=\"tiny\">tiny</option>\n                <option value=\"thumb\">thumb</option>\n                <option value=\"small\">small</option>\n                <option value=\"medium\">medium</option>\n                <option value=\"large\">large</option>\n                <option value=\"\">full size</option>\n            </select>\n        </clr-select-container>\n        <div class=\"asset-detail\">{{ width }} x {{ height }}</div>\n    </div>\n    <vdr-asset-preview-links class=\"mb4\" [asset]=\"asset\"></vdr-asset-preview-links>\n    <div *ngIf=\"!editable\" class=\"edit-button-wrapper\">\n        <a\n            class=\"btn btn-link btn-sm\"\n            [routerLink]=\"['/catalog', 'assets', asset.id]\"\n            (click)=\"editClick.emit()\"\n        >\n            <clr-icon shape=\"edit\"></clr-icon>\n            {{ 'common.edit' | translate }}\n        </a>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;height:100%}.preview-image{width:100%;height:100%;min-height:60vh;overflow:auto;text-align:center;box-shadow:inset 0 0 5px #0000001a;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACuoAAArqAVDM774AAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAAK0lEQVQ4T2P4jwP8xgFGNSADqDwGIF0DlMYAUH0YYFQDMoDKYwASNfz/DwB/JvcficphowAAAABJRU5ErkJggg==);flex:1}.preview-image.centered{display:flex;align-items:center;justify-content:center}.preview-image vdr-focal-point-control{position:relative;box-shadow:0 0 10px -3px #00000026}.preview-image .image-wrapper{position:relative}.preview-image .asset-image{width:100%}.preview-image .asset-image.tiny{max-width:50px;max-height:50px}.preview-image .asset-image.thumb{max-width:150px;max-height:150px}.preview-image .asset-image.small{max-width:300px;max-height:300px}.preview-image .asset-image.medium{max-width:500px;max-height:500px}.preview-image .asset-image.large{max-width:800px;max-height:800px}.preview-image .focal-point-info{position:absolute;display:flex;right:0}.controls{display:flex;flex-direction:column;margin-left:12px;min-width:15vw;max-width:25vw;transition:opacity .3s}.controls.fade{opacity:.5}.controls .name-input{margin-bottom:24px}.controls ::ng-deep .clr-control-container{width:100%}.controls ::ng-deep .clr-control-container .clr-input{width:100%}.controls .elide{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;display:block}.controls .source-link{direction:rtl}.controls .preview-select{display:flex;align-items:center}.controls .preview-select clr-select-container{margin-right:12px}.edit-button-wrapper{padding-top:6px;border-top:1px solid var(--color-component-border-100);text-align:center}\n"]
            },] }
];
AssetPreviewComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: DataService },
    { type: NotificationService },
    { type: ChangeDetectorRef },
    { type: ModalService }
];
AssetPreviewComponent.propDecorators = {
    asset: [{ type: Input }],
    editable: [{ type: Input }],
    customFields: [{ type: Input }],
    customFieldsForm: [{ type: Input }],
    assetChange: [{ type: Output }],
    editClick: [{ type: Output }],
    imageElementRef: [{ type: ViewChild, args: ['imageElement', { static: true },] }],
    previewDivRef: [{ type: ViewChild, args: ['previewDiv', { static: true },] }]
};

/**
 * A custom SelectionModel for the NgSelect component which only allows a single
 * search term at a time.
 */
class SingleSearchSelectionModel {
    constructor() {
        this._selected = [];
    }
    get value() {
        return this._selected;
    }
    select(item, multiple, groupAsModel) {
        item.selected = true;
        if (groupAsModel || !item.children) {
            if (item.value.label) {
                const isSearchTerm = (i) => !!i.value.label;
                const searchTerms = this._selected.filter(isSearchTerm);
                if (searchTerms.length > 0) {
                    // there is already a search term, so replace it with this new one.
                    this._selected = this._selected.filter(i => !isSearchTerm(i)).concat(item);
                }
                else {
                    this._selected.push(item);
                }
            }
            else {
                this._selected.push(item);
            }
        }
    }
    unselect(item, multiple) {
        this._selected = this._selected.filter(x => x !== item);
        item.selected = false;
    }
    clear(keepDisabled) {
        this._selected = keepDisabled ? this._selected.filter(x => x.disabled) : [];
    }
    _setChildrenSelectedState(children, selected) {
        children.forEach(x => (x.selected = selected));
    }
    _removeChildren(parent) {
        this._selected = this._selected.filter(x => x.parent !== parent);
    }
    _removeParent(parent) {
        this._selected = this._selected.filter(x => x !== parent);
    }
}
function SingleSearchSelectionModelFactory() {
    return new SingleSearchSelectionModel();
}

const ɵ0$2 = SingleSearchSelectionModelFactory;
class AssetSearchInputComponent {
    constructor() {
        this.searchTermChange = new EventEmitter();
        this.tagsChange = new EventEmitter();
        this.lastTerm = '';
        this.lastTagIds = [];
        this.filterTagResults = (term, item) => {
            if (!this.isTag(item)) {
                return false;
            }
            return item.value.toLowerCase().startsWith(term.toLowerCase());
        };
        this.isTag = (input) => {
            return typeof input === 'object' && !!input && input.hasOwnProperty('value');
        };
    }
    setSearchTerm(term) {
        if (term) {
            this.selectComponent.select({ label: term, value: { label: term } });
        }
        else {
            const currentTerm = this.selectComponent.selectedItems.find(i => !this.isTag(i.value));
            if (currentTerm) {
                this.selectComponent.unselect(currentTerm);
            }
        }
    }
    setTags(tags) {
        const items = this.selectComponent.items;
        this.selectComponent.selectedItems.forEach(item => {
            if (this.isTag(item.value) && !tags.map(t => t.id).includes(item.id)) {
                this.selectComponent.unselect(item);
            }
        });
        tags.map(tag => {
            return items === null || items === void 0 ? void 0 : items.find(item => this.isTag(item) && item.id === tag.id);
        })
            .filter(notNullOrUndefined)
            .forEach(item => {
            const isSelected = this.selectComponent.selectedItems.find(i => {
                const val = i.value;
                if (this.isTag(val)) {
                    return val.id === item.id;
                }
                return false;
            });
            if (!isSelected) {
                this.selectComponent.select({ label: '', value: item });
            }
        });
    }
    onSelectChange(selectedItems) {
        if (!Array.isArray(selectedItems)) {
            selectedItems = [selectedItems];
        }
        const searchTermItems = selectedItems.filter(item => !this.isTag(item));
        if (1 < searchTermItems.length) {
            for (let i = 0; i < searchTermItems.length - 1; i++) {
                // this.selectComponent.unselect(searchTermItems[i] as any);
            }
        }
        const searchTermItem = searchTermItems[searchTermItems.length - 1];
        const searchTerm = searchTermItem ? searchTermItem.label : '';
        const tags = selectedItems.filter(this.isTag);
        if (searchTerm !== this.lastTerm) {
            this.searchTermChange.emit(searchTerm);
            this.lastTerm = searchTerm;
        }
        if (this.lastTagIds.join(',') !== tags.map(t => t.id).join(',')) {
            this.tagsChange.emit(tags);
            this.lastTagIds = tags.map(t => t.id);
        }
    }
    isSearchHeaderSelected() {
        return this.selectComponent.itemsList.markedIndex === -1;
    }
    addTagFn(item) {
        return { label: item };
    }
}
AssetSearchInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-asset-search-input',
                template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [placeholder]=\"'catalog.search-asset-name-or-tag' | translate\"\n    [items]=\"tags\"\n    [searchFn]=\"filterTagResults\"\n    [hideSelected]=\"true\"\n    [multiple]=\"true\"\n    [markFirst]=\"false\"\n    (change)=\"onSelectChange($event)\"\n    #selectComponent\n>\n    <ng-template ng-header-tmp>\n        <div\n            class=\"search-header\"\n            *ngIf=\"selectComponent.searchTerm\"\n            [class.selected]=\"isSearchHeaderSelected()\"\n            (click)=\"selectComponent.selectTag()\"\n        >\n            {{ 'catalog.search-for-term' | translate }}: {{ selectComponent.searchTerm }}\n        </div>\n    </ng-template>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <ng-container *ngIf=\"item.value\">\n            <vdr-chip [colorFrom]=\"item.value\" icon=\"close\" (iconClick)=\"clear(item)\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ item.value }}</vdr-chip>\n        </ng-container>\n        <ng-container *ngIf=\"!item.value\">\n            <vdr-chip [icon]=\"'times'\" (iconClick)=\"clear(item)\">\"{{ item.label || item }}\"</vdr-chip>\n        </ng-container>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\" let-search=\"searchTerm\">\n        <ng-container *ngIf=\"item.value\">\n            <vdr-chip [colorFrom]=\"item.value\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ item.value }}</vdr-chip>\n        </ng-container>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: SELECTION_MODEL_FACTORY, useValue: ɵ0$2 }],
                styles: [":host{display:block;width:100%}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}ng-select{width:100%;min-width:300px;margin-right:12px}.search-header{padding:8px 10px;border-bottom:1px solid var(--color-component-border-100);cursor:pointer}.search-header.selected,.search-header:hover{background-color:var(--color-component-bg-200)}\n"]
            },] }
];
AssetSearchInputComponent.propDecorators = {
    tags: [{ type: Input }],
    searchTermChange: [{ type: Output }],
    tagsChange: [{ type: Output }],
    selectComponent: [{ type: ViewChild, args: ['selectComponent', { static: true },] }]
};

class BulkActionRegistryService {
    constructor() {
        this.locationBulActionMap = new Map();
    }
    registerBulkAction(bulkAction) {
        if (!this.locationBulActionMap.has(bulkAction.location)) {
            this.locationBulActionMap.set(bulkAction.location, new Set([bulkAction]));
        }
        else {
            // tslint:disable-next-line:no-non-null-assertion
            this.locationBulActionMap.get(bulkAction.location).add(bulkAction);
        }
    }
    getBulkActionsForLocation(id) {
        var _a, _b;
        return [...((_b = (_a = this.locationBulActionMap.get(id)) === null || _a === void 0 ? void 0 : _a.values()) !== null && _b !== void 0 ? _b : [])];
    }
}
BulkActionRegistryService.ɵprov = i0.ɵɵdefineInjectable({ factory: function BulkActionRegistryService_Factory() { return new BulkActionRegistryService(); }, token: BulkActionRegistryService, providedIn: "root" });
BulkActionRegistryService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

class BulkActionMenuComponent {
    constructor(bulkActionRegistryService, injector, route, dataService, changeDetectorRef) {
        this.bulkActionRegistryService = bulkActionRegistryService;
        this.injector = injector;
        this.route = route;
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.userPermissions = [];
    }
    ngOnInit() {
        const actionsForLocation = this.bulkActionRegistryService.getBulkActionsForLocation(this.locationId);
        this.actions$ = this.selectionManager.selectionChanges$.pipe(switchMap(selection => {
            return Promise.all(actionsForLocation.map((action) => __awaiter(this, void 0, void 0, function* () {
                let display = true;
                let translationVars = {};
                const isVisibleFn = action.isVisible;
                const getTranslationVarsFn = action.getTranslationVars;
                const functionContext = {
                    injector: this.injector,
                    hostComponent: this.hostComponent,
                    route: this.route,
                    selection,
                };
                if (typeof isVisibleFn === 'function') {
                    display = yield isVisibleFn(functionContext);
                }
                if (typeof getTranslationVarsFn === 'function') {
                    translationVars = yield getTranslationVarsFn(functionContext);
                }
                return Object.assign(Object.assign({}, action), { display, translationVars });
            })));
        }));
        this.subscription = this.dataService.client
            .userStatus()
            .mapStream(({ userStatus }) => {
            this.userPermissions = userStatus.permissions;
        })
            .subscribe();
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    hasPermissions(bulkAction) {
        if (!this.userPermissions) {
            return false;
        }
        if (!bulkAction.requiresPermission) {
            return true;
        }
        if (typeof bulkAction.requiresPermission === 'string') {
            return this.userPermissions.includes(bulkAction.requiresPermission);
        }
        if (typeof bulkAction.requiresPermission === 'function') {
            return bulkAction.requiresPermission(this.userPermissions);
        }
    }
    actionClick(event, action) {
        action.onClick({
            injector: this.injector,
            event,
            route: this.route,
            selection: this.selectionManager.selection,
            hostComponent: this.hostComponent,
            clearSelection: () => this.selectionManager.clearSelection(),
        });
    }
    clearSelection() {
        this.selectionManager.clearSelection();
        this.changeDetectorRef.markForCheck();
    }
}
BulkActionMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-bulk-action-menu',
                template: "<vdr-dropdown *ngIf=\"actions$ | async as actions\">\n    <button\n        class=\"btn btn-sm btn-outline mr1\"\n        vdrDropdownTrigger\n        [disabled]=\"!selectionManager.selection?.length\"\n        [class.hidden]=\"!selectionManager.selection?.length\"\n    >\n        <clr-icon shape=\"file-group\"></clr-icon>\n        {{ 'common.with-selected' | translate: { count:selectionManager.selection.length } }}\n    </button>\n    <vdr-dropdown-menu vdrPosition=\"bottom-left\">\n        <ng-container *ngIf=\"actions.length; else noActions\">\n            <ng-container *ngFor=\"let action of actions\">\n                <button\n                    *ngIf=\"action.display\"\n                    [disabled]=\"!hasPermissions(action)\"\n                    type=\"button\"\n                    vdrDropdownItem\n                    (click)=\"actionClick($event, action)\"\n                >\n                    <clr-icon\n                        *ngIf=\"action.icon\"\n                        [attr.shape]=\"action.icon\"\n                        [ngClass]=\"action.iconClass || ''\"\n                    ></clr-icon>\n                    {{ action.label | translate: action.translationVars }}\n                </button>\n            </ng-container>\n        </ng-container>\n        <ng-template #noActions>\n            <button type=\"button\" disabled vdrDropdownItem>{{ 'common.no-bulk-actions-available' | translate }}</button>\n        </ng-template>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n<button\n    class=\"btn btn-sm btn-link\"\n    (click)=\"clearSelection()\"\n    [class.hidden]=\"!selectionManager.selection?.length\"\n>\n    <clr-icon shape=\"times\"></clr-icon>\n    {{ 'common.clear-selection' | translate }}\n</button>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-flex;align-items:center}button.hidden{display:none}\n"]
            },] }
];
BulkActionMenuComponent.ctorParameters = () => [
    { type: BulkActionRegistryService },
    { type: Injector },
    { type: ActivatedRoute },
    { type: DataService },
    { type: ChangeDetectorRef }
];
BulkActionMenuComponent.propDecorators = {
    locationId: [{ type: Input }],
    selectionManager: [{ type: Input }],
    hostComponent: [{ type: Input }]
};

class ChannelAssignmentControlComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.multiple = true;
        this.includeDefaultChannel = true;
        this.disableChannelIds = [];
        this.value = [];
        this.disabled = false;
    }
    ngOnInit() {
        this.channels$ = this.dataService.client.userStatus().single$.pipe(map(({ userStatus }) => userStatus.channels.filter(c => this.includeDefaultChannel ? true : c.code !== DEFAULT_CHANNEL_CODE)), tap(channels => {
            if (!this.channels) {
                this.channels = channels;
                this.mapIncomingValueToChannels(this.lastIncomingValue);
            }
            else {
                this.channels = channels;
            }
        }));
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(obj) {
        this.lastIncomingValue = obj;
        this.mapIncomingValueToChannels(obj);
    }
    focussed() {
        if (this.onTouched) {
            this.onTouched();
        }
    }
    channelIsDisabled(id) {
        return this.disableChannelIds.includes(id);
    }
    valueChanged(value) {
        if (Array.isArray(value)) {
            this.onChange(value.map(c => c.id));
        }
        else {
            this.onChange([value ? value.id : undefined]);
        }
    }
    compareFn(c1, c2) {
        const c1id = typeof c1 === 'string' ? c1 : c1.id;
        const c2id = typeof c2 === 'string' ? c2 : c2.id;
        return c1id === c2id;
    }
    mapIncomingValueToChannels(value) {
        var _a;
        if (Array.isArray(value)) {
            if (typeof value[0] === 'string') {
                this.value = value
                    .map(id => { var _a; return (_a = this.channels) === null || _a === void 0 ? void 0 : _a.find(c => c.id === id); })
                    .filter(notNullOrUndefined);
            }
            else {
                this.value = value;
            }
        }
        else {
            if (typeof value === 'string') {
                const channel = (_a = this.channels) === null || _a === void 0 ? void 0 : _a.find(c => c.id === value);
                if (channel) {
                    this.value = [channel];
                }
            }
            else if (value && value.id) {
                this.value = [value];
            }
        }
    }
}
ChannelAssignmentControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-channel-assignment-control',
                template: "<ng-select\n    appendTo=\"body\"\n    [addTag]=\"false\"\n    [multiple]=\"multiple\"\n    [ngModel]=\"value\"\n    [clearable]=\"false\"\n    [searchable]=\"false\"\n    [disabled]=\"disabled\"\n    [compareWith]=\"compareFn\"\n    (focus)=\"focussed()\"\n    (change)=\"valueChanged($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <span aria-hidden=\"true\" class=\"ng-value-icon left\" (click)=\"clear(item)\"> \u00D7 </span>\n        <vdr-channel-badge [channelCode]=\"item.code\"></vdr-channel-badge>\n        <span class=\"channel-label\">{{ item.code | channelCodeToLabel | translate }}</span>\n    </ng-template>\n    <ng-option *ngFor=\"let item of channels$ | async\" [value]=\"item\" [disabled]=\"channelIsDisabled(item.id)\">\n        <vdr-channel-badge [channelCode]=\"item.code\"></vdr-channel-badge>\n        {{ item.code | channelCodeToLabel | translate }}\n    </ng-option>\n</ng-select>\n\n",
                changeDetection: ChangeDetectionStrategy.Default,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: ChannelAssignmentControlComponent,
                        multi: true,
                    },
                ],
                styles: [":host{min-width:200px}:host.clr-input{border-bottom:none;padding:0}::ng-deep .ng-value>vdr-channel-badge,::ng-deep .ng-option>vdr-channel-badge{margin-bottom:-1px}::ng-deep .ng-value>vdr-channel-badge{margin-left:6px}.channel-label{margin-right:6px}\n"]
            },] }
];
ChannelAssignmentControlComponent.ctorParameters = () => [
    { type: DataService }
];
ChannelAssignmentControlComponent.propDecorators = {
    multiple: [{ type: Input }],
    includeDefaultChannel: [{ type: Input }],
    disableChannelIds: [{ type: Input }]
};

class ChannelBadgeComponent {
    get isDefaultChannel() {
        return this.channelCode === DEFAULT_CHANNEL_CODE;
    }
}
ChannelBadgeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-channel-badge',
                template: "<clr-icon shape=\"layers\" [style.color]=\"isDefaultChannel ? '#aaa' : (channelCode | stringToColor)\"></clr-icon>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block}button :host{margin-bottom:-1px}clr-icon{margin-right:6px}\n"]
            },] }
];
ChannelBadgeComponent.propDecorators = {
    channelCode: [{ type: Input }]
};

/**
 * @description
 * A chip component for displaying a label with an optional action icon.
 *
 * @example
 * ```HTML
 * <vdr-chip [colorFrom]="item.value"
 *           icon="close"
 *           (iconClick)="clear(item)">
 * {{ item.value }}</vdr-chip>
 * ```
 * @docsCategory components
 */
class ChipComponent {
    constructor() {
        this.invert = false;
        /**
         * @description
         * If set, the chip will have an auto-generated background
         * color based on the string value passed in.
         */
        this.colorFrom = '';
        this.iconClick = new EventEmitter();
    }
}
ChipComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-chip',
                template: "<div\n    class=\"wrapper\"\n    [class.with-background]=\"!invert && colorFrom\"\n    [style.backgroundColor]=\"!invert && (colorFrom | stringToColor)\"\n    [style.color]=\"invert && (colorFrom | stringToColor)\"\n    [style.borderColor]=\"invert && (colorFrom | stringToColor)\"\n    [ngClass]=\"colorType\"\n>\n    <div class=\"chip-label\"><ng-content></ng-content></div>\n    <div class=\"chip-icon\" *ngIf=\"icon\">\n        <button (click)=\"iconClick.emit($event)\">\n            <clr-icon\n                [attr.shape]=\"icon\"\n                [style.color]=\"invert && (colorFrom | stringToColor)\"\n                [class.is-inverse]=\"!invert && colorFrom\"\n            ></clr-icon>\n        </button>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block}.wrapper{display:flex;border:1px solid var(--color-component-border-300);border-radius:3px;margin:6px}.wrapper.with-background{color:var(--color-grey-100);border-color:transparent}.wrapper.with-background .chip-label{opacity:.9}.wrapper.warning{border-color:var(--color-chip-warning-border)}.wrapper.warning .chip-label{color:var(--color-chip-warning-text);background-color:var(--color-chip-warning-bg)}.wrapper.success{border-color:var(--color-chip-success-border)}.wrapper.success .chip-label{color:var(--color-chip-success-text);background-color:var(--color-chip-success-bg)}.wrapper.error{border-color:var(--color-chip-error-border)}.wrapper.error .chip-label{color:var(--color-chip-error-text);background-color:var(--color-chip-error-bg)}.chip-label{padding:3px 6px;line-height:1em;border-radius:3px;white-space:nowrap;display:flex;align-items:center}.chip-icon{border-left:1px solid var(--color-component-border-200);padding:0 3px;line-height:1em;display:flex}.chip-icon button{cursor:pointer;background:none;margin:0;padding:0;border:none}\n"]
            },] }
];
ChipComponent.propDecorators = {
    icon: [{ type: Input }],
    invert: [{ type: Input }],
    colorFrom: [{ type: Input }],
    colorType: [{ type: Input }],
    iconClick: [{ type: Output }]
};

/**
 * @description
 * A form input control which displays currency in decimal format, whilst working
 * with the integer cent value in the background.
 *
 * @example
 * ```HTML
 * <vdr-currency-input
 *     [(ngModel)]="entityPrice"
 *     [currencyCode]="currencyCode"
 * ></vdr-currency-input>
 * ```
 *
 * @docsCategory components
 */
class CurrencyInputComponent {
    constructor(dataService, changeDetectorRef) {
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.disabled = false;
        this.readonly = false;
        this.currencyCode = '';
        this.valueChange = new EventEmitter();
        this.hasFractionPart = true;
        this.currencyCode$ = new BehaviorSubject('');
    }
    ngOnInit() {
        const languageCode$ = this.dataService.client.uiState().mapStream(data => data.uiState.language);
        const shouldPrefix$ = combineLatest(languageCode$, this.currencyCode$).pipe(map(([languageCode, currencyCode]) => {
            var _a, _b;
            if (!currencyCode) {
                return '';
            }
            const locale = languageCode.replace(/_/g, '-');
            const parts = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'symbol',
            }).formatToParts();
            const NaNString = (_b = (_a = parts.find(p => p.type === 'nan')) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 'NaN';
            const localised = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'symbol',
            }).format(undefined);
            return localised.indexOf(NaNString) > 0;
        }));
        this.prefix$ = shouldPrefix$.pipe(map(shouldPrefix => (shouldPrefix ? this.currencyCode : '')));
        this.suffix$ = shouldPrefix$.pipe(map(shouldPrefix => (shouldPrefix ? '' : this.currencyCode)));
        this.subscription = combineLatest(languageCode$, this.currencyCode$).subscribe(([languageCode, currencyCode]) => {
            if (!currencyCode) {
                return '';
            }
            const locale = languageCode.replace(/_/g, '-');
            const parts = new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'symbol',
            }).formatToParts(123.45);
            this.hasFractionPart = !!parts.find(p => p.type === 'fraction');
            this._inputValue = this.toNumericString(this._inputValue);
        });
    }
    ngOnChanges(changes) {
        if ('value' in changes) {
            this.writeValue(changes['value'].currentValue);
        }
        if ('currencyCode' in changes) {
            this.currencyCode$.next(this.currencyCode);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    onInput(value) {
        const integerValue = Math.round(+value * 100);
        if (typeof this.onChange === 'function') {
            this.onChange(integerValue);
        }
        this.valueChange.emit(integerValue);
        const delta = Math.abs(Number(this._inputValue) - Number(value));
        if (0.009 < delta && delta < 0.011) {
            this._inputValue = this.toNumericString(value);
        }
        else {
            this._inputValue = value;
        }
    }
    onFocus() {
        if (typeof this.onTouch === 'function') {
            this.onTouch();
        }
    }
    writeValue(value) {
        const numericValue = +value;
        if (!Number.isNaN(numericValue)) {
            this._inputValue = this.toNumericString(Math.floor(value) / 100);
        }
    }
    toNumericString(value) {
        return this.hasFractionPart ? Number(value).toFixed(2) : Number(value).toFixed(0);
    }
}
CurrencyInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-currency-input',
                template: "<vdr-affixed-input\n    [prefix]=\"prefix$ | async | localeCurrencyName: 'symbol'\"\n    [suffix]=\"suffix$ | async | localeCurrencyName: 'symbol'\"\n>\n    <input\n        type=\"number\"\n        [step]=\"hasFractionPart ? 0.01 : 1\"\n        [value]=\"_inputValue\"\n        [disabled]=\"disabled\"\n        [readonly]=\"readonly\"\n        (input)=\"onInput($event.target.value)\"\n        (focus)=\"onFocus()\"\n    />\n</vdr-affixed-input>\n",
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: CurrencyInputComponent,
                        multi: true,
                    },
                ],
                styles: [":host{padding:0;border:none}input{max-width:96px}input[readonly]{background-color:transparent}\n"]
            },] }
];
CurrencyInputComponent.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];
CurrencyInputComponent.propDecorators = {
    disabled: [{ type: Input }],
    readonly: [{ type: Input }],
    value: [{ type: Input }],
    currencyCode: [{ type: Input }],
    valueChange: [{ type: Output }]
};

/**
 * @description
 * Registers a {@link CustomDetailComponent} to be placed in a given location. This allows you
 * to embed any type of custom Angular component in the entity detail pages of the Admin UI.
 *
 * @docsCategory custom-detail-components
 */
function registerCustomDetailComponent(config) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (customDetailComponentService) => () => {
            customDetailComponentService.registerCustomDetailComponent(config);
        },
        deps: [CustomDetailComponentService],
    };
}
class CustomDetailComponentService {
    constructor() {
        this.customDetailComponents = new Map();
    }
    registerCustomDetailComponent(config) {
        var _a;
        if (this.customDetailComponents.has(config.locationId)) {
            (_a = this.customDetailComponents.get(config.locationId)) === null || _a === void 0 ? void 0 : _a.push(config);
        }
        else {
            this.customDetailComponents.set(config.locationId, [config]);
        }
    }
    getCustomDetailComponentsFor(locationId) {
        var _a;
        return (_a = this.customDetailComponents.get(locationId)) !== null && _a !== void 0 ? _a : [];
    }
}
CustomDetailComponentService.ɵprov = i0.ɵɵdefineInjectable({ factory: function CustomDetailComponentService_Factory() { return new CustomDetailComponentService(); }, token: CustomDetailComponentService, providedIn: "root" });
CustomDetailComponentService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

class CustomDetailComponentHostComponent {
    constructor(viewContainerRef, componentFactoryResolver, customDetailComponentService) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.customDetailComponentService = customDetailComponentService;
        this.componentRefs = [];
    }
    ngOnInit() {
        const customComponents = this.customDetailComponentService.getCustomDetailComponentsFor(this.locationId);
        for (const config of customComponents) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(config.component);
            const componentRef = this.viewContainerRef.createComponent(factory);
            componentRef.instance.entity$ = this.entity$;
            componentRef.instance.detailForm = this.detailForm;
            this.componentRefs.push(componentRef);
        }
    }
    ngOnDestroy() {
        for (const ref of this.componentRefs) {
            ref.destroy();
        }
    }
}
CustomDetailComponentHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-custom-detail-component-host',
                template: "<vdr-ui-extension-point [locationId]=\"locationId\" api=\"detailComponent\"></vdr-ui-extension-point>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
CustomDetailComponentHostComponent.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: CustomDetailComponentService }
];
CustomDetailComponentHostComponent.propDecorators = {
    locationId: [{ type: Input }],
    entity$: [{ type: Input }],
    detailForm: [{ type: Input }]
};

/**
 * This component renders the appropriate type of form input control based
 * on the "type" property of the provided CustomFieldConfig.
 */
class CustomFieldControlComponent {
    constructor(dataService, customFieldComponentService) {
        this.dataService = dataService;
        this.customFieldComponentService = customFieldComponentService;
        this.compact = false;
        this.showLabel = true;
        this.readonly = false;
        this.hasCustomControl = false;
    }
    ngOnInit() {
        this.uiLanguage$ = this.dataService.client
            .uiState()
            .stream$.pipe(map(({ uiState }) => uiState.language));
    }
    getFieldDefinition() {
        const config = Object.assign({}, this.customField);
        const id = this.customFieldComponentService.customFieldComponentExists(this.entityName, this.customField.name);
        if (id) {
            config.ui = { component: id };
        }
        switch (config.__typename) {
            case 'IntCustomFieldConfig':
                return Object.assign(Object.assign({}, config), { min: config.intMin, max: config.intMax, step: config.intStep });
            case 'FloatCustomFieldConfig':
                return Object.assign(Object.assign({}, config), { min: config.floatMin, max: config.floatMax, step: config.floatStep });
            case 'DateTimeCustomFieldConfig':
                return Object.assign(Object.assign({}, config), { min: config.datetimeMin, max: config.datetimeMax, step: config.datetimeStep });
            default:
                return Object.assign({}, config);
        }
    }
}
CustomFieldControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-custom-field-control',
                template: "<div class=\"clr-form-control\" *ngIf=\"compact\">\n    <label for=\"basic\" class=\"clr-control-label\">{{ customField | customFieldLabel:(uiLanguage$ | async) }}</label>\n    <div class=\"clr-control-container\">\n        <div class=\"clr-input-wrapper\">\n            <ng-container *ngTemplateOutlet=\"inputs\"></ng-container>\n        </div>\n    </div>\n</div>\n<vdr-form-field [label]=\"customField | customFieldLabel:(uiLanguage$ | async)\" [for]=\"customField.name\" *ngIf=\"!compact\">\n    <ng-container *ngTemplateOutlet=\"inputs\"></ng-container>\n</vdr-form-field>\n\n<ng-template #inputs>\n    <ng-container [formGroup]=\"formGroup\">\n        <vdr-dynamic-form-input\n            [formControlName]=\"customField.name\"\n            [readonly]=\"readonly || customField.readonly\"\n            [control]=\"formGroup.get(customField.name)\"\n            [def]=\"getFieldDefinition()\"\n        >\n        </vdr-dynamic-form-input>\n    </ng-container>\n</ng-template>\n",
                styles: [":host{display:block;width:100%}:host .toggle-switch{margin-top:0;margin-bottom:0}\n"]
            },] }
];
CustomFieldControlComponent.ctorParameters = () => [
    { type: DataService },
    { type: CustomFieldComponentService }
];
CustomFieldControlComponent.propDecorators = {
    entityName: [{ type: Input }],
    formGroup: [{ type: Input, args: ['customFieldsFormGroup',] }],
    customField: [{ type: Input }],
    compact: [{ type: Input }],
    showLabel: [{ type: Input }],
    readonly: [{ type: Input }],
    customComponentPlaceholder: [{ type: ViewChild, args: ['customComponentPlaceholder', { read: ViewContainerRef },] }]
};

class CustomerLabelComponent {
}
CustomerLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-customer-label',
                template: "<clr-icon shape=\"user\" [class.is-solid]=\"customer\"></clr-icon>\n<div *ngIf=\"customer\">\n    <a [routerLink]=\"['/customer', 'customers', customer.id]\">\n        {{ customer.firstName }} {{ customer.lastName }}\n    </a>\n    <br />\n    <a [routerLink]=\"['/customer', 'customers', customer.id]\">\n        {{ customer.phoneNumber }}\n    </a>\n</div>\n<div *ngIf=\"!customer\">{{ 'common.guest' | translate }}</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;align-items:center}clr-icon{margin-right:6px}\n"]
            },] }
];
CustomerLabelComponent.propDecorators = {
    customer: [{ type: Input }]
};

class DataTableColumnComponent {
    constructor() {
        /**
         * When set to true, this column will expand to use avaiable width
         */
        this.expand = false;
    }
}
DataTableColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dt-column',
                template: `
        <ng-template><ng-content></ng-content></ng-template>
    `
            },] }
];
DataTableColumnComponent.propDecorators = {
    expand: [{ type: Input }],
    template: [{ type: ViewChild, args: [TemplateRef, { static: true },] }]
};

/**
 * @description
 * A table for displaying PaginatedList results. It is designed to be used inside components which
 * extend the {@link BaseListComponent} class.
 *
 * @example
 * ```HTML
 * <vdr-data-table
 *   [items]="items$ | async"
 *   [itemsPerPage]="itemsPerPage$ | async"
 *   [totalItems]="totalItems$ | async"
 *   [currentPage]="currentPage$ | async"
 *   (pageChange)="setPageNumber($event)"
 *   (itemsPerPageChange)="setItemsPerPage($event)"
 * >
 *   <!-- The header columns are defined first -->
 *   <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>
 *   <vdr-dt-column></vdr-dt-column>
 *   <vdr-dt-column></vdr-dt-column>
 *
 *   <!-- Then we define how a row is rendered -->
 *   <ng-template let-taxRate="item">
 *     <td class="left align-middle">{{ taxRate.name }}</td>
 *     <td class="left align-middle">{{ taxRate.category.name }}</td>
 *     <td class="left align-middle">{{ taxRate.zone.name }}</td>
 *     <td class="left align-middle">{{ taxRate.value }}%</td>
 *     <td class="right align-middle">
 *       <vdr-table-row-action
 *         iconShape="edit"
 *         [label]="'common.edit' | translate"
 *         [linkTo]="['./', taxRate.id]"
 *       ></vdr-table-row-action>
 *     </td>
 *     <td class="right align-middle">
 *       <vdr-dropdown>
 *         <button type="button" class="btn btn-link btn-sm" vdrDropdownTrigger>
 *           {{ 'common.actions' | translate }}
 *           <clr-icon shape="caret down"></clr-icon>
 *         </button>
 *         <vdr-dropdown-menu vdrPosition="bottom-right">
 *           <button
 *               type="button"
 *               class="delete-button"
 *               (click)="deleteTaxRate(taxRate)"
 *               [disabled]="!(['DeleteSettings', 'DeleteTaxRate'] | hasPermission)"
 *               vdrDropdownItem
 *           >
 *               <clr-icon shape="trash" class="is-danger"></clr-icon>
 *               {{ 'common.delete' | translate }}
 *           </button>
 *         </vdr-dropdown-menu>
 *       </vdr-dropdown>
 *     </td>
 *   </ng-template>
 * </vdr-data-table>
 * ```
 *
 * @docsCategory components
 */
class DataTableComponent {
    constructor(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.pageChange = new EventEmitter();
        this.itemsPerPageChange = new EventEmitter();
        /** @deprecated pass a SelectionManager instance instead */
        this.allSelectChange = new EventEmitter();
        /** @deprecated pass a SelectionManager instance instead */
        this.rowSelectChange = new EventEmitter();
        // This is used to apply a `user-select: none` CSS rule to the table,
        // which allows shift-click multi-row selection
        this.disableSelect = false;
        this.shiftDownHandler = (event) => {
            if (event.shiftKey && !this.disableSelect) {
                this.disableSelect = true;
                this.changeDetectorRef.markForCheck();
            }
        };
        this.shiftUpHandler = (event) => {
            if (this.disableSelect) {
                this.disableSelect = false;
                this.changeDetectorRef.markForCheck();
            }
        };
    }
    ngOnInit() {
        var _a;
        if (typeof this.isRowSelectedFn === 'function' || this.selectionManager) {
            document.addEventListener('keydown', this.shiftDownHandler, { passive: true });
            document.addEventListener('keyup', this.shiftUpHandler, { passive: true });
        }
        this.subscription = (_a = this.selectionManager) === null || _a === void 0 ? void 0 : _a.selectionChanges$.subscribe(() => this.changeDetectorRef.markForCheck());
    }
    ngOnChanges(changes) {
        var _a, _b;
        if (changes.items) {
            this.currentStart = this.itemsPerPage * (this.currentPage - 1);
            this.currentEnd = this.currentStart + ((_a = changes.items.currentValue) === null || _a === void 0 ? void 0 : _a.length);
            (_b = this.selectionManager) === null || _b === void 0 ? void 0 : _b.setCurrentItems(this.items);
        }
    }
    ngOnDestroy() {
        var _a;
        if (typeof this.isRowSelectedFn === 'function' || this.selectionManager) {
            document.removeEventListener('keydown', this.shiftDownHandler);
            document.removeEventListener('keyup', this.shiftUpHandler);
        }
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    ngAfterContentInit() {
        this.rowTemplate = this.templateRefs.last;
    }
    trackByFn(index, item) {
        if (item.id != null) {
            return item.id;
        }
        else {
            return index;
        }
    }
    onToggleAllClick() {
        var _a;
        this.allSelectChange.emit();
        (_a = this.selectionManager) === null || _a === void 0 ? void 0 : _a.toggleSelectAll();
    }
    onRowClick(item, event) {
        var _a;
        this.rowSelectChange.emit({ event, item });
        (_a = this.selectionManager) === null || _a === void 0 ? void 0 : _a.toggleSelection(item, event);
    }
}
DataTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-data-table',
                template: "<ng-container *ngIf=\"!items || (items && items.length); else emptyPlaceholder\">\n    <div class=\"bulk-actions\">\n        <ng-content select=\"vdr-bulk-action-menu\"></ng-content>\n    </div>\n    <table class=\"table\" [class.no-select]=\"disableSelect\">\n        <thead [class.items-selected]=\"selectionManager?.selection.length\">\n            <tr>\n                <th *ngIf=\"isRowSelectedFn || selectionManager\" class=\"align-middle\">\n                    <input\n                        type=\"checkbox\"\n                        clrCheckbox\n                        [checked]=\"allSelected ? allSelected : selectionManager?.areAllCurrentItemsSelected()\"\n                        (change)=\"onToggleAllClick()\"\n                    />\n                </th>\n                <th\n                    *ngFor=\"let header of columns?.toArray()\"\n                    class=\"left align-middle\"\n                    [class.expand]=\"header.expand\"\n                >\n                    <ng-container *ngTemplateOutlet=\"header.template\"></ng-container>\n                </th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr\n                [ngClass]=\"'order-status-' + item.state\"\n                [ngStyle]=\"{ height: customRowHeight ? customRowHeight + 'rem' : 'auto' }\"\n                *ngFor=\"\n                    let item of items\n                        | paginate\n                            : {\n                                  itemsPerPage: itemsPerPage,\n                                  currentPage: currentPage,\n                                  totalItems: totalItems\n                              };\n                    index as i;\n                    trackBy: trackByFn\n                \"\n            >\n                <td *ngIf=\"isRowSelectedFn || selectionManager\" class=\"align-middle selection-col\">\n                    <input\n                        type=\"checkbox\"\n                        clrCheckbox\n                        [checked]=\"\n                            isRowSelectedFn ? isRowSelectedFn(item) : selectionManager?.isSelected(item)\n                        \"\n                        (click)=\"onRowClick(item, $event)\"\n                    />\n                </td>\n                <ng-container\n                    *ngTemplateOutlet=\"rowTemplate; context: { item: item, index: i }\"\n                ></ng-container>\n            </tr>\n        </tbody>\n    </table>\n    <div class=\"table-footer\">\n        <vdr-items-per-page-controls\n            *ngIf=\"totalItems\"\n            [itemsPerPage]=\"itemsPerPage\"\n            (itemsPerPageChange)=\"itemsPerPageChange.emit($event)\"\n        ></vdr-items-per-page-controls>\n        <div *ngIf=\"totalItems\" class=\"p5\">\n            {{ 'common.total-items' | translate: { currentStart, currentEnd, totalItems } }}\n        </div>\n\n        <vdr-pagination-controls\n            *ngIf=\"totalItems\"\n            [currentPage]=\"currentPage\"\n            [itemsPerPage]=\"itemsPerPage\"\n            [totalItems]=\"totalItems\"\n            (pageChange)=\"pageChange.emit($event)\"\n        ></vdr-pagination-controls>\n    </div>\n</ng-container>\n<ng-template #emptyPlaceholder>\n    <vdr-empty-placeholder [emptyStateLabel]=\"emptyStateLabel\"></vdr-empty-placeholder>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [PaginationService],
                styles: [":host{display:block;max-width:100%;overflow:auto;position:relative}.bulk-actions{position:absolute;left:50px;top:30px;z-index:2}table.table{color:#000;max-width:100vw;overflow-x:auto}table.no-select{-webkit-user-select:none;user-select:none}.order-status-PaymentAuthorized,.order-status-PaymentSettled{background:#ffab8f}thead th{position:sticky;top:24px;z-index:1}thead th.expand{width:100%}thead.items-selected tr th{color:transparent}.selection-col{width:24px}.table-footer{display:flex;align-items:baseline;justify-content:space-between;margin-top:6px}.tall-row{height:5rem}.order-status-Received{background:#ebbb61}.order-status-Processing{background:#ffffca}.order-status-ReadyForPickup{background:#79f087}.order-status-Finished{background:#6ebef6}\n"]
            },] }
];
DataTableComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
DataTableComponent.propDecorators = {
    customRowHeight: [{ type: Input }],
    customRowClass: [{ type: Input }],
    items: [{ type: Input }],
    itemsPerPage: [{ type: Input }],
    currentPage: [{ type: Input }],
    totalItems: [{ type: Input }],
    emptyStateLabel: [{ type: Input }],
    selectionManager: [{ type: Input }],
    pageChange: [{ type: Output }],
    itemsPerPageChange: [{ type: Output }],
    allSelected: [{ type: Input }],
    isRowSelectedFn: [{ type: Input }],
    allSelectChange: [{ type: Output }],
    rowSelectChange: [{ type: Output }],
    columns: [{ type: ContentChildren, args: [DataTableColumnComponent,] }],
    templateRefs: [{ type: ContentChildren, args: [TemplateRef,] }]
};

const dayOfWeekIndex = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
};
const weekDayNames = [
    marker('datetime.weekday-su'),
    marker('datetime.weekday-mo'),
    marker('datetime.weekday-tu'),
    marker('datetime.weekday-we'),
    marker('datetime.weekday-th'),
    marker('datetime.weekday-fr'),
    marker('datetime.weekday-sa'),
];

class DatetimePickerService {
    constructor() {
        this.selectedDatetime$ = new BehaviorSubject(null);
        this.viewingDatetime$ = new BehaviorSubject(dayjs());
        this.min = null;
        this.max = null;
        this.jumping = false;
        this.selected$ = this.selectedDatetime$.pipe(map(value => value && value.toDate()));
        this.viewing$ = this.viewingDatetime$.pipe(map(value => value.toDate()));
        this.weekStartDayIndex = dayOfWeekIndex['mon'];
        this.calendarView$ = combineLatest(this.viewingDatetime$, this.selectedDatetime$).pipe(map(([viewing, selected]) => this.generateCalendarView(viewing, selected)));
    }
    setWeekStartingDay(weekStartDay) {
        this.weekStartDayIndex = dayOfWeekIndex[weekStartDay];
    }
    setMin(min) {
        if (typeof min === 'string') {
            this.min = dayjs(min);
        }
    }
    setMax(max) {
        if (typeof max === 'string') {
            this.max = dayjs(max);
        }
    }
    selectDatetime(date) {
        let viewingValue;
        let selectedValue = null;
        if (date == null || date === '') {
            viewingValue = dayjs();
        }
        else {
            viewingValue = dayjs(date);
            selectedValue = dayjs(date);
        }
        this.selectedDatetime$.next(selectedValue);
        this.viewingDatetime$.next(viewingValue);
    }
    selectHour(hourOfDay) {
        const current = this.selectedDatetime$.value || dayjs();
        const next = current.hour(hourOfDay);
        this.selectedDatetime$.next(next);
        this.viewingDatetime$.next(next);
    }
    selectMinute(minutePastHour) {
        const current = this.selectedDatetime$.value || dayjs();
        const next = current.minute(minutePastHour);
        this.selectedDatetime$.next(next);
        this.viewingDatetime$.next(next);
    }
    viewNextMonth() {
        this.jumping = false;
        const current = this.viewingDatetime$.value;
        this.viewingDatetime$.next(current.add(1, 'month'));
    }
    viewPrevMonth() {
        this.jumping = false;
        const current = this.viewingDatetime$.value;
        this.viewingDatetime$.next(current.subtract(1, 'month'));
    }
    viewToday() {
        this.jumping = false;
        this.viewingDatetime$.next(dayjs());
    }
    viewJumpDown() {
        this.jumping = true;
        const current = this.viewingDatetime$.value;
        this.viewingDatetime$.next(current.add(1, 'week'));
    }
    viewJumpUp() {
        this.jumping = true;
        const current = this.viewingDatetime$.value;
        this.viewingDatetime$.next(current.subtract(1, 'week'));
    }
    viewJumpRight() {
        this.jumping = true;
        const current = this.viewingDatetime$.value;
        this.viewingDatetime$.next(current.add(1, 'day'));
    }
    viewJumpLeft() {
        this.jumping = true;
        const current = this.viewingDatetime$.value;
        this.viewingDatetime$.next(current.subtract(1, 'day'));
    }
    selectToday() {
        this.jumping = false;
        this.selectDatetime(dayjs());
    }
    selectViewed() {
        this.jumping = false;
        this.selectDatetime(this.viewingDatetime$.value);
    }
    viewMonth(month) {
        this.jumping = false;
        const current = this.viewingDatetime$.value;
        this.viewingDatetime$.next(current.month(month - 1));
    }
    viewYear(year) {
        this.jumping = false;
        const current = this.viewingDatetime$.value;
        this.viewingDatetime$.next(current.year(year));
    }
    generateCalendarView(viewing, selected) {
        if (!viewing.isValid() || (selected && !selected.isValid())) {
            return [];
        }
        const start = viewing.startOf('month');
        const end = viewing.endOf('month');
        const today = dayjs();
        const daysInMonth = viewing.daysInMonth();
        const selectedDayOfMonth = selected && selected.get('date');
        const startDayOfWeek = start.day();
        const startIndex = (7 + (startDayOfWeek - this.weekStartDayIndex)) % 7;
        const calendarView = [];
        let week = [];
        // Add the days at the tail of the previous month
        if (0 < startIndex) {
            const prevMonth = viewing.subtract(1, 'month');
            const daysInPrevMonth = prevMonth.daysInMonth();
            const prevIsCurrentMonth = prevMonth.isSame(today, 'month');
            for (let i = daysInPrevMonth - startIndex + 1; i <= daysInPrevMonth; i++) {
                const thisDay = viewing.subtract(1, 'month').date(i);
                week.push({
                    dayOfMonth: i,
                    selected: false,
                    inCurrentMonth: false,
                    isToday: prevIsCurrentMonth && today.get('date') === i,
                    isViewing: false,
                    disabled: !this.isInBounds(thisDay),
                    select: () => {
                        this.selectDatetime(thisDay);
                    },
                });
            }
        }
        // Add this month's days
        const isCurrentMonth = viewing.isSame(today, 'month');
        for (let i = 1; i <= daysInMonth; i++) {
            if ((i + startIndex - 1) % 7 === 0) {
                calendarView.push(week);
                week = [];
            }
            const thisDay = start.add(i - 1, 'day');
            const isViewingThisMonth = !!selected && selected.isSame(viewing, 'month') && selected.isSame(viewing, 'year');
            week.push({
                dayOfMonth: i,
                selected: i === selectedDayOfMonth && isViewingThisMonth,
                inCurrentMonth: true,
                isToday: isCurrentMonth && today.get('date') === i,
                isViewing: this.jumping && viewing.date() === i,
                disabled: !this.isInBounds(thisDay),
                select: () => {
                    this.selectDatetime(thisDay);
                },
            });
        }
        // Add the days at the start of the next month
        const emptyCellsEnd = 7 - ((startIndex + daysInMonth) % 7);
        if (emptyCellsEnd !== 7) {
            const nextMonth = viewing.add(1, 'month');
            const nextIsCurrentMonth = nextMonth.isSame(today, 'month');
            for (let i = 1; i <= emptyCellsEnd; i++) {
                const thisDay = end.add(i, 'day');
                week.push({
                    dayOfMonth: i,
                    selected: false,
                    inCurrentMonth: false,
                    isToday: nextIsCurrentMonth && today.get('date') === i,
                    isViewing: false,
                    disabled: !this.isInBounds(thisDay),
                    select: () => {
                        this.selectDatetime(thisDay);
                    },
                });
            }
        }
        calendarView.push(week);
        return calendarView;
    }
    isInBounds(date) {
        if (this.min && this.min.isAfter(date)) {
            return false;
        }
        if (this.max && this.max.isBefore(date)) {
            return false;
        }
        return true;
    }
}
DatetimePickerService.decorators = [
    { type: Injectable }
];
DatetimePickerService.ctorParameters = () => [];

/**
 * @description
 * A form input for selecting datetime values.
 *
 * @example
 * ```HTML
 * <vdr-datetime-picker [(ngModel)]="startDate"></vdr-datetime-picker>
 * ```
 *
 * @docsCategory components
 */
class DatetimePickerComponent {
    constructor(changeDetectorRef, datetimePickerService) {
        this.changeDetectorRef = changeDetectorRef;
        this.datetimePickerService = datetimePickerService;
        /**
         * @description
         * The day that the week should start with in the calendar view.
         */
        this.weekStartDay = 'mon';
        /**
         * @description
         * The granularity of the minutes time picker
         */
        this.timeGranularityInterval = 5;
        /**
         * @description
         * The minimum date as an ISO string
         */
        this.min = null;
        /**
         * @description
         * The maximum date as an ISO string
         */
        this.max = null;
        /**
         * @description
         * Sets the readonly state
         */
        this.readonly = false;
        this.disabled = false;
        this.weekdays = [];
    }
    ngOnInit() {
        this.datetimePickerService.setWeekStartingDay(this.weekStartDay);
        this.datetimePickerService.setMin(this.min);
        this.datetimePickerService.setMax(this.max);
        this.populateYearsSelection();
        this.populateWeekdays();
        this.populateHours();
        this.populateMinutes();
        this.calendarView$ = this.datetimePickerService.calendarView$;
        this.current$ = this.datetimePickerService.viewing$.pipe(map(date => ({
            date,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        })));
        this.selected$ = this.datetimePickerService.selected$;
        this.selectedHours$ = this.selected$.pipe(map(date => date && date.getHours()));
        this.selectedMinutes$ = this.selected$.pipe(map(date => date && date.getMinutes()));
        this.subscription = this.datetimePickerService.selected$.subscribe(val => {
            if (this.onChange) {
                this.onChange(val == null ? val : val.toISOString());
            }
        });
    }
    ngAfterViewInit() {
        this.dropdownComponent.onOpenChange(isOpen => {
            if (isOpen) {
                this.calendarTable.nativeElement.focus();
            }
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(value) {
        this.datetimePickerService.selectDatetime(value);
    }
    prevMonth() {
        this.datetimePickerService.viewPrevMonth();
    }
    nextMonth() {
        this.datetimePickerService.viewNextMonth();
    }
    selectToday() {
        this.datetimePickerService.selectToday();
    }
    setYear(event) {
        const target = event.target;
        this.datetimePickerService.viewYear(parseInt(target.value, 10));
    }
    setMonth(event) {
        const target = event.target;
        this.datetimePickerService.viewMonth(parseInt(target.value, 10));
    }
    selectDay(day) {
        if (day.disabled) {
            return;
        }
        day.select();
    }
    clearValue() {
        this.datetimePickerService.selectDatetime(null);
    }
    handleCalendarKeydown(event) {
        switch (event.key) {
            case 'ArrowDown':
                return this.datetimePickerService.viewJumpDown();
            case 'ArrowUp':
                return this.datetimePickerService.viewJumpUp();
            case 'ArrowRight':
                return this.datetimePickerService.viewJumpRight();
            case 'ArrowLeft':
                return this.datetimePickerService.viewJumpLeft();
            case 'Enter':
                return this.datetimePickerService.selectViewed();
        }
    }
    setHour(event) {
        const target = event.target;
        this.datetimePickerService.selectHour(parseInt(target.value, 10));
    }
    setMinute(event) {
        const target = event.target;
        this.datetimePickerService.selectMinute(parseInt(target.value, 10));
    }
    closeDatepicker() {
        this.dropdownComponent.toggleOpen();
        this.datetimeInput.nativeElement.focus();
    }
    populateYearsSelection() {
        var _a;
        const yearRange = (_a = this.yearRange) !== null && _a !== void 0 ? _a : 10;
        const currentYear = new Date().getFullYear();
        const min = (this.min && new Date(this.min).getFullYear()) || currentYear - yearRange;
        const max = (this.max && new Date(this.max).getFullYear()) || currentYear + yearRange;
        const spread = max - min + 1;
        this.years = Array.from({ length: spread }).map((_, i) => min + i);
    }
    populateWeekdays() {
        const weekStartDayIndex = dayOfWeekIndex[this.weekStartDay];
        for (let i = 0; i < 7; i++) {
            this.weekdays.push(weekDayNames[(i + weekStartDayIndex + 0) % 7]);
        }
    }
    populateHours() {
        this.hours = Array.from({ length: 24 }).map((_, i) => i);
    }
    populateMinutes() {
        const minutes = [];
        for (let i = 0; i < 60; i += this.timeGranularityInterval) {
            minutes.push(i);
        }
        this.minutes = minutes;
    }
}
DatetimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-datetime-picker',
                template: "<div class=\"input-wrapper\">\n    <input\n        readonly\n        [ngModel]=\"selected$ | async | localeDate: 'medium'\"\n        class=\"selected-datetime\"\n        (keydown.enter)=\"dropdownComponent.toggleOpen()\"\n        (keydown.space)=\"dropdownComponent.toggleOpen()\"\n        #datetimeInput\n    />\n    <button class=\"clear-value-button btn\" [class.visible]=\"!disabled && !readonly && (selected$ | async)\" (click)=\"clearValue()\">\n        <clr-icon shape=\"times\"></clr-icon>\n    </button>\n</div>\n<vdr-dropdown #dropdownComponent>\n    <button class=\"btn btn-outline calendar-button\" vdrDropdownTrigger [disabled]=\"readonly || disabled\">\n        <clr-icon shape=\"calendar\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu>\n        <div class=\"datetime-picker\" *ngIf=\"current$ | async as currentView\" (keydown.escape)=\"closeDatepicker()\">\n            <div class=\"controls\">\n                <div class=\"selects\">\n                    <div class=\"month-select\">\n                        <select\n                            clrSelect\n                            name=\"month\"\n                            [ngModel]=\"currentView.month\"\n                            (change)=\"setMonth($event)\"\n                        >\n                            <option [value]=\"1\">{{ 'datetime.month-jan' | translate }}</option>\n                            <option [value]=\"2\">{{ 'datetime.month-feb' | translate }}</option>\n                            <option [value]=\"3\">{{ 'datetime.month-mar' | translate }}</option>\n                            <option [value]=\"4\">{{ 'datetime.month-apr' | translate }}</option>\n                            <option [value]=\"5\">{{ 'datetime.month-may' | translate }}</option>\n                            <option [value]=\"6\">{{ 'datetime.month-jun' | translate }}</option>\n                            <option [value]=\"7\">{{ 'datetime.month-jul' | translate }}</option>\n                            <option [value]=\"8\">{{ 'datetime.month-aug' | translate }}</option>\n                            <option [value]=\"9\">{{ 'datetime.month-sep' | translate }}</option>\n                            <option [value]=\"10\">{{ 'datetime.month-oct' | translate }}</option>\n                            <option [value]=\"11\">{{ 'datetime.month-nov' | translate }}</option>\n                            <option [value]=\"12\">{{ 'datetime.month-dec' | translate }}</option>\n                        </select>\n                    </div>\n                    <div class=\"year-select\">\n                        <select\n                            clrSelect\n                            name=\"month\"\n                            [ngModel]=\"currentView.year\"\n                            (change)=\"setYear($event)\"\n                        >\n                            <option *ngFor=\"let year of years\" [value]=\"year\">{{ year }}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"control-buttons\">\n                    <button\n                        class=\"btn btn-link btn-sm\"\n                        (click)=\"prevMonth()\"\n                        [title]=\"'common.view-previous-month' | translate\"\n                    >\n                        <clr-icon shape=\"caret\" dir=\"left\"></clr-icon>\n                    </button>\n                    <button class=\"btn btn-link btn-sm\" (click)=\"selectToday()\" [title]=\"'common.select-today' | translate\">\n                        <clr-icon shape=\"event\"></clr-icon>\n                    </button>\n                    <button\n                        class=\"btn btn-link btn-sm\"\n                        (click)=\"nextMonth()\"\n                        [title]=\"'common.view-next-month' | translate\"\n                    >\n                        <clr-icon shape=\"caret\" dir=\"right\"></clr-icon>\n                    </button>\n                </div>\n            </div>\n            <table class=\"calendar-table\" #calendarTable tabindex=\"0\" (keydown)=\"handleCalendarKeydown($event)\">\n                <thead>\n                <tr>\n                    <td *ngFor=\"let weekdayName of weekdays\">\n                        {{ weekdayName | translate }}\n                    </td>\n                </tr>\n                </thead>\n                <tbody>\n                <tr *ngFor=\"let week of calendarView$ | async\">\n                    <td\n                        *ngFor=\"let day of week\"\n                        class=\"day-cell\"\n                        [class.selected]=\"day.selected\"\n                        [class.today]=\"day.isToday\"\n                        [class.viewing]=\"day.isViewing\"\n                        [class.current-month]=\"day.inCurrentMonth\"\n                        [class.disabled]=\"day.disabled\"\n                        (keydown.enter)=\"selectDay(day)\"\n                        (click)=\"selectDay(day)\"\n                    >\n                        {{ day.dayOfMonth }}\n                    </td>\n                </tr>\n                </tbody>\n            </table>\n            <div class=\"time-picker\">\n                <span class=\"flex-spacer\"> {{ 'datetime.time' | translate }}: </span>\n                <select clrSelect name=\"hour\" [ngModel]=\"selectedHours$ | async\" (change)=\"setHour($event)\">\n                    <option *ngFor=\"let hour of hours\" [value]=\"hour\">{{ hour | number: '2.0-0' }}</option>\n                </select>\n                <span>:</span>\n                <select\n                    clrSelect\n                    name=\"hour\"\n                    [ngModel]=\"selectedMinutes$ | async\"\n                    (change)=\"setMinute($event)\"\n                >\n                    <option *ngFor=\"let minute of minutes\" [value]=\"minute\">{{\n                        minute | number: '2.0-0'\n                        }}</option>\n                </select>\n            </div>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    DatetimePickerService,
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: DatetimePickerComponent,
                        multi: true,
                    },
                ],
                styles: [":host{display:flex;width:100%}.input-wrapper{flex:1;display:flex}input.selected-datetime{flex:1;border-top-right-radius:0!important;border-bottom-right-radius:0!important;border-right:none!important}.clear-value-button{margin:0;border-radius:0;border-left:none;border-color:var(--color-component-border-200);background-color:#fff;color:var(--color-grey-500);display:none}.clear-value-button.visible{display:block}.calendar-button{margin:0;border-top-left-radius:0;border-bottom-left-radius:0}.datetime-picker{margin:0 12px}table.calendar-table{padding:6px}table.calendar-table:focus{outline:1px solid var(--color-primary-500);box-shadow:0 0 1px 2px var(--color-primary-100)}table.calendar-table td{width:24px;text-align:center;border:1px solid transparent;-webkit-user-select:none;user-select:none}table.calendar-table .day-cell{background-color:var(--color-component-bg-200);color:var(--color-grey-500);cursor:pointer;transition:background-color .1s}table.calendar-table .day-cell.current-month{background-color:#fff;color:var(--color-grey-800)}table.calendar-table .day-cell.selected{background-color:var(--color-primary-500);color:#fff}table.calendar-table .day-cell.viewing:not(.selected){background-color:var(--color-primary-200)}table.calendar-table .day-cell.today{border:1px solid var(--color-component-border-300)}table.calendar-table .day-cell:hover:not(.selected):not(.disabled){background-color:var(--color-primary-100)}table.calendar-table .day-cell.disabled{cursor:default;color:var(--color-grey-300)}.selects{display:flex;justify-content:space-between;margin-bottom:12px}.control-buttons{display:flex}.time-picker{display:flex;align-items:baseline;margin-top:12px}\n"]
            },] }
];
DatetimePickerComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: DatetimePickerService }
];
DatetimePickerComponent.propDecorators = {
    yearRange: [{ type: Input }],
    weekStartDay: [{ type: Input }],
    timeGranularityInterval: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    readonly: [{ type: Input }],
    dropdownComponent: [{ type: ViewChild, args: ['dropdownComponent', { static: true },] }],
    datetimeInput: [{ type: ViewChild, args: ['datetimeInput', { static: true },] }],
    calendarTable: [{ type: ViewChild, args: ['calendarTable',] }]
};

/**
 * @description
 * Used for building dropdown menus.
 *
 * @example
 * ```HTML
 * <vdr-dropdown>
 *   <button class="btn btn-outline" vdrDropdownTrigger>
 *       <clr-icon shape="plus"></clr-icon>
 *       Select type
 *   </button>
 *   <vdr-dropdown-menu vdrPosition="bottom-left">
 *     <button
 *       *ngFor="let typeName of allTypes"
 *       type="button"
 *       vdrDropdownItem
 *       (click)="selectType(typeName)"
 *     >
 *       typeName
 *     </button>
 *   </vdr-dropdown-menu>
 * </vdr-dropdown>
 * ```
 * @docsCategory components
 */
class DropdownComponent {
    constructor() {
        this.isOpen = false;
        this.onOpenChangeCallbacks = [];
        this.manualToggle = false;
    }
    onClick() {
        if (!this.manualToggle) {
            this.toggleOpen();
        }
    }
    toggleOpen() {
        this.isOpen = !this.isOpen;
        this.onOpenChangeCallbacks.forEach(fn => fn(this.isOpen));
    }
    onOpenChange(callback) {
        this.onOpenChangeCallbacks.push(callback);
    }
    setTriggerElement(elementRef) {
        this.trigger = elementRef;
    }
}
DropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dropdown',
                template: "<ng-content></ng-content>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
DropdownComponent.propDecorators = {
    manualToggle: [{ type: Input }]
};

class DropdownItemDirective {
    constructor(dropdown) {
        this.dropdown = dropdown;
    }
    onDropdownItemClick(event) {
        this.dropdown.onClick();
    }
}
DropdownItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrDropdownItem]',
                // tslint:disable-next-line
                host: { '[class.dropdown-item]': 'true' },
            },] }
];
DropdownItemDirective.ctorParameters = () => [
    { type: DropdownComponent }
];
DropdownItemDirective.propDecorators = {
    onDropdownItemClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

/**
 * A dropdown menu modelled on the Clarity Dropdown component (https://v1.clarity.design/dropdowns).
 *
 * This was created because the Clarity implementation (at this time) does not handle edge detection. Instead
 * we make use of the Angular CDK's Overlay module to manage the positioning.
 *
 * The API of this component (and its related Components & Directives) are based on the Clarity version,
 * albeit only a subset which is currently used in this application.
 */
class DropdownMenuComponent {
    constructor(overlay, viewContainerRef, dropdown) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.dropdown = dropdown;
        this.position = 'bottom-left';
    }
    ngOnInit() {
        this.dropdown.onOpenChange(isOpen => {
            if (isOpen) {
                this.overlayRef.attach(this.menuPortal);
            }
            else {
                this.overlayRef.detach();
            }
        });
    }
    ngAfterViewInit() {
        this.overlayRef = this.overlay.create({
            hasBackdrop: true,
            backdropClass: 'clear-backdrop',
            positionStrategy: this.getPositionStrategy(),
            maxHeight: '70vh',
        });
        this.menuPortal = new TemplatePortal(this.menuTemplate, this.viewContainerRef);
        this.backdropClickSub = this.overlayRef.backdropClick().subscribe(() => {
            this.dropdown.toggleOpen();
        });
    }
    ngOnDestroy() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
        }
        if (this.backdropClickSub) {
            this.backdropClickSub.unsubscribe();
        }
    }
    getPositionStrategy() {
        const position = {
            ['top-left']: {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
            },
            ['top-right']: {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom',
            },
            ['bottom-left']: {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            ['bottom-right']: {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
            },
        };
        const pos = position[this.position];
        return this.overlay
            .position()
            .flexibleConnectedTo(this.dropdown.trigger)
            .withPositions([pos, this.invertPosition(pos)])
            .withViewportMargin(12)
            .withPush(true);
    }
    /** Inverts an overlay position. */
    invertPosition(pos) {
        const inverted = Object.assign({}, pos);
        inverted.originY = pos.originY === 'top' ? 'bottom' : 'top';
        inverted.overlayY = pos.overlayY === 'top' ? 'bottom' : 'top';
        return inverted;
    }
}
DropdownMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dropdown-menu',
                template: `
        <ng-template #menu>
            <div class="dropdown open">
                <div class="dropdown-menu" [ngClass]="customClasses">
                    <div class="dropdown-content-wrapper">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </ng-template>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".clear-backdrop{background-color:#ff69b4}::ng-deep .dropdown-menu .dropdown-item{display:flex;align-items:center}::ng-deep .dropdown-menu .dropdown-item clr-icon{margin-right:3px}.dropdown.open>.dropdown-menu{position:relative;top:0;height:100%;overflow-y:auto}:host{opacity:1;transition:opacity .3s}\n"]
            },] }
];
DropdownMenuComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef },
    { type: DropdownComponent }
];
DropdownMenuComponent.propDecorators = {
    position: [{ type: Input, args: ['vdrPosition',] }],
    customClasses: [{ type: Input }],
    menuTemplate: [{ type: ViewChild, args: ['menu', { static: true },] }]
};

class DropdownTriggerDirective {
    constructor(dropdown, elementRef) {
        this.dropdown = dropdown;
        this.elementRef = elementRef;
        dropdown.setTriggerElement(this.elementRef);
    }
    onDropdownTriggerClick(event) {
        this.dropdown.toggleOpen();
    }
}
DropdownTriggerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrDropdownTrigger]',
            },] }
];
DropdownTriggerDirective.ctorParameters = () => [
    { type: DropdownComponent },
    { type: ElementRef }
];
DropdownTriggerDirective.propDecorators = {
    onDropdownTriggerClick: [{ type: HostListener, args: ['click', ['$event'],] }]
};

class EditNoteDialogComponent {
    constructor() {
        this.displayPrivacyControls = true;
        this.noteIsPrivate = true;
        this.note = '';
    }
    confirm() {
        this.resolveWith({
            note: this.note,
            isPrivate: this.noteIsPrivate,
        });
    }
    cancel() {
        this.resolveWith();
    }
}
EditNoteDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-edit-note-dialog',
                template: "<ng-template vdrDialogTitle>\n    {{ 'common.edit-note' | translate }}\n</ng-template>\n\n<textarea [(ngModel)]=\"note\" name=\"note\" class=\"note\"></textarea>\n<div class=\"visibility-select\" *ngIf=\"displayPrivacyControls\">\n    <clr-checkbox-wrapper>\n        <input type=\"checkbox\" clrCheckbox [(ngModel)]=\"noteIsPrivate\" />\n        <label>{{ 'order.note-is-private' | translate }}</label>\n    </clr-checkbox-wrapper>\n    <span *ngIf=\"noteIsPrivate\" class=\"private\">\n        {{ 'order.note-only-visible-to-administrators' | translate }}\n    </span>\n    <span *ngIf=\"!noteIsPrivate\" class=\"public\">\n        {{ 'order.note-visible-to-customer' | translate }}\n    </span>\n</div>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn\" (click)=\"cancel()\">{{ 'common.cancel' | translate }}</button>\n    <button type=\"submit\" (click)=\"confirm()\" class=\"btn btn-primary\" [disabled]=\"note.length === 0\">\n        {{ 'common.confirm' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".visibility-select{display:flex;justify-content:space-between;align-items:baseline}.visibility-select .public{color:var(--color-warning-500)}.visibility-select .private{color:var(--color-success-500)}textarea.note{width:100%;height:72px;border-radius:3px;margin-right:6px}\n"]
            },] }
];

class EmptyPlaceholderComponent {
}
EmptyPlaceholderComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-empty-placeholder',
                template: "<div class=\"empty-state\">\n    <clr-icon shape=\"bubble-exclamation\" size=\"64\"></clr-icon>\n    <div class=\"empty-label\">\n        <ng-container *ngIf=\"emptyStateLabel; else defaultEmptyLabel\">{{ emptyStateLabel }}</ng-container>\n        <ng-template #defaultEmptyLabel>{{ 'common.no-results' | translate }}</ng-template>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".empty-state{text-align:center;padding:60px;color:var(--color-grey-400);width:100%}.empty-state .empty-label{margin-top:12px;font-size:22px}\n"]
            },] }
];
EmptyPlaceholderComponent.propDecorators = {
    emptyStateLabel: [{ type: Input }]
};

class EntityInfoComponent {
    constructor() {
        this.small = false;
    }
}
EntityInfoComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-entity-info',
                template: "<vdr-dropdown *ngIf=\"entity.id\">\n    <button class=\"btn btn-icon btn-link info-button\" [class.btn-sm]=\"small\" vdrDropdownTrigger>\n        <clr-icon shape=\"info-standard\"></clr-icon>\n    </button>\n    <vdr-dropdown-menu>\n        <div class=\"entity-info\">\n            <vdr-labeled-data [label]=\"'common.ID' | translate\">\n                {{ entity.id }}\n            </vdr-labeled-data>\n            <vdr-labeled-data *ngIf=\"entity.createdAt\" [label]=\"'common.created-at' | translate\">\n                {{ entity.createdAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n            <vdr-labeled-data *ngIf=\"entity.updatedAt\" [label]=\"'common.updated-at' | translate\">\n                {{ entity.updatedAt | localeDate: 'medium' }}\n            </vdr-labeled-data>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".info-button{color:var(--color-icon-button)}.entity-info{margin:0 12px}\n"]
            },] }
];
EntityInfoComponent.propDecorators = {
    small: [{ type: Input }],
    entity: [{ type: Input }]
};

class ExtensionHostService {
    constructor(dataService, notificationService) {
        this.dataService = dataService;
        this.notificationService = notificationService;
        this.cancellationMessage$ = new Subject();
        this.destroyMessage$ = new Subject();
        this.handleMessage = (message) => {
            const { data, origin } = message;
            if (this.isExtensionMessage(data)) {
                const cancellation$ = this.cancellationMessage$.pipe(filter(requestId => requestId === data.requestId));
                const end$ = merge(cancellation$, this.destroyMessage$);
                switch (data.type) {
                    case 'cancellation': {
                        this.cancellationMessage$.next(data.requestId);
                        break;
                    }
                    case 'destroy': {
                        this.destroyMessage$.next();
                        break;
                    }
                    case 'active-route': {
                        const routeData = {
                            url: window.location.href,
                            origin: window.location.origin,
                            pathname: window.location.pathname,
                            params: this.routeSnapshot.params,
                            queryParams: this.routeSnapshot.queryParams,
                            fragment: this.routeSnapshot.fragment,
                        };
                        this.sendMessage({ data: routeData, error: false, complete: false, requestId: data.requestId }, origin);
                        this.sendMessage({ data: null, error: false, complete: true, requestId: data.requestId }, origin);
                        break;
                    }
                    case 'graphql-query': {
                        const { document, variables, fetchPolicy } = data.data;
                        this.dataService
                            .query(parse(document), variables, fetchPolicy)
                            .stream$.pipe(takeUntil(end$))
                            .subscribe(this.createObserver(data.requestId, origin));
                        break;
                    }
                    case 'graphql-mutation': {
                        const { document, variables } = data.data;
                        this.dataService
                            .mutate(parse(document), variables)
                            .pipe(takeUntil(end$))
                            .subscribe(this.createObserver(data.requestId, origin));
                        break;
                    }
                    case 'notification': {
                        this.notificationService.notify(data.data);
                        break;
                    }
                    default:
                        assertNever(data);
                }
            }
        };
    }
    init(extensionWindow, routeSnapshot) {
        this.extensionWindow = extensionWindow;
        this.routeSnapshot = routeSnapshot;
        window.addEventListener('message', this.handleMessage);
    }
    destroy() {
        window.removeEventListener('message', this.handleMessage);
        this.destroyMessage$.next();
    }
    ngOnDestroy() {
        this.destroy();
    }
    createObserver(requestId, origin) {
        return {
            next: data => this.sendMessage({ data, error: false, complete: false, requestId }, origin),
            error: err => this.sendMessage({ data: err, error: true, complete: false, requestId }, origin),
            complete: () => this.sendMessage({ data: null, error: false, complete: true, requestId }, origin),
        };
    }
    sendMessage(response, origin) {
        this.extensionWindow.postMessage(response, origin);
    }
    isExtensionMessage(input) {
        return (input.hasOwnProperty('type') && input.hasOwnProperty('data') && input.hasOwnProperty('requestId'));
    }
}
ExtensionHostService.decorators = [
    { type: Injectable }
];
ExtensionHostService.ctorParameters = () => [
    { type: DataService },
    { type: NotificationService }
];

/**
 * This component uses an iframe to embed an external url into the Admin UI, and uses the PostMessage
 * protocol to allow cross-frame communication between the two frames.
 */
class ExtensionHostComponent {
    constructor(route, sanitizer, extensionHostService) {
        this.route = route;
        this.sanitizer = sanitizer;
        this.extensionHostService = extensionHostService;
        this.openInIframe = true;
        this.extensionWindowIsOpen = false;
    }
    ngOnInit() {
        const { data } = this.route.snapshot;
        if (!this.isExtensionHostConfig(data.extensionHostConfig)) {
            throw new Error(`Expected an ExtensionHostConfig object, got ${JSON.stringify(data.extensionHostConfig)}`);
        }
        this.config = data.extensionHostConfig;
        this.openInIframe = !this.config.openInNewTab;
        this.extensionUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.extensionUrl || 'about:blank');
    }
    ngAfterViewInit() {
        if (this.openInIframe) {
            const extensionWindow = this.extensionFrame.nativeElement.contentWindow;
            if (extensionWindow) {
                this.extensionHostService.init(extensionWindow, this.route.snapshot);
            }
        }
    }
    ngOnDestroy() {
        if (this.extensionWindow) {
            this.extensionWindow.close();
        }
    }
    launchExtensionWindow() {
        const extensionWindow = window.open(this.config.extensionUrl);
        if (!extensionWindow) {
            return;
        }
        this.extensionHostService.init(extensionWindow, this.route.snapshot);
        this.extensionWindowIsOpen = true;
        this.extensionWindow = extensionWindow;
        let timer;
        function pollWindowState(extwindow, onClosed) {
            if (extwindow.closed) {
                window.clearTimeout(timer);
                onClosed();
            }
            else {
                timer = window.setTimeout(() => pollWindowState(extwindow, onClosed), 250);
            }
        }
        pollWindowState(extensionWindow, () => {
            this.extensionWindowIsOpen = false;
            this.extensionHostService.destroy();
        });
    }
    isExtensionHostConfig(input) {
        return input.hasOwnProperty('extensionUrl');
    }
}
ExtensionHostComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-extension-host',
                template: "<ng-template [ngIf]=\"openInIframe\" [ngIfElse]=\"launchExtension\">\n    <iframe [src]=\"extensionUrl\" #extensionFrame></iframe>\n</ng-template>\n<ng-template #launchExtension>\n    <div class=\"launch-button\" [class.launched]=\"extensionWindowIsOpen\">\n        <div>\n            <button\n                class=\"btn btn-lg btn-primary\"\n                [disabled]=\"extensionWindowIsOpen\"\n                (click)=\"launchExtensionWindow()\"\n            >\n                <clr-icon shape=\"pop-out\"></clr-icon>\n                {{ 'common.launch-extension' | translate }}\n            </button>\n            <h3 class=\"window-hint\" [class.visible]=\"extensionWindowIsOpen\">\n                {{ 'common.extension-running-in-separate-window' | translate }}\n            </h3>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.Default,
                providers: [ExtensionHostService],
                styles: ["iframe{position:absolute;left:0;top:0;bottom:0;right:0;width:100%;height:100%;border:none}.launch-button{position:absolute;left:0;top:0;bottom:0;right:0;width:100%;height:100%;border:none;padding:24px;display:flex;align-items:center;justify-content:center;transition:background-color .3s;text-align:center}.launch-button.launched{background-color:var(--color-component-bg-300)}.window-hint{visibility:hidden;opacity:0;transition:visibility .3s 0,opacity .3s}.window-hint.visible{visibility:visible;opacity:1;transition:visibility 0,opacity .3s}\n"]
            },] }
];
ExtensionHostComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: DomSanitizer },
    { type: ExtensionHostService }
];
ExtensionHostComponent.propDecorators = {
    extensionFrame: [{ type: ViewChild, args: ['extensionFrame',] }]
};

class FacetValueChipComponent {
    constructor() {
        this.removable = true;
        this.displayFacetName = true;
        this.remove = new EventEmitter();
    }
}
FacetValueChipComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-value-chip',
                template: "<vdr-chip\n    [icon]=\"removable ? 'times' : undefined\"\n    [colorFrom]=\"facetValue.facet.name\"\n    (iconClick)=\"remove.emit()\"\n    [title]=\"facetValue.facet.name + ' - ' + facetValue.name\"\n>\n    <span *ngIf=\"displayFacetName\" class=\"facet-name\">{{ facetValue.facet.name }}</span>\n    {{ facetValue.name }}\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block}.facet-name{color:var(--color-grey-100);text-transform:uppercase;font-size:10px;margin-right:3px;height:11px}\n"]
            },] }
];
FacetValueChipComponent.propDecorators = {
    facetValue: [{ type: Input }],
    removable: [{ type: Input }],
    displayFacetName: [{ type: Input }],
    remove: [{ type: Output }]
};

function flattenFacetValues(facetsWithValues) {
    return facetsWithValues.reduce((flattened, facet) => flattened.concat(facet.values), []);
}

/**
 * @description
 * A form control for selecting facet values.
 *
 * @example
 * ```HTML
 * <vdr-facet-value-selector
 *   [facets]="facets"
 *   (selectedValuesChange)="selectedValues = $event"
 * ></vdr-facet-value-selector>
 * ```
 * The `facets` input should be provided from the parent component
 * like this:
 *
 * @example
 * ```TypeScript
 * this.facets = this.dataService
 *   .facet.getAllFacets()
 *   .mapSingle(data => data.facets.items);
 * ```
 * @docsCategory components
 */
class FacetValueSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.selectedValuesChange = new EventEmitter();
        this.readonly = false;
        this.transformControlValueAccessorValue = value => value;
        this.facetValues = [];
        this.disabled = false;
        this.toSelectorItem = (facetValue) => {
            return {
                name: facetValue.name,
                facetName: facetValue.facet.name,
                id: facetValue.id,
                value: facetValue,
            };
        };
    }
    ngOnInit() {
        this.facetValues = flattenFacetValues(this.facets).map(this.toSelectorItem);
    }
    onChange(selected) {
        if (this.readonly) {
            return;
        }
        this.selectedValuesChange.emit(selected.map(s => s.value));
        if (this.onChangeFn) {
            const transformedValue = this.transformControlValueAccessorValue(selected);
            this.onChangeFn(transformedValue);
        }
    }
    registerOnChange(fn) {
        this.onChangeFn = fn;
    }
    registerOnTouched(fn) {
        this.onTouchFn = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    focus() {
        this.ngSelect.focus();
    }
    writeValue(obj) {
        if (typeof obj === 'string') {
            try {
                const facetIds = JSON.parse(obj);
                this.value = facetIds;
            }
            catch (err) {
                // TODO: log error
                throw err;
            }
        }
        else if (Array.isArray(obj)) {
            const isIdArray = (input) => input.every(i => typeof i === 'number' || typeof i === 'string');
            if (isIdArray(obj)) {
                this.value = obj.map(fv => fv.toString());
            }
            else {
                this.value = obj.map(fv => fv.id);
            }
        }
    }
}
FacetValueSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-facet-value-selector',
                template: "<ng-select\n    [items]=\"facetValues\"\n    [addTag]=\"false\"\n    [hideSelected]=\"true\"\n    bindValue=\"id\"\n    multiple=\"true\"\n    appendTo=\"body\"\n    bindLabel=\"name\"\n    [disabled]=\"disabled || readonly\"\n    [ngModel]=\"value\"\n    (change)=\"onChange($event)\"\n>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <vdr-facet-value-chip\n            *ngIf=\"item.value; else facetNotFound\"\n            [facetValue]=\"item.value\"\n            [removable]=\"!readonly\"\n            (remove)=\"clear(item)\"\n        ></vdr-facet-value-chip>\n        <ng-template #facetNotFound>\n            <vdr-chip colorType=\"error\" icon=\"times\" (iconClick)=\"clear(item)\">{{\n                'catalog.facet-value-not-available' | translate: { id: item.id }\n            }}</vdr-chip>\n        </ng-template>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <vdr-facet-value-chip [facetValue]=\"item.value\" [removable]=\"false\"></vdr-facet-value-chip>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: FacetValueSelectorComponent,
                        multi: true,
                    },
                ],
                styles: [":host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}\n"]
            },] }
];
FacetValueSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
FacetValueSelectorComponent.propDecorators = {
    selectedValuesChange: [{ type: Output }],
    facets: [{ type: Input }],
    readonly: [{ type: Input }],
    transformControlValueAccessorValue: [{ type: Input }],
    ngSelect: [{ type: ViewChild, args: [NgSelectComponent,] }]
};

class FocalPointControlComponent {
    constructor() {
        this.visible = false;
        this.editable = false;
        this.fpx = 0.5;
        this.fpy = 0.5;
        this.focalPointChange = new EventEmitter();
    }
    get initialPosition() {
        return this.focalPointToOffset(this.fpx == null ? 0.5 : this.fpx, this.fpy == null ? 0.5 : this.fpy);
    }
    onDragEnded(event) {
        const { x, y } = this.getCurrentFocalPoint();
        this.fpx = x;
        this.fpy = y;
        this.focalPointChange.emit({ x, y });
    }
    getCurrentFocalPoint() {
        const { left: dotLeft, top: dotTop, width, height } = this.dot.nativeElement.getBoundingClientRect();
        const { left: frameLeft, top: frameTop } = this.frame.nativeElement.getBoundingClientRect();
        const xInPx = dotLeft - frameLeft + width / 2;
        const yInPx = dotTop - frameTop + height / 2;
        return {
            x: xInPx / this.width,
            y: yInPx / this.height,
        };
    }
    focalPointToOffset(x, y) {
        const { width, height } = this.dot.nativeElement.getBoundingClientRect();
        return {
            x: x * this.width - width / 2,
            y: y * this.height - height / 2,
        };
    }
}
FocalPointControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-focal-point-control',
                template: "<ng-content></ng-content>\n<div class=\"frame\" #frame [style.width.px]=\"width\" [style.height.px]=\"height\">\n    <div\n        #dot\n        class=\"dot\"\n        [class.visible]=\"visible\"\n        [class.editable]=\"editable\"\n        cdkDrag\n        [cdkDragDisabled]=\"!editable\"\n        cdkDragBoundary=\".frame\"\n        (cdkDragEnded)=\"onDragEnded($event)\"\n        [cdkDragFreeDragPosition]=\"initialPosition\"\n    ></div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:relative;display:block}.frame{position:absolute;top:0}.dot{width:20px;height:20px;border-radius:50%;border:2px solid white;position:absolute;visibility:hidden;transition:opacity .3s;box-shadow:0 0 4px 4px #0000006b}.dot.visible{visibility:visible;opacity:.7}.dot.editable{cursor:move;visibility:visible;opacity:1;animation:pulse;animation-duration:.5s;animation-iteration-count:4}@keyframes pulse{0%{border-color:#fff}50%{border-color:var(--color-warning-500)}to{border-color:#fff}}\n"]
            },] }
];
FocalPointControlComponent.propDecorators = {
    visible: [{ type: Input }],
    editable: [{ type: Input }],
    width: [{ type: HostBinding, args: ['style.width.px',] }, { type: Input }],
    height: [{ type: HostBinding, args: ['style.height.px',] }, { type: Input }],
    fpx: [{ type: Input }],
    fpy: [{ type: Input }],
    focalPointChange: [{ type: Output }],
    frame: [{ type: ViewChild, args: ['frame', { static: true },] }],
    dot: [{ type: ViewChild, args: ['dot', { static: true },] }]
};

// tslint:disable:directive-selector
class FormFieldControlDirective {
    constructor(elementRef, formControlName) {
        this.elementRef = elementRef;
        this.formControlName = formControlName;
    }
    get valid() {
        return !!this.formControlName && !!this.formControlName.valid;
    }
    get touched() {
        return !!this.formControlName && !!this.formControlName.touched;
    }
    setReadOnly(value) {
        const input = this.elementRef.nativeElement;
        if (isSelectElement(input)) {
            input.disabled = value;
        }
        else {
            input.readOnly = value;
        }
    }
}
FormFieldControlDirective.decorators = [
    { type: Directive, args: [{ selector: 'input, textarea, select' },] }
];
FormFieldControlDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }] }
];
function isSelectElement(value) {
    return value.hasOwnProperty('selectedIndex');
}

/**
 * A form field wrapper which handles the correct layout and validation error display for
 * a form control.
 */
class FormFieldComponent {
    constructor() {
        /**
         * A map of error message codes (required, pattern etc.) to messages to display
         * when those errors are present.
         */
        this.errors = {};
        /**
         * If set to true, the input will be initially set to "readOnly", and an "edit" button
         * will be displayed which allows the field to be edited.
         */
        this.readOnlyToggle = false;
        this.isReadOnly = false;
    }
    ngOnInit() {
        if (this.readOnlyToggle) {
            this.isReadOnly = true;
            this.setReadOnly(true);
        }
        this.isReadOnly = this.readOnlyToggle;
    }
    setReadOnly(value) {
        this.formFieldControl.setReadOnly(value);
        this.isReadOnly = value;
    }
    getErrorMessage() {
        if (!this.formFieldControl || !this.formFieldControl.formControlName) {
            return;
        }
        const errors = this.formFieldControl.formControlName.errors;
        if (errors) {
            for (const errorKey of Object.keys(errors)) {
                if (this.errors[errorKey]) {
                    return this.errors[errorKey];
                }
            }
        }
    }
}
FormFieldComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-form-field',
                template: "<div\n    class=\"form-group\"\n    [class.no-label]=\"!label\"\n    [class.clr-error]=\"formFieldControl?.formControlName?.invalid\"\n>\n    <label *ngIf=\"label\" [for]=\"for\" class=\"clr-control-label\">\n        {{ label }}\n        <vdr-help-tooltip *ngIf=\"tooltip\" [content]=\"tooltip\"></vdr-help-tooltip>\n    </label>\n    <label\n        [for]=\"for\"\n        aria-haspopup=\"true\"\n        role=\"tooltip\"\n        [class.invalid]=\"formFieldControl?.touched && !formFieldControl?.valid\"\n        class=\"tooltip tooltip-validation tooltip-sm tooltip-top-left\"\n    >\n        <div class=\"input-row\" [class.has-toggle]=\"readOnlyToggle\">\n            <ng-content></ng-content>\n            <button\n                *ngIf=\"readOnlyToggle\"\n                type=\"button\"\n                [disabled]=\"!isReadOnly\"\n                [title]=\"'common.edit-field' | translate\"\n                class=\"btn btn-icon edit-button\"\n                (click)=\"setReadOnly(false)\"\n            >\n                <clr-icon shape=\"edit\"></clr-icon>\n            </button>\n        </div>\n        <div class=\"clr-subtext\" *ngIf=\"getErrorMessage()\">{{ getErrorMessage() }}</div>\n        <span class=\"tooltip-content\">{{ label }} is required.</span>\n    </label>\n</div>\n",
                styles: [":host{display:block}:host .form-group>label:first-child{top:6px}:host .form-group>label:nth-of-type(2){flex:1;max-width:20rem}:host .form-group>label:nth-of-type(2) ::ng-deep>*:not(.tooltip-content){width:100%}:host .form-group .tooltip-validation{height:initial}:host .form-group.no-label{margin:-6px 0 0;padding:0;justify-content:center}:host .form-group.no-label>label{position:relative;justify-content:center}:host .form-group.no-label .input-row{justify-content:center}:host .input-row{display:flex}:host .input-row ::ng-deep input{flex:1}:host .input-row ::ng-deep input[disabled]{background-color:var(--color-component-bg-200)}:host .input-row button.edit-button{margin:0;border-radius:0 3px 3px 0}:host .input-row.has-toggle ::ng-deep input{border-top-right-radius:0!important;border-bottom-right-radius:0!important;border-right:none}:host .input-row ::ng-deep clr-toggle-wrapper{margin-top:8px}.tooltip.tooltip-validation.invalid:before{position:absolute;content:\"\";height:.666667rem;width:.666667rem;top:.125rem;right:.25rem;background-image:url(data:image/svg+xml;charset=utf8,%3Csvg%20version%3D%221.1%22%20viewBox%3D%225%205%2026%2026%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%3Cdefs%3E%3Cstyle%3E.clr-i-outline%7Bfill%3A%23a32100%3B%7D%3C%2Fstyle%3E%3C%2Fdefs%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctitle%3Eexclamation-circle-line%3C%2Ftitle%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cpath%20class%3D%22clr-i-outline%20clr-i-outline-path-1%22%20d%3D%22M18%2C6A12%2C12%2C0%2C1%2C0%2C30%2C18%2C12%2C12%2C0%2C0%2C0%2C18%2C6Zm0%2C22A10%2C10%2C0%2C1%2C1%2C28%2C18%2C10%2C10%2C0%2C0%2C1%2C18%2C28Z%22%3E%3C%2Fpath%3E%3Cpath%20class%3D%22clr-i-outline%20clr-i-outline-path-2%22%20d%3D%22M18%2C20.07a1.3%2C1.3%2C0%2C0%2C1-1.3-1.3v-6a1.3%2C1.3%2C0%2C1%2C1%2C2.6%2C0v6A1.3%2C1.3%2C0%2C0%2C1%2C18%2C20.07Z%22%3E%3C%2Fpath%3E%3Ccircle%20class%3D%22clr-i-outline%20clr-i-outline-path-3%22%20cx%3D%2217.95%22%20cy%3D%2223.02%22%20r%3D%221.5%22%3E%3C%2Fcircle%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fsvg%3E);background-repeat:no-repeat;background-size:contain;vertical-align:middle;margin:0}.tooltip.tooltip-sm>.tooltip-content,.tooltip .tooltip-content.tooltip-sm{width:5rem}.tooltip:hover>.tooltip-content{right:12px;margin-bottom:0}.tooltip:not(.invalid):hover>.tooltip-content{display:none}\n"]
            },] }
];
FormFieldComponent.propDecorators = {
    label: [{ type: Input }],
    for: [{ type: Input }],
    tooltip: [{ type: Input }],
    errors: [{ type: Input }],
    readOnlyToggle: [{ type: Input }],
    formFieldControl: [{ type: ContentChild, args: [FormFieldControlDirective, { static: true },] }]
};

/**
 * Like the {@link FormFieldComponent} but for content which is not a form control. Used
 * to keep a consistent layout with other form fields in the form.
 */
class FormItemComponent {
}
FormItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-form-item',
                template: "<div class=\"form-group\">\n    <label class=\"clr-control-label\">{{ label }}</label>\n    <div class=\"content\"><ng-content></ng-content></div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}:host .form-group>.content{flex:1;max-width:20rem}\n"]
            },] }
];
FormItemComponent.propDecorators = {
    label: [{ type: Input }]
};

class FormattedAddressComponent {
    getCountryName() {
        if (this.isAddressFragment(this.address)) {
            return this.address.country.name;
        }
        else {
            return this.address.country || '';
        }
    }
    getCustomFields() {
        const customFields = this.address.customFields;
        if (customFields) {
            return Object.entries(customFields)
                .filter(([key]) => key !== '__typename')
                .map(([key, value]) => { var _a, _b; return ({ key, value: (_b = (_a = value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '-' }); });
        }
        else {
            return [];
        }
    }
    isAddressFragment(input) {
        return typeof input.country !== 'string';
    }
}
FormattedAddressComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-formatted-address',
                template: "<ul class=\"address-lines\">\n    <li *ngIf=\"address.fullName\">{{ address.fullName }}</li>\n    <li *ngIf=\"address.company\">{{ address.company }}</li>\n    <li *ngIf=\"address.streetLine1\">{{ address.streetLine1 }}</li>\n    <li *ngIf=\"address.streetLine2\">{{ address.streetLine2 }}</li>\n    <li *ngIf=\"address.city\">{{ address.city }}</li>\n    <li *ngIf=\"address.province\">{{ address.province }}</li>\n    <li *ngIf=\"address.postalCode\">{{ address.postalCode }}</li>\n    <li *ngIf=\"address.country\">\n        <clr-icon shape=\"world\" size=\"12\"></clr-icon>\n        {{ getCountryName() }}\n    </li>\n    <li *ngIf=\"address.phoneNumber\">\n        <clr-icon shape=\"phone-handset\" size=\"12\"></clr-icon>\n        {{ address.phoneNumber }}\n    </li>\n    <li *ngFor=\"let customField of getCustomFields()\" class=\"custom-field\">\n        <vdr-labeled-data [label]=\"customField.key\">{{ customField.value }}</vdr-labeled-data>\n    </li>\n</ul>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".address-lines{list-style-type:none;line-height:1.2em}.custom-field{margin-top:6px}\n"]
            },] }
];
FormattedAddressComponent.propDecorators = {
    address: [{ type: Input }]
};

class HelpTooltipComponent {
}
HelpTooltipComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-help-tooltip',
                template: "<clr-tooltip>\n    <clr-icon clrTooltipTrigger shape=\"help\" size=\"14\"></clr-icon>\n    <clr-tooltip-content [clrPosition]=\"position\" clrSize=\"md\" *clrIfOpen>\n        <span>{{ content }}</span>\n    </clr-tooltip-content>\n</clr-tooltip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["clr-tooltip{display:inline-flex}\n"]
            },] }
];
HelpTooltipComponent.propDecorators = {
    content: [{ type: Input }],
    position: [{ type: Input }]
};

class HistoryEntryDetailComponent {
}
HistoryEntryDetailComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-history-entry-detail',
                template: "<vdr-dropdown>\n    <button class=\"btn btn-link btn-sm details-button\" vdrDropdownTrigger>\n        <clr-icon shape=\"details\" size=\"12\"></clr-icon>\n        {{ 'common.details' | translate }}\n    </button>\n    <vdr-dropdown-menu>\n        <div class=\"entry-dropdown\">\n            <ng-content></ng-content>\n        </div>\n    </vdr-dropdown-menu>\n</vdr-dropdown>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".entry-dropdown{margin:0 12px}.details-button{margin:0}\n"]
            },] }
];

/**
 * A control for setting the number of items per page in a paginated list.
 */
class ItemsPerPageControlsComponent {
    constructor() {
        this.itemsPerPage = 10;
        this.itemsPerPageChange = new EventEmitter();
    }
}
ItemsPerPageControlsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-items-per-page-controls',
                template: "<div class=\"select\">\n    <select [ngModel]=\"itemsPerPage\" (change)=\"itemsPerPageChange.emit($event.target.value)\">\n        <option [value]=\"10\">{{ 'common.items-per-page-option' | translate: { count: 10 } }}</option>\n        <option [value]=\"25\">{{ 'common.items-per-page-option' | translate: { count: 25 } }}</option>\n        <option [value]=\"50\">{{ 'common.items-per-page-option' | translate: { count: 50 } }}</option>\n        <option [value]=\"100\">{{ 'common.items-per-page-option' | translate: { count: 100 } }}</option>\n    </select>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
ItemsPerPageControlsComponent.propDecorators = {
    itemsPerPage: [{ type: Input }],
    itemsPerPageChange: [{ type: Output }]
};

class LabeledDataComponent {
}
LabeledDataComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-labeled-data',
                template: "<div class=\"label-title\">{{ label }}</div>\n<ng-content></ng-content>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;margin-bottom:6px}.label-title{font-size:12px;color:var(--color-text-300);line-height:12px;margin-bottom:-4px}\n"]
            },] }
];
LabeledDataComponent.propDecorators = {
    label: [{ type: Input }]
};

class LanguageSelectorComponent {
    constructor() {
        this.disabled = false;
        this.languageCodeChange = new EventEmitter();
    }
}
LanguageSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-language-selector',
                template: "<ng-container *ngIf=\"1 < availableLanguageCodes?.length\">\n    <vdr-dropdown>\n        <button type=\"button\" class=\"btn btn-sm\" vdrDropdownTrigger [disabled]=\"disabled\">\n            <clr-icon shape=\"world\"></clr-icon>\n            {{ 'common.language' | translate }}: {{ currentLanguageCode | localeLanguageName | uppercase }}\n            <clr-icon shape=\"caret down\"></clr-icon>\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\">\n            <button\n                type=\"button\"\n                *ngFor=\"let code of availableLanguageCodes\"\n                (click)=\"languageCodeChange.emit(code)\"\n                vdrDropdownItem\n            >\n                <span>{{ code | localeLanguageName }}</span> <span class=\"code ml2\">{{ code }}</span>\n            </button>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</ng-container>\n",
                styles: [".code{color:var(--color-grey-400)}\n"]
            },] }
];
LanguageSelectorComponent.propDecorators = {
    currentLanguageCode: [{ type: Input }],
    availableLanguageCodes: [{ type: Input }],
    disabled: [{ type: Input }],
    languageCodeChange: [{ type: Output }]
};

/**
 * A helper directive used to correctly embed the modal buttons in the {@link ModalDialogComponent}.
 */
class DialogButtonsDirective {
    constructor(modal, templateRef) {
        this.modal = modal;
        this.templateRef = templateRef;
    }
    ngOnInit() {
        // setTimeout due to https://github.com/angular/angular/issues/15634
        setTimeout(() => this.modal.registerButtonsTemplate(this.templateRef));
    }
}
DialogButtonsDirective.decorators = [
    { type: Directive, args: [{ selector: '[vdrDialogButtons]' },] }
];
DialogButtonsDirective.ctorParameters = () => [
    { type: ModalDialogComponent },
    { type: TemplateRef }
];

/**
 * A helper component used to embed a component instance into the {@link ModalDialogComponent}
 */
class DialogComponentOutletComponent {
    constructor(viewContainerRef, componentFactoryResolver) {
        this.viewContainerRef = viewContainerRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.create = new EventEmitter();
    }
    ngOnInit() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        const componentRef = this.viewContainerRef.createComponent(factory);
        this.create.emit(componentRef.instance);
    }
}
DialogComponentOutletComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dialog-component-outlet',
                template: ``
            },] }
];
DialogComponentOutletComponent.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver }
];
DialogComponentOutletComponent.propDecorators = {
    component: [{ type: Input }],
    create: [{ type: Output }]
};

/**
 * A helper directive used to correctly embed the modal title in the {@link ModalDialogComponent}.
 */
class DialogTitleDirective {
    constructor(modal, templateRef) {
        this.modal = modal;
        this.templateRef = templateRef;
    }
    ngOnInit() {
        // setTimeout due to https://github.com/angular/angular/issues/15634
        setTimeout(() => this.modal.registerTitleTemplate(this.templateRef));
    }
}
DialogTitleDirective.decorators = [
    { type: Directive, args: [{ selector: '[vdrDialogTitle]' },] }
];
DialogTitleDirective.ctorParameters = () => [
    { type: ModalDialogComponent },
    { type: TemplateRef }
];

/**
 * @description
 * This component displays a plain JavaScript object as an expandable tree.
 *
 * @example
 * ```HTML
 * <vdr-object-tree [value]="payment.metadata"></vdr-object-tree>
 * ```
 *
 * @docsCategory components
 */
class ObjectTreeComponent {
    constructor(parent) {
        this.isArrayItem = false;
        if (parent) {
            this.depth = parent.depth + 1;
        }
        else {
            this.depth = 0;
        }
    }
    ngOnChanges() {
        this.entries = this.getEntries(this.value);
        this.expanded = this.depth === 0 || this.isArrayItem;
        this.valueIsArray = Object.keys(this.value).every(v => Number.isInteger(+v));
    }
    isObject(value) {
        return typeof value === 'object' && value !== null;
    }
    getEntries(inputValue) {
        if (!this.isObject(inputValue)) {
            return [{ key: '', value: inputValue }];
        }
        return Object.entries(inputValue).map(([key, value]) => ({ key, value }));
    }
}
ObjectTreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-object-tree',
                template: "<button class=\"icon-button\" (click)=\"expanded = !expanded\" *ngIf=\"depth !== 0 && !isArrayItem\">\n    <clr-icon shape=\"caret\" size=\"12\" [dir]=\"expanded ? 'down' : 'right'\"></clr-icon>\n</button>\n<ul\n    class=\"object-tree-node\"\n    [ngClass]=\"'depth-' + depth\"\n    [class.array-value]=\"valueIsArray\"\n    [class.array-item]=\"isArrayItem\"\n    [class.expanded]=\"expanded\"\n>\n    <li *ngFor=\"let entry of entries\">\n        <span class=\"key\" *ngIf=\"entry.key\">{{ entry.key }}:</span>\n        <ng-container *ngIf=\"isObject(entry.value); else primitive\">\n            <vdr-object-tree [value]=\"entry.value\" [isArrayItem]=\"valueIsArray\"></vdr-object-tree>\n        </ng-container>\n        <ng-template #primitive>\n            {{ entry.value }}\n        </ng-template>\n    </li>\n</ul>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".object-tree-node{list-style-type:none;line-height:16px;font-size:12px;overflow:hidden;max-height:0}.object-tree-node.depth-0{margin-left:0;margin-top:8px}.object-tree-node.depth-1{margin-left:6px}.object-tree-node.depth-2{margin-left:6px}.object-tree-node.depth-3{margin-left:6px}.object-tree-node.depth-4{margin-left:6px}.object-tree-node.depth-5{margin-left:6px}.object-tree-node.depth-6{margin-left:6px}.object-tree-node.expanded{max-height:5000px}.object-tree-node.array-item{margin-top:-16px;margin-left:16px}.object-tree-node.array-value.expanded>li+li{margin-top:6px}.key{color:var(--color-text-300)}\n"]
            },] }
];
ObjectTreeComponent.ctorParameters = () => [
    { type: ObjectTreeComponent, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
ObjectTreeComponent.propDecorators = {
    value: [{ type: Input }],
    isArrayItem: [{ type: Input }]
};

class OrderLabelComponent {
}
OrderLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-label',
                template: "<clr-icon shape=\"shopping-cart\" [class.is-solid]=\"order\"></clr-icon>\n<div>\n    <a [routerLink]=\"['/orders', order.id]\"> {{ order.code }} </a>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;align-items:center}clr-icon{margin-right:6px}\n"]
            },] }
];
OrderLabelComponent.propDecorators = {
    order: [{ type: Input }]
};

/**
 * @description
 * Displays the state of an order in a colored chip.
 *
 * @example
 * ```HTML
 * <vdr-order-state-label [state]="order.state"></vdr-order-state-label>
 * ```
 * @docsCategory components
 */
class OrderStateLabelComponent {
    get chipColorType() {
        switch (this.state) {
            case 'AddingItems':
            case 'ArrangingPayment':
                return '';
            case 'Delivered':
                return 'success';
            case 'Cancelled':
            case 'Draft':
                return 'error';
            case 'PaymentAuthorized':
            case 'PaymentSettled':
            case 'PartiallyDelivered':
            case 'PartiallyShipped':
            case 'Shipped':
            default:
                return 'warning';
        }
    }
}
OrderStateLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-order-state-label',
                template: "<vdr-chip [ngClass]=\"state\" [colorType]=\"chipColorType\">\n    <clr-icon shape=\"success-standard\" *ngIf=\"state === 'Delivered'\" size=\"12\"></clr-icon>\n    <clr-icon shape=\"success-standard\" *ngIf=\"state === 'PartiallyDelivered'\" size=\"12\"></clr-icon>\n    <clr-icon shape=\"ban\" *ngIf=\"state === 'Cancelled'\" size=\"12\"></clr-icon>\n    {{ state | stateI18nToken | translate }}\n    <ng-content></ng-content>\n</vdr-chip>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["clr-icon{margin-right:3px}\n"]
            },] }
];
OrderStateLabelComponent.propDecorators = {
    state: [{ type: Input }]
};

class PaginationControlsComponent {
    constructor() {
        this.pageChange = new EventEmitter();
    }
}
PaginationControlsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-pagination-controls',
                template: "<pagination-template #p=\"paginationApi\" (pageChange)=\"pageChange.emit($event)\" [id]=\"id\">\n    <ul>\n        <li class=\"pagination-previous\">\n            <a *ngIf=\"!p.isFirstPage()\" (click)=\"p.previous()\" (keyup.enter)=\"p.previous()\" tabindex=\"0\">\u00AB</a>\n            <div *ngIf=\"p.isFirstPage()\">\u00AB</div>\n        </li>\n\n        <li *ngFor=\"let page of p.pages\">\n            <a\n                (click)=\"p.setCurrent(page.value)\"\n                (keyup.enter)=\"p.setCurrent(page.value)\"\n                *ngIf=\"p.getCurrent() !== page.value\"\n                tabindex=\"0\"\n            >\n                {{ page.label }}\n            </a>\n\n            <div class=\"current\" *ngIf=\"p.getCurrent() === page.value\">{{ page.label }}</div>\n        </li>\n\n        <li class=\"pagination-next\">\n            <a *ngIf=\"!p.isLastPage()\" (click)=\"p.next()\" (keyup.enter)=\"p.next()\" tabindex=\"0\">\u00BB</a>\n            <div *ngIf=\"p.isLastPage()\">\u00BB</div>\n        </li>\n    </ul>\n</pagination-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["pagination-template{display:block}pagination-template ul{list-style-type:none;display:flex;justify-content:center}pagination-template li{transition:border-bottom-color .2s}pagination-template li>a{cursor:pointer}pagination-template li>a:hover,pagination-template li>a:focus{border-bottom-color:var(--color-grey-300);text-decoration:none}pagination-template li>a,pagination-template li>div{padding:3px 12px;display:block;border-bottom:3px solid transparent;-webkit-user-select:none;user-select:none}pagination-template li>div.current{border-bottom-color:var(--color-primary-500)}\n"]
            },] }
];
PaginationControlsComponent.propDecorators = {
    id: [{ type: Input }],
    currentPage: [{ type: Input }],
    itemsPerPage: [{ type: Input }],
    totalItems: [{ type: Input }],
    pageChange: [{ type: Output }]
};

const ɵ0$1 = SingleSearchSelectionModelFactory;
class ProductSearchInputComponent {
    constructor() {
        this.searchTermChange = new EventEmitter();
        this.facetValueChange = new EventEmitter();
        this.lastTerm = '';
        this.lastFacetValueIds = [];
        this.filterFacetResults = (term, item) => {
            if (!this.isFacetValueItem(item)) {
                return false;
            }
            const cix = term.indexOf(':');
            const facetName = cix > -1 ? term.toLowerCase().slice(0, cix) : null;
            const facetVal = cix > -1 ? term.toLowerCase().slice(cix + 1) : term.toLowerCase();
            if (facetName) {
                return (item.facetValue.facet.name.toLowerCase().includes(facetName) &&
                    item.facetValue.name.toLocaleLowerCase().includes(facetVal));
            }
            return (item.facetValue.name.toLowerCase().includes(term.toLowerCase()) ||
                item.facetValue.facet.name.toLowerCase().includes(term.toLowerCase()));
        };
        this.isFacetValueItem = (input) => {
            return typeof input === 'object' && !!input && input.hasOwnProperty('facetValue');
        };
    }
    setSearchTerm(term) {
        if (term) {
            this.selectComponent.select({ label: term, value: { label: term } });
        }
        else {
            const currentTerm = this.selectComponent.selectedItems.find(i => !this.isFacetValueItem(i.value));
            if (currentTerm) {
                this.selectComponent.unselect(currentTerm);
            }
        }
    }
    setFacetValues(ids) {
        const items = this.selectComponent.items;
        this.selectComponent.selectedItems.forEach(item => {
            if (this.isFacetValueItem(item.value) && !ids.includes(item.value.facetValue.id)) {
                this.selectComponent.unselect(item);
            }
        });
        ids.map(id => {
            return items === null || items === void 0 ? void 0 : items.find(item => this.isFacetValueItem(item) && item.facetValue.id === id);
        })
            .filter(notNullOrUndefined)
            .forEach(item => {
            const isSelected = this.selectComponent.selectedItems.find(i => {
                const val = i.value;
                if (this.isFacetValueItem(val)) {
                    return val.facetValue.id === item.facetValue.id;
                }
                return false;
            });
            if (!isSelected) {
                this.selectComponent.select({ label: '', value: item });
            }
        });
    }
    onSelectChange(selectedItems) {
        if (!Array.isArray(selectedItems)) {
            selectedItems = [selectedItems];
        }
        const searchTermItem = selectedItems.find(item => !this.isFacetValueItem(item));
        const searchTerm = searchTermItem ? searchTermItem.label : '';
        const facetValueIds = selectedItems.filter(this.isFacetValueItem).map(i => i.facetValue.id);
        if (searchTerm !== this.lastTerm) {
            this.searchTermChange.emit(searchTerm);
            this.lastTerm = searchTerm;
        }
        if (this.lastFacetValueIds.join(',') !== facetValueIds.join(',')) {
            this.facetValueChange.emit(facetValueIds);
            this.lastFacetValueIds = facetValueIds;
        }
    }
    addTagFn(item) {
        return { label: item };
    }
    isSearchHeaderSelected() {
        return this.selectComponent.itemsList.markedIndex === -1;
    }
}
ProductSearchInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-search-input',
                template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [placeholder]=\"'catalog.search-product-name-or-code' | translate\"\n    [items]=\"facetValueResults\"\n    [searchFn]=\"filterFacetResults\"\n    [hideSelected]=\"true\"\n    [multiple]=\"true\"\n    [markFirst]=\"false\"\n    (change)=\"onSelectChange($event)\"\n    #selectComponent\n>\n    <ng-template ng-header-tmp>\n        <div\n            class=\"search-header\"\n            *ngIf=\"selectComponent.searchTerm\"\n            [class.selected]=\"isSearchHeaderSelected()\"\n            (click)=\"selectComponent.selectTag()\"\n        >\n            {{ 'catalog.search-for-term' | translate }}: {{ selectComponent.searchTerm }}\n        </div>\n    </ng-template>\n    <ng-template ng-label-tmp let-item=\"item\" let-clear=\"clear\">\n        <ng-container *ngIf=\"item.facetValue\">\n            <vdr-facet-value-chip\n                [facetValue]=\"item.facetValue\"\n                [removable]=\"true\"\n                (remove)=\"clear(item)\"\n            ></vdr-facet-value-chip>\n        </ng-container>\n        <ng-container *ngIf=\"!item.facetValue\">\n            <vdr-chip [icon]=\"'times'\" (iconClick)=\"clear(item)\">\"{{ item.label }}\"</vdr-chip>\n        </ng-container>\n    </ng-template>\n    <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\" let-search=\"searchTerm\">\n        <ng-container *ngIf=\"item.facetValue\">\n            <vdr-facet-value-chip [facetValue]=\"item.facetValue\" [removable]=\"false\"></vdr-facet-value-chip>\n        </ng-container>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [{ provide: SELECTION_MODEL_FACTORY, useValue: ɵ0$1 }],
                styles: [":host{margin-top:6px;display:block;width:100%}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}ng-select{width:100%;margin-right:12px}.search-header{padding:8px 10px;border-bottom:1px solid var(--color-component-border-100);cursor:pointer}.search-header.selected,.search-header:hover{background-color:var(--color-component-bg-200)}\n"]
            },] }
];
ProductSearchInputComponent.propDecorators = {
    facetValueResults: [{ type: Input }],
    searchTermChange: [{ type: Output }],
    facetValueChange: [{ type: Output }],
    selectComponent: [{ type: ViewChild, args: ['selectComponent', { static: true },] }]
};

/**
 * @description
 * A component for selecting product variants via an autocomplete-style select input.
 *
 * @example
 * ```HTML
 * <vdr-product-selector
 *   (productSelected)="selectResult($event)"></vdr-product-selector>
 * ```
 *
 * @docsCategory components
 */
class ProductSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.searchInput$ = new Subject();
        this.searchLoading = false;
        this.productSelected = new EventEmitter();
    }
    ngOnInit() {
        this.initSearchResults();
    }
    initSearchResults() {
        const searchItems$ = this.searchInput$.pipe(debounceTime(200), distinctUntilChanged(), tap(() => (this.searchLoading = true)), switchMap(term => {
            if (!term) {
                return of([]);
            }
            return this.dataService.product
                .productSelectorSearch(term, 10)
                .mapSingle(result => result.search.items);
        }), tap(() => (this.searchLoading = false)));
        const clear$ = this.productSelected.pipe(mapTo([]));
        this.searchResults$ = concat(of([]), merge(searchItems$, clear$));
    }
    selectResult(product) {
        if (product) {
            this.productSelected.emit(product);
            this.ngSelect.clearModel();
        }
    }
}
ProductSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-product-selector',
                template: "<ng-select\n    #autoComplete\n    [items]=\"searchResults$ | async\"\n    [addTag]=\"false\"\n    [multiple]=\"false\"\n    [hideSelected]=\"true\"\n    [loading]=\"searchLoading\"\n    [typeahead]=\"searchInput$\"\n    [appendTo]=\"'body'\"\n    [placeholder]=\"'settings.search-by-product-name-or-sku' | translate\"\n    (change)=\"selectResult($event)\"\n>\n    <ng-template ng-option-tmp let-item=\"item\">\n        <img [src]=\"item.productAsset | assetPreview: 32\">\n        {{ item.productVariantName }}\n        <small class=\"sku\">{{ item.sku }}</small>\n    </ng-template>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}.sku{margin-left:12px;color:var(--color-grey-500)}img{border-radius:var(--border-radius-img)}\n"]
            },] }
];
ProductSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
ProductSelectorComponent.propDecorators = {
    productSelected: [{ type: Output }],
    ngSelect: [{ type: ViewChild, args: ['autoComplete', { static: true },] }]
};

class RadioCardFieldsetComponent {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.selectItem = new EventEmitter();
        this.groupName = 'radio-group-' + Math.random().toString(36);
        this.selectedIdChange$ = new Subject();
        this.focussedId = undefined;
        this.idChange$ = new Subject();
    }
    ngOnInit() {
        this.subscription = this.idChange$
            .pipe(throttleTime(200))
            .subscribe(item => this.selectItem.emit(item));
    }
    ngOnChanges(changes) {
        if ('selectedItemId' in changes) {
            this.selectedIdChange$.next(this.selectedItemId);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    isSelected(item) {
        return this.selectedItemId === this.idFn(item);
    }
    isFocussed(item) {
        return this.focussedId === this.idFn(item);
    }
    selectChanged(item) {
        this.idChange$.next(item);
    }
    setFocussedId(item) {
        this.focussedId = item && this.idFn(item);
    }
}
RadioCardFieldsetComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-radio-card-fieldset',
                template: `<fieldset><ng-content></ng-content></fieldset> `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["fieldset{display:flex;align-items:flex-start}\n"]
            },] }
];
RadioCardFieldsetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
RadioCardFieldsetComponent.propDecorators = {
    selectedItemId: [{ type: Input }],
    idFn: [{ type: Input }],
    selectItem: [{ type: Output }]
};

class RadioCardComponent {
    constructor(fieldset, changeDetector) {
        this.fieldset = fieldset;
        this.changeDetector = changeDetector;
        this.idChange$ = new Subject();
        this.name = this.fieldset.groupName;
    }
    ngOnInit() {
        this.subscription = this.fieldset.selectedIdChange$.subscribe(id => {
            this.changeDetector.markForCheck();
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    isSelected(item) {
        return this.fieldset.isSelected(item);
    }
    isFocussed(item) {
        return this.fieldset.isFocussed(item);
    }
    selectChanged(item) {
        this.fieldset.selectChanged(item);
    }
    setFocussedId(item) {
        this.fieldset.setFocussedId(item);
    }
    getItemId(item) {
        return this.fieldset.idFn(item);
    }
}
RadioCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-radio-card',
                template: "<label\n    [ngClass]=\"{\n        'selected': isSelected(item),\n        'focussed': isFocussed(item)\n    }\"\n    class=\"radio-card\"\n>\n    <input\n        type=\"radio\"\n        [name]=\"name\"\n        [value]=\"getItemId(item)\"\n        class=\"hidden\"\n        (focus)=\"setFocussedId(item)\"\n        (blur)=\"setFocussedId(undefined)\"\n        (change)=\"selectChanged(item)\"\n    />\n    <vdr-select-toggle [selected]=\"isSelected(item)\" size=\"small\"></vdr-select-toggle>\n    <div class=\"content\">\n        <ng-content></ng-content>\n    </div>\n</label>\n",
                exportAs: 'VdrRadioCard',
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:inline-block}.radio-card{background:none;position:relative;display:block;border:1px solid var(--clr-btn-default-border-color, #0072a3);border-radius:var(--clr-btn-border-radius, .15rem);padding:6px;text-align:left;margin:6px}.radio-card:hover{cursor:pointer;outline:1px solid var(--color-primary-500)}.radio-card.selected{outline:1px solid var(--color-primary-500);background-color:var(--color-primary-100)}input.hidden{visibility:hidden;position:absolute}vdr-select-toggle{position:absolute;top:3px;left:3px}.content{margin-left:24px}\n"]
            },] }
];
RadioCardComponent.ctorParameters = () => [
    { type: RadioCardFieldsetComponent },
    { type: ChangeDetectorRef }
];
RadioCardComponent.propDecorators = {
    item: [{ type: Input }],
    itemTemplate: [{ type: ContentChild, args: [TemplateRef,] }]
};

class ExternalImageDialogComponent {
    constructor() {
        this.previewLoaded = false;
    }
    ngOnInit() {
        this.form = new FormGroup({
            src: new FormControl(this.existing ? this.existing.src : '', Validators.required),
            title: new FormControl(this.existing ? this.existing.title : ''),
            alt: new FormControl(this.existing ? this.existing.alt : ''),
        });
    }
    select() {
        this.resolveWith(this.form.value);
    }
    onImageLoad(event) {
        this.previewLoaded = true;
    }
    onImageError(event) {
        this.previewLoaded = false;
    }
}
ExternalImageDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-external-image-dialog',
                template: "<div class=\"flex\">\n    <form [formGroup]=\"form\" class=\"flex-spacer\" clrForm clrLayout=\"vertical\">\n        <clr-input-container class=\"expand\">\n            <label>{{ 'editor.image-src' | translate }}</label>\n            <input clrInput type=\"text\" formControlName=\"src\" />\n        </clr-input-container>\n        <clr-input-container class=\"expand\">\n            <label>{{ 'editor.image-title' | translate }}</label>\n            <input clrInput type=\"text\" formControlName=\"title\" />\n        </clr-input-container>\n        <clr-input-container class=\"expand\">\n            <label>{{ 'editor.image-alt' | translate }}</label>\n            <input clrInput type=\"text\" formControlName=\"alt\" />\n        </clr-input-container>\n    </form>\n    <div class=\"preview\">\n        <img\n            [src]=\"form.get('src')?.value\"\n            [class.visible]=\"previewLoaded\"\n            (load)=\"onImageLoad($event)\"\n            (error)=\"onImageError($event)\"\n        />\n        <div class=\"placeholder\" *ngIf=\"!previewLoaded\">\n            <clr-icon shape=\"image\" size=\"128\"></clr-icon>\n        </div>\n    </div>\n</div>\n\n<ng-template vdrDialogButtons>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"form.invalid || !previewLoaded\">\n        <ng-container *ngIf=\"existing; else doesNotExist\">{{ 'common.update' | translate }}</ng-container>\n        <ng-template #doesNotExist>{{ 'editor.insert-image' | translate }}</ng-template>\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".preview{display:flex;align-items:center;justify-content:center;max-width:150px;margin-left:12px}.preview img{max-width:100%;display:none}.preview img.visible{display:block}.preview .placeholder{color:var(--color-grey-300)}\n"]
            },] }
];

class LinkDialogComponent {
    ngOnInit() {
        this.form = new FormGroup({
            href: new FormControl(this.existing ? this.existing.href : '', Validators.required),
            title: new FormControl(this.existing ? this.existing.title : ''),
        });
    }
    remove() {
        this.resolveWith({
            title: '',
            href: '',
        });
    }
    select() {
        this.resolveWith(this.form.value);
    }
}
LinkDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-link-dialog',
                template: "<form [formGroup]=\"form\">\n    <vdr-form-field [label]=\"'editor.link-href' | translate\" for=\"href\">\n        <input id=\"href\" type=\"text\" formControlName=\"href\" />\n    </vdr-form-field>\n    <vdr-form-field [label]=\"'editor.link-title' | translate\" for=\"title\">\n        <input id=\"title\" type=\"text\" formControlName=\"title\" />\n    </vdr-form-field>\n</form>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"remove()\" *ngIf=\"existing\">\n        <clr-icon shape=\"unlink\"></clr-icon> {{ 'editor.remove-link' | translate }}\n    </button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"form.invalid\">\n        {{ 'editor.set-link' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];

class ContextMenuService {
    constructor() {
        this.menuIsVisible$ = new BehaviorSubject(false);
        this.setContextMenuConfig$ = new Subject();
        const source$ = this.setContextMenuConfig$.asObservable();
        const groupedConfig$ = source$.pipe(bufferWhen(() => source$.pipe(debounceTime(50))), map(group => {
            return group.reduce((acc, cur) => {
                var _a;
                if (!acc) {
                    return cur;
                }
                else {
                    if ((cur === null || cur === void 0 ? void 0 : cur.ref) === acc.ref) {
                        acc.items.push(
                        // de-duplicate items
                        ...((_a = cur === null || cur === void 0 ? void 0 : cur.items.filter(i => !acc.items.find(ai => ai.label === i.label))) !== null && _a !== void 0 ? _a : []));
                    }
                }
                return acc;
            }, undefined);
        }));
        const visible$ = this.menuIsVisible$.pipe(filter(val => val === true));
        const isVisible$ = this.menuIsVisible$.pipe(delayWhen(value => (value ? of(value) : interval(250).pipe(takeUntil(visible$)))), distinctUntilChanged());
        this.contextMenu$ = combineLatest(groupedConfig$, isVisible$).pipe(map(([config, isVisible]) => (isVisible ? config : undefined)));
    }
    setVisibility(isVisible) {
        this.menuIsVisible$.next(isVisible);
    }
    setContextMenu(config) {
        this.setContextMenuConfig$.next(config);
    }
    clearContextMenu() {
        this.setContextMenuConfig$.next(undefined);
    }
}
ContextMenuService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ContextMenuService_Factory() { return new ContextMenuService(); }, token: ContextMenuService, providedIn: "root" });
ContextMenuService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
ContextMenuService.ctorParameters = () => [];

class ContextMenuComponent {
    constructor(overlay, viewContainerRef, contextMenuService) {
        this.overlay = overlay;
        this.viewContainerRef = viewContainerRef;
        this.contextMenuService = contextMenuService;
        this.triggerIsHidden = new BehaviorSubject(false);
        this.onScroll = () => {
            var _a;
            if ((_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.hasAttached()) {
                this.overlayRef.updatePosition();
            }
        };
    }
    ngAfterViewInit() {
        var _a;
        this.contentArea = document.querySelector('.content-area');
        this.menuPortal = new TemplatePortal(this.menuTemplate, this.viewContainerRef);
        this.hideTrigger$ = this.triggerIsHidden.asObservable().pipe(distinctUntilChanged());
        (_a = this.contentArea) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', this.onScroll, { passive: true });
        this.contextMenuSub = this.contextMenuService.contextMenu$.subscribe(contextMenuConfig => {
            var _a, _b, _c;
            (_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.dispose();
            this.menuConfig = contextMenuConfig;
            if (contextMenuConfig) {
                this.overlayRef = this.overlay.create({
                    hasBackdrop: false,
                    positionStrategy: this.getPositionStrategy(contextMenuConfig.element),
                    maxHeight: '70vh',
                });
                this.overlayRef.attach(this.menuPortal);
                this.triggerIsHidden.next(false);
                const triggerButton = this.overlayRef.hostElement.querySelector('.context-menu-trigger');
                const editorMenu = this.editorMenuElement;
                if (triggerButton) {
                    const overlapMarginPx = 5;
                    this.hideTriggerHandler = () => {
                        if (editorMenu && triggerButton) {
                            if (triggerButton.getBoundingClientRect().top + overlapMarginPx <
                                editorMenu.getBoundingClientRect().bottom) {
                                this.triggerIsHidden.next(true);
                            }
                            else {
                                this.triggerIsHidden.next(false);
                            }
                        }
                    };
                    (_b = this.contentArea) === null || _b === void 0 ? void 0 : _b.addEventListener('scroll', this.hideTriggerHandler, { passive: true });
                    requestAnimationFrame(() => { var _a; return (_a = this.hideTriggerHandler) === null || _a === void 0 ? void 0 : _a.call(this); });
                }
            }
            else {
                if (this.hideTriggerHandler) {
                    (_c = this.contentArea) === null || _c === void 0 ? void 0 : _c.removeEventListener('scroll', this.hideTriggerHandler);
                }
            }
        });
    }
    triggerClick() {
        this.contextMenuService.setVisibility(true);
    }
    ngOnDestroy() {
        var _a, _b, _c, _d;
        (_a = this.overlayRef) === null || _a === void 0 ? void 0 : _a.dispose();
        (_b = this.contextMenuSub) === null || _b === void 0 ? void 0 : _b.unsubscribe();
        (_c = this.contentArea) === null || _c === void 0 ? void 0 : _c.removeEventListener('scroll', this.onScroll);
        if (this.hideTriggerHandler) {
            (_d = this.contentArea) === null || _d === void 0 ? void 0 : _d.removeEventListener('scroll', this.hideTriggerHandler);
        }
    }
    clickItem(item) {
        item.onClick();
    }
    getPositionStrategy(element) {
        const position = {
            ['top-left']: {
                originX: 'start',
                originY: 'top',
                overlayX: 'start',
                overlayY: 'bottom',
            },
            ['top-right']: {
                originX: 'end',
                originY: 'top',
                overlayX: 'end',
                overlayY: 'bottom',
            },
            ['bottom-left']: {
                originX: 'start',
                originY: 'bottom',
                overlayX: 'start',
                overlayY: 'top',
            },
            ['bottom-right']: {
                originX: 'end',
                originY: 'bottom',
                overlayX: 'end',
                overlayY: 'top',
            },
        };
        const pos = position['top-left'];
        return this.overlay
            .position()
            .flexibleConnectedTo(element)
            .withPositions([pos, this.invertPosition(pos)])
            .withViewportMargin(0)
            .withLockedPosition(false)
            .withPush(false);
    }
    /** Inverts an overlay position. */
    invertPosition(pos) {
        const inverted = Object.assign({}, pos);
        inverted.originY = pos.originY === 'top' ? 'bottom' : 'top';
        inverted.overlayY = pos.overlayY === 'top' ? 'bottom' : 'top';
        return inverted;
    }
}
ContextMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-context-menu',
                template: "<ng-template #contextMenu>\n    <vdr-dropdown>\n        <button class=\"context-menu-trigger\" vdrDropdownTrigger [class.hidden]=\"hideTrigger$ | async\" (click)=\"triggerClick()\">\n            <clr-icon\n                *ngIf=\"menuConfig?.iconShape as shape\"\n                [attr.shape]=\"shape\"\n                size=\"16\"\n                class=\"mr2\"\n            ></clr-icon>\n            <span class=\"title-label\">{{ menuConfig?.title }}</span>\n        </button>\n        <vdr-dropdown-menu vdrPosition=\"bottom-right\" customClasses=\"context-menu\">\n            <ng-container *ngFor=\"let item of menuConfig?.items\">\n                <button\n                    class=\"context-menu-item\"\n                    *ngIf=\"item.enabled && item.separator !== true\"\n                    type=\"button\"\n                    (click)=\"clickItem(item)\"\n                >\n                    <div *ngIf=\"item.iconClass\" class=\"cm-icon\" [ngClass]=\"item.iconClass\"></div>\n                    <clr-icon\n                        *ngIf=\"item.iconShape as shape\"\n                        [attr.shape]=\"shape\"\n                        size=\"16\"\n                        class=\"mr2\"\n                    ></clr-icon>\n                    {{ item.label }}\n                </button>\n                <div *ngIf=\"item.enabled && item.separator\" class=\"dropdown-divider\" role=\"separator\"></div>\n            </ng-container>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".context-menu-trigger{margin:0;display:flex;align-items:center;border:1px solid var(--color-component-border-200);font-size:90%;color:var(--color-text-200);border-radius:var(--border-radius-input);background-color:var(--color-component-bg-100)}.title-label{padding-right:15px;position:relative}.title-label:after{content:\"\";border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid currentColor;opacity:.6;position:absolute;right:4px;top:calc(50% - 2px)}.context-menu-item{display:flex;align-items:center;width:100%;text-align:start;font-size:90%;color:var(--color-text-200);background-color:var(--color-component-bg-100);cursor:pointer;border:none}.context-menu-item:hover{background-color:var(--color-component-bg-200)}::ng-deep .dropdown-menu.context-menu{padding:0;background-color:var(--color-component-bg-100)}::ng-deep .context-menu-trigger{min-height:16px}::ng-deep .context-menu-trigger.hidden{visibility:hidden}::ng-deep .cm-icon.add-column{height:14px;width:4px;border:1px solid;margin:0 6px 0 8px;position:relative}::ng-deep .cm-icon.add-column:before{content:\"+\";position:absolute;font-size:16px;line-height:14px;left:-10px}::ng-deep .cm-icon.add-row{height:4px;width:14px;border:1px solid;margin:6px 4px 2px 0;position:relative}::ng-deep .cm-icon.add-row:before{content:\"+\";position:absolute;font-size:16px;line-height:14px;left:-2px;top:-10px}\n"]
            },] }
];
ContextMenuComponent.ctorParameters = () => [
    { type: Overlay },
    { type: ViewContainerRef },
    { type: ContextMenuService }
];
ContextMenuComponent.propDecorators = {
    editorMenuElement: [{ type: Input }],
    menuTemplate: [{ type: ViewChild, args: ['contextMenu', { static: true },] }]
};

class RawHtmlDialogComponent {
    constructor() {
        this.formControl = new FormControl();
        this.config = {
            name: '',
            type: '',
            list: false,
            required: true,
            ui: { component: HtmlEditorFormInputComponent.id },
        };
    }
    ngOnInit() {
        this.formControl.setValue(this.process(this.html));
    }
    process(str) {
        const div = document.createElement('div');
        div.innerHTML = str.trim();
        return this.format(div, 0).innerHTML.trim();
    }
    /**
     * Taken from https://stackoverflow.com/a/26361620/772859
     */
    format(node, level = 0) {
        const indentBefore = new Array(level++ + 1).join('\t');
        const indentAfter = new Array(level - 1).join('\t');
        let textNode;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < node.children.length; i++) {
            textNode = document.createTextNode('\n' + indentBefore);
            node.insertBefore(textNode, node.children[i]);
            this.format(node.children[i], level);
            if (node.lastElementChild === node.children[i]) {
                textNode = document.createTextNode('\n' + indentAfter);
                node.appendChild(textNode);
            }
        }
        return node;
    }
    cancel() {
        this.resolveWith(undefined);
    }
    select() {
        this.resolveWith(this.formControl.value);
    }
}
RawHtmlDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-raw-html-dialog',
                template: "<vdr-dynamic-form-input\n                      [def]=\"config\"\n                      [control]=\"formControl\"\n                  ></vdr-dynamic-form-input>\n<ng-template vdrDialogButtons>\n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"cancel()\">\n       {{ 'common.cancel' | translate }}\n    </button>\n    <button type=\"submit\" (click)=\"select()\" class=\"btn btn-primary\" [disabled]=\"formControl.invalid\">\n        {{ 'common.update' | translate }}\n    </button>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];

const ɵ0 = node => {
    var _a, _b;
    if (node instanceof HTMLIFrameElement) {
        const attrs = {
            allow: node.allow,
            allowfullscreeen: (_a = node.allowFullscreen) !== null && _a !== void 0 ? _a : true,
            frameborder: node.getAttribute('frameborder'),
            height: node.height,
            name: node.name,
            referrerpolicy: node.referrerPolicy,
            src: node.src,
            srcdoc: node.srcdoc || undefined,
            title: (_b = node.title) !== null && _b !== void 0 ? _b : '',
            width: node.width,
        };
        if (node.sandbox.length) {
            attrs.sandbox = node.sandbox;
        }
        return attrs;
    }
    return null;
};
const iframeNode = {
    group: 'block',
    attrs: {
        allow: {},
        allowfullscreeen: {},
        frameborder: {},
        height: { default: undefined },
        name: { default: '' },
        referrerpolicy: {},
        sandbox: { default: undefined },
        src: {},
        srcdoc: { default: undefined },
        title: { default: undefined },
        width: { default: undefined },
    },
    parseDOM: [
        {
            tag: 'iframe',
            getAttrs: ɵ0,
        },
    ],
    toDOM(node) {
        return ['iframe', Object.assign({}, node.attrs)];
    },
};
const iframeNodeView = (node, view, getPos, decorations) => {
    const domSerializer = DOMSerializer.fromSchema(view.state.schema);
    const wrapper = document.createElement('div');
    wrapper.classList.add('iframe-wrapper');
    const iframe = domSerializer.serializeNode(node);
    wrapper.appendChild(iframe);
    return {
        dom: wrapper,
    };
};

// : (NodeType) → InputRule
// Given a blockquote node type, returns an input rule that turns `"> "`
// at the start of a textblock into a blockquote.
function blockQuoteRule(nodeType) {
    return wrappingInputRule(/^\s*>\s$/, nodeType);
}
// : (NodeType) → InputRule
// Given a list node type, returns an input rule that turns a number
// followed by a dot at the start of a textblock into an ordered list.
function orderedListRule(nodeType) {
    return wrappingInputRule(/^(\d+)\.\s$/, nodeType, match => ({ order: +match[1] }), (match, node) => node.childCount + node.attrs.order === +match[1]);
}
// : (NodeType) → InputRule
// Given a list node type, returns an input rule that turns a bullet
// (dash, plush, or asterisk) at the start of a textblock into a
// bullet list.
function bulletListRule(nodeType) {
    return wrappingInputRule(/^\s*([-+*])\s$/, nodeType);
}
// : (NodeType) → InputRule
// Given a code block node type, returns an input rule that turns a
// textblock starting with three backticks into a code block.
function codeBlockRule(nodeType) {
    return textblockTypeInputRule(/^```$/, nodeType);
}
// : (NodeType, number) → InputRule
// Given a node type and a maximum level, creates an input rule that
// turns up to that number of `#` characters followed by a space at
// the start of a textblock into a heading whose level corresponds to
// the number of `#` signs.
function headingRule(nodeType, maxLevel) {
    return textblockTypeInputRule(new RegExp('^(#{1,' + maxLevel + '})\\s$'), nodeType, match => ({
        level: match[1].length,
    }));
}
// : (Schema) → Plugin
// A set of input rules for creating the basic block quotes, lists,
// code blocks, and heading.
function buildInputRules(schema) {
    const rules = smartQuotes.concat(ellipsis, emDash);
    let type;
    // tslint:disable:no-conditional-assignment
    if ((type = schema.nodes.blockquote)) {
        rules.push(blockQuoteRule(type));
    }
    if ((type = schema.nodes.ordered_list)) {
        rules.push(orderedListRule(type));
    }
    if ((type = schema.nodes.bullet_list)) {
        rules.push(bulletListRule(type));
    }
    if ((type = schema.nodes.code_block)) {
        rules.push(codeBlockRule(type));
    }
    if ((type = schema.nodes.heading)) {
        rules.push(headingRule(type, 6));
    }
    return inputRules({ rules });
}

const mac = typeof navigator !== 'undefined' ? /Mac/.test(navigator.platform) : false;
// :: (Schema, ?Object) → Object
// Inspect the given schema looking for marks and nodes from the
// basic schema, and if found, add key bindings related to them.
// This will add:
//
// * **Mod-b** for toggling [strong](#schema-basic.StrongMark)
// * **Mod-i** for toggling [emphasis](#schema-basic.EmMark)
// * **Mod-`** for toggling [code font](#schema-basic.CodeMark)
// * **Ctrl-Shift-0** for making the current textblock a paragraph
// * **Ctrl-Shift-1** to **Ctrl-Shift-Digit6** for making the current
//   textblock a heading of the corresponding level
// * **Ctrl-Shift-Backslash** to make the current textblock a code block
// * **Ctrl-Shift-8** to wrap the selection in an ordered list
// * **Ctrl-Shift-9** to wrap the selection in a bullet list
// * **Ctrl->** to wrap the selection in a block quote
// * **Enter** to split a non-empty textblock in a list item while at
//   the same time splitting the list item
// * **Mod-Enter** to insert a hard break
// * **Mod-_** to insert a horizontal rule
// * **Backspace** to undo an input rule
// * **Alt-ArrowUp** to `joinUp`
// * **Alt-ArrowDown** to `joinDown`
// * **Mod-BracketLeft** to `lift`
// * **Escape** to `selectParentNode`
//
// You can suppress or map these bindings by passing a `mapKeys`
// argument, which maps key names (say `"Mod-B"` to either `false`, to
// remove the binding, or a new key name string.
function buildKeymap(schema, mapKeys) {
    const keys = {};
    let type;
    function bind(key, cmd) {
        if (mapKeys) {
            const mapped = mapKeys[key];
            if (mapped === false) {
                return;
            }
            if (mapped) {
                key = mapped;
            }
        }
        keys[key] = cmd;
    }
    bind('Mod-z', undo);
    bind('Shift-Mod-z', redo);
    bind('Backspace', undoInputRule);
    if (!mac) {
        bind('Mod-y', redo);
    }
    bind('Alt-ArrowUp', joinUp);
    bind('Alt-ArrowDown', joinDown);
    bind('Mod-BracketLeft', lift);
    bind('Escape', selectParentNode);
    // tslint:disable:no-conditional-assignment
    if ((type = schema.marks.strong)) {
        bind('Mod-b', toggleMark(type));
        bind('Mod-B', toggleMark(type));
    }
    if ((type = schema.marks.em)) {
        bind('Mod-i', toggleMark(type));
        bind('Mod-I', toggleMark(type));
    }
    if ((type = schema.marks.code)) {
        bind('Mod-`', toggleMark(type));
    }
    if ((type = schema.nodes.bullet_list)) {
        bind('Shift-Ctrl-8', wrapInList(type));
    }
    if ((type = schema.nodes.ordered_list)) {
        bind('Shift-Ctrl-9', wrapInList(type));
    }
    if ((type = schema.nodes.blockquote)) {
        bind('Ctrl->', wrapIn(type));
    }
    if ((type = schema.nodes.hard_break)) {
        const br = type;
        const cmd = chainCommands(exitCode, (state, dispatch) => {
            // tslint:disable-next-line:no-non-null-assertion
            dispatch(state.tr.replaceSelectionWith(br.create()).scrollIntoView());
            return true;
        });
        bind('Mod-Enter', cmd);
        bind('Shift-Enter', cmd);
        if (mac) {
            bind('Ctrl-Enter', cmd);
        }
    }
    if ((type = schema.nodes.list_item)) {
        bind('Enter', splitListItem(type));
        bind('Mod-[', liftListItem(type));
        bind('Mod-]', sinkListItem(type));
    }
    if ((type = schema.nodes.paragraph)) {
        bind('Shift-Ctrl-0', setBlockType(type));
    }
    if ((type = schema.nodes.code_block)) {
        bind('Shift-Ctrl-\\', setBlockType(type));
    }
    if ((type = schema.nodes.heading)) {
        for (let i = 1; i <= 6; i++) {
            bind('Shift-Ctrl-' + i, setBlockType(type, { level: i }));
        }
    }
    if ((type = schema.nodes.horizontal_rule)) {
        const hr = type;
        bind('Mod-_', (state, dispatch) => {
            dispatch(state.tr.replaceSelectionWith(hr.create()).scrollIntoView());
            return true;
        });
    }
    return keys;
}

function markActive(state, type) {
    const { from, $from, to, empty } = state.selection;
    if (empty) {
        return type.isInSet(state.storedMarks || $from.marks());
    }
    else {
        return state.doc.rangeHasMark(from, to, type);
    }
}
function canInsert(state, nodeType) {
    const $from = state.selection.$from;
    for (let d = $from.depth; d >= 0; d--) {
        const index = $from.index(d);
        if ($from.node(d).canReplaceWith(index, index, nodeType)) {
            return true;
        }
    }
    return false;
}
function renderClarityIcon(options) {
    return (view) => {
        var _a, _b;
        const icon = document.createElement('clr-icon');
        icon.setAttribute('shape', options.shape);
        icon.setAttribute('size', ((_a = options.size) !== null && _a !== void 0 ? _a : IconSize.Small).toString());
        const labelEl = document.createElement('span');
        labelEl.textContent = (_b = options.label) !== null && _b !== void 0 ? _b : '';
        return wrapInMenuItemWithIcon(icon, options.label ? labelEl : undefined);
    };
}
function wrapInMenuItemWithIcon(...elements) {
    const wrapperEl = document.createElement('span');
    wrapperEl.classList.add('menu-item-with-icon');
    wrapperEl.append(...elements.filter(notNullOrUndefined));
    return wrapperEl;
}
const IconSize = {
    Large: 22,
    Small: 16,
};

function insertImageItem(nodeType, modalService) {
    return new MenuItem({
        title: 'Insert image',
        label: 'Image',
        render: renderClarityIcon({ shape: 'image', label: 'Image' }),
        class: '',
        css: '',
        enable(state) {
            return canInsert(state, nodeType);
        },
        run(state, _, view) {
            let attrs;
            if (state.selection instanceof NodeSelection && state.selection.node.type === nodeType) {
                attrs = state.selection.node.attrs;
            }
            modalService
                .fromComponent(ExternalImageDialogComponent, {
                closable: true,
                locals: {
                    existing: attrs,
                },
            })
                .subscribe(result => {
                if (result) {
                    // tslint:disable-next-line:no-non-null-assertion
                    view.dispatch(view.state.tr.replaceSelectionWith(nodeType.createAndFill(result)));
                }
                view.focus();
            });
        },
    });
}
const imageContextMenuPlugin = (contextMenuService, modalService) => new Plugin({
    view: () => {
        return {
            update: view => {
                if (!view.hasFocus()) {
                    return;
                }
                const { doc, selection } = view.state;
                let imageNode;
                let imageNodePos = 0;
                doc.nodesBetween(selection.from, selection.to, (n, pos, parent) => {
                    if (n.type.name === 'image') {
                        imageNode = n;
                        imageNodePos = pos;
                        return false;
                    }
                });
                if (imageNode) {
                    const node = view.nodeDOM(imageNodePos);
                    if (node instanceof HTMLImageElement) {
                        contextMenuService.setContextMenu({
                            ref: selection,
                            title: 'Image',
                            iconShape: 'image',
                            element: node,
                            coords: view.coordsAtPos(imageNodePos),
                            items: [
                                {
                                    enabled: true,
                                    iconShape: 'image',
                                    label: 'Image properties',
                                    onClick: () => {
                                        contextMenuService.clearContextMenu();
                                        modalService
                                            .fromComponent(ExternalImageDialogComponent, {
                                            closable: true,
                                            locals: {
                                                // tslint:disable-next-line:no-non-null-assertion
                                                existing: imageNode.attrs,
                                            },
                                        })
                                            .subscribe(result => {
                                            if (result) {
                                                // tslint:disable-next-line:no-non-null-assertion
                                                view.dispatch(view.state.tr.replaceSelectionWith(
                                                // tslint:disable-next-line:no-non-null-assertion
                                                imageNode.type.createAndFill(result)));
                                            }
                                            view.focus();
                                        });
                                    },
                                },
                            ],
                        });
                    }
                }
                else {
                    contextMenuService.clearContextMenu();
                }
            },
        };
    },
});

const tableContextMenuPlugin = (contextMenuService) => new Plugin({
    view: () => {
        return {
            update: view => {
                if (!view.hasFocus()) {
                    return;
                }
                const { doc, selection } = view.state;
                let tableNode;
                let tableNodePos = 0;
                doc.nodesBetween(selection.from, selection.to, (n, pos, parent) => {
                    if (n.type.name === 'table') {
                        tableNode = n;
                        tableNodePos = pos;
                        return false;
                    }
                });
                if (tableNode) {
                    const node = view.nodeDOM(tableNodePos);
                    if (node instanceof Element) {
                        function createMenuItem(label, commandFn, iconClass) {
                            const enabled = commandFn(view.state);
                            return {
                                label,
                                enabled,
                                iconClass,
                                onClick: () => {
                                    contextMenuService.clearContextMenu();
                                    view.focus();
                                    commandFn(view.state, view.dispatch);
                                },
                            };
                        }
                        const separator = {
                            label: '',
                            separator: true,
                            enabled: true,
                            onClick: () => {
                                /**/
                            },
                        };
                        contextMenuService.setContextMenu({
                            ref: selection,
                            title: 'Table',
                            iconShape: 'table',
                            element: node,
                            coords: view.coordsAtPos(tableNodePos),
                            items: [
                                createMenuItem('Insert column before', addColumnBefore, 'add-column'),
                                createMenuItem('Insert column after', addColumnAfter, 'add-column'),
                                createMenuItem('Insert row before', addRowBefore, 'add-row'),
                                createMenuItem('Insert row after', addRowAfter, 'add-row'),
                                createMenuItem('Merge cells', mergeCells),
                                createMenuItem('Split cell', splitCell),
                                separator,
                                createMenuItem('Toggle header column', toggleHeaderColumn),
                                createMenuItem('Toggle header row', toggleHeaderRow),
                                separator,
                                createMenuItem('Delete column', deleteColumn),
                                createMenuItem('Delete row', deleteRow),
                                createMenuItem('Delete table', deleteTable),
                            ],
                        });
                    }
                }
                else {
                    contextMenuService.clearContextMenu();
                }
            },
        };
    },
});
function getTableNodes() {
    return tableNodes({
        tableGroup: 'block',
        cellContent: 'block+',
        cellAttributes: {
            background: {
                default: null,
                getFromDOM(dom) {
                    return dom.style.backgroundColor || null;
                },
                setDOMAttr(value, attrs) {
                    if (value) {
                        attrs.style = (attrs.style || '') + `background-color: ${value};`;
                    }
                },
            },
        },
    });
}
function getTableMenu(schema) {
    function item(label, cmd, iconShape) {
        return new MenuItem({
            label,
            select: cmd,
            run: cmd,
            render: iconShape ? renderClarityIcon({ shape: iconShape, label }) : undefined,
        });
    }
    function separator() {
        return new MenuItem({
            select: state => isInTable(state),
            run: state => {
                /**/
            },
            render: view => {
                const el = document.createElement('div');
                el.classList.add('menu-separator');
                return el;
            },
        });
    }
    return [
        item('Insert column before', addColumnBefore),
        item('Insert column after', addColumnAfter),
        item('Insert row before', addRowBefore),
        item('Insert row after', addRowAfter),
        item('Merge cells', mergeCells),
        item('Split cell', splitCell),
        separator(),
        item('Toggle header column', toggleHeaderColumn),
        item('Toggle header row', toggleHeaderRow),
        item('Toggle header cells', toggleHeaderCell),
        separator(),
        item('Delete column', deleteColumn),
        item('Delete row', deleteRow),
        item('Delete table', deleteTable),
    ];
}
function addTable(state, dispatch, { rowsCount, colsCount, withHeaderRow, cellContent }) {
    const offset = state.tr.selection.anchor + 1;
    const nodes = createTable(state, rowsCount, colsCount, withHeaderRow, cellContent);
    const tr = state.tr.replaceSelectionWith(nodes).scrollIntoView();
    const resolvedPos = tr.doc.resolve(offset);
    tr.setSelection(TextSelection.near(resolvedPos));
    dispatch(tr);
}
function createTable(state, rowsCount, colsCount, withHeaderRow, cellContent) {
    const types = tableNodeTypes(state.schema);
    const headerCells = [];
    const cells = [];
    const createCell = (cellType, _cellContent) => _cellContent ? cellType.createChecked(null, _cellContent) : cellType.createAndFill();
    for (let index = 0; index < colsCount; index += 1) {
        const cell = createCell(types.cell, cellContent);
        if (cell) {
            cells.push(cell);
        }
        if (withHeaderRow) {
            const headerCell = createCell(types.header_cell, cellContent);
            if (headerCell) {
                headerCells.push(headerCell);
            }
        }
    }
    const rows = [];
    for (let index = 0; index < rowsCount; index += 1) {
        rows.push(types.row.createChecked(null, withHeaderRow && index === 0 ? headerCells : cells));
    }
    return types.table.createChecked(null, rows);
}

function selectionIsWithinLink(state, anchor, head) {
    const { doc } = state;
    const headLink = doc
        .resolve(head)
        .marks()
        .find(m => m.type.name === 'link');
    const anchorLink = doc
        .resolve(anchor)
        .marks()
        .find(m => m.type.name === 'link');
    if (headLink && anchorLink && headLink.eq(anchorLink)) {
        return true;
    }
    return false;
}
function linkItem(linkMark, modalService) {
    return new MenuItem({
        title: 'Add or remove link',
        render: renderClarityIcon({ shape: 'link', size: 22 }),
        class: '',
        css: '',
        active(state) {
            return markActive(state, linkMark);
        },
        enable(state) {
            const { selection } = state;
            return !selection.empty || selectionIsWithinLink(state, selection.anchor, selection.head);
        },
        run(state, dispatch, view) {
            let attrs;
            const { selection, doc } = state;
            if (selection instanceof TextSelection &&
                selectionIsWithinLink(state, selection.anchor + 1, selection.head - 1)) {
                const mark = doc
                    .resolve(selection.anchor + 1)
                    .marks()
                    .find(m => m.type.name === 'link');
                if (mark) {
                    attrs = mark.attrs;
                }
            }
            modalService
                .fromComponent(LinkDialogComponent, {
                closable: true,
                locals: {
                    existing: attrs,
                },
            })
                .subscribe(result => {
                let tr = state.tr;
                if (result) {
                    const { $from, $to } = selection.ranges[0];
                    tr = tr.removeMark($from.pos, $to.pos, linkMark);
                    if (result.href !== '') {
                        tr = tr.addMark($from.pos, $to.pos, linkMark.create(result));
                    }
                }
                dispatch(tr.scrollIntoView());
                view.focus();
            });
            return true;
        },
    });
}

class SubMenuWithIcon extends DropdownSubmenu {
    constructor(content, options) {
        super(content, options);
        this.icon = options.icon();
    }
    render(view) {
        const { dom, update } = super.render(view);
        return {
            dom: wrapInMenuItemWithIcon(this.icon, dom),
            update,
        };
    }
}

function cmdItem(cmd, options) {
    const passedOptions = {
        label: options.title,
        run: cmd,
        render: options.iconShape
            ? renderClarityIcon({ shape: options.iconShape, size: IconSize.Large })
            : undefined,
    };
    // tslint:disable-next-line:forin
    for (const prop in options) {
        passedOptions[prop] = options[prop];
    }
    if ((!options.enable || options.enable === true) && !options.select) {
        passedOptions[options.enable ? 'enable' : 'select'] = state => cmd(state);
    }
    return new MenuItem(passedOptions);
}
function markItem(markType, options) {
    const passedOptions = {
        active(state) {
            return markActive(state, markType);
        },
        enable: true,
    };
    // tslint:disable-next-line:forin
    for (const prop in options) {
        passedOptions[prop] = options[prop];
    }
    return cmdItem(toggleMark(markType), passedOptions);
}
function wrapListItem(nodeType, options) {
    return cmdItem(wrapInList(nodeType, options.attrs), options);
}
// :: (Schema) → Object
// Given a schema, look for default mark and node types in it and
// return an object with relevant menu items relating to those marks:
//
// **`toggleStrong`**`: MenuItem`
//   : A menu item to toggle the [strong mark](#schema-basic.StrongMark).
//
// **`toggleEm`**`: MenuItem`
//   : A menu item to toggle the [emphasis mark](#schema-basic.EmMark).
//
// **`toggleCode`**`: MenuItem`
//   : A menu item to toggle the [code font mark](#schema-basic.CodeMark).
//
// **`toggleLink`**`: MenuItem`
//   : A menu item to toggle the [link mark](#schema-basic.LinkMark).
//
// **`insertImage`**`: MenuItem`
//   : A menu item to insert an [image](#schema-basic.Image).
//
// **`wrapBulletList`**`: MenuItem`
//   : A menu item to wrap the selection in a [bullet list](#schema-list.BulletList).
//
// **`wrapOrderedList`**`: MenuItem`
//   : A menu item to wrap the selection in an [ordered list](#schema-list.OrderedList).
//
// **`wrapBlockQuote`**`: MenuItem`
//   : A menu item to wrap the selection in a [block quote](#schema-basic.BlockQuote).
//
// **`makeParagraph`**`: MenuItem`
//   : A menu item to set the current textblock to be a normal
//     [paragraph](#schema-basic.Paragraph).
//
// **`makeCodeBlock`**`: MenuItem`
//   : A menu item to set the current textblock to be a
//     [code block](#schema-basic.CodeBlock).
//
// **`makeHead[N]`**`: MenuItem`
//   : Where _N_ is 1 to 6. Menu items to set the current textblock to
//     be a [heading](#schema-basic.Heading) of level _N_.
//
// **`insertHorizontalRule`**`: MenuItem`
//   : A menu item to insert a horizontal rule.
//
// The return value also contains some prefabricated menu elements and
// menus, that you can use instead of composing your own menu from
// scratch:
//
// **`insertMenu`**`: Dropdown`
//   : A dropdown containing the `insertImage` and
//     `insertHorizontalRule` items.
//
// **`typeMenu`**`: Dropdown`
//   : A dropdown containing the items for making the current
//     textblock a paragraph, code block, or heading.
//
// **`fullMenu`**`: [[MenuElement]]`
//   : An array of arrays of menu elements for use as the full menu
//     for, for example the [menu bar](https://github.com/prosemirror/prosemirror-menu#user-content-menubar).
function buildMenuItems(schema, modalService) {
    const r = {};
    let type;
    // tslint:disable:no-conditional-assignment
    if ((type = schema.marks.strong)) {
        r.toggleStrong = markItem(type, {
            title: 'Toggle strong style',
            iconShape: 'bold',
        });
    }
    if ((type = schema.marks.em)) {
        r.toggleEm = markItem(type, {
            title: 'Toggle emphasis',
            iconShape: 'italic',
        });
    }
    if ((type = schema.marks.code)) {
        r.toggleCode = markItem(type, { title: 'Toggle code font', icon: icons.code });
    }
    if ((type = schema.marks.link)) {
        r.toggleLink = linkItem(type, modalService);
    }
    if ((type = schema.nodes.image)) {
        r.insertImage = insertImageItem(type, modalService);
    }
    if ((type = schema.nodes.bullet_list)) {
        r.wrapBulletList = wrapListItem(type, {
            title: 'Wrap in bullet list',
            iconShape: 'bullet-list',
        });
    }
    if ((type = schema.nodes.ordered_list)) {
        r.wrapOrderedList = wrapListItem(type, {
            title: 'Wrap in ordered list',
            iconShape: 'number-list',
        });
    }
    if ((type = schema.nodes.blockquote)) {
        r.wrapBlockQuote = wrapItem(type, {
            title: 'Wrap in block quote',
            render: renderClarityIcon({ shape: 'block-quote', size: IconSize.Large }),
        });
    }
    if ((type = schema.nodes.paragraph)) {
        r.makeParagraph = blockTypeItem(type, {
            title: 'Change to paragraph',
            render: renderClarityIcon({ shape: 'text', label: 'Plain' }),
        });
    }
    if ((type = schema.nodes.code_block)) {
        r.makeCodeBlock = blockTypeItem(type, {
            title: 'Change to code block',
            render: renderClarityIcon({ shape: 'code', label: 'Code' }),
        });
    }
    if ((type = schema.nodes.heading)) {
        for (let i = 1; i <= 10; i++) {
            r['makeHead' + i] = blockTypeItem(type, {
                title: 'Change to heading ' + i,
                label: 'Level ' + i,
                attrs: { level: i },
            });
        }
    }
    if ((type = schema.nodes.horizontal_rule)) {
        const hr = type;
        r.insertHorizontalRule = new MenuItem({
            title: 'Insert horizontal rule',
            render: view => {
                const icon = document.createElement('div');
                icon.classList.add('custom-icon', 'hr-icon');
                const labelEl = document.createElement('span');
                labelEl.textContent = 'Horizontal rule';
                return wrapInMenuItemWithIcon(icon, labelEl);
            },
            enable(state) {
                return canInsert(state, hr);
            },
            run(state, dispatch) {
                dispatch(state.tr.replaceSelectionWith(hr.create()));
            },
        });
    }
    const cut = (arr) => arr.filter(x => x);
    r.insertMenu = new Dropdown(cut([
        r.insertImage,
        r.insertHorizontalRule,
        new MenuItem({
            run: (state, dispatch) => {
                addTable(state, dispatch, {
                    rowsCount: 2,
                    colsCount: 2,
                    withHeaderRow: true,
                    cellContent: '',
                });
            },
            render: renderClarityIcon({ shape: 'table', label: 'Table' }),
        }),
    ]), { label: 'Insert' });
    r.typeMenu = new Dropdown(cut([
        r.makeParagraph,
        r.makeCodeBlock,
        r.makeHead1 &&
            new SubMenuWithIcon(cut([r.makeHead1, r.makeHead2, r.makeHead3, r.makeHead4, r.makeHead5, r.makeHead6]), {
                label: 'Heading',
                icon: () => {
                    const icon = document.createElement('div');
                    icon.textContent = 'H';
                    icon.classList.add('custom-icon', 'h-icon');
                    return icon;
                },
            }),
    ]), { label: 'Type...' });
    const inlineMenu = cut([r.toggleStrong, r.toggleEm, r.toggleLink]);
    r.inlineMenu = [inlineMenu];
    r.blockMenu = [
        cut([
            r.wrapBulletList,
            r.wrapOrderedList,
            r.wrapBlockQuote,
            joinUpItem,
            liftItem,
            selectParentNodeItem,
        ]),
    ];
    const undoRedo = [
        new MenuItem({
            title: 'Undo last change',
            run: undo,
            enable(state) {
                return undo(state);
            },
            render: renderClarityIcon({ shape: 'undo', size: IconSize.Large }),
        }),
        new MenuItem({
            title: 'Redo last undone change',
            run: redo,
            enable(state) {
                return redo(state);
            },
            render: renderClarityIcon({ shape: 'redo', size: IconSize.Large }),
        }),
    ];
    r.fullMenu = [inlineMenu].concat([[r.insertMenu, r.typeMenu]], [undoRedo], r.blockMenu);
    return r;
}

function customMenuPlugin(options) {
    const modalService = options.injector.get(ModalService);
    const pmMenuBarPlugin = menuBar({
        floating: options.floatingMenu !== false,
        content: buildMenuItems(options.schema, modalService).fullMenu,
    });
    return pmMenuBarPlugin;
}

/**
 * Retrieve the start and end position of a mark
 * "Borrowed" from [tiptap](https://github.com/scrumpy/tiptap)
 */
const getMarkRange = (pmPosition = null, type = null) => {
    if (!pmPosition || !type) {
        return false;
    }
    const start = pmPosition.parent.childAfter(pmPosition.parentOffset);
    if (!start.node) {
        return false;
    }
    const mark = start.node.marks.find(({ type: markType }) => markType === type);
    if (!mark) {
        return false;
    }
    let startIndex = pmPosition.index();
    let startPos = pmPosition.start() + start.offset;
    while (startIndex > 0 && mark.isInSet(pmPosition.parent.child(startIndex - 1).marks)) {
        startIndex -= 1;
        startPos -= pmPosition.parent.child(startIndex).nodeSize;
    }
    const endPos = startPos + start.node.nodeSize;
    return { from: startPos, to: endPos };
};

/**
 * Causes the entire link to be selected when clicked.
 */
const linkSelectPlugin = new Plugin({
    props: {
        handleClick(view, pos) {
            const { doc, tr, schema } = view.state;
            const range = getMarkRange(doc.resolve(pos), schema.marks.link);
            if (!range) {
                return false;
            }
            const $start = doc.resolve(range.from);
            const $end = doc.resolve(range.to);
            const transaction = tr.setSelection(new TextSelection($start, $end));
            view.dispatch(transaction);
            return true;
        },
    },
});

/**
 * Implements editing of raw HTML for the selected node in the editor.
 */
const rawEditorPlugin = (contextMenuService, modalService) => new Plugin({
    view: _view => {
        const domParser = DOMParser.fromSchema(_view.state.schema);
        const domSerializer = DOMSerializer.fromSchema(_view.state.schema);
        return {
            update: view => {
                if (!view.hasFocus()) {
                    return;
                }
                let topLevelNode;
                const { doc, selection } = view.state;
                let topLevelNodePos = 0;
                doc.nodesBetween(selection.from, selection.to, (n, pos, parent) => {
                    if (parent === doc) {
                        topLevelNode = n;
                        topLevelNodePos = pos;
                        return false;
                    }
                });
                if (topLevelNode) {
                    const node = view.nodeDOM(topLevelNodePos);
                    if (node instanceof HTMLElement) {
                        contextMenuService.setContextMenu({
                            ref: selection,
                            title: '',
                            // iconShape: 'ellipsis-vertical',
                            element: node,
                            coords: view.coordsAtPos(topLevelNodePos),
                            items: [
                                {
                                    enabled: true,
                                    iconShape: 'code',
                                    label: 'Edit HTML',
                                    onClick: () => {
                                        contextMenuService.clearContextMenu();
                                        const element = domSerializer.serializeNode(
                                        // tslint:disable-next-line:no-non-null-assertion
                                        topLevelNode);
                                        modalService
                                            .fromComponent(RawHtmlDialogComponent, {
                                            size: 'xl',
                                            locals: {
                                                html: element.outerHTML,
                                            },
                                        })
                                            .subscribe(result => {
                                            var _a;
                                            if (result) {
                                                const domNode = htmlToDomNode(result, (topLevelNode === null || topLevelNode === void 0 ? void 0 : topLevelNode.isLeaf) ? undefined : node);
                                                if (domNode) {
                                                    let tr = view.state.tr;
                                                    const parsedNodeSlice = domParser.parse(domNode);
                                                    try {
                                                        tr = tr.replaceRangeWith(topLevelNodePos, topLevelNodePos +
                                                            ((_a = topLevelNode === null || topLevelNode === void 0 ? void 0 : topLevelNode.nodeSize) !== null && _a !== void 0 ? _a : 0), parsedNodeSlice);
                                                    }
                                                    catch (err) {
                                                        // tslint:disable-next-line:no-console
                                                        console.error(err);
                                                    }
                                                    view.dispatch(tr);
                                                    view.focus();
                                                }
                                            }
                                        });
                                    },
                                },
                            ],
                        });
                    }
                }
            },
        };
    },
});
function htmlToDomNode(html, wrapInParent) {
    html = `${html.trim()}`;
    const template = document.createElement('template');
    if (wrapInParent) {
        const parentClone = wrapInParent.cloneNode(false);
        parentClone.innerHTML = html;
        template.content.appendChild(parentClone);
    }
    else {
        const parent = document.createElement('p');
        parent.innerHTML = html;
        template.content.appendChild(parent);
    }
    return template.content.firstChild;
}

class ProsemirrorService {
    constructor(injector, contextMenuService) {
        this.injector = injector;
        this.contextMenuService = contextMenuService;
        // Mix the nodes from prosemirror-schema-list into the basic schema to
        // create a schema with list support.
        this.mySchema = new Schema({
            nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block')
                .append(getTableNodes())
                .addToEnd('iframe', iframeNode),
            marks: schema.spec.marks,
        });
        this.enabled = true;
    }
    createEditorView(options) {
        this.editorView = new EditorView(options.element, {
            state: this.getStateFromText(''),
            dispatchTransaction: tr => {
                if (!this.enabled) {
                    return;
                }
                this.editorView.updateState(this.editorView.state.apply(tr));
                if (tr.docChanged) {
                    const content = this.getTextFromState(this.editorView.state);
                    options.onTextInput(content);
                }
            },
            editable: () => options.isReadOnly(),
            handleDOMEvents: {
                focus: view => {
                    this.contextMenuService.setVisibility(true);
                },
                blur: view => {
                    this.contextMenuService.setVisibility(false);
                },
            },
            nodeViews: {
                iframe: iframeNodeView,
            },
        });
    }
    update(text) {
        if (this.editorView) {
            const currentText = this.getTextFromState(this.editorView.state);
            if (text !== currentText) {
                let state = this.getStateFromText(text);
                if (document.body.contains(this.editorView.dom)) {
                    const fix = fixTables(state);
                    if (fix)
                        state = state.apply(fix.setMeta('addToHistory', false));
                    this.editorView.updateState(state);
                }
            }
        }
    }
    destroy() {
        if (this.editorView) {
            this.editorView.destroy();
        }
    }
    setEnabled(enabled) {
        if (this.editorView) {
            this.enabled = enabled;
            // Updating the state causes ProseMirror to check the
            // `editable()` function from the contructor config object
            // newly.
            this.editorView.updateState(this.editorView.state);
        }
    }
    getStateFromText(text) {
        const div = document.createElement('div');
        div.innerHTML = text !== null && text !== void 0 ? text : '';
        return EditorState.create({
            doc: DOMParser.fromSchema(this.mySchema).parse(div),
            plugins: this.configurePlugins({ schema: this.mySchema, floatingMenu: false }),
        });
    }
    getTextFromState(state) {
        const div = document.createElement('div');
        const fragment = DOMSerializer.fromSchema(this.mySchema).serializeFragment(state.doc.content);
        div.appendChild(fragment);
        return div.innerHTML;
    }
    configurePlugins(options) {
        const plugins = [
            buildInputRules(options.schema),
            keymap(buildKeymap(options.schema, options.mapKeys)),
            keymap(baseKeymap),
            dropCursor(),
            gapCursor(),
            linkSelectPlugin,
            columnResizing({}),
            tableEditing({ allowTableNodeSelection: true }),
            tableContextMenuPlugin(this.contextMenuService),
            imageContextMenuPlugin(this.contextMenuService, this.injector.get(ModalService)),
            rawEditorPlugin(this.contextMenuService, this.injector.get(ModalService)),
            customMenuPlugin({
                floatingMenu: options.floatingMenu,
                injector: this.injector,
                schema: options.schema,
            }),
        ];
        if (options.history !== false) {
            plugins.push(history());
        }
        return plugins.concat(new Plugin({
            props: {
                attributes: { class: 'vdr-prosemirror' },
            },
        }));
    }
}
ProsemirrorService.decorators = [
    { type: Injectable }
];
ProsemirrorService.ctorParameters = () => [
    { type: Injector },
    { type: ContextMenuService }
];

/**
 * @description
 * A rich text (HTML) editor based on Prosemirror (https://prosemirror.net/)
 *
 * @example
 * ```HTML
 * <vdr-rich-text-editor
 *     [(ngModel)]="description"
 *     label="Description"
 * ></vdr-rich-text-editor>
 * ```
 *
 * @docsCategory components
 */
class RichTextEditorComponent {
    constructor(changeDetector, prosemirrorService, viewContainerRef, contextMenuService) {
        this.changeDetector = changeDetector;
        this.prosemirrorService = prosemirrorService;
        this.viewContainerRef = viewContainerRef;
        this.contextMenuService = contextMenuService;
        this._readonly = false;
    }
    set readonly(value) {
        this._readonly = !!value;
        this.prosemirrorService.setEnabled(!this._readonly);
    }
    get menuElement() {
        return this.viewContainerRef.element.nativeElement.querySelector('.ProseMirror-menubar');
    }
    ngAfterViewInit() {
        this.prosemirrorService.createEditorView({
            element: this.editorEl.nativeElement,
            onTextInput: content => {
                this.onChange(content);
                this.changeDetector.markForCheck();
            },
            isReadOnly: () => !this._readonly,
        });
        if (this.value) {
            this.prosemirrorService.update(this.value);
        }
    }
    ngOnDestroy() {
        this.prosemirrorService.destroy();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.prosemirrorService.setEnabled(!isDisabled);
    }
    writeValue(value) {
        if (value !== this.value) {
            this.value = value;
            if (this.prosemirrorService) {
                this.prosemirrorService.update(value);
            }
        }
    }
}
RichTextEditorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-rich-text-editor',
                template: "<label class=\"clr-control-label\">{{ label }}</label>\n<div #editor></div>\n<vdr-context-menu [editorMenuElement]=\"menuElement\"></vdr-context-menu>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: RichTextEditorComponent,
                        multi: true,
                    },
                    ProsemirrorService,
                    ContextMenuService,
                ],
                styles: ["@charset \"UTF-8\";::ng-deep .ProseMirror{position:relative}::ng-deep .ProseMirror{word-wrap:break-word;white-space:pre-wrap;-webkit-font-variant-ligatures:none;font-feature-settings:none;font-variant-ligatures:none}::ng-deep .ProseMirror pre{white-space:pre-wrap}::ng-deep .ProseMirror li{position:relative}::ng-deep .ProseMirror-hideselection *::selection{background:transparent}::ng-deep .ProseMirror-hideselection *::-moz-selection{background:transparent}::ng-deep .ProseMirror-hideselection{caret-color:transparent}::ng-deep .ProseMirror-selectednode{outline:2px solid var(--color-primary-500)}::ng-deep li.ProseMirror-selectednode{outline:none}::ng-deep li.ProseMirror-selectednode:after{content:\"\";position:absolute;left:-32px;right:-2px;top:-2px;bottom:-2px;border:2px solid var(--color-primary-500);pointer-events:none}::ng-deep .ProseMirror-textblock-dropdown{min-width:3em}::ng-deep .ProseMirror-menu{margin:0 -4px;line-height:1}::ng-deep .ProseMirror-tooltip .ProseMirror-menu{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;white-space:pre}::ng-deep .ProseMirror-menuitem{margin-right:3px;display:inline-block}::ng-deep .ProseMirror-menuseparator{border-right:1px solid var(--color-component-border-200);margin:0 12px 0 8px;height:18px}::ng-deep .ProseMirror-menu-dropdown,::ng-deep .ProseMirror-menu-dropdown-menu{font-size:90%;white-space:nowrap;border-radius:var(--border-radius-input)}::ng-deep .ProseMirror-menu-dropdown{vertical-align:1px;cursor:pointer;position:relative;padding-right:15px}::ng-deep .ProseMirror-menu-dropdown-wrap{padding:1px 3px 1px 6px;display:inline-block;position:relative}::ng-deep .ProseMirror-menu-dropdown:after{content:\"\";border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid currentColor;opacity:.6;position:absolute;right:4px;top:calc(50% - 2px)}::ng-deep .ProseMirror-menu-dropdown-menu,::ng-deep .ProseMirror-menu-submenu{position:absolute;background:var(--color-component-bg-100);border:1px solid var(--color-component-border-200);padding:2px}::ng-deep .ProseMirror-menu-dropdown-menu{z-index:15;min-width:6em;color:var(--color-text-200)}::ng-deep .ProseMirror-menu-dropdown-item{cursor:pointer;padding:2px 8px 2px 4px}::ng-deep .ProseMirror-menu-dropdown-item:hover{background:var(--color-component-bg-200)}::ng-deep .ProseMirror-menu-submenu-wrap{position:relative;margin-right:4px}::ng-deep .ProseMirror-menu-submenu-label:after{content:\"\";border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:4px solid currentColor;opacity:.6;position:absolute;right:-8px;top:calc(50% - 4px)}::ng-deep .ProseMirror-menu-submenu{display:none;min-width:4em;left:100%;top:-3px}::ng-deep .ProseMirror-menu-active{background:var(--color-component-bg-100);border-radius:4px}::ng-deep .ProseMirror-menu-disabled{opacity:.3}::ng-deep .ProseMirror-menu-submenu-wrap:hover .ProseMirror-menu-submenu,::ng-deep .ProseMirror-menu-submenu-wrap-active .ProseMirror-menu-submenu{display:block}::ng-deep .ProseMirror-menubar{border-top-left-radius:inherit;border-top-right-radius:inherit;position:relative;min-height:1em;color:var(--color-grey-600);padding:1px 6px;top:0;left:0;right:0;background:var(--color-component-bg-100);z-index:10;box-sizing:border-box;overflow:visible;align-items:center}::ng-deep .ProseMirror-icon{display:inline-block;line-height:.8;vertical-align:-2px;padding:2px 8px;cursor:pointer}::ng-deep .ProseMirror-menu-disabled.ProseMirror-icon{cursor:default}::ng-deep .ProseMirror-icon svg{fill:currentColor;height:1em}::ng-deep .ProseMirror-icon span{vertical-align:text-top}::ng-deep .ProseMirror-gapcursor{display:none;pointer-events:none;position:absolute}::ng-deep .ProseMirror-gapcursor:after{content:\"\";display:block;position:absolute;top:-2px;width:20px;border-top:1px solid black;animation:ProseMirror-cursor-blink 1.1s steps(2,start) infinite}@keyframes ProseMirror-cursor-blink{to{visibility:hidden}}::ng-deep .ProseMirror-focused .ProseMirror-gapcursor{display:block}::ng-deep .ProseMirror ul,::ng-deep .ProseMirror ol{padding-left:30px;list-style-position:initial}::ng-deep .ProseMirror blockquote{padding-left:1em;border-left:3px solid var(--color-grey-100);margin-left:0;margin-right:0}::ng-deep .ProseMirror-prompt{background:white;padding:5px 10px 5px 15px;border:1px solid silver;position:fixed;border-radius:3px;z-index:11;box-shadow:-.5px 2px 5px #0003}::ng-deep .ProseMirror-prompt h5{margin:0;font-weight:normal;font-size:100%;color:var(--color-grey-500)}::ng-deep .ProseMirror-prompt input[type=text],::ng-deep .ProseMirror-prompt textarea{background:var(--color-component-bg-100);border:none;outline:none}::ng-deep .ProseMirror-prompt input[type=text]{padding:0 4px}::ng-deep .ProseMirror-prompt-close{position:absolute;left:2px;top:1px;color:var(--color-grey-400);border:none;background:transparent;padding:0}::ng-deep .ProseMirror-prompt-close:after{content:\"\\e2\\153\\2022\";font-size:12px}::ng-deep .ProseMirror-invalid{background:var(--color-warning-200);border:1px solid var(--color-warning-300);border-radius:4px;padding:5px 10px;position:absolute;min-width:10em}::ng-deep .ProseMirror-prompt-buttons{margin-top:5px;display:none}::ng-deep #editor,::ng-deep .editor{background:var(--color-form-input-bg);color:#000;background-clip:padding-box;border-radius:4px;border:2px solid rgba(0,0,0,.2);padding:5px 0;margin-bottom:23px}::ng-deep .ProseMirror p:first-child,::ng-deep .ProseMirror h1:first-child,::ng-deep .ProseMirror h2:first-child,::ng-deep .ProseMirror h3:first-child,::ng-deep .ProseMirror h4:first-child,::ng-deep .ProseMirror h5:first-child,::ng-deep .ProseMirror h6:first-child{margin-top:10px}::ng-deep .ProseMirror{padding:4px 8px 4px 14px;line-height:1.2;outline:none}::ng-deep .ProseMirror p{margin-bottom:.5rem;color:var(--color-grey-800)!important}::ng-deep .ProseMirror .tableWrapper td,::ng-deep .ProseMirror .tableWrapper th{border:1px solid var(--color-grey-300);padding:3px 6px}::ng-deep .ProseMirror .tableWrapper td p,::ng-deep .ProseMirror .tableWrapper th p{margin-top:0}::ng-deep .ProseMirror .tableWrapper th,::ng-deep .ProseMirror .tableWrapper th p{font-weight:bold}::ng-deep .ProseMirror table{border-collapse:collapse;table-layout:fixed;width:100%;overflow:hidden}::ng-deep .ProseMirror td,::ng-deep .ProseMirror th{vertical-align:top;box-sizing:border-box;position:relative}::ng-deep .ProseMirror .column-resize-handle{position:absolute;right:-2px;top:0;bottom:0;width:4px;z-index:20;background-color:#adf;pointer-events:none}::ng-deep .ProseMirror.resize-cursor{cursor:ew-resize;cursor:col-resize}::ng-deep .ProseMirror .selectedCell:after{z-index:2;position:absolute;content:\"\";left:0;right:0;top:0;bottom:0;background:#afdaf355;pointer-events:none}::ng-deep .menu-separator{border-bottom:1px solid var(--color-grey-400);height:0;margin:6px 0;pointer-events:none}::ng-deep .menu-item-with-icon{display:flex;align-items:center}::ng-deep .menu-item-with-icon clr-icon,::ng-deep .menu-item-with-icon .custom-icon{margin-right:4px;color:var(--color-text-200)}::ng-deep .menu-item-with-icon .hr-icon{width:13px;height:8px;border-bottom:2px solid var(--color-text-100);margin:-8px 5px 0 2px}::ng-deep .menu-item-with-icon .h-icon{width:16px;text-align:center;font-weight:bold;font-size:12px}.context-menu{position:fixed}:host{display:block;max-width:710px;margin-bottom:.5rem}:host.readonly ::ng-deep .ProseMirror-menubar{display:none}::ng-deep .ProseMirror-menubar{position:sticky;top:24px;margin-top:6px;border:1px solid var(--color-component-border-200);border-bottom:none;background-color:var(--color-component-bg-200);color:var(--color-icon-button);border-radius:var(--border-radius-input) var(--border-radius-input) 0 0;padding:6px 12px;display:flex;flex-wrap:wrap}::ng-deep .vdr-prosemirror{background:var(--color-form-input-bg);min-height:128px;min-width:200px;border:1px solid var(--color-component-border-200);border-radius:0 0 var(--border-radius-input) var(--border-radius-input);transition:border-color .2s;overflow:auto;text-align:initial}::ng-deep .vdr-prosemirror:focus{border-color:var(--color-primary-500)!important;box-shadow:0 0 1px 1px var(--color-primary-100)}::ng-deep .vdr-prosemirror hr{padding:2px 10px;border:none;margin:1em 0}::ng-deep .vdr-prosemirror hr:after{content:\"\";display:block;height:1px;background-color:silver;line-height:2px}::ng-deep .vdr-prosemirror img{cursor:default;max-width:100%}::ng-deep .vdr-prosemirror .iframe-wrapper{width:100%;text-align:center;padding:6px;transition:background-color .3s}::ng-deep .vdr-prosemirror .iframe-wrapper:hover{background-color:var(--color-primary-100)}\n"]
            },] }
];
RichTextEditorComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ProsemirrorService },
    { type: ViewContainerRef },
    { type: ContextMenuService }
];
RichTextEditorComponent.propDecorators = {
    label: [{ type: Input }],
    readonly: [{ type: Input }],
    _readonly: [{ type: HostBinding, args: ['class.readonly',] }],
    editorEl: [{ type: ViewChild, args: ['editor', { static: true },] }]
};

/**
 * A simple, stateless toggle button for indicating selection.
 */
class SelectToggleComponent {
    constructor() {
        this.size = 'large';
        this.selected = false;
        this.hiddenWhenOff = false;
        this.disabled = false;
        this.selectedChange = new EventEmitter();
    }
}
SelectToggleComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-select-toggle',
                template: "<div\n    class=\"toggle\"\n    [class.hide-when-off]=\"hiddenWhenOff\"\n    [class.disabled]=\"disabled\"\n    [class.small]=\"size === 'small'\"\n    [attr.tabindex]=\"disabled ? null : 0\"\n    [class.selected]=\"selected\"\n    (keydown.enter)=\"selectedChange.emit(!selected)\"\n    (keydown.space)=\"$event.preventDefault(); selectedChange.emit(!selected)\"\n    (click)=\"selectedChange.emit(!selected)\"\n>\n    <clr-icon shape=\"check-circle\" [attr.size]=\"size === 'small' ? 24 : 32\"></clr-icon>\n</div>\n<div class=\"toggle-label\" [class.disabled]=\"disabled\" *ngIf=\"label\" (click)=\"selectedChange.emit(!selected)\">\n    {{ label }}\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:flex;align-items:center;justify-content:center}.toggle{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;cursor:pointer;color:var(--color-grey-300);background-color:var(--color-component-bg-100);border-radius:50%;top:-12px;left:-12px;transition:opacity .2s,color .2s}.toggle.hide-when-off{opacity:0}.toggle.small{width:24px;height:24px}.toggle:not(.disabled):hover{color:var(--color-success-400);opacity:.9}.toggle.selected{opacity:1;color:var(--color-success-500)}.toggle.selected:not(.disabled):hover{color:var(--color-success-400);opacity:.9}.toggle:focus{outline:none;box-shadow:0 0 2px 2px var(--color-primary-500)}.toggle.disabled{cursor:default}.toggle-label{flex:1;margin-left:6px;text-align:left;font-size:12px}.toggle-label:not(.disabled){cursor:pointer}\n"]
            },] }
];
SelectToggleComponent.propDecorators = {
    size: [{ type: Input }],
    selected: [{ type: Input }],
    hiddenWhenOff: [{ type: Input }],
    disabled: [{ type: Input }],
    label: [{ type: Input }],
    selectedChange: [{ type: Output }]
};

class StatusBadgeComponent {
    constructor() {
        this.type = 'info';
    }
}
StatusBadgeComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-status-badge',
                template: "<div class=\"status-badge\" [class]=\"type\"></div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;position:absolute}.status-badge{width:10px;height:10px;border-radius:50%;border:1px solid var(--color-component-border-100)}.status-badge.info{background-color:var(--color-primary-600)}.status-badge.success{background-color:var(--color-success-500)}.status-badge.warning{background-color:var(--color-warning-500)}.status-badge.error{background-color:var(--color-error-400)}\n"]
            },] }
];
StatusBadgeComponent.propDecorators = {
    type: [{ type: Input }]
};

class TabbedCustomFieldsComponent {
    constructor() {
        this.readonly = false;
        this.compact = false;
        this.showLabel = true;
        this.defaultTabName = '__default_tab__';
    }
    ngOnInit() {
        this.tabbedCustomFields = this.groupByTabs(this.customFields);
    }
    customFieldIsSet(name) {
        var _a;
        return !!((_a = this.customFieldsFormGroup) === null || _a === void 0 ? void 0 : _a.get(name));
    }
    groupByTabs(customFieldConfigs) {
        var _a, _b, _c;
        const tabMap = new Map();
        for (const field of customFieldConfigs) {
            const tabName = (_b = (_a = field.ui) === null || _a === void 0 ? void 0 : _a.tab) !== null && _b !== void 0 ? _b : this.defaultTabName;
            if (tabMap.has(tabName)) {
                (_c = tabMap.get(tabName)) === null || _c === void 0 ? void 0 : _c.push(field);
            }
            else {
                tabMap.set(tabName, [field]);
            }
        }
        return Array.from(tabMap.entries())
            .sort((a, b) => (a[0] === this.defaultTabName ? -1 : 1))
            .map(([tabName, customFields]) => ({ tabName, customFields }));
    }
}
TabbedCustomFieldsComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tabbed-custom-fields',
                template: "<ng-container *ngIf=\"1 < tabbedCustomFields.length; else singleGroup\">\n    <clr-tabs>\n        <clr-tab *ngFor=\"let group of tabbedCustomFields\">\n            <button clrTabLink>\n                {{\n                group.tabName === defaultTabName\n                    ? ('common.general' | translate)\n                    : (group.tabName | translate)\n                }}\n            </button>\n            <clr-tab-content *clrIfActive>\n                <div class=\"mt4\">\n                    <ng-container *ngFor=\"let customField of group.customFields\">\n                        <vdr-custom-field-control\n                            *ngIf=\"customFieldIsSet(customField.name)\"\n                            [entityName]=\"entityName\"\n                            [customFieldsFormGroup]=\"customFieldsFormGroup\"\n                            [customField]=\"customField\"\n                            [readonly]=\"readonly\"\n                            [compact]=\"compact\"\n                            [showLabel]=\"showLabel\"\n                        ></vdr-custom-field-control>\n                    </ng-container>\n                </div>\n            </clr-tab-content>\n        </clr-tab>\n    </clr-tabs>\n</ng-container>\n<ng-template #singleGroup>\n    <ng-container *ngFor=\"let customField of tabbedCustomFields[0]?.customFields\">\n        <vdr-custom-field-control\n            *ngIf=\"customFieldIsSet(customField.name)\"\n            [entityName]=\"entityName\"\n            [customFieldsFormGroup]=\"customFieldsFormGroup\"\n            [customField]=\"customField\"\n            [readonly]=\"readonly\"\n            [compact]=\"compact\"\n            [showLabel]=\"showLabel\"\n        ></vdr-custom-field-control>\n    </ng-container>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
TabbedCustomFieldsComponent.propDecorators = {
    entityName: [{ type: Input }],
    customFields: [{ type: Input }],
    customFieldsFormGroup: [{ type: Input }],
    readonly: [{ type: Input }],
    compact: [{ type: Input }],
    showLabel: [{ type: Input }]
};

/**
 * A button link to be used as actions in rows of a table.
 */
class TableRowActionComponent {
    constructor() {
        this.large = false;
        this.disabled = false;
    }
}
TableRowActionComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-table-row-action',
                template: "<ng-container *ngIf=\"!disabled; else disabledLink\">\n    <a class=\"btn btn-sm\" [routerLink]=\"linkTo\" [ngClass]=\"{ 'big-btn': large }\">\n        <clr-icon [attr.shape]=\"iconShape\"></clr-icon>\n        {{ label }}\n    </a>\n</ng-container>\n<ng-template #disabledLink>\n    <button class=\"btn btn-sm\" disabled>\n        <clr-icon [attr.shape]=\"iconShape\"></clr-icon>\n        {{ label }}\n    </button>\n</ng-template>\n",
                styles: ["a.btn{margin:0}.big-btn{font-size:16px;padding:.5rem 1rem;height:100%}\n"]
            },] }
];
TableRowActionComponent.propDecorators = {
    large: [{ type: Input }],
    linkTo: [{ type: Input }],
    label: [{ type: Input }],
    iconShape: [{ type: Input }],
    disabled: [{ type: Input }]
};

class TagSelectorComponent {
    constructor(dataService) {
        this.dataService = dataService;
    }
    ngOnInit() {
        this.allTags$ = this.dataService.product
            .getTagList()
            .mapStream(data => data.tags.items.map(i => i.value));
    }
    addTagFn(val) {
        return val;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(obj) {
        if (Array.isArray(obj)) {
            this._value = obj;
        }
    }
    valueChanged(event) {
        this.onChange(event);
    }
}
TagSelectorComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-tag-selector',
                template: "<ng-select\n    [addTag]=\"addTagFn\"\n    [multiple]=\"true\"\n    [ngModel]=\"_value\"\n    [clearable]=\"true\"\n    [searchable]=\"true\"\n    [disabled]=\"disabled\"\n    [placeholder]=\"placeholder\"\n    (change)=\"valueChanged($event)\"\n>\n    <ng-template ng-label-tmp let-tag=\"item\" let-clear=\"clear\">\n        <vdr-chip [colorFrom]=\"tag\" icon=\"close\" (iconClick)=\"clear(tag)\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ tag }}</vdr-chip>\n    </ng-template>\n    <ng-option *ngFor=\"let tag of allTags$ | async\" [value]=\"tag\">\n        <vdr-chip [colorFrom]=\"tag\"><clr-icon shape=\"tag\" class=\"mr2\"></clr-icon> {{ tag }}</vdr-chip>\n    </ng-option>\n</ng-select>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: TagSelectorComponent,
                        multi: true,
                    },
                ],
                styles: [":host{display:block;margin-top:12px;position:relative}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-value{background:none;margin:0}:host ::ng-deep .ng-dropdown-panel-items div.ng-option:last-child{display:none}:host ::ng-deep .ng-dropdown-panel .ng-dropdown-header{border:none;padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container{padding:0}:host ::ng-deep .ng-select.ng-select-multiple .ng-select-container .ng-value-container .ng-placeholder{padding-left:8px}\n"]
            },] }
];
TagSelectorComponent.ctorParameters = () => [
    { type: DataService }
];
TagSelectorComponent.propDecorators = {
    placeholder: [{ type: Input }]
};

class TimelineEntryComponent {
    constructor() {
        this.collapsed = false;
        this.expandClick = new EventEmitter();
    }
    get timelineTitle() {
        return this.collapsed ? marker('common.expand-entries') : marker('common.collapse-entries');
    }
    getIconShape() {
        if (this.iconShape) {
            return typeof this.iconShape === 'string' ? this.iconShape : this.iconShape[0];
        }
    }
    getIconClass() {
        if (this.iconShape) {
            return typeof this.iconShape === 'string' ? '' : this.iconShape[1];
        }
    }
}
TimelineEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-timeline-entry',
                template: "<div\n    [ngClass]=\"displayType\"\n    [class.has-custom-icon]=\"!!iconShape\"\n    class=\"entry\"\n    [class.last]=\"isLast === true\"\n    [class.collapsed]=\"collapsed\"\n>\n    <div class=\"timeline\" (click)=\"expandClick.emit()\" [title]=\"timelineTitle | translate\">\n        <div class=\"custom-icon\">\n            <clr-icon\n                *ngIf=\"iconShape && !collapsed\"\n                [attr.shape]=\"getIconShape()\"\n                [ngClass]=\"getIconClass()\"\n                size=\"24\"\n            ></clr-icon>\n        </div>\n    </div>\n    <div class=\"entry-body\">\n        <div class=\"detail\">\n            <div class=\"time\">\n                {{ createdAt | localeDate: 'short' }}\n            </div>\n            <div class=\"name\">\n                {{ name }}\n            </div>\n        </div>\n        <div [class.featured-entry]=\"featured\">\n            <ng-content></ng-content>\n        </div>\n    </div>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block}:host:first-of-type .timeline:before{border-left-color:var(--color-timeline-thread)}:host:first-of-type .entry-body{max-height:initial}.entry{display:flex}.timeline{border-left:2px solid var(--color-timeline-thread);padding-bottom:8px;position:relative}.timeline:before{content:\"\";position:absolute;width:2px;height:32px;left:-2px;border-left:2px solid var(--color-timeline-thread)}.timeline:after{content:\"\";display:block;border-radius:50%;width:8px;height:8px;background-color:var(--color-component-bg-200);border:1px solid var(--color-component-border-300);position:absolute;left:-5px;top:32px;transition:top .2s;cursor:pointer}.timeline .custom-icon{position:absolute;width:32px;height:32px;left:-17px;top:32px;align-items:center;justify-content:center;border-radius:50%;color:var(--color-primary-600);background-color:var(--color-component-bg-100);border:1px solid var(--color-component-border-200);display:none}.entry.has-custom-icon .timeline:after{display:none}.entry.has-custom-icon .custom-icon{display:flex}.entry.last .timeline{border-left-color:transparent}.entry-body{flex:1;padding-top:24px;padding-left:12px;line-height:16px;margin-left:12px;color:var(--color-text-200);overflow:visible;max-height:100px;transition:max-height .2s,padding-top .2s,opacity .2s .2s}.featured-entry ::ng-deep .title{color:var(--color-text-100);font-size:16px;line-height:26px}.featured-entry ::ng-deep .note-text{color:var(--color-text-100);white-space:pre-wrap}.detail{display:flex;color:var(--color-text-300);font-size:12px}.detail .name{margin-left:12px}.muted .timeline,.muted .timeline .custom-icon{color:var(--color-text-300)}.success .timeline,.success .timeline .custom-icon{color:var(--color-success-400)}.success .timeline:after{background-color:var(--color-success-200);border:1px solid var(--color-success-400)}.error .timeline,.error .timeline .custom-icon{color:var(--color-error-400)}.error .timeline:after{background-color:var(--color-error-200);border:1px solid var(--color-error-400)}.warning .timeline,.warning .timeline .custom-icon{color:var(--color-warning-400)}.warning .timeline:after{background-color:var(--color-warning-200);border:1px solid var(--color-warning-400)}.collapsed .entry-body{max-height:0;overflow:hidden;opacity:0;padding-top:0}.collapsed .timeline{border-left-color:transparent}.collapsed .timeline:after{top:0}\n"]
            },] }
];
TimelineEntryComponent.propDecorators = {
    displayType: [{ type: Input }],
    createdAt: [{ type: Input }],
    name: [{ type: Input }],
    featured: [{ type: Input }],
    iconShape: [{ type: Input }],
    isLast: [{ type: Input }],
    collapsed: [{ type: HostBinding, args: ['class.collapsed',] }, { type: Input }],
    expandClick: [{ type: Output }]
};

class TitleInputComponent {
    constructor() {
        this.readonly = false;
    }
}
TitleInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-title-input',
                template: "<ng-content></ng-content>\n<div class=\"edit-icon\" *ngIf=\"!readonly\">\n    <clr-icon shape=\"edit\"></clr-icon>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;position:relative}:host ::ng-deep input{font-size:18px;color:var(--clr-p1-color);max-width:100%}:host ::ng-deep input:not(:focus){border-color:transparent!important;background-color:var(--color-component-bg-100)!important}:host ::ng-deep input:focus{background-color:var(--clr-global-app-background)}:host ::ng-deep .clr-control-container{max-width:100%}:host ::ng-deep .clr-input-wrapper{max-width:100%!important}:host .edit-icon{position:absolute;right:8px;top:6px;color:var(--color-grey-400);opacity:0;transition:opacity .2s}:host:hover ::ng-deep input:not(:focus){background-color:var(--color-component-bg-200)!important}:host:hover .edit-icon{opacity:1}:host.readonly .edit-icon{display:none}:host.readonly:hover ::ng-deep input:not(:focus){background-color:var(--color-grey-200)!important}\n"]
            },] }
];
TitleInputComponent.propDecorators = {
    readonly: [{ type: HostBinding, args: ['class.readonly',] }, { type: Input }]
};

class UiExtensionPointComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.isDevMode = isDevMode();
    }
    ngOnInit() {
        this.display$ = this.dataService.client
            .uiState()
            .mapStream(({ uiState }) => uiState.displayUiExtensionPoints);
    }
}
UiExtensionPointComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-ui-extension-point',
                template: "<div [class.highlight]=\"isDevMode && (display$ | async)\" class=\"wrapper\">\n    <vdr-dropdown *ngIf=\"isDevMode && (display$ | async)\">\n        <button class=\"btn btn-icon btn-link extension-point-info-trigger\"\n                [style.top.px]=\"topPx ?? 0\"\n                [style.left.px]=\"leftPx ?? 0\"\n                vdrDropdownTrigger>\n            <clr-icon shape=\"plugin\" class=\"\" size=\"16\"></clr-icon>\n        </button>\n        <vdr-dropdown-menu>\n            <div class=\"extension-info\">\n                <pre *ngIf=\"api === 'actionBar'\">\naddActionBarItem({{ '{' }}\n  id: 'my-button',\n  label: 'My Action',\n  locationId: '{{ locationId }}',\n{{ '}' }})</pre>\n                <pre *ngIf=\"api === 'navMenu'\">\naddNavMenuItem({{ '{' }}\n  id: 'my-menu-item',\n  label: 'My Menu Item',\n  routerLink: ['/extensions/my-plugin'],\n  {{ '}' }},\n  '{{ locationId }}'\n)</pre>\n                <pre *ngIf=\"api === 'detailComponent'\">\nregisterCustomDetailComponent({{ '{' }}\n  locationId: '{{ locationId }}',\n  component: MyCustomComponent,\n{{ '}' }})</pre>\n            </div>\n        </vdr-dropdown-menu>\n    </vdr-dropdown>\n    <ng-content></ng-content>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{position:relative;display:inline-block}.wrapper{display:inline-block;height:100%}.extension-point-info-trigger{position:absolute;margin:0;padding:0;z-index:100}.extension-point-info-trigger clr-icon{color:var(--color-success-500)}.extension-info{padding:12px}pre{padding:6px;font-family:\"Source Code Pro\",\"Lucida Console\",Monaco,monospace;background-color:var(--color-grey-200)}\n"]
            },] }
];
UiExtensionPointComponent.ctorParameters = () => [
    { type: DataService }
];
UiExtensionPointComponent.propDecorators = {
    locationId: [{ type: Input }],
    topPx: [{ type: Input }],
    leftPx: [{ type: Input }],
    api: [{ type: Input }]
};

/**
 * Allows declarative binding to the "disabled" property of a reactive form
 * control.
 */
class DisabledDirective {
    constructor(formControlName, formControl) {
        this.formControlName = formControlName;
        this.formControl = formControl;
    }
    set disabled(val) {
        var _a, _b, _c;
        const formControl = (_b = (_a = this.formControlName) === null || _a === void 0 ? void 0 : _a.control) !== null && _b !== void 0 ? _b : (_c = this.formControl) === null || _c === void 0 ? void 0 : _c.form;
        if (!formControl) {
            return;
        }
        if (!!val === false) {
            formControl.enable({ emitEvent: false });
        }
        else {
            formControl.disable({ emitEvent: false });
        }
    }
}
DisabledDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrDisabled]',
            },] }
];
DisabledDirective.ctorParameters = () => [
    { type: FormControlName, decorators: [{ type: Optional }] },
    { type: FormControlDirective, decorators: [{ type: Optional }] }
];
DisabledDirective.propDecorators = {
    disabled: [{ type: Input, args: ['vdrDisabled',] }]
};

/**
 * A base class for implementing custom *ngIf-style structural directives based on custom conditions.
 *
 * @dynamic
 */
class IfDirectiveBase {
    constructor(_viewContainer, templateRef, updateViewFn) {
        this._viewContainer = _viewContainer;
        this.updateViewFn = updateViewFn;
        this.updateArgs$ = new BehaviorSubject([]);
        this._thenTemplateRef = null;
        this._elseTemplateRef = null;
        this._thenViewRef = null;
        this._elseViewRef = null;
        this._thenTemplateRef = templateRef;
    }
    ngOnInit() {
        this.subscription = this.updateArgs$
            .pipe(switchMap(args => this.updateViewFn(...args)))
            .subscribe(result => {
            if (result) {
                this.showThen();
            }
            else {
                this.showElse();
            }
        });
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    setElseTemplate(templateRef) {
        this.assertTemplate('vdrIfPermissionsElse', templateRef);
        this._elseTemplateRef = templateRef;
        this._elseViewRef = null; // clear previous view if any.
    }
    showThen() {
        if (!this._thenViewRef) {
            this._viewContainer.clear();
            this._elseViewRef = null;
            if (this._thenTemplateRef) {
                this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef);
            }
        }
    }
    showElse() {
        if (!this._elseViewRef) {
            this._viewContainer.clear();
            this._thenViewRef = null;
            if (this._elseTemplateRef) {
                this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef);
            }
        }
    }
    assertTemplate(property, templateRef) {
        const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
        if (!isTemplateRefOrNull) {
            throw new Error(`${property} must be a TemplateRef, but received '${templateRef}'.`);
        }
    }
}
IfDirectiveBase.decorators = [
    { type: Directive }
];
IfDirectiveBase.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: Function }
];

class IfDefaultChannelActiveDirective extends IfDirectiveBase {
    constructor(_viewContainer, templateRef, dataService, changeDetectorRef) {
        super(_viewContainer, templateRef, () => {
            return this.dataService.client
                .userStatus()
                .mapStream(({ userStatus }) => this.defaultChannelIsActive(userStatus))
                .pipe(tap(() => this.changeDetectorRef.markForCheck()));
        });
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
    }
    /**
     * A template to show if the current user does not have the specified permission.
     */
    set vdrIfMultichannelElse(templateRef) {
        this.setElseTemplate(templateRef);
    }
    defaultChannelIsActive(userStatus) {
        const defaultChannel = userStatus.channels.find(c => c.code === DEFAULT_CHANNEL_CODE);
        return !!(defaultChannel && userStatus.activeChannelId === defaultChannel.id);
    }
}
IfDefaultChannelActiveDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrIfDefaultChannelActive]',
            },] }
];
IfDefaultChannelActiveDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: DataService },
    { type: ChangeDetectorRef }
];
IfDefaultChannelActiveDirective.propDecorators = {
    vdrIfMultichannelElse: [{ type: Input }]
};

/**
 * @description
 * Structural directive that displays the given element if the Vendure instance has multiple channels
 * configured.
 *
 * @example
 * ```html
 * <div *vdrIfMultichannel class="channel-selector">
 *   <!-- ... -->
 * </ng-container>
 * ```
 *
 * @docsCategory directives
 */
class IfMultichannelDirective extends IfDirectiveBase {
    constructor(_viewContainer, templateRef, dataService) {
        super(_viewContainer, templateRef, () => {
            return this.dataService.client
                .userStatus()
                .mapStream(({ userStatus }) => 1 < userStatus.channels.length);
        });
        this.dataService = dataService;
    }
    /**
     * A template to show if the current user does not have the specified permission.
     */
    set vdrIfMultichannelElse(templateRef) {
        this.setElseTemplate(templateRef);
    }
}
IfMultichannelDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrIfMultichannel]',
            },] }
];
IfMultichannelDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: DataService }
];
IfMultichannelDirective.propDecorators = {
    vdrIfMultichannelElse: [{ type: Input }]
};

/**
 * @description
 * Conditionally shows/hides templates based on the current active user having the specified permission.
 * Based on the ngIf source. Also support "else" templates:
 *
 * @example
 * ```html
 * <button *vdrIfPermissions="'DeleteCatalog'; else unauthorized">Delete Product</button>
 * <ng-template #unauthorized>Not allowed!</ng-template>
 * ```
 *
 * The permission can be a single string, or an array. If an array is passed, then _all_ of the permissions
 * must match (logical AND)
 *
 * @docsCategory directives
 */
class IfPermissionsDirective extends IfDirectiveBase {
    constructor(_viewContainer, templateRef, dataService, changeDetectorRef) {
        super(_viewContainer, templateRef, permissions => {
            if (permissions == null) {
                return of(true);
            }
            else if (!permissions) {
                return of(false);
            }
            return this.dataService.client
                .userStatus()
                .mapStream(({ userStatus }) => {
                for (const permission of permissions) {
                    if (userStatus.permissions.includes(permission)) {
                        return true;
                    }
                }
                return false;
            })
                .pipe(tap(() => this.changeDetectorRef.markForCheck()));
        });
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.permissionToCheck = ['__initial_value__'];
    }
    /**
     * The permission to check to determine whether to show the template.
     */
    set vdrIfPermissions(permission) {
        this.permissionToCheck =
            (permission && (Array.isArray(permission) ? permission : [permission])) || null;
        this.updateArgs$.next([this.permissionToCheck]);
    }
    /**
     * A template to show if the current user does not have the specified permission.
     */
    set vdrIfPermissionsElse(templateRef) {
        this.setElseTemplate(templateRef);
        this.updateArgs$.next([this.permissionToCheck]);
    }
}
IfPermissionsDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrIfPermissions]',
            },] }
];
IfPermissionsDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: TemplateRef },
    { type: DataService },
    { type: ChangeDetectorRef }
];
IfPermissionsDirective.propDecorators = {
    vdrIfPermissions: [{ type: Input }],
    vdrIfPermissionsElse: [{ type: Input }]
};

/**
 * A host component which delegates to an instance or list of FormInputComponent components.
 */
class DynamicFormInputComponent {
    constructor(componentRegistryService, componentFactoryResolver, changeDetectorRef, injector) {
        this.componentRegistryService = componentRegistryService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectorRef = changeDetectorRef;
        this.injector = injector;
        this.renderAsList = false;
        this.listItems = [];
        this.listId = 1;
        this.listFormArray = new FormArray([]);
        this.renderList$ = new Subject();
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        const componentId = this.getInputComponentConfig(this.def).component;
        const componentType = this.componentRegistryService.getInputComponent(componentId);
        if (componentType) {
            this.componentType = componentType;
        }
        else {
            // tslint:disable-next-line:no-console
            console.error(`No form input component registered with the id "${componentId}". Using the default input instead.`);
            const defaultComponentType = this.componentRegistryService.getInputComponent(this.getInputComponentConfig(Object.assign(Object.assign({}, this.def), { ui: undefined })).component);
            if (defaultComponentType) {
                this.componentType = defaultComponentType;
            }
        }
    }
    ngAfterViewInit() {
        var _a;
        if (this.componentType) {
            const factory = this.componentFactoryResolver.resolveComponentFactory(this.componentType);
            // create a temp instance to check the value of `isListInput`
            const cmpRef = factory.create(this.injector);
            const isListInputComponent = (_a = cmpRef.instance.isListInput) !== null && _a !== void 0 ? _a : false;
            cmpRef.destroy();
            if (this.def.list === false && isListInputComponent) {
                throw new Error(`The ${this.componentType.name} component is a list input, but the definition for ${this.def.name} does not expect a list`);
            }
            this.renderAsList = this.def.list && !isListInputComponent;
            if (!this.renderAsList) {
                this.singleComponentRef = this.renderInputComponent(factory, this.singleViewContainer, this.control);
            }
            else {
                let formArraySub;
                const renderListInputs = (viewContainerRefs) => {
                    if (viewContainerRefs.length) {
                        if (formArraySub) {
                            formArraySub.unsubscribe();
                        }
                        this.listFormArray = new FormArray([]);
                        this.listItems.forEach(i => { var _a; return (_a = i.componentRef) === null || _a === void 0 ? void 0 : _a.destroy(); });
                        viewContainerRefs.forEach((ref, i) => {
                            var _a;
                            const listItem = (_a = this.listItems) === null || _a === void 0 ? void 0 : _a[i];
                            if (listItem) {
                                this.listFormArray.push(listItem.control);
                                listItem.componentRef = this.renderInputComponent(factory, ref, listItem.control);
                            }
                        });
                        formArraySub = this.listFormArray.valueChanges
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(val => {
                            this.control.markAsTouched();
                            this.control.markAsDirty();
                            this.onChange(val);
                            this.control.patchValue(val, { emitEvent: false });
                        });
                        setTimeout(() => this.changeDetectorRef.markForCheck());
                    }
                };
                // initial render
                this.listItemContainers.changes
                    .pipe(take(1))
                    .subscribe(val => renderListInputs(this.listItemContainers));
                // render on changes to the list
                this.renderList$
                    .pipe(switchMap(() => this.listItemContainers.changes.pipe(take(1))), takeUntil(this.destroy$))
                    .subscribe(() => {
                    renderListInputs(this.listItemContainers);
                });
            }
        }
        setTimeout(() => this.changeDetectorRef.markForCheck());
    }
    ngOnChanges(changes) {
        if (this.listItems) {
            for (const item of this.listItems) {
                if (item.componentRef) {
                    this.updateBindings(changes, item.componentRef);
                }
            }
        }
        if (this.singleComponentRef) {
            this.updateBindings(changes, this.singleComponentRef);
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    updateBindings(changes, componentRef) {
        if ('def' in changes) {
            componentRef.instance.config = simpleDeepClone(this.def);
        }
        if ('readonly' in changes) {
            componentRef.instance.readonly = this.readonly;
        }
        componentRef.injector.get(ChangeDetectorRef).markForCheck();
    }
    trackById(index, item) {
        return item.id;
    }
    addListItem() {
        var _a;
        if (!this.listItems) {
            this.listItems = [];
        }
        this.listItems.push({
            id: this.listId++,
            control: new FormControl((_a = this.def.defaultValue) !== null && _a !== void 0 ? _a : null),
        });
        this.renderList$.next();
    }
    moveListItem(event) {
        if (this.listItems) {
            moveItemInArray(this.listItems, event.previousIndex, event.currentIndex);
            this.listFormArray.removeAt(event.previousIndex);
            this.listFormArray.insert(event.currentIndex, event.item.data.control);
            this.renderList$.next();
        }
    }
    removeListItem(item) {
        var _a;
        if (this.listItems) {
            const index = this.listItems.findIndex(i => i === item);
            (_a = item.componentRef) === null || _a === void 0 ? void 0 : _a.destroy();
            this.listFormArray.removeAt(index);
            this.listItems = this.listItems.filter(i => i !== item);
            this.renderList$.next();
        }
    }
    renderInputComponent(factory, viewContainerRef, formControl) {
        const componentRef = viewContainerRef.createComponent(factory);
        const { instance } = componentRef;
        instance.config = simpleDeepClone(this.def);
        instance.formControl = formControl;
        instance.readonly = this.readonly;
        componentRef.injector.get(ChangeDetectorRef).markForCheck();
        return componentRef;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouch = fn;
    }
    writeValue(obj) {
        if (Array.isArray(obj)) {
            if (obj.length === this.listItems.length) {
                obj.forEach((value, index) => {
                    var _a;
                    const control = (_a = this.listItems[index]) === null || _a === void 0 ? void 0 : _a.control;
                    control.patchValue(getConfigArgValue(value), { emitEvent: false });
                });
            }
            else {
                this.listItems = obj.map(value => ({
                    id: this.listId++,
                    control: new FormControl(getConfigArgValue(value)),
                }));
                this.renderList$.next();
            }
        }
        else {
            this.listItems = [];
            this.renderList$.next();
        }
        this.changeDetectorRef.markForCheck();
    }
    getInputComponentConfig(argDef) {
        var _a;
        if (this.hasUiConfig(argDef) && argDef.ui.component) {
            return argDef.ui;
        }
        const type = argDef === null || argDef === void 0 ? void 0 : argDef.type;
        switch (type) {
            case 'string':
            case 'localeString': {
                const hasOptions = !!(this.isConfigArgDef(argDef) && ((_a = argDef.ui) === null || _a === void 0 ? void 0 : _a.options)) ||
                    !!argDef.options;
                if (hasOptions) {
                    return { component: 'select-form-input' };
                }
                else {
                    return { component: 'text-form-input' };
                }
            }
            case 'text': {
                return { component: 'textarea-form-input' };
            }
            case 'int':
            case 'float':
                return { component: 'number-form-input' };
            case 'boolean':
                return { component: 'boolean-form-input' };
            case 'datetime':
                return { component: 'date-form-input' };
            case 'ID':
                return { component: 'text-form-input' };
            case 'relation':
                return { component: 'relation-form-input' };
            default:
                assertNever(type);
        }
    }
    isConfigArgDef(def) {
        var _a;
        return ((_a = def) === null || _a === void 0 ? void 0 : _a.__typename) === 'ConfigArgDefinition';
    }
    hasUiConfig(def) {
        var _a, _b;
        return typeof def === 'object' && typeof ((_b = (_a = def) === null || _a === void 0 ? void 0 : _a.ui) === null || _b === void 0 ? void 0 : _b.component) === 'string';
    }
}
DynamicFormInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-dynamic-form-input',
                template: "<ng-container *ngIf=\"!renderAsList; else list\">\n    <ng-container #single></ng-container>\n</ng-container>\n<ng-template #list>\n    <div class=\"list-container\" cdkDropList (cdkDropListDropped)=\"moveListItem($event)\">\n        <div\n            class=\"list-item-row\"\n            *ngFor=\"let item of listItems; trackBy: trackById\"\n            cdkDrag\n            [cdkDragData]=\"item\"\n        >\n            <ng-container #listItem></ng-container>\n            <button\n                class=\"btn btn-link btn-sm btn-warning\"\n                *ngIf=\"!readonly\"\n                (click)=\"removeListItem(item)\"\n                [title]=\"'common.remove-item-from-list' | translate\"\n            >\n                <clr-icon shape=\"times\"></clr-icon>\n            </button>\n            <div class=\"flex-spacer\"></div>\n            <div class=\"drag-handle\" cdkDragHandle [class.hidden]=\"readonly\">\n                <clr-icon shape=\"drag-handle\" size=\"24\"></clr-icon>\n            </div>\n        </div>\n        <button class=\"btn btn-secondary btn-sm\" (click)=\"addListItem()\" *ngIf=\"!readonly\">\n            <clr-icon shape=\"plus\"></clr-icon> {{ 'common.add-item-to-list' | translate }}\n        </button>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: DynamicFormInputComponent,
                        multi: true,
                    },
                ],
                styles: [":host{flex:1}.list-container{border:1px solid var(--color-component-border-200);border-radius:3px;padding:12px}.list-item-row{font-size:13px;display:flex;align-items:center;margin:3px 0}.drag-placeholder{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drag-preview{font-size:13px;background-color:var(--color-component-bg-100);opacity:.8;border-radius:4px;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.drag-handle.hidden{display:none}.cdk-drag-placeholder{opacity:.1}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drop-list-dragging .list-item-row:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}\n"]
            },] }
];
DynamicFormInputComponent.ctorParameters = () => [
    { type: ComponentRegistryService },
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef },
    { type: Injector }
];
DynamicFormInputComponent.propDecorators = {
    def: [{ type: Input }],
    readonly: [{ type: Input }],
    control: [{ type: Input }],
    singleViewContainer: [{ type: ViewChild, args: ['single', { read: ViewContainerRef },] }],
    listItemContainers: [{ type: ViewChildren, args: ['listItem', { read: ViewContainerRef },] }]
};

class RelationAssetInputComponent {
    constructor(modalService, dataService) {
        this.modalService = modalService;
        this.dataService = dataService;
    }
    ngOnInit() {
        this.asset$ = this.formControl.valueChanges.pipe(startWith(this.formControl.value), map(asset => asset === null || asset === void 0 ? void 0 : asset.id), distinctUntilChanged(), switchMap(id => {
            if (id) {
                return this.dataService.product.getAsset(id).mapStream(data => data.asset || undefined);
            }
            else {
                return of(undefined);
            }
        }));
    }
    selectAsset() {
        this.modalService
            .fromComponent(AssetPickerDialogComponent, {
            size: 'xl',
            locals: {
                multiSelect: false,
            },
        })
            .subscribe(result => {
            if (result && result.length) {
                this.formControl.setValue(result[0]);
                this.formControl.markAsDirty();
            }
        });
    }
    remove() {
        this.formControl.setValue(null);
        this.formControl.markAsDirty();
    }
    previewAsset(asset) {
        this.modalService
            .fromComponent(AssetPreviewDialogComponent, {
            size: 'xl',
            closable: true,
            locals: { asset },
        })
            .subscribe();
    }
}
RelationAssetInputComponent.id = 'asset-form-input';
RelationAssetInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-asset-input',
                template: "<vdr-relation-card\n    (select)=\"selectAsset()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"image\"\n    [entity]=\"asset$ | async\"\n    [selectLabel]=\"'asset.select-asset' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-asset=\"entity\">\n        <img\n            class=\"preview\"\n            [title]=\"'asset.preview' | translate\"\n            [src]=\"asset | assetPreview: 'tiny'\"\n            (click)=\"previewAsset(asset)\"\n        />\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-asset=\"entity\">\n        <div class=\"name\" [title]=\"asset.name\">\n            {{ asset.name }}\n        </div>\n    </ng-template>\n</vdr-relation-card>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".preview{cursor:pointer}.detail{flex:1;overflow:hidden}.name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n"]
            },] }
];
RelationAssetInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService }
];
RelationAssetInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    formControl: [{ type: Input, args: ['parentFormControl',] }],
    config: [{ type: Input }]
};

class RelationSelectorDialogComponent {
}
RelationSelectorDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-selector-dialog',
                template: "<ng-template vdrDialogTitle>{{ title | translate }}</ng-template>\n<ng-container [ngTemplateOutlet]=\"selectorTemplate\" [ngTemplateOutletContext]=\"{ select: resolveWith }\"></ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];

class RelationCustomerInputComponent {
    constructor(modalService, dataService) {
        this.modalService = modalService;
        this.dataService = dataService;
        this.searchControl = new FormControl('');
        this.searchTerm$ = new Subject();
    }
    get customer() {
        return this.parentFormControl.value;
    }
    ngOnInit() {
        this.results$ = this.searchTerm$.pipe(debounceTime(200), switchMap(term => {
            return this.dataService.customer
                .getCustomerList(10, 0, term)
                .mapSingle(data => data.customers.items);
        }));
    }
    selectCustomer() {
        this.modalService
            .fromComponent(RelationSelectorDialogComponent, {
            size: 'md',
            closable: true,
            locals: {
                title: marker('customer.select-customer'),
                selectorTemplate: this.template,
            },
        })
            .subscribe(result => {
            if (result) {
                this.parentFormControl.setValue(result);
                this.parentFormControl.markAsDirty();
            }
        });
    }
    remove() {
        this.parentFormControl.setValue(null);
        this.parentFormControl.markAsDirty();
    }
}
RelationCustomerInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-customer-input',
                template: "<vdr-relation-card\n    (select)=\"selectCustomer()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"user\"\n    [entity]=\"customer\"\n    [selectLabel]=\"'customer.select-customer' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview>\n        <div class=\"placeholder\">\n            <clr-icon shape=\"user\" class=\"is-solid\" size=\"50\"></clr-icon>\n        </div>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-c=\"entity\">\n        <div class=\"\">\n            <a [routerLink]=\"['/customer/customers', c.id]\">{{ c.firstName }} {{ c.lastName }}</a>\n        </div>\n        <div class=\"\">{{ c.emailAddress }}</div>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <ng-select [items]=\"results$ | async\" [typeahead]=\"searchTerm$\" appendTo=\"body\" (change)=\"select($event)\">\n        <ng-template ng-option-tmp let-item=\"item\">\n            <b>{{ item.emailAddress }}</b>\n            {{ item.firstName }} {{ item.lastName }}\n        </ng-template>\n    </ng-select>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [""]
            },] }
];
RelationCustomerInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService }
];
RelationCustomerInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    parentFormControl: [{ type: Input }],
    config: [{ type: Input }],
    template: [{ type: ViewChild, args: ['selector',] }]
};

class RelationGenericInputComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    selectRelationId() {
        this.modalService
            .fromComponent(RelationSelectorDialogComponent, {
            size: 'md',
            closable: true,
            locals: {
                title: marker('common.select-relation-id'),
                selectorTemplate: this.template,
            },
        })
            .subscribe(result => {
            if (result) {
                this.parentFormControl.setValue({ id: result });
                this.parentFormControl.markAsDirty();
            }
        });
    }
    remove() {
        this.parentFormControl.setValue(null);
        this.parentFormControl.markAsDirty();
    }
}
RelationGenericInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-generic-input',
                template: "<vdr-relation-card\n    (select)=\"selectRelationId()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"objects\"\n    [entity]=\"parentFormControl.value\"\n    [selectLabel]=\"'common.select-relation-id' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    {{ parentFormControl.value | json }}\n    <ng-template vdrRelationCardPreview>\n        <div class=\"placeholder\">\n            <clr-icon shape=\"objects\" size=\"50\"></clr-icon>\n        </div>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-entity=\"entity\">\n        <div class=\"\">\n            {{ config.entity }}: <strong>{{ entity.id }}</strong>\n        </div>\n        <vdr-object-tree [value]=\"{ properties: parentFormControl.value }\"></vdr-object-tree>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <div class=\"id-select-wrapper\">\n        <clr-input-container>\n            <input [(ngModel)]=\"relationId\" type=\"text\" clrInput [readonly]=\"readonly\" />\n        </clr-input-container>\n        <div>\n            <button class=\"btn btn-primary m0\" (click)=\"select(relationId)\">\n                {{ 'common.confirm' | translate }}\n            </button>\n        </div>\n    </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".id-select-wrapper{display:flex;align-items:flex-end}\n"]
            },] }
];
RelationGenericInputComponent.ctorParameters = () => [
    { type: ModalService }
];
RelationGenericInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    parentFormControl: [{ type: Input }],
    config: [{ type: Input }],
    template: [{ type: ViewChild, args: ['selector',] }]
};

class RelationProductVariantInputComponent {
    constructor(modalService, dataService) {
        this.modalService = modalService;
        this.dataService = dataService;
        this.searchControl = new FormControl('');
        this.searchTerm$ = new Subject();
    }
    ngOnInit() {
        this.productVariant$ = this.parentFormControl.valueChanges.pipe(startWith(this.parentFormControl.value), map(variant => variant === null || variant === void 0 ? void 0 : variant.id), distinctUntilChanged(), switchMap(id => {
            if (id) {
                return this.dataService.product
                    .getProductVariant(id)
                    .mapStream(data => data.productVariant || undefined);
            }
            else {
                return of(undefined);
            }
        }));
        this.results$ = this.searchTerm$.pipe(debounceTime(200), switchMap(term => {
            return this.dataService.product
                .getProductVariantsSimple(Object.assign(Object.assign({}, (term
                ? {
                    filter: {
                        name: {
                            contains: term,
                        },
                    },
                }
                : {})), { take: 10 }))
                .mapSingle(data => data.productVariants.items);
        }));
    }
    selectProductVariant() {
        this.modalService
            .fromComponent(RelationSelectorDialogComponent, {
            size: 'md',
            closable: true,
            locals: {
                title: marker('catalog.select-product-variant'),
                selectorTemplate: this.template,
            },
        })
            .subscribe(result => {
            if (result) {
                this.parentFormControl.setValue(result);
                this.parentFormControl.markAsDirty();
            }
        });
    }
    remove() {
        this.parentFormControl.setValue(null);
        this.parentFormControl.markAsDirty();
    }
}
RelationProductVariantInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-product-variant-input',
                template: "<vdr-relation-card\n    (select)=\"selectProductVariant()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"library\"\n    [entity]=\"productVariant$ | async\"\n    [selectLabel]=\"'catalog.select-product-variant' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-variant=\"entity\">\n        <img\n            *ngIf=\"variant.featuredAsset || variant.product.featuredAsset as asset; else placeholder\"\n            [src]=\"asset | assetPreview: 'tiny'\"\n        />\n        <ng-template #placeholder>\n            <div class=\"placeholder\" *ngIf=\"!variant.featuredAsset\">\n                <clr-icon shape=\"image\" size=\"50\"></clr-icon>\n            </div>\n        </ng-template>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-variant=\"entity\">\n        <a [routerLink]=\"['/catalog/products', variant.product.id, { tab: 'variants' }]\">{{ variant.name }}</a>\n        <div class=\"\">{{ variant.sku }}</div>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <ng-select [items]=\"results$ | async\" [typeahead]=\"searchTerm$\" appendTo=\"body\" (change)=\"select($event)\">\n        <ng-template ng-option-tmp let-item=\"item\">\n            <img\n                *ngIf=\"item.featuredAsset || item.product.featuredAsset as asset\"\n                [src]=\"asset | assetPreview: 32\"\n            />\n            {{ item.name }}\n        </ng-template>\n    </ng-select>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".placeholder{color:var(--color-grey-300)}\n"]
            },] }
];
RelationProductVariantInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService }
];
RelationProductVariantInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    parentFormControl: [{ type: Input }],
    config: [{ type: Input }],
    template: [{ type: ViewChild, args: ['selector',] }]
};

class RelationProductInputComponent {
    constructor(modalService, dataService) {
        this.modalService = modalService;
        this.dataService = dataService;
        this.searchControl = new FormControl('');
        this.searchTerm$ = new Subject();
    }
    ngOnInit() {
        this.product$ = this.parentFormControl.valueChanges.pipe(startWith(this.parentFormControl.value), map(product => product === null || product === void 0 ? void 0 : product.id), distinctUntilChanged(), switchMap(id => {
            if (id) {
                return this.dataService.product
                    .getProductSimple(id)
                    .mapStream(data => data.product || undefined);
            }
            else {
                return of(undefined);
            }
        }));
        this.results$ = this.searchTerm$.pipe(debounceTime(200), switchMap(term => {
            return this.dataService.product
                .getProducts(Object.assign(Object.assign({}, (term
                ? {
                    filter: {
                        name: {
                            contains: term,
                        },
                    },
                }
                : {})), { take: 10 }))
                .mapSingle(data => data.products.items);
        }));
    }
    selectProduct() {
        this.modalService
            .fromComponent(RelationSelectorDialogComponent, {
            size: 'md',
            closable: true,
            locals: {
                title: marker('catalog.select-product'),
                selectorTemplate: this.template,
            },
        })
            .subscribe(result => {
            if (result) {
                this.parentFormControl.setValue(result);
                this.parentFormControl.markAsDirty();
            }
        });
    }
    remove() {
        this.parentFormControl.setValue(null);
        this.parentFormControl.markAsDirty();
    }
}
RelationProductInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-product-input',
                template: "<vdr-relation-card\n    (select)=\"selectProduct()\"\n    (remove)=\"remove()\"\n    placeholderIcon=\"library\"\n    [entity]=\"product$ | async\"\n    [selectLabel]=\"'catalog.select-product' | translate\"\n    [removable]=\"!config.list\"\n    [readonly]=\"readonly\"\n>\n    <ng-template vdrRelationCardPreview let-product=\"entity\">\n        <img *ngIf=\"product.featuredAsset\" [src]=\"product.featuredAsset | assetPreview: 'tiny'\" />\n        <div class=\"placeholder\" *ngIf=\"!product.featuredAsset\">\n            <clr-icon shape=\"image\" size=\"50\"></clr-icon>\n        </div>\n    </ng-template>\n    <ng-template vdrRelationCardDetail let-product=\"entity\">\n        <a [routerLink]=\"['/catalog/products', product.id]\">{{ product.name }}</a>\n    </ng-template>\n</vdr-relation-card>\n\n<ng-template #selector let-select=\"select\">\n    <ng-select [items]=\"results$ | async\" [typeahead]=\"searchTerm$\" appendTo=\"body\" (change)=\"select($event)\">\n        <ng-template ng-option-tmp let-item=\"item\">\n            <img [src]=\"item.featuredAsset | assetPreview: 32\" />\n            {{ item.name }}\n        </ng-template>\n    </ng-select>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".placeholder{color:var(--color-grey-300)}\n"]
            },] }
];
RelationProductInputComponent.ctorParameters = () => [
    { type: ModalService },
    { type: DataService }
];
RelationProductInputComponent.propDecorators = {
    readonly: [{ type: Input }],
    parentFormControl: [{ type: Input }],
    config: [{ type: Input }],
    template: [{ type: ViewChild, args: ['selector',] }]
};

class RelationCardPreviewDirective {
}
RelationCardPreviewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrRelationCardPreview]',
            },] }
];
class RelationCardDetailDirective {
}
RelationCardDetailDirective.decorators = [
    { type: Directive, args: [{
                selector: '[vdrRelationCardDetail]',
            },] }
];
class RelationCardComponent {
    constructor() {
        this.removable = true;
        this.select = new EventEmitter();
        this.remove = new EventEmitter();
    }
}
RelationCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'vdr-relation-card',
                template: "<div class=\"flex\">\n    <ng-container *ngIf=\"entity; else placeholder\">\n        <div class=\"preview\">\n            <ng-container *ngTemplateOutlet=\"previewTemplate; context: { entity: entity }\"></ng-container>\n        </div>\n        <div class=\"detail\">\n            <div class=\"pl3\">\n                <ng-container *ngTemplateOutlet=\"detailTemplate; context: { entity: entity }\"></ng-container>\n            </div>\n            <button *ngIf=\"!readonly\" class=\"btn btn-sm btn-link\" (click)=\"select.emit()\">\n                <clr-icon shape=\"link\"></clr-icon> {{ 'common.change-selection' | translate }}\n            </button>\n            <button *ngIf=\"!readonly && removable\" class=\"btn btn-sm btn-link\" (click)=\"remove.emit()\">\n                <clr-icon shape=\"times\"></clr-icon> {{ 'common.remove' | translate }}\n            </button>\n        </div>\n    </ng-container>\n    <ng-template #placeholder>\n        <div class=\"preview\">\n            <div class=\"placeholder\" (click)=\"!readonly && select.emit()\">\n                <clr-icon [attr.shape]=\"placeholderIcon\" size=\"50\"></clr-icon>\n            </div>\n        </div>\n        <div class=\"detail\">\n            <div class=\"pl3 not-set\">{{ 'common.not-set' | translate }}</div>\n            <button *ngIf=\"!readonly\" class=\"btn btn-sm btn-link\" (click)=\"select.emit()\">\n                <clr-icon shape=\"link\"></clr-icon> {{ selectLabel }}\n            </button>\n        </div>\n    </ng-template>\n</div>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [":host{display:block;min-width:300px}.placeholder{color:var(--color-grey-300)}.not-set{color:var(--color-grey-300)}.detail{flex:1;overflow:hidden}.name{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n"]
            },] }
];
RelationCardComponent.propDecorators = {
    entity: [{ type: Input }],
    placeholderIcon: [{ type: Input }],
    selectLabel: [{ type: Input }],
    readonly: [{ type: Input }],
    removable: [{ type: Input }],
    select: [{ type: Output }],
    remove: [{ type: Output }],
    previewTemplate: [{ type: ContentChild, args: [RelationCardPreviewDirective, { read: TemplateRef },] }],
    detailTemplate: [{ type: ContentChild, args: [RelationCardDetailDirective, { read: TemplateRef },] }]
};

/**
 * @description
 * Given an Asset object (an object with `preview` and optionally `focalPoint` properties), this pipe
 * returns a string with query parameters designed to work with the image resize capabilities of the
 * AssetServerPlugin.
 *
 * @example
 * ```HTML
 * <img [src]="asset | assetPreview:'tiny'" />
 * <img [src]="asset | assetPreview:150" />
 * ```
 *
 * @docsCategory pipes
 */
class AssetPreviewPipe {
    transform(asset, preset = 'thumb') {
        if (!asset) {
            return '';
        }
        if (asset.preview == null || typeof asset.preview !== 'string') {
            throw new Error(`Expected an Asset, got ${JSON.stringify(asset)}`);
        }
        const fp = asset.focalPoint ? `&fpx=${asset.focalPoint.x}&fpy=${asset.focalPoint.y}` : '';
        if (Number.isNaN(Number(preset))) {
            return `${asset.preview}?preset=${preset}${fp}`;
        }
        else {
            return `${asset.preview}?w=${preset}&h=${preset}${fp}`;
        }
    }
}
AssetPreviewPipe.decorators = [
    { type: Pipe, args: [{
                name: 'assetPreview',
            },] }
];

class ChannelLabelPipe {
    transform(value, ...args) {
        if (value === DEFAULT_CHANNEL_CODE) {
            return marker('common.default-channel');
        }
        else {
            return value;
        }
    }
}
ChannelLabelPipe.decorators = [
    { type: Pipe, args: [{
                name: 'channelCodeToLabel',
            },] }
];

/**
 * Displays a localized label for a CustomField or StringFieldOption, falling back to the
 * name/value if none are defined.
 */
class CustomFieldLabelPipe {
    transform(value, uiLanguageCode) {
        if (!value) {
            return value;
        }
        const { label } = value;
        const name = this.isCustomFieldConfig(value) ? value.name : value.value;
        if (label) {
            const match = label.find(l => l.languageCode === uiLanguageCode);
            return match ? match.value : label[0].value;
        }
        else {
            return name;
        }
    }
    isCustomFieldConfig(input) {
        return input.hasOwnProperty('name');
    }
}
CustomFieldLabelPipe.decorators = [
    { type: Pipe, args: [{
                name: 'customFieldLabel',
                pure: true,
            },] }
];

/**
 * @description
 * Displays a number of milliseconds in a more human-readable format,
 * e.g. "12ms", "33s", "2:03m"
 *
 * @example
 * ```TypeScript
 * {{ timeInMs | duration }}
 * ```
 *
 * @docsCategory pipes
 */
class DurationPipe {
    constructor(i18nService) {
        this.i18nService = i18nService;
    }
    transform(value) {
        if (value < 1000) {
            return this.i18nService.translate(marker('datetime.duration-milliseconds'), { ms: value });
        }
        else if (value < 1000 * 60) {
            const seconds1dp = +(value / 1000).toFixed(1);
            return this.i18nService.translate(marker('datetime.duration-seconds'), { s: seconds1dp });
        }
        else {
            const minutes = Math.floor(value / (1000 * 60));
            const seconds = Math.round((value % (1000 * 60)) / 1000)
                .toString()
                .padStart(2, '0');
            return this.i18nService.translate(marker('datetime.duration-minutes:seconds'), {
                m: minutes,
                s: seconds,
            });
        }
    }
}
DurationPipe.decorators = [
    { type: Pipe, args: [{
                name: 'duration',
            },] }
];
DurationPipe.ctorParameters = () => [
    { type: I18nService }
];

/**
 * @description
 * Formats a number into a human-readable file size string.
 *
 * @example
 * ```TypeScript
 * {{ fileSizeInBytes | filesize }}
 * ```
 *
 * @docsCategory pipes
 */
class FileSizePipe {
    transform(value, useSiUnits = true) {
        if (typeof value !== 'number' && typeof value !== 'string') {
            return value;
        }
        return humanFileSize(value, useSiUnits === true);
    }
}
FileSizePipe.decorators = [
    { type: Pipe, args: [{ name: 'filesize' },] }
];
/**
 * Convert a number into a human-readable file size string.
 * Adapted from http://stackoverflow.com/a/14919494/772859
 */
function humanFileSize(bytes, si) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}

/**
 * @description
 * A pipe which checks the provided permission against all the permissions of the current user.
 * Returns `true` if the current user has that permission.
 *
 * @example
 * ```HTML
 * <button [disabled]="!('UpdateCatalog' | hasPermission)">Save Changes</button>
 * ```
 * @docsCategory pipes
 */
class HasPermissionPipe {
    constructor(dataService, changeDetectorRef) {
        this.dataService = dataService;
        this.changeDetectorRef = changeDetectorRef;
        this.hasPermission = false;
        this.lastPermissions = null;
        this.currentPermissions$ = this.dataService.client
            .userStatus()
            .mapStream(data => data.userStatus.permissions);
    }
    transform(input) {
        const requiredPermissions = Array.isArray(input) ? input : [input];
        const requiredPermissionsString = requiredPermissions.join(',');
        if (this.lastPermissions !== requiredPermissionsString) {
            this.lastPermissions = requiredPermissionsString;
            this.hasPermission = false;
            this.dispose();
            this.subscription = this.currentPermissions$.subscribe(permissions => {
                this.hasPermission = this.checkPermissions(permissions, requiredPermissions);
                this.changeDetectorRef.markForCheck();
            });
        }
        return this.hasPermission;
    }
    ngOnDestroy() {
        this.dispose();
    }
    checkPermissions(userPermissions, requiredPermissions) {
        for (const perm of requiredPermissions) {
            if (userPermissions.includes(perm)) {
                return true;
            }
        }
        return false;
    }
    dispose() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
HasPermissionPipe.decorators = [
    { type: Pipe, args: [{
                name: 'hasPermission',
                pure: false,
            },] }
];
HasPermissionPipe.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];

/**
 * Used by locale-aware pipes to handle the task of getting the active languageCode
 * of the UI and cleaning up.
 */
class LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        if (dataService && changeDetectorRef) {
            this.subscription = dataService.client
                .uiState()
                .mapStream(data => data.uiState)
                .subscribe(({ language, locale }) => {
                this.locale = language.replace(/_/g, '-');
                if (locale) {
                    this.locale += `-${locale}`;
                }
                changeDetectorRef.markForCheck();
            });
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * Returns the active locale after attempting to ensure that the locale string
     * is valid for the Intl API.
     */
    getActiveLocale(localeOverride) {
        var _a;
        const locale = typeof localeOverride === 'string' ? localeOverride : (_a = this.locale) !== null && _a !== void 0 ? _a : 'en';
        const hyphenated = locale === null || locale === void 0 ? void 0 : locale.replace(/_/g, '-');
        // Check for a double-region string, containing 2 region codes like
        // pt-BR-BR, which is invalid. In this case, the second region is used
        // and the first region discarded. This would only ever be an issue for
        // those languages where the translation file itself encodes the region,
        // as in pt_BR & pt_PT.
        const matches = hyphenated === null || hyphenated === void 0 ? void 0 : hyphenated.match(/^([a-zA-Z_-]+)(-[A-Z][A-Z])(-[A-Z][A-z])$/);
        if (matches === null || matches === void 0 ? void 0 : matches.length) {
            const overriddenLocale = matches[1] + matches[3];
            return overriddenLocale;
        }
        else {
            return hyphenated;
        }
    }
}
LocaleBasePipe.decorators = [
    { type: Injectable }
];
LocaleBasePipe.ctorParameters = () => [
    { type: DataService },
    { type: ChangeDetectorRef }
];

/**
 * @description
 * Displays a human-readable name for a given ISO 4217 currency code.
 *
 * @example
 * ```HTML
 * {{ order.currencyCode | localeCurrencyName }}
 * ```
 *
 * @docsCategory pipes
 */
class LocaleCurrencyNamePipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, display = 'full', locale) {
        var _a;
        if (value == null || value === '') {
            return '';
        }
        if (typeof value !== 'string') {
            return `Invalid currencyCode "${value}"`;
        }
        let name = '';
        let symbol = '';
        const activeLocale = this.getActiveLocale(locale);
        // Awaiting TS types for this API: https://github.com/microsoft/TypeScript/pull/44022/files
        const DisplayNames = Intl.DisplayNames;
        if (display === 'full' || display === 'name') {
            name = new DisplayNames([activeLocale], {
                type: 'currency',
            }).of(value);
        }
        if (display === 'full' || display === 'symbol') {
            const parts = new Intl.NumberFormat(activeLocale, {
                style: 'currency',
                currency: value,
                currencyDisplay: 'symbol',
            }).formatToParts();
            symbol = ((_a = parts.find(p => p.type === 'currency')) === null || _a === void 0 ? void 0 : _a.value) || value;
        }
        return display === 'full' ? `${name} (${symbol})` : display === 'name' ? name : symbol;
    }
}
LocaleCurrencyNamePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeCurrencyName',
                pure: false,
            },] }
];
LocaleCurrencyNamePipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];

/**
 * @description
 * Formats a Vendure monetary value (in cents) into the correct format for the configured currency and display
 * locale.
 *
 * @example
 * ```HTML
 * {{ variant.priceWithTax | localeCurrency }}
 * ```
 *
 * @docsCategory pipes
 */
class LocaleCurrencyPipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, ...args) {
        const [currencyCode, locale] = args;
        if (typeof value === 'number' && typeof currencyCode === 'string') {
            const activeLocale = this.getActiveLocale(locale);
            const majorUnits = value / 100;
            try {
                return new Intl.NumberFormat(activeLocale, {
                    style: 'currency',
                    currency: currencyCode,
                }).format(majorUnits);
            }
            catch (e) {
                return majorUnits.toFixed(2);
            }
        }
        return value;
    }
}
LocaleCurrencyPipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeCurrency',
                pure: false,
            },] }
];
LocaleCurrencyPipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];

/**
 * @description
 * A replacement of the Angular DatePipe which makes use of the Intl API
 * to format dates according to the selected UI language.
 *
 * @example
 * ```HTML
 * {{ order.orderPlacedAt | localeDate }}
 * ```
 *
 * @docsCategory pipes
 */
class LocaleDatePipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, ...args) {
        const [format, locale] = args;
        if (this.locale || typeof locale === 'string') {
            const activeLocale = this.getActiveLocale(locale);
            const date = value instanceof Date ? value : typeof value === 'string' ? new Date(value) : undefined;
            if (date) {
                const options = this.getOptionsForFormat(typeof format === 'string' ? format : 'medium');
                return new Intl.DateTimeFormat(activeLocale, options).format(date);
            }
        }
    }
    getOptionsForFormat(dateFormat) {
        switch (dateFormat) {
            case 'medium':
                return {
                    month: 'short',
                    year: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                };
            case 'mediumTime':
                return {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                };
            case 'longDate':
                return {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                };
            case 'short':
                return {
                    day: 'numeric',
                    month: 'numeric',
                    year: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                };
            default:
                return;
        }
    }
}
LocaleDatePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeDate',
                pure: false,
            },] }
];
LocaleDatePipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];

/**
 * @description
 * Displays a human-readable name for a given ISO 639-1 language code.
 *
 * @example
 * ```HTML
 * {{ 'zh_Hant' | localeLanguageName }}
 * ```
 *
 * @docsCategory pipes
 */
class LocaleLanguageNamePipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, locale) {
        if (value == null || value === '') {
            return '';
        }
        if (typeof value !== 'string') {
            return `Invalid language code "${value}"`;
        }
        const activeLocale = this.getActiveLocale(locale);
        // Awaiting TS types for this API: https://github.com/microsoft/TypeScript/pull/44022/files
        const DisplayNames = Intl.DisplayNames;
        try {
            return new DisplayNames([activeLocale.replace('_', '-')], { type: 'language' }).of(value.replace('_', '-'));
        }
        catch (e) {
            return value;
        }
    }
}
LocaleLanguageNamePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeLanguageName',
                pure: false,
            },] }
];
LocaleLanguageNamePipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];

/**
 * @description
 * Displays a human-readable name for a given region.
 *
 * @example
 * ```HTML
 * {{ 'GB' | localeRegionName }}
 * ```
 *
 * @docsCategory pipes
 */
class LocaleRegionNamePipe extends LocaleBasePipe {
    constructor(dataService, changeDetectorRef) {
        super(dataService, changeDetectorRef);
    }
    transform(value, locale) {
        if (value == null || value === '') {
            return '';
        }
        if (typeof value !== 'string') {
            return `Invalid region code "${value}"`;
        }
        const activeLocale = this.getActiveLocale(locale);
        // Awaiting TS types for this API: https://github.com/microsoft/TypeScript/pull/44022/files
        const DisplayNames = Intl.DisplayNames;
        try {
            return new DisplayNames([activeLocale.replace('_', '-')], { type: 'region' }).of(value.replace('_', '-'));
        }
        catch (e) {
            return value;
        }
    }
}
LocaleRegionNamePipe.decorators = [
    { type: Pipe, args: [{
                name: 'localeRegionName',
                pure: false,
            },] }
];
LocaleRegionNamePipe.ctorParameters = () => [
    { type: DataService, decorators: [{ type: Optional }] },
    { type: ChangeDetectorRef, decorators: [{ type: Optional }] }
];

/**
 * Formats a string into sentence case (first letter of first word uppercase).
 */
class SentenceCasePipe {
    transform(value) {
        if (typeof value === 'string') {
            let lower;
            if (isCamelCase(value)) {
                lower = value.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
            }
            else {
                lower = value.toLowerCase();
            }
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        }
        return value;
    }
}
SentenceCasePipe.decorators = [
    { type: Pipe, args: [{ name: 'sentenceCase' },] }
];
function isCamelCase(value) {
    return /^[a-zA-Z]+[A-Z][a-zA-Z]+$/.test(value);
}

/**
 * A pipe for sorting elements of an array. Should be used with caution due to the
 * potential for perf degredation. Ideally should only be used on small arrays (< 10s of items)
 * and in components using OnPush change detection.
 */
class SortPipe {
    transform(value, orderByProp) {
        return value.slice().sort((a, b) => {
            const aProp = orderByProp ? a[orderByProp] : a;
            const bProp = orderByProp ? b[orderByProp] : b;
            if (aProp === bProp) {
                return 0;
            }
            if (aProp == null) {
                return 1;
            }
            if (bProp == null) {
                return -1;
            }
            return aProp > bProp ? 1 : -1;
        });
    }
}
SortPipe.decorators = [
    { type: Pipe, args: [{
                name: 'sort',
            },] }
];

class StateI18nTokenPipe {
    constructor() {
        this.stateI18nTokens = {
            Created: marker('state.created'),
            Draft: marker('state.draft'),
            AddingItems: marker('state.adding-items'),
            ArrangingPayment: marker('state.arranging-payment'),
            PaymentAuthorized: marker('state.payment-authorized'),
            PaymentSettled: marker('state.payment-settled'),
            PartiallyShipped: marker('state.partially-shipped'),
            Shipped: marker('state.shipped'),
            PartiallyDelivered: marker('state.partially-delivered'),
            Authorized: marker('state.authorized'),
            Delivered: marker('state.delivered'),
            Cancelled: marker('state.cancelled'),
            Pending: marker('state.pending'),
            Settled: marker('state.settled'),
            Failed: marker('state.failed'),
            Error: marker('state.error'),
            Declined: marker('state.declined'),
            Modifying: marker('state.modifying'),
            ArrangingAdditionalPayment: marker('state.arranging-additional-payment'),
            Received: marker('state.received'),
            Processing: marker('state.processing'),
            ReadyToDeliver: marker('state.readytodeliver'),
            Finished: marker('state.finished'),
        };
    }
    transform(value) {
        if (typeof value === 'string' && value.length) {
            const defaultStateToken = this.stateI18nTokens[value];
            if (defaultStateToken) {
                return defaultStateToken;
            }
            return ('state.' +
                value
                    .replace(/([a-z])([A-Z])/g, '$1-$2')
                    .replace(/ +/g, '-')
                    .toLowerCase());
        }
        return value;
    }
}
StateI18nTokenPipe.decorators = [
    { type: Pipe, args: [{
                name: 'stateI18nToken',
            },] }
];

/**
 * For a given string, returns one of a pre-defined selection of colours.
 */
function stringToColor(input) {
    if (!input || input === '') {
        return 'var(--color-component-bg-100)';
    }
    const safeColors = [
        '#10893E',
        '#107C10',
        '#7E735F',
        '#2F5646',
        '#498205',
        '#847545',
        '#744DA9',
        '#018574',
        '#486860',
        '#525E54',
        '#647C64',
        '#567C73',
        '#8764B8',
        '#515C6B',
        '#4A5459',
        '#69797E',
        '#0063B1',
        '#0078D7',
        '#2D7D9A',
        '#7A7574',
        '#767676',
    ];
    const value = input.split('').reduce((prev, curr, index) => {
        return prev + Math.round(curr.charCodeAt(0) * Math.log(index + 2));
    }, 0);
    return safeColors[value % safeColors.length];
}

class StringToColorPipe {
    transform(value) {
        return stringToColor(value);
    }
}
StringToColorPipe.decorators = [
    { type: Pipe, args: [{
                name: 'stringToColor',
                pure: true,
            },] }
];

/**
 * @description
 * Converts a date into the format "3 minutes ago", "5 hours ago" etc.
 *
 * @example
 * ```HTML
 * {{ order.orderPlacedAt | timeAgo }}
 * ```
 *
 * @docsCategory pipes
 */
class TimeAgoPipe {
    constructor(i18nService) {
        this.i18nService = i18nService;
    }
    transform(value, nowVal) {
        const then = dayjs(value);
        const now = dayjs(nowVal || new Date());
        const secondsDiff = now.diff(then, 'second');
        const durations = [
            [60, marker('datetime.ago-seconds')],
            [3600, marker('datetime.ago-minutes')],
            [86400, marker('datetime.ago-hours')],
            [31536000, marker('datetime.ago-days')],
            [Number.MAX_SAFE_INTEGER, marker('datetime.ago-years')],
        ];
        let lastUpperBound = 1;
        for (const [upperBound, translationToken] of durations) {
            if (secondsDiff < upperBound) {
                const count = Math.max(0, Math.floor(secondsDiff / lastUpperBound));
                return this.i18nService.translate(translationToken, { count });
            }
            lastUpperBound = upperBound;
        }
        return then.format();
    }
}
TimeAgoPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeAgo',
                pure: false,
            },] }
];
TimeAgoPipe.ctorParameters = () => [
    { type: I18nService }
];

class CanDeactivateDetailGuard {
    constructor(modalService, router) {
        this.modalService = modalService;
        this.router = router;
    }
    canDeactivate(component, currentRoute, currentState, nextState) {
        if (!component.canDeactivate()) {
            return this.modalService
                .dialog({
                title: marker('common.confirm-navigation'),
                body: marker('common.there-are-unsaved-changes'),
                buttons: [
                    { type: 'danger', label: marker('common.discard-changes'), returnValue: true },
                    { type: 'primary', label: marker('common.cancel-navigation'), returnValue: false },
                ],
            })
                .pipe(map(result => !!result));
        }
        else {
            return true;
        }
    }
}
CanDeactivateDetailGuard.decorators = [
    { type: Injectable }
];
CanDeactivateDetailGuard.ctorParameters = () => [
    { type: ModalService },
    { type: Router }
];

const IMPORTS = [
    ClarityModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    NgxPaginationModule,
    TranslateModule,
    OverlayModule,
    DragDropModule,
];
const DECLARATIONS = [
    ActionBarComponent,
    ActionBarLeftComponent,
    ActionBarRightComponent,
    AssetPreviewComponent,
    AssetPreviewDialogComponent,
    AssetSearchInputComponent,
    ConfigurableInputComponent,
    AffixedInputComponent,
    ChipComponent,
    CurrencyInputComponent,
    LocaleCurrencyNamePipe,
    OrderLabelComponent,
    CdTimerComponent,
    CustomerLabelComponent,
    CustomFieldControlComponent,
    DataTableComponent,
    DataTableColumnComponent,
    FacetValueSelectorComponent,
    ItemsPerPageControlsComponent,
    PaginationControlsComponent,
    TableRowActionComponent,
    FacetValueChipComponent,
    FileSizePipe,
    FormFieldComponent,
    FormFieldControlDirective,
    FormItemComponent,
    ModalDialogComponent,
    PercentageSuffixInputComponent,
    DialogComponentOutletComponent,
    DialogButtonsDirective,
    DialogTitleDirective,
    SelectToggleComponent,
    LanguageSelectorComponent,
    RichTextEditorComponent,
    SimpleDialogComponent,
    TitleInputComponent,
    SentenceCasePipe,
    DropdownComponent,
    DropdownMenuComponent,
    SortPipe,
    DropdownTriggerDirective,
    DropdownItemDirective,
    OrderStateLabelComponent,
    FormattedAddressComponent,
    LabeledDataComponent,
    StringToColorPipe,
    ObjectTreeComponent,
    IfPermissionsDirective,
    IfMultichannelDirective,
    HasPermissionPipe,
    ActionBarItemsComponent,
    DisabledDirective,
    AssetFileInputComponent,
    AssetGalleryComponent,
    AssetPickerDialogComponent,
    EntityInfoComponent,
    DatetimePickerComponent,
    ChannelBadgeComponent,
    ChannelAssignmentControlComponent,
    ChannelLabelPipe,
    IfDefaultChannelActiveDirective,
    ExtensionHostComponent,
    CustomFieldLabelPipe,
    FocalPointControlComponent,
    AssetPreviewPipe,
    LinkDialogComponent,
    ExternalImageDialogComponent,
    TimeAgoPipe,
    DurationPipe,
    EmptyPlaceholderComponent,
    TimelineEntryComponent,
    HistoryEntryDetailComponent,
    EditNoteDialogComponent,
    ProductSelectorFormInputComponent,
    StateI18nTokenPipe,
    ProductSelectorComponent,
    HelpTooltipComponent,
    CustomerGroupFormInputComponent,
    AddressFormComponent,
    LocaleDatePipe,
    LocaleCurrencyPipe,
    LocaleLanguageNamePipe,
    LocaleRegionNamePipe,
    TagSelectorComponent,
    ManageTagsDialogComponent,
    RelationSelectorDialogComponent,
    RelationCardComponent,
    StatusBadgeComponent,
    TabbedCustomFieldsComponent,
    UiExtensionPointComponent,
    CustomDetailComponentHostComponent,
    AssetPreviewLinksComponent,
    ProductMultiSelectorDialogComponent,
    ProductSearchInputComponent,
    ContextMenuComponent,
    RawHtmlDialogComponent,
    BulkActionMenuComponent,
    RadioCardComponent,
    RadioCardFieldsetComponent,
];
const DYNAMIC_FORM_INPUTS = [
    TextFormInputComponent,
    PasswordFormInputComponent,
    NumberFormInputComponent,
    DateFormInputComponent,
    CurrencyFormInputComponent,
    BooleanFormInputComponent,
    SelectFormInputComponent,
    FacetValueFormInputComponent,
    DynamicFormInputComponent,
    RelationFormInputComponent,
    RelationAssetInputComponent,
    RelationProductInputComponent,
    RelationProductVariantInputComponent,
    RelationCustomerInputComponent,
    RelationCardPreviewDirective,
    RelationCardDetailDirective,
    RelationSelectorDialogComponent,
    RelationGenericInputComponent,
    TextareaFormInputComponent,
    RichTextFormInputComponent,
    JsonEditorFormInputComponent,
    HtmlEditorFormInputComponent,
    ProductMultiSelectorFormInputComponent,
    CombinationModeFormInputComponent,
];
class SharedModule {
}
SharedModule.decorators = [
    { type: NgModule, args: [{
                imports: [IMPORTS],
                exports: [...IMPORTS, ...DECLARATIONS, ...DYNAMIC_FORM_INPUTS],
                declarations: [...DECLARATIONS, ...DYNAMIC_FORM_INPUTS],
                providers: [
                    // This needs to be shared, since lazy-loaded
                    // modules have their own entryComponents which
                    // are unknown to the CoreModule instance of ModalService.
                    // See https://github.com/angular/angular/issues/14324#issuecomment-305650763
                    ModalService,
                    CanDeactivateDetailGuard,
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
            },] }
];

class CoreModule {
    constructor(i18nService, localStorageService, titleService) {
        this.i18nService = i18nService;
        this.localStorageService = localStorageService;
        this.titleService = titleService;
        this.initUiLanguages();
        this.initUiTitle();
    }
    initUiLanguages() {
        const defaultLanguage = getDefaultUiLanguage();
        const lastLanguage = this.localStorageService.get('uiLanguageCode');
        const availableLanguages = getAppConfig().availableLanguages;
        if (!availableLanguages.includes(defaultLanguage)) {
            throw new Error(`The defaultLanguage "${defaultLanguage}" must be one of the availableLanguages [${availableLanguages
                .map(l => `"${l}"`)
                .join(', ')}]`);
        }
        const uiLanguage = lastLanguage && availableLanguages.includes(lastLanguage) ? lastLanguage : defaultLanguage;
        this.localStorageService.set('uiLanguageCode', uiLanguage);
        this.i18nService.setLanguage(uiLanguage);
        this.i18nService.setDefaultLanguage(defaultLanguage);
        this.i18nService.setAvailableLanguages(availableLanguages || [defaultLanguage]);
    }
    initUiTitle() {
        const title = getAppConfig().brand || 'Crepe Runner Backend';
        this.titleService.setTitle(title);
    }
}
CoreModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BrowserModule,
                    DataModule,
                    SharedModule,
                    BrowserAnimationsModule,
                    TranslateModule.forRoot({
                        loader: {
                            provide: TranslateLoader,
                            useFactory: HttpLoaderFactory,
                            deps: [HttpClient, PlatformLocation],
                        },
                        compiler: { provide: TranslateCompiler, useClass: InjectableTranslateMessageFormatCompiler },
                    }),
                ],
                providers: [
                    { provide: MESSAGE_FORMAT_CONFIG, useFactory: getLocales },
                    registerDefaultFormInputs(),
                    Title,
                ],
                exports: [SharedModule, OverlayHostComponent],
                declarations: [
                    AppShellComponent,
                    UserMenuComponent,
                    MainNavComponent,
                    BreadcrumbComponent,
                    OverlayHostComponent,
                    NotificationComponent,
                    UiLanguageSwitcherDialogComponent,
                    ChannelSwitcherComponent,
                    ThemeSwitcherComponent,
                ],
            },] }
];
CoreModule.ctorParameters = () => [
    { type: I18nService },
    { type: LocalStorageService },
    { type: Title }
];
function HttpLoaderFactory(http, location) {
    // Dynamically get the baseHref, which is configured in the angular.json file
    const baseHref = location.getBaseHrefFromDOM();
    return new CustomHttpTranslationLoader(http, baseHref + 'i18n-messages/');
}
/**
 * Returns the locales defined in the vendure-ui-config.json, ensuring that the
 * default language is the first item in the array as per the messageformat
 * documentation:
 *
 * > The default locale will be the first entry of the array
 * https://messageformat.github.io/messageformat/MessageFormat
 */
function getLocales() {
    const locales = getAppConfig().availableLanguages;
    const defaultLanguage = getDefaultUiLanguage();
    const localesWithoutDefault = locales.filter(l => l !== defaultLanguage);
    return {
        locales: [defaultLanguage, ...localesWithoutDefault],
    };
}

class AppComponentModule {
}
AppComponentModule.decorators = [
    { type: NgModule, args: [{
                imports: [SharedModule, CoreModule],
                declarations: [AppComponent],
                exports: [AppComponent],
            },] }
];

/**
 * @description
 * A base class for entity detail views. It should be used in conjunction with the
 * {@link BaseEntityResolver}.
 *
 * @example
 * ```TypeScript
 * \@Component({
 *   selector: 'app-my-entity',
 *   templateUrl: './my-entity.component.html',
 *   styleUrls: ['./my-entity.component.scss'],
 *   changeDetection: ChangeDetectionStrategy.OnPush,
 * })
 * export class GlobalSettingsComponent extends BaseDetailComponent<MyEntity.Fragment> implements OnInit {
 *   detailForm: FormGroup;
 *
 *   constructor(
 *     router: Router,
 *     route: ActivatedRoute,
 *     serverConfigService: ServerConfigService,
 *     protected dataService: DataService,
 *     private formBuilder: FormBuilder,
 *   ) {
 *     super(route, router, serverConfigService, dataService);
 *     this.detailForm = this.formBuilder.group({
 *       name: [''],
 *     });
 *   }
 *
 *   protected setFormValues(entity: MyEntity.Fragment, languageCode: LanguageCode): void {
 *     this.detailForm.patchValue({
 *       name: entity.name,
 *     });
 *   }
 * }
 * ```
 *
 * @docsCategory list-detail-views
 */
class BaseDetailComponent {
    constructor(route, router, serverConfigService, dataService) {
        this.route = route;
        this.router = router;
        this.serverConfigService = serverConfigService;
        this.dataService = dataService;
        this.destroy$ = new Subject();
    }
    init() {
        this.entity$ = this.route.data.pipe(switchMap(data => data.entity.pipe(takeUntil(this.destroy$))), tap(entity => (this.id = entity.id)), shareReplay(1));
        this.isNew$ = this.entity$.pipe(map(entity => entity.id === ''), shareReplay(1));
        this.languageCode$ = this.route.paramMap.pipe(map(paramMap => paramMap.get('lang')), switchMap(lang => {
            if (lang) {
                return of(lang);
            }
            else {
                return this.dataService.client.uiState().mapSingle(data => data.uiState.contentLanguage);
            }
        }), distinctUntilChanged(), shareReplay(1));
        this.availableLanguages$ = this.serverConfigService.getAvailableLanguages();
        combineLatest(this.entity$, this.languageCode$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(([entity, languageCode]) => {
            this.setFormValues(entity, languageCode);
            this.detailForm.markAsPristine();
        });
    }
    destroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    setLanguage(code) {
        this.setQueryParam('lang', code);
        this.dataService.client.setContentLanguage(code).subscribe();
    }
    canDeactivate() {
        return this.detailForm && this.detailForm.pristine;
    }
    setCustomFieldFormValues(customFields, formGroup, entity, currentTranslation) {
        var _a, _b, _c;
        for (const fieldDef of customFields) {
            const key = fieldDef.name;
            const value = fieldDef.type === 'localeString'
                ? (_b = (_a = currentTranslation) === null || _a === void 0 ? void 0 : _a.customFields) === null || _b === void 0 ? void 0 : _b[key]
                : (_c = entity.customFields) === null || _c === void 0 ? void 0 : _c[key];
            const control = formGroup === null || formGroup === void 0 ? void 0 : formGroup.get(key);
            if (control) {
                control.patchValue(value);
            }
        }
    }
    getCustomFieldConfig(key) {
        return this.serverConfigService.getCustomFieldsFor(key);
    }
    setQueryParam(key, value) {
        this.router.navigate([
            './',
            Object.assign(Object.assign({}, this.route.snapshot.params), { [key]: value }),
        ], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
        });
    }
}

function createResolveData(resolver) {
    return {
        entity: resolver,
    };
}
/**
 * @description
 * A base resolver for an entity detail route. Resolves to an observable of the given entity, or a "blank"
 * version if the route id equals "create". Should be used together with details views which extend the
 * {@link BaseDetailComponent}.
 *
 * @example
 * ```TypeScript
 * \@Injectable({
 *   providedIn: 'root',
 * })
 * export class MyEntityResolver extends BaseEntityResolver<MyEntity.Fragment> {
 *   constructor(router: Router, dataService: DataService) {
 *     super(
 *       router,
 *       {
 *         __typename: 'MyEntity',
 *         id: '',
 *         createdAt: '',
 *         updatedAt: '',
 *         name: '',
 *       },
 *       id => dataService.query(GET_MY_ENTITY, { id }).mapStream(data => data.myEntity),
 *     );
 *   }
 * }
 * ```
 *
 * @docsCategory list-detail-views
 */
class BaseEntityResolver {
    constructor(router, emptyEntity, entityStream) {
        this.router = router;
        this.emptyEntity = emptyEntity;
        this.entityStream = entityStream;
    }
    /** @internal */
    resolve(route, state) {
        const id = route.paramMap.get('id');
        // Complete the entity stream upon navigating away
        const navigateAway$ = this.router.events.pipe(filter(event => event instanceof ActivationStart));
        if (id === 'create') {
            return of(of(this.emptyEntity));
        }
        else {
            const stream = this.entityStream(id || '').pipe(takeUntil(navigateAway$), filter(notNullOrUndefined), shareReplay(1));
            return stream.pipe(take(1), map(() => stream));
        }
    }
}

/**
 * @description
 * This is a base class which implements the logic required to fetch and manipulate
 * a list of data from a query which returns a PaginatedList type.
 *
 * @example
 * ```TypeScript
 * \@Component({
 *   selector: 'my-entity-list',
 *   templateUrl: './my-entity-list.component.html',
 *   styleUrls: ['./my-entity-list.component.scss'],
 *   changeDetection: ChangeDetectionStrategy.OnPush,
 * })
 * export class MyEntityListComponent extends BaseListComponent<GetMyEntityList.Query, GetMyEntityList.Items> {
 *   constructor(
 *     private dataService: DataService,
 *     router: Router,
 *     route: ActivatedRoute,
 *   ) {
 *     super(router, route);
 *     super.setQueryFn(
 *       (...args: any[]) => this.dataService.query<GetMyEntityList.Query>(GET_MY_ENTITY_LIST),
 *       data => data.myEntities,
 *     );
 *   }
 * }
 * ```
 *
 * The template for the component will typically use the {@link DataTableComponent} to display the results.
 *
 * @example
 * ```HTML
 * <vdr-action-bar>
 *   <vdr-ab-right>
 *     <a class="btn btn-primary" [routerLink]="['./create']" *vdrIfPermissions="['CreateSettings', 'CreateTaxRate']">
 *       <clr-icon shape="plus"></clr-icon>
 *       Create new my entity
 *     </a>
 *   </vdr-ab-right>
 * </vdr-action-bar>
 *
 * <vdr-data-table
 *   [items]="items$ | async"
 *   [itemsPerPage]="itemsPerPage$ | async"
 *   [totalItems]="totalItems$ | async"
 *   [currentPage]="currentPage$ | async"
 *   (pageChange)="setPageNumber($event)"
 *   (itemsPerPageChange)="setItemsPerPage($event)"
 * >
 *   <vdr-dt-column>{{ 'common.name' | translate }}</vdr-dt-column>
 *   <vdr-dt-column></vdr-dt-column>
 *   <ng-template let-myEntity="item">
 *     <td class="left align-middle">{{ myEntity.name }}</td>
 *     <td class="right align-middle">
 *       <vdr-table-row-action
 *         iconShape="edit"
 *         [label]="'common.edit' | translate"
 *         [linkTo]="['./', myEntity.id]"
 *       ></vdr-table-row-action>
 *     </td>
 *   </ng-template>
 * </vdr-data-table>
 * ```
 *
 * @docsCategory list-detail-views
 */
// tslint:disable-next-line:directive-class-suffix
class BaseListComponent {
    constructor(router, route) {
        this.router = router;
        this.route = route;
        this.destroy$ = new Subject();
        this.onPageChangeFn = (skip, take) => ({ options: { skip, take } });
        this.refresh$ = new BehaviorSubject(undefined);
        this.defaults = { take: 10, skip: 0 };
    }
    /**
     * @description
     * Sets the fetch function for the list being implemented.
     */
    setQueryFn(listQueryFn, mappingFn, onPageChangeFn, defaults) {
        this.listQueryFn = listQueryFn;
        this.mappingFn = mappingFn;
        if (onPageChangeFn) {
            this.onPageChangeFn = onPageChangeFn;
        }
        if (defaults) {
            this.defaults = defaults;
        }
    }
    /** @internal */
    ngOnInit() {
        if (!this.listQueryFn) {
            throw new Error(`No listQueryFn has been defined. Please call super.setQueryFn() in the constructor.`);
        }
        this.listQuery = this.listQueryFn(this.defaults.take, this.defaults.skip);
        const fetchPage = ([currentPage, itemsPerPage, _]) => {
            const take = itemsPerPage;
            const skip = (currentPage - 1) * itemsPerPage;
            this.listQuery.ref.refetch(this.onPageChangeFn(skip, take));
        };
        this.result$ = this.listQuery.stream$.pipe(shareReplay(1));
        this.items$ = this.result$.pipe(map(data => this.mappingFn(data).items));
        this.totalItems$ = this.result$.pipe(map(data => this.mappingFn(data).totalItems));
        this.currentPage$ = this.route.queryParamMap.pipe(map(qpm => qpm.get('page')), map(page => (!page ? 1 : +page)), distinctUntilChanged());
        this.itemsPerPage$ = this.route.queryParamMap.pipe(map(qpm => qpm.get('perPage')), map(perPage => (!perPage ? this.defaults.take : +perPage)), distinctUntilChanged());
        combineLatest(this.currentPage$, this.itemsPerPage$, this.refresh$)
            .pipe(takeUntil(this.destroy$))
            .subscribe(fetchPage);
    }
    /** @internal */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.listQuery.completed$.next();
    }
    /**
     * @description
     * Sets the current page number in the url.
     */
    setPageNumber(page) {
        this.setQueryParam('page', page, { replaceUrl: true });
    }
    /**
     * @description
     * Sets the number of items per page in the url.
     */
    setItemsPerPage(perPage) {
        this.setQueryParam('perPage', perPage, { replaceUrl: true });
    }
    /**
     * @description
     * Re-fetch the current page of results.
     */
    refresh() {
        this.refresh$.next(undefined);
    }
    setQueryParam(keyOrHash, valueOrOptions, maybeOptions) {
        var _a;
        const paramsObject = typeof keyOrHash === 'string' ? { [keyOrHash]: valueOrOptions } : keyOrHash;
        const options = (_a = (typeof keyOrHash === 'string' ? maybeOptions : valueOrOptions)) !== null && _a !== void 0 ? _a : {};
        this.router.navigate(['./'], Object.assign({ queryParams: typeof keyOrHash === 'string' ? { [keyOrHash]: valueOrOptions } : keyOrHash, relativeTo: this.route, queryParamsHandling: 'merge' }, options));
    }
}
BaseListComponent.decorators = [
    { type: Directive }
];
BaseListComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute }
];

/**
 * Creates an observable of breadcrumb links for use in the route config of a detail route.
 */
function detailBreadcrumb(options) {
    return options.entity.pipe(map(entity => {
        let label = '';
        if (options.id === 'create') {
            label = 'common.create';
        }
        else {
            label = `${options.getName(entity)}`;
        }
        return [
            {
                label: options.breadcrumbKey,
                link: ['../', options.route],
            },
            {
                label,
                link: [options.route, options.id],
            },
        ];
    }));
}

/**
 * @description
 * Resolves to an object containing the Channel code of the given channelId, or if no channelId
 * is supplied, the code of the activeChannel.
 */
function getChannelCodeFromUserStatus(dataService, channelId) {
    return dataService.client
        .userStatus()
        .mapSingle(({ userStatus }) => {
        var _a, _b;
        const channelCode = (_b = (_a = userStatus.channels.find(c => c.id === (channelId !== null && channelId !== void 0 ? channelId : userStatus.activeChannelId))) === null || _a === void 0 ? void 0 : _a.code) !== null && _b !== void 0 ? _b : 'undefined';
        return { channelCode };
    })
        .toPromise();
}
/**
 * @description
 * Resolves to `true` if multiple Channels are set up.
 */
function isMultiChannel(dataService) {
    return dataService.client
        .userStatus()
        .mapSingle(({ userStatus }) => 1 < userStatus.channels.length)
        .toPromise();
}
/**
 * @description
 * Resolves to `true` if the current active Channel is not the default Channel.
 */
function currentChannelIsNotDefault(dataService) {
    return dataService.client
        .userStatus()
        .mapSingle(({ userStatus }) => {
        var _a;
        if (userStatus.channels.length === 1) {
            return false;
        }
        const defaultChannelId = (_a = userStatus.channels.find(c => c.code === DEFAULT_CHANNEL_CODE)) === null || _a === void 0 ? void 0 : _a.id;
        return userStatus.activeChannelId !== defaultChannelId;
    })
        .toPromise();
}

/**
 * @description
 * Given a translatable entity, returns the translation in the specified LanguageCode if
 * one exists.
 */
function findTranslation(entity, languageCode) {
    return ((entity === null || entity === void 0 ? void 0 : entity.translations) || []).find(t => t.languageCode === languageCode);
}

/**
 * When updating an entity which has translations, the value from the form will pertain to the current
 * languageCode. This function ensures that the "translations" array is correctly set based on the
 * existing languages and the updated values in the specified language.
 */
function createUpdatedTranslatable(options) {
    const { translatable, updatedFields, languageCode, customFieldConfig, defaultTranslation } = options;
    const currentTranslation = findTranslation(translatable, languageCode) || defaultTranslation || {};
    const index = translatable.translations.indexOf(currentTranslation);
    const newTranslation = patchObject(currentTranslation, updatedFields);
    const newCustomFields = {};
    const newTranslatedCustomFields = {};
    if (customFieldConfig && updatedFields.hasOwnProperty('customFields')) {
        for (const field of customFieldConfig) {
            const value = updatedFields.customFields[field.name];
            if (field.type === 'localeString') {
                newTranslatedCustomFields[field.name] = value;
            }
            else {
                newCustomFields[field.name] =
                    value === '' ? getDefaultValue(field.type) : value;
            }
        }
        newTranslation.customFields = newTranslatedCustomFields;
    }
    const newTranslatable = Object.assign(Object.assign({}, patchObject(translatable, updatedFields)), { translations: translatable.translations.slice() });
    if (customFieldConfig) {
        newTranslatable.customFields = newCustomFields;
    }
    if (index !== -1) {
        newTranslatable.translations.splice(index, 1, newTranslation);
    }
    else {
        newTranslatable.translations.push(newTranslation);
    }
    return newTranslatable;
}
function getDefaultValue(type) {
    switch (type) {
        case 'localeString':
        case 'string':
        case 'text':
            return '';
        case 'boolean':
            return false;
        case 'float':
        case 'int':
            return 0;
        case 'datetime':
            return new Date();
        case 'relation':
            return null;
        default:
            assertNever(type);
    }
}
/**
 * Returns a shallow clone of `obj` with any properties contained in `patch` overwriting
 * those of `obj`.
 */
function patchObject(obj, patch) {
    const clone = Object.assign({}, obj);
    Object.keys(clone).forEach(key => {
        if (patch.hasOwnProperty(key)) {
            clone[key] = patch[key];
        }
    });
    return clone;
}

// Auto-generated by the set-version.js script.
const ADMIN_UI_VERSION = '1.8.1';

/**
 * @description
 * Registers a custom {@link BulkAction} which can be invoked from the bulk action menu
 * of any supported list view.
 *
 * This allows you to provide custom functionality that can operate on any of the selected
 * items in the list view.
 *
 * In this example, imagine we have an integration with a 3rd-party text translation service. This
 * bulk action allows us to select multiple products from the product list view, and send them for
 * translation via a custom service which integrates with the translation service's API.
 *
 * @example
 * ```TypeScript
 * import { NgModule } from '\@angular/core';
 * import { ModalService, registerBulkAction, SharedModule } from '\@vendure/admin-ui/core';
 *
 * \@NgModule({
 *   imports: [SharedModule],
 *   providers: [
 *     ProductDataTranslationService,
 *     registerBulkAction({
 *       location: 'product-list',
 *       label: 'Send to translation service',
 *       icon: 'language',
 *       onClick: ({ injector, selection }) => {
 *         const modalService = injector.get(ModalService);
 *         const translationService = injector.get(ProductDataTranslationService);
 *         modalService
 *           .dialog({
 *             title: `Send ${selection.length} products for translation?`,
 *             buttons: [
 *               { type: 'secondary', label: 'cancel' },
 *               { type: 'primary', label: 'send', returnValue: true },
 *             ],
 *           })
 *           .subscribe(response => {
 *             if (response) {
 *               translationService.sendForTranslation(selection.map(item => item.productId));
 *             }
 *           });
 *       },
 *     }),
 *   ],
 * })
 * export class MyUiExtensionModule {}
 * ```
 * @since 1.8.0
 * @docsCategory bulk-actions
 */
function registerBulkAction(bulkAction) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (registry) => () => {
            registry.registerBulkAction(bulkAction);
        },
        deps: [BulkActionRegistryService],
    };
}

/**
 * Responsible for registering dashboard widget components and querying for layouts.
 */
class DashboardWidgetService {
    constructor() {
        this.registry = new Map();
        this.layoutDef = [];
    }
    registerWidget(id, config) {
        if (this.registry.has(id)) {
            throw new Error(`A dashboard widget with the id "${id}" already exists`);
        }
        this.registry.set(id, config);
    }
    getAvailableIds(currentUserPermissions) {
        const hasAllPermissions = (requiredPerms, userPerms) => {
            return requiredPerms.every(p => userPerms.includes(p));
        };
        return [...this.registry.entries()]
            .filter(([id, config]) => {
            return (!config.requiresPermissions ||
                hasAllPermissions(config.requiresPermissions, currentUserPermissions));
        })
            .map(([id]) => id);
    }
    getWidgetById(id) {
        return this.registry.get(id);
    }
    setDefaultLayout(layout) {
        this.layoutDef = layout;
    }
    getDefaultLayout() {
        return this.layoutDef;
    }
    getWidgetLayout(layoutDef) {
        const intermediateLayout = (layoutDef || this.layoutDef)
            .map(({ id, width }) => {
            const config = this.registry.get(id);
            if (!config) {
                return this.idNotFound(id);
            }
            return { id, config, width: this.getValidWidth(id, config, width) };
        })
            .filter(notNullOrUndefined);
        return this.buildLayout(intermediateLayout);
    }
    idNotFound(id) {
        // tslint:disable-next-line:no-console
        console.error(`No dashboard widget was found with the id "${id}"\nAvailable ids: ${[...this.registry.keys()]
            .map(_id => `"${_id}"`)
            .join(', ')}`);
        return;
    }
    getValidWidth(id, config, targetWidth) {
        var _a;
        let adjustedWidth = targetWidth;
        const supportedWidths = ((_a = config.supportedWidths) === null || _a === void 0 ? void 0 : _a.length)
            ? config.supportedWidths
            : [3, 4, 6, 8, 12];
        if (!supportedWidths.includes(targetWidth)) {
            // Fall back to the largest supported width
            const sortedWidths = supportedWidths.sort((a, b) => a - b);
            const fallbackWidth = supportedWidths[sortedWidths.length - 1];
            // tslint:disable-next-line:no-console
            console.error(`The "${id}" widget does not support the specified width (${targetWidth}).\nSupported widths are: [${sortedWidths.join(', ')}].\nUsing (${fallbackWidth}) instead.`);
            adjustedWidth = fallbackWidth;
        }
        return adjustedWidth;
    }
    buildLayout(intermediateLayout) {
        const layout = [];
        let row = [];
        for (const { id, config, width } of intermediateLayout) {
            const rowSize = row.reduce((size, c) => size + c.width, 0);
            if (12 < rowSize + width) {
                layout.push(row);
                row = [];
            }
            row.push({ id, config, width });
        }
        layout.push(row);
        return layout;
    }
}
DashboardWidgetService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DashboardWidgetService_Factory() { return new DashboardWidgetService(); }, token: DashboardWidgetService, providedIn: "root" });
DashboardWidgetService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];

/**
 * @description
 * Registers a dashboard widget. Once registered, the widget can be set as part of the default
 * (using {@link setDashboardWidgetLayout}).
 */
function registerDashboardWidget(id, config) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (dashboardWidgetService) => () => {
            dashboardWidgetService.registerWidget(id, config);
        },
        deps: [DashboardWidgetService],
    };
}
/**
 * @description
 * Sets the default widget layout for the Admin UI dashboard.
 */
function setDashboardWidgetLayout(layoutDef) {
    return {
        provide: APP_INITIALIZER,
        multi: true,
        useFactory: (dashboardWidgetService) => () => {
            dashboardWidgetService.setDefaultLayout(layoutDef);
        },
        deps: [DashboardWidgetService],
    };
}

/**
 * This guard prevents unauthorized users from accessing any routes which require
 * authorization.
 */
class AuthGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
        this.externalLoginUrl = getAppConfig().loginUrl;
    }
    canActivate(route) {
        return this.authService.checkAuthenticatedStatus().pipe(tap(authenticated => {
            if (!authenticated) {
                if (this.externalLoginUrl) {
                    window.location.href = this.externalLoginUrl;
                }
                else {
                    this.router.navigate(['/login']);
                }
            }
        }));
    }
}
AuthGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function AuthGuard_Factory() { return new AuthGuard(i0.ɵɵinject(i1$4.Router), i0.ɵɵinject(AuthService)); }, token: AuthGuard, providedIn: "root" });
AuthGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
AuthGuard.ctorParameters = () => [
    { type: Router },
    { type: AuthService }
];

class ExtensionHostConfig {
    constructor(options) {
        this.extensionUrl = options.extensionUrl;
        this.openInNewTab = options.openInNewTab != null ? options.openInNewTab : false;
    }
}

/**
 * This function is used to conveniently configure a UI extension route to
 * host an external URL from the Admin UI using the {@link ExtensionHostComponent}
 *
 * @example
 * ```TypeScript
 * \@NgModule({
 *     imports: [
 *         RouterModule.forChild([
 *             hostExternalFrame({
 *                 path: '',
 *                 breadcrumbLabel: 'Vue.js App',
 *                 extensionUrl: './assets/vue-app/index.html',
 *                 openInNewTab: false,
 *             }),
 *         ]),
 *     ],
 * })
 export class VueUiExtensionModule {}
 * ```
 */
function hostExternalFrame(options) {
    const pathMatch = options.path === '' ? 'full' : 'prefix';
    return {
        path: options.path,
        pathMatch,
        component: ExtensionHostComponent,
        data: {
            breadcrumb: [
                {
                    label: options.breadcrumbLabel,
                    link: ['./'],
                },
            ],
            extensionHostConfig: new ExtensionHostConfig(options),
        },
    };
}

function unicodePatternValidator(patternRe) {
    const unicodeRe = patternRe.unicode ? patternRe : new RegExp(patternRe, 'u');
    return (control) => {
        const valid = unicodeRe.test(control.value);
        return valid ? null : { pattern: { value: control.value } };
    };
}

// This file was generated by the build-public-api.ts script

/**
 * Generated bundle index. Do not edit.
 */

export { ADDRESS_FRAGMENT, ADD_CUSTOMERS_TO_GROUP, ADD_ITEM_TO_DRAFT_ORDER, ADD_MANUAL_PAYMENT_TO_ORDER, ADD_MEMBERS_TO_ZONE, ADD_NOTE_TO_CUSTOMER, ADD_NOTE_TO_ORDER, ADD_OPTION_GROUP_TO_PRODUCT, ADD_OPTION_TO_GROUP, ADJUST_DRAFT_ORDER_LINE, ADMINISTRATOR_FRAGMENT, ADMIN_UI_VERSION, ALL_CUSTOM_FIELDS_FRAGMENT, APPLY_COUPON_CODE_TO_DRAFT_ORDER, ASSET_FRAGMENT, ASSIGN_COLLECTIONS_TO_CHANNEL, ASSIGN_FACETS_TO_CHANNEL, ASSIGN_PRODUCTS_TO_CHANNEL, ASSIGN_ROLE_TO_ADMINISTRATOR, ASSIGN_VARIANTS_TO_CHANNEL, ATTEMPT_LOGIN, AUTH_REDIRECT_PARAM, ActionBarComponent, ActionBarItemsComponent, ActionBarLeftComponent, ActionBarRightComponent, AddressFormComponent, AdjustmentType, AdministratorDataService, AffixedInputComponent, AppComponent, AppComponentModule, AppShellComponent, AssetFileInputComponent, AssetGalleryComponent, AssetPickerDialogComponent, AssetPreviewComponent, AssetPreviewDialogComponent, AssetPreviewLinksComponent, AssetPreviewPipe, AssetSearchInputComponent, AssetType, AuthDataService, AuthGuard, AuthService, BOOLEAN_CUSTOM_FIELD_FRAGMENT, BaseCodeEditorFormInputComponent, BaseDataService, BaseDetailComponent, BaseEntityResolver, BaseListComponent, BooleanFormInputComponent, BreadcrumbComponent, BulkActionMenuComponent, BulkActionRegistryService, CANCEL_JOB, CANCEL_ORDER, CANCEL_PAYMENT, CHANNEL_FRAGMENT, COLLECTION_FRAGMENT, CONFIGURABLE_OPERATION_DEF_FRAGMENT, CONFIGURABLE_OPERATION_FRAGMENT, COUNTRY_FRAGMENT, CREATE_ADMINISTRATOR, CREATE_ASSETS, CREATE_CHANNEL, CREATE_COLLECTION, CREATE_COUNTRY, CREATE_CUSTOMER, CREATE_CUSTOMER_ADDRESS, CREATE_CUSTOMER_GROUP, CREATE_DRAFT_ORDER, CREATE_FACET, CREATE_FACET_VALUES, CREATE_FULFILLMENT, CREATE_PAYMENT_METHOD, CREATE_PRODUCT, CREATE_PRODUCT_OPTION_GROUP, CREATE_PRODUCT_VARIANTS, CREATE_PROMOTION, CREATE_ROLE, CREATE_SHIPPING_METHOD, CREATE_TAG, CREATE_TAX_CATEGORY, CREATE_TAX_RATE, CREATE_ZONE, CURRENT_USER_FRAGMENT, CUSTOMER_FRAGMENT, CUSTOMER_GROUP_FRAGMENT, CUSTOM_FIELD_CONFIG_FRAGMENT, CanDeactivateDetailGuard, CdTimerComponent, ChannelAssignmentControlComponent, ChannelBadgeComponent, ChannelLabelPipe, ChannelSwitcherComponent, CheckJobsLink, ChipComponent, ClientDataService, CollectionDataService, CombinationModeFormInputComponent, ComponentRegistryService, ConfigurableInputComponent, ContextMenuComponent, ContextMenuService, CoreModule, CurrencyCode, CurrencyFormInputComponent, CurrencyInputComponent, CustomDetailComponentHostComponent, CustomDetailComponentService, CustomFieldComponentService, CustomFieldControlComponent, CustomFieldLabelPipe, CustomHttpTranslationLoader, CustomerDataService, CustomerGroupFormInputComponent, CustomerLabelComponent, DATE_TIME_CUSTOM_FIELD_FRAGMENT, DELETE_ADMINISTRATOR, DELETE_ASSETS, DELETE_CHANNEL, DELETE_COLLECTION, DELETE_COLLECTIONS, DELETE_COUNTRY, DELETE_CUSTOMER, DELETE_CUSTOMER_ADDRESS, DELETE_CUSTOMER_GROUP, DELETE_CUSTOMER_NOTE, DELETE_DRAFT_ORDER, DELETE_FACET, DELETE_FACETS, DELETE_FACET_VALUES, DELETE_ORDER_NOTE, DELETE_PAYMENT_METHOD, DELETE_PRODUCT, DELETE_PRODUCTS, DELETE_PRODUCT_OPTION, DELETE_PRODUCT_VARIANT, DELETE_PROMOTION, DELETE_ROLE, DELETE_SHIPPING_METHOD, DELETE_TAG, DELETE_TAX_CATEGORY, DELETE_TAX_RATE, DELETE_ZONE, DISCOUNT_FRAGMENT, DRAFT_ORDER_ELIGIBLE_SHIPPING_METHODS, DashboardWidgetService, DataModule, DataService, DataTableColumnComponent, DataTableComponent, DateFormInputComponent, DatetimePickerComponent, DatetimePickerService, DefaultInterceptor, DeletionResult, DialogButtonsDirective, DialogComponentOutletComponent, DialogTitleDirective, DisabledDirective, DropdownComponent, DropdownItemDirective, DropdownMenuComponent, DropdownTriggerDirective, DurationPipe, DynamicFormInputComponent, ERROR_RESULT_FRAGMENT, EditNoteDialogComponent, EmptyPlaceholderComponent, EntityInfoComponent, ErrorCode, ExtensionHostComponent, ExtensionHostConfig, ExtensionHostService, ExternalImageDialogComponent, FACET_VALUE_FRAGMENT, FACET_WITH_VALUES_FRAGMENT, FLOAT_CUSTOM_FIELD_FRAGMENT, FULFILLMENT_FRAGMENT, FacetDataService, FacetValueChipComponent, FacetValueFormInputComponent, FacetValueSelectorComponent, FetchAdapter, FileSizePipe, FocalPointControlComponent, FormFieldComponent, FormFieldControlDirective, FormItemComponent, FormattedAddressComponent, GET_ACTIVE_ADMINISTRATOR, GET_ACTIVE_CHANNEL, GET_ADJUSTMENT_OPERATIONS, GET_ADMINISTRATOR, GET_ADMINISTRATORS, GET_ASSET, GET_ASSET_LIST, GET_AVAILABLE_COUNTRIES, GET_CHANNEL, GET_CHANNELS, GET_CLIENT_STATE, GET_COLLECTION, GET_COLLECTION_CONTENTS, GET_COLLECTION_FILTERS, GET_COLLECTION_LIST, GET_COUNTRY, GET_COUNTRY_LIST, GET_CURRENT_USER, GET_CUSTOMER, GET_CUSTOMER_GROUPS, GET_CUSTOMER_GROUP_WITH_CUSTOMERS, GET_CUSTOMER_HISTORY, GET_CUSTOMER_LIST, GET_FACET_LIST, GET_FACET_WITH_VALUES, GET_GLOBAL_SETTINGS, GET_JOBS_BY_ID, GET_JOBS_LIST, GET_JOB_INFO, GET_JOB_QUEUE_LIST, GET_NEWTORK_STATUS, GET_ORDER, GET_ORDERS_LIST, GET_ORDER_HISTORY, GET_ORDER_SUMMARY, GET_PAYMENT_METHOD, GET_PAYMENT_METHOD_LIST, GET_PAYMENT_METHOD_OPERATIONS, GET_PENDING_SEARCH_INDEX_UPDATES, GET_PRODUCT_LIST, GET_PRODUCT_OPTION_GROUP, GET_PRODUCT_OPTION_GROUPS, GET_PRODUCT_SIMPLE, GET_PRODUCT_VARIANT, GET_PRODUCT_VARIANT_LIST, GET_PRODUCT_VARIANT_LIST_SIMPLE, GET_PRODUCT_VARIANT_OPTIONS, GET_PRODUCT_WITH_VARIANTS, GET_PROMOTION, GET_PROMOTION_LIST, GET_ROLE, GET_ROLES, GET_SERVER_CONFIG, GET_SHIPPING_METHOD, GET_SHIPPING_METHOD_LIST, GET_SHIPPING_METHOD_OPERATIONS, GET_TAG, GET_TAG_LIST, GET_TAX_CATEGORIES, GET_TAX_CATEGORY, GET_TAX_RATE, GET_TAX_RATE_LIST, GET_TAX_RATE_LIST_SIMPLE, GET_UI_STATE, GET_USER_STATUS, GET_ZONE, GET_ZONES, GLOBAL_SETTINGS_FRAGMENT, GlobalFlag, HasPermissionPipe, HealthCheckService, HelpTooltipComponent, HistoryEntryDetailComponent, HistoryEntryType, HtmlEditorFormInputComponent, HttpLoaderFactory, I18nService, INT_CUSTOM_FIELD_FRAGMENT, IconSize, IfDefaultChannelActiveDirective, IfDirectiveBase, IfMultichannelDirective, IfPermissionsDirective, InjectableTranslateMessageFormatCompiler, ItemsPerPageControlsComponent, JOB_INFO_FRAGMENT, JobQueueService, JobState, JsonEditorFormInputComponent, LOCALE_STRING_CUSTOM_FIELD_FRAGMENT, LOG_OUT, LabeledDataComponent, LanguageCode, LanguageSelectorComponent, LinkDialogComponent, LocalStorageService, LocaleBasePipe, LocaleCurrencyNamePipe, LocaleCurrencyPipe, LocaleDatePipe, LocaleLanguageNamePipe, LocaleRegionNamePipe, LogicalOperator, MODIFY_ORDER, MOVE_COLLECTION, MainNavComponent, ManageTagsDialogComponent, ModalDialogComponent, ModalService, NavBuilderService, NotificationComponent, NotificationService, NumberFormInputComponent, ORDER_ADDRESS_FRAGMENT, ORDER_DETAIL_FRAGMENT, ORDER_FRAGMENT, ORDER_LINE_FRAGMENT, ObjectTreeComponent, OmitTypenameLink, OrderDataService, OrderLabelComponent, OrderStateLabelComponent, OverlayHostComponent, OverlayHostService, PAYMENT_FRAGMENT, PAYMENT_METHOD_FRAGMENT, PREVIEW_COLLECTION_CONTENTS, PRODUCT_DETAIL_FRAGMENT, PRODUCT_OPTION_FRAGMENT, PRODUCT_OPTION_GROUP_FRAGMENT, PRODUCT_OPTION_GROUP_WITH_OPTIONS_FRAGMENT, PRODUCT_SELECTOR_SEARCH, PRODUCT_VARIANT_FRAGMENT, PROMOTION_FRAGMENT, PaginationControlsComponent, PasswordFormInputComponent, PercentageSuffixInputComponent, Permission, ProductDataService, ProductMultiSelectorDialogComponent, ProductMultiSelectorFormInputComponent, ProductSearchInputComponent, ProductSelectorComponent, ProductSelectorFormInputComponent, PromotionDataService, ProsemirrorService, QueryResult, REFUND_FRAGMENT, REFUND_ORDER, REINDEX, RELATION_CUSTOM_FIELD_FRAGMENT, REMOVE_COLLECTIONS_FROM_CHANNEL, REMOVE_COUPON_CODE_FROM_DRAFT_ORDER, REMOVE_CUSTOMERS_FROM_GROUP, REMOVE_DRAFT_ORDER_LINE, REMOVE_FACETS_FROM_CHANNEL, REMOVE_MEMBERS_FROM_ZONE, REMOVE_OPTION_GROUP_FROM_PRODUCT, REMOVE_PRODUCTS_FROM_CHANNEL, REMOVE_VARIANTS_FROM_CHANNEL, REQUEST_COMPLETED, REQUEST_STARTED, ROLE_FRAGMENT, RUN_PENDING_SEARCH_INDEX_UPDATES, RadioCardComponent, RadioCardFieldsetComponent, RawHtmlDialogComponent, RelationAssetInputComponent, RelationCardComponent, RelationCardDetailDirective, RelationCardPreviewDirective, RelationCustomerInputComponent, RelationFormInputComponent, RelationGenericInputComponent, RelationProductInputComponent, RelationProductVariantInputComponent, RelationSelectorDialogComponent, RichTextEditorComponent, RichTextFormInputComponent, SEARCH_PRODUCTS, SETTLE_PAYMENT, SETTLE_REFUND, SET_ACTIVE_CHANNEL, SET_AS_LOGGED_IN, SET_AS_LOGGED_OUT, SET_BILLING_ADDRESS_FOR_DRAFT_ORDER, SET_CONTENT_LANGUAGE, SET_CUSTOMER_FOR_DRAFT_ORDER, SET_DISPLAY_UI_EXTENSION_POINTS, SET_DRAFT_ORDER_SHIPPING_METHOD, SET_SHIPPING_ADDRESS_FOR_DRAFT_ORDER, SET_UI_LANGUAGE_AND_LOCALE, SET_UI_LOCALE, SET_UI_THEME, SHIPPING_METHOD_FRAGMENT, STRING_CUSTOM_FIELD_FRAGMENT, SelectFormInputComponent, SelectToggleComponent, SelectionManager, SentenceCasePipe, ServerConfigService, SettingsDataService, SharedModule, ShippingMethodDataService, SimpleDialogComponent, SingleSearchSelectionModel, SingleSearchSelectionModelFactory, SortOrder, SortPipe, StateI18nTokenPipe, StatusBadgeComponent, StockMovementType, StringToColorPipe, SubMenuWithIcon, TAG_FRAGMENT, TAX_CATEGORY_FRAGMENT, TAX_RATE_FRAGMENT, TEST_ELIGIBLE_SHIPPING_METHODS, TEST_SHIPPING_METHOD, TEXT_CUSTOM_FIELD_FRAGMENT, TRANSITION_FULFILLMENT_TO_STATE, TRANSITION_ORDER_TO_STATE, TRANSITION_PAYMENT_TO_STATE, TabbedCustomFieldsComponent, TableRowActionComponent, TagSelectorComponent, TextFormInputComponent, TextareaFormInputComponent, ThemeSwitcherComponent, TimeAgoPipe, TimelineEntryComponent, TitleInputComponent, UPDATE_ACTIVE_ADMINISTRATOR, UPDATE_ADMINISTRATOR, UPDATE_ASSET, UPDATE_CHANNEL, UPDATE_COLLECTION, UPDATE_COUNTRY, UPDATE_CUSTOMER, UPDATE_CUSTOMER_ADDRESS, UPDATE_CUSTOMER_GROUP, UPDATE_CUSTOMER_NOTE, UPDATE_FACET, UPDATE_FACET_VALUES, UPDATE_GLOBAL_SETTINGS, UPDATE_ORDER_CUSTOM_FIELDS, UPDATE_ORDER_NOTE, UPDATE_PAYMENT_METHOD, UPDATE_PRODUCT, UPDATE_PRODUCT_OPTION, UPDATE_PRODUCT_OPTION_GROUP, UPDATE_PRODUCT_VARIANTS, UPDATE_PROMOTION, UPDATE_ROLE, UPDATE_SHIPPING_METHOD, UPDATE_TAG, UPDATE_TAX_CATEGORY, UPDATE_TAX_RATE, UPDATE_USER_CHANNELS, UPDATE_ZONE, USER_STATUS_FRAGMENT, UiExtensionPointComponent, UiLanguageSwitcherDialogComponent, UserMenuComponent, ZONE_FRAGMENT, addActionBarItem, addCustomFields, addNavMenuItem, addNavMenuSection, addTable, blockQuoteRule, buildInputRules, buildKeymap, buildMenuItems, bulletListRule, canInsert, clientResolvers, codeBlockRule, configurableDefinitionToInstance, configurableOperationValueIsValid, createApollo, createResolveData, createUpdatedTranslatable, currentChannelIsNotDefault, customMenuPlugin, dayOfWeekIndex, defaultFormInputs, detailBreadcrumb, encodeConfigArgValue, findTranslation, flattenFacetValues, getAppConfig, getChannelCodeFromUserStatus, getClientDefaults, getConfigArgValue, getDefaultConfigArgValue, getDefaultUiLanguage, getDefaultUiLocale, getLocales, getMarkRange, getServerLocation, getTableMenu, getTableNodes, headingRule, hostExternalFrame, iframeNode, iframeNodeView, imageContextMenuPlugin, initializeServerConfigService, insertImageItem, interpolateDescription, result as introspectionResult, isEntityCreateOrUpdateMutation, isMultiChannel, jsonValidator, linkItem, linkSelectPlugin, loadAppConfig, markActive, orderedListRule, rawEditorPlugin, registerBulkAction, registerCustomDetailComponent, registerCustomFieldComponent, registerDashboardWidget, registerDefaultFormInputs, registerFormInputComponent, removeReadonlyCustomFields, renderClarityIcon, setDashboardWidgetLayout, stringToColor, tableContextMenuPlugin, toConfigurableOperationInput, transformRelationCustomFieldInputs, unicodePatternValidator, weekDayNames, wrapInMenuItemWithIcon, ɵ1, ɵ10, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9 };
//# sourceMappingURL=vendure-admin-ui-core.js.map
