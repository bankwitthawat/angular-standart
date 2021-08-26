export class AppUserView {
    id?: number = 0;
    username?: string;
    roleId?: number;
    roleDescription?: string;
    fullName?: string;
    birthDate?: string;
    email?: string;
    mobilePhone?: string;
    isActive?: boolean;
    isForceChangePwd?: boolean;
    loginAttemptCount?: number;
    lastLogin?: string;
    lastChangePwd?: string;
    createdBy?: string;
    createdDate?: string;
    modifiedBy?: string;
    modifiedDate?: string;
}

export class AppUserItemView {
    id?: number;
    username?: string;
    roleId?: number;
    roleName?: string;
    roleDescription?: string;
    fName?: string;
    lName?: string;
    birthDate?: string;
    email?: string;
    mobilePhone?: string;
    isActive: boolean;
    isForceChangePwd?: boolean;
    loginAttemptCount?: number;
    lastLogin?: string;
    lastChangePwd?: string;
    createdBy?: string;
    createdDate?: string;
    modifiedBy?: string;
    modifiedDate?: string;
}
