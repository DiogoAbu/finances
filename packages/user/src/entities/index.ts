import { merge } from 'lodash';

import userResolver from '../entities/User/User.resolver';

import { User } from './User/User';

// Merge all of the resolver objects together, just to show how
export const resolvers = merge({}, userResolver);

export const entities = [User];
