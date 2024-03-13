export const validateEmail = (email) => {
    const regextSt = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
    return regextSt.test(email)
}