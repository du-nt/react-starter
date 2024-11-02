import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <nav>
        <Link to="/login">Login</Link>
        <span> | </span>
        <Link to="/profile">Profile</Link>
      </nav>
      <div>MainLayout</div>
      <div>{children}</div>
    </>
  );
}
