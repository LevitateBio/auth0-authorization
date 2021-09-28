import { decode } from 'jsonwebtoken';
import { getAccessToken } from '../common/get-access-token';

// Groups
import { getGroups } from '../groups/get-groups';
import { getGroup, Input as IGetGroupInput } from '../groups/get-group';
import { createGroup, Input as ICreateGroupInput } from '../groups/create-group';
import { deleteGroup, Input as IDeleteGroupInput } from '../groups/delete-group';
import { updateGroup, Input as IUpdateGroupInput } from '../groups/update-group';
import { getGroupMembers, Input as IGetGroupMembersInput, Options as IGetGroupMembersOptions } from '../groups/get-group-members';
import { addGroupMembers, Input as IAddGroupMembersInput } from '../groups/add-group-members';
import { deleteGroupMembers, Input as IDeleteGroupMembersInput } from '../groups/delete-group-members';
import { getNestedGroupMembers, Input as IGetNestedGroupMembersInput, Options as IGetNestedGroupMembersOptions } from '../groups/get-nested-group-members';
import { getNestedGroups, Input as IGetNestedGroupsInput } from '../groups/get-nested-groups';
import { addNestedGroups, Input as IAddNestedGroupsInput } from '../groups/add-nested-groups';
import { deleteNestedGroups, Input as IDeleteNestedGroupsInput } from '../groups/delete-nested-groups';
import { getGroupRoles, Input as IGetGroupRolesInput } from '../groups/get-group-roles';
import { addGroupRoles, Input as IAddGroupRolesInput } from '../groups/add-group-roles';
import { deleteGroupRoles, Input as IDeleteGroupRolesInput } from '../groups/delete-group-roles';
import { getNestedGroupRoles, Input as IGetNestedGroupRolesInput } from '../groups/get-nested-group-roles';
// Roles
import { getRoles } from '../roles/get-roles';
import { getRole, Input as IGetRoleInput } from '../roles/get-role';
import { createRole, Input as ICreateRoleInput } from '../roles/create-role';
import { updateRole, Input as IUpdateRoleInput } from '../roles/update-role';
import { deleteRole, Input as IDeleteRoleInput } from '../roles/delete-role';
// Permissions
import { getPermissions } from '../permissions/get-permissions';
import { getPermission, Input as IGetPermissionInput } from '../permissions/get-permission';
import { createPermission, Input as ICreatePermissionInput } from '../permissions/create-permission';
import { updatePermission, Input as IUpdatePermissionInput } from '../permissions/update-permission';
import { deletePermission, Input as IDeletePermissionInput } from '../permissions/delete-permission';
// Users
import { getUsers, Options as IGetUsersOptions } from '../users/get-users';
import { getUser, Input as IGetUserInput } from '../users/get-user';
import { getUserGroups, Input as IGetUserGroupsInput, Options as IGetUserGroupsOptions } from '../users/get-user-groups';
import { addUserToGroups, Input as IAddUserToGroupsInput } from '../users/add-user-to-groups';
import { calculateGroupMemberships, Input as ICalculateGroupMembershipsInput } from '../users/calculate-group-memberships';
import { getUserRoles, Input as IGetUserRolesInput } from '../users/get-user-roles';
import { addUserToRoles, Input as IAddUserToRolesInput } from '../users/add-user-to-roles';
import { removeUserFromRoles, Input as IRemoveUserFromRolesInput } from '../users/remove-user-from-roles';
import { calculateRoles, Input as ICalculateRolesInput } from '../users/calculate-roles';
// Connections
import { getConnections } from '../connections/get-connections';
import { disableConnection, Input as IDisableConnectionInput } from '../connections/disable-connection';
import { enableConnection, Input as IEnableConnectionInput } from '../connections/enable-connection';

export class AuthorizationClient {
  private _options: IAuthorizationClientOptions;

  // Cache access token
  private _accessToken: string;
  private _pendingGetAccessToken: Promise<void> | null = null;

  constructor(options: IAuthorizationClientOptions) {
    this._options = options;
  }

  // Groups

  public async getGroups() {
    return getGroups(this._options.extensionUrl, await this._getAccessToken())();
  }

  public async getGroup(input: IGetGroupInput) {
    return getGroup(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async createGroup(input: ICreateGroupInput) {
    return createGroup(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async deleteGroup(input: IDeleteGroupInput) {
    return deleteGroup(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async updateGroup(input: IUpdateGroupInput) {
    return updateGroup(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async getGroupMembers(input: IGetGroupMembersInput, options?: IGetGroupMembersOptions) {
    return getGroupMembers(this._options.extensionUrl, await this._getAccessToken())(input, options);
  }

  public async addGroupMembers(input: IAddGroupMembersInput) {
    return addGroupMembers(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async deleteGroupMembers(input: IDeleteGroupMembersInput) {
    return deleteGroupMembers(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async getNestedGroupMembers(input: IGetNestedGroupMembersInput, options?: IGetNestedGroupMembersOptions) {
    return getNestedGroupMembers(this._options.extensionUrl, await this._getAccessToken())(input, options);
  }

  public async getNestedGroups(input: IGetNestedGroupsInput) {
    return getNestedGroups(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async addNestedGroups(input: IAddNestedGroupsInput) {
    return addNestedGroups(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async deleteNestedGroups(input: IDeleteNestedGroupsInput) {
    return deleteNestedGroups(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async getGroupRoles(input: IGetGroupRolesInput) {
    return getGroupRoles(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async addGroupRoles(input: IAddGroupRolesInput) {
    return addGroupRoles(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async deleteGroupRoles(input: IDeleteGroupRolesInput) {
    return deleteGroupRoles(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async getNestedGroupRoles(input: IGetNestedGroupRolesInput) {
    return getNestedGroupRoles(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  // Roles

  public async getRoles() {
    return getRoles(this._options.extensionUrl, await this._getAccessToken())();
  }

  public async getRole(input: IGetRoleInput) {
    return getRole(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async createRole(input: ICreateRoleInput) {
    return createRole(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async updateRole(input: IUpdateRoleInput) {
    return updateRole(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async deleteRole(input: IDeleteRoleInput) {
    return deleteRole(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  // Permissions

  public async getPermissions() {
    return getPermissions(this._options.extensionUrl, await this._getAccessToken())();
  }

  public async getPermission(input: IGetPermissionInput) {
    return getPermission(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async createPermission(input: ICreatePermissionInput) {
    return createPermission(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async updatePermission(input: IUpdatePermissionInput) {
    return updatePermission(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async deletePermission(input: IDeletePermissionInput) {
    return deletePermission(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  // Users

  public async getUsers(options?: IGetUsersOptions) {
    return getUsers(this._options.extensionUrl, await this._getAccessToken())(options);
  }

  public async getUser(input: IGetUserInput) {
    return getUser(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async getUserGroups(input: IGetUserGroupsInput, options?: IGetUserGroupsOptions) {
    return getUserGroups(this._options.extensionUrl, await this._getAccessToken())(input, options);
  }

  public async addUserToGroups(input: IAddUserToGroupsInput) {
    return addUserToGroups(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async calculateGroupMemberships(input: ICalculateGroupMembershipsInput) {
    return calculateGroupMemberships(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async getUserRoles(input: IGetUserRolesInput) {
    return getUserRoles(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async addUserToRoles(input: IAddUserToRolesInput) {
    return addUserToRoles(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async removeUserFromRoles(input: IRemoveUserFromRolesInput) {
    return removeUserFromRoles(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async calculateRoles(input: ICalculateRolesInput) {
    return calculateRoles(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  // Connections
  public async getConnections() {
    return getConnections(this._options.extensionUrl, await this._getAccessToken())();
  }

  public async disableConnection(input: IDisableConnectionInput) {
    return disableConnection(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  public async enableConnection(input: IEnableConnectionInput) {
    return enableConnection(this._options.extensionUrl, await this._getAccessToken())(input);
  }

  // Return cached access token unless it does not exist or is expired.
  // If there is a pending request to get access token, wait for that
  // request to finish before continuing.
  protected async _getAccessToken(): Promise<string> {
    if (this._pendingGetAccessToken) {
      await this._pendingGetAccessToken;
    }
    const _getAccessToken = async () => {
      const promise = getAccessToken({
        audience: this._options.audience,
        clientId: this._options.clientId,
        clientSecret: this._options.clientSecret,
        domain: this._options.domain,
      });
      this._pendingGetAccessToken = promise.then(() => {
        this._pendingGetAccessToken = null;
      });
      return this._accessToken = await promise;
    };
    // Get new access token if it does not exist
    if (!this._accessToken) {
      return _getAccessToken();
    }
    // Get new access token if it is expired
    // const tokenPayload = decode(this._accessToken) as {[key: string]: string };
    // const expirationSeconds = parseInt(tokenPayload.exp);
    // const nowSeconds = Date.now().valueOf() / 1000;
    // if (nowSeconds >= expirationSeconds) {
      return _getAccessToken();
    // }
    // Use cached access token
    // return this._accessToken;
  }
}

export interface IAuthorizationClientOptions {
  audience?: string; // optional override
  clientId: string;
  clientSecret: string;
  domain: string;
  extensionUrl: string;
}
