export const responseError = (error: any): string => {
    if (error.response) {
        if (error.response.data) {
            return error.response.data.message
        }
        return "something went wrong."
    }

    return error.errors[0] ? error.errors[0].message : "something went wrong."
}