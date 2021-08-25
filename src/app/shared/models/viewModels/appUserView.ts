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
