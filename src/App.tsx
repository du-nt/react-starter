import { useQuery } from "./hooks/useQuery";
import Routes from "./routes";
import useBoundStore from "./stores";

export type Profile = {
  username: string;
  city: string;
  email: string;
};

function App() {
  const authenticate = useBoundStore((state) => state.authenticate);
  const { isFetchedAfterMount } = useQuery<Profile>({
    queryKey: ["profile"],
    onSuccess: () => {
      authenticate();
    },
  });

  if (!isFetchedAfterMount) return <div>Loading...</div>;

  return <Routes />;
}

export default App;
