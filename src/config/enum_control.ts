export const SESSION_CONFIG = {
    email: { prefix: "email-session", ttl: 60 * 10 }, // 10분
    sms: { prefix: "sms-session", ttl: 60 * 5 },    // 5분
    web: { prefix: "login-session", ttl: 60 * 60 }, // 60분
    app: { prefix: "login-session", ttl: 60 * 60 * 24 * 180 }, // 180일
};

export enum SESSION_TYPE {
    EMAIL = "email",
    SMS = "sms",
    WEB = "web",
    APP = "app"
}

export enum userType {
    KAKAO = "kakao",
    GOOGLE = "google",
    ANYWHERE = "anywhere",
    All = "all"
};

export enum LOCATION_ERROR_MARGIN {
    LAT = 0.0001,
    LON = 0.0001,
}

export enum PRINT_DISPLAY {
    PLACE_NUMBER = 10,
}

export enum CONDITION_OWNER {
    ALL = "all",
    OWNER = "owner",
    REPORTER = "reporter",
}

export enum CATEGORY_TYPE {
    MAIN = "main",
    SUB = "sub",
}