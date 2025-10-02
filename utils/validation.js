export function handleSubmit(txt) {
    return txt && txt.trim().length() > 0;
}

export function isValidEmail(email) {
    const regex = `/\S+@\S+\.\S+/`;
    return regex.test(email);
}