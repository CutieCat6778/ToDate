import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar logedIn={false} />
      <div className="flex justify-center items-center w-screen h-90vh">
        <div className="w-1/3 h-max">
          <h1 className="text-9xl">Have</h1>
          <h1 className="text-9xl text-right">Time</h1>
        </div>
      </div>
    </div>
  );
}
