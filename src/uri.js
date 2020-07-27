var uri_=''

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    uri_='http://localhost:5000/'
} else {
    uri_='http://coursechat2.herokuapp.com/'
}

export const uri = uri_ 