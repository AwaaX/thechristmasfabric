import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  redirectTo: string
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ redirectTo, setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="max-w-[570px] w-full flex flex-col items-start bg-white border p-[30px] shadow-[0_0_30px_0_rgba(0,0,0,.05)]" data-testid="login-page">
      <h1 className="text-large-semi text-[24px] font-medium mb-6">Sign In</h1>
      <form className="w-full" action={formAction}>
        <input type="hidden" name="redirect_to" value={redirectTo} />
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          Sign in
        </SubmitButton>
      </form>
       <span className="text-center text-[15px] font-normal hover:text-christmasText duration-200 ease-in-out mt-6 mx-auto">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
          data-testid="register-button"
        >
          Register
        </button>
        .
      </span>
    </div>
  )
}

export default Login
