"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  redirectTo: string
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ redirectTo, setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
     <div className="max-w-[570px] w-full flex flex-col items-start bg-white border p-[30px] shadow-[0_0_30px_0_rgba(0,0,0,.05)]" data-testid="register-page">
      <h1 className="text-large-semi text-[24px] font-medium mb-6">Register here </h1>
      <form className="w-full flex flex-col" action={formAction}>
        <input type="hidden" name="redirect_to" value={redirectTo} />
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          {/* <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          /> */}
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
           <div>
        <input type="checkbox" required /> 
        <span className="text-center text-[15px] font-normal ml-3 mt-6 mx-auto">
          I agree to Store&apos;s{" "}
          <LocalizedClientLink
            href="/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/legal-notice"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        </div>
        <SubmitButton className="w-full mt-6 border hover:border-black px-[25px] min-h-[45px] rounded-[5px] flex items-center justify-center  hover:bg-black hover:text-white duration-300 ease-out hover:shadow-[0_0_0_0.2rem_rgba(0,0,0,1)] bg-black text-white" data-testid="register-button">
          Join
        </SubmitButton>
      </form>
       <span className="text-center text-[15px] font-normal hover:text-christmasText duration-200 ease-in-out mt-6 mx-auto">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
