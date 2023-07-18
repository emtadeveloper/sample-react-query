import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <div className="grid">
        <Link to={`/pagination`} className="user">
          <span>username</span>
        </Link>
      </div>
    </>
  );
}
