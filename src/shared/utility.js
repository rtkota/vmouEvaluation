export const checkValidity = (value, rules) => {
    let isValid=true;
    if (!rules)
        return true;
    if (rules.required)
        isValid = value.trim() !== ' ' && isValid;
    if (rules.minlength)
        isValid = value.length >= rules.minlength  && isValid;
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
    if (rules.maxlength)
        isValid = value.length <= rules.minlength && isValid;
    return isValid;
}