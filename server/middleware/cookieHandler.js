// const mock = "user_session=55e1ea6ed31981be8dba58af77765047ff992daf0b3a578b674d7e0eb1c13c82; io=DucoZCxZxgJ9jydWAAAA; bruh=homwer; chim-sopw=browsbaolcqer"

function getCookieValueFromKey(cookies, key) {
  const parsedCookies = parseCookies(cookies)
  if (parsedCookies[key.trim()]) {
    return parsedCookies[key.trim()]
  } else {
    throw new Error(`Cookie not found for ${key}`)
  }

}

function parseCookies(cookies) {
  // this function doesn't can't handle cookie values that have = sign in them
  let parsedCookies = {}
  const seperatedCookies = cookies.split(";");

  seperatedCookies.forEach(element => {
    let splitCookie = element.split("=");
    parsedCookies[splitCookie[0].trim()] = decodeURIComponent(splitCookie[1].trim())
  })
  return parsedCookies
}

// getCookieValueFromKey(mock, "ioa")

