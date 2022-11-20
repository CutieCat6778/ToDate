import { FormEvent } from "react";

interface IProps {
  errorMessage: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<any>;
}

export default function LoginForm({ errorMessage, onSubmit }: IProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center w-auto"
    >
      <input
        placeholder="Username"
        name="username"
        className="input"
        required
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        className="input"
        required
      />
      <button className="button">
        <p className="nav-a">Login</p>
      </button>

      {errorMessage && <p className="color-brown mt-5">{errorMessage}</p>}
    </form>
  );
}
