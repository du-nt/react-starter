import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export default function BlankLayout({ children }: PropsWithChildren) {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <div>BlankLayout</div>
      <div>{children}</div>
    </>
  );
}
