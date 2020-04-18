import { SIGN_IN } from './types';
import { SIGN_OUT } from './types'
export function signIn(){
    return {
            type: SIGN_IN,
            //payload:true
    }
}
export function signOut(){
    return {
            type: SIGN_OUT,
            //payload:false
    }
}