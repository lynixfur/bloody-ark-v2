type ShadowmaneError = {
    errorSeverity: Number,
    errorMessage: string,
    errorPath: string,
    errorCode: Number
};

type GenericError = {
    errorMessage: string,
    errorPath: string,
}

const errorHandler = ({errorMessage, errorPath}: GenericError) => {
    
    let error: ShadowmaneError = {
        errorSeverity: 0,
        errorMessage: "",
        errorPath: "",
        errorCode: 0
    }
    
}

export default errorHandler