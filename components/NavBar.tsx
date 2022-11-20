import Link from "next/link";
import { UserInterface } from "../types/user";

interface IProps {
  logedIn: boolean;
  userdata?: UserInterface;
}

export default function NavBar({ logedIn, userdata }: IProps) {
  if (!logedIn) {
    return (
      <div className="flex w-screen justify-between p-4">
        <div className="grid grid-rows-1 grid-cols-4">
          <Link href="/" className="nav-a">HaveTime</Link>
          <Link href="/about" className="nav-a">What is this?</Link>
          <Link href="/contact" className="nav-a">Contact</Link>
        </div>
        <div className="flex w-min">
          <Link className="nav-a" href="/login">
            Login
          </Link>
          <Link className="nav-a" href="/register">
            Register
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <a>HaveTime</a>
      </div>
    );
  }
}
