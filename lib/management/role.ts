import { SdkResponse, transformResponse } from '@descope/core-js-sdk';
import { CoreSdk } from '../types';
import apiPaths from './paths';
import { Role } from './types';

type MultipleRoleResponse = {
  roles: Role[];
};

const withRole = (sdk: CoreSdk, managementKey?: string) => ({
  create: (
    name: string,
    description?: string,
    permissionNames?: string[],
  ): Promise<SdkResponse<never>> =>
    transformResponse(
      sdk.httpClient.post(
        apiPaths.role.create,
        { name, description, permissionNames },
        { token: managementKey },
      ),
    ),
  update: (
    name: string,
    newName: string,
    description?: string,
    permissionNames?: string[],
  ): Promise<SdkResponse<never>> =>
    transformResponse(
      sdk.httpClient.post(
        apiPaths.role.update,
        { name, newName, description, permissionNames },
        { token: managementKey },
      ),
    ),
  delete: (name: string): Promise<SdkResponse<never>> =>
    transformResponse(
      sdk.httpClient.post(apiPaths.role.delete, { name }, { token: managementKey }),
    ),
  loadAll: (): Promise<SdkResponse<Role[]>> =>
    transformResponse<MultipleRoleResponse, Role[]>(
      sdk.httpClient.get(apiPaths.role.loadAll, {
        token: managementKey,
      }),
      (data) => data.roles,
    ),
});

export default withRole;
