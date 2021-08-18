export interface User {
    userId: number;
    username: string;
    roleId: number;
    roleName: string;
    roleDescription: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    isForceChangePwd?: any;
    loginAttemptCount: number;
    lastLogin: Date;
    token: string;
    refreshToken: string;
    tokenExpire: Date;
    tokenTimeoutMins: number;
    appModule: AppModuleAuthorize[];

    avatar?: string;
    status?: string;
}
export interface AppModuleAuthorize {
    id?: number;
    title?: string;
    subtitle?: string;
    type?: any;
    icon?: any;
    path?: any;
    isActive?: boolean;
    sequence?: number;
    parentID?: any;
    isAccess?: boolean;
    isCreate?: boolean;
    isEdit?: boolean;
    isView?: boolean;
    isDelete?: boolean;
    children?: AppModuleAuthorize[];
}
