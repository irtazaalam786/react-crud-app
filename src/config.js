export const BASE_URL='http://localhost:8000';
export const API_BASE_URL='http://localhost:8000/api';
export const ADMIN_NUMBER = 1;
export const USER_NUMBER = 1;

export const check_permission = (permissions,value)=>{
    return permissions.length > 0 && permissions.includes(value)
}