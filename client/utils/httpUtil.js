import { USERS } from '../constants/entity';
import {httpBase} from './httpBaseUtil';

export const createUser = (data) => {
    return httpBase().post(USERS, data);
};