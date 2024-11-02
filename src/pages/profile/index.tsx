import useBoundStore from "../../stores";

export default function ProfilePage() {
  const unAuthenticate = useBoundStore((state) => state.unAuthenticate);

  const handleLogout = () => {
    unAuthenticate();
  };

  return (
    <>
      <p>profile works!</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
