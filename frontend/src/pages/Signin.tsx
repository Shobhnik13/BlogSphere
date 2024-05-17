import Quote from "../components/Quote"
import SigninAuth from "../components/SigninAuth"

const Signin = () => {
  return (
    <div>
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div><SigninAuth /></div>
      <div className="hidden lg:block"><Quote/></div>
    </div>
  </div>
  )
}

export default Signin