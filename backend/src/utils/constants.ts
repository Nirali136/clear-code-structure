export class ResponseStatus {
    static Failed = 0;
    static Success = 200;
    static BadRequest = 400;
    static Unauthorized = 401;
    static NotFound = 404;
    static InternalServerError = 500;
    static ServiceUnavailable = 503;
}

export class TableNames {
    static User = "users";
}

export class TableFields {
    static ID = "_id";
    static name_ = "name";
    static username = "username";
    static email = "email";
    static password = "password";
    static tokens = "tokens";
    static token = "token";
    static _createdAt = "_createdAt";
    static _updatedAt = "_updatedAt";
}

export class ValidationMsgs {
    static EmailEmpty = "Email is required!";
    static EmailInvalid = "Provided email address is invalid.";
    static PasswordEmpty = "Password cannot be blank.";
    static PasswordInvalid = "Password is invalid.";
    static DuplicateEmail = "This email address is already in use.";
    static UserNotFound = "User not found.";
    static UnableToLogin = "Incorrect email and/or password.";
    static NameEmpty = "Name is required!";
    static ParametersError = "Invalid parameters.";
}
