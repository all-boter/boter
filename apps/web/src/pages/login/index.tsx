import { googleAuthUrl } from "@/common/constants"
import { authTestApi } from "@/services/userApi"
import Cookies from "js-cookie"

export const Login = () => {
  const onTestReq = async () => {
    const res = await authTestApi()
    console.log('onTestReq', res)
  }

  if (Cookies.get('token')) {
    // eslint-disable-next-line no-restricted-globals
    location.href = '/dashbord'
    return null
  }

  return <div>
    <div>
      <a href={googleAuthUrl}>Login</a>
    </div>
    <div>
      <button onClick={onTestReq}>test req</button>
    </div>
  </div>
}