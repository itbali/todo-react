import { rtkApi } from '../../../shared/api/rtkApi.ts';
import { UserType } from '../model/userType.ts';

export const userApi = rtkApi.injectEndpoints({
	endpoints: (build) => ({
		loginUser: build.mutation<UserType, { username: string; password: string }>(
			{
				query: (userData) => ({
					url: '/auth/login',
					method: 'POST',
					body: userData,
				}),
				invalidatesTags: ['User'],
			},
		),
		registerUser: build.mutation<
			UserType,
			{ username: string; password: string }
		>({
			query: (userData) => ({
				url: '/auth/register',
				method: 'POST',
				body: userData,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useLoginUserMutation, useRegisterUserMutation } = userApi;
