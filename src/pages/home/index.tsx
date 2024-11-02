import useBoundStore from "../../stores";

export default function HomePage() {
  const unAuthenticate = useBoundStore((state) => state.unAuthenticate);
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

  const handleLogout = () => {
    unAuthenticate();
  };

  return (
    <>
      <p>home works!</p>
      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </>
  );
}
